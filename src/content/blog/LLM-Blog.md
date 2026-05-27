---
title: "How to Train Your LLM: A Postmortem"
description: "A deep dive into the practical challenges and engineering decisions behind training a 148M parameter language model from scratch."
date: "2024-05-27"
tags: ["llm", "transformers", "training", "pytorch"]
---


Github Link: https://github.com/xyphoes0727/llm-pretraining

## 1. Prerequisites & Learning Resources

This is aimed at people who already understand transformers conceptually and want practical training intuition. However, if you need to read up on any extra topics in the blog, you can refer to these resources:

### 1) Positional Information

**RoPE** is what I personally used in my implementation. 

- RoPE paper: [RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/abs/2104.09864)
- Intuitive explanation: [Medium Article by azhar](https://medium.com/ai-insights-cobet/rotary-positional-embeddings-a-detailed-look-and-comprehensive-understanding-4ff66a874d83)
- Practical reference: [Meta’s Llama RoPE implementation](https://github.com/meta-llama/llama/blob/689c7f261b9c5514636ecc3c5fefefcbb3e6eed7/llama/model.py#L132)

### 2) Tokenization & Embeddings

- BPE explained: [HuggingFace Tutorial on BPE](https://huggingface.co/learn/nlp-course/chapter6/5)
- Useful Article on tokenization: [Medium Article on Tokenization](https://medium.com/data-science/the-art-of-tokenization-breaking-down-text-for-ai-43c7bccaed25)

### 3) Practical Training Mechanics

- **Learning-rate schedulers:** controls early stability and long-horizon progress.
- PyTorch scheduler docs: [https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate](https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate)
- **Gradient accumulation, Gradient Clipping, Mixed Precision:** These are incredibly useful concepts and techniques that you’ll **need** for training efficiency and stability. They are small concepts, so you can just google them and read up on them.
- PyTorch recipe: [https://pytorch.org/docs/stable/notes/amp_examples.html](https://pytorch.org/docs/stable/notes/amp_examples.html)

Most public blogs on transformers explain *how attention works*. That is useful, but it misses the part that matters in real projects: the tedious data cleaning, architecture optimization, and “inconsequential” decisions that quietly ruin a run that has been in progress for 2 days.

This blog is a postmortem of training a ~148M parameter, decoder-only transformer inspired by GPT-2. It details on what went wrong, what should’ve been done.

## 2. Model Overview

#### MyModel
```text
MyModel
├─Embedding: 1-1 38,597,376
├─ModuleList: 1-2 --
│ └─TransformerBlock: 2-1 --
│ │ └─LayerNorm: 3-1 1,536
│ │ └─Dropout: 3-2 --
│ │ └─MultiHeadAttention: 3-3 2,362,368
│ │ └─Dropout: 3-4 --
│ │ └─LayerNorm: 3-5 1,536
│ │ └─FFN: 3-6 4,722,432
…
│ └─TransformerBlock: 2-10 --
│ │ └─LayerNorm: 3-55 1,536
│ │ └─Dropout: 3-56 --
│ │ └─MultiHeadAttention: 3-57 2,362,368
│ │ └─Dropout: 3-58 --
│ │ └─LayerNorm: 3-59 1,536
│ │ └─FFN: 3-60 4,722,432
├─LayerNorm: 1-3 1,536
├─Linear: 1-4 38,647,633

Total params: 148,125,265
Trainable params: 148,125,265
Non-trainable params: 0
```

The model is a GPT-style stack with a few implementation choices of my own. I used **10 blocks** of a **decoder-only transformer architecture.** The embeddings employed **RoPE**.

**The MHA in the transformer block was a custom implementation.** I decided to not use torch’s API for the attention since my goal was to build as much of the architecture as I could from scratch, and MHA is a very important aspect of it.

The weights of the token embedding matrix and the output unembedding (projection) matrix were **tied,** in order to increase stability and reduce parameter counts.

And finally, **dropout with p = 0.1** was used partially while training the model.

## 3. Training Pipeline

### Data preparation and pipeline

I used [OpenWebText](https://huggingface.co/datasets/Skylion007/openwebtext) for the training corpus, since it was mentioned in the GPT-2 paper.

The tokenizer was a custom BPE with the vocabulary size of GPT-2. The dataset was then tokenized, truncated to 1024 tokens and sharded.

For the dataloader, I decided to pad sequences shorter than 1024 tokens in a custom collator function, since I didn’t do that during pre-processing. This was the first mistake. The second mistake was padding in the first place. It is always much smarter to do **packing** instead, where you fit multiple sequences inside the 1024 token limit. This saves a lot on compute time when compared to naive padding.

### Training Loop parameters

- **Optimizer:** Adam.
- **LR schedule:** cosine decay.
- **Mixed precision:** Torch AMP Gradient Scaler.
- **Stability tooling:** gradient clipping, gradient accumulation.
- **Engineering:** model checkpointing
- **Logging and Tracking:** Weights & Biases (Train/Val Loss, perplexity, LR).
- **Hardware:** single L40S.

The LR Scheduler is incredibly important here. Cosine Annealing is pretty common for LLM training, while Cyclic LR is used sometimes in DL Models for faster convergence. It is equally important to use LR Warmup for LLMs. This increases training stability initially and makes sure no gradient explosion occurs.

Gradient Accumulation is also incredibly useful for simulation larger batch sizes with no extra vram use. However, it’s important to strike a good balance between your true batch size and your gradient accumulation steps. This is because a larger accumulation step will lead to a higher simulated batch size, but slower convergence as we are breaking the parallelism of a single large batch.

## 4. Attempt 1: Failure to Converge

![image.png](/blog-images/LLM-Blog/image_run1.png)

Here, the Test Prep hovered around 45 before I stopped the run.

The first attempt was pretty underwhelming. The loss curve plateaued pretty hard on a fairly high loss. I then realised that my architecture itself was the problem. The model was too wide, especially on the attention heads, and wasn’t deep enough.

A wider model (larger $d_{k}$, $d_{v}$, larger FFN hidden layer) increases parameter count quickly and increases the cost per token. This part is obvious, however the following tradeoffs and decisions must be kept in mind while deciding on an architecture for your model.

### Why it failed to converge well

**1) Width vs depth tradeoff**

Holding parameters roughly constant, increasing width:

- reduces the number of nonlinear transformation steps (as there are fewer blocks),
- increases the representational capacity per layer
- Cited:  https://proceedings.mlr.press/v49/telgarsky16.pdf

Also in general, a deeper model is considered to be more efficient than a wider model. This principle becomes important when you are training in a compute-restricted environment.

**2) The Grad Accumulation tradeoff for higher training time over lower VRAM usage** 

On a single GPU, you usually use gradient accumulation to reach an effective batch size. If each forward/backward step is expensive, you take fewer optimizer steps per wall-clock time. That reduces iteration speed and makes it harder to “feel out” learning rate and stability issues. In such runs, every bad config parameter costs time and compute.

## 5. Attempt 2: Improved but Imperfect

![image_run2.png](/blog-images/LLM-Blog/image_run2.png)

Here, the test prep hovered around **38** before I stopped the run. The main change in the second attempt was a **trade of width for depth**.

### Changes

- **Reduced width** (smaller $d_{qk}$, less $n_{heads}$ and a narrower FFN).
- **Increased depth** (more blocks, keeping parameters in the same ballpark).
- **Dropout to 0 after ~20% of training** as an experiment.

### What improved

**Better convergence**

The loss curve seemed to be lower than the run with the older architecture, which was a good sign.

### What stayed imperfect

**An early plateau during training**

At some point, progress slowed down sharply. I figured the main problems were still my packing efficiency, data quality and architecture. Towards the end, I had to start tuning the LR and reducing it manually to try and get it out of the plateau 

Eventually, the run showed diminishing returns: additional compute produced only incremental improvements.

## 6. Conclusion

TL;DR if you want the distilled read-

1. Training an LLM **properly** is very much an engineering problem. Success and experimentation speed will depend heavily on your Data Preprocessing steps, batching efficiency, architectural decisions and ability to reason about convergence issues.
2. Packing sequences beats padding them any day.
3. Understanding width vs depth tradeoffs before training starts is important, since bad architectural choices simply waste compute.
4. Optimizer tooling is absolutely necessary. This includes verbose logging(Loss, Perplexity, GradNorm, LR curves), LR Schedulers (With warmup!), Mixed Precision, Gradient Accumulation, Gradient Checkpointing, Model Checkpointing, etc.
5. The tradeoff between Training Time and extra VRAM usage for Gradient Accumulation.
6. Handling convergence plateaus. Experimenting with LR, slight architectural modifications, more training data, etc are essential to squeeze out as much performance as possible from the training run. 
7. LayerNorm placement relative to the residual connections. https://apxml.com/courses/foundations-transformers-architecture/chapter-6-advanced-architectural-variants-analysis/pre-ln-vs-post-ln
8. Dropout placement, and whether it affects the residual branch or not. 

 You may have noticed that LLM Architectures over the years have stayed almost the same. (Ignoring the recent resurgence of MoE architectures) There is a good reason for this. LLM pretraining has become less of an architectural problem and more of an infra/engineering problem. 

The final takeaway is that **efficient training is less about inventing a new transformer architecture and more about taking care of dozens of engineering decisions before and during training**.

# 7. SAMPLE OUTPUTS!!

### Prompt 1) “Persona 4 Golden is the greatest JRPG game”

Output with prompt appended:

Persona 4 Golden is the greatest JRPG game because it's the most epic, most entertaining and most awesome game ever made. In this game, you have to play a few different games. You can find it in the game so you can use it in the best way.

1. It's a full game that's great, but you'll need to go into it for more than a little while.
2. It's a nice build, but if you want a more fun game you can play through the game. It also isn't a fun game, but it's amazing that it can do anything and everything.
3. It's the most amazing game the game has. It's an amazing game, but if you want to play a game that's awesome, it's the best way to play it.
4. It's a very versatile game. It's a story game with a lot of fun to play.
5. It's a game where you can play to your liking and do all the things you can, so you can use it as a fun and easy game that you can build on.
6. It's a game that's fantastic, but you won't find it anywhere.

### Prompt 2) “What could possibly be the context to this”

Output with prompt appended:

What could possibly be the context to this story of a new book by the author of The Lord of the Rings trilogy?

This is a book about the concept of the first world, and a lot of the ideas that are used today. I was aware that the title is an art book that is not very contemporary. The book is a collection of great pieces that have been written by the author as well, and I have to say I think that it is a rather important piece that has an emphasis to the first human and in some ways a story. There have been some great pieces that have been written about the way that life arose and all that has happened in the future.
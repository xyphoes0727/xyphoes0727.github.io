---
title: "Transformer Implementation"
date: "2026-03-01"
summary: "Developed a 140M+ parameter transformer from scratch with RoPE, causal masking, and tied embeddings, trained on the 8B+ token OpenWebText dataset."
tags: ["PyTorch", "W&B", "Apache Arrow"]
repo: "https://github.com/xyphoes0727/llm-pretraining"
---

Developed a **140M+ parameter** transformer with Attention from scratch, **Rotary Positional Embeddings (RoPE)**, causal masking, and tied embeddings, trained on the **8B+ token** OpenWebText dataset.

Engineered an efficient data pipeline using **Apache Arrow** for sharded tokenization, significantly reducing I/O overhead during pre-training.

Optimized single-GPU throughput via **Mixed Precision (FP16)** and **Gradient Accumulation**, integrating **Weights & Biases** for real-time loss and perplexity tracking.

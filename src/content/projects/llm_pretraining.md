---
title: "Transformer Implementation"
description: "Implemented and pre-trained a 140M-parameter decoder-only Transformer on 8B+ OpenWebText tokens with scalable single-GPU training optimizations."
year: "2026"
category: "LLM Engineering"
tags: ["PyTorch", "RoPE", "W&B", "OpenWebText"]
links: [{"label":"GitHub","href":"https://github.com/xyphoes0727/llm-pretraining"}]
---

Implemented and pre-trained a **140M-parameter decoder-only Transformer** from scratch with **RoPE**, causal self-attention, and tied embeddings on **8B+ OpenWebText tokens**.

Designed a memory-efficient data pipeline using dataset sharding and sequential streaming, enabling scalable pre-training over large token volumes.

Integrated mixed-precision training, gradient accumulation, model checkpointing, and experiment tracking with **Weights & Biases** for large-scale single-GPU pre-training.

---
title: "Bahdanau Attention — Neural Machine Translation"
date: "2025-06-01"
summary: "Built a BiLSTM encoder–decoder with Bahdanau Attention from scratch in PyTorch, trained on an English–French corpus of 135k sentence pairs."
tags: ["PyTorch", "NumPy", "spaCy"]
repo: "https://github.com/xyphoes0727/AIML/tree/main/Project/MTL_Bahdanau"
---

Built a **BiLSTM encoder–decoder** with Bahdanau Attention from scratch in PyTorch, trained on an English–French corpus of **135k sentence pairs** with custom tokenization and vocabulary construction using spaCy.

Implemented a teacher forcing decay schedule, improving training convergence stability by **15--25%** over fixed teacher forcing, with smoother loss curves and better generalization at inference.

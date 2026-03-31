---
title: "Designing Online-Learning Fraud Systems"
summary: "How we combine streaming ML, drift adaptation, and low-latency serving for real-time financial fraud detection."
date: "2026-03-31"
readTime: "8 min read"
tags:
  - "Streaming ML"
  - "Fraud Detection"
  - "MLOps"
---

## Why streaming matters

When the transaction stream exceeds **70k+ events/min**, batch scoring alone is not enough. The model must adapt to changing behavior while still meeting strict latency constraints.

A simple objective can be written as:

$$
\min_{\theta_t} \; \mathbb{E}_{(x_t,y_t)}\left[\ell(f_{\theta_t}(x_t), y_t)\right] + \lambda\lVert\theta_t - \theta_{t-1}\rVert_2^2
$$

The regularization term stabilizes updates while concept drift is occurring.

![Streaming feature-space view](/blogs/feature-space.svg)

## Practical pipeline

- Stream ingestion with Kafka topics segmented by risk class.
- Stateful feature joins and rolling aggregations.
- Incremental learners for near-real-time adaptation.
- Scheduled retraining when drift score exceeds threshold $\tau$.

A common drift trigger is:

$$
D_t = \mathrm{KL}(p_t(x) \parallel p_{t-k}(x))
$$

Retrain when $D_t > \tau$ and canary the new model before full rollout.

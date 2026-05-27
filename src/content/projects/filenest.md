---
title: "FileNest (Decentralized AI Search)"
date: "2025-11-01"
summary: "Built a P2P file discovery system using Kademlia-style routing over go-libp2p and integrated multimodal retrieval using Nomic and FastVLM embeddings."
tags: ["Go", "libp2p", "Vector Embeddings"]
repo: "https://github.com/AISocietyIITJ/FileNest"
---

Built a P2P file discovery system utilizing **Kademlia-style routing** over go-libp2p, reducing lookup hops from O(n) to O(log n) compared to naive linear search.

Integrated **multimodal retrieval** (text + image) using **Nomic and FastVLM** embeddings, enabling users to semantically search for files using natural language queries or similar images.

Reduced average query resolution time by **40%** through depth-aware routing and optimized vector indexing strategies.

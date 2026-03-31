export const profile = {
  name: "Yug Dalwadi",
  role: "Machine Learning Engineer",
  tagline: "AI Systems • ML Engineering • Backend",
  location: "Vadodara, Gujarat",
  email: "yugdalwadi@gmail.com",
  github: "https://github.com/YugDalwadi",
  linkedin: "https://www.linkedin.com/in/yug-dalwadi-304032257/",
  discord: "yugdalwadi",
  photoUrl: "https://github.com/YugDalwadi.png",
};

export const interests = ["DL", "ML", "MLOps", "NLP"];

export const welcome = {
  intro: "Welcome - I am Yug, an AI systems builder who enjoys turning ambitious ML ideas into reliable software.",
  message:
    "I am currently pursuing AI and Data Science at IIT Jodhpur, and I spend most of my time building low-latency ML systems, training large models, and experimenting with distributed backends. I like projects where theory meets real constraints: throughput, drift, cost, and reliability.",
};

export const aboutMe = [
  "B.Tech student in Artificial Intelligence and Data Science at IIT Jodhpur.",
  "Strong interest in production ML infrastructure, backend systems, and applied deep learning.",
  "Gold Medalist at Inter IIT Tech Meet 14.0 for a real-time fraud detection system.",
];

export const researchAreas = [
  "LLM pre-training and efficient transformer implementations",
  "Streaming machine learning and concept drift adaptation",
  "Semantic retrieval and vector search systems",
  "Low-latency model serving and systems optimization",
];

export const projects = [
  {
    title: "GPT-style Decoder Transformer from Scratch",
    description:
      "Implemented a 125M+ parameter decoder-only transformer with RoPE, causal masking, and tied embeddings.",
    impact: "Trained on 8B+ OpenWebText tokens with optimized single-GPU throughput using FP16 and gradient accumulation.",
    stack: ["PyTorch", "W&B", "Apache Arrow"],
  },
  {
    title: "FileNest (Decentralized AI Search)",
    description:
      "Built a P2P file discovery platform with Kademlia-style routing over libp2p and multimodal semantic retrieval.",
    impact: "Improved lookup efficiency by 25-35% through depth-aware routing and optimized vector indexing.",
    stack: ["Go", "libp2p", "Vector Embeddings"],
  },
  {
    title: "SnapShot (AI Photo Management System)",
    description:
      "Built a microservices-based semantic image search system with face-based clustering and albumization.",
    impact: "Delivered sub-3s query latency across 1000+ images using FaceNet and Pinecone.",
    stack: ["FastAPI", "Pinecone", "Docker"],
  },
  {
    title: "Bahdanau Attention Implementation",
    description:
      "Implemented an encoder-decoder sequence model with Bahdanau Attention from scratch in PyTorch.",
    impact: "Improved convergence stability by 15-25% using teacher forcing decay and scheduled sampling.",
    stack: ["PyTorch", "NumPy", "spaCy"],
  },
];

export const workExperience = [
  {
    period: "Nov - Dec 2025",
    title: "Inter IIT Tech Meet 14.0 - Gold Medalist",
    company: "Real-Time Fraud Detection System",
    summary:
      "Architected a streaming fraud detection stack with Kafka, Pathway, and River for 70k+ txns/min at sub-40ms P95 latency, with online learning and retraining automation.",
  },
];

export const education = [
  {
    institute: "Indian Institute of Technology, Jodhpur",
    degree: "B.Tech, Artificial Intelligence and Data Science",
    period: "2024 - 2028",
    detail: "CGPA: 8.35",
  },
];

export const technicalSkills = [
  {
    category: "Languages",
    items: ["Python", "C++", "Go", "SQL", "C#", "Lua"],
  },
  {
    category: "AI/ML",
    items: [
      "PyTorch",
      "Scikit-learn",
      "River (Streaming ML)",
      "Transformer Architectures",
      "Vector Search (Pinecone)",
      "LLM Pre-training",
    ],
  },
  {
    category: "Systems and Tools",
    items: [
      "Kafka",
      "Docker",
      "FastAPI",
      "Django",
      "PostgreSQL",
      "Neo4j",
      "Apache Arrow",
      "Celery",
      "Weights and Biases",
      "Linux (Bash)",
      "Git",
      "Microservices Architecture",
    ],
  },
];

export const aboutSectionLinks = [
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
];

export const aboutCardCopy =
  "Explore my background, research areas, work experience, education, and technical skills in one focused page.";

export const projectsCardCopy =
  "See selected ML and systems projects with measurable outcomes, core stack choices, and implementation highlights.";

export const blogsCardCopy =
  "Read technical blogs hosted directly on this site, including math-heavy notes and diagrams with image support.";

// Backward-compatible aliases for existing components that may still be imported.
export const aboutPoints = aboutMe;
export const experience = workExperience;
export const status: Array<{ label: string; value: string }> = [];

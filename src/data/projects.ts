import type { Project } from '../types'

export const PROJECTS: Project[] = [
  // ── Featured ─────────────────────────────────────────────────────────────
  {
    id: 'ai-learning-ledger',
    title: 'AI Learning Ledger',
    description: 'Multi-agent AI platform that turns any learning goal into structured tasks and interactive coding exercises.',
    longDescription:
      'Built with Claude-powered LangGraph agents (Researcher → Exercise Generator → Validator), this platform decomposes a single learning goal into bite-sized tasks and runnable exercises. Features real-time WebSocket progress, a Monaco code editor with AI feedback, SQLite persistence, and full Docker + Kubernetes deployment.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'React', 'TypeScript', 'SQLite', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/sayalik277/AI_Learning_Ledger',
    featured: true,
    status: 'live',
    year: '2025',
  },
  {
    id: 'optmatch-ai',
    title: 'OptiMatch AI',
    description: 'Autonomous job-discovery agent that semantically matches your profile to roles across 12+ portals with a 0–100 match score.',
    longDescription:
      'An agentic Python system built with LangChain that performs semantic profile matching against live job listings. Orchestrates parallel searches across 12+ professional portals, uses Tavily AI for real-time web scraping, and generates a 0–100 Match Score based on technical alignment with AWS, React, and Python stacks. Pydantic validates all structured output.',
    tech: ['Python', 'LangChain', 'OpenAI', 'Tavily AI', 'Pydantic'],
    featured: true,
    status: 'live',
    year: '2024',
  },
  // ── Other noteworthy ─────────────────────────────────────────────────────
  {
    id: 'photoboot',
    title: 'Photoboot',
    description: 'Minimalist Instagram clone — React + Material UI frontend, Spring Boot backend, MySQL, Docker.',
    longDescription:
      'Recreated a minimalist Instagram-style photo-sharing interface with React.js and Material UI. Spring Boot powers the REST backend with MySQL for data persistence. The entire stack is containerised with Docker for consistent development and deployment. Focused on core social features: photo upload, feed, and interactions.',
    tech: ['React', 'Material UI', 'Spring Boot', 'MySQL', 'Docker', 'Java'],
    githubUrl: 'https://github.com/sayalik277/Mini_Social_FrontEnd',
    featured: false,
    status: 'live',
    year: '2025',
  },
  {
    id: 'mnist-digit-recognition',
    title: 'Handwritten Digit Recognition',
    description: 'Real-time CNN model (MNIST) deployed as a Flask API — live webcam feed via OpenCV.',
    longDescription:
      'Trained a custom Convolutional Neural Network on the MNIST dataset using PyTorch. Designed a real-time digit-recognition pipeline that captures handwritten input from a live webcam using OpenCV. Deployed as a Flask REST API for production-style inference, with full preprocessing (grayscale → resize → threshold → tensor). End-to-end workflow: model training → weight saving → backend loading → live client inference.',
    tech: ['PyTorch', 'Flask', 'OpenCV', 'Python', 'CNN', 'REST API'],
    featured: false,
    status: 'live',
    year: '2024',
  },
  {
    id: 'aws-hands-on',
    title: 'AWS CDK Hands-On',
    description: 'IaC exploration with AWS CDK v2 and TypeScript — CloudFormation, CodeBuild, and Jest infrastructure tests.',
    longDescription:
      'Hands-on AWS Cloud Development Kit (CDK) v2 project using TypeScript. Covers CDK stack design, CloudFormation synthesis, CodeBuild pipeline integration (buildspec.yml), and Jest-based infrastructure testing. The TypeScript foundation for production IaC work done at Amazon.',
    tech: ['AWS CDK', 'TypeScript', 'AWS', 'CloudFormation', 'CodeBuild', 'Jest'],
    githubUrl: 'https://github.com/sayalik277/AWS-Hands-on',
    featured: false,
    status: 'live',
    year: '2023',
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    description: 'Seasonal-themed interactive portfolio with visitor guestbook, live scrum board, and admin panel.',
    longDescription:
      'The site you are on right now. React 18 + TypeScript + Vite frontend, Python FastAPI backend, SQLite persistence. Colour palette auto-switches each season. Visitors sign a guestbook; I see names + timestamps in the admin panel. Kanban board shows my live daily scrum.',
    tech: ['React', 'TypeScript', 'Vite', 'Python', 'FastAPI', 'Tailwind CSS', 'SQLite'],
    githubUrl: 'https://github.com/sayalik277/portfolio',
    featured: false,
    status: 'live',
    year: '2026',
  },
]

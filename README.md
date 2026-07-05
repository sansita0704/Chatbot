# AI Customer Support & Review Summarizer

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)
[![Hugging Face](https://img.shields.io/badge/Hugging_Face-Inference-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Project-success?style=for-the-badge&logo=vercel)](https://sansita0704-ai-app.vercel.app)

A full-stack AI application featuring a customer support chatbot and an AI-powered product review summarizer.

The application includes two AI-powered experiences:

- **WonderWorld Chatbot** – A customer support assistant that answers questions about the WonderWorld theme park using curated park information.
- **Review Summarizer** – An AI-powered tool that analyzes product reviews stored in MySQL and generates concise summaries of recent customer feedback.

## Features

- AI chatbot with per-session conversation history
- Domain-specific customer support assistant (WonderWorld theme park)
- AI-powered product review summarization
- Cached summaries with automatic expiry
- MySQL database with Prisma ORM
- Prompt validation using Zod
- React + Tailwind UI

## Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

**Backend**

- Express
- Bun
- Prisma ORM
- MySQL

**AI**

- Groq (Chatbot)
- Hugging Face Inference (Review Summarizer)

## Routes

| Route         | Description            |
| ------------- | ---------------------- |
| `/`           | Home                   |
| `/chatbot`    | WonderWorld AI Chatbot |
| `/summarizer` | AI Review Summarizer   |

## Project Structure

```
packages/
├── client/      # React frontend
└── server/      # Express API + Prisma + AI
```

##

> Made with ❤️ by [Sansita Jain](mailto:sansita7406@gmail.com)

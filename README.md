# Pahalx

Pahal means "the first step" in Hindi, and the "x" at the end is to make it modern.

This is a learning project. I built a full stack LLM chat application from scratch, without frameworks like LangChain, to properly understand how AI products work under the hood: how responses stream, how prompts shape output, and how everything fits together in a real product with auth, persistence and a polished UI.

## What it does

A ChatGPT-style app. Sign up, log in, start a chat, and talk to an LLM with responses streamed token by token and rendered as rich Markdown.

## Highlights

- **Streaming LLM responses** over Server-Sent Events, parsed chunk by chunk on the backend and streamed straight through to the UI
- **Prompt based title generation**: a separate LLM call names each chat from the first message
- **Provider agnostic**: talks to any OpenAI-compatible API, currently a local model served via LM Studio
- **Auth and persistence**: JWT authentication, chats and messages stored in PostgreSQL with Alembic migrations
- **Typed end to end**: the frontend API client is generated from the backend's OpenAPI schema using orval

## Stack

| Layer    | Tech                                                    |
| -------- | ------------------------------------------------------- |
| Backend  | Python, FastAPI, SQLAlchemy, PostgreSQL, httpx           |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind 4, shadcn/ui |

## Structure

```
backend/    FastAPI app (auth, chat, streaming)
frontend/   Next.js app (chat UI, auth pages)
```

## Why from scratch?

Frameworks hide the interesting parts. Writing the SSE parsing, the message payload construction and the prompt handling myself is the point of the project.

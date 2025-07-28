# Tech Stack 
# ChainQuery Tech Stack

## Overview
This tech stack supports the ChainQuery MVP, enabling natural language queries for blockchain data (Ethereum and Base), user authentication, SaaS monetization, and a modern UI. The stack is optimized for rapid development using Next.js, Clerk, Supabase, Stripe, and Tailwind CSS, with Vercel for deployment, and is designed to be extensible for future features like cross-chain indexing and real-time alerts.

## Frontend

### Next.js (v14)
**Purpose:** React-based framework for building the landing page (with logo, sign-up/sign-in, pricing popup, contact, and about us tabs) and query interface (input field, result tables, flow diagrams).  
**Why:** Industry standard for production-grade React applications. Offers hybrid approach with Server-Side Rendering (SSR) and Static Site Generation (SSG) for fast landing pages and dynamic applications. File-based routing is intuitive and simplifies development. Integrates seamlessly with Vercel.  
**Usage:** Implements responsive UI with Tailwind CSS, handles Clerk auth redirects, and displays blockchain query results.

### Tailwind CSS (v3)
**Purpose:** Styling framework for rapid UI development and maintaining consistent design system.  
**Why:** Utility-first CSS framework that allows for rapid styling directly within JSX. Pairs perfectly with Next.js and enables consistent design systems.  
**Usage:** Styles landing page, query interface, and pricing popup with utility classes for responsive design and component styling.

## Backend & Database

### Supabase (PostgreSQL)
**Purpose:** Manages database for user data, subscription plans, query logs, and cached blockchain results.  
**Why:** Open-source Firebase alternative providing backend tools built around dedicated PostgreSQL database. Managed Postgres with real-time capabilities, scalable for MVP and future features like event streaming.  
**Usage:** 
- **Postgres Database:** Stores user profiles, tracks query limits (2/day for free, ~200/month for premium), and caches query results in JSONB format
- **Edge Functions:** Serverless functions hosting core backend logic, such as calling the NLP layer or fetching data from blockchain APIs. Keeps frontend lean and API keys secure

### Node.js (via Next.js API Routes + Supabase Edge Functions)
**Purpose:** Handles API logic for processing NLP queries, fetching blockchain data, and managing Stripe subscriptions.  
**Why:** Runs serverlessly on Vercel and Supabase, integrates with Next.js frontend, and supports async operations for API calls.  
**Usage:** Parses queries via LangChain, queries blockchain APIs, and interacts with Supabase for query tracking.

## Authentication

### Clerk
**Purpose:** Handles user authentication (email/password, OAuth) and session management.  
**Why:** User management platform with pre-built, beautiful components that dramatically speeds up development compared to building auth from scratch. Supports email/password and OAuth (Google, GitHub), and integrates seamlessly with Next.js and Supabase.  
**Usage:** Manages sign-up/sign-in on landing page, secures API routes, and syncs user data (user_id, email) with Supabase via webhooks. Clerk-generated JWT authenticates requests to Supabase backend.

## NLP and Data Processing

### OpenAI API
**Purpose:** Powers NLP for parsing natural language queries (e.g., "Show wallets that bridged >$100K to Base").  
**Why:** Robust language models (like GPT-4) excel at understanding intent and query structuring.  
**Usage:** Extracts query parameters (chain, time, value) for structured data filtering.

### LangChain
**Purpose:** Converts parsed NLP outputs into structured blockchain queries (e.g., GraphQL filters).  
**Why:** Provides framework to chain OpenAI calls together and structure output for backend. Simplifies integration with OpenAI and blockchain APIs, supports extensible query logic.  
**Usage:** Maps user inputs to API calls for The Graph or Alchemy. Logic lives inside Supabase Edge Functions.

## Blockchain Data

### The Graph
**Purpose:** Queries indexed blockchain data for Ethereum and Base (e.g., bridges, swaps).  
**Why:** Provides subgraph-based access to on-chain data, reducing complexity compared to raw node queries. Fast and reliable for MVP data needs.  
**Usage:** Fetches wallet addresses, transactions, and contract interactions for query results.

### Alchemy
**Purpose:** Alternative API for Ethereum and Base data, including real-time transaction data.  
**Why:** Reliable, scalable, and supports future real-time features like mempool alerts. Serves as fallback if The Graph rate limits are hit.  
**Usage:** Supplements The Graph for specific queries and provides additional data coverage.

## Payments

### Stripe
**Purpose:** Manages SaaS subscriptions for premium tier (~200 queries/month) and payment processing.  
**Why:** Gold standard for online payments. Developer-friendly and integrates seamlessly with Supabase and Next.js to manage subscriptions.  
**Usage:** Handles checkout for premium plans, tracks subscription status via webhooks, and syncs with Supabase for query limit enforcement.

## Deployment

### Vercel
**Purpose:** Hosts and scales the Next.js app, including frontend, API routes, and static assets.  
**Why:** Created by Next.js creators. Provides seamless, zero-configuration deployment experience with GitHub integration for automatic deployments. Auto-scaling and domain management.  
**Usage:** Deploys the app, handles serverless functions for API routes, and supports preview builds for testing.

## Extensibility & Future Features

### Modular Design
- **Next.js API routes** and **Supabase's JSONB fields** allow adding new chains (e.g., Solana) or data sources without major refactoring
- **Supabase Edge Functions** can be extended for additional processing logic

### Real-Time Features
- **Supabase's real-time subscriptions** and **Alchemy's WebSocket API** lay groundwork for future alert systems
- Ready for streaming notifications and live data updates

### API Layer
- **Clerk** and **Supabase** support exposing programmatic APIs for analysts in the future
- Extensible authentication and data access patterns

### Scalability
- **Vercel's auto-scaling** and **Supabase's managed database** handle user growth
- **Stripe** supports flexible pricing tiers and subscription management

## Development Workflow

1. **Frontend Development:** Use Next.js to build landing page (logo, auth, tabs) and query interface with Tailwind CSS styling
2. **Backend Development:** Develop API routes and Supabase Edge Functions, integrate Clerk, Supabase, and blockchain APIs
3. **NLP Integration:** Implement OpenAI + LangChain for query parsing and response generation
4. **Testing & Deployment:** Test locally with Next.js dev server, deploy previews on Vercel, and launch production app with continuous deployment from GitHub


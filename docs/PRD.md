# Product Requirements Document (PRD) 
Conversational Crypto Forensics MVP - Product Requirements Document (PRD)
1. Problem Statement
On-chain data platforms like Etherscan, Dune, and Chainalysis provide raw transaction data, SQL dashboards, or complex graphs that are inaccessible to non-expert users and time-consuming even for professionals. Traders, investigators, and analysts need a simple, intuitive way to query blockchain data (e.g., wallet activities, cross-chain bridges, token swaps) in real time without technical expertise. Existing tools lack natural language processing (NLP) interfaces, cross-chain flow tracing, and readable summaries tailored to diverse user needs.
2. Target Market
The MVP targets the following personas with a unified NLP-driven interface:
Curious Users (Non-technical Retail Holders): Crypto enthusiasts seeking insights into whale activity, airdrop farming, or token dumps without navigating complex tools.
DeFi Traders: Power users tracking smart money, early token buys, or MEV bots for alpha and copy-trading.
Forensic Investigators: Professionals tracing illicit fund flows across chains for compliance or law enforcement.
Institutional Analysts/Asset Managers: Teams needing real-time context on fund flows, token events, or portfolio risks.
Compliance/Risk Teams: Exchange or custody providers screening wallets and tracing transactions for risk and regulatory purposes.
3. App Goals
Core Objective: Enable users to input natural language queries (e.g., “Show wallets that bridged >$100K from Ethereum to Base in June and swapped for USDC”) and receive structured, readable blockchain data (e.g., wallet addresses, timestamps, entity labels).
MVP Focus: Deliver a functional web app with NLP query parsing, basic cross-chain data (Ethereum + Base), and simple outputs (tables/JSON) for the “thin slice” use case.
Extensibility: Design a modular framework to support future features like cross-chain indexing, real-time alerts, and AI-augmented clustering without major refactoring.
Monetization: Implement a SaaS model with a free tier (2 queries/day) and a premium tier (~200 queries/month) using Stripe for payments.
Usability: Provide an intuitive landing page and query interface accessible to both non-technical and expert users.
4. User Flows
4.1 Landing Page
Access: Users visit the web app’s landing page.
Components:
Top Left: Company name and logo (TBD).
Top Right: Sign-up and sign-in buttons.
Navigation Tabs:
Pricing: Opens a popup detailing free (2 queries/day) and premium (~200 queries/month) plans with Stripe checkout.
Contact: Links to a form for inquiries.
About Us: Displays mission and team info.
Action: Users sign up (email/password or OAuth) or sign in to access the query interface.
Post-Sign-Up: New users see an onboarding modal with example queries (e.g., “Show wallets that bought PEPE early”).
4.2 Query Interface
Access: Authenticated users (free or premium) access the query input page.
Input: Users type a natural language query (e.g., “Who bridged >$50K to Base and bought memecoins last week?”).
Processing:
NLP layer (OpenAI + LangChain) parses the query into structured filters (e.g., chain, time, value, contract).
Backend queries blockchain data via APIs (e.g., The Graph, Alchemy) for Ethereum and Base.
System applies basic entity labeling (e.g., “likely whale,” “MEV bot”) using public data (e.g., Nansen).
Output: Users receive a table or JSON with:
Anonymized wallet addresses.
Timestamped transactions (bridges, swaps).
Entity labels and confidence scores.
Optional: Simple flow diagram (e.g., wallet → bridge → swap).
Quota Check: Free users are limited to 2 queries/day; premium users get ~200 queries/month, tracked via Supabase and enforced via Stripe subscription status.
Export: Users can download results as CSV or JSON (premium feature).
4.3 Account Management
Access: Users navigate to an account page to view query usage, upgrade/downgrade plans, or update payment details via Stripe.
Sign-Out: Users can log out from any page.
5. Features
5.1 MVP Features
NLP Query Parsing: Convert natural language inputs into structured blockchain queries using OpenAI and LangChain.
Blockchain Data Retrieval: Query Ethereum and Base data (bridges, swaps, wallet activity) via The Graph or Alchemy APIs.
Entity Labeling: Tag wallets with labels like “likely whale,” “MEV bot,” or “unlabeled” using public data sources (e.g., Nansen).
Output Formats: Display results as tables or JSON, with optional flow diagrams (basic SVG or canvas-based visuals).
Landing Page: Responsive page with company logo, sign-up/sign-in, and tabs for pricing (popup), contact, and about us.
SaaS Monetization:
Free tier: 2 queries/day, tracked in Supabase.
Premium tier: ~200 queries/month, managed via Stripe subscriptions.
Pricing popup with plan details and Stripe checkout integration.
Authentication: Email/password or OAuth sign-up/sign-in, stored in Supabase Auth.
Quota Management: Track user queries in Supabase and enforce limits based on subscription tier.
5.2 Future Extensibility
Cross-Chain Support: Add Solana, Arbitrum, etc., with a unified indexing layer.
Real-Time Alerts: Implement streaming (e.g., Kafka) for live notifications (e.g., whale movements).
AI Clustering: Use embeddings or graph neural nets for advanced wallet relationship analysis.
API Access: Expose programmatic query endpoints for analysts.
Enhanced Visuals: Add interactive flow diagrams and mempool alerts.
6. Success Metrics
User Engagement: >50% of free users convert to premium within 30 days.
Query Accuracy: >90% of queries return relevant results (validated by user feedback).
Retention: >70% monthly retention for premium users.
Performance: Query response time <5 seconds for 95% of requests.
Sign-Up Conversion: >10% of landing page visitors sign up for free tier.
7. Technical Considerations
Frontend: Next.js for landing page and query interface, styled with Tailwind CSS.
Backend: Supabase for auth, query tracking, and user data storage; Node.js for API logic and NLP processing.
NLP: OpenAI API + LangChain for query parsing.
Blockchain Data: The Graph or Alchemy APIs for Ethereum/Base data.
Payments: Stripe for subscription management and checkout.
Deployment: Vercel for hosting and scaling.
Extensibility: Modular backend (e.g., separate NLP and data layers) to support future chains and features.
8. Risks and Mitigations
Risk: NLP misinterprets complex queries.
Mitigation: Provide example queries and refine prompts iteratively.
Risk: API rate limits from The Graph/Alchemy.
Mitigation: Cache frequent queries in Supabase and optimize API calls.
Risk: Scalability with premium user growth.
Mitigation: Use Vercel’s auto-scaling and Supabase’s managed database.
Risk: User confusion on landing page.
Mitigation: Include onboarding modal and clear CTA buttons.

# Nous V1 - Product Requirements Document

**Product:** Nous  
**Version:** 1.0 (MVP)  
**Status:** Scoping  
**Date:** July 26, 2025

## 1. Problem Statement

On-chain data is powerful but inaccessible. Today's tools like Etherscan, Dune, and Chainalysis provide raw transaction data, SQL dashboards, or complex graphs that require users to be data scientists, write complex SQL queries, or decipher unreadable visualizations. This leaves 99% of potential users—traders, analysts, forensic investigators, and even curious retail participants—unable to get simple, actionable answers from blockchain data. 

There is no easy way to ask a question in plain English and get a clear, concise answer about on-chain activity. Existing tools lack natural language processing interfaces, cross-chain flow tracing, and readable summaries tailored to diverse user needs.

## 2. Target Market & Personas

We are building for users who need on-chain intelligence but lack the specialized skills to get it. Our MVP focuses on five primary personas:

**The DeFi Trader:** Power users tracking smart money, early token buys, or MEV bots for alpha and copy-trading. They are technically savvy but time-poor and need answers fast, not raw data dumps.

**The Curious Retail User:** Crypto enthusiasts who hear about trends on social media but have no way to verify them. They want to understand what's happening on-chain (e.g., "Are whales selling?") without needing to learn complex tools like Etherscan or Dune.

**Forensic Investigators:** Professionals tracing illicit fund flows across chains for compliance or law enforcement purposes. They need efficient tools to follow money trails without manual transaction analysis.

**Institutional Analysts/Asset Managers:** Teams needing real-time context on fund flows, token events, or portfolio risks to make informed investment decisions.

**Compliance/Risk Teams:** Exchange or custody providers screening wallets and tracing transactions for regulatory compliance and risk assessment.

## 3. App Goals

**Primary Goal:** Prove that an NLP interface can successfully translate a plain-English question into a structured on-chain query and return a useful, understandable result.

**User Goal:** Enable a non-technical user to sign up and get an answer to a simple on-chain question within seconds.

**Business Goal:** Create a "thin slice" MVP functional enough to demonstrate the core value proposition, capture an initial waitlist/user base, and attract potential investors through a sustainable SaaS monetization model.

**Extensibility Goal:** Design a modular framework to support future features like cross-chain indexing, real-time alerts, and AI-augmented clustering without major refactoring.

## 4. User Flows

### Flow 1: Landing Page & New User Onboarding

1. A new user lands on the Nous marketing page
2. They see the company name and logo (top-left) and navigation tabs for Pricing, Contact, and About Us
3. They click "Sign Up" in the top-right corner
4. They create an account (email/password or OAuth social login)
5. Post-sign-up, they see an onboarding modal with example queries (e.g., "Show wallets that bought PEPE early")
6. They are directed to the main app interface with a prominent search bar
7. They type their first query and receive a result, experiencing the core magic of the product

### Flow 2: The DeFi Trader Seeks Alpha (Returning User)

1. The user navigates to Nous and clicks "Sign In"
2. They enter credentials and land on the main query page
3. They type: "Show wallets that bridged >$100K from Ethereum to Base in June and swapped for USDC"
4. The NLP layer parses the query into structured filters (chain, time, value, contract)
5. Backend queries blockchain data and applies entity labeling
6. The app displays a clean table of anonymized wallet addresses with transaction details and labels (e.g., "Likely MEV Bot," "Whale Wallet")

### Flow 3: Account Management & Quota Tracking

1. Users access their account page to view query usage and subscription status
2. Free users see their daily limit (2 queries/day); premium users see monthly usage (~200 queries/month)
3. Users can upgrade/downgrade plans or update payment details via Stripe integration
4. System enforces quota limits based on subscription tier tracked in Supabase

## 5. Features

### 5.1 Core Product Features (The Query Tool)

**Feature 1: NLP Query Interface**  
A single input field where authenticated users can type natural language questions, powered by OpenAI and LangChain for query parsing.

**Feature 2: Query Parsing Engine**  
A backend service that deconstructs user queries into structured parameters (e.g., chain, token, amount, date range, action).

**Feature 3: Blockchain Data Fetching**  
Integration with indexed data sources (The Graph, Alchemy) to execute structured queries.  
*Scope: Initial support for Ethereum and Base only.*

**Feature 4: Simple Results Display**  
Render output as clean, readable web tables or JSON format for authenticated users, with optional basic flow diagrams.

**Feature 5: Entity Labeling**  
Basic heuristic system providing context by checking against public lists of known whale/bot addresses (e.g., Nansen data), with confidence scores.

### 5.2 Application Shell & Monetization

**Feature 6: Landing Page**  
Responsive public-facing page with clear value proposition, hero section, and sign-up CTA.

**Feature 7: Standard Navigation**  
Persistent header with company name/logo (top-left), navigation tabs (About Us, Contact, Pricing), and Sign In/Sign Up buttons (top-right).

**Feature 8: SaaS Monetization System**  
- **Free tier:** 2 queries/day, tracked in Supabase
- **Premium tier:** ~200 queries/month, managed via Stripe subscriptions  
- **Pricing popup:** Modal with plan details and Stripe checkout integration

**Feature 9: User Authentication**  
Email/password or OAuth sign-up/sign-in flows using Supabase Auth, with quota management and subscription tracking.

### 5.3 Future Extensibility

**Cross-Chain Support:** Add Solana, Arbitrum, etc., with unified indexing layer  
**Real-Time Alerts:** Implement streaming for live notifications (whale movements)  
**AI Clustering:** Use embeddings for advanced wallet relationship analysis  
**API Access:** Expose programmatic query endpoints for analysts  
**Enhanced Visuals:** Interactive flow diagrams and mempool alerts

## 6. Success Metrics

- **User Engagement:** >50% of free users convert to premium within 30 days
- **Query Accuracy:** >90% of queries return relevant results (validated by user feedback)
- **Retention:** >70% monthly retention for premium users
- **Performance:** Query response time <5 seconds for 95% of requests
- **Sign-Up Conversion:** >10% of landing page visitors sign up for free tier

## 7. Technical Considerations

**Frontend:** Next.js for landing page and query interface, styled with Tailwind CSS  
**Backend:** Supabase for auth, query tracking, and user data storage; Node.js for API logic and NLP processing  
**NLP:** OpenAI API + LangChain for query parsing  
**Blockchain Data:** The Graph or Alchemy APIs for Ethereum/Base data  
**Payments:** Stripe for subscription management and checkout  
**Deployment:** Vercel for hosting and scaling  
**Architecture:** Modular backend (separate NLP and data layers) to support future chains and features

## 8. Risks and Mitigations

**Risk:** NLP misinterprets complex queries  
**Mitigation:** Provide example queries and refine prompts iteratively

**Risk:** API rate limits from The Graph/Alchemy  
**Mitigation:** Cache frequent queries in Supabase and optimize API calls

**Risk:** Scalability with premium user growth  
**Mitigation:** Use Vercel's auto-scaling and Supabase's managed database

**Risk:** User confusion on landing page  
**Mitigation:** Include onboarding modal and clear CTA buttons


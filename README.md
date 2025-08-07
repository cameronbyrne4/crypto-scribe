# Crypto Scribe (Nous) 🔍

Nous (UK: /naʊs/,[1] US: /nuːs/), from Ancient Greek: νοῦς, is a concept from classical philosophy, sometimes equated to intellect or intelligence, for the faculty of the human mind necessary for understanding what is true or real.[2]

> **Natural Language Blockchain Intelligence Platform**

Transform complex blockchain data into actionable insights using plain English queries. Crypto Scribe enables traders, investigators, and analysts to discover on-chain patterns without technical expertise.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/crypto-scribe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎯 Core Capabilities
- **Natural Language Queries**: Ask questions like "Show wallets that bridged >$100K to Base" in plain English
- **Cross-Chain Analysis**: Track transactions across Ethereum and Base networks
- **Entity Labeling**: Automatic classification of wallets (whales, MEV bots, exchanges)
- **Real-Time Results**: Get structured data in seconds, not hours
- **Export Capabilities**: Download results as CSV/JSON (premium feature)

### 🎨 User Experience
- **Modern UI**: Dark theme with frosted glass effects and subtle textures
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Intuitive Interface**: Clean, accessible design for both technical and non-technical users
- **Onboarding Flow**: Guided experience with example queries

### 💰 Monetization
- **Free Tier**: 2 queries per day
- **Premium Tier**: 200 queries per month with advanced features
- **Stripe Integration**: Secure payment processing and subscription management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/crypto-scribe.git
   cd crypto-scribe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_CLERK_SECRET_KEY=your_clerk_secret
   
   # Database
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # AI/ML
   VITE_OPENAI_API_KEY=your_openai_key
   
   # Blockchain APIs
   VITE_ALCHEMY_API_KEY=your_alchemy_key
   VITE_THE_GRAPH_API_KEY=your_graph_key
   
   # Payments
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   VITE_STRIPE_SECRET_KEY=your_stripe_secret
   ```

4. **Set up the database**
   ```bash
   # Run the schema creation script
   npm run db:setup
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React + Vite + TypeScript | Modern, fast development experience |
| **UI Framework** | Tailwind CSS + shadcn/ui | Consistent, accessible components |
| **Authentication** | Clerk | Secure user management with OAuth |
| **Database** | Supabase (PostgreSQL) | User data, queries, and caching |
| **AI/ML** | OpenAI + LangChain | Natural language query processing |
| **Blockchain** | The Graph + Alchemy | Multi-chain data access |
| **Payments** | Stripe | Subscription and billing management |
| **Deployment** | Vercel | Global CDN and serverless functions |

### Key Components

- **Query Processing Engine**: Converts natural language to structured blockchain queries
- **Entity Labeling System**: Classifies wallets using public data sources
- **Cross-Chain Indexing**: Unified data access across multiple networks
- **Real-Time Caching**: Optimized performance with intelligent result caching
- **Security Layer**: Row-level security, rate limiting, and input validation

## 📊 Database Schema

The application uses a PostgreSQL database with the following core tables:

- **`profiles`**: User account information synced from Clerk
- **`subscriptions`**: Subscription plans and query limits
- **`queries`**: Complete query history with NLP parsing results
- **`blockchain_results`**: Cached results with entity labeling
- **`entities`**: Registry of analyzed blockchain addresses
- **`labels`**: Classification system for wallet types

## 🎨 Design System

### Color Palette
- **Background**: `#0D0D10` - Deep dark background
- **Surface**: `#1A1A1E` - Card and dialog backgrounds
- **Primary**: `#7c45eb` - Main accent color
- **Secondary**: `#ecc48c` - Warm accent highlights
- **Borders**: `#333338` - Subtle component borders

### Typography
- **Primary Font**: Inter (400, 600, 700 weights)
- **Code Font**: Fira Code for wallet addresses and technical content

### Components
- **Frosted Glass Effects**: Semi-transparent overlays with backdrop blur
- **Grainy Texture**: Subtle noise patterns for depth
- **Responsive Grid**: Adaptive layouts for all screen sizes

## 🔧 Development

### Project Structure
```
crypto-scribe/
├── docs/                 # Project documentation
│   ├── PRD.md           # Product requirements
│   ├── schema.md        # Database schema
│   ├── tech-stack.md    # Technology decisions
│   ├── styling.md       # Design system
│   ├── security.md      # Security guidelines
│   └── task-list.md     # Development roadmap
├── src/
│   ├── components/      # React components
│   │   └── ui/         # shadcn/ui components
│   ├── pages/          # Application pages
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Database
npm run db:setup         # Initialize database schema
npm run db:seed          # Seed with sample data
```

### Development Guidelines

1. **Code Quality**: Follow DRY principles and write comprehensive comments
2. **Security**: Always validate user inputs and use environment variables for secrets
3. **Performance**: Implement caching and optimize API calls
4. **Accessibility**: Ensure all components meet WCAG guidelines
5. **Testing**: Write unit tests for critical functionality

## 🔒 Security

### Best Practices
- **API Key Management**: All sensitive keys stored server-side
- **Row-Level Security**: Database-level access control
- **Rate Limiting**: Protection against abuse and DDoS
- **Input Validation**: Comprehensive sanitization of all user inputs
- **Authentication**: Multi-layer security with Clerk integration

### Security Checklist
- [ ] Environment variables properly configured
- [ ] RLS policies enabled on all tables
- [ ] Rate limiting implemented on API endpoints
- [ ] Input validation on all forms
- [ ] HTTPS enforced in production
- [ ] Regular security audits scheduled

## 🚀 Deployment

### Production Setup

1. **Vercel Deployment**
   ```bash
   # Connect your GitHub repository to Vercel
   # Configure environment variables in Vercel dashboard
   # Deploy automatically on push to main branch
   ```

2. **Supabase Production**
   - Create production Supabase project
   - Run database migration scripts
   - Configure RLS policies

3. **Stripe Production**
   - Set up production Stripe account
   - Configure webhook endpoints
   - Test payment flows

### Environment Variables

Ensure all required environment variables are set in your production environment:

```env
# Authentication
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CLERK_SECRET_KEY=

# Database
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# AI/ML
VITE_OPENAI_API_KEY=

# Blockchain APIs
VITE_ALCHEMY_API_KEY=
VITE_THE_GRAPH_API_KEY=

# Payments
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_STRIPE_SECRET_KEY=
```

## 📈 Roadmap

### Current Status
- ✅ Landing page and authentication
- ✅ Basic query interface
- ✅ User management and subscriptions
- 🔄 NLP query processing (in progress)
- 🔄 Blockchain data integration (in progress)

### Upcoming Features
- **Cross-Chain Support**: Add Solana, Arbitrum, and other networks
- **Real-Time Alerts**: Live notifications for whale movements
- **Advanced Analytics**: Interactive charts and flow diagrams
- **API Access**: Programmatic endpoints for developers
- **Mobile App**: Native iOS and Android applications

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

There's a contact page on the landing site

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Clerk** for seamless authentication
- **Supabase** for the powerful backend platform
- **OpenAI** for the natural language processing capabilities
- **The Graph** and **Alchemy** for blockchain data access

---

**Built with ❤️ by the Crypto Scribe team**

*Making blockchain data accessible to everyone.*

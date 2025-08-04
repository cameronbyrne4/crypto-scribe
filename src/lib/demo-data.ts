// Enhanced sample data for the wallet investigation demo
export const demoWalletData = {
  wallet_investigation: {
    target_wallet: "5mHH…BrTy",
    network: "Solana",
    investigation_type: "fund_origin_and_patterns",
    
    // Cross-chain flow data
    fund_flow: {
      origin: {
        exchange: "Binance",
        wallet: "0xEa7d…",
        network: "Base",
        amount_usd: 120000,
        timestamp: "2024-07-25T10:15:00Z"
      },
      intermediaries: [
        {
          wallet: "0x3c4b…",
          label: "Burner Wallet A",
          network: "Base", 
          amount_received: 55000,
          amount_sent: 54000,
          timestamp_received: "2024-07-25T10:18:32Z",
          timestamp_sent: "2024-07-25T10:25:17Z"
        },
        {
          wallet: "0x7e9f…",
          label: "Burner Wallet B",
          network: "Base",
          amount_received: 65000,
          amount_sent: 63000, 
          timestamp_received: "2024-07-25T10:19:08Z",
          timestamp_sent: "2024-07-25T10:26:43Z"
        }
      ],
      bridge: {
        protocol: "Wormhole",
        total_bridged: 117000,
        timestamp: "2024-07-25T10:28:00Z"
      },
      target: {
        wallet: "5mHH…BrTy",
        network: "Solana",
        amount_received: 110000,
        timestamp: "2024-07-25T10:32:15Z"
      }
    },

    // Transaction activity 
    transactions: [
      {
        hash: "2xK9…",
        type: "receive", 
        amount_usd: 110000,
        token: "USDC",
        timestamp: "2024-07-25T10:32:15Z",
        counterparty: "Wormhole Bridge"
      },
      {
        hash: "3mL8…",
        type: "swap",
        amount_usd: 27500,
        token: "PEPE", 
        timestamp: "2024-07-25T10:33:42Z",
        counterparty: "Raydium DEX"
      },
      {
        hash: "4nM7…",
        type: "swap",
        amount_usd: 31200,
        token: "BONK",
        timestamp: "2024-07-25T10:34:18Z", 
        counterparty: "Jupiter DEX"
      },
      {
        hash: "5oN6…",
        type: "swap",
        amount_usd: 25800,
        token: "WIF",
        timestamp: "2024-07-25T10:35:03Z",
        counterparty: "Orca DEX"
      },
      {
        hash: "6pO5…",
        type: "swap", 
        amount_usd: 22100,
        token: "MYRO",
        timestamp: "2024-07-25T10:35:27Z",
        counterparty: "Raydium DEX"
      },
      {
        hash: "7qP4…",
        type: "arbitrage",
        amount_usd: 890,
        token: "SOL",
        timestamp: "2024-07-25T10:36:45Z",
        counterparty: "MEV Contract"
      },
      {
        hash: "8rQ3…",
        type: "arbitrage",
        amount_usd: 1240, 
        token: "SOL",
        timestamp: "2024-07-25T10:37:12Z",
        counterparty: "MEV Contract"
      }
    ],

    // Risk analysis
    risk_assessment: {
      overall_risk: "HIGH",
      confidence: 92,
      risk_factors: [
        {
          type: "coordination",
          label: "Likely Coordination",
          severity: "high",
          confidence: 89,
          description: "Multiple wallets exhibiting synchronized behavior patterns"
        },
        {
          type: "velocity", 
          label: "High Velocity Buyer",
          severity: "high",
          confidence: 94,
          description: "Rapid consecutive transactions across multiple tokens"
        },
        {
          type: "bridge_funnel",
          label: "Bridge Funnel",
          severity: "medium", 
          confidence: 87,
          description: "Strategic use of cross-chain bridges to obscure origin"
        }
      ]
    },

    // Network analysis
    network_analysis: {
      related_wallets: [
        "8sHH…CfUx",
        "9tII…DgVy", 
        "4mGG…BcTz"
      ],
      cluster_size: 4,
      correlation_score: 0.94,
      pattern_match: "memecoin_rotation_ring"
    },

    // Summary insights
    summary: {
      primary: "Origin traced to Binance via 2 burner wallets (Base). Confidence: 92%.",
      detailed: "This wallet shares funding pattern with 3 other tagged wallets. Behavior matches known memecoin rotation ring operating across Base and Solana networks.",
      timeline: "110K USDC received via 8 transactions, immediately converted to 4 different memecoins within 3 minutes, with MEV contract usage indicating sophisticated trading setup."
    }
  }
};

// Enhanced query processor for demo
export const processDemoQuery = async (query: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerQuery = query.toLowerCase();
  
  // Match the specific demo query
  if (lowerQuery.includes('5mhh') && lowerQuery.includes('brty') && lowerQuery.includes('solana')) {
    return {
      success: true,
      data: demoWalletData.wallet_investigation,
      analysis: {
        intent: 'wallet_investigation',
        confidence: 0.98,
        reasoning: 'Query requesting comprehensive wallet investigation including fund origin tracing, bridge analysis, and suspicious pattern detection.'
      }
    };
  }
  
  // Fallback to existing sample data
  return {
    success: false,
    error: 'This demo is optimized for the specific wallet investigation query.',
    analysis: {
      intent: 'unknown',
      confidence: 0.0,
      reasoning: 'Query does not match the demo scenario.'
    }
  };
};

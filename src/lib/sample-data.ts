// Sample blockchain data for UI testing
export const sampleData = {
  usdc_inflows: {
    wallets: [
      {
        wallet: "0x742d35Cc6634C0532925a3b8D72b1c0fd8d4b347",
        amount_usd: 127450,
        transaction_count: 8,
        first_seen: "2024-07-20T10:30:00Z",
        last_seen: "2024-07-26T14:32:15Z"
      },
      {
        wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        amount_usd: 89230,
        transaction_count: 12,
        first_seen: "2024-07-18T15:45:00Z",
        last_seen: "2024-07-26T14:28:42Z"
      },
      {
        wallet: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        amount_usd: 156890,
        transaction_count: 5,
        first_seen: "2024-07-22T09:15:00Z",
        last_seen: "2024-07-26T14:15:33Z"
      },
      {
        wallet: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
        amount_usd: 67890,
        transaction_count: 15,
        first_seen: "2024-07-19T12:20:00Z",
        last_seen: "2024-07-26T13:45:12Z"
      },
      {
        wallet: "0xB1b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
        amount_usd: 234560,
        transaction_count: 3,
        first_seen: "2024-07-21T16:30:00Z",
        last_seen: "2024-07-26T12:20:45Z"
      },
      {
        wallet: "0xC2b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
        amount_usd: 45670,
        transaction_count: 9,
        first_seen: "2024-07-20T08:45:00Z",
        last_seen: "2024-07-26T11:30:22Z"
      },
      {
        wallet: "0xD3b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
        amount_usd: 98760,
        transaction_count: 7,
        first_seen: "2024-07-17T14:15:00Z",
        last_seen: "2024-07-26T10:45:18Z"
      }
    ]
  },
  early_buyers: {
    buyers: [
      {
        wallet: "0x742d35Cc6634C0532925a3b8D72b1c0fd8d4b347",
        token_symbol: "PEPE",
        amount_usd: 45000,
        first_swap_timestamp: "2024-07-25T10:30:00Z",
        pool_created_at: "2024-07-25T10:25:00Z"
      },
      {
        wallet: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        token_symbol: "WOJAK",
        amount_usd: 32000,
        first_swap_timestamp: "2024-07-24T15:45:00Z",
        pool_created_at: "2024-07-24T15:40:00Z"
      },
      {
        wallet: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        token_symbol: "DOGE",
        amount_usd: 78000,
        first_swap_timestamp: "2024-07-23T09:15:00Z",
        pool_created_at: "2024-07-23T09:10:00Z"
      },
      {
        wallet: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
        token_symbol: "SHIB",
        amount_usd: 15600,
        first_swap_timestamp: "2024-07-22T12:20:00Z",
        pool_created_at: "2024-07-22T12:15:00Z"
      },
      {
        wallet: "0xB1b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
        token_symbol: "FLOKI",
        amount_usd: 89000,
        first_swap_timestamp: "2024-07-21T16:30:00Z",
        pool_created_at: "2024-07-21T16:25:00Z"
      },
      {
        wallet: "0xC2b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
        token_symbol: "BONK",
        amount_usd: 23400,
        first_swap_timestamp: "2024-07-20T08:45:00Z",
        pool_created_at: "2024-07-20T08:40:00Z"
      }
    ]
  },
  explain_tx: {
    summary: "This transaction represents a large USDC bridge transfer from Ethereum to Base. The user bridged 50,000 USDC using the official Base bridge contract. The transaction was successful and the funds are now available on Base for DeFi activities.",
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    confidence: 0.95
  },
  wallet_investigation: {
    wallet_address: "5mHH…BrTy",
    chain: "Solana",
    risk_score: 85,
    risk_level: "High",
    summary: "This wallet shows patterns consistent with potential wash trading and market manipulation. Multiple suspicious activities detected including rapid token swaps, bridge transfers, and coordinated trading patterns.",
    fund_origins: [
      {
        source: "Ethereum Bridge",
        amount: "$2.4M USDC",
        timestamp: "2024-07-15T14:30:00Z",
        bridge_protocol: "Wormhole",
        source_wallet: "0x8f2a559d...",
        risk_indicator: "High"
      },
      {
        source: "Binance Hot Wallet",
        amount: "$850K USDT",
        timestamp: "2024-07-14T09:15:00Z",
        bridge_protocol: "Portal Bridge",
        source_wallet: "0x3f5ce5fb...",
        risk_indicator: "Medium"
      }
    ],
    bridge_activity: [
      {
        from_chain: "Ethereum",
        to_chain: "Solana",
        amount: "$2.4M USDC",
        bridge: "Wormhole",
        timestamp: "2024-07-15T14:30:00Z",
        transaction_hash: "0x8f2a559d...",
        gas_fee: "$45.20"
      },
      {
        from_chain: "BSC",
        to_chain: "Solana",
        amount: "$850K USDT",
        bridge: "Portal Bridge",
        timestamp: "2024-07-14T09:15:00Z",
        transaction_hash: "0x3f5ce5fb...",
        gas_fee: "$12.80"
      }
    ],
    suspicious_patterns: [
      {
        pattern: "Wash Trading",
        confidence: 92,
        description: "Multiple rapid buy/sell cycles of the same token within short timeframes",
        transactions: 47,
        volume: "$890K",
        timeframe: "Last 7 days"
      },
      {
        pattern: "MEV Bot Activity",
        confidence: 78,
        description: "Consistent front-running of large transactions across multiple DEXes",
        transactions: 23,
        volume: "$1.2M",
        timeframe: "Last 7 days"
      },
      {
        pattern: "Pump and Dump",
        confidence: 85,
        description: "Coordinated buying followed by immediate large-scale selling",
        transactions: 12,
        volume: "$650K",
        timeframe: "Last 3 days"
      }
    ],
    recent_activity: [
      {
        action: "Token Swap",
        token: "BONK",
        amount: "$125K",
        timestamp: "2024-07-26T16:45:00Z",
        dex: "Raydium",
        suspicious: true
      },
      {
        action: "Token Swap",
        token: "JUP",
        amount: "$89K",
        timestamp: "2024-07-26T16:42:00Z",
        dex: "Orca",
        suspicious: true
      },
      {
        action: "Bridge Transfer",
        from: "Solana",
        to: "Ethereum",
        amount: "$500K USDC",
        timestamp: "2024-07-26T16:30:00Z",
        bridge: "Wormhole",
        suspicious: false
      }
    ]
  }
};

// Mock function to simulate the planner
export const processNaturalLanguageQuery = async (query: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('usdc') && (lowerQuery.includes('inflow') || lowerQuery.includes('flow'))) {
    return {
      success: true,
      data: sampleData.usdc_inflows,
      analysis: {
        intent: 'usdc_inflows',
        confidence: 0.92,
        reasoning: 'Query detected USDC inflow analysis request based on keywords and context.'
      }
    };
  }
  
  if (lowerQuery.includes('early') && lowerQuery.includes('buyer')) {
    return {
      success: true,
      data: sampleData.early_buyers,
      analysis: {
        intent: 'early_buyers',
        confidence: 0.88,
        reasoning: 'Query identified early buyer detection request for new token pools.'
      }
    };
  }
  
  if (lowerQuery.includes('explain') && lowerQuery.includes('transaction')) {
    return {
      success: true,
      data: sampleData.explain_tx,
      analysis: {
        intent: 'explain_tx',
        confidence: 0.95,
        reasoning: 'Query requested transaction explanation and analysis.'
      }
    };
  }
  
  if (lowerQuery.includes('investigate') && lowerQuery.includes('wallet')) {
    return {
      success: true,
      data: sampleData.wallet_investigation,
      analysis: {
        intent: 'wallet_investigation',
        confidence: 0.94,
        reasoning: 'Query detected wallet investigation request with fund origin and pattern analysis.'
      }
    };
  }
  
  // Default error response
  return {
    success: false,
    error: 'Unable to process your query. Please try rephrasing or check your API configuration.',
    analysis: {
      intent: 'unknown',
      confidence: 0.0,
      reasoning: 'Query intent could not be determined.'
    }
  };
}; 
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Clock, 
  DollarSign,
  Zap,
  AlertTriangle,
  Activity
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'received' | 'swap' | 'mev';
  amount: string;
  token: string;
  timestamp: string;
  counterparty?: string;
  delay?: number;
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'received',
    amount: '$110,000',
    token: 'USDC',
    timestamp: '14:32:15',
    counterparty: 'Wormhole Bridge',
    delay: 1000
  },
  {
    id: '2',
    type: 'swap',
    amount: '$27,500',
    token: 'PEPE',
    timestamp: '14:33:42',
    counterparty: 'Raydium DEX',
    delay: 3000
  },
  {
    id: '3',
    type: 'swap', 
    amount: '$31,200',
    token: 'BONK',
    timestamp: '14:34:18',
    counterparty: 'Jupiter DEX',
    delay: 4500
  },
  {
    id: '4',
    type: 'swap',
    amount: '$25,800',
    token: 'WIF',
    timestamp: '14:35:03',
    counterparty: 'Orca DEX',
    delay: 6000
  },
  {
    id: '5',
    type: 'swap',
    amount: '$22,100',
    token: 'MYRO',
    timestamp: '14:35:27',
    counterparty: 'Raydium DEX',
    delay: 7000
  },
  {
    id: '6',
    type: 'mev',
    amount: '$890',
    token: 'SOL',
    timestamp: '14:36:45',
    counterparty: 'MEV Contract',
    delay: 9000
  },
  {
    id: '7',
    type: 'mev',
    amount: '$1,240',
    token: 'SOL',
    timestamp: '14:37:12',
    counterparty: 'MEV Contract',
    delay: 10500
  }
];

export const TransactionFlow: React.FC = () => {
  const [visibleTransactions, setVisibleTransactions] = useState<Set<string>>(new Set());
  const [highlightedTx, setHighlightedTx] = useState<string | null>(null);

  useEffect(() => {
    transactions.forEach((tx) => {
      setTimeout(() => {
        setVisibleTransactions(prev => new Set([...prev, tx.id]));
        
        // Highlight for a moment
        setHighlightedTx(tx.id);
        setTimeout(() => setHighlightedTx(null), 1000);
      }, tx.delay || 0);
    });
  }, []);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'received':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'swap':
        return <Activity className="w-5 h-5 text-blue-400" />;
      case 'mev':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      default:
        return <DollarSign className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'received':
        return 'border-green-400/50 bg-green-500/10';
      case 'swap':
        return 'border-blue-400/50 bg-blue-500/10';
      case 'mev':
        return 'border-yellow-400/50 bg-yellow-500/10';
      default:
        return 'border-gray-400/50 bg-gray-500/10';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'received':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'swap':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'mev':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Transaction Flow Analysis</h2>
        <p className="text-gray-300 text-lg">Rapid-fire memecoin purchases within 3 minutes</p>
      </motion.div>

      {/* Transaction Timeline */}
      <div className="flex-1 relative max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: visibleTransactions.has(tx.id) ? 1 : 0,
                x: visibleTransactions.has(tx.id) ? 0 : -50,
                scale: highlightedTx === tx.id ? 1.05 : 1
              }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="relative"
            >
              {/* Timeline line */}
              {index < transactions.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-8 bg-gray-600 z-0" />
              )}
              
              <Card className={`${getTransactionColor(tx.type)} border-2 backdrop-blur-sm transition-all duration-300 ${
                highlightedTx === tx.id ? 'shadow-lg shadow-purple-500/20' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {getTransactionIcon(tx.type)}
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-semibold text-lg">
                            {tx.type === 'received' ? 'Funds Received' :
                             tx.type === 'swap' ? 'Token Swap' : 'MEV Interaction'}
                          </h3>
                          <Badge className={`text-xs ${getBadgeColor(tx.type)}`}>
                            {tx.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-mono">{tx.timestamp}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-white mb-1">
                            {tx.amount} <span className="text-lg text-gray-300">{tx.token}</span>
                          </p>
                          {tx.counterparty && (
                            <p className="text-sm text-gray-400">
                              via {tx.counterparty}
                            </p>
                          )}
                        </div>
                        
                        {tx.type === 'mev' && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm font-medium">MEV Bot</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 12 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-green-400 mb-1">$110K</div>
            <div className="text-xs text-gray-400">USDC Received</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-blue-400 mb-1">4</div>
            <div className="text-xs text-gray-400">Memecoin Buys</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-yellow-400 mb-1">2</div>
            <div className="text-xs text-gray-400">MEV Interactions</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-purple-400 mb-1">3 min</div>
            <div className="text-xs text-gray-400">Total Duration</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

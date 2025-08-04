import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ExternalLink,
  Shield,
  AlertCircle,
  Zap
} from 'lucide-react';

interface FlowNode {
  id: string;
  label: string;
  address: string;
  network: string;
  type: 'exchange' | 'wallet' | 'bridge' | 'target';
  position: { x: number; y: number };
  risk?: 'low' | 'medium' | 'high';
}

const flowNodes: FlowNode[] = [
  {
    id: 'binance',
    label: 'Binance Hot Wallet',
    address: '0xEa7d...',
    network: 'Base',
    type: 'exchange',
    position: { x: 50, y: 150 },
    risk: 'low'
  },
  {
    id: 'burner1',
    label: 'Burner Wallet A',
    address: '0x3c4b...',
    network: 'Base',
    type: 'wallet',
    position: { x: 250, y: 100 },
    risk: 'high'
  },
  {
    id: 'burner2',
    label: 'Burner Wallet B', 
    address: '0x7e9f...',
    network: 'Base',
    type: 'wallet',
    position: { x: 250, y: 200 },
    risk: 'high'
  },
  {
    id: 'bridge',
    label: 'Wormhole Bridge',
    address: 'Bridge...',
    network: 'Cross-Chain',
    type: 'bridge',
    position: { x: 450, y: 150 },
    risk: 'medium'
  },
  {
    id: 'target',
    label: 'Target Wallet',
    address: '5mHH…BrTy',
    network: 'Solana',
    type: 'target',
    position: { x: 650, y: 150 },
    risk: 'high'
  }
];

const connections = [
  { from: 'binance', to: 'burner1', amount: '$55K USDC', delay: 2000 },
  { from: 'binance', to: 'burner2', amount: '$65K USDC', delay: 2500 },
  { from: 'burner1', to: 'bridge', amount: '$54K USDC', delay: 5000 },
  { from: 'burner2', to: 'bridge', amount: '$63K USDC', delay: 5500 },
  { from: 'bridge', to: 'target', amount: '$110K USDC', delay: 8000 }
];

export const FlowDiagram: React.FC = () => {
  const [animatedConnections, setAnimatedConnections] = useState<Set<string>>(new Set());
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Animate nodes appearing
    flowNodes.forEach((node, index) => {
      setTimeout(() => {
        setVisibleNodes(prev => new Set([...prev, node.id]));
      }, index * 800);
    });

    // Animate connections
    connections.forEach((connection, index) => {
      setTimeout(() => {
        setAnimatedConnections(prev => new Set([...prev, `${connection.from}-${connection.to}`]));
      }, connection.delay);
    });
  }, []);

  const getNodeColor = (type: string, risk?: string) => {
    if (type === 'exchange') return 'bg-blue-500/20 border-blue-400/50';
    if (type === 'bridge') return 'bg-purple-500/20 border-purple-400/50';
    if (type === 'target') return 'bg-red-500/20 border-red-400/50';
    if (risk === 'high') return 'bg-orange-500/20 border-orange-400/50';
    return 'bg-gray-500/20 border-gray-400/50';
  };

  const getRiskIcon = (risk?: string) => {
    if (risk === 'high') return <AlertCircle className="w-4 h-4 text-orange-400" />;
    if (risk === 'medium') return <Shield className="w-4 h-4 text-yellow-400" />;
    return <Shield className="w-4 h-4 text-green-400" />;
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Cross-Chain Fund Flow Analysis</h2>
        <p className="text-gray-300 text-lg">Tracing the origin and movement of funds to wallet 5mHH…BrTy</p>
      </motion.div>

      {/* Flow Diagram */}
      <div className="flex-1 relative">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connections */}
          {connections.map((connection, index) => {
            const fromNode = flowNodes.find(n => n.id === connection.from);
            const toNode = flowNodes.find(n => n.id === connection.to);
            if (!fromNode || !toNode) return null;

            const isAnimated = animatedConnections.has(`${connection.from}-${connection.to}`);

            return (
              <g key={`${connection.from}-${connection.to}`}>
                {/* Connection line */}
                <motion.line
                  x1={fromNode.position.x + 80}
                  y1={fromNode.position.y + 40}
                  x2={toNode.position.x}
                  y2={toNode.position.y + 40}
                  stroke="url(#connectionGradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: isAnimated ? 1 : 0,
                    opacity: isAnimated ? 1 : 0
                  }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                
                {/* Animated particle */}
                {isAnimated && (
                  <motion.circle
                    r="4"
                    fill="#7c3aed"
                    initial={{ 
                      cx: fromNode.position.x + 80,
                      cy: fromNode.position.y + 40
                    }}
                    animate={{
                      cx: toNode.position.x,
                      cy: toNode.position.y + 40
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                )}

                {/* Amount label */}
                <AnimatePresence>
                  {isAnimated && (
                    <motion.text
                      x={(fromNode.position.x + toNode.position.x) / 2 + 40}
                      y={(fromNode.position.y + toNode.position.y) / 2 + 30}
                      fill="#a855f7"
                      fontSize="12"
                      textAnchor="middle"
                      fontWeight="bold"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {connection.amount}
                    </motion.text>
                  )}
                </AnimatePresence>
              </g>
            );
          })}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nodes */}
        {flowNodes.map((node) => (
          <AnimatePresence key={node.id}>
            {visibleNodes.has(node.id) && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="absolute"
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Card className={`w-32 ${getNodeColor(node.type, node.risk)} backdrop-blur-sm border-2 hover:scale-105 transition-transform cursor-pointer`}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        className="text-xs bg-white/10 text-white border-white/20"
                      >
                        {node.network}
                      </Badge>
                      {getRiskIcon(node.risk)}
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1 leading-tight">
                      {node.label}
                    </h3>
                    <p className="text-gray-300 text-xs font-mono">
                      {node.address}
                    </p>
                    {node.type === 'target' && (
                      <div className="mt-2 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs font-medium">TARGET</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 10 }}
        className="mt-8 grid grid-cols-4 gap-4"
      >
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">$110K</div>
            <div className="text-sm text-gray-400">Total Bridged</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">2</div>
            <div className="text-sm text-gray-400">Burner Wallets</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">Cross-Chain</div>
            <div className="text-sm text-gray-400">Base → Solana</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">92%</div>
            <div className="text-sm text-gray-400">Confidence</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

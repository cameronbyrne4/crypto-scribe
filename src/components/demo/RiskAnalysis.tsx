import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  TrendingUp,
  Zap,
  Target,
  Network
} from 'lucide-react';

interface RiskTag {
  id: string;
  label: string;
  risk: 'high' | 'medium' | 'low';
  confidence: number;
  delay: number;
}

const riskTags: RiskTag[] = [
  {
    id: 'coordination',
    label: 'Likely Coordination',  
    risk: 'high',
    confidence: 89,
    delay: 2000
  },
  {
    id: 'velocity',
    label: 'High Velocity Buyer',
    risk: 'high', 
    confidence: 94,
    delay: 4000
  },
  {
    id: 'bridge',
    label: 'Bridge Funnel',
    risk: 'medium',
    confidence: 87,
    delay: 6000
  }
];

export const RiskAnalysis: React.FC = () => {
  const [visibleTags, setVisibleTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    riskTags.forEach((tag) => {
      setTimeout(() => {
        setVisibleTags(prev => new Set([...prev, tag.id]));
      }, tag.delay);
    });
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-400/50',
          text: 'text-red-300',
          badge: 'bg-red-500/30 text-red-200 border-red-400/40'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-400/50', 
          text: 'text-yellow-300',
          badge: 'bg-yellow-500/30 text-yellow-200 border-yellow-400/40'
        };
      case 'low':
        return {
          bg: 'bg-green-500/20',
          border: 'border-green-400/50',
          text: 'text-green-300', 
          badge: 'bg-green-500/30 text-green-200 border-green-400/40'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-400/50',
          text: 'text-gray-300',
          badge: 'bg-gray-500/30 text-gray-200 border-gray-400/40'
        };
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case 'medium':
        return <Zap className="w-6 h-6 text-yellow-400" />;
      case 'low':
        return <TrendingUp className="w-6 h-6 text-green-400" />;
      default:
        return <Target className="w-6 h-6 text-gray-400" />;
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
        <h2 className="text-3xl font-bold text-white mb-2">Risk Assessment & Pattern Analysis</h2>
        <p className="text-gray-300 text-lg">AI-powered behavioral pattern detection</p>
      </motion.div>

      {/* Risk Tags Grid */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {riskTags.map((tag, index) => {
            const colors = getRiskColor(tag.risk);
            return (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: visibleTags.has(tag.id) ? 1 : 0,
                  scale: visibleTags.has(tag.id) ? 1 : 0.8,
                  y: visibleTags.has(tag.id) ? 0 : 20
                }}
                transition={{ 
                  type: "spring",
                  duration: 0.8,
                  delay: 0.2
                }}
              >
                <Card className={`${colors.bg} ${colors.border} border-2 backdrop-blur-sm hover:scale-105 transition-transform`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getRiskIcon(tag.risk)}
                        <h3 className={`text-lg font-bold ${colors.text}`}>
                          {tag.label}
                        </h3>
                      </div>
                      <Badge className={`text-xs ${colors.badge}`}>
                        {tag.risk.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Confidence</span>
                          <span className={colors.text}>{tag.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${tag.risk === 'high' ? 'bg-red-500' : tag.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: visibleTags.has(tag.id) ? `${tag.confidence}%` : 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-300">
                        {tag.id === 'coordination' && "Multiple wallets exhibiting synchronized behavior patterns"}
                        {tag.id === 'velocity' && "Rapid consecutive transactions across multiple tokens"}
                        {tag.id === 'bridge' && "Strategic use of cross-chain bridges to obscure origin"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Risk Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 8 }}
          className="space-y-4"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Network className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Network Analysis</h3>
                  <p className="text-gray-300 mb-4">
                    Wallet 5mHH…BrTy is connected to a cluster of 3 other wallets showing similar funding patterns and trading behavior. 
                    This suggests coordinated activity potentially indicative of a memecoin manipulation ring.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      Cluster Size: 4 wallets
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      Cross-Chain Activity
                    </Badge>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      High Correlation: 0.94
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 9 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-red-400 mb-1">HIGH</div>
            <div className="text-xs text-gray-400">Overall Risk</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-purple-400 mb-1">3</div>
            <div className="text-xs text-gray-400">Risk Factors</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-blue-400 mb-1">4</div>
            <div className="text-xs text-gray-400">Related Wallets</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-green-400 mb-1">92%</div>
            <div className="text-xs text-gray-400">AI Confidence</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  AlertTriangle, 
  TrendingUp, 
  Network,
  Shield,
  Eye,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlowDiagram } from './FlowDiagram';
import { TransactionFlow } from './TransactionFlow';
import { RiskAnalysis } from './RiskAnalysis';
import { TypingBubble } from './TypingBubble';
import { InsightOverlay } from './InsightOverlay';

interface DemoSequenceProps {
  onComplete?: () => void;
}

type DemoStep = 
  | 'query-received'
  | 'typing-analysis' 
  | 'flow-diagram'
  | 'insight-overlay'
  | 'transaction-flow'
  | 'risk-analysis'
  | 'final-insight'
  | 'complete';

export const DemoSequence: React.FC<DemoSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('query-received');
  const [stepProgress, setStepProgress] = useState(0);

  // Demo timing configuration
  const stepTimings = {
    'query-received': 3000,      // 0-3s
    'typing-analysis': 4000,     // 3-7s  
    'flow-diagram': 15000,       // 7-22s
    'insight-overlay': 5000,     // 22-27s
    'transaction-flow': 15000,   // 27-42s
    'risk-analysis': 10000,      // 42-52s
    'final-insight': 10000,      // 52-62s
    'complete': 3000             // 62-65s
  };

  useEffect(() => {
    const currentTiming = stepTimings[currentStep];
    const timer = setTimeout(() => {
      switch (currentStep) {
        case 'query-received':
          setCurrentStep('typing-analysis');
          break;
        case 'typing-analysis':
          setCurrentStep('flow-diagram');
          break;
        case 'flow-diagram':
          setCurrentStep('insight-overlay');
          break;
        case 'insight-overlay':
          setCurrentStep('transaction-flow');
          break;
        case 'transaction-flow':
          setCurrentStep('risk-analysis');
          break;
        case 'risk-analysis':
          setCurrentStep('final-insight');
          break;
        case 'final-insight':
          setCurrentStep('complete');
          break;
        case 'complete':
          onComplete?.();
          break;
      }
    }, currentTiming);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  // Progress tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setStepProgress(prev => Math.min(prev + 1, 100));
    }, stepTimings[currentStep] / 100);

    return () => clearInterval(interval);
  }, [currentStep]);

  const demoQuery = "investigating wallet 5mHH…BrTy on Solana. Where did its funds originate, how were they bridged, and what patterns are suspicious?";

  return (
    <div className="h-full bg-gradient-to-br from-black via-gray-900 to-black flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gray-800">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${stepProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Step 1: Query Received */}
      <AnimatePresence>
        {currentStep === 'query-received' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex items-center justify-center p-8"
          >
            <Card className="max-w-4xl w-full bg-white/5 border-white/10 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">Investigation Query Received</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">{demoQuery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: AI Analysis Typing */}
      <AnimatePresence>
        {currentStep === 'typing-analysis' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-8"
          >
            <TypingBubble 
              message="Analyzing cross-chain fund flows and pattern detection across Solana and connected networks..."
              duration={4000}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: Cross-Chain Flow Diagram */}
      <AnimatePresence>
        {currentStep === 'flow-diagram' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex-1 p-8"
          >
            <FlowDiagram />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 4: Insight Overlay */}
      <AnimatePresence>
        {currentStep === 'insight-overlay' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40"
          >
            <InsightOverlay 
              insight="Origin traced to Binance via 2 burner wallets (Base). Confidence: 92%."
              confidence={92}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 5: Transaction Flow Analysis */}
      <AnimatePresence>
        {currentStep === 'transaction-flow' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex-1 p-8"
          >
            <TransactionFlow />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 6: Risk Analysis */}
      <AnimatePresence>
        {currentStep === 'risk-analysis' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex-1 p-8"
          >
            <RiskAnalysis />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 7: Final AI Insight */}
      <AnimatePresence>
        {currentStep === 'final-insight' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex items-center justify-center p-8"
          >
            <Card className="max-w-5xl w-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-white">Final Analysis</h3>
                      <Badge variant="secondary" className="bg-red-500/20 text-red-300 border-red-500/30">
                        High Risk
                      </Badge>
                    </div>
                    <p className="text-gray-200 text-lg leading-relaxed mb-4">
                      This wallet shares funding pattern with 3 other tagged wallets. Behavior matches known memecoin rotation ring operating across Base and Solana networks.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-300 font-medium">Analysis Confidence: 92%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-300 font-medium">Pattern Match: Memecoin Ring</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 8: Completion */}
      <AnimatePresence>
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Zap className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Ask anything. Investigate everything.
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 text-purple-300 text-lg"
            >
              <span className="font-mono">ChainQuery</span>
              <ArrowRight className="w-4 h-4" />
              <span>Powered by AI</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

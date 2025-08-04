import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp } from 'lucide-react';

interface InsightOverlayProps {
  insight: string;
  confidence: number;
}

export const InsightOverlay: React.FC<InsightOverlayProps> = ({ insight, confidence }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -50 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-50"
      >
        <Card className="max-w-2xl bg-gradient-to-r from-green-900/40 to-blue-900/40 border-green-400/30 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white">Key Insight Detected</h3>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    High Confidence
                  </Badge>
                </div>
                
                <p className="text-gray-200 text-lg leading-relaxed mb-4">
                  {insight}
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-medium">
                      Confidence: {confidence}%
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${confidence}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pulsing background effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-green-500/10"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

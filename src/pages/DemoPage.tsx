import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowLeft, Zap, Target, Network, Shield } from 'lucide-react';

const DemoPage: React.FC = () => {
  const navigate = useNavigate();

  const startDemo = () => {
    navigate('/demo/search');
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={goBack}
          variant="outline"
          size="sm"
          className="bg-black/50 border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto">
                <Play className="w-12 h-12 text-white ml-1" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              ChainQuery AI Demo
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience our AI-powered blockchain investigation in action. 
              Watch as we analyze wallet <span className="font-mono text-purple-300">5mHH…BrTy</span> on Solana,
              trace cross-chain fund flows, and detect suspicious patterns.
            </p>
            
            {/* Demo Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <Network className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Cross-Chain Analysis</h3>
                <p className="text-gray-400 text-sm">Track funds across multiple blockchains</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Real-Time Flow</h3>
                <p className="text-gray-400 text-sm">Visualize transaction pathways</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Risk Assessment</h3>
                <p className="text-gray-400 text-sm">AI-powered threat detection</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Pattern Recognition</h3>
                <p className="text-gray-400 text-sm">Detect coordinated behavior</p>
              </motion.div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={startDemo}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 h-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Interactive Demo
              </Button>
            </motion.div>
            
            <p className="text-sm text-gray-500 mt-4">
              Demo duration: ~65 seconds • Interactive experience • Best viewed in fullscreen
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DemoPage;

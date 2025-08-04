import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DemoSequence } from '../components/demo/DemoSequence';
import { useNavigate } from 'react-router-dom';

const DemoSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<'input' | 'demo' | 'complete'>('input');
  const [query, setQuery] = useState('');
  
  const demoQuery = "investigating wallet 5mHH…BrTy on Solana. Where did its funds originate, how were they bridged, and what patterns are suspicious?";

  useEffect(() => {
    // Auto-fill the query for demo purposes
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < demoQuery.length) {
        setQuery(demoQuery.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPhase('demo');
  };

  const handleDemoComplete = () => {
    setCurrentPhase('complete');
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (currentPhase === 'demo') {
    return (
      <div className="fixed inset-0 z-50">
        <DemoSequence onComplete={handleDemoComplete} />
        
        {/* Back button */}
        <div className="absolute top-4 left-4 z-50">
          <Button
            onClick={() => setCurrentPhase('input')}
            variant="outline"
            size="sm"
            className="bg-black/50 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  if (currentPhase === 'complete') {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl font-bold mb-4">Demo Complete!</h1>
          <p className="text-gray-300 text-lg mb-4">Returning to homepage...</p>
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          size="sm"
          className="bg-black/50 border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-8"
          >
            <img 
              src="/nous-logo.svg" 
              alt="Nous" 
              className="w-20 h-20 mx-auto opacity-90"
            />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ChainQuery AI
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Experience the future of blockchain investigation
          </p>

          {/* Demo Query Input */}
          <div className="max-w-3xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about blockchain data..."
                  className="w-full h-16 px-6 pr-16 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors text-lg backdrop-blur-sm"
                  readOnly
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg p-3 h-12 w-12 transition-all duration-200"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>

          {/* Demo Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-400 mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 font-bold">1</span>
              </div>
              <span>Cross-Chain Analysis</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">2</span>
              </div>
              <span>Flow Visualization</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <span>Risk Assessment</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400 font-bold">4</span>
              </div>
              <span>AI Insights</span>
            </div>
          </div>

          {/* Call to Action */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="text-gray-400 text-lg"
          >
            Click send to begin the investigation →
          </motion.p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-gray-500 text-sm relative z-10">
        Demo Experience • Powered by AI • ~65 seconds
      </div>
    </div>
  );
};

export default DemoSearchPage;

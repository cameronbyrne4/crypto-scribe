import { motion } from "framer-motion";
import { Search, Zap, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  return (
    <div className="h-full bg-black/[0.96] p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Natural Language Queries
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ask complex blockchain questions in plain English and get instant, accurate answers.
          </p>
        </motion.div>

        {/* Search Interface Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-[#7c45eb]" />
            <h2 className="text-2xl font-semibold text-white">Query Interface</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-black/20 border border-white/10 rounded-lg p-4">
              <textarea
                placeholder="Ask a question like: 'Show me all transactions from wallet 0x123... in the last 7 days'"
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-none outline-none"
                rows={4}
                disabled
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                className="bg-[#7c45eb] hover:bg-[#6b3fd8] text-white"
                disabled
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Example Queries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <Zap className="w-8 h-8 text-[#7c45eb] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Whale Tracking</h3>
            <p className="text-gray-400 text-sm">
              "Find all wallets with more than 1000 ETH that made transactions in the last 24 hours"
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-[#7c45eb] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">MEV Detection</h3>
            <p className="text-gray-400 text-sm">
              "Identify potential MEV bot activity on Uniswap V3 in the last hour"
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <Database className="w-8 h-8 text-[#7c45eb] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Entity Analysis</h3>
            <p className="text-gray-400 text-sm">
              "Show me all transactions between known exchange wallets and DEX protocols"
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="bg-[#7c45eb]/10 border border-[#7c45eb]/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#7c45eb] mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-300">
              The natural language query interface is being developed. 
              You'll be able to ask complex blockchain questions in plain English.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage; 
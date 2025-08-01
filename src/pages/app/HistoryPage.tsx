import { motion } from "framer-motion";
import { History, Clock, Search, Download } from "lucide-react";

const HistoryPage = () => {
  const mockHistory = [
    {
      id: 1,
      query: "Show me all transactions from wallet 0x123... in the last 7 days",
      timestamp: "2024-01-15 14:30:00",
      status: "completed",
      results: 156
    },
    {
      id: 2,
      query: "Find all wallets with more than 1000 ETH that made transactions in the last 24 hours",
      timestamp: "2024-01-15 12:15:00",
      status: "completed",
      results: 23
    },
    {
      id: 3,
      query: "Identify potential MEV bot activity on Uniswap V3 in the last hour",
      timestamp: "2024-01-15 10:45:00",
      status: "completed",
      results: 8
    }
  ];

  return (
    <div className="h-full bg-black/[0.96] p-8">
      <div className="max-w-6xl mx-auto relative">
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center z-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-4">Coming Soon</div>
            <div className="text-neutral-400 text-lg max-w-md">
              You're on the waitlist, don't worry. We'll let you know when it's ready :)
            </div>
          </div>
        </div>
        
        {/* Blurred Content */}
        <div className="blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <History className="w-8 h-8 text-[#7c45eb]" />
            <h1 className="text-3xl font-bold text-white">Query History</h1>
          </div>
          <p className="text-gray-300">
            View and manage your previous blockchain queries and results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Queries</h2>
            <button className="text-[#7c45eb] hover:text-[#6b3fd8] text-sm font-medium">
              <Download className="w-4 h-4 inline mr-1" />
              Export All
            </button>
          </div>

          <div className="space-y-4">
            {mockHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="bg-black/20 border border-white/10 rounded-lg p-4 hover:bg-black/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="w-4 h-4 text-[#7c45eb]" />
                      <span className="text-white font-medium">{item.query}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timestamp}
                      </div>
                      <span className="text-[#7c45eb]">{item.results} results</span>
                    </div>
                  </div>
                  <button className="text-[#7c45eb] hover:text-[#6b3fd8] text-sm">
                    View Results
                  </button>
                </div>
              </motion.div>
            ))}
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
              Query history and result management will be available once the search functionality is live.
            </p>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage; 
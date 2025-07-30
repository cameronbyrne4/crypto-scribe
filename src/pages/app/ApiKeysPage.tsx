import { motion } from "framer-motion";
import { Key, Plus, Copy, Eye, EyeOff, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ApiKeysPage = () => {
  const [showKeys, setShowKeys] = useState(false);

  const mockApiKeys = [
    {
      id: 1,
      name: "Production API Key",
      key: "nous_live_sk_1234567890abcdef",
      created: "2024-01-10",
      lastUsed: "2024-01-15 14:30:00",
      status: "active"
    },
    {
      id: 2,
      name: "Development Key",
      key: "nous_test_sk_abcdef1234567890",
      created: "2024-01-08",
      lastUsed: "2024-01-12 09:15:00",
      status: "active"
    }
  ];

  return (
    <div className="h-full bg-black/[0.96] p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-8 h-8 text-[#7c45eb]" />
                <h1 className="text-3xl font-bold text-white">API Keys</h1>
              </div>
              <p className="text-gray-300">
                Manage your API keys for programmatic access to Nous.
              </p>
            </div>
            <Button 
              className="bg-[#7c45eb] hover:bg-[#6b3fd8] text-white"
              disabled
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Key
            </Button>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <h3 className="text-yellow-500 font-semibold mb-1">Security Notice</h3>
              <p className="text-gray-300 text-sm">
                Keep your API keys secure and never share them publicly. Each key has full access to your account's query capabilities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* API Keys List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Your API Keys</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeys(!showKeys)}
              className="text-gray-300 hover:text-white"
            >
              {showKeys ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showKeys ? "Hide" : "Show"} Keys
            </Button>
          </div>

          <div className="space-y-4">
            {mockApiKeys.map((apiKey, index) => (
              <motion.div
                key={apiKey.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-black/20 border border-white/10 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium">{apiKey.name}</h3>
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        {apiKey.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>Created: {apiKey.created}</span>
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                    
                    <div className="bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-sm">
                      {showKeys ? (
                        <span className="text-white">{apiKey.key}</span>
                      ) : (
                        <span className="text-gray-400">••••••••••••••••••••••••••••••••</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:text-white"
                      disabled
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                      disabled
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Total Requests</h3>
            <p className="text-3xl font-bold text-[#7c45eb]">1,247</p>
            <p className="text-gray-400 text-sm">This month</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Active Keys</h3>
            <p className="text-3xl font-bold text-[#7c45eb]">2</p>
            <p className="text-gray-400 text-sm">Currently in use</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Rate Limit</h3>
            <p className="text-3xl font-bold text-[#7c45eb]">100</p>
            <p className="text-gray-400 text-sm">Requests per minute</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-[#7c45eb]/10 border border-[#7c45eb]/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#7c45eb] mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-300">
              API key management and programmatic access will be available once the core functionality is complete.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApiKeysPage; 
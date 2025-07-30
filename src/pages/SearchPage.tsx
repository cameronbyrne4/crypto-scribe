import { useState } from "react";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  TrendingUp, 
  Shield, 
  Database,
  ArrowRight,
  Clock,
  Users,
  Zap,
  Download,
  Copy,
  ExternalLink
} from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const placeholders = [
    "Show wallets that bridged >$100K from Ethereum to Base in June",
    "Find MEV bots that profited from recent PEPE trades",
    "Who bought USDC after large ETH sells last week?",
    "Trace wallets connected to this address: 0x123...",
    "Show whale activity in the last 24 hours",
    "Find wallets that received airdrops and immediately sold"
  ];

  const exampleQueries = [
    {
      category: "DeFi Analysis",
      query: "Show wallets that bridged >$50K to Base and bought memecoins",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      category: "Forensics",
      query: "Trace fund flows from this suspicious address",
      icon: <Shield className="w-5 h-5" />
    },
    {
      category: "Whale Tracking",
      query: "Find large ETH holders who sold in the last week",
      icon: <Database className="w-5 h-5" />
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        query: query,
        found: 12,
        results: [
          {
            address: "0x742d35Cc6634C0532925a3b8D72b1c0fd8d4b347",
            label: "Whale Wallet",
            confidence: 0.85,
            amount: "$127,450",
            timestamp: "2024-07-26 14:32:15",
            chain: "Ethereum",
            action: "Bridge to Base"
          },
          {
            address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
            label: "MEV Bot",
            confidence: 0.92,
            amount: "$89,230",
            timestamp: "2024-07-26 14:28:42",
            chain: "Ethereum", 
            action: "Bridge to Base"
          },
          {
            address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            label: "Likely Whale",
            confidence: 0.78,
            amount: "$156,890",
            timestamp: "2024-07-26 14:15:33",
            chain: "Ethereum",
            action: "Bridge to Base"
          }
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="relative z-10">
        {/* Search Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text-primary">Ask Anything</span> About the Blockchain
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Query blockchain data using natural language. Get instant insights from Ethereum, Base, and more.
              </p>

              <GlowingEffect color="crypto" className="mb-8">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={(e) => setQuery(e.target.value)}
                  onSubmit={handleSubmit}
                  disabled={isLoading}
                />
              </GlowingEffect>

              {/* Example Queries */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {exampleQueries.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card 
                      className="glass glass-hover cursor-pointer"
                      onClick={() => setQuery(example.query)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-primary/20">
                            {example.icon}
                          </div>
                          <div className="text-left">
                            <div className="text-sm text-crypto-blue font-medium mb-1">
                              {example.category}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {example.query}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        {(isLoading || results) && (
          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <GlowingEffect color="primary">
                      <div className="py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
                        <p className="text-lg">Analyzing blockchain data...</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Parsing your query and searching across chains
                        </p>
                      </div>
                    </GlowingEffect>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">Query Results</h2>
                        <p className="text-muted-foreground">
                          Found {results.found} wallets matching: "{results.query}"
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Results
                        </Button>
                      </div>
                    </div>

                    {/* Results Table */}
                    <GlowingEffect>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Wallet Address</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Label</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Timestamp</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Chain</th>
                              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.results.map((result: any, index: number) => (
                              <motion.tr
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                              >
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-mono text-sm">
                                      {result.address.slice(0, 10)}...{result.address.slice(-8)}
                                    </span>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <ExternalLink className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                                      {result.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {Math.round(result.confidence * 100)}%
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 font-mono font-medium">
                                  {result.amount}
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                  {result.timestamp}
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-1 rounded text-xs bg-crypto-blue/20 text-crypto-blue">
                                    {result.chain}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  {result.action}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </GlowingEffect>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
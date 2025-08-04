import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Download, Copy, ExternalLink, Loader2, Send, Edit, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { processNaturalLanguageQuery } from "@/lib/sample-data";
import { useNavigate, useParams } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
  const [chatHistory, setChatHistory] = useState<Array<{
    id: string;
    type: 'user' | 'assistant';
    content: string;
    data?: any;
    analysis?: any;
    timestamp: Date;
  }>>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(chatId || null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate a unique chat ID
  const generateChatId = () => {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Start a new chat
  const startNewChat = () => {
    const newChatId = generateChatId();
    setCurrentChatId(newChatId);
    setChatHistory([]);
    navigate(`/app/search/${newChatId}`);
  };

  // Load chat from localStorage
  const loadChat = (chatId: string) => {
    const savedChat = localStorage.getItem(`nous_chat_${chatId}`);
    if (savedChat) {
      try {
        const parsedChat = JSON.parse(savedChat);
        setChatHistory(parsedChat);
      } catch (error) {
        console.error('Error loading chat:', error);
        setChatHistory([]);
      }
    }
  };

  // Save chat to localStorage
  const saveChat = (chatId: string, history: any[]) => {
    localStorage.setItem(`nous_chat_${chatId}`, JSON.stringify(history));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle URL changes and load existing chats
  useEffect(() => {
    if (chatId) {
      setCurrentChatId(chatId);
      loadChat(chatId);
    } else {
      // No chat ID in URL, start fresh
      setCurrentChatId(null);
      setChatHistory([]);
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  // Save chat whenever history changes
  useEffect(() => {
    if (currentChatId && chatHistory.length > 0) {
      saveChat(currentChatId, chatHistory);
    }
  }, [chatHistory, currentChatId]);

  const placeholders = [
    "Show me wallets with large USDC inflows on Base in the last 24 hours",
    "Find early buyers in new Base pools created this week",
    "Explain what happened in transaction 0x123...",
    "Who bought USDC on Base after large ETH sells?",
    "Show whale activity on Base DEXes today",
    "Find wallets that got into new Base tokens early"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    
    // Create new chat ID if this is the first message
    if (!currentChatId) {
      const newChatId = generateChatId();
      setCurrentChatId(newChatId);
      navigate(`/app/search/${newChatId}`);
    }
    
    // Add user message to chat
    const userMessageId = Date.now().toString();
    const userMessage = {
      id: userMessageId,
      type: 'user' as const,
      content: query.trim(),
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    const currentQuery = query.trim();
    setQuery(""); // Clear input immediately
    setIsLoading(true);
    
    try {
      console.log('Processing query:', currentQuery);
      const result = await processNaturalLanguageQuery(currentQuery);
      
      let assistantContent = '';
      
      if (result.success && result.data) {
        // Format success message based on data type
        if (result.analysis?.intent === 'usdc_inflows') {
          const count = (result.data as any)?.wallets?.length || 0;
          assistantContent = count > 0 
            ? `Found ${count} wallets with significant USDC activity on Base. Analysis shows real blockchain data from recent transactions.`
            : 'No wallets found matching your criteria in the current timeframe.';
        } else if (result.analysis?.intent === 'early_buyers') {
          const count = (result.data as any)?.buyers?.length || 0;
          assistantContent = count > 0
            ? `Discovered ${count} early buyers in recently created Base pools. Data sourced from live DEX transactions.`
            : 'No early buyers detected in recent pool creations.';
        } else if (result.analysis?.intent === 'explain_tx') {
          assistantContent = (result.data as any)?.summary || 'Transaction analysis completed.';
        } else if (result.analysis?.intent === 'wallet_investigation') {
          const data = result.data as any;
          assistantContent = `Investigation complete for wallet ${data.wallet_address} on ${data.chain}. Risk score: ${data.risk_score}/100 (${data.risk_level} risk). ${data.summary}`;
        } else {
          assistantContent = 'Analysis completed successfully.';
        }
      } else {
        // Handle errors with helpful suggestions
        assistantContent = result.error || 'Failed to process your query.';
        
        // Add specific suggestions for common errors
        if (assistantContent.includes('API key') || assistantContent.includes('key required')) {
          assistantContent += '\n\n💡 **Suggestion**: This requires a valid GoldRush API key for real blockchain data access.';
        } else if (assistantContent.includes('No USDC transfers found') || assistantContent.includes('No wallets found')) {
          assistantContent += '\n\n💡 **Try**: Reducing the minimum amount (e.g., "$500 USDC") or extending the time range (e.g., "last 7 days").';
        } else if (assistantContent.includes('No new pools found') || assistantContent.includes('No early buyers')) {
          assistantContent += '\n\n💡 **Try**: Extending the time range (e.g., "last 7 days") or checking different chains with more DEX activity.';
        }
      }
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: assistantContent,
        data: result.success ? result.data : null,
        analysis: result.analysis,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, assistantMessage]);
      
    } catch (err) {
      console.error('Query processing error:', err);
      
      let errorMessage = 'An unexpected error occurred while processing your query.';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // Add context for common error types
        if (err.message.includes('fetch')) {
          errorMessage += '\n\n💡 **Network Issue**: Check your internet connection and try again.';
        } else if (err.message.includes('rate limit') || err.message.includes('429')) {
          errorMessage += '\n\n💡 **Rate Limited**: Please wait a moment before making another request.';
        }
      }
      
      const errorResponseMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: errorMessage,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderUSDCInflowResults = (data: any, messageId: string) => {
    if (!data || !data.wallets || data.wallets.length === 0) {
      return <p className="text-gray-400">No wallets found matching your criteria.</p>;
    }

    const isExpanded = expandedTables.has(messageId);
    const displayCount = isExpanded ? data.wallets.length : 5;

    const toggleExpansion = () => {
      const newExpanded = new Set(expandedTables);
      if (isExpanded) {
        newExpanded.delete(messageId);
      } else {
        newExpanded.add(messageId);
      }
      setExpandedTables(newExpanded);
    };

    return (
      <div className="overflow-x-auto mt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-medium text-sm">
            USDC Inflow Analysis ({data.wallets.length} wallets found)
          </h4>
          {data.wallets.length > 5 && (
            <Button
              onClick={toggleExpansion}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white h-6 px-2 text-xs"
            >
              {isExpanded ? 'Show Less' : `Show All ${data.wallets.length}`}
            </Button>
          )}
        </div>
        
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-3 font-medium text-gray-400">Rank</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">Wallet</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">USDC Amount</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">Transactions</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">First Seen</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {data.wallets.slice(0, displayCount).map((wallet: any, index: number) => (
              <tr
                key={index}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-2 px-3 text-gray-400 text-xs">
                  #{index + 1}
                </td>
                <td className="py-2 px-3">
                  <span className="font-mono text-xs text-white">
                    {wallet.wallet}
                  </span>
                </td>
                <td className="py-2 px-3 font-mono font-medium text-green-400">
                  ${wallet.amount_usd.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-white">
                  {wallet.transaction_count}
                </td>
                <td className="py-2 px-3 text-gray-400 text-xs">
                  {new Date(wallet.first_seen).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 text-gray-400 text-xs">
                  {new Date(wallet.last_seen).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!isExpanded && data.wallets.length > 5 && (
          <div className="mt-3 p-2 bg-white/5 rounded border border-white/10 text-center">
            <p className="text-gray-400 text-xs">
              Showing top 5 of {data.wallets.length} results. 
              <Button
                onClick={toggleExpansion}
                variant="link"
                className="text-blue-400 hover:text-blue-300 p-0 h-auto text-xs ml-1"
              >
                View all {data.wallets.length} wallets
              </Button>
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderEarlyBuyersResults = (data: any, messageId: string) => {
    if (!data || !data.buyers || data.buyers.length === 0) {
      return <p className="text-gray-400">No early buyers found matching your criteria.</p>;
    }

    const isExpanded = expandedTables.has(messageId);
    const displayCount = isExpanded ? data.buyers.length : 5;

    const toggleExpansion = () => {
      const newExpanded = new Set(expandedTables);
      if (isExpanded) {
        newExpanded.delete(messageId);
      } else {
        newExpanded.add(messageId);
      }
      setExpandedTables(newExpanded);
    };

    return (
      <div className="overflow-x-auto mt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-medium text-sm">
            Early Buyers Analysis ({data.buyers.length} buyers found)
          </h4>
          {data.buyers.length > 5 && (
            <Button
              onClick={toggleExpansion}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white h-6 px-2 text-xs"
            >
              {isExpanded ? 'Show Less' : `Show All ${data.buyers.length}`}
            </Button>
          )}
        </div>
        
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-3 font-medium text-gray-400">Rank</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">Wallet</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">Token</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">Amount USD</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">First Swap</th>
              <th className="text-left py-2 px-3 font-medium text-gray-400">Pool Created</th>
            </tr>
          </thead>
          <tbody>
            {data.buyers.slice(0, displayCount).map((buyer: any, index: number) => (
              <tr
                key={index}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-2 px-3 text-gray-400 text-xs">
                  #{index + 1}
                </td>
                <td className="py-2 px-3">
                  <span className="font-mono text-xs text-white">
                    {buyer.wallet}
                  </span>
                </td>
                <td className="py-2 px-3 text-blue-400 font-medium">
                  {buyer.token_symbol}
                </td>
                <td className="py-2 px-3 font-mono font-medium text-green-400">
                  ${buyer.amount_usd?.toLocaleString() || '0'}
                </td>
                <td className="py-2 px-3 text-gray-400 text-xs">
                  {new Date(buyer.first_swap_timestamp).toLocaleString()}
                </td>
                <td className="py-2 px-3 text-gray-400 text-xs">
                  {new Date(buyer.pool_created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!isExpanded && data.buyers.length > 5 && (
          <div className="mt-3 p-2 bg-white/5 rounded border border-white/10 text-center">
            <p className="text-gray-400 text-xs">
              Showing top 5 of {data.buyers.length} results. 
              <Button
                onClick={toggleExpansion}
                variant="link"
                className="text-blue-400 hover:text-blue-300 p-0 h-auto text-xs ml-1"
              >
                View all {data.buyers.length} buyers
              </Button>
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTransactionResults = (data: any, messageId: string) => {
    if (!data || !data.summary) {
      return <p className="text-gray-400">Unable to explain this transaction.</p>;
    }

    return (
      <div className="mt-4">
        <div className="mb-3">
          <h4 className="text-white font-medium text-sm mb-2">
            Transaction Analysis
          </h4>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded border border-white/10">
            <h5 className="text-gray-400 text-xs font-medium mb-1">Summary</h5>
            <p className="text-white text-sm">{data.summary}</p>
          </div>
          
          {data.hash && (
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h5 className="text-gray-400 text-xs font-medium mb-1">Transaction Hash</h5>
              <p className="text-white text-xs font-mono break-all">{data.hash}</p>
            </div>
          )}
          
          {data.confidence !== undefined && (
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h5 className="text-gray-400 text-xs font-medium mb-1">Analysis Confidence</h5>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full" 
                    style={{ width: `${data.confidence * 100}%` }}
                  />
                </div>
                <span className="text-white text-xs">
                  {Math.round(data.confidence * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWalletInvestigationResults = (data: any, messageId: string) => {
    if (!data || !data.wallet_address) {
      return <p className="text-gray-400">Unable to investigate this wallet.</p>;
    }

    const getRiskColor = (level: string) => {
      switch (level.toLowerCase()) {
        case 'high': return 'text-red-400';
        case 'medium': return 'text-yellow-400';
        case 'low': return 'text-green-400';
        default: return 'text-gray-400';
      }
    };

    return (
      <div className="mt-4 space-y-4">
        {/* Wallet Overview */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-white font-medium text-lg">{data.wallet_address}</h4>
              <p className="text-gray-400 text-sm">{data.chain} • Risk Score: {data.risk_score}/100</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(data.risk_level)} bg-white/5`}>
              {data.risk_level} Risk
            </div>
          </div>
          <p className="text-white text-sm">{data.summary}</p>
        </div>

        {/* Fund Origins */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h5 className="text-white font-medium text-sm mb-3">Fund Origins</h5>
          <div className="space-y-2">
            {data.fund_origins.map((origin: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                <div>
                  <p className="text-white text-sm font-medium">{origin.source}</p>
                  <p className="text-gray-400 text-xs">{origin.bridge_protocol} • {new Date(origin.timestamp).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{origin.amount}</p>
                  <span className={`text-xs ${getRiskColor(origin.risk_indicator)}`}>{origin.risk_indicator}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge Activity */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h5 className="text-white font-medium text-sm mb-3">Bridge Activity</h5>
          <div className="space-y-2">
            {data.bridge_activity.map((bridge: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                <div>
                  <p className="text-white text-sm font-medium">{bridge.from_chain} → {bridge.to_chain}</p>
                  <p className="text-gray-400 text-xs">{bridge.bridge} • {new Date(bridge.timestamp).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{bridge.amount}</p>
                  <p className="text-gray-400 text-xs">Gas: {bridge.gas_fee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suspicious Patterns */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h5 className="text-white font-medium text-sm mb-3">Suspicious Patterns</h5>
          <div className="space-y-3">
            {data.suspicious_patterns.map((pattern: any, index: number) => (
              <div key={index} className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="text-red-400 font-medium text-sm">{pattern.pattern}</h6>
                  <span className="text-red-400 text-xs">{pattern.confidence}% confidence</span>
                </div>
                <p className="text-white text-sm mb-2">{pattern.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>{pattern.transactions} transactions</span>
                  <span>{pattern.volume} volume</span>
                  <span>{pattern.timeframe}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h5 className="text-white font-medium text-sm mb-3">Recent Activity</h5>
          <div className="space-y-2">
            {data.recent_activity.map((activity: any, index: number) => (
              <div key={index} className={`flex items-center justify-between p-2 rounded ${activity.suspicious ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5'}`}>
                <div>
                  <p className="text-white text-sm font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.dex || activity.bridge} • {new Date(activity.timestamp).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{activity.amount}</p>
                  {activity.suspicious && <span className="text-red-400 text-xs">Suspicious</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = (analysis: any, data: any, messageId: string) => {
    if (!analysis || !data) return null;

    return (
      <div className="mt-4">
        {/* Analysis summary */}
        <div className="mb-3 p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-medium">
              Intent: {analysis.intent.replace('_', ' ').toUpperCase()}
            </span>
            <span className="text-xs text-green-400 font-medium">
              {Math.round(analysis.confidence * 100)}% confidence
            </span>
          </div>
          <p className="text-xs text-gray-300">{analysis.reasoning}</p>
        </div>

        {/* Render based on intent type */}
        {analysis.intent === 'usdc_inflows' && renderUSDCInflowResults(data, messageId)}
        {analysis.intent === 'early_buyers' && renderEarlyBuyersResults(data, messageId)}
        {analysis.intent === 'explain_tx' && renderTransactionResults(data, messageId)}
        {analysis.intent === 'wallet_investigation' && renderWalletInvestigationResults(data, messageId)}
      </div>
    );
  };

  return (
    <div className="h-screen bg-black/[0.96] flex flex-col relative">
      {/* Background Nous Logo */}
      {/* Background Nous Logo - Responsive positioning */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 transition-all duration-300 ease-in-out">
        <img 
          src="/nous-logo.svg" 
          alt="Nous" 
          className="w-[800px] h-[800px] opacity-5 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        />
      </div>
      
      {chatHistory.length === 0 ? (
        // Welcome screen with centered input (like ChatGPT)
        <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
          <div className="max-w-3xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Personalized Greeting */}
              <h1 className="text-5xl font-bold text-white mb-8">
                Hello, Anon
              </h1>
              
              
              
              {/* Centered Input */}
              <div className="max-w-2xl mx-auto mb-12">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative">
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask anything about blockchain data..."
                      disabled={isLoading}
                      rows={1}
                      className="w-full min-h-[64px] max-h-48 px-6 pr-20 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#7c45eb]/50 transition-all text-lg resize-none"
                      style={{
                        height: 'auto',
                        minHeight: '64px',
                        maxHeight: '192px',
                        overflow: 'hidden'
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        const newHeight = Math.min(target.scrollHeight, 192);
                        target.style.height = newHeight + 'px';
                        
                        // Only show scrollbar when we've reached max height
                        if (newHeight >= 192) {
                          target.style.overflow = 'auto';
                        } else {
                          target.style.overflow = 'hidden';
                        }
                      }}
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !query.trim()}
                      className="absolute right-3 bottom-3 bg-[#7c45eb]/20 backdrop-blur-md border border-[#7c45eb]/30 hover:bg-[#7c45eb]/30 text-white rounded-lg p-3 h-12 w-12 transition-all flex items-center justify-center"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Example queries */}
              <div className="w-full">
                <InfiniteMovingCards
                  items={[
                    { quote: "Show me wallets with large USDC inflows on Base" },
                    { quote: "Find early buyers in new Base pools this week" },
                    { quote: "Explain transaction 0x123..." },
                    { quote: "Who are the biggest USDC whales today?" },
                    { quote: "Show whale activity on Base DEXes today" },
                    { quote: "Find wallets that got into new Base tokens early" },
                    { quote: "Trace fund flows from this suspicious address" },
                    { quote: "Show MEV bot activity in the last hour" }
                  ]}
                  direction="left"
                  speed="fast"
                  className="w-full"
                  onItemClick={(quote) => setQuery(quote)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        // Chat interface with ChatGPT-style layout
        <div className="flex-1 flex flex-col relative z-10">
          {/* Main content area - scrollable to window edge */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 pt-8 space-y-6 max-w-6xl mx-auto w-full">
              {chatHistory.map((message) => (
                <motion.div 
                  key={message.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`w-full group ${message.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                    <div className={`rounded-lg p-4 ${
                      message.type === 'user' 
                        ? 'bg-[#7c45eb]/20 backdrop-blur-md border border-[#7c45eb]/30 text-white ml-auto max-w-md' 
                        : 'bg-white/5 border border-white/10 text-white'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      
                      {/* Render data visualization for assistant messages */}
                      {message.type === 'assistant' && message.data && message.analysis && 
                        renderResults(message.analysis, message.data, message.id)
                      }
                    </div>
                    
                    {/* Message actions */}
                    <div className={`flex items-center gap-2 mt-2 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      {/* User message actions (hover only) */}
                      {message.type === 'user' && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:!text-foreground hover:!bg-transparent"
                                onClick={() => navigator.clipboard.writeText(message.content)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:!text-foreground hover:!bg-transparent"
                                onClick={() => setQuery(message.content)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      )}
                      
                      {/* Assistant message actions (always visible) */}
                      {message.type === 'assistant' && (
                        <div className="flex items-center gap-1">
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:!text-foreground hover:!bg-transparent"
                                onClick={() => navigator.clipboard.writeText(message.content)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:!text-foreground hover:!bg-transparent"
                                onClick={() => {
                                  // Share functionality
                                  if (navigator.share) {
                                    navigator.share({
                                      title: 'Nous AI Response',
                                      text: message.content
                                    });
                                  } else {
                                    navigator.clipboard.writeText(message.content);
                                  }
                                }}
                              >
                                <Share className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:!text-foreground hover:!bg-transparent"
                                onClick={() => {
                                  // Download as text file
                                  const blob = new Blob([message.content], { type: 'text/plain' });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `nous-response-${Date.now()}.txt`;
                                  a.click();
                                  URL.revokeObjectURL(url);
                                }}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="w-full mr-12">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-[#7c45eb]" />
                        <span className="text-gray-300">Analyzing your query with AI...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </main>

          {/* Input Area - fixed at bottom */}
          <footer className="p-4 bg-black/50 border-t border-white/10">
            <div className="max-w-6xl mx-auto w-full">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask Nous anything..."
                    disabled={isLoading}
                    className="w-full h-12 px-6 pr-16 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#7c45eb]/50 transition-colors text-lg"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !query.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#7c45eb] hover:bg-[#6b3fd8] text-white rounded-lg p-3 h-8 w-8"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default SearchPage; 
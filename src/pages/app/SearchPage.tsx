import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Download, Copy, ExternalLink, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { processNaturalLanguageQuery } from "@/lib/sample-data";

const SearchPage = () => {
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

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
      </div>
    );
  };

  return (
    <div className="h-full bg-black/[0.96] flex flex-col">
      {chatHistory.length === 0 ? (
        // Welcome screen with centered input (like ChatGPT)
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-3xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Nous Logo */}
              <div className="mb-6">
                <img 
                  src="/nous-logo.svg" 
                  alt="Nous" 
                  className="w-16 h-16 mx-auto mb-4"
                />
              </div>
              
              {/* Personalized Greeting */}
              <h1 className="text-5xl font-bold text-white mb-8">
                Hello, Anon
              </h1>
              
              {/* Centered Input */}
              <div className="max-w-2xl mx-auto mb-12">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask anything about blockchain data..."
                      disabled={isLoading}
                      className="w-full h-16 px-6 pr-16 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#7c45eb]/50 transition-colors text-lg"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !query.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#7c45eb] hover:bg-[#6b3fd8] text-white rounded-lg p-3 h-12 w-12"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Example queries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Show me wallets with large USDC inflows on Base",
                  "Find early buyers in new Base pools this week",
                  "Explain transaction 0x123...",
                  "Who are the biggest USDC whales today?"
                ].map((example, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => setQuery(example)}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg text-left hover:bg-white/10 transition-colors"
                  >
                    <p className="text-white text-sm">{example}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        // Chat interface with bottom input
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {chatHistory.map((message) => (
              <motion.div 
                key={message.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-4xl ${message.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                  <div className={`rounded-lg p-4 ${
                    message.type === 'user' 
                      ? 'bg-[#7c45eb] text-white ml-auto max-w-md' 
                      : 'bg-white/5 border border-white/10 text-white'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Render data visualization for assistant messages */}
                    {message.type === 'assistant' && message.data && message.analysis && 
                      renderResults(message.analysis, message.data, message.id)
                    }
                  </div>
                  
                  <div className={`text-xs text-gray-400 mt-2 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
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
                <div className="max-w-4xl mr-12">
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

          {/* Input Area */}
          <div className="border-t border-white/10 p-4 bg-black/50">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                <div className="flex-1">
                  <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={(e) => setQuery(e.target.value)}
                    onSubmit={handleSubmit}
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !query.trim()}
                  className="bg-[#7c45eb] hover:bg-[#6b3fd8] text-white"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage; 
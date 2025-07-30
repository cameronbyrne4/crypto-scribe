import { motion } from "framer-motion";
import { ArrowLeft, Zap, Shield, Database, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const AppPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useAuthGuard(true);

  const features = [
    {
      title: "Natural Language Queries",
      description: "Ask complex blockchain questions in plain English",
      icon: <Search className="w-6 h-6 text-[#7c45eb]" />,
      status: "In Development"
    },
    {
      title: "Cross-Chain Tracking", 
      description: "Trace transactions across multiple blockchains",
      icon: <Shield className="w-6 h-6 text-[#7c45eb]" />,
      status: "Coming Soon"
    },
    {
      title: "Entity Labeling",
      description: "Automatically identify whales, MEV bots, and entities",
      icon: <Database className="w-6 h-6 text-[#7c45eb]" />,
      status: "Coming Soon"
    }
  ];

  // Show loading state while Clerk is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black/[0.96] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/[0.96]">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Landing
            </Button>
            <div className="h-6 w-px bg-white/20" />
            <h1 className="text-xl font-semibold text-white">Nous Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#7c45eb]" />
            <span className="text-sm text-gray-400">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl md:text-5xl font-bold mb-6 text-transparent">
            Welcome to Nous
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're putting the finishing touches on your blockchain intelligence dashboard. 
            Get ready to uncover crypto fraud and compliance using natural language queries.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => navigate("/")}
              className="bg-[#7c45eb] hover:bg-[#6b3fd8] text-white px-8 py-3"
            >
              Explore Features
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                {feature.icon}
                <span className="text-sm text-[#7c45eb] font-medium">
                  {feature.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold text-white mb-4 text-center">
            Development Progress
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Backend Infrastructure</span>
              <span className="text-[#7c45eb] font-medium">75%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-[#7c45eb] h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">AI Integration</span>
              <span className="text-[#7c45eb] font-medium">60%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-[#7c45eb] h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">User Interface</span>
              <span className="text-[#7c45eb] font-medium">90%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-[#7c45eb] h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppPage; 
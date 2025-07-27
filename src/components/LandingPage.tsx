import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { AppleCards } from "@/components/ui/apple-cards";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Shield, 
  Database, 
  TrendingUp, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight,
  Mail,
  Globe,
  Lock
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      category: "Intelligence",
      title: "Natural Language Queries",
      description: "Ask questions in plain English and get instant blockchain insights. No SQL knowledge required.",
      icon: <Search className="w-6 h-6 text-white" />
    },
    {
      category: "Security", 
      title: "Cross-Chain Tracking",
      description: "Trace transactions across Ethereum, Base, and other chains with complete flow visibility.",
      icon: <Shield className="w-6 h-6 text-white" />
    },
    {
      category: "Analytics",
      title: "Entity Labeling",
      description: "Automatically identify whales, MEV bots, and other entities with confidence scores.",
      icon: <Database className="w-6 h-6 text-white" />
    }
  ];

  const whyUsCards = [
    {
      title: "Real-Time Intelligence",
      description: "Get instant answers to complex blockchain questions without technical expertise.",
      icon: <Zap className="w-8 h-8 text-primary" />
    },
    {
      title: "Professional Grade",
      description: "Built for forensic investigators, traders, and institutional analysts.",
      icon: <Shield className="w-8 h-8 text-primary" />
    },
    {
      title: "Cross-Chain Support",
      description: "Unified view across multiple blockchains with seamless flow tracking.",
      icon: <Globe className="w-8 h-8 text-primary" />
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "2 queries per day",
        "Basic entity labeling",
        "Ethereum & Base support",
        "Standard support"
      ],
      isPopular: false
    },
    {
      name: "Premium",
      price: "$49",
      period: "/month", 
      description: "For professionals and traders",
      features: [
        "200 queries per month",
        "Advanced entity labeling",
        "All chains supported",
        "Priority support",
        "Export capabilities",
        "API access"
      ],
      isPopular: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-crypto-blue/10 to-crypto-purple/10" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <Highlight className="text-foreground">
                Blockchain Intelligence
              </Highlight>
              <br />
              <span className="gradient-text-primary">Made Simple</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ask questions in plain English and get instant insights from blockchain data. 
              No technical expertise required.
            </p>
            
            <GlowingEffect color="crypto" className="inline-block">
              <Button 
                size="lg"
                onClick={() => navigate("/auth/signup")}
                className="bg-gradient-primary hover:opacity-80 text-lg px-8 py-4 h-auto"
              >
                Start Investigating
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </GlowingEffect>
            
            <p className="text-sm text-muted-foreground mt-4">
              Free tier includes 2 queries per day • No credit card required
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text-secondary">What's Included</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to unlock blockchain intelligence
            </p>
          </motion.div>

          <AppleCards cards={features} />
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text-accent">Why ChainQuery?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most intuitive way to access blockchain intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUsCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EvervaultCard>
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground">{card.description}</p>
                  </div>
                </EvervaultCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text-primary">Simple Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you need more
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <GlowingEffect 
                  color={plan.isPopular ? "crypto" : "primary"}
                  className="h-full"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => navigate("/auth/signup")}
                      variant={plan.isPopular ? "default" : "outline"}
                      className={plan.isPopular ? "bg-gradient-primary hover:opacity-80 w-full" : "w-full"}
                    >
                      Get Started
                    </Button>
                  </div>
                </GlowingEffect>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-sm opacity-60"></div>
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold gradient-text-primary">
                  ChainQuery
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Making blockchain intelligence accessible to everyone through natural language queries.
              </p>
              <p className="text-sm text-muted-foreground">
                © 2025 ChainQuery. All rights reserved.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="glass rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Have questions? We'd love to hear from you.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate("/contact")}
                      className="border-primary/20 hover:border-primary/40"
                    >
                      Get in Touch
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
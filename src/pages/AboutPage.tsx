import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Database, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  Globe,
  TrendingUp,
  Lock
} from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-founder",
      description: "Former blockchain analyst at Chainalysis with 6+ years in crypto forensics.",
      icon: <Shield className="w-8 h-8 text-primary" />
    },
    {
      name: "Sarah Kim", 
      role: "CTO & Co-founder",
      description: "Ex-Google engineer specializing in NLP and distributed systems.",
      icon: <Database className="w-8 h-8 text-primary" />
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Product",
      description: "Product leader from Coinbase with deep DeFi and trading experience.",
      icon: <TrendingUp className="w-8 h-8 text-primary" />
    }
  ];

  const values = [
    {
      title: "Accessibility First",
      description: "Making blockchain data accessible to everyone, not just data scientists.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Privacy & Security",
      description: "Your queries and data remain private with enterprise-grade security.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Real-Time Intelligence",
      description: "Providing instant insights from the latest on-chain activity.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Cross-Chain Future",
      description: "Building unified intelligence across all major blockchain networks.",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text-primary">About ChainQuery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're democratizing blockchain intelligence by making on-chain data 
              accessible through natural language queries.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <GlowingEffect color="crypto" className="max-w-4xl mx-auto">
              <div className="text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today's blockchain data tools require technical expertise that 99% of users don't have. 
                  We're changing that by creating an intuitive interface where anyone can ask questions 
                  in plain English and get instant, actionable insights from blockchain data. Whether you're 
                  a trader tracking smart money, an investigator following fund flows, or just curious 
                  about on-chain activity, ChainQuery makes blockchain intelligence accessible to all.
                </p>
              </div>
            </GlowingEffect>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text-secondary">Our Values</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass glass-hover h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0">
                          {value.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text-accent">Meet the Team</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
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
                        {member.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-sm text-primary mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.description}</p>
                    </div>
                  </EvervaultCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <GlowingEffect>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold gradient-text-primary mb-2">10K+</div>
                  <div className="text-muted-foreground">Queries Processed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text-primary mb-2">2</div>
                  <div className="text-muted-foreground">Blockchains Supported</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text-primary mb-2">95%</div>
                  <div className="text-muted-foreground">Query Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text-primary mb-2">&lt;5s</div>
                  <div className="text-muted-foreground">Average Response Time</div>
                </div>
              </div>
            </GlowingEffect>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
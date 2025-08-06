import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import React from "react";
import {
  UnifiedNavbar,
} from "@/components/ui/shrinking-navbar";
// Authentication imports removed for waitlist mode
import { GridBackground } from "@/components/ui/grid-background";
import { AppleCards } from "@/components/ui/apple-cards";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GlowingCardEffect } from "@/components/ui/glowing-card-effect";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
// getAppRoute removed for waitlist mode
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
  Lock,
  Plus
} from "lucide-react";
import CtaCard from "@/components/CtaCard";

const Index = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState("natural-language");

  const navItems = [
    {
      name: "Features",
      link: "/#features",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

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
      icon: <Zap className="w-8 h-8 text-[#7c45eb]" />
    },
    {
      title: "Professional Grade",
      description: "Built for forensic investigators, traders, and institutional analysts.",
      icon: <Shield className="w-8 h-8 text-[#7c45eb]" />
    },
    {
      title: "Cross-Chain Support",
      description: "Unified view across multiple blockchains with seamless flow tracking.",
      icon: <Globe className="w-8 h-8 text-[#7c45eb]" />
    },
    {
      title: "Natural Language Queries",
      description: "Ask questions in plain English - no SQL knowledge or technical expertise required.",
      icon: <Search className="w-8 h-8 text-[#7c45eb]" />
    },
    {
      title: "Compliance Ready",
      description: "Built-in risk assessment and regulatory compliance tools for institutional use.",
      icon: <Lock className="w-8 h-8 text-[#7c45eb]" />
    }
  ];

  // Features section data for the accordion-style layout
  const featureSections = [
    {
      id: "natural-language",
      title: "Natural Language Queries",
      description: "Ask complex blockchain questions in plain English and get instant, accurate answers without any technical expertise.",
      image: "/feature-natural-language.svg",
      cta: "Try a Query",
      ctaLink: "/waitlist"
    },
    {
      id: "cross-chain",
      title: "Cross-Chain Tracking",
      description: "Trace transactions across multiple blockchains with complete flow visibility and entity identification.",
      image: "/feature-cross-chain.svg",
      cta: "Explore Networks",
      ctaLink: "/waitlist"
    },
    {
      id: "entity-labeling",
      title: "Entity Labeling",
      description: "Automatically identify whales, MEV bots, exchanges, and other entities with confidence scores and risk assessment.",
      image: "/feature-entity-labeling.svg",
      cta: "View Entities",
      ctaLink: "/waitlist"
    },
    {
      id: "real-time-alerts",
      title: "Real-Time Alerts",
      description: "Set up custom alerts for suspicious transactions, whale movements, and compliance violations across all supported chains.",
      image: "/feature-alerts.svg",
      cta: "Set Up Alerts",
      ctaLink: "/waitlist"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <UnifiedNavbar
        navItems={navItems}
      />
      
      {/* Hero Section with Spotlight */}
      <section className="relative flex h-[40rem] w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center pt-20">
        {/* Fade to black at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />
        <div
          className="pointer-events-none absolute inset-0 [background-size:40px_40px] select-none"
          style={{
            backgroundImage: "linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)"
          }}
        />
        
        <GridBackground />
        
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl mb-6">
              Blockchain Intelligence
              <br />
              Made Simple
            </h1>
            
            <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300 mb-8">
              Uncover crypto fraud and compliance using natural language queries.
            </p>
            
            <div className="flex justify-center">
              <HoverBorderGradient
                onClick={() => navigate("/waitlist")}
                className="text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2 cursor-pointer"
              >
                Start Investigating
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </HoverBorderGradient>
            </div>
            
            <p className="text-sm text-neutral-400 mt-4">
              Free tier includes 2 queries per day • No credit card required
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section - GitHub Style */}
      <section className="py-20 bg-black/[0.96]" id="features">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl md:text-4xl font-bold mb-4 text-transparent">
              What does Nous include?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left side - Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <Accordion 
                type="single" 
                value={selectedFeature}
                onValueChange={(value) => value && setSelectedFeature(value)}
                className="w-full"
              >
                {featureSections.map((feature, index) => (
                  <AccordionItem 
                    key={feature.id} 
                    value={feature.id}
                    className="border-b border-white/10"
                  >
                    <AccordionTrigger className="text-left hover:no-underline group [&>svg]:hidden">
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-xl font-semibold transition-colors ${
                          selectedFeature === feature.id 
                            ? 'text-white' 
                            : 'text-gray-400 group-hover:text-white'
                        }`}>
                          {feature.title}
                        </span>
                        <Plus className="w-5 h-5 text-[#7c45eb] transition-opacity group-data-[state=open]:opacity-0" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <div className="space-y-4">
                        <p className="text-base leading-relaxed text-gray-300 mb-6">
                          {feature.description}
                        </p>
                        <button
                          onClick={() => navigate("/waitlist")}
                          className="relative text-[#7c45eb] hover:text-[#7c45eb] transition-colors duration-200 group text-base font-medium cursor-pointer"
                        >
                          <span className="relative">
                            {feature.cta} →
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#7c45eb] transition-all duration-300 group-hover:w-full"></span>
                          </span>
                        </button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Right side - Feature preview */}
            <div className="relative h-full">
              {/* Mountain background image */}
              <div className="absolute inset-0  overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=800&h=600&fit=crop&crop=center"
                  alt="Iceland mountain landscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
              </div>
              
              <div className="relative z-10 h-full flex items-center justify-center">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={selectedFeature}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Image with wide blurred border */}
                    <div className="relative max-w-md mx-auto">
                      {/* White glow effect */}
                      <div className="absolute -inset-3 bg-white/40 rounded-3xl blur-xl opacity-100" />
                      
                      {/* White transparent border outline */}
                      <div className="absolute -inset-3 bg-white/15 rounded-2xl" />
                      
                      {/* Image container */}
                      <div className="relative rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/40">
                        <div className="aspect-video flex items-center justify-center">
                          <img 
                            src={featureSections.find(f => f.id === selectedFeature)?.image || "/placeholder.svg"} 
                            alt={featureSections.find(f => f.id === selectedFeature)?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 pb-32 bg-black/[0.96]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl md:text-4xl font-bold mb-4 text-transparent">
              Why Nous?
            </h2>
          </motion.div>

          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            {whyUsCards.map((card, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`min-h-[14rem] list-none ${
                  index === 0 ? "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]" :
                  index === 1 ? "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]" :
                  index === 2 ? "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]" :
                  index === 3 ? "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]" :
                  "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                }`}
              >
                <div className="relative h-full rounded-2xl border border-gray-700 p-2 md:rounded-3xl md:p-3">
                  <GlowingCardEffect
                    blur={0}
                    borderWidth={2}
                    spread={70}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  {/* Gray glow behind the card */}
                  <div className="absolute inset-0 rounded-2xl bg-gray-500/20 blur-[9px] md:rounded-3xl" />
                  
                  {/* Black card with content */}
                  <div className="relative bg-black rounded-xl p-4 md:p-4 md:rounded-2xl h-full">
                    <div className="relative flex h-full flex-col justify-between">
                      {/* Icon in top left */}
                      <div className="w-fit rounded border border-gray-600 p-1">
                        {React.cloneElement(card.icon, { className: "w-6 h-6 text-[#7c45eb]" })}
                      </div>
                      
                      {/* Text at bottom */}
                      <div className="space-y-2">
                        <h3 className="-tracking-4 font-sans text-lg font-semibold text-balance text-foreground md:text-xl">
                          {card.title}
                        </h3>
                        <h2 className="font-sans text-sm text-muted-foreground md:text-base [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                          {card.description}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/[0.96]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <CtaCard />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

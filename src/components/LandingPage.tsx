import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import React from "react";
import {
  ShrinkingNavbar,
  ShrinkingNavBody,
  ShrinkingNavItems,
  ShrinkingMobileNav,
  ShrinkingNavbarLogo,
  ShrinkingNavbarButton,
  ShrinkingMobileNavHeader,
  ShrinkingMobileNavToggle,
  ShrinkingMobileNavMenu,
} from "@/components/ui/shrinking-navbar";
import { GridBackground } from "@/components/ui/grid-background";
import { AppleCards } from "@/components/ui/apple-cards";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GlowingCardEffect } from "@/components/ui/glowing-card-effect";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  Lock,
  Plus
} from "lucide-react";
import RoboticEye from "./RoboticEye";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      ctaLink: "/auth/signup"
    },
    {
      id: "cross-chain",
      title: "Cross-Chain Tracking",
      description: "Trace transactions across multiple blockchains with complete flow visibility and entity identification.",
      image: "/feature-cross-chain.svg",
      cta: "Explore Networks",
      ctaLink: "/auth/signup"
    },
    {
      id: "entity-labeling",
      title: "Entity Labeling",
      description: "Automatically identify whales, MEV bots, exchanges, and other entities with confidence scores and risk assessment.",
      image: "/feature-entity-labeling.svg",
      cta: "View Entities",
      ctaLink: "/auth/signup"
    },
    {
      id: "real-time-alerts",
      title: "Real-Time Alerts",
      description: "Set up custom alerts for suspicious transactions, whale movements, and compliance violations across all supported chains.",
      image: "/feature-alerts.svg",
      cta: "Set Up Alerts",
      ctaLink: "/auth/signup"
    }
  ];



  return (
    <div className="min-h-screen bg-background">
      <ShrinkingNavbar>
        {/* Desktop Navigation */}
        <ShrinkingNavBody>
          <ShrinkingNavbarLogo />
          <ShrinkingNavItems items={navItems} />
                      <div className="flex items-center gap-4">
              <a
                onClick={() => navigate("/auth/signin")}
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Sign In
              </a>
              <ShrinkingNavbarButton variant="secondary" onClick={() => navigate("/auth/signup")}>Get Started</ShrinkingNavbarButton>
            </div>
        </ShrinkingNavBody>

        {/* Mobile Navigation */}
        <ShrinkingMobileNav>
          <ShrinkingMobileNavHeader>
            <ShrinkingNavbarLogo />
            <ShrinkingMobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </ShrinkingMobileNavHeader>

          <ShrinkingMobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
                          <div className="flex w-full flex-col gap-4">
                <a
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/auth/signin");
                  }}
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Sign In
                </a>
                <ShrinkingNavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/auth/signup");
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Get Started
                </ShrinkingNavbarButton>
              </div>
          </ShrinkingMobileNavMenu>
        </ShrinkingMobileNav>
      </ShrinkingNavbar>
      
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
                onClick={() => navigate("/auth/signup")}
                className="text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2"
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

      {/* Robotic Eye Section */}
      <RoboticEye />

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
            <div className="space-y-1">
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
                          onClick={() => navigate(feature.ctaLink)}
                          className="relative text-[#7c45eb] hover:text-[#7c45eb] transition-colors duration-200 group text-base font-medium"
                        >
                          <span className="relative">
                            {feature.cta} →
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7c45eb] transition-all duration-300 group-hover:w-full"></span>
                          </span>
                        </button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

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
      <section className="py-20 bg-black/[0.96]">
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



      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/[0.96]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Company */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#7c45eb] to-[#7c45eb] blur-sm opacity-60"></div>
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#7c45eb] to-[#7c45eb]">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="text-lg font-bold text-white">
                  ChainQuery
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making blockchain intelligence accessible to everyone through natural language queries.
              </p>
            </div>
            
            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <div className="space-y-2">
                <a 
                  href="/contact" 
                  className="block text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
                <a 
                  href="/pricing" 
                  className="block text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                >
                  Pricing
                </a>
                <a 
                  href="/about" 
                  className="block text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                >
                  About
                </a>
              </div>
            </div>
            
            {/* Social and Copyright */}
            <div className="flex flex-col justify-between">
              <div className="flex justify-end mb-4">
                <a 
                  href="https://twitter.com/chainquery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                © 2025 ChainQuery. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
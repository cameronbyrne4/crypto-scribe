import { useState } from "react";
import { motion } from "framer-motion";
import {
  UnifiedNavbar,
} from "@/components/ui/shrinking-navbar";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { GridBackground } from "@/components/ui/grid-background";
import { GlowingCardEffect } from "@/components/ui/glowing-card-effect";
import { Button } from "@/components/ui/button";
import GradientButton from "@/components/ui/gradient-button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { getAppRoute } from "@/lib/utils";
import { 
  CheckCircle, 
  Zap, 
  Shield, 
  Database,
  Users,
  Clock,
  Download,
  Star,
  ArrowRight,
  HelpCircle,
  Crown,
  Sparkles,
  Plus
} from "lucide-react";
import React from "react";
import CtaCard from "@/components/CtaCard";

const PricingPage = () => {
  const navigate = useNavigate();


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

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: 0,
      features: [
        "2 queries per day",
        "Basic entity labeling",
        "Ethereum & Base support",
        "Standard support",
        "Query history (7 days)"
      ],
      limitations: [
        "No export capabilities",
        "No API access",
        "Limited query complexity"
      ],
      icon: <Users className="w-6 h-6" />,
      isPopular: false,
      ctaText: "Get Started Free",
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Premium", 
      description: "For professionals and traders",
      price: 49,
      features: [
        "200 queries per month",
        "Advanced entity labeling",
        "All blockchains supported",
        "Priority support",
        "Export capabilities (CSV, JSON)",
        "API access",
        "Query history (unlimited)",
        "Advanced filters",
        "Real-time alerts (coming soon)"
      ],
      limitations: [],
      icon: <Crown className="w-6 h-6" />,
      isPopular: true,
      ctaText: "Start Premium",
      gradient: "from-[#7c45eb] to-[#9c65fb]"
    },
    {
      name: "Enterprise",
      description: "For teams and institutions",
      price: "Custom",
      features: [
        "Unlimited queries",
        "Custom entity labeling",
        "Dedicated blockchain nodes",
        "24/7 dedicated support",
        "Custom integrations",
        "On-premise deployment",
        "SLA guarantees",
        "Custom reporting",
        "Team management",
        "Audit logs"
      ],
      limitations: [],
      icon: <Sparkles className="w-6 h-6" />,
      isPopular: false,
      ctaText: "Contact Sales",
      gradient: "from-[#ecc48c] to-[#f4d4a4]"
    }
  ];

  const faqs = [
    {
      question: "How does the query limit work?",
      answer: "Free users get 2 queries per day that reset at midnight UTC. Premium users get 200 queries per month that roll over if unused."
    },
    {
      question: "What blockchains do you support?",
      answer: "Currently we support Ethereum and Base. We're actively adding Solana, Arbitrum, and Polygon with more chains coming soon."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Yes! You can change your plan anytime. Upgrades take effect immediately, downgrades at the next billing cycle."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for premium subscriptions. No questions asked."
    },
    {
      question: "Is my data private?",
      answer: "Absolutely. We don't store your query data or results. Everything is processed in real-time and discarded after delivery."
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return plan.price;
  };

  return (
    <div className="min-h-screen bg-black/[0.96]">
      <UnifiedNavbar
        navItems={navItems}
      />
      
      {/* Hero Section */}
      <section className="relative flex h-[30rem] w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center pt-20">
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
            <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl mb-6">
              Simple, Transparent
              <br />
              <span className="bg-gradient-to-r from-[#7c45eb] to-[#9c65fb] bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-normal text-neutral-300">
              Start free and scale as you grow. All plans include our core blockchain intelligence features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-black/[0.96]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const price = getPrice(plan);
              const isComingSoon = plan.name !== "Free";
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-[#7c45eb] to-[#9c65fb] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className={`relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 ${
                    plan.isPopular 
                      ? 'border-[#7c45eb]' 
                      : 'border-gray-700'
                  }`}>
                    {/* Gray glow behind the card */}
                    <div className="absolute inset-0 rounded-2xl bg-gray-500/20 blur-[9px] md:rounded-3xl" />
                    
                    {/* Black card with content */}
                    <div className="relative bg-black rounded-xl p-6 md:p-6 md:rounded-2xl h-full">
                      <div className="relative flex h-full flex-col">
                        {/* Header */}
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                          <p className="text-neutral-400">{plan.description}</p>
                          
                          <div className="mt-6">
                            <div className="text-4xl font-bold text-white">
                              {typeof price === "string" ? price : `$${price}`}
                              {typeof price === "number" && price > 0 && (
                                <span className="text-lg text-neutral-400 font-normal">
                                  /month
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Coming Soon Overlay for Premium and Enterprise */}
                        {isComingSoon && (
                          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-20">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white mb-2">Coming Soon</div>
                              <div className="text-neutral-400 text-sm">We're working hard to bring you more features</div>
                            </div>
                          </div>
                        )}
                        
                        {/* CTA Button */}
                        <div className="mb-8">
                          {plan.name === "Enterprise" ? (
                            <GradientButton
                              onClick={() => navigate("/contact")}
                              variant={plan.isPopular ? "primary" : "secondary"}
                              className="w-full"
                              disabled={isComingSoon}
                            >
                              {isComingSoon ? "Coming Soon" : plan.ctaText}
                            </GradientButton>
                          ) : (
                            <>
                              <SignedOut>
                                <SignUpButton mode="modal">
                                  <GradientButton
                                    variant={plan.isPopular ? "primary" : "secondary"}
                                    className="w-full cursor-pointer"
                                    disabled={isComingSoon}
                                  >
                                    {isComingSoon ? "Coming Soon" : plan.ctaText}
                                  </GradientButton>
                                </SignUpButton>
                              </SignedOut>
                              <SignedIn>
                                <GradientButton
                                  onClick={() => navigate(getAppRoute())}
                                  variant={plan.isPopular ? "primary" : "secondary"}
                                  className="w-full cursor-pointer"
                                  disabled={isComingSoon}
                                >
                                  Go to Dashboard
                                </GradientButton>
                              </SignedIn>
                            </>
                          )}
                        </div>
                        
                        {/* Features */}
                        <div className={`space-y-6 flex-1 ${isComingSoon ? 'blur-sm' : ''}`}>
                          <div>
                            <h4 className="font-semibold mb-4 text-white">What's included:</h4>
                            <ul className="space-y-3">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start text-sm">
                                  <CheckCircle className="w-4 h-4 text-[#7c45eb] mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-neutral-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {plan.limitations.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-4 text-neutral-400">Limitations:</h4>
                              <ul className="space-y-3">
                                {plan.limitations.map((limitation, limitIndex) => (
                                  <li key={limitIndex} className="flex items-start text-sm text-neutral-500">
                                    <span className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-neutral-600">×</span>
                                    <span>{limitation}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/[0.96]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl md:text-4xl font-bold mb-4 text-transparent">
              Frequently Asked Questions
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-1"
          >
            <Accordion 
              type="single" 
              collapsible
              className="w-full"
            >
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="text-left hover:no-underline group [&>svg]:hidden">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xl font-semibold transition-colors text-gray-400 group-hover:text-white group-data-[state=open]:text-white">
                        {faq.question}
                      </span>
                      <Plus className="w-5 h-5 text-[#7c45eb] transition-opacity group-data-[state=open]:opacity-0" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <div className="space-y-4">
                      <p className="text-base leading-relaxed text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
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

export default PricingPage;
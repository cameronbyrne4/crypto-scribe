import { useState } from "react";
import { motion } from "framer-motion";
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
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
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
  HelpCircle
} from "lucide-react";

const PricingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

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
      price: { monthly: 0, yearly: 0 },
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
      ctaText: "Get Started Free"
    },
    {
      name: "Premium", 
      description: "For professionals and traders",
      price: { monthly: 49, yearly: 490 },
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
      icon: <Zap className="w-6 h-6" />,
      isPopular: true,
      ctaText: "Start Premium"
    },
    {
      name: "Enterprise",
      description: "For teams and institutions",
      price: { monthly: "Custom", yearly: "Custom" },
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
      icon: <Shield className="w-6 h-6" />,
      isPopular: false,
      ctaText: "Contact Sales"
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
    if (typeof plan.price.monthly === "string") return plan.price.monthly;
    return isYearly ? plan.price.yearly : plan.price.monthly;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (typeof plan.price.monthly === "string" || !isYearly || typeof plan.price.yearly === "string") return null;
    const monthlyCost = plan.price.monthly * 12;
    const savings = monthlyCost - plan.price.yearly;
    return Math.round((savings / monthlyCost) * 100);
  };

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
              <ShrinkingNavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/auth/signin");
                }}
                variant="primary"
                className="w-full"
              >
                Login
              </ShrinkingNavbarButton>
              <ShrinkingNavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/auth/signup");
                }}
                variant="primary"
                className="w-full"
              >
                Get Started
              </ShrinkingNavbarButton>
            </div>
          </ShrinkingMobileNavMenu>
        </ShrinkingMobileNav>
      </ShrinkingNavbar>
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text-primary">Simple, Transparent Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free and scale as you grow. All plans include our core blockchain intelligence features.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch 
                checked={isYearly} 
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {isYearly && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  Save 17%
                </span>
              )}
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
            {plans.map((plan, index) => {
              const price = getPrice(plan);
              const savings = getSavings(plan);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <GlowingEffect 
                    color={plan.isPopular ? "crypto" : "primary"}
                    className="h-full"
                  >
                    <Card className="h-full border-0 bg-transparent">
                      <CardHeader className="text-center pb-6">
                        <div className="w-12 h-12 mx-auto mb-4 p-3 rounded-xl bg-primary/20">
                          {plan.icon}
                        </div>
                        <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                        <CardDescription className="text-base">{plan.description}</CardDescription>
                        
                        <div className="mt-6">
                          <div className="text-4xl font-bold">
                            {typeof price === "string" ? price : `$${price}`}
                            {typeof price === "number" && price > 0 && (
                              <span className="text-lg text-muted-foreground font-normal">
                                /{isYearly ? "year" : "month"}
                              </span>
                            )}
                          </div>
                          {savings && (
                            <div className="text-sm text-primary mt-1">
                              Save {savings}% annually
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <Button 
                          onClick={() => {
                            if (plan.name === "Enterprise") {
                              navigate("/contact");
                            } else {
                              navigate("/auth/signup");
                            }
                          }}
                          variant={plan.isPopular ? "default" : "outline"}
                          className={`w-full mb-6 ${plan.isPopular ? "bg-gradient-primary hover:opacity-80" : ""}`}
                        >
                          {plan.ctaText}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-3">What's included:</h4>
                            <ul className="space-y-2">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start text-sm">
                                  <CheckCircle className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {plan.limitations.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-3 text-muted-foreground">Limitations:</h4>
                              <ul className="space-y-2">
                                {plan.limitations.map((limitation, limitIndex) => (
                                  <li key={limitIndex} className="flex items-start text-sm text-muted-foreground">
                                    <span className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0">×</span>
                                    <span>{limitation}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </GlowingEffect>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text-secondary">Frequently Asked Questions</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2">{faq.question}</h3>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <GlowingEffect color="crypto">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to unlock blockchain intelligence?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of users already using ChainQuery to make sense of on-chain data.
                </p>
                <Button 
                  size="lg"
                  onClick={() => navigate("/auth/signup")}
                  className="bg-gradient-primary hover:opacity-80"
                >
                  Start Free Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </GlowingEffect>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
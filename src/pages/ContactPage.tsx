import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UnifiedNavbar,
} from "@/components/ui/shrinking-navbar";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";


const ContactPage = () => {
  const navigate = useNavigate();


  // Load Tally embed script
  useEffect(() => {
    const widgetScriptSrc = 'https://tally.so/widgets/embed.js';

    const load = () => {
      // Load Tally embeds
      if (typeof (window as any).Tally !== 'undefined') {
        (window as any).Tally.loadEmbeds();
        return;
      }

      // Fallback if window.Tally is not available
      document
        .querySelectorAll('iframe[data-tally-src]:not([src])')
        .forEach((iframeEl) => {
          const iframe = iframeEl as HTMLIFrameElement;
          if (iframe.dataset.tallySrc) {
            iframe.src = iframe.dataset.tallySrc;
          }
        });
    };

    // If Tally is already loaded, load the embeds
    if (typeof (window as any).Tally !== 'undefined') {
      load();
      return;
    }

    // If the Tally widget script is not loaded yet, load it
    if (document.querySelector(`script[src="${widgetScriptSrc}"]`) === null) {
      const script = document.createElement('script');
      script.src = widgetScriptSrc;
      script.onload = load;
      script.onerror = load;
      document.body.appendChild(script);
      return;
    }
  }, []);

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



  return (
    <div className="min-h-screen bg-black/[0.96]">
      <UnifiedNavbar
        navItems={navItems}
      />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl md:text-5xl font-bold mb-6 text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Have questions about Nous? Want to see a demo? 
              Hit us up.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Tally Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-2xl border border-gray-700 p-2 md:rounded-3xl md:p-3">
                {/* Gray glow behind the card */}
                <div className="absolute inset-0 rounded-2xl bg-gray-500/20 blur-[9px] md:rounded-3xl" />
                
                {/* Black card with content */}
                <div className="relative bg-black rounded-xl p-6 md:p-6 md:rounded-2xl">
                  {/* Tally Form Embed */}
                  <iframe
                    data-tally-src="https://tally.so/embed/mOMgDM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="400"
                    frameBorder={0}
                    marginHeight={0}
                    marginWidth={0}
                    title="Contact form"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
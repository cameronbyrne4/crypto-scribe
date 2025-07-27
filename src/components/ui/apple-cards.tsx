"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface AppleCard {
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

interface AppleCardsProps {
  cards: AppleCard[];
  className?: string;
}

export const AppleCards = ({ cards, className }: AppleCardsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="relative h-80 w-full glass rounded-2xl p-6 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-crypto-blue/20 to-crypto-purple/20 opacity-60" />
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: hoveredIndex === index 
                  ? "0 0 40px hsl(var(--primary) / 0.4)" 
                  : "0 0 20px hsl(var(--primary) / 0.2)"
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10 h-full flex flex-col">
              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  {card.icon}
                </div>
              </div>

              {/* Category */}
              <div className="text-sm text-crypto-blue font-medium mb-2">
                {card.category}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {card.description}
              </p>

              {/* Decorative dots */}
              <div className="flex space-x-1 mt-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/30"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.3,
                      scale: hoveredIndex === index ? 1.2 : 1,
                    }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
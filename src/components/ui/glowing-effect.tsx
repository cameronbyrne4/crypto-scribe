"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface GlowingEffectProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "crypto";
}

export const GlowingEffect = ({
  children,
  className,
  size = "md",
  color = "primary"
}: GlowingEffectProps) => {
  const sizeClasses = {
    sm: "p-3",
    md: "p-6", 
    lg: "p-8"
  };

  const colorClasses = {
    primary: "shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)]",
    accent: "shadow-[0_0_40px_hsl(var(--accent)/0.3)] hover:shadow-[0_0_60px_hsl(var(--accent)/0.5)]",
    crypto: "shadow-[0_0_40px_hsl(var(--crypto-blue)/0.5)] hover:shadow-[0_0_80px_hsl(var(--crypto-blue)/0.7)]"
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-xl glass glass-hover transition-all duration-500",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};
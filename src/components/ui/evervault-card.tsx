"use client";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface EvervaultCardProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export const EvervaultCard = ({
  text,
  className,
  children,
}: EvervaultCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative overflow-hidden glass rounded-xl group p-8",
        className
      )}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Glow effect following mouse */}
      <motion.div
        className="absolute rounded-full opacity-0 pointer-events-none w-96 h-96"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          opacity: isHovering ? 0.6 : 0,
          scale: isHovering ? 1 : 0,
          background: `radial-gradient(200px circle at center, hsl(var(--primary) / 0.3), transparent 70%)`,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Crypto-themed particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {text && (
          <h3 className="text-lg font-bold text-foreground mb-4 text-center">
            {text}
          </h3>
        )}
        {children}
      </div>

      {/* Crypto pattern overlay */}
      <div className="absolute top-4 right-4 text-primary/20 text-xs font-mono">
        0x{Array(8).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}
      </div>
    </div>
  );
};
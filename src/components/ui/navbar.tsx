"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useState } from "react";
import { Menu, X, Search, Shield, Database } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 z-50 w-full glass border-b border-white/10",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-sm opacity-60"></div>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
                <Database className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold gradient-text-primary">
              ChainQuery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/auth/signin")}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/auth/signup")}
              className="bg-gradient-primary hover:opacity-80 transition-opacity"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2 glass-hover"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 pt-4 pb-6 space-y-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/auth/signin");
                  setIsOpen(false);
                }}
                className="justify-start"
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  navigate("/auth/signup");
                  setIsOpen(false);
                }}
                className="bg-gradient-primary hover:opacity-80 transition-opacity justify-start"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
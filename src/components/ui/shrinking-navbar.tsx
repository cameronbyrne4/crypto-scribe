import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { Database } from "lucide-react";
import React, { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShrinkingNavbar = ({ children, className }: NavbarProps) => {
  return (
    <div className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}>
      {children}
    </div>
  );
};

export const ShrinkingNavBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "relative z-50 flex w-full flex-row items-center px-6 py-4 lg:px-8",
        "bg-black/40 backdrop-blur-md border-b border-white/10",
        "max-w-8xl mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ShrinkingNavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center space-x-8 text-lg font-medium",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onClick={onItemClick}
          className="relative px-4 py-2 text-lg text-gray-300 hover:text-white transition-colors duration-200"
          key={`link-${idx}`}
          href={item.link}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

export const ShrinkingMobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10",
            "lg:hidden",
            className,
          )}
        >
          <div className="px-6 py-6 space-y-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ShrinkingMobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className="lg:hidden rounded-lg p-2 hover:bg-gray-800 transition-colors"
      onClick={onClick}
    >
      {isOpen ? (
        <IconX className="h-6 w-6 text-gray-300" />
      ) : (
        <IconMenu2 className="h-6 w-6 text-gray-300" />
      )}
    </button>
  );
};

export const ShrinkingNavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-lg font-normal"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-sm opacity-60"></div>
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary">
          <Database className="w-5 h-5 text-white" />
        </div>
      </div>
      <span className="font-bold text-white">ChainQuery</span>
    </a>
  );
};

export const ShrinkingNavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  onClick,
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  onClick?: () => void;
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles = "px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200";

  const variantStyles = {
    primary: "bg-gradient-primary text-white hover:opacity-90 shadow-lg",
    secondary: "bg-transparent text-gray-300 hover:bg-gray-800 border border-gray-600",
    dark: "bg-gray-900 text-white hover:bg-gray-800",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90",
  };

  return (
    <Tag
      href={href || undefined}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// New unified navbar component that handles responsive behavior
export const UnifiedNavbar = ({ 
  navItems, 
  className
}: {
  navItems: { name: string; link: string; }[];
  className?: string;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ShrinkingNavbar className={className}>
      <ShrinkingNavBody>
        <div className="grid grid-cols-3 items-center w-full">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <ShrinkingNavbarLogo />
          </div>
          
          {/* Center: Navigation Items - Truly centered on page */}
          <div className="hidden lg:flex justify-center">
            <ShrinkingNavItems 
              items={navItems} 
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
          
          {/* Right: Action Buttons */}
          <div className="flex justify-end items-center gap-4">
            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="relative px-4 py-2 text-lg text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <ShrinkingNavbarButton variant="secondary">
                    Get Started
                  </ShrinkingNavbarButton>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Mobile Menu Toggle */}
            <ShrinkingMobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </ShrinkingNavBody>

      {/* Mobile Navigation Menu */}
      <ShrinkingMobileNavMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        {navItems.map((item, idx) => (
          <a
            key={`mobile-link-${idx}`}
            href={item.link}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-lg text-gray-300 hover:text-white transition-colors duration-200 py-2"
          >
            {item.name}
          </a>
        ))}
        
        <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
          <SignedOut>
            <SignInButton mode="modal">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-lg text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer text-left"
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <ShrinkingNavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-fit"
              >
                Get Started
              </ShrinkingNavbarButton>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
              <span className="text-lg text-gray-300">Account</span>
            </div>
          </SignedIn>
        </div>
      </ShrinkingMobileNavMenu>
    </ShrinkingNavbar>
  );
}; 
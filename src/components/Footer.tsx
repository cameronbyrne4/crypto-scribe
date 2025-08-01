import { Database } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-4 border-t border-white/10 bg-black/[0.96]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Logo and Company */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <img 
                  src="/nous-logo.svg" 
                  alt="Nous Logo" 
                  className="w-8 h-8"
                />
              </div>
              <span className="text-lg font-bold text-white">
                Nous
              </span>
              <span className="text-xs text-muted-foreground">
                © 2025 Nous. All rights reserved.
              </span>
            </div>
          </div>
          
          {/* Company Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="/contact" 
              className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
            <a 
              href="/pricing" 
              className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
            >
              Pricing
            </a>
            <a 
              href="/#features" 
              className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
            >
              Features
            </a>
          </div>
          
          {/* Social */}
          <div className="flex items-center justify-end">
            <a 
              href="https://x.com/nous_ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
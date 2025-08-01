import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Sidebar, SidebarHeader, SidebarNav, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { 
  Search, 
  History, 
  Settings, 
  Key, 
  Menu,
  X,
  ArrowLeft,
  ChevronDown,
  Crown,
  Mail,
  HelpCircle,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Plus
} from "lucide-react";

// Tooltip Component
const Tooltip = ({ children, content, show }: { children: React.ReactNode; content: string; show: boolean }) => {
  return (
    <div className="relative inline-block">
      {children}
      {show && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded border border-white/20 whitespace-nowrap pointer-events-none">
          {content}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
        </div>
      )}
    </div>
  );
};

// Account Area Component
const AccountArea = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!user) return null;

  const displayName = user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0] || 'User';
  const email = user.emailAddresses[0]?.emailAddress || '';
  
  // TODO: Replace with actual plan data from database once pricing system is set up
  const currentPlan = "Free"; // Placeholder - will be fetched from database

  const profileButton = (
    <div 
      className={`flex items-center rounded-lg hover:bg-white/5 cursor-pointer transition-colors ${
        isSidebarOpen ? 'gap-3 p-2 w-full' : 'w-10 h-10 justify-center'
      }`}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      onMouseEnter={() => !isSidebarOpen && setShowTooltip(true)}
      onMouseLeave={() => !isSidebarOpen && setShowTooltip(false)}
    >
      {/* Profile Picture */}
      <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden flex-shrink-0">
        {user.imageUrl ? (
          <img 
            src={user.imageUrl} 
            alt={displayName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white font-medium text-xs">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      
      {/* User Info */}
      {isSidebarOpen && (
        <>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {currentPlan} plan
            </p>
          </div>
          
          {/* Dropdown Arrow */}
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} 
          />
        </>
      )}
    </div>
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Divider */}
      {isSidebarOpen && <div className="border-t border-white/20 mb-4" />}
      
      {/* Account Area */}
      {isSidebarOpen ? (
        profileButton
      ) : (
        <Tooltip content={displayName} show={showTooltip}>
          {profileButton}
        </Tooltip>
      )}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className={`absolute bottom-full mb-2 bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10 ${
          isSidebarOpen ? 'left-0 right-0 w-full' : 'left-0 w-64'
        }`}>
          {/* User Email */}
          <div className="p-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#7c45eb]" />
              <span className="text-sm text-gray-300 truncate">{email}</span>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="py-1">
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#7c45eb]/10 hover:text-[#7c45eb] transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(false);
                navigate('/app/api-keys');
              }}
            >
              <Key className="w-4 h-4" />
              API Keys
            </button>
            
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#7c45eb]/10 hover:text-[#7c45eb] transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(false);
                navigate('/');
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Landing Page
            </button>
            
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#7c45eb]/10 hover:text-[#7c45eb] transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(false);
                navigate('/pricing');
              }}
            >
              <Crown className="w-4 h-4" />
              Upgrade plan
            </button>
            
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#7c45eb]/10 hover:text-[#7c45eb] transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(false);
                navigate('/app/settings');
              }}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-[#7c45eb]/10 hover:text-[#7c45eb] transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(false);
                navigate('/contact');
              }}
            >
              <HelpCircle className="w-4 h-4" />
              Contact us
            </button>
          </div>
          
          {/* Sign Out */}
          <div className="border-t border-white/10">
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(false);
                signOut();
              }}
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const navigationItems = [
    {
      name: "New Search",
      href: "/app/search",
      icon: Plus
    },
    {
      name: "Search History", 
      href: "/app/history",
      icon: History
    }
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <div className="flex h-screen bg-black/[0.96]">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 bg-black/80" />
          <div className="fixed left-0 top-0 h-full w-80 bg-black border-r border-white/20">
            <div className="flex h-full flex-col">
              <div className="flex h-[60px] items-center justify-between px-4 border-b border-white/20">
                <h2 className="text-lg font-semibold text-white">Nous</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex-1 space-y-2 p-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.name}
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className={`w-full justify-start text-left ${
                        isActive(item.href) 
                          ? "bg-[#7c45eb]/20 text-[#7c45eb] border-[#7c45eb]/20" 
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => {
                        navigate(item.href);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </Button>
                  );
                })}
              </nav>
              <div className="border-t border-white/20 p-4">
                <AccountArea isSidebarOpen={true} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar className={`hidden lg:flex border-white/20 bg-black/50 transition-all duration-200 ${
        isSidebarOpen ? 'w-64' : 'w-12'
      }`} style={{ padding: isSidebarOpen ? '1rem' : '0.5rem' }}>
        <SidebarHeader>
          <div className={`flex items-center ${
            isSidebarOpen ? 'justify-between w-full px-2 py-1' : 'justify-center'
          }`}>
            {isSidebarOpen ? (
              <>
                <div className="flex items-center gap-2">
                  <img 
                    src="/nous-logo.svg" 
                    alt="Nous Logo" 
                    className="w-8 h-8"
                  />
                  <span className="text-white font-semibold text-lg">Nous</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsLogoHovered(false);
                  }}
                  className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 px-2 py-1 rounded-md"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Tooltip content="Open sidebar" show={isLogoHovered}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(true)}
                  onMouseEnter={() => setIsLogoHovered(true)}
                  onMouseLeave={() => setIsLogoHovered(false)}
                  className="text-white hover:bg-white/10 transition-all duration-200 p-1 w-8 h-8"
                  aria-label="Open sidebar"
                >
                  {isLogoHovered ? (
                    <PanelLeftOpen className="h-4 w-4 text-white" />
                  ) : (
                    <img 
                      src="/nous-logo.svg" 
                      alt="Nous Logo" 
                      className="w-6 h-6"
                    />
                  )}
                </Button>
              </Tooltip>
            )}
          </div>
        </SidebarHeader>
        
        <SidebarNav className={isSidebarOpen ? 'px-2 space-y-1' : 'px-0 space-y-2'}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.href);
            
            const button = (
              <Button
                key={item.name}
                variant={isItemActive ? "secondary" : "ghost"}
                className={`${
                  isSidebarOpen 
                    ? 'w-full justify-start text-left px-3 py-2 h-10' 
                    : 'w-8 h-8 justify-center p-0 mx-auto'
                } ${
                  isItemActive 
                    ? "bg-[#7c45eb]/20 text-[#7c45eb] border-[#7c45eb]/20" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                } transition-all duration-200`}
                onClick={() => navigate(item.href)}
                onMouseEnter={() => !isSidebarOpen && setHoveredItem(item.name)}
                onMouseLeave={() => !isSidebarOpen && setHoveredItem(null)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium ml-3">{item.name}</span>}
              </Button>
            );

            return isSidebarOpen ? (
              button
            ) : (
              <Tooltip key={item.name} content={item.name} show={hoveredItem === item.name}>
                {button}
              </Tooltip>
            );
          })}
        </SidebarNav>
        
        <SidebarFooter className={`${isSidebarOpen ? 'px-2' : 'px-0 flex justify-center'} mt-auto`}>
          <AccountArea isSidebarOpen={isSidebarOpen} />
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Header */}
      <div className="lg:hidden flex h-[60px] items-center justify-between px-4 border-b border-white/20 bg-black/50">
        <h2 className="text-lg font-semibold text-white">Nous</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-white hover:text-white"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout; 
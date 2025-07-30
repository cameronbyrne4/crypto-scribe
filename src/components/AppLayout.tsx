import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Sidebar, SidebarHeader, SidebarNav, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import { 
  Search, 
  History, 
  Settings, 
  Key, 
  Menu,
  X,
  ArrowLeft
} from "lucide-react";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: "Search",
      href: "/app/search",
      icon: Search,
      description: "Natural language queries"
    },
    {
      name: "History", 
      href: "/app/history",
      icon: History,
      description: "Query history"
    },
    {
      name: "Settings",
      href: "/app/settings", 
      icon: Settings,
      description: "User preferences"
    },
    {
      name: "API Keys",
      href: "/app/api-keys",
      icon: Key,
      description: "Manage API access"
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
          <div className="fixed left-0 top-0 h-full w-80 bg-black border-r border-white/10">
            <div className="flex h-full flex-col">
              <div className="flex h-[60px] items-center justify-between px-4 border-b border-white/10">
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
              <nav className="flex-1 space-y-1 p-4">
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
              <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <UserButton afterSignOutUrl="/" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex w-80 border-white/10 bg-black/50">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-white hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold text-white">Nous</h2>
          </div>
        </SidebarHeader>
        
        <SidebarNav>
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
                onClick={() => navigate(item.href)}
              >
                <Icon className="mr-3 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-xs text-gray-400">{item.description}</span>
                </div>
              </Button>
            );
          })}
        </SidebarNav>
        
        <SidebarFooter>
          <div className="flex items-center gap-3 w-full">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Account</p>
              <p className="text-xs text-gray-400">Manage your profile</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Header */}
      <div className="lg:hidden flex h-[60px] items-center justify-between px-4 border-b border-white/10 bg-black/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold text-white">Nous</h2>
        </div>
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
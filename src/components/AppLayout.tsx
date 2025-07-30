import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { 
  Search, 
  History, 
  Settings, 
  Database,
  Menu,
  X,
  Home
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Search",
      icon: <Search className="w-5 h-5" />,
      path: "/app",
      description: "Query blockchain data"
    },
    {
      name: "History",
      icon: <History className="w-5 h-5" />,
      path: "/app/history",
      description: "View past queries"
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/app/settings",
      description: "Account preferences"
    }
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-black/80 backdrop-blur-md border-r border-gray-700
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 blur-sm opacity-60"></div>
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                  <Database className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="font-bold text-white">ChainQuery</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Home Button */}
            <button
              onClick={() => {
                navigate('/');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-300 hover:text-white hover:bg-white/5"
            >
              <Home className="w-5 h-5" />
              <div>
                <div className="font-medium">Home</div>
                <div className="text-xs text-gray-400">Back to landing page</div>
              </div>
            </button>

            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${isActive(item.path) 
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.icon}
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                </div>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <UserButton afterSignOutUrl="/" />
              <span className="text-sm text-gray-400">v1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
            
            <div className="flex-1 lg:hidden" />
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Back to Home"
              >
                <Home className="w-5 h-5 text-gray-300" />
              </button>
              <span className="text-sm text-gray-400">
                {navItems.find(item => isActive(item.path))?.name || 'App'}
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 
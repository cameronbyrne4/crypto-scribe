import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Mail, 
  Lock, 
  Github, 
  Chrome,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const { mode } = useParams(); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const isSignUp = mode === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      navigate("/search");
    }, 1500);
  };

  const benefits = [
    "2 free queries per day",
    "Access to Ethereum & Base data",
    "Basic entity labeling",
    "Natural language interface"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-sm opacity-60"></div>
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary">
                      <Database className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h1>
                <p className="text-muted-foreground">
                  {isSignUp 
                    ? "Start querying blockchain data in seconds" 
                    : "Sign in to continue your investigation"
                  }
                </p>
              </div>

              <GlowingEffect color="primary">
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl">
                      {isSignUp ? "Sign up" : "Sign in"}
                    </CardTitle>
                    <CardDescription>
                      {isSignUp 
                        ? "Enter your details to create your account"
                        : "Enter your credentials to access your account"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Chrome className="w-4 h-4 mr-2" />
                        Google
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {isSignUp && (
                        <div className="space-y-2">
                          <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Confirm your password"
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary hover:opacity-80"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                            {isSignUp ? "Creating account..." : "Signing in..."}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            {isSignUp ? "Create account" : "Sign in"}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>

                    <div className="text-center text-sm">
                      <span className="text-muted-foreground">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}
                      </span>
                      <Button
                        variant="link"
                        onClick={() => navigate(isSignUp ? "/auth/signin" : "/auth/signup")}
                        className="p-0 ml-1 h-auto font-normal"
                      >
                        {isSignUp ? "Sign in" : "Sign up"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </GlowingEffect>

              {/* Benefits for Sign Up */}
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-8"
                >
                  <Card className="glass">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 text-center">
                        What you get with your free account:
                      </h3>
                      <ul className="space-y-3">
                        {benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
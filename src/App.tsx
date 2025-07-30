import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import AppLayout from "./components/AppLayout";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={
            <SignIn 
              routing="path" 
              path="/sign-in" 
              afterSignInUrl="/app"
              signUpUrl="/sign-up"
            />
          } />
          <Route path="/sign-up" element={
            <SignUp 
              routing="path" 
              path="/sign-up" 
              afterSignUpUrl="/app"
              signInUrl="/sign-in"
            />
          } />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Protected App Routes */}
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SearchPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/app/*" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SearchPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Legacy route redirect */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

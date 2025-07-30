import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SIGN_IN_URL = import.meta.env.VITE_CLERK_SIGN_IN_URL;
const SIGN_UP_URL = import.meta.env.VITE_CLERK_SIGN_UP_URL;
const AFTER_SIGN_IN_URL = import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL;
const AFTER_SIGN_UP_URL = import.meta.env.VITE_CLERK_AFTER_SIGN_UP_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} 
    afterSignOutUrl="/"
    signInUrl={SIGN_IN_URL}
    signUpUrl={SIGN_UP_URL}
    afterSignInUrl={AFTER_SIGN_IN_URL}
    afterSignUpUrl={AFTER_SIGN_UP_URL}
  >
    <App />
  </ClerkProvider>
);

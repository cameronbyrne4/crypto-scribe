import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

export const useAuthGuard = (requireAuth: boolean = true) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Wait for Clerk to load before making any decisions
    if (!isLoaded) return;

    // If auth is required and user is not signed in
    if (requireAuth && !isSignedIn) {
      // Store the current location to redirect back after sign in
      sessionStorage.setItem('redirectAfterSignIn', location.pathname);
      navigate('/', { replace: true });
      return;
    }

    // If auth is NOT required and user IS signed in, and they're on a public page
    // that has an app equivalent, redirect them to the app
    if (!requireAuth && isSignedIn) {
      // You can add logic here to redirect signed-in users from certain public pages
      // For example, if they're on /pricing and signed in, maybe redirect to /app
      // This is optional and depends on your UX preferences
    }
  }, [isSignedIn, isLoaded, requireAuth, navigate, location]);

  return {
    isSignedIn,
    isLoaded,
    isAuthenticated: isSignedIn,
    isLoading: !isLoaded
  };
}; 
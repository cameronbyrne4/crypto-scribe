import { Waitlist } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WaitlistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  // Add class to body for CSS override
  if (typeof document !== 'undefined') {
    document.body.classList.add('waitlist-active');
  }

  const handleWaitlistSuccess = () => {
    console.log('✅ Successfully added to waitlist!');
    console.log('Setting isSubmitted to true...');
    setIsSubmitted(true);
    
    // Redirect to landing page after 3 seconds
    setTimeout(() => {
      console.log('Redirecting to homepage...');
      navigate('/');
    }, 3000);
  };

  // Debug: Log when component renders
  useEffect(() => {
    console.log('WaitlistPage rendered, isSubmitted:', isSubmitted);
  }, [isSubmitted]);

  return (
    <div className="min-h-screen bg-black text-white flex max-w-4xl mx-auto waitlist-page">
      {/* Left Side - Nous Logo */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <img 
          src="/nous-logo.svg" 
          alt="Nous Logo" 
          className="w-64 h-64 text-white"
        />
      </div>

      {/* Right Side - Waitlist Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-xs w-full">
          <h1 className="text-4xl font-bold mb-2">Nous</h1>
          <p className="text-gray-300 mb-8">Conversational crypto forensics for everyone.</p>
          
          {/* Clerk's Official Waitlist Component */}
          <div className="clerk-waitlist-custom">
            {!isSubmitted ? (
              <Waitlist 
                appearance={{
                  elements: {
                    card: "bg-transparent border-none shadow-none p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    formField: "space-y-0",
                    formFieldLabel: "hidden",
                    formFieldInput: "w-full px-6 py-6 bg-gray-900 border-2 border-gray-700 rounded-lg text-white text-base placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20",
                    formButtonPrimary: "w-full bg-white text-black py-4 px-6 rounded-lg text-base font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed mt-0",
                    footer: "hidden"
                  }
                }}
                onJoinWaitlist={handleWaitlistSuccess}
              />
            ) : (
              <div className="flex items-center gap-2 text-[#7c45eb] text-sm">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span>added to waitlist</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
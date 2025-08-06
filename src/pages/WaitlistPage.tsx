import { Waitlist } from '@clerk/clerk-react';
import { useState } from 'react';

export default function WaitlistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Add class to body for CSS override
  if (typeof document !== 'undefined') {
    document.body.classList.add('waitlist-active');
  }

  const handleWaitlistSuccess = () => {
    console.log('✅ Successfully added to waitlist!');
    setIsSubmitted(true);
  };

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
                afterJoinWaitlistUrl="/waitlist"
                onJoinWaitlist={handleWaitlistSuccess}
              />
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-4">🎉 You're on the list!</div>
                <div className="text-gray-300 text-base">
                  Thanks for joining our waitlist. We'll notify you when Nous is ready.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
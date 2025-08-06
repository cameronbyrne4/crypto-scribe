import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const { signUp, isLoaded } = useSignUp();
  const navigate = useNavigate();

  // Add class to body for CSS override
  if (typeof document !== 'undefined') {
    document.body.classList.add('waitlist-active');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await signUp.create({
        emailAddress: email,
      });
      
      setMessage('Thanks! You\'ve been added to our waitlist. We\'ll notify you when you\'re approved.');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

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

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-xs w-full">
          <h1 className="text-4xl font-bold mb-2">Nous</h1>
          <p className="text-gray-300 mb-8">Conversational crypto forensics for everyone.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                placeholder="user@trynous.com"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
          
          {message && (
            <p className="mt-4 text-sm text-gray-300">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
} 
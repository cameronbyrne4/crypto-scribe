// CtaCard.tsx
// Reusable call-to-action card for prompting users to sign up. Used at the end of PricingPage and LandingPage.
// If you want to customize text or actions, refactor to accept props.

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { getAppRoute } from "@/lib/utils";

const CtaCard = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="relative rounded-2xl border border-gray-700 p-2 md:rounded-3xl md:p-3">
        {/* Gray glow behind the card */}
        <div className="absolute inset-0 rounded-2xl bg-gray-500/20 blur-[9px] md:rounded-3xl" />
        {/* Black card with content */}
        <div className="relative bg-black rounded-xl p-8 md:p-8 md:rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to unlock blockchain intelligence?
          </h2>
          <p className="text-neutral-400 mb-6">
            Join thousands of users already using Nous to make sense of on-chain data.
          </p>
          <div className="flex justify-center">
            <SignedOut>
              <SignUpButton mode="modal">
                <HoverBorderGradient
                  className="text-base px-6 py-2 flex items-center gap-2 cursor-pointer"
                >
                  Start Free Today
                  <ArrowRight className="w-4 h-4" />
                </HoverBorderGradient>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <HoverBorderGradient
                onClick={() => navigate(getAppRoute())}
                className="text-base px-6 py-2 flex items-center gap-2 cursor-pointer"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </HoverBorderGradient>
            </SignedIn>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CtaCard; 
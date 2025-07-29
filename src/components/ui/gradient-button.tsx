import React from "react";
import { ArrowRight } from "lucide-react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  onClick, 
  className = "",
  variant = "primary"
}) => {
  const gradientColors = variant === "primary" 
    ? "rgba(124,69,235,0.6)" // Purple for primary
    : "rgba(56,189,248,0.6)"; // Blue for secondary
  
  const borderColors = variant === "primary"
    ? "from-[#7c45eb]/0 via-[#7c45eb]/90 to-[#7c45eb]/0" // Purple border
    : "from-emerald-400/0 via-emerald-400/90 to-emerald-400/0"; // Emerald border

  return (
    <button 
      className={`bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block ${className}`}
      onClick={onClick}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span 
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(75% 100% at 50% 0%, ${gradientColors} 0%, ${gradientColors.replace('0.6', '0')} 75%)`
          }}
        />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
        <span>
          {children}
        </span>
        <ArrowRight
          fill="none"
          height="16"
          width="16"
          className="stroke-current"
        />
      </div>
      <span className={`absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r ${borderColors} transition-opacity duration-500 group-hover:opacity-40`} />
    </button>
  );
};

export default GradientButton; 
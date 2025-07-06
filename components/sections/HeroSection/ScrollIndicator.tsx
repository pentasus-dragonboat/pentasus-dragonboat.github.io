// components/sections/HeroSection/ScrollIndicator.tsx - Scroll Down Indicator
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  isMinimalist: boolean;
  useWhiteText: boolean;
  textShadowStyle: React.CSSProperties;
  isLoaded: boolean;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  isMinimalist,
  useWhiteText,
  textShadowStyle,
  isLoaded
}) => {
  // Handle scroll to next section with smooth behavior and SSG safety
  const handleScrollToContent = () => {
    // Skip if running on server (SSG)
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const nextSection = document.querySelector('#athletes, #admin, #news') as HTMLElement;
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Dynamic styling based on theme and background
  const getIndicatorClasses = () => {
    const baseClasses = "cursor-pointer touch-manipulation transition-all duration-300";
    
    if (useWhiteText) {
      return `${baseClasses} text-gray-200 hover:text-white active:text-gray-100`;
    }
    
    return `${baseClasses} text-gray-600 hover:text-gray-800 active:text-gray-500`;
  };

  const getContainerClasses = () => {
    return "animate-bounce opacity-60 hover:opacity-80 active:opacity-100 transition-all duration-300";
  };

  return (
    <div 
      className={getIndicatorClasses()}
      onClick={handleScrollToContent}
      role="button"
      tabIndex={0}
      aria-label="Scroll to content"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleScrollToContent();
        }
      }}
      style={{
        animation: isLoaded ? 'fadeInUp 1s ease-out 0.9s forwards' : 'none',
        opacity: isLoaded ? 1 : 0
      }}
    >
      <div className={getContainerClasses()}>
        <ChevronDown 
          className="w-6 h-6 mx-auto"
          style={textShadowStyle}
          strokeWidth={1.5}
        />
      </div>

      {/* Scroll Indicator Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Enhanced touch interactions */
        [role="button"] {
          -webkit-tap-highlight-color: rgba(0,0,0,0.1);
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
};
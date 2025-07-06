// components/sections/HeroSection/HeroLogo.tsx - Enhanced Logo Component
import React from 'react';
import Logo from '../Logo';

interface HeroLogoProps {
  hasBackgroundImage: boolean;
  isLoaded: boolean;
}

export const HeroLogo: React.FC<HeroLogoProps> = ({
  hasBackgroundImage,
  isLoaded
}) => {
  // Dynamic logo styling based on background
  const getLogoClasses = () => {
    const baseClasses = "transform transition-all duration-500";
    const hoverEffects = hasBackgroundImage 
      ? "hover:scale-105 active:scale-95 hover:rotate-1" 
      : "hover:scale-105 active:scale-95 hover:rotate-2";
    
    return `${baseClasses} ${hoverEffects}`;
  };

  // Determine background type for logo enhancement
  const getBackgroundType = (): 'light' | 'dark' | 'complex' => {
    if (!hasBackgroundImage) return 'light';
    // For hero sections with images, assume complex background
    return 'complex';
  };

  return (
    <div 
      className="mb-8 sm:mb-12 md:mb-16 flex justify-center"
      style={{
        animation: isLoaded ? 'fadeInUp 0.8s ease-out 0.1s forwards' : 'none',
        opacity: isLoaded ? 1 : 0
      }}
    >
      <Logo 
        size="hero" 
        className={getLogoClasses()}
        enhancedVisibility={hasBackgroundImage}
        backgroundType={getBackgroundType()}
      />

      {/* Logo Animation Styles */}
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
      `}</style>
    </div>
  );
};
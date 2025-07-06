// components/sections/HeroSection/HeroContent.tsx - Text Content & Animations
import React from 'react';
import type { HeroConfig } from '@/lib/content/types';

interface HeroContentProps {
  hero: HeroConfig;
  isMinimalist: boolean;
  isLoaded: boolean;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  hero,
  isMinimalist,
  isLoaded
}) => {
  // Enhanced text contrast system for mobile readability
  const getTextContrastSystem = () => {
    if (isMinimalist && hero.textOptimization.useWhiteText) {
      const shadowIntensity = hero.textOptimization.shadowIntensity || 'medium';
      
      const shadowMaps = {
        light: {
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 0, 0, 0.3)',
          filterClass: 'drop-shadow-md'
        },
        medium: {
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.4)',
          filterClass: 'drop-shadow-lg'
        },
        strong: {
          textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 16px rgba(0, 0, 0, 0.6), 0 0 24px rgba(0, 0, 0, 0.4)',
          filterClass: 'drop-shadow-xl'
        }
      };

      const currentShadow = shadowMaps[shadowIntensity] || shadowMaps.medium;

      return {
        title: `text-white font-semibold ${currentShadow.filterClass}`,
        subtitle: `text-gray-100 font-semibold ${currentShadow.filterClass}`,
        description: `text-gray-200 font-semibold ${currentShadow.filterClass}`,
        textShadowStyle: { textShadow: currentShadow.textShadow }
      };
    }
    
    // Cartoon mode or minimalist without white text
    return {
      title: 'text-black font-black',
      subtitle: 'text-gray-700 font-bold',
      description: 'text-gray-600 font-semibold',
      textShadowStyle: {}
    };
  };

  const textStyles = getTextContrastSystem();

  // Mobile-optimized responsive classes
  const getTitleClasses = () => {
    const baseClasses = "tracking-tight leading-none transition-all duration-500 mb-4 sm:mb-6 md:mb-8";
    const responsiveSize = "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl";
    
    return `${baseClasses} ${responsiveSize} ${textStyles.title}`;
  };

  const getSubtitleClasses = () => {
    const baseClasses = "tracking-wide transition-all duration-500 mb-3 sm:mb-4 md:mb-6";
    const responsiveSize = "text-lg sm:text-xl md:text-2xl lg:text-3xl";
    
    return `${baseClasses} ${responsiveSize} ${textStyles.subtitle}`;
  };

  const getDescriptionClasses = () => {
    const baseClasses = "tracking-wide leading-relaxed transition-all duration-500 mb-16 sm:mb-20 md:mb-24 lg:mb-28 max-w-2xl lg:max-w-3xl mx-auto";
    const responsiveSize = "text-base sm:text-lg md:text-xl";
    
    return `${baseClasses} ${responsiveSize} ${textStyles.description}`;
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-12">
      {/* Enhanced Title with Mobile-Optimized Animation */}
      <h1 
        className={getTitleClasses()}
        style={textStyles.textShadowStyle}
      >
        {hero.title.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((letter, letterIndex) => (
              <span 
                key={letterIndex}
                className="inline-block transform hover:scale-110 transition-transform duration-200"
                style={{ 
                  animationDelay: `${(wordIndex * 5 + letterIndex) * 50}ms`,
                  animation: isLoaded ? 'fadeInUp 0.8s ease-out forwards' : 'none'
                }}
              >
                {letter}
              </span>
            ))}
            {wordIndex < hero.title.split(' ').length - 1 && '\u00A0'}
          </span>
        ))}
      </h1>
      
      {/* Enhanced Subtitle with Staggered Animation */}
      <p 
        className={getSubtitleClasses()}
        style={{
          ...textStyles.textShadowStyle,
          animation: isLoaded ? 'fadeInUp 1s ease-out 0.3s forwards' : 'none',
          opacity: isLoaded ? 1 : 0
        }}
      >
        {hero.subtitle}
      </p>
      
      {/* Enhanced Description with Mobile-Optimized Line Height */}
      <p 
        className={getDescriptionClasses()}
        style={{
          ...textStyles.textShadowStyle,
          animation: isLoaded ? 'fadeInUp 1s ease-out 0.6s forwards' : 'none',
          opacity: isLoaded ? 1 : 0
        }}
      >
        {hero.description}
      </p>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          h1, p {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        }
      `}</style>
    </div>
  );
};
// components/HeroSection.tsx - Enhanced Mobile-First Hero Section
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Logo from './Logo';
import type { SiteData } from '@/lib/content/types';
import { getImagePath } from '@/lib/utils/image';
import { getThemeConfig } from '@/lib/theme/detection';

interface HeroSectionProps {
  siteData: SiteData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ siteData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const { site } = siteData;
  const { hero } = site;
  
  // Enhanced background detection with mobile considerations
  const hasBackgroundImage = hero.backgroundImage && hero.backgroundImage.trim() !== '';
  const themeConfig = getThemeConfig(hero.backgroundImage);
  const { isMinimalist } = themeConfig;

  // Enhanced mobile viewport and scroll handling
  useEffect(() => {
    const handleResize = () => {
      // Use visual viewport API for better mobile support
      const vh = window.visualViewport?.height || window.innerHeight;
      setViewportHeight(vh);
      
      // Update CSS custom property for mobile vh units
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Visual viewport API for better mobile handling
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Enhanced image load handling for mobile performance
  useEffect(() => {
    if (hasBackgroundImage) {
      const img = new window.Image();
      img.onload = () => setIsLoaded(true);
      img.src = getImagePath(hero.backgroundImage);
    } else {
      setIsLoaded(true);
    }
  }, [hasBackgroundImage, hero.backgroundImage]);

  // Mobile-optimized parallax effect (reduced for performance)
  const parallaxOffset = scrollY * 0.3;

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
        scrollIndicator: `text-gray-200 ${currentShadow.filterClass}`,
        textShadowStyle: { textShadow: currentShadow.textShadow }
      };
    }
    
    // Cartoon mode or minimalist without white text
    return {
      title: 'text-black font-black',
      subtitle: 'text-gray-700 font-bold',
      description: 'text-gray-600 font-semibold',
      scrollIndicator: 'text-gray-600',
      textShadowStyle: {}
    };
  };

  const textStyles = getTextContrastSystem();

  // Enhanced overlay system for mobile
  const getIntelligentOverlay = () => {
    if (!hero.overlay.enabled) return {};

    if (hero.overlay.type === 'gradient') {
      return {
        background: hero.overlay.gradient || 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))'
      };
    }

    return {
      backgroundColor: hero.overlay.solid || 'rgba(0, 0, 0, 0.3)'
    };
  };

  // Mobile-optimized section height
  const getSectionClasses = () => {
    const baseClasses = "relative min-h-screen flex items-center justify-center overflow-hidden";
    // Use CSS custom property for better mobile viewport handling
    const mobileHeight = "style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}";
    
    return baseClasses;
  };

  // Mobile-optimized title classes with better scaling
  const getTitleClasses = () => {
    const baseClasses = "tracking-tight leading-none transition-all duration-500 mb-4 sm:mb-6 md:mb-8";
    const responsiveSize = "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl";
    
    return `${baseClasses} ${responsiveSize} ${textStyles.title}`;
  };

  // Mobile-optimized subtitle classes
  const getSubtitleClasses = () => {
    const baseClasses = "tracking-wide transition-all duration-500 mb-3 sm:mb-4 md:mb-6";
    const responsiveSize = "text-lg sm:text-xl md:text-2xl lg:text-3xl";
    
    return `${baseClasses} ${responsiveSize} ${textStyles.subtitle}`;
  };

  // Mobile-optimized description classes
  const getDescriptionClasses = () => {
    const baseClasses = "tracking-wide leading-relaxed transition-all duration-500 mb-8 sm:mb-12 md:mb-16 max-w-2xl lg:max-w-3xl mx-auto";
    const responsiveSize = "text-base sm:text-lg md:text-xl";
    
    return `${baseClasses} ${responsiveSize} ${textStyles.description}`;
  };

  // Touch-friendly scroll indicator
  const getScrollIndicatorClasses = () => {
    return `animate-bounce opacity-60 hover:opacity-80 active:opacity-100 transition-all duration-300 cursor-pointer touch-manipulation ${textStyles.scrollIndicator}`;
  };

  // Handle scroll to next section with smooth behavior
  const handleScrollToContent = () => {
    const nextSection = document.querySelector('#athletes, #admin, #news') as HTMLElement;
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      id="home" 
      className={getSectionClasses()}
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Background System with Mobile Optimization */}
      {hasBackgroundImage ? (
        // Minimalist Mode: Professional Background System
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src={getImagePath(hero.backgroundImage)}
              alt="Hero background"
              fill
              className={`object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              priority
              quality={85} // Optimized for mobile
              sizes="100vw"
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                objectPosition: 'center center'
              }}
            />
          </div>
          
          {/* Intelligent overlay with enhanced mobile blending */}
          {hero.overlay.enabled && (
            <div 
              className="absolute inset-0 transition-opacity duration-300"
              style={getIntelligentOverlay()}
            />
          )}
          
          {/* Additional mobile readability layer */}
          {hero.textOptimization.enhanceContrast && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          )}
        </div>
      ) : (
        // Cartoon Mode: Enhanced Gradient with Mobile-Optimized Shapes
        <div className={`absolute inset-0 bg-gradient-to-br ${hero.fallbackGradient}`}>
          {/* Optimized geometric shapes for mobile performance */}
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-yellow-300 rounded-full opacity-20 blur-2xl sm:blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-pink-300 rounded-full opacity-30 blur-xl sm:blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-24 sm:w-32 h-24 sm:h-32 bg-blue-300 rounded-full opacity-25 blur-lg sm:blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      )}

      {/* Enhanced Hero Content with Mobile-First Design */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {/* Logo with Enhanced Mobile Visibility */}
          <div className="mb-8 sm:mb-12 md:mb-16 flex justify-center">
            <Logo 
              size="hero" 
              className={`transform transition-all duration-500 hover:scale-105 active:scale-95 ${
                hasBackgroundImage ? 'hover:rotate-1' : 'hover:rotate-2'
              }`}
              enhancedVisibility={!!hasBackgroundImage}
            />
          </div>
          
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
        </div>
        
        {/* Enhanced Touch-Friendly Scroll Indicator */}
        <div 
          className={getScrollIndicatorClasses()}
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
          
        {/* ENHANCED SCROLL INDICATOR */}
        <div className="animate-bounce opacity-60 hover:opacity-80 transition-opacity">
          <ChevronDown 
            className={`w-6 h-6 mx-auto ${textStyles.scrollIndicator}`}
            style={textStyles.textShadowStyle}
          />
        </div>
      </div>
    </div>

      {/* Mobile-optimized loading state */}
      {!isLoaded && hasBackgroundImage && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
        </div>
      )}

      {/* Enhanced CSS for Mobile Animations */}
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
          /* Reduce motion for better mobile performance */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* Optimize text rendering on mobile */
          h1, p {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          
          /* Enhance touch interactions */
          [role="button"] {
            -webkit-tap-highlight-color: rgba(0,0,0,0.1);
            touch-action: manipulation;
          }
        }
        
        /* Custom CSS properties for mobile viewport */
        :root {
          --vh: 1vh;
        }
        
        /* Support for iPhone X+ safe areas */
        @supports (padding-top: constant(safe-area-inset-top)) {
          .mobile-safe-top {
            padding-top: constant(safe-area-inset-top);
          }
        }
        
        @supports (padding-top: env(safe-area-inset-top)) {
          .mobile-safe-top {
            padding-top: env(safe-area-inset-top);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;   

// components/sections/HeroSection/HeroSection.tsx - Main Orchestrator
import React, { useState, useEffect } from 'react';
import type { SiteData } from '@/lib/content/types';
import { getThemeConfig } from '@/lib/theme/detection';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroLogo } from './HeroLogo';
import { ScrollIndicator } from './ScrollIndicator';

interface HeroSectionProps {
  siteData: SiteData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ siteData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const { site } = siteData;
  const { hero } = site;
  
  // Theme detection
  const themeConfig = getThemeConfig(hero.backgroundImage);
  const { isMinimalist } = themeConfig;
  const hasBackgroundImage = hero.backgroundImage && hero.backgroundImage.trim() !== '';

  // Enhanced mobile viewport and scroll handling
  useEffect(() => {
    const handleResize = () => {
      // Use visual viewport API for better mobile support
      const vh = window.visualViewport?.height || window.innerHeight;
      
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

  // Handle background load completion
  const handleBackgroundLoaded = () => {
    setIsLoaded(true);
  };

  // Text contrast system for scroll indicator
  const getTextStyles = () => {
    if (isMinimalist && hero.textOptimization.useWhiteText) {
      const shadowIntensity = hero.textOptimization.shadowIntensity || 'medium';
      
      const shadowMaps = {
        light: '1px 1px 3px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 0, 0, 0.3)',
        medium: '2px 2px 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.4)',
        strong: '3px 3px 8px rgba(0, 0, 0, 0.9), 0 0 16px rgba(0, 0, 0, 0.6), 0 0 24px rgba(0, 0, 0, 0.4)'
      };

      return {
        textShadow: shadowMaps[shadowIntensity] || shadowMaps.medium
      };
    }
    
    return {};
  };

  // Mobile-optimized section styling
  const getSectionClasses = () => {
    return "relative min-h-screen flex items-center justify-center overflow-hidden";
  };

  const textStyles = getTextStyles();

  return (
    <section 
      id="home" 
      className={getSectionClasses()}
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      {/* Background System */}
      <HeroBackground
        hero={hero}
        isMinimalist={isMinimalist}
        scrollY={scrollY}
        onLoadComplete={handleBackgroundLoaded}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Logo */}
        <HeroLogo
          hasBackgroundImage={hasBackgroundImage}
          isLoaded={isLoaded}
        />
        
        {/* Main Content */}
        <HeroContent
          hero={hero}
          isMinimalist={isMinimalist}
          isLoaded={isLoaded}
        />
        
        {/* Scroll Indicator */}
        <ScrollIndicator
          isMinimalist={isMinimalist}
          useWhiteText={hero.textOptimization.useWhiteText}
          textShadowStyle={textStyles}
          isLoaded={isLoaded}
        />
      </div>

      {/* Global Styles for Mobile Optimization */}
      <style jsx global>{`
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
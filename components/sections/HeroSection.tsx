// components/HeroSection.tsx - Updated with new modular imports
import React from 'react';
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
  const { site } = siteData;
  const { hero } = site;
  
  // Enhanced background detection
  const hasBackgroundImage = hero.backgroundImage && hero.backgroundImage.trim() !== '';
  const themeConfig = getThemeConfig(hero.backgroundImage);
  const { isMinimalist } = themeConfig;
  
  // ADVANCED TEXT CONTRAST SYSTEM
  const getTextContrastSystem = () => {
    if (isMinimalist && hero.textOptimization.useWhiteText) {
      // White text with sophisticated shadow layering
      const shadowIntensity = hero.textOptimization.shadowIntensity;
      
      const shadowMaps = {
        light: {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          filterClass: 'drop-shadow-sm'
        },
        medium: {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.3)',
          filterClass: 'drop-shadow-md'
        },
        strong: {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)',
          filterClass: 'drop-shadow-lg'
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

  // INTELLIGENT OVERLAY SYSTEM
  const getIntelligentOverlay = () => {
    if (!hasBackgroundImage || !hero.overlay.enabled) return {};
    
    switch (hero.overlay.type) {
      case 'solid':
        return { 
          backgroundColor: hero.overlay.solid,
          backdropFilter: 'blur(0.5px)' // Subtle blur for texture retention
        };
      case 'gradient':
        return { 
          background: hero.overlay.gradient,
          backdropFilter: 'blur(0.5px)'
        };
      case 'none':
      default:
        return {};
    }
  };

  // BACKGROUND TYPE DETECTION for Logo
  const getBackgroundType = (): 'light' | 'dark' | 'complex' => {
    if (!hasBackgroundImage) return 'light';
    if (hero.textOptimization.useWhiteText) return 'dark';
    return 'complex';
  };

  const textStyles = getTextContrastSystem();
  const backgroundType = getBackgroundType();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* ENHANCED BACKGROUND LAYER */}
      {hasBackgroundImage ? (
        // Minimalist Mode: Professional Background System
        <div className="absolute inset-0">
          <Image
            src={getImagePath(hero.backgroundImage)}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={95} // Higher quality for hero image
            sizes="100vw"
          />
          
          {/* INTELLIGENT OVERLAY with enhanced blending */}
          {hero.overlay.enabled && (
            <div 
              className="absolute inset-0 transition-opacity duration-300"
              style={getIntelligentOverlay()}
            />
          )}
          
          {/* ADDITIONAL TEXT READABILITY LAYER */}
          {hero.textOptimization.enhanceContrast && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
          )}
        </div>
      ) : (
        // Cartoon Mode: Enhanced Gradient with Dynamic Shapes
        <div className={`absolute inset-0 bg-gradient-to-br ${hero.fallbackGradient}`}>
          {/* Enhanced geometric shapes with subtle animations */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-300 rounded-full opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-300 rounded-full opacity-25 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      )}

      {/* ENHANCED HERO CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-20">
          {/* LOGO WITH ADVANCED VISIBILITY */}
          <div className="mb-16 flex justify-center">
            <Logo 
              size="hero" 
              className="transform hover:scale-110 hover:rotate-1 transition-all duration-500"
              enhancedVisibility={!!hasBackgroundImage}
              backgroundType={backgroundType}
            />
          </div>
          
          {/* ENHANCED TITLE with Dynamic Styling */}
          <h1 
            className={`text-7xl md:text-9xl mb-8 tracking-tight leading-none transform hover:scale-105 transition-transform duration-300 ${textStyles.title}`}
            style={textStyles.textShadowStyle}
          >
            {hero.title.split('').map((letter, index) => (
              <span 
                key={index}
                className={`inline-block transform hover:${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} transition-transform duration-200`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          
          {/* ENHANCED SUBTITLE */}
          <p 
            className={`text-2xl md:text-3xl mb-6 tracking-wide ${textStyles.subtitle}`}
            style={textStyles.textShadowStyle}
          >
            {hero.subtitle}
          </p>
          
          {/* ENHANCED DESCRIPTION */}
          <p 
            className={`text-lg mb-16 tracking-wide max-w-3xl mx-auto leading-relaxed ${textStyles.description}`}
            style={textStyles.textShadowStyle}
          >
            {hero.description}
          </p>
        </div>
        
        {/* ENHANCED SCROLL INDICATOR */}
        <div className="animate-bounce opacity-60 hover:opacity-80 transition-opacity">
          <ChevronDown 
            className={`w-6 h-6 mx-auto ${textStyles.scrollIndicator}`}
            style={textStyles.textShadowStyle}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
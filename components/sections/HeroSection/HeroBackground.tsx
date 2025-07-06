// components/sections/HeroSection/HeroBackground.tsx - Background Management
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImagePath } from '@/lib/utils/image';
import type { HeroConfig } from '@/lib/content/types';

interface HeroBackgroundProps {
  hero: HeroConfig;
  isMinimalist: boolean;
  scrollY?: number;
  onLoadComplete?: () => void;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  hero,
  isMinimalist,
  scrollY = 0,
  onLoadComplete
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const hasBackgroundImage = hero.backgroundImage && hero.backgroundImage.trim() !== '';
  
  // Handle image loading with SSG safety
  useEffect(() => {
    if (typeof window === 'undefined') {
      // SSG mode - just mark as loaded
      setIsLoaded(true);
      onLoadComplete?.();
      return;
    }

    if (hasBackgroundImage) {
      const img = new (window.Image as { new (): HTMLImageElement })(); // Use global Image with type annotation
      img.onload = () => {
        setIsLoaded(true);
        onLoadComplete?.();
      };
      img.onerror = () => {
        setIsLoaded(true); // Mark as loaded even on error
        onLoadComplete?.();
      };
      img.src = getImagePath(hero.backgroundImage);
    } else {
      setIsLoaded(true);
      onLoadComplete?.();
    }
  }, [hasBackgroundImage, hero.backgroundImage, onLoadComplete]);

  // Mobile-optimized parallax (reduced for performance)
  const parallaxOffset = scrollY * 0.3;

  // Intelligent overlay system
  const getOverlayStyles = () => {
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

  if (hasBackgroundImage) {
    // Minimalist Mode: Professional Background
    return (
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <div className="relative w-full h-full">
          <Image
            src={getImagePath(hero.backgroundImage)}
            alt="Hero background"
            fill
            className={`object-cover transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            priority
            quality={85}
            sizes="100vw"
            style={{
              transform: `translateY(${parallaxOffset}px)`,
              objectPosition: 'center center'
            }}
          />
        </div>
        
        {/* Intelligent Overlay */}
        {hero.overlay.enabled && (
          <div 
            className="absolute inset-0 transition-opacity duration-300"
            style={getOverlayStyles()}
          />
        )}
        
        {/* Additional Mobile Readability Layer */}
        {hero.textOptimization.enhanceContrast && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        )}

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
          </div>
        )}
      </div>
    );
  }

  // Cartoon Mode: Enhanced Gradient Background
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${hero.fallbackGradient}`}>
      {/* Mobile-Optimized Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-yellow-300 rounded-full opacity-20 blur-2xl sm:blur-3xl animate-pulse" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-pink-300 rounded-full opacity-30 blur-xl sm:blur-2xl animate-pulse" 
        style={{ animationDelay: '1s' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-24 sm:w-32 h-24 sm:h-32 bg-blue-300 rounded-full opacity-25 blur-lg sm:blur-xl animate-pulse" 
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
};
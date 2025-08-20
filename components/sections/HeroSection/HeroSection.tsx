// components/sections/HeroSection/HeroSection.tsx - Main Orchestrator with Carousel
import React, { useState, useEffect, useRef } from 'react';
import type { SiteData } from '@/lib/content/types';
import { getThemeConfig } from '@/lib/theme/detection';
import { HeroContent } from './HeroContent';
import { HeroLogo } from './HeroLogo';
import { ScrollIndicator } from './ScrollIndicator';
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  siteData: SiteData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ siteData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { site } = siteData;
  const { hero } = site;
  
  // Theme detection
  const themeConfig = getThemeConfig(hero.backgroundImage);
  const { isMinimalist } = themeConfig;

  // Build media array from hero configuration
  const mediaItems: Array<{ type: 'video' | 'image'; src: string }> = [];
  
  // Add background image/video if exists
  if (hero.backgroundImage && hero.backgroundImage.trim() !== '') {
    // Detect if it's a video by file extension
    const isVideo = hero.backgroundImage.endsWith('.mp4') || 
                   hero.backgroundImage.endsWith('.webm') || 
                   hero.backgroundImage.endsWith('.mov');
    
    mediaItems.push({ 
      type: isVideo ? 'video' : 'image', 
      src: hero.backgroundImage 
    });
  }
  
  // Add additional media if configured
  if (hero.carousel?.media && Array.isArray(hero.carousel.media)) {
    hero.carousel.media.forEach((item: any) => {
      if (typeof item === 'string') {
        // Determine if it's a video by extension
        const isVideo = item.endsWith('.mp4') || 
                       item.endsWith('.webm') || 
                       item.endsWith('.mov');
        mediaItems.push({ 
          type: isVideo ? 'video' : 'image', 
          src: item 
        });
      } else if (item.type && item.src) {
        mediaItems.push({ type: item.type, src: item.src });
      }
    });
  }

  // Get carousel settings with defaults
  const carouselSettings = {
    autoPlay: hero.carousel?.autoPlay !== false,
    imageDuration: (hero.carousel?.imageDuration || 5) * 1000,
    pauseOnHover: hero.carousel?.pauseOnHover !== false
  };

  // Initialize for SSG
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
      setIsLoaded(true);
    }
  }, []);

  // Enhanced mobile viewport and scroll handling with SSG safety
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
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

  // Auto-advance carousel
  useEffect(() => {
    if (!isCarouselPlaying || mediaItems.length <= 1) return;

    const currentMedia = mediaItems[currentMediaIndex];
    
    if (currentMedia?.type === 'image') {
      timerRef.current = setTimeout(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
      }, carouselSettings.imageDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentMediaIndex, isCarouselPlaying, mediaItems.length, carouselSettings.imageDuration]);

  const handleVideoEnd = () => {
    if (isCarouselPlaying && mediaItems.length > 1) {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }
  };

  const goToMedia = (index: number) => {
    setCurrentMediaIndex(index);
    setIsCarouselPlaying(false);
  };

  // Mobile-optimized parallax (reduced for performance)
  const parallaxOffset = scrollY * 0.3;

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

  const textStyles = getTextStyles();

  // If no media configured, use gradient fallback
  const hasMedia = mediaItems.length > 0;

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
      onMouseEnter={() => carouselSettings.pauseOnHover && setIsCarouselPlaying(false)}
      onMouseLeave={() => carouselSettings.pauseOnHover && carouselSettings.autoPlay && setIsCarouselPlaying(true)}
    >
      {/* Background System */}
      <div className="absolute inset-0">
        {hasMedia ? (
          // Carousel Background
          <>
            {mediaItems[currentMediaIndex]?.type === 'video' ? (
              <video
                ref={videoRef}
                key={`video-${currentMediaIndex}`}
                src={(() => {
                  const src = mediaItems[currentMediaIndex].src;
                  // Handle different video path formats
                  if (src.startsWith('http') || src.startsWith('/')) {
                    return src;
                  }
                  // If just filename, assume it's in /video/ directory
                  return `/video/${src}`;
                })()}
                className="absolute inset-0 w-full h-full object-cover animate-fadeIn"
                autoPlay
                muted
                loop={false}
                playsInline
                onEnded={handleVideoEnd}
                style={{
                  transform: `translateY(${parallaxOffset}px)`
                }}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  key={`image-${currentMediaIndex}`}
                  src={mediaItems[currentMediaIndex]?.src || ''}
                  alt="Hero background"
                  fill
                  className="object-cover animate-fadeIn"
                  priority
                  quality={85}
                  sizes="100vw"
                  style={{
                    transform: `translateY(${parallaxOffset}px)`,
                    objectPosition: 'center center'
                  }}
                />
              </div>
            )}
            
            {/* Intelligent Overlay */}
            {hero.overlay.enabled && (
              <div 
                className="absolute inset-0 transition-opacity duration-300"
                style={
                  hero.overlay.type === 'gradient'
                    ? { background: hero.overlay.gradient || 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))' }
                    : { backgroundColor: hero.overlay.solid || 'rgba(0, 0, 0, 0.3)' }
                }
              />
            )}
            
            {/* Additional Mobile Readability Layer */}
            {hero.textOptimization.enhanceContrast && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            )}
          </>
        ) : (
          // Cartoon Mode: Enhanced Gradient Background (no carousel)
          <div className={`absolute inset-0 bg-gradient-to-br ${hero.fallbackGradient}`}>
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
        )}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Logo */}
        <HeroLogo
          hasBackgroundImage={hasMedia}
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

      {/* Carousel Controls - Positioned at bottom of viewport */}
      {mediaItems.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToMedia(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  index === currentMediaIndex 
                    ? 'bg-white w-10 shadow-lg' 
                    : 'bg-white/40 hover:bg-white/60 w-1.5 hover:w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Play/Pause - Optional, can be removed for cleaner look */}
          <button
            onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
            className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            aria-label={isCarouselPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            {isCarouselPlaying ? (
              <Pause className="w-3 h-3 text-white/80" strokeWidth={2.5} />
            ) : (
              <Play className="w-3 h-3 text-white/80" strokeWidth={2.5} />
            )}
          </button>
        </div>
      )}

      {/* Global Styles for Mobile Optimization with SSG Safety */}
      <style jsx global>{`
        :root {
          --vh: 1vh;
        }
        
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
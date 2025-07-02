// components/SponsorsSection.tsx - Modern Floating Logo Design
import React from 'react';
import type { Sponsor } from '@/lib/content/types';

import { 
  getSectionBackground, 
  getTitleClasses, 
  getSubtitleClasses
} from '@/lib/theme/styles';

import { mergeClasses } from '@/lib/utils/formatting';

interface SponsorsSectionProps {
  sponsors: Sponsor[];
  isMinimalist?: boolean;
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ sponsors, isMinimalist = false }) => {
  const sponsorCount = sponsors.length;

  // Get consistent styling classes
  const sectionBg = getSectionBackground(isMinimalist, 'quaternary');
  const titleClasses = getTitleClasses(isMinimalist, 'large');
  const subtitleClasses = getSubtitleClasses(isMinimalist);

  // Dynamic grid configuration based on sponsor count
  const getGridLayout = () => {
    if (sponsorCount === 0) {
      return 'flex justify-center items-center min-h-[300px]';
    } else if (sponsorCount === 1) {
      return 'flex justify-center';
    } else if (sponsorCount <= 2) {
      return 'grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 justify-center max-w-4xl mx-auto';
    } else if (sponsorCount <= 4) {
      return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(sponsorCount, 4)} gap-12 lg:gap-16 justify-center max-w-6xl mx-auto`;
    } else {
      // 5+ sponsors: Multi-row responsive grid
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16 max-w-7xl mx-auto';
    }
  };

  // Clean floating sponsor container - NO borders, shadows, or cards
  const getSponsorContainerClasses = () => {
    return mergeClasses(
      "group cursor-pointer transition-all duration-500 text-center",
      "transform hover:scale-105", // Subtle hover effect
      "flex flex-col items-center justify-center",
      "min-h-[200px] py-8" // Ensure consistent spacing
    );
  };

  // Enhanced large logo container
  const getLogoContainerClasses = () => {
    return mergeClasses(
      "flex items-center justify-center mb-6",
      "w-full max-w-[280px] h-32", // Significantly larger logos
      "transition-all duration-500",
      "group-hover:scale-110" // Subtle logo scaling on hover
    );
  };

  // Modern, clean company name typography
  const getCompanyNameClasses = () => {
    const baseClasses = "transition-colors duration-300 text-center leading-tight";
    
    if (isMinimalist) {
      return mergeClasses(
        baseClasses,
        "text-xl font-light text-gray-800", // Clean, light typography
        "group-hover:text-gray-900"
      );
    }
    
    // Cartoon mode - slightly bolder but still clean
    return mergeClasses(
      baseClasses,
      "text-xl font-medium text-gray-800",
      "group-hover:text-black"
    );
  };

  // Clean sponsor type styling (if present)
  const getSponsorTypeClasses = () => {
    const baseClasses = "text-sm mt-2 transition-colors duration-300";
    
    return isMinimalist 
      ? mergeClasses(baseClasses, "text-gray-500 font-light")
      : mergeClasses(baseClasses, "text-gray-600 font-medium");
  };

  // Empty state styling
  const getEmptyStateClasses = () => {
    return mergeClasses(
      "text-center max-w-md mx-auto",
      "flex flex-col items-center justify-center",
      "py-16"
    );
  };

  const getEmptyIconClasses = () => {
    return mergeClasses(
      "w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center",
      "transition-all duration-300",
      isMinimalist 
        ? "bg-gray-100 hover:bg-gray-200" 
        : "bg-gray-200 hover:bg-gray-300"
    );
  };

  const getEmptyTextClasses = () => {
    return mergeClasses(
      "mb-8 text-lg",
      isMinimalist ? "text-gray-600 font-light" : "text-gray-600 font-medium"
    );
  };

  const getEmptyButtonClasses = () => {
    const baseClasses = "px-10 py-3 rounded-lg inline-block transition-all duration-300 text-base";
    
    return isMinimalist 
      ? mergeClasses(baseClasses, "bg-gray-100 text-gray-700 hover:bg-gray-200 font-light")
      : mergeClasses(baseClasses, "bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium");
  };

  // Handle empty state
  if (sponsorCount === 0) {
    return (
      <section id="sponsors" className={`py-32 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-24 relative">
            {/* Decorative shapes for cartoon mode */}
            {!isMinimalist && (
              <>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-20 blur-xl animate-pulse hidden lg:block"></div>
                <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-pink-300 rounded-full opacity-25 blur-lg animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>
              </>
            )}
            
            <h2 className={titleClasses}>Our Partners</h2>
            <p className={subtitleClasses}>
              Proud partners supporting our journey to excellence.
            </p>
          </div>
          
          {/* Empty State */}
          <div className={getEmptyStateClasses()}>
            <div className={getEmptyIconClasses()}>
              <span className="text-4xl">🤝</span>
            </div>
            
            <p className={getEmptyTextClasses()}>
              We're always looking for partners to join our journey toward excellence.
            </p>
            
            <div className={getEmptyButtonClasses()}>
              Partnership Opportunities
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sponsors" className={`py-32 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-24 relative">
          {/* Decorative shapes for cartoon mode */}
          {!isMinimalist && (
            <>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-20 blur-xl animate-pulse hidden lg:block"></div>
              <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-pink-300 rounded-full opacity-25 blur-lg animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>
            </>
          )}
          
          <h2 className={titleClasses}>Our Partners</h2>
          <p className={subtitleClasses}>
            Trusted organizations that believe in our mission and support our pursuit of excellence.
          </p>
        </div>
        
        {/* Modern Floating Logo Grid */}
        <div className={getGridLayout()}>
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className={getSponsorContainerClasses()}
            >
              {/* Large Floating Logo Container */}
              <div className={getLogoContainerClasses()}>
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain transition-all duration-500"
                  onError={(e) => {
                    // Enhanced fallback for failed image loads
                    const target = e.target as HTMLImageElement;
                    const fallbackColor = isMinimalist ? '#F9FAFB' : '#F3F4F6';
                    const textColor = isMinimalist ? '#9CA3AF' : '#6B7280';
                    target.outerHTML = `
                      <div class="w-full h-full flex items-center justify-center rounded-lg" style="background-color: ${fallbackColor}; color: ${textColor};">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                        </svg>
                      </div>
                    `;
                  }}
                />
              </div>
              
              {/* Modern Company Name Typography */}
              <h3 className={getCompanyNameClasses()}>
                {sponsor.name}
              </h3>
              
              {/* Optional Clean Sponsor Type */}
              {sponsor.type && (
                <p className={getSponsorTypeClasses()}>
                  {sponsor.type}
                </p>
              )}
            </a>
          ))}
        </div>

        {/* Development Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-center text-xs text-gray-500">
            Theme: {isMinimalist ? 'Minimalist' : 'Cartoon'} | Showing {sponsorCount} partners | Modern Floating Design
          </div>
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;
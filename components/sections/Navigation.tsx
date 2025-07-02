// components/Navigation.tsx - Updated with new modular imports
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';
import type { SiteData } from '@/lib/content/types';
import { getThemeConfig } from '@/lib/theme/detection';
import { mergeClasses } from '@/lib/utils/formatting';

interface NavigationProps {
  siteData: SiteData;
}

const Navigation: React.FC<NavigationProps> = ({ siteData }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const { site, navigation } = siteData;
  const { hero } = site;
  
  // Get unified theme configuration
  const themeConfig = getThemeConfig(hero.backgroundImage);
  const { isMinimalist } = themeConfig;

  // Check if we're on a dedicated page (not homepage)
  const isOnDedicatedPage = router.pathname !== '/';

  // Generate proper navigation href
  const getNavHref = (originalHref: string) => {
    if (isOnDedicatedPage) {
      // If on dedicated page, always go back to home with section
      return `/${originalHref}`;
    }
    // If on homepage, use original href
    return originalHref;
  };

  // Enhanced navigation styling based on theme
  const getNavContainerClasses = () => {
    if (isMinimalist) {
      return "fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 z-40 shadow-sm";
    }
    
    // Cartoon mode
    return "fixed top-0 w-full bg-white/90 backdrop-blur-2xl border-b-4 border-black z-40 shadow-lg";
  };

  // Enhanced logo and brand styling
  const getBrandClasses = () => {
    return isMinimalist
      ? "text-2xl font-semibold tracking-wider text-black"
      : "text-2xl font-bold tracking-wider text-black";
  };

  // Enhanced navigation link styling
  const getNavLinkClasses = () => {
    const baseClasses = "transition-all duration-300 text-sm uppercase tracking-wide";
    
    if (isMinimalist) {
      return mergeClasses(
        baseClasses,
        "text-gray-700 hover:text-black font-medium transform hover:scale-105"
      );
    }
    
    // Cartoon mode
    return mergeClasses(
      baseClasses,
      "text-gray-800 hover:text-black font-bold transform hover:scale-105"
    );
  };

  // Enhanced mobile menu styling
  const getMobileMenuClasses = () => {
    if (isMinimalist) {
      return "md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50";
    }
    
    // Cartoon mode
    return "md:hidden bg-white/95 backdrop-blur-2xl border-t-4 border-black";
  };

  // Enhanced mobile link styling
  const getMobileLinkClasses = () => {
    const baseClasses = "block px-6 py-6 text-sm uppercase tracking-wide transition-all border-b-2 border-transparent";
    
    if (isMinimalist) {
      return mergeClasses(
        baseClasses,
        "text-gray-700 hover:text-black font-medium hover:border-gray-300"
      );
    }
    
    // Cartoon mode
    return mergeClasses(
      baseClasses,
      "text-gray-800 hover:text-black font-bold hover:border-black"
    );
  };

  // Enhanced mobile menu button styling
  const getMobileButtonClasses = () => {
    const baseClasses = "md:hidden p-2 rounded-lg transition-all";
    
    if (isMinimalist) {
      return mergeClasses(
        baseClasses,
        "hover:bg-gray-100"
      );
    }
    
    // Cartoon mode
    return mergeClasses(
      baseClasses,
      "hover:bg-gray-100 border-2 border-transparent hover:border-black"
    );
  };

  return (
    <nav className={getNavContainerClasses()}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Brand Section */}
          <Link href="/" className="flex items-center space-x-4">
            <Logo 
              size="small" 
              className="transform hover:scale-110 transition-all duration-300" 
            />
            <span className={getBrandClasses()}>
              {site.name}
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={getNavHref(item.href)}
                className={getNavLinkClasses()}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button with enhanced styling */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={getMobileButtonClasses()}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-black" />
            ) : (
              <Menu size={20} className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      {mobileMenuOpen && (
        <div className={getMobileMenuClasses()}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={getNavHref(item.href)}
              className={getMobileLinkClasses()}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
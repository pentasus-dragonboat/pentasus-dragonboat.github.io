// components/Logo.tsx - Updated with image path helper
import React from 'react';
import { Waves } from 'lucide-react';
import { getImagePath } from '@/lib/utils/image';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  className?: string;
  style?: React.CSSProperties;
  fallbackIcon?: boolean;
  enhancedVisibility?: boolean;
  backgroundType?: 'light' | 'dark' | 'complex';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  className = '', 
  style = {},
  fallbackIcon = false,
  enhancedVisibility = false,
  backgroundType = 'light'
}) => {
  const sizeClasses = {
    small: 'h-8 w-auto',
    medium: 'h-12 w-auto',
    large: 'h-16 w-auto',
    hero: 'h-32 w-auto'
  };

  const iconSizes = {
    small: 20,
    medium: 24,
    large: 32,
    hero: 64
  };

  const getAdvancedLogoStyles = (): React.CSSProperties => {
    if (!enhancedVisibility) {
      return {
        imageRendering: 'crisp-edges' as const,
        ...style
      };
    }

    const shadowLayers = {
      light: [
        '0 2px 4px rgba(0, 0, 0, 0.1)',
        '0 1px 2px rgba(0, 0, 0, 0.06)'
      ],
      dark: [
        '0 0 20px rgba(255, 255, 255, 0.8)',
        '0 0 40px rgba(255, 255, 255, 0.6)',
        '0 4px 12px rgba(0, 0, 0, 0.8)',
        '0 2px 4px rgba(0, 0, 0, 0.9)'
      ],
      complex: [
        '0 0 30px rgba(255, 255, 255, 0.9)',
        '0 0 60px rgba(255, 255, 255, 0.7)',
        '0 0 10px rgba(0, 0, 0, 0.8)',
        '0 8px 24px rgba(0, 0, 0, 0.6)',
        '0 4px 8px rgba(0, 0, 0, 0.9)'
      ]
    };

    const shadows = shadowLayers[backgroundType].join(', ');

    return {
      imageRendering: 'crisp-edges' as const,
      filter: `drop-shadow(${shadows.replace(/,/g, ') drop-shadow(')})`,
      ...style
    };
  };

  const getIconVisibilityClass = (): string => {
    if (!enhancedVisibility) return '';
    
    switch (backgroundType) {
      case 'dark':
        return 'shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.6)] text-white';
      case 'complex':
        return 'shadow-[0_0_30px_rgba(255,255,255,0.9),0_0_60px_rgba(255,255,255,0.7)] text-white';
      default:
        return 'shadow-lg';
    }
  };

  if (fallbackIcon) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} style={style}>
        <div className={`bg-black rounded-full p-3 shadow-lg ${getIconVisibilityClass()}`}>
          <Waves 
            size={iconSizes[size]} 
            className="text-white" 
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-block ${className}`}>
      <img
        src={getImagePath('/images/logo/pentasus-logo.png')} // UPDATED HERE
        alt="Pentasus Dragon Boat Team"
        className={`${sizeClasses[size]} object-contain`}
        style={getAdvancedLogoStyles()}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            const iconClass = enhancedVisibility ? getIconVisibilityClass() : '';
            parent.innerHTML = `
              <div class="inline-flex items-center justify-center bg-black rounded-full p-3 shadow-lg ${iconClass}">
                <svg width="${iconSizes[size]}" height="${iconSizes[size]}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                  <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                  <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                </svg>
              </div>
            `;
          }
        }}
      />
    </div>
  );
};

export default Logo;
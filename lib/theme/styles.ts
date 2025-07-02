// lib/theme/styles.ts - Styling utility functions

/**
 * Gets consistent section background classes
 */
export function getSectionBackground(
  isMinimalist: boolean, 
  sectionType: 'primary' | 'secondary' | 'tertiary' | 'quaternary' = 'primary'
): string {
  if (isMinimalist) {
    const backgrounds = {
      primary: "bg-white/90 backdrop-blur-sm",
      secondary: "bg-gray-50/90 backdrop-blur-sm", 
      tertiary: "bg-gray-100/90 backdrop-blur-sm",
      quaternary: "bg-white/95 backdrop-blur-sm"
    };
    return backgrounds[sectionType];
  }
  
  // Cartoon mode backgrounds
  const backgrounds = {
    primary: "bg-gradient-to-b from-yellow-100 to-pink-100",
    secondary: "bg-gradient-to-b from-pink-100 to-blue-100",
    tertiary: "bg-gradient-to-b from-blue-100 to-yellow-100", 
    quaternary: "bg-gradient-to-b from-pink-100 to-yellow-100"
  };
  return backgrounds[sectionType];
}

/**
 * Gets consistent title styling based on theme
 */
export function getTitleClasses(
  isMinimalist: boolean,
  size: 'large' | 'medium' | 'small' = 'large'
): string {
  const sizeClasses = {
    large: isMinimalist 
      ? "text-6xl font-thin text-black mb-8 tracking-tight transform "
      : "text-7xl font-black text-black mb-8 tracking-tight transform ",
    medium: isMinimalist
      ? "text-4xl font-light text-black mb-6 tracking-tight transform "
      : "text-5xl font-black text-black mb-6 tracking-tight transform ",
    small: isMinimalist
      ? "text-2xl font-light text-black mb-4 tracking-tight"
      : "text-3xl font-bold text-black mb-4 tracking-tight"
  };
  return sizeClasses[size];
}

/**
 * Gets consistent subtitle styling based on theme
 */
export function getSubtitleClasses(isMinimalist: boolean): string {
  const color = isMinimalist ? "text-gray-600" : "text-gray-800";
  const weight = isMinimalist ? "font-light" : "font-bold";
  return `text-2xl ${color} ${weight} max-w-4xl mx-auto leading-relaxed`;
}

/**
 * Gets consistent body text styling based on theme
 */
export function getBodyTextClasses(isMinimalist: boolean): string {
  const color = isMinimalist ? "text-gray-600" : "text-gray-700";
  const weight = isMinimalist ? "font-light" : "font-semibold";
  return `${color} ${weight} leading-relaxed`;
}

/**
 * Gets consistent card styling based on theme
 */
export function getCardClasses(
  isMinimalist: boolean,
  variant: 'default' | 'featured' | 'compact' = 'default'
): string {
  const baseClasses = "bg-white rounded-lg shadow-lg transform transition-all cursor-pointer";
  
  if (isMinimalist) {
    const variants = {
      default: `${baseClasses} border border-gray-200 hover:shadow-xl hover:scale-101`,
      featured: `${baseClasses} border-2 border-gray-300 hover:shadow-xl hover:scale-101`,
      compact: `${baseClasses} border border-gray-200 hover:shadow-lg hover:scale-101`
    };
    return variants[variant];
  }
  
  // Cartoon mode
  const variants = {
    default: `${baseClasses} border-4 border-black hover:scale-105 hover:rotate-1`,
    featured: `${baseClasses} border-6 border-black hover:scale-105 hover:rotate-1 shadow-xl`,
    compact: `${baseClasses} border-3 border-black hover:scale-105 hover:rotate-1`
  };
  return variants[variant];
}

/**
 * Gets consistent button styling based on theme
 */
export function getButtonClasses(
  isMinimalist: boolean,
  variant: 'primary' | 'secondary' | 'accent' = 'primary',
  size: 'small' | 'medium' | 'large' = 'medium'
): string {
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-8 py-3 text-base",
    large: "px-16 py-4 text-lg"
  };
  
  const baseClasses = `${sizeClasses[size]} font-bold tracking-wider uppercase transform transition-all duration-300 rounded-lg`;
  
  if (isMinimalist) {
    const variants = {
      primary: `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg`,
      secondary: `${baseClasses} bg-gray-600 text-white hover:bg-gray-700 hover:scale-105 shadow-md hover:shadow-lg`,
      accent: `${baseClasses} bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-md hover:shadow-lg`
    };
    return variants[variant];
  }
  
  // Cartoon mode
  const variants = {
    primary: `${baseClasses} bg-blue-400 border-4 border-black text-black hover:bg-blue-500 hover:scale-105 shadow-lg`,
    secondary: `${baseClasses} bg-gray-400 border-4 border-black text-black hover:bg-gray-500 hover:scale-105 shadow-lg`,
    accent: `${baseClasses} bg-green-400 border-4 border-black text-black hover:bg-green-500 hover:scale-105 shadow-lg`
  };
  return variants[variant];
}

/**
 * Gets role pill styling for consistent theming
 */
export function getRolePillClasses(
  isMinimalist: boolean,
  color: 'blue' | 'green' | 'red' | 'purple' = 'blue'
): string {
  const baseClasses = "font-bold tracking-wide uppercase text-xs rounded-full px-4 py-2 inline-block transition-all";
  
  if (isMinimalist) {
    const colors = {
      blue: `${baseClasses} text-gray-700 font-medium bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:border-blue-300`,
      green: `${baseClasses} text-gray-700 font-medium bg-green-50 border border-green-200 hover:bg-green-100 hover:border-green-300`,
      red: `${baseClasses} text-gray-700 font-medium bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300`,
      purple: `${baseClasses} text-gray-700 font-medium bg-purple-50 border border-purple-200 hover:bg-purple-100 hover:border-purple-300`
    };
    return colors[color];
  }
  
  // Cartoon mode
  const colors = {
    blue: `${baseClasses} text-white bg-blue-500 border-2 border-black hover:bg-blue-600 hover:scale-105 shadow-lg`,
    green: `${baseClasses} text-white bg-green-500 border-2 border-black hover:bg-green-600 hover:scale-105 shadow-lg`,
    red: `${baseClasses} text-white bg-red-500 border-2 border-black hover:bg-red-600 hover:scale-105 shadow-lg`,
    purple: `${baseClasses} text-white bg-purple-500 border-2 border-black hover:bg-purple-600 hover:scale-105 shadow-lg`
  };
  return colors[color];
}
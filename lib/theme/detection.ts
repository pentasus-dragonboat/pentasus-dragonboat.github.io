// lib/theme/detection.ts - Theme mode detection logic
export interface ThemeConfig {
  isMinimalist: boolean;
  backgroundImage: string;
}

/**
 * Detects if the site should use Minimalist Mode
 * Based on presence of hero background image
 */
export function detectStyleMode(backgroundImage: string): boolean {
  return !!backgroundImage && backgroundImage.trim() !== '';
}

/**
 * Gets the theme configuration for any component
 */
export function getThemeConfig(heroBackgroundImage: string): ThemeConfig {
  const isMinimalist = detectStyleMode(heroBackgroundImage);
  return {
    isMinimalist,
    backgroundImage: heroBackgroundImage
  };
}
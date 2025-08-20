// lib/theme/detection.ts - Theme mode detection logic
export interface ThemeConfig {
  isMinimalist: boolean;
  backgroundImage: string;
}

/**
 * Detects if the site should use Minimalist Mode
 * Based on presence of hero background image or video
 */
export function detectStyleMode(backgroundImage: string): boolean {
  return !!backgroundImage && backgroundImage.trim() !== '';
}

/**
 * Gets the theme configuration for any component
 * Works with both image and video backgrounds
 */
export function getThemeConfig(heroBackgroundImage: string): ThemeConfig {
  const isMinimalist = detectStyleMode(heroBackgroundImage);
  return {
    isMinimalist,
    backgroundImage: heroBackgroundImage
  };
}
// lib/utils/image.ts - Image handling utilities
/**
 * Get properly formatted image path for production/development
 */
export function getImagePath(src: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/pentasus-dragonboat.github.io' : '';
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  return `${basePath}${normalizedSrc}`;
}
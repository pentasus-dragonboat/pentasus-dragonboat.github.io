// lib/utils/image.ts - Updated for GitHub Pages User Site
/**
 * Get properly formatted image path for production/development
 * Updated for pentasus-dragonboat.github.io (user pages)
 */
export function getImagePath(src: string): string {
  // User pages are served from root: pentasus-dragonboat.github.io/
  // Project pages would be served from: username.github.io/repo-name/
  
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }
  
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  return normalizedSrc;
  
  // 🔧 Alternative: Flexible configuration
  // const basePath = process.env.NODE_ENV === 'production' ? '' : '';
  // return `${basePath}${normalizedSrc}`;
  
  // 📝 Note: If you switch back to project pages, uncomment this:
  // const basePath = process.env.NODE_ENV === 'production' ? '/your-repo-name' : '';
  // return `${basePath}${normalizedSrc}`;
}
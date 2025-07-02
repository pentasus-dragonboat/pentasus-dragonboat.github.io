// lib/theme/layout.ts - Layout and profile-specific utilities
/**
 * Generate responsive grid classes for profile layouts with consistent alignment
 */
export function getProfileGridClasses(
  memberCount: number,
  maxDisplayCount: number = 6
): string {
  const displayCount = Math.min(memberCount, maxDisplayCount);
  
  if (displayCount === 0) return "hidden";
  
  if (displayCount === 1) {
    return "flex justify-center";
  } else if (displayCount === 2) {
    return "grid grid-cols-2 gap-8 lg:gap-12 justify-center max-w-2xl mx-auto";
  } else if (displayCount === 3) {
    return "grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 justify-center max-w-4xl mx-auto";
  } else if (displayCount === 4) {
    return "grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 justify-center max-w-5xl mx-auto";
  } else if (displayCount <= 6) {
    return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 justify-center max-w-7xl mx-auto";
  } else {
    // More than 6 members - use flexible multi-row grid
    return "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8 max-w-7xl mx-auto";
  }
}

/**
 * Gets consistent profile card container classes with fixed heights
 */
export function getProfileCardClasses(isMinimalist: boolean): {
  container: string;
  imageContainer: string;
  contentContainer: string;
  nameContainer: string;
  roleContainer: string;
  mottoContainer: string;
} {
  const baseImageContainer = "w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100 transform group-hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-2xl";
  const imageContainer = isMinimalist 
    ? `${baseImageContainer} border-2 border-gray-300`
    : `${baseImageContainer} border-4 border-black`;
  
  return {
    container: "text-center group cursor-pointer flex flex-col",
    imageContainer,
    contentContainer: "space-y-3 flex-1 flex flex-col justify-between",
    nameContainer: "h-12 flex items-center justify-center", // Fixed height prevents misalignment
    roleContainer: "flex justify-center h-8 items-center", // Fixed height for role pills
    mottoContainer: "h-12 flex items-start justify-center" // Fixed height for mottos
  };
}

/**
 * Gets consistent name styling for profiles
 */
export function getProfileNameClasses(isMinimalist: boolean): string {
  return isMinimalist 
    ? "text-lg font-medium text-black tracking-wide transform group-hover:scale-105 transition-transform text-center leading-tight"
    : "text-lg font-black text-black tracking-wide transform group-hover:scale-105 transition-transform text-center leading-tight";
}

/**
 * Gets consistent motto styling for profiles
 */
export function getProfileMottoClasses(isMinimalist: boolean): string {
  return isMinimalist
    ? "text-gray-600 font-light text-sm max-w-40 mx-auto leading-relaxed"
    : "text-gray-600 font-semibold text-sm max-w-40 mx-auto leading-relaxed";
}
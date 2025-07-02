// lib/utils/profile.ts - Profile-specific utilities
export interface DiceBearConfig {
  avatar: string;
  avatarBg: string;
  avatarEyes: string;
  // Optional enhanced properties
  hair?: string;
  glasses?: string;
  glassesProbability?: number;
  beard?: string;
  beardProbability?: number;
  clothing?: string;
  clothingColor?: string;
  accessories?: string;
  accessoriesProbability?: number;
  mouth?: string;
  skinColor?: string;
  eyesColor?: string;
}

/**
 * Helper function to check if DiceBear has required minimum data
 */
export function hasDiceBearMinimumData(dicebear?: DiceBearConfig): boolean {
  return !!(
    dicebear &&
    dicebear.avatar &&
    dicebear.avatarBg &&
    dicebear.avatarEyes
  );
}

/**
 * Helper function to get name initials
 */
export function getNameInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
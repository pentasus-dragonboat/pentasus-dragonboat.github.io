// lib/utils/index.ts - Utilities barrel exports
// Image utilities
export { getImagePath } from './image';

// Profile utilities
export {
  hasDiceBearMinimumData,
  getNameInitials
} from './profile';
export type { DiceBearConfig } from './profile';

// Formatting utilities
export {
  mergeClasses,
  formatDate,
  calculateReadingTime,
  truncateText,
  createSlug
} from './formatting';
// lib/theme/index.ts - Theme module barrel exports
// Theme detection
export {
  detectStyleMode,
  getThemeConfig
} from './detection';
export type { ThemeConfig } from './detection';

// Styling utilities
export {
  getSectionBackground,
  getTitleClasses,
  getSubtitleClasses,
  getBodyTextClasses,
  getCardClasses,
  getButtonClasses,
  getRolePillClasses
} from './styles';

// Layout utilities
export {
  getProfileGridClasses,
  getProfileCardClasses,
  getProfileNameClasses,
  getProfileMottoClasses
} from './layout';
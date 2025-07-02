// lib/content/index.ts - Content module barrel exports
// Types
export type {
  NewsItem,
  TeamMember,
  Sponsor,
  University,
  ContactSection,
  HeroConfig,
  SiteConfig,
  NavigationItem,
  SiteData
} from './types';

// Data loaders
export {
  getNewsItems,
  getNewsItemBySlug,
  getAllNewsSlugs,
  getTeamMembers,
  getAdminTeam,
  getSponsors
} from './loaders';

// Site configuration
export { getSiteConfig } from './siteConfig';

// Content processors
export {
  generateSlug,
  calculateReadingTime,
  generateExcerpt,
  processNewsItem,
  processTeamMember
} from './processors';
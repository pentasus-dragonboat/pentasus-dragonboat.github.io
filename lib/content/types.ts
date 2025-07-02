// lib/content/types.ts - All TypeScript interfaces and types
import { type DiceBearConfig } from '@/lib/utils/profile';

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  category: string;
  featured: boolean;
  images: string[];
  slug: string;
  excerpt?: string;
  readingTime?: number;
  author?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  motto: string;
  image?: string;
  dicebear?: DiceBearConfig;
}

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website?: string;
  type?: string;
}

export interface University {
  name: string;
  logo: string;
}

export interface ContactSection {
  title: string;
  icon: string;
  description: string;
  link?: string;
  qrCode?: string;
}

export interface HeroConfig {
  backgroundImage: string;
  fallbackGradient: string;
  logoEnhancement: {
    dropShadow: boolean;
    shadowIntensity: 'light' | 'medium' | 'strong';
    shadowColor: string;
  };
  overlay: {
    enabled: boolean;
    type: 'solid' | 'gradient' | 'none';
    solid: string;
    gradient: string;
  };
  textOptimization: {
    useWhiteText: boolean;
    addTextShadow: boolean;
    enhanceContrast: boolean;
    shadowIntensity: 'light' | 'medium' | 'strong';
  };
  title: string;
  subtitle: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  logoFallback: string;
  favicon: string;
  wechatBlogUrl: string;
  hero: HeroConfig;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface SiteData {
  site: SiteConfig;
  navigation: NavigationItem[];
  universities: University[];
  contact: {
    sections: ContactSection[];
  };
}
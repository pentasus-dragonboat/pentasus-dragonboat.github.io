// lib/content/loaders.ts - Data loading functions
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import type { NewsItem, TeamMember, Sponsor, SiteData } from './types';
import { processNewsItem, processTeamMember } from './processors';
import { getImagePath } from '@/lib/utils/image';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Enhanced news items loading with better metadata
 */
export function getNewsItems(): NewsItem[] {
  const newsDirectory = path.join(contentDirectory, 'news');
  
  if (!fs.existsSync(newsDirectory)) {
    console.warn('News directory not found, returning empty array');
    return [];
  }
  
  try {
    const fileNames = fs.readdirSync(newsDirectory);
    
    const news = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        try {
          const fullPath = path.join(newsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          // Enhanced metadata processing
          const processedImages = (data.images || data.placeholders || [])
            .map((img: string) => getImagePath(img));
          
          return processNewsItem(fileName, data, content, processedImages);
        } catch (error) {
          console.error(`Error processing news file ${fileName}:`, error);
          return null;
        }
      })
      .filter((item): item is NewsItem => item !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return news;
  } catch (error) {
    console.error('Error loading news items:', error);
    return [];
  }
}

/**
 * Get individual news item by slug
 */
export function getNewsItemBySlug(slug: string): NewsItem | null {
  const allNews = getNewsItems();
  return allNews.find(item => item.slug === slug) || null;
}

/**
 * Get all news slugs for static generation
 */
export function getAllNewsSlugs(): string[] {
  const allNews = getNewsItems();
  return allNews.map(item => item.slug);
}

/**
 * Load team members from YAML
 */
export function getTeamMembers(): TeamMember[] {
  const filePath = path.join(contentDirectory, 'team.yml');
  
  if (!fs.existsSync(filePath)) {
    console.warn('Team file not found, returning empty array');
    return [];
  }
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents) as any[];
    return data.map(processTeamMember);
  } catch (error) {
    console.error('Error loading team members:', error);
    return [];
  }
}

/**
 * Load admin team from YAML
 */
export function getAdminTeam(): TeamMember[] {
  const filePath = path.join(contentDirectory, 'admin.yml');
  
  if (!fs.existsSync(filePath)) {
    console.warn('Admin file not found, returning empty array');
    return [];
  }
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents) as any[];
    return data.map(processTeamMember);
  } catch (error) {
    console.error('Error loading admin team:', error);
    return [];
  }
}

/**
 * Load sponsors from YAML
 */
export function getSponsors(): Sponsor[] {
  const filePath = path.join(contentDirectory, 'sponsors.yml');
  
  if (!fs.existsSync(filePath)) {
    console.warn('Sponsors file not found, returning empty array');
    return [];
  }
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents) as Sponsor[];
    
    return data.map(sponsor => ({
      ...sponsor,
      logo: getImagePath(sponsor.logo)
    }));
  } catch (error) {
    console.error('Error loading sponsors:', error);
    return [];
  }
}
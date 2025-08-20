// lib/content/processors.ts - Content processing utilities
import type { NewsItem } from './types';

/**
 * Enhanced slug generation for consistent URL structure
 */
export function generateSlug(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Calculate reading time based on content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate excerpt from content - Much longer and more meaningful
 */
export function generateExcerpt(content: string, maxLength: number = 400): string {
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 15);
  
  // Get first 3-4 sentences for a substantial excerpt
  let excerpt = sentences.slice(0, 4).join('. ').trim();
  
  // If too short, try to get more content
  if (excerpt.length < 200 && sentences.length > 4) {
    excerpt = sentences.slice(0, 5).join('. ').trim();
  }
  
  // Ensure it's substantial but not too long
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength).trim();
    const lastPeriod = excerpt.lastIndexOf('.');
    if (lastPeriod > 200) {
      excerpt = excerpt.substring(0, lastPeriod);
    }
    excerpt += '...';
  } else if (excerpt && !excerpt.match(/[.!?]$/)) {
    excerpt += '.';
  }
  
  return excerpt || plainText.substring(0, 300) + '...';
}

/**
 * Process raw news item data into enhanced NewsItem
 */
export function processNewsItem(
  fileName: string, 
  data: any, 
  content: string,
  processedImages: string[]
): NewsItem {
  const slug = generateSlug(fileName);
  const excerpt = data.excerpt || generateExcerpt(content);
  const readingTime = calculateReadingTime(content);
  
  const newsItem: NewsItem = {
    id: slug,
    slug,
    content,
    date: data.date || new Date().toISOString(),
    title: data.title || 'Untitled Article',
    category: data.category || 'News',
    featured: data.featured || false,
    images: processedImages.length > 0 ? processedImages : ['/images/news/placeholder.jpg'],
    excerpt,
    readingTime,
  };

  // Only add author if it exists (avoid undefined serialization issues)
  if (data.author) {
    newsItem.author = data.author;
  }

  // FIXED: Only add video field if it exists
  if (data.video) {
    newsItem.video = `/video/${data.video}`;
    newsItem.heroMedia = data.heroMedia || 'video';
  } else if (data.heroMedia) {
    newsItem.heroMedia = data.heroMedia;
  }

  // Add carousel configuration if present
  if (data.carousel) {
    newsItem.carousel = {
      autoPlay: data.carousel.autoPlay !== false,
      imageDuration: data.carousel.imageDuration || 5,
      pauseOnHover: data.carousel.pauseOnHover !== false
    };
  }

  return newsItem;
}

/**
 * Process team member data with proper type safety
 */
export function processTeamMember(member: any): any {
  const result: any = {
    id: member.id,
    name: member.name,
    role: member.role,
    motto: member.motto || "",
  };
  
  // Only add image if it exists and is not empty
  if (member.image && member.image.trim() !== '') {
    result.image = member.image;
  }
  
  // Only add dicebear if it exists
  if (member.dicebear) {
    result.dicebear = member.dicebear;
  }
  
  return result;
}
// components/NewsSection.tsx - Enhanced with Multiple Images & Gallery Support
import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import ImageModal from './ImageModal';
import type { NewsItem } from '@/lib/content/types';

import { 
  getSectionBackground, 
  getTitleClasses, 
  getSubtitleClasses,
  getCardClasses,
  getBodyTextClasses
} from '@/lib/theme/styles';

import { mergeClasses } from '@/lib/utils/formatting';

interface NewsSectionProps {
  news: NewsItem[];
  isMinimalist?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, isMinimalist = false }) => {
  // Image modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    images: [] as string[],
    currentIndex: 0,
    articleTitle: ''
  });

  // Get consistent styling classes
  const sectionBg = getSectionBackground(isMinimalist, 'tertiary');
  const titleClasses = getTitleClasses(isMinimalist, 'large');
  const subtitleClasses = getSubtitleClasses(isMinimalist);
  const bodyTextClasses = getBodyTextClasses(isMinimalist);

  // Calculate reading time (rough estimate)
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Enhanced category pill styling with better variety
  const getCategoryPillClasses = (index: number = 0) => {
    const colors = ['red', 'blue', 'green', 'purple', 'orange', 'teal'];
    const color = colors[index % colors.length];
    
    const baseClasses = "inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full transition-all";
    
    if (isMinimalist) {
      const colorClasses = {
        red: "bg-red-50 text-red-700 border border-red-200",
        blue: "bg-blue-50 text-blue-700 border border-blue-200",
        green: "bg-green-50 text-green-700 border border-green-200",
        purple: "bg-purple-50 text-purple-700 border border-purple-200",
        orange: "bg-orange-50 text-orange-700 border border-orange-200",
        teal: "bg-teal-50 text-teal-700 border border-teal-200"
      };
      return `${baseClasses} ${colorClasses[color as keyof typeof colorClasses]}`;
    }
    
    // Cartoon mode
    const colorClasses = {
      red: "bg-red-500 text-white border-2 border-black shadow-md",
      blue: "bg-blue-500 text-white border-2 border-black shadow-md", 
      green: "bg-green-500 text-white border-2 border-black shadow-md",
      purple: "bg-purple-500 text-white border-2 border-black shadow-md",
      orange: "bg-orange-500 text-white border-2 border-black shadow-md",
      teal: "bg-teal-500 text-white border-2 border-black shadow-md"
    };
    return `${baseClasses} ${colorClasses[color as keyof typeof colorClasses]} font-bold`;
  };

  // Enhanced metadata styling
  const getMetadataClasses = () => {
    const baseClasses = "flex flex-wrap items-center gap-4 text-xs";
    
    if (isMinimalist) {
      return mergeClasses(baseClasses, "text-gray-500 font-light");
    }
    return mergeClasses(baseClasses, "text-gray-600 font-medium");
  };

  // Enhanced card styling with better hover animations
  const getEnhancedCardClasses = (variant: 'featured' | 'secondary' = 'secondary') => {
    const baseCard = getCardClasses(isMinimalist, variant === 'featured' ? 'featured' : 'default');
    
    if (isMinimalist) {
      return mergeClasses(
        baseCard,
        "group cursor-pointer transition-all duration-500",
        "hover:shadow-lg hover:transform hover:-translate-y-1"
      );
    }
    
    // Cartoon mode
    return mergeClasses(
      baseCard,
      "group cursor-pointer transition-all duration-500",
      "hover:shadow-2xl hover:transform hover:scale-105 hover:rotate-1"
    );
  };

  // Article title styling for cards
  const getArticleTitleClasses = (variant: 'featured' | 'secondary' = 'secondary') => {
    const baseClasses = "transition-all duration-500 leading-tight";
    
    if (isMinimalist) {
      const variants = {
        featured: `${baseClasses} text-3xl md:text-4xl font-light text-black mb-4`,
        secondary: `${baseClasses} text-xl font-light text-black mb-3`
      };
      return variants[variant];
    }
    
    // Cartoon mode
    const variants = {
      featured: `${baseClasses} text-3xl md:text-4xl font-bold text-black mb-4 border-b-2 border-transparent group-hover:border-black`,
      secondary: `${baseClasses} text-xl font-bold text-black mb-3 border-b border-transparent group-hover:border-black`
    };
    return variants[variant];
  };

  // Enhanced excerpt styling
  const getExcerptClasses = () => {
    const baseClasses = "leading-relaxed mb-6 line-clamp-4";
    
    if (isMinimalist) {
      return mergeClasses(baseClasses, "text-gray-600 font-light text-base");
    }
    return mergeClasses(baseClasses, "text-gray-700 font-medium text-base");
  };

  // Read more link styling
  const getReadMoreClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-sm tracking-wide uppercase transition-all duration-300";
    
    if (isMinimalist) {
      return mergeClasses(
        baseClasses,
        "text-gray-700 font-light hover:text-black border-b border-transparent hover:border-black"
      );
    }
    return mergeClasses(
      baseClasses,
      "text-gray-800 font-bold hover:text-black border-b-2 border-transparent hover:border-black"
    );
  };

  // Enhanced article summary extraction
  const getArticleSummary = (content: string): string => {
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 15);
    
    let summary = sentences.slice(0, 4).join('. ').trim();
    
    if (summary.length < 200 && sentences.length > 4) {
      summary = sentences.slice(0, 5).join('. ').trim();
    }
    
    if (summary.length > 400) {
      summary = summary.substring(0, 400).trim();
      const lastPeriod = summary.lastIndexOf('.');
      if (lastPeriod > 200) {
        summary = summary.substring(0, lastPeriod);
      }
      summary += '...';
    } else if (summary && !summary.match(/[.!?]$/)) {
      summary += '.';
    }
    
    return summary || plainText.substring(0, 300) + '...';
  };

  // Open image modal
  const openImageModal = (images: string[], startIndex: number, articleTitle: string) => {
    setModalState({
      isOpen: true,
      images,
      currentIndex: startIndex,
      articleTitle
    });
  };

  // Close image modal
  const closeImageModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  // Navigate in modal
  const navigateModal = (index: number) => {
    setModalState(prev => ({ ...prev, currentIndex: index }));
  };

  // Enhanced image gallery component for news cards
  const NewsImageGallery: React.FC<{
    images: string[];
    title: string;
    variant: 'featured' | 'secondary';
  }> = ({ images, title, variant }) => {
    const displayImages = images.slice(0, 3); // Show up to 3 images
    
    if (displayImages.length === 0) return null;

    const getGalleryContainerClasses = () => {
      const baseClasses = "overflow-hidden rounded-lg";
      
      if (isMinimalist) {
        const variants = {
          featured: `${baseClasses} border border-gray-200 h-80 md:h-[400px]`,
          secondary: `${baseClasses} border border-gray-200 h-64`
        };
        return variants[variant];
      }
      
      // Cartoon mode
      const variants = {
        featured: `${baseClasses} border-3 border-black shadow-lg h-80 md:h-[400px]`,
        secondary: `${baseClasses} border-3 border-black shadow-md h-64`
      };
      return variants[variant];
    };

    const getMainImageClasses = () => {
      return "w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500";
    };

    const getAdditionalImageClasses = () => {
      return "w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300";
    };

    if (displayImages.length === 1) {
      // Single image - full width
      return (
        <div className={getGalleryContainerClasses()}>
          <img
            src={displayImages[0]}
            alt={title}
            className={getMainImageClasses()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openImageModal(images, 0, title);
            }}
          />
        </div>
      );
    }

    if (displayImages.length === 2) {
      // Two images - side by side
      return (
        <div className={getGalleryContainerClasses()}>
          <div className="grid grid-cols-2 gap-1 h-full">
            {displayImages.map((image, index) => (
              <div key={index} className="overflow-hidden">
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className={getAdditionalImageClasses()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openImageModal(images, index, title);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Three or more images - main image with thumbnails
    return (
      <div className={getGalleryContainerClasses()}>
        <div className="grid grid-cols-3 gap-1 h-full">
          {/* Main image - takes 2 columns */}
          <div className="col-span-2 overflow-hidden">
            <img
              src={displayImages[0]}
              alt={title}
              className={getMainImageClasses()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openImageModal(images, 0, title);
              }}
            />
          </div>
          
          {/* Additional images - stacked vertically */}
          <div className="flex flex-col gap-1">
            {displayImages.slice(1, 3).map((image, index) => (
              <div key={index + 1} className="flex-1 overflow-hidden relative">
                <img
                  src={image}
                  alt={`${title} - Image ${index + 2}`}
                  className={getAdditionalImageClasses()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openImageModal(images, index + 1, title);
                  }}
                />
                {/* Show "+X more" overlay if there are more than 3 images */}
                {index === 1 && images.length > 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                       onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                         openImageModal(images, index + 1, title);
                       }}>
                    <span className="text-white font-bold text-sm">
                      +{images.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (news.length === 0) {
    return (
      <section id="news" className={`py-32 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <h2 className={titleClasses}>Latest News</h2>
            <p className={subtitleClasses}>
              Stay tuned for updates on our journey and achievements.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="news" className={`py-32 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-24 relative">
            {/* Decorative shapes for cartoon mode */}
            {!isMinimalist && (
              <>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-20 blur-xl animate-pulse hidden lg:block"></div>
                <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-yellow-300 rounded-full opacity-25 blur-lg animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>
              </>
            )}
            
            <h2 className={titleClasses}>Latest News</h2>
            <p className={subtitleClasses}>
              For the excellence, achievements and the pursuit of perfection.
            </p>
          </div>
          
          <div className="space-y-24">
            {/* Featured article with enhanced gallery */}
            {news[0] && (
              <Link href={`/news/${news[0].slug}`} className="block">
                <article className={mergeClasses(getEnhancedCardClasses('featured'), "p-8 md:p-12")}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div>
                      {/* Enhanced metadata section */}
                      <div className="mb-6">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className={getCategoryPillClasses(0)}>
                            <Tag className="w-3 h-3" strokeWidth={2} />
                            <span>{news[0].category}</span>
                          </div>
                          <div className={getMetadataClasses()}>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" strokeWidth={1.5} />
                              <span>{new Date(news[0].date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" strokeWidth={1.5} />
                              <span>{getReadingTime(news[0].content)} min read</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced title */}
                      <h3 className={getArticleTitleClasses('featured')}>
                        {news[0].title}
                      </h3>
                      
                      {/* Enhanced excerpt */}
                      <div className={getExcerptClasses()}>
                        {getArticleSummary(news[0].content)}
                      </div>
                      
                      {/* Enhanced read more link */}
                      <div className={getReadMoreClasses()}>
                        <span>Read Full Story</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Enhanced image gallery */}
                    <NewsImageGallery
                      images={news[0].images}
                      title={news[0].title}
                      variant="featured"
                    />
                  </div>
                </article>
              </Link>
            )}

            {/* Secondary articles with enhanced galleries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {news.slice(1).map((article, index) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="block">
                  <article className={mergeClasses(getEnhancedCardClasses('secondary'), "p-6 md:p-8")}>
                    {/* Enhanced image gallery */}
                    <div className="mb-6">
                      <NewsImageGallery
                        images={article.images}
                        title={article.title}
                        variant="secondary"
                      />
                    </div>
                    
                    {/* Enhanced metadata */}
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className={getCategoryPillClasses(index + 1)}>
                          <Tag className="w-3 h-3" strokeWidth={2} />
                          <span>{article.category}</span>
                        </div>
                      </div>
                      <div className={getMetadataClasses()}>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" strokeWidth={1.5} />
                          <span>{new Date(article.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" strokeWidth={1.5} />
                          <span>{getReadingTime(article.content)} min read</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced title */}
                    <h3 className={getArticleTitleClasses('secondary')}>
                      {article.title}
                    </h3>
                    
                    {/* Enhanced excerpt */}
                    <div className={mergeClasses(getExcerptClasses(), "mb-4")}>
                      {getArticleSummary(article.content)}
                    </div>
                    
                    {/* Enhanced read more link */}
                    <div className={getReadMoreClasses()}>
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Development Debug Info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 text-center text-xs text-gray-500">
              Theme: {isMinimalist ? 'Minimalist' : 'Cartoon'} | Enhanced Multi-Image Display | {news.length} articles
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        images={modalState.images}
        currentIndex={modalState.currentIndex}
        isOpen={modalState.isOpen}
        onClose={closeImageModal}
        onNavigate={navigateModal}
        alt={modalState.articleTitle}
      />
    </>
  );
};

export default NewsSection;
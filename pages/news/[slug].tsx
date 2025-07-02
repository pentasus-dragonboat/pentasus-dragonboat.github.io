// pages/news/[slug].tsx - Enhanced with Gallery Above Content & Modal Support
import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import ImageModal from '@/components/sections/ImageModal';
import { getNewsItems } from '@/lib/content/loaders';
import { getSiteConfig } from '@/lib/content/siteConfig';
import { markdownToHtml } from '@/lib/markdown';
import { getThemeConfig } from '@/lib/theme/detection';
import { mergeClasses } from '@/lib/utils/formatting';
import type { NewsItem, SiteData } from '@/lib/content/types';

interface BlogPostProps {
  post: NewsItem;
  siteData: SiteData;
}

export default function BlogPost({ post, siteData }: BlogPostProps) {
  const { site } = siteData;
  
  // Get unified theme configuration
  const themeConfig = getThemeConfig(site.hero.backgroundImage);
  const { isMinimalist } = themeConfig;

  // Image modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    currentIndex: 0
  });

  // Calculate reading time (rough estimate)
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Open image modal
  const openImageModal = (startIndex: number) => {
    setModalState({
      isOpen: true,
      currentIndex: startIndex
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

  // Enhanced gallery component
  const ArticleGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
    if (images.length === 0) return null;

    const getGalleryGridClasses = () => {
      if (images.length === 1) {
        return "grid grid-cols-1";
      } else if (images.length === 2) {
        return "grid grid-cols-1 md:grid-cols-2 gap-4";
      } else if (images.length === 3) {
        return "grid grid-cols-1 md:grid-cols-3 gap-4";
      } else if (images.length === 4) {
        return "grid grid-cols-2 md:grid-cols-2 gap-4";
      } else {
        // 5+ images: Featured + grid layout
        return "space-y-4";
      }
    };

    const getImageContainerClasses = (isMain: boolean = false) => {
      const baseClasses = "relative overflow-hidden cursor-pointer group";
      const aspectClasses = isMain ? "aspect-video" : "aspect-video";
      
      if (isMinimalist) {
        return mergeClasses(
          baseClasses,
          aspectClasses,
          "rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300"
        );
      }
      
      // Cartoon mode
      return mergeClasses(
        baseClasses,
        aspectClasses,
        "rounded-lg border-2 border-black hover:border-gray-700 transition-all duration-300"
      );
    };

    const getImageClasses = () => {
      return "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500";
    };

    if (images.length <= 4) {
      // Simple grid for 1-4 images
      return (
        <div className={getGalleryGridClasses()}>
          {images.map((image, index) => (
            <div
              key={index}
              className={getImageContainerClasses()}
              onClick={() => openImageModal(index)}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 1}`}
                fill
                className={getImageClasses()}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      );
    }

    // 5+ images: Featured image + grid layout
    return (
      <div className="space-y-4">
        {/* Featured image */}
        <div
          className={getImageContainerClasses(true)}
          onClick={() => openImageModal(0)}
        >
          <Image
            src={images[0]}
            alt={`${title} - Featured`}
            fill
            className={getImageClasses()}
            sizes="100vw"
          />
        </div>
        
        {/* Grid of remaining images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(1, 9).map((image, index) => (
            <div
              key={index + 1}
              className={mergeClasses(getImageContainerClasses(), "relative")}
              onClick={() => openImageModal(index + 1)}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 2}`}
                fill
                className={getImageClasses()}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Show "+X more" overlay if there are more than 9 total images */}
              {index === 7 && images.length > 9 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    +{images.length - 9} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Content styling for article body
  const getContentClasses = () => {
    if (isMinimalist) {
      return mergeClasses(
        "text-gray-700 font-light leading-relaxed text-lg max-w-none",
        "[&>p]:mb-6 [&>p]:text-gray-700 [&>p]:font-light [&>p]:leading-loose [&>p]:text-lg",
        "[&>h1]:text-4xl [&>h1]:font-thin [&>h1]:text-black [&>h1]:mb-8 [&>h1]:mt-12 [&>h1]:tracking-tight",
        "[&>h2]:text-3xl [&>h2]:font-thin [&>h2]:text-black [&>h2]:mb-6 [&>h2]:mt-10 [&>h2]:tracking-tight",
        "[&>h3]:text-2xl [&>h3]:font-light [&>h3]:text-black [&>h3]:mb-4 [&>h3]:mt-8 [&>h3]:tracking-tight",
        "[&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-6",
        "[&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-6", 
        "[&>li]:mb-2 [&>li]:text-gray-700 [&>li]:font-light",
        "[&>blockquote]:border-l-2 [&>blockquote]:border-gray-300 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:font-light [&>blockquote]:text-xl [&>blockquote]:mb-6",
        "[&>strong]:font-medium [&>strong]:text-black",
        "[&>a]:text-black [&>a]:underline [&>a]:decoration-1 hover:[&>a]:decoration-2"
      );
    }
    
    // Cartoon mode
    return mergeClasses(
      "text-gray-700 font-medium leading-relaxed text-lg max-w-none",
      "[&>p]:mb-6 [&>p]:text-gray-700 [&>p]:font-medium [&>p]:leading-loose [&>p]:text-lg",
      "[&>h1]:text-4xl [&>h1]:font-black [&>h1]:text-black [&>h1]:mb-8 [&>h1]:mt-12 [&>h1]:tracking-tight",
      "[&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-black [&>h2]:mb-6 [&>h2]:mt-10 [&>h2]:tracking-tight",
      "[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-black [&>h3]:mb-4 [&>h3]:mt-8 [&>h3]:tracking-tight",
      "[&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-6",
      "[&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-6",
      "[&>li]:mb-2 [&>li]:text-gray-700 [&>li]:font-medium",
      "[&>blockquote]:border-l-4 [&>blockquote]:border-pink-400 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:font-medium [&>blockquote]:text-xl [&>blockquote]:mb-6",
      "[&>strong]:font-bold [&>strong]:text-black",
      "[&>a]:text-black [&>a]:underline [&>a]:decoration-2 hover:[&>a]:decoration-4"
    );
  };

  return (
    <>
      <Head>
        <title>{post.title} - {site.name}</title>
        <meta name="description" content={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={site.favicon} />
        
        {/* Enhanced Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta property="og:image" content={post.images[0]} />
        <meta property="og:url" content={`https://pentasus.dragonboat.team/news/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta name="twitter:image" content={post.images[0]} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <Navigation siteData={siteData} />

        {/* Cinematic Hero Section - Cover Image Only */}
        <section className="relative mt-24 mb-16">
          <div className="relative w-full">
            {/* Cinematic Header Image */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[600px] overflow-hidden">
              <Image
                src={post.images[0]}
                alt={post.title}
                fill
                className="object-cover"
                priority
                quality={95}
                sizes="100vw"
              />
              
              {/* Enhanced overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Article metadata overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 text-white">
                <div className="max-w-7xl mx-auto">
                  {/* Back navigation */}
                  <div className="mb-8">
                    <Link 
                      href="/#news" 
                      className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-light text-sm tracking-wide"
                    >
                      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                      <span>Back to News</span>
                    </Link>
                  </div>
                  
                  {/* Article metadata */}
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-white/80 text-sm font-light">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" strokeWidth={1.5} />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" strokeWidth={1.5} />
                          <span>{getReadingTime(post.content)} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Article title */}
                  <h1 className={mergeClasses(
                    "text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-6",
                    isMinimalist ? "font-light" : "font-bold"
                  )} style={{ 
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.3)' 
                  }}>
                    {post.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content Section */}
        <section className="pb-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            
            {/* Enhanced Gallery Section - Above Content, Includes Cover Image */}
            {post.images.length > 0 && (
              <div className="mb-16">
                <h2 className={mergeClasses(
                  "text-3xl mb-8 tracking-tight",
                  isMinimalist ? "font-thin text-black" : "font-bold text-black"
                )}>
                  Gallery
                  {post.images.length > 1 && (
                    <span className="text-lg ml-2 text-gray-500">
                      ({post.images.length} {post.images.length === 1 ? 'image' : 'images'})
                    </span>
                  )}
                </h2>
                
                <ArticleGallery 
                  images={post.images} 
                  title={post.title} 
                />
              </div>
            )}

            {/* Article body with magazine-style typography */}
            <div 
              className={getContentClasses()}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Navigation Footer */}
            <div className="mt-24 pt-16 border-t border-gray-200 text-center">
              <Link 
                href="/#news"
                className={mergeClasses(
                  "inline-flex items-center gap-3 transition-all duration-300 text-base tracking-wide",
                  isMinimalist 
                    ? "text-gray-700 hover:text-black font-light border-b border-transparent hover:border-gray-400"
                    : "text-gray-800 hover:text-black font-medium border-b-2 border-transparent hover:border-black"
                )}
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                <span>Back to All News</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer siteData={siteData} />
      </div>

      {/* Image Modal */}
      <ImageModal
        images={post.images}
        currentIndex={modalState.currentIndex}
        isOpen={modalState.isOpen}
        onClose={closeImageModal}
        onNavigate={navigateModal}
        alt={post.title}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const newsItems = getNewsItems();
  
  const paths = newsItems.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const newsItems = getNewsItems();
  const siteData = getSiteConfig();
  
  const post = newsItems.find((item) => item.slug === slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }

  // Process markdown content
  const postWithHtml = {
    ...post,
    content: await markdownToHtml(post.content),
  };

  return {
    props: {
      post: postWithHtml,
      siteData,
    },
  };
};
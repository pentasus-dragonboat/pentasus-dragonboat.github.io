// pages/news/[slug].tsx - With Carousel Hero and Proper Content Ordering
import React, { useState, useRef, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Tag, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
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
  const themeConfig = getThemeConfig(site.hero.backgroundImage);
  const { isMinimalist } = themeConfig;

  // Carousel state
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(post.carousel?.autoPlay !== false);
  const carouselVideoRef = useRef<HTMLVideoElement>(null);
  const imageTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get carousel settings with defaults
  const carouselSettings = {
    autoPlay: post.carousel?.autoPlay !== false,
    imageDuration: (post.carousel?.imageDuration || 5) * 1000, // Convert to milliseconds
    pauseOnHover: post.carousel?.pauseOnHover !== false
  };

  // Standalone video player state (when shown separately)
  const standaloneVideoRef = useRef<HTMLVideoElement>(null);
  const [standaloneIsPlaying, setStandaloneIsPlaying] = useState(false);
  const [standaloneIsMuted, setStandaloneIsMuted] = useState(true);

  // Image modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    currentIndex: 0
  });

  // Combine all media for carousel (video + images)
  const allMedia: Array<{ type: 'video' | 'image'; src: string }> = [];
  if (post.video) {
    allMedia.push({ type: 'video', src: post.video });
  }
  post.images.forEach(img => {
    allMedia.push({ type: 'image', src: img });
  });

  // Calculate reading time
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isCarouselPlaying || allMedia.length <= 1) return;

    const currentMedia = allMedia[currentMediaIndex];
    
    if (currentMedia.type === 'image') {
      // Auto-advance using configured duration
      imageTimerRef.current = setTimeout(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
      }, carouselSettings.imageDuration);
    }
    // For videos, we'll handle advancement when video ends

    return () => {
      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }
    };
  }, [currentMediaIndex, isCarouselPlaying, allMedia.length, carouselSettings.imageDuration]);

  // Handle video end in carousel
  const handleCarouselVideoEnd = () => {
    if (isCarouselPlaying) {
      setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
    }
  };

  // Carousel dot navigation
  const goToMedia = (index: number) => {
    setCurrentMediaIndex(index);
    setIsCarouselPlaying(false); // Stop auto-play when user manually navigates
  };

  // Standalone video controls
  const toggleStandalonePlayPause = () => {
    if (standaloneVideoRef.current) {
      if (standaloneIsPlaying) {
        standaloneVideoRef.current.pause();
      } else {
        standaloneVideoRef.current.play();
      }
      setStandaloneIsPlaying(!standaloneIsPlaying);
    }
  };

  const toggleStandaloneMute = () => {
    if (standaloneVideoRef.current) {
      standaloneVideoRef.current.muted = !standaloneIsMuted;
      setStandaloneIsMuted(!standaloneIsMuted);
    }
  };

  const toggleStandaloneFullscreen = () => {
    if (standaloneVideoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        standaloneVideoRef.current.requestFullscreen();
      }
    }
  };

  // Image modal functions
  const openImageModal = (startIndex: number) => {
    setModalState({ isOpen: true, currentIndex: startIndex });
  };

  const closeImageModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const navigateModal = (index: number) => {
    setModalState(prev => ({ ...prev, currentIndex: index }));
  };

  // Determine what to show where
  const hasVideo = !!(post.video && post.video.trim() !== '');
  const hasImages = post.images.length > 0;
  const showVideoAsFirstHero = hasVideo && post.heroMedia === 'video';

  // Gallery component for images only
  const ArticleGallery: React.FC = () => {
    if (!hasImages) return null;

    const getGalleryGridClasses = () => {
      if (post.images.length === 1) return "grid grid-cols-1";
      else if (post.images.length === 2) return "grid grid-cols-1 md:grid-cols-2 gap-4";
      else if (post.images.length === 3) return "grid grid-cols-1 md:grid-cols-3 gap-4";
      else if (post.images.length === 4) return "grid grid-cols-2 md:grid-cols-2 gap-4";
      else return "grid grid-cols-2 md:grid-cols-3 gap-4";
    };

    return (
      <div className="mt-16">
        <h2 className={mergeClasses(
          "text-3xl mb-8 tracking-tight",
          isMinimalist ? "font-thin text-black" : "font-bold text-black"
        )}>
          Gallery
        </h2>
        
        <div className={getGalleryGridClasses()}>
          {post.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => openImageModal(index)}
            >
              <Image
                src={image}
                alt={`${post.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Standalone Video Player (shown below hero when image is first)
  const StandaloneVideoPlayer = () => {
    if (!hasVideo || !post.video || showVideoAsFirstHero) return null;

    return (
      <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-16">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={standaloneVideoRef}
            src={post.video}
            className="w-full h-full object-cover"
            onClick={toggleStandalonePlayPause}
            playsInline
            preload="metadata"
            muted={standaloneIsMuted}
          />
          
          {/* Simple video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleStandalonePlayPause}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {standaloneIsPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                
                <button
                  onClick={toggleStandaloneMute}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {standaloneIsMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
              
              <button
                onClick={toggleStandaloneFullscreen}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getContentClasses = () => {
    if (isMinimalist) {
      return mergeClasses(
        "text-gray-700 font-light leading-relaxed text-lg max-w-none",
        "[&>p]:mb-6 [&>p]:text-gray-700 [&>p]:font-light [&>p]:leading-loose [&>p]:text-lg",
        "[&>h1]:text-4xl [&>h1]:font-thin [&>h1]:text-black [&>h1]:mb-8 [&>h1]:mt-12",
        "[&>h2]:text-3xl [&>h2]:font-thin [&>h2]:text-black [&>h2]:mb-6 [&>h2]:mt-10",
        "[&>h3]:text-2xl [&>h3]:font-light [&>h3]:text-black [&>h3]:mb-4 [&>h3]:mt-8",
        "[&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-6",
        "[&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-6",
        "[&>li]:mb-2 [&>li]:text-gray-700",
        "[&>blockquote]:border-l-2 [&>blockquote]:border-gray-300 [&>blockquote]:pl-6 [&>blockquote]:italic"
      );
    }
    
    return mergeClasses(
      "text-gray-700 font-medium leading-relaxed text-lg max-w-none",
      "[&>p]:mb-6 [&>p]:text-gray-700 [&>p]:font-medium [&>p]:leading-loose [&>p]:text-lg",
      "[&>h1]:text-4xl [&>h1]:font-black [&>h1]:text-black [&>h1]:mb-8 [&>h1]:mt-12",
      "[&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-black [&>h2]:mb-6 [&>h2]:mt-10",
      "[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-black [&>h3]:mb-4 [&>h3]:mt-8",
      "[&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-6",
      "[&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-6",
      "[&>li]:mb-2 [&>li]:text-gray-700",
      "[&>blockquote]:border-l-4 [&>blockquote]:border-pink-400 [&>blockquote]:pl-6 [&>blockquote]:italic"
    );
  };

  return (
    <>
      <Head>
        <title>{post.title} - {site.name}</title>
        <meta name="description" content={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={site.favicon} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navigation siteData={siteData} />

        {/* CAROUSEL HERO SECTION */}
        <section className="relative mt-24 mb-16">
          <div className="relative w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw]">
            <div 
              className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] max-h-[800px] bg-black"
              onMouseEnter={() => carouselSettings.pauseOnHover && setIsCarouselPlaying(false)}
              onMouseLeave={() => carouselSettings.pauseOnHover && carouselSettings.autoPlay && setIsCarouselPlaying(true)}
            >
              
              {/* Current Media Display with fade transition */}
              <div className="absolute inset-0">
                {allMedia[currentMediaIndex]?.type === 'video' ? (
                  <video
                    ref={carouselVideoRef}
                    key={`video-${currentMediaIndex}`}
                    src={allMedia[currentMediaIndex].src}
                    className="w-full h-full object-cover animate-fadeIn"
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleCarouselVideoEnd}
                  />
                ) : (
                  <Image
                    key={`image-${currentMediaIndex}`}
                    src={allMedia[currentMediaIndex]?.src || ''}
                    alt={post.title}
                    fill
                    className="object-cover animate-fadeIn"
                    priority
                    quality={95}
                    sizes="100vw"
                  />
                )}
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Title and metadata overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 text-white">
                <div className="max-w-7xl mx-auto">
                  <div className="mb-8">
                    <Link 
                      href="/#news" 
                      className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-light text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                      <span>Back to News</span>
                    </Link>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-xs font-medium uppercase">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
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
                  
                  <h1 className={mergeClasses(
                    "text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-8",
                    isMinimalist ? "font-light" : "font-bold"
                  )} style={{ 
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' 
                  }}>
                    {post.title}
                  </h1>

                  {/* Carousel dots and controls */}
                  {allMedia.length > 1 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {allMedia.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToMedia(index)}
                            className={mergeClasses(
                              "w-2 h-2 rounded-full transition-all",
                              index === currentMediaIndex 
                                ? "bg-white w-8" 
                                : "bg-white/50 hover:bg-white/70"
                            )}
                            aria-label={`Go to media ${index + 1}`}
                          />
                        ))}
                      </div>
                      
                      {/* Play/Pause button */}
                      <button
                        onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors ml-4"
                        aria-label={isCarouselPlaying ? 'Pause carousel' : 'Play carousel'}
                      >
                        {isCarouselPlaying ? (
                          <Pause className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT ORDERING BASED ON FIRST MEDIA TYPE */}
        
        {/* If first media is IMAGE: Show video right after hero (if exists) */}
        {!showVideoAsFirstHero && <StandaloneVideoPlayer />}

        {/* Article Content */}
        <section className="pb-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div 
              className={getContentClasses()}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* If first media is VIDEO: Show gallery after content */}
            {showVideoAsFirstHero && <ArticleGallery />}
            
            {/* If first media is IMAGE and we want to show gallery separately from carousel */}
            {/* Uncomment next line if you want gallery shown even when images are in carousel */}
            {/* {!showVideoAsFirstHero && hasImages && <ArticleGallery />} */}

            {/* Navigation Footer */}
            <div className="mt-24 pt-16 border-t border-gray-200 text-center">
              <Link 
                href="/#news"
                className={mergeClasses(
                  "inline-flex items-center gap-3 transition-all duration-300 text-base",
                  isMinimalist 
                    ? "text-gray-700 hover:text-black font-light"
                    : "text-gray-800 hover:text-black font-medium"
                )}
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                <span>Back to All News</span>
              </Link>
            </div>
          </div>
        </section>

        <Footer siteData={siteData} />
      </div>

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
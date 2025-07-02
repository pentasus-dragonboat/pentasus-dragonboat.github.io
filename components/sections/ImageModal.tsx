// components/ImageModal.tsx - Full-Screen Image Gallery Modal
import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImagePath } from '@/lib/utils/image';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  alt?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  alt = "Gallery image"
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  // Navigation functions
  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
    setIsLoading(true);
  };

  const goToNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
    setIsLoading(true);
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !images[currentIndex]) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-all group"
        aria-label="Close gallery"
      >
        <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" strokeWidth={1.5} />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-all group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          </button>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 transition-all group"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Main image - 50% of screen size, responsive */}
      <div className="relative w-[90vw] h-[60vh] md:w-[50vw] md:h-[50vh] flex items-center justify-center">
        <img
          src={getImagePath(images[currentIndex])}
          alt={`${alt} ${currentIndex + 1}`}
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 rounded-lg shadow-2xl ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={() => setIsLoading(false)}
        />
      </div>

      {/* Image counter - adjusted positioning */}
      {images.length > 1 && (
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Thumbnail strip for quick navigation - adjusted positioning */}
      {images.length > 1 && images.length <= 10 && (
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg p-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                onNavigate(index);
                setIsLoading(true);
              }}
              className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-white scale-110' 
                  : 'border-white/30 hover:border-white/60 hover:scale-105'
              }`}
            >
              <img
                src={getImagePath(image)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Touch/swipe hint for mobile - repositioned */}
      <div className="absolute top-20 right-4 text-white/60 text-xs font-light hidden md:block">
        Use arrow keys or click buttons to navigate
      </div>
    </div>
  );
};

export default ImageModal;
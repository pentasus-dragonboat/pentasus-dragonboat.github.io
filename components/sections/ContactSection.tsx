// components/ContactSection.tsx - Polished Ultra-Minimalist Design
import React from 'react';
import { MapPin, ExternalLink, BookOpen, MessageCircle } from 'lucide-react';
import type { ContactSection as ContactSectionType, SiteConfig } from '@/lib/content/types';
import { getImagePath } from '@/lib/utils/image';
import { 
  mergeClasses
} from '@/lib/utils/formatting';
import { getThemeConfig } from '@/lib/theme/detection';

interface ContactSectionProps {
  contactData: {
    sections: ContactSectionType[];
  };
  siteConfig: SiteConfig;
  isMinimalist?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ 
  contactData, 
  siteConfig, 
  isMinimalist = false 
}) => {
  // Get unified theme configuration
  const themeConfig = getThemeConfig(siteConfig.hero.backgroundImage);
  const actualIsMinimalist = themeConfig.isMinimalist;

  // Enhanced icon mapping with correct icons
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string; strokeWidth?: number }> } = {
      'Heart': BookOpen,           // Book icon for 小红书
      'MessageCircle': MessageCircle,  // Chat icon for WeChat
      'MapPin': MapPin,
    };
    
    const IconComponent = iconMap[iconName] || MapPin;
    return <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />;
  };

  // Title styling aligned with other sections
  const getAlignedTitleClasses = () => {
    return actualIsMinimalist 
      ? "text-6xl font-thin text-white mb-8 tracking-tight"
      : "text-7xl font-light text-white mb-8 tracking-tight";
  };

  // Enhanced subtitle styling with better contrast
  const getAlignedSubtitleClasses = () => {
    const weight = actualIsMinimalist ? "font-light" : "font-bold";
    return `text-2xl text-gray-100 ${weight} max-w-4xl mx-auto leading-relaxed`;
  };

  // Enhanced card container with thin borders
  const getCardClasses = () => {
    const baseClasses = "text-center group cursor-pointer p-8 transition-all duration-500";
    
    if (actualIsMinimalist) {
      return mergeClasses(
        baseClasses,
        "border border-white/15 rounded-lg hover:border-white/30 hover:bg-white/5 hover:backdrop-blur-sm"
      );
    }
    
    // Cartoon mode with slightly thicker borders
    return mergeClasses(
      baseClasses,
      "border-2 border-white/20 rounded-lg hover:border-white/40 hover:bg-white/5"
    );
  };

  // Enhanced icon container with better contrast
  const getIconContainerClasses = () => {
    return "w-16 h-16 mx-auto flex items-center justify-center mb-8 text-white opacity-80 group-hover:opacity-100 transition-all duration-500";
  };

  // Enhanced typography with better contrast
  const getCardTitleClasses = () => {
    return actualIsMinimalist 
      ? "text-xl font-light mb-6 tracking-wide text-white"
      : "text-xl font-semibold mb-6 tracking-wide text-white";
  };

  const getBodyTextClasses = () => {
    const weight = actualIsMinimalist ? "font-light" : "font-medium";
    return `${weight} text-gray-200 leading-relaxed text-md`;
  };

  // Format training location text into multiple lines with better spacing
  const formatTrainingText = (text: string) => {
    if (text.includes('Fort Point Pier')) {
      const parts = text.split(' • ');
      return (
        <div className="space-y-2">
          {parts.map((part, index) => (
            <div key={index} className={mergeClasses(
              "text-md leading-relaxed text-gray-200",
              actualIsMinimalist ? "font-light" : "font-medium"
            )}>
              {part}
            </div>
          ))}
        </div>
      );
    }
    return <p className={getBodyTextClasses()}>{text}</p>;
  };

  // Enhanced QR code container with better contrast
  const getQrContainerClasses = () => {
    return actualIsMinimalist
      ? "w-28 h-28 mx-auto rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20"
      : "w-28 h-28 mx-auto rounded-lg flex items-center justify-center bg-white/10 border-2 border-white/25";
  };

  // Enhanced link styling with better contrast
  const getLinkClasses = () => {
    const weight = actualIsMinimalist ? "font-light" : "font-medium";
    return `inline-flex items-center gap-2 text-white ${weight} opacity-90 hover:opacity-100 transition-opacity duration-300 text-sm`;
  };

  // Enhanced button styling
  const getBeginJourneyButtonClasses = () => {
    const baseClasses = "px-16 py-4 text-white tracking-wider hover:bg-white hover:text-black transition-all duration-500 text-sm uppercase";
    
    return actualIsMinimalist
      ? mergeClasses(baseClasses, "border border-white/40 font-light rounded hover:shadow-xl")
      : mergeClasses(baseClasses, "border-2 border-white/50 font-medium rounded hover:shadow-2xl");
  };

  return (
    <section id="contact" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Aligned header section */}
        <div className="text-center mb-24 relative">
          <h2 className={getAlignedTitleClasses()}>
            Join Us
          </h2>
          <p className={getAlignedSubtitleClasses()}>
            都划到这儿了，还没下决心么？来试训一次吧！
          </p>
        </div>
        
        {/* Enhanced contact grid with borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {contactData.sections.map((section, index) => (
            <div 
              key={section.title}
              className={getCardClasses()}
            >
              {/* Enhanced icon container */}
              <div className={getIconContainerClasses()}>
                {getIcon(section.icon)}
              </div>
              
              {/* Enhanced typography */}
              <h3 className={getCardTitleClasses()}>
                {section.title}
              </h3>
              
              {/* Enhanced description with better formatting */}
              <div className="mb-8">
                {formatTrainingText(section.description)}
              </div>
              
              {/* Enhanced interaction elements */}
              {section.link && (
                <a
                  href={section.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={getLinkClasses()}
                >
                  <span>访问链接</span>
                  <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                </a>
              )}
              
              {section.qrCode && (
                <div className="space-y-4">
                  <div className={getQrContainerClasses()}>
                    <img 
                      src={getImagePath(section.qrCode)} 
                      alt="QR Code"
                      className="w-full h-full object-contain rounded p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="text-white/60">
                            <svg class="w-16 h-16" stroke="currentColor" stroke-width="1.5" fill="none" viewBox="0 0 24 24">
                              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z"/>
                            </svg>
                          </div>
                        `;
                      }} 
                    />
                  </div>
                  <p className={mergeClasses(
                    "text-xs text-gray-300",
                    actualIsMinimalist ? "font-light" : "font-medium"
                  )}>
                    扫码关注
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Enhanced call-to-action */}
        <div className="text-center">
          <a
            href={siteConfig.wechatBlogUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={getBeginJourneyButtonClasses()}
          >
            Begin Your Journey
          </a>
        </div>


        {/* Development Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-center text-xs text-gray-500">
            Theme: {isMinimalist ? 'Minimalist' : 'Cartoon'} | Dark Mode | Contact Section with Enhanced Borders
          </div>
        )}

      </div>
    </section>
  );
};

export default ContactSection;
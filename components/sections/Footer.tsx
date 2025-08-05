// components/Footer.tsx - Updated for Site Configuration
import React from 'react';
import Logo from './Logo';
import type { SiteData } from '@/lib/content/types';



interface FooterProps {
  siteData?: SiteData;
}

const Footer: React.FC<FooterProps> = ({ siteData }) => {
  // Use university data from site configuration or fallback to defaults
  const universities = siteData?.universities || [
    { name: 'Fudan University', logo: '/images/alumni/fudan.webp' },
    { name: 'Tongji University', logo: '/images/alumni/tongji.webp' },
    { name: 'Shanghai University of Finance and Economics', logo: '/images/alumni/caijin.webp' }
  ];

  const siteName = siteData?.site?.name || 'PENTASUS';

  return (
    <footer className="py-20 bg-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-12">
            {/* Logo - Clean display without circular constraints */}
            <Logo 
              size="medium" 
              className="transform hover:scale-110 hover:rotate-1 transition-all duration-300" 
            />
            <span className="text-4xl font-bold tracking-wider text-black">{siteName}</span>
          </div>
          <p className="text-gray-600 font-semibold text-lg mb-12 tracking-wide">Representing excellence across institutions</p>
          
          {/* University Logos */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            {universities.map((university, index) => (
              <div 
                key={university.name} 
                className="group cursor-pointer"
                title={university.name}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-1 border-black transform hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <img 
                    src={university.logo}
                    alt={university.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* University Names */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 font-semibold">
            {universities.map((university, index) => (
              <span key={university.name} className="tracking-wide">
                {university.name}
                {index < universities.length - 1 && <span className="mx-2">•</span>}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-center text-gray-500 font-semibold text-sm tracking-wide">
          <p>© 2025 {siteName} Dragon Boat Team. Made with <span className="text-red-500 animate-pulse">♥</span> by Zhenyuan Lu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
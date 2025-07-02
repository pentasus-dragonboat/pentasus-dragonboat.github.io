// pages/index.tsx - Updated to Remove Modal Dependencies
import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AthletesSection from '@/components/sections/AthletesSection';
import AdminSection from '@/components/sections/AdminSection';
import NewsSection from '@/components/sections/NewsSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import ContactSection from  '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import { getNewsItems, getTeamMembers, getAdminTeam, getSponsors} from '@/lib/content/loaders';
import { getSiteConfig } from '@/lib/content/siteConfig';
import { markdownToHtml } from '@/lib/markdown';
import { getThemeConfig } from '@/lib/theme/detection';
import type { NewsItem, TeamMember, Sponsor, SiteData } from '@/lib/content/types';

interface HomeProps {
  news: NewsItem[];
  teamMembers: TeamMember[];
  adminTeam: TeamMember[];
  sponsors: Sponsor[];
  siteData: SiteData;
}

export default function Home({ news, teamMembers, adminTeam, sponsors, siteData }: HomeProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { site } = siteData;
  
  // Get unified theme configuration for all sections
  const themeConfig = getThemeConfig(site.hero.backgroundImage);
  const { isMinimalist } = themeConfig;

  return (
    <>
      <Head>
        <title>{`${site.name} - ${site.tagline}`}</title>
        <meta name="description" content={site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={site.favicon} />
        
        {/* Enhanced Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${site.name} - ${site.tagline}`} />
        <meta property="og:description" content={site.description} />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:image" content={site.logo} />
        <meta property="og:url" content="https://pentasus.dragonboat.team" />
        
        {/* Enhanced Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${site.name} - ${site.tagline}`} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={site.logo} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="keywords" content="dragon boat, rowing, sports team, pentasus, competition, training" />
        <meta name="author" content={site.name} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pentasus.dragonboat.team" />
        
        {/* Performance and Accessibility */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light" />
        
        {/* JSON-LD Structured Data for Better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsTeam",
              "name": site.name,
              "description": site.description,
              "sport": "Dragon Boat Racing",
              "url": "https://pentasus.dragonboat.team",
              "logo": site.logo,
              "foundingDate": "2025",
              "memberOf": {
                "@type": "SportsOrganization",
                "name": "Dragon Boat Racing Community"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Navigation - Enhanced with site data */}
        <Navigation siteData={siteData} />
        
        {/* Hero Section - Already has theme detection built-in */}
        <HeroSection siteData={siteData} />
        
        {/* Athletes Section - Enhanced with unified theming */}
        <AthletesSection 
          teamMembers={teamMembers} 
          siteData={siteData} 
        />
        
        {/* Admin Section - Enhanced with unified theming */}
        <AdminSection 
          adminTeam={adminTeam} 
          siteData={siteData} 
        />
        
        {/* News Section - Now navigates to dedicated pages, no modals */}
        <NewsSection 
          news={news} 
          isMinimalist={isMinimalist}
        />
        
        {/* Sponsors Section - Enhanced with unified theming */}
        <SponsorsSection 
          sponsors={sponsors}
          isMinimalist={isMinimalist}
        />
        
        {/* Contact Section - Enhanced with unified theming */}
        <ContactSection 
          contactData={siteData.contact} 
          siteConfig={site}
          isMinimalist={isMinimalist}
        />
        
        {/* Footer - Enhanced with site data */}
        <Footer siteData={siteData} />
      </div>

      {/* Development Theme Indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-4 py-2 rounded-lg text-xs font-bold border-2 ${
            isMinimalist 
              ? 'bg-blue-50 text-blue-700 border-blue-200' 
              : 'bg-yellow-200 text-black border-black'
          }`}>
            {isMinimalist ? 'Minimalist Mode' : 'Cartoon Mode'} | Enhanced News
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    // Load all content data
    const newsItems = getNewsItems();
    const teamMembers = getTeamMembers();
    const adminTeam = getAdminTeam();
    const sponsors = getSponsors();
    const siteData = getSiteConfig();
    
    // Process markdown content for news articles
    const newsWithHtml = await Promise.all(
      newsItems.map(async (item) => ({
        ...item,
        content: await markdownToHtml(item.content),
      }))
    );
    
    return {
      props: {
        news: newsWithHtml,
        teamMembers,
        adminTeam,
        sponsors,
        siteData,
      },
    };
  } catch (error) {
    console.error('Error loading site data:', error);
    
    // Return graceful fallback data
    const fallbackSiteData = getSiteConfig();
    
    return {
      props: {
        news: [],
        teamMembers: [],
        adminTeam: [],
        sponsors: [],
        siteData: fallbackSiteData,
      },
    };
  }
};
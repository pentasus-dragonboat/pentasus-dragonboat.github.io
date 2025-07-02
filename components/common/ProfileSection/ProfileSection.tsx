// components/common/ProfileSection/ProfileSection.tsx - Universal Profile Section
import React, { useState } from 'react';
import type { TeamMember, SiteData } from '@/lib/content/types';
import { ProfileCard } from './ProfileCard';
// Update the import path to match the actual location and filename of SectionHeader
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { DevTools } from '../DevTools/DevTools';
import { 
  getThemeConfig, 
  getSectionBackground, 
  getProfileGridClasses
} from '@/lib/theme';

interface ProfileSectionProps {
  members: TeamMember[];
  siteData: SiteData;
  sectionType: 'athletes' | 'admin';
  colorTheme: 'blue' | 'green' | 'red' | 'purple';
  title: string;
  subtitle: string;
  sectionId: string;
  decorativeTheme?: 'primary' | 'secondary' | 'tertiary';
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  members,
  siteData,
  sectionType,
  colorTheme,
  title,
  subtitle,
  sectionId,
  decorativeTheme = 'primary'
}) => {
  // Track image types for development info
  const [imageStates, setImageStates] = useState<Record<number, 'local' | 'dicebear' | 'initials'>>({});
  
  const { site } = siteData;
  const { hero } = site;
  
  // Get unified theme configuration
  const themeConfig = getThemeConfig(hero.backgroundImage);
  const { isMinimalist } = themeConfig;
  
  const memberCount = members.length;
  
  // Get consistent styling classes
  const sectionBg = getSectionBackground(isMinimalist, decorativeTheme);
  const gridClasses = getProfileGridClasses(memberCount);

  // Handle image type changes for development tracking
  const handleImageTypeChange = (memberId: number, imageType: 'local' | 'dicebear' | 'initials') => {
    setImageStates(prev => ({ ...prev, [memberId]: imageType }));
  };

  // Empty state
  if (memberCount === 0) {
    return (
      <section id={sectionId} className={`py-32 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <SectionHeader
              title={title}
              subtitle="Our team is currently being assembled. Check back soon!"
              isMinimalist={isMinimalist}
              decorativeTheme={decorativeTheme}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={sectionId} className={`py-32 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with Decorative Elements */}
        <SectionHeader
          title={title}
          subtitle={subtitle}
          isMinimalist={isMinimalist}
          decorativeTheme={decorativeTheme}
        />
        
        {/* Members Grid */}
        <div className={gridClasses}>
          {members.map((member, index) => (
            <ProfileCard
              key={member.id}
              member={member}
              index={index}
              colorTheme={colorTheme}
              isMinimalist={isMinimalist}
              onImageTypeChange={(imageType) => handleImageTypeChange(member.id, imageType)}
            />
          ))}
        </div>

        {/* Development Tools */}
        <DevTools
          sectionType={sectionType}
          memberCount={memberCount}
          imageStates={imageStates}
          isMinimalist={isMinimalist}
        />
      </div>
    </section>
  );
};
// components/sections/AthletesSection.tsx - Simplified using ProfileSection
import React from 'react';
import type { TeamMember, SiteData } from '@/lib/content/types';
import { ProfileSection } from '@/components/common';

interface AthletesSectionProps {
  teamMembers: TeamMember[];
  siteData: SiteData;
}

const AthletesSection: React.FC<AthletesSectionProps> = ({ teamMembers, siteData }) => {
  return (
    <ProfileSection
      members={teamMembers}
      siteData={siteData}
      sectionType="athletes"
      colorTheme="blue"
      title="Our Family"
      subtitle="Meet our family members on the water——水上人家。（我们保证按字母排序）"
      sectionId="athletes"
      decorativeTheme="primary"
    />
  );
};

export default AthletesSection;
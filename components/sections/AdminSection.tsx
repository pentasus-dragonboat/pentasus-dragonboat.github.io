// components/sections/AdminSection.tsx - Simplified using ProfileSection
import React from 'react';
import type { TeamMember, SiteData } from '@/lib/content/types';
import { ProfileSection } from '@/components/common';

interface AdminSectionProps {
  adminTeam: TeamMember[];
  siteData: SiteData;
}

const AdminSection: React.FC<AdminSectionProps> = ({ adminTeam, siteData }) => {
  return (
    <ProfileSection
      members={adminTeam}
      siteData={siteData}
      sectionType="admin"
      colorTheme="green"
      title="Admin and Logistics Team"
      subtitle="Meet the professionals who ensure our success."
      sectionId="admin"
      decorativeTheme="secondary"
    />
  );
};

export default AdminSection;
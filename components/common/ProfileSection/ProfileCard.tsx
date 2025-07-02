// components/common/ProfileSection/ProfileCard.tsx - Individual Profile Card
import React from 'react';
import type { TeamMember } from '@/lib/content/types';
import { SmartProfileImage, ImageSourceIndicator } from '../SmartImage';
import { 
  getProfileCardClasses,
  getProfileNameClasses,
  getProfileMottoClasses,
  getRolePillClasses
} from '@/lib/theme';

interface ProfileCardProps {
  member: TeamMember;
  index: number;
  colorTheme: 'blue' | 'green' | 'red' | 'purple';
  isMinimalist: boolean;
  onImageTypeChange: (imageType: 'local' | 'dicebear' | 'initials') => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  member,
  index,
  colorTheme,
  isMinimalist,
  onImageTypeChange
}) => {
  const [imageType, setImageType] = React.useState<'local' | 'dicebear' | 'initials'>('initials');
  
  const profileCardClasses = getProfileCardClasses(isMinimalist);

  const handleImageTypeChange = (type: 'local' | 'dicebear' | 'initials') => {
    setImageType(type);
    onImageTypeChange(type);
  };

  return (
    <div className={profileCardClasses.container}>
      {/* Profile Photo with Image Source Tracking */}
      <div className="relative mb-6">
        <div className={profileCardClasses.imageContainer}>
          <SmartProfileImage
            member={member}
            className="w-full h-full object-cover"
            loading={index < 3 ? "eager" : "lazy"}
            onImageTypeChange={handleImageTypeChange}
          />
          
          {/* Development Image Source Indicator */}
          <ImageSourceIndicator 
            imageType={imageType} 
            memberName={member.name}
          />
        </div>
      </div>
      
      {/* Profile Information */}
      <div className={profileCardClasses.contentContainer}>
        {/* Name */}
        <div className={profileCardClasses.nameContainer}>
          <h3 className={getProfileNameClasses(isMinimalist)}>
            {member.name}
          </h3>
        </div>
        
        {/* Role Pill */}
        <div className={profileCardClasses.roleContainer}>
          <span className={getRolePillClasses(isMinimalist, colorTheme)}>
            {member.role}
          </span>
        </div>
        
        {/* Motto */}
        <div className={profileCardClasses.mottoContainer}>
          {member.motto && (
            <p className={getProfileMottoClasses(isMinimalist)}>
              {member.motto}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
// components/SmartProfileImage.tsx - Simplified with clear hierarchy
import React, { useState } from 'react';
import type { TeamMember } from '@/lib/content/types';
import { getImagePath } from '@/lib/utils/image';
import { hasDiceBearMinimumData, getNameInitials, type DiceBearConfig } from '@/lib/utils/profile';

interface SmartProfileImageProps {
  member: TeamMember;
  className?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
  onImageTypeChange?: (type: 'local' | 'dicebear' | 'initials') => void;
}

/**
 * Generate DiceBear URL from configuration
 */
function generateDiceBearUrl(config: DiceBearConfig): string {
  const baseUrl = 'https://api.dicebear.com/9.x/adventurer/svg';
  const params = new URLSearchParams();
  
  // Required parameters
  params.append('seed', config.avatar);
  params.append('backgroundColor', config.avatarBg);
  params.append('eyesColor', config.avatarEyes);
  
  // Optional enhanced parameters
  if (config.hair) params.append('hair', config.hair);
  if (config.glasses) params.append('glasses', config.glasses);
  if (config.glassesProbability !== undefined) params.append('glassesProbability', config.glassesProbability.toString());
  if (config.beard) params.append('beard', config.beard);
  if (config.beardProbability !== undefined) params.append('beardProbability', config.beardProbability.toString());
  if (config.clothing) params.append('clothing', config.clothing);
  if (config.clothingColor) params.append('clothingColor', config.clothingColor);
  if (config.accessories) params.append('accessories', config.accessories);
  if (config.accessoriesProbability !== undefined) params.append('accessoriesProbability', config.accessoriesProbability.toString());
  if (config.mouth) params.append('mouth', config.mouth);
  if (config.skinColor) params.append('skinColor', config.skinColor);
  if (config.eyesColor) params.set('eyesColor', config.eyesColor); // Override if provided
  
  return `${baseUrl}?${params.toString()}`;
}

const SmartProfileImage: React.FC<SmartProfileImageProps> = ({
  member,
  className = "w-full h-full object-cover",
  alt,
  loading = "lazy",
  onImageTypeChange
}) => {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  // HIERARCHY LOGIC - Simple and Clear

  // 1. LOCAL IMAGE (Highest Priority)
  if (member.image && !imageLoadFailed) {
    return (
      <img
        src={getImagePath(member.image)}
        alt={alt || member.name}
        className={className}
        loading={loading}
        onLoad={() => onImageTypeChange?.('local')}
        onError={() => {
          setImageLoadFailed(true);
          // Component will re-render and fall through to next option
        }}
      />
    );
  }

  // 2. DICEBEAR AVATAR (Medium Priority)
  if (hasDiceBearMinimumData(member.dicebear)) {
    const dicebearUrl = generateDiceBearUrl(member.dicebear!);
    
    return (
      <img
        src={dicebearUrl}
        alt={alt || member.name}
        className={className}
        loading={loading}
        onLoad={() => onImageTypeChange?.('dicebear')}
        onError={() => {
          // DiceBear failed, will show initials on next render
          onImageTypeChange?.('initials');
        }}
        style={{ imageRendering: 'crisp-edges' }}
      />
    );
  }

  // 3. NAME INITIALS (Fallback)
  const initials = getNameInitials(member.name);
  
  React.useEffect(() => {
    onImageTypeChange?.('initials');
  }, [onImageTypeChange]);

  return (
    <div 
      className={`${className} bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center`}
      style={{ 
        backgroundColor: member.dicebear?.avatarBg ? `#${member.dicebear.avatarBg}` : undefined 
      }}
    >
      <span 
        className="text-white font-bold select-none"
        style={{ 
          fontSize: 'clamp(1rem, 4vw, 1.5rem)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        {initials}
      </span>
    </div>
  );
};

export default SmartProfileImage;

// Development helper component
export const ImageSourceIndicator: React.FC<{ 
  imageType: 'local' | 'dicebear' | 'initials',
  memberName: string 
}> = ({ imageType, memberName }) => {
  if (process.env.NODE_ENV !== 'development') return null;

  const config = {
    local: { bg: 'bg-green-500', text: 'Local' },
    dicebear: { bg: 'bg-blue-500', text: 'DiceBear' },
    initials: { bg: 'bg-gray-500', text: 'Initials' }
  };

  const { bg, text } = config[imageType];

  return (
    <div className="absolute bottom-1 right-1 z-10">
      <div 
        className={`${bg} text-white text-xs px-2 py-1 rounded opacity-75`}
        title={`${memberName}: ${text}`}
      >
        {text}
      </div>
    </div>
  );
};
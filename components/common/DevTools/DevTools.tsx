// components/common/DevTools/DevTools.tsx - Development Tools and Debug Info
import React from 'react';

interface DevToolsProps {
  sectionType: string;
  memberCount: number;
  imageStates: Record<number, 'local' | 'dicebear' | 'initials'>;
  isMinimalist: boolean;
}

export const DevTools: React.FC<DevToolsProps> = ({
  sectionType,
  memberCount,
  imageStates,
  isMinimalist
}) => {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Calculate image statistics
  const getImageStats = () => {
    const stats = { local: 0, dicebear: 0, initials: 0 };
    Object.values(imageStates).forEach(type => {
      stats[type] = (stats[type] || 0) + 1;
    });
    return stats;
  };

  const stats = getImageStats();

  return (
    <div className="mt-8 text-center space-y-2">
      <div className="text-xs text-gray-500">
        Theme: {isMinimalist ? 'Minimalist' : 'Cartoon'} | {memberCount} {sectionType} members
      </div>
      <div className="text-xs text-gray-400">
        Images: 🖼️ {stats.local} Local | 🎭 {stats.dicebear} DiceBear | 🔤 {stats.initials} Initials
      </div>
    </div>
  );
};
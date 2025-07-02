// components/common/SectionHeader/SectionHeader.tsx - Common Section Headers
import React from 'react';
import { DecorativeShapes } from './DecorativeShapes';
import { getTitleClasses, getSubtitleClasses } from '@/lib/theme/styles';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  isMinimalist: boolean;
  decorativeTheme?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  isMinimalist,
  decorativeTheme = 'primary',
  className = "text-center mb-24 relative"
}) => {
  const titleClasses = getTitleClasses(isMinimalist, 'large');
  const subtitleClasses = getSubtitleClasses(isMinimalist);

  return (
    <div className={className}>
      {/* Decorative Shapes for Cartoon Mode */}
      {!isMinimalist && (
        <DecorativeShapes theme={decorativeTheme} />
      )}
      
      <h2 className={titleClasses}>{title}</h2>
      <p className={subtitleClasses}>{subtitle}</p>
    </div>
  );
};
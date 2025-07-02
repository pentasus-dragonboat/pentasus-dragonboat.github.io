// components/common/SectionHeader/DecorativeShapes.tsx - Cartoon Mode Decorations
import React from 'react';

interface DecorativeShapesProps {
  theme: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
}

export const DecorativeShapes: React.FC<DecorativeShapesProps> = ({ theme }) => {
  const shapeConfigs = {
    primary: {
      left: "w-16 h-16 bg-yellow-300 rounded-full opacity-20 blur-xl animate-pulse",
      right: "w-12 h-12 bg-pink-300 rounded-full opacity-25 blur-lg animate-pulse"
    },
    secondary: {
      left: "w-16 h-16 bg-pink-300 rounded-full opacity-20 blur-xl animate-pulse",
      right: "w-12 h-12 bg-blue-300 rounded-full opacity-25 blur-lg animate-pulse"
    },
    tertiary: {
      left: "w-16 h-16 bg-blue-300 rounded-full opacity-20 blur-xl animate-pulse",
      right: "w-12 h-12 bg-yellow-300 rounded-full opacity-25 blur-lg animate-pulse"
    },
    quaternary: {
      left: "w-16 h-16 bg-purple-300 rounded-full opacity-20 blur-xl animate-pulse",
      right: "w-12 h-12 bg-green-300 rounded-full opacity-25 blur-lg animate-pulse"
    }
  };

  const config = shapeConfigs[theme];

  return (
    <>
      <div 
        className={`absolute top-1/2 left-1/4 ${config.left} hidden lg:block`}
      />
      <div 
        className={`absolute top-1/2 right-1/4 ${config.right} hidden lg:block`}
        style={{ animationDelay: '1s' }}
      />
    </>
  );
};
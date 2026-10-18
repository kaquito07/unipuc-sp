import React from 'react';
import { StudentProfile } from '../types/student';
import { CardRotated } from '../components/CardRotated';

interface CardViewProps {
  profile: StudentProfile;
  onOpenQR: () => void;
}

export const CardView: React.FC<CardViewProps> = ({ profile, onOpenQR }) => {
  return (
    <div className="w-full h-[calc(100dvh-120px)] flex flex-col items-center justify-center overflow-hidden animate-fade-in px-2">
      {/* Shows ONLY the 90° rotated card and the two pagination dots */}
      <CardRotated profile={profile} onOpenQR={onOpenQR} />
    </div>
  );
};

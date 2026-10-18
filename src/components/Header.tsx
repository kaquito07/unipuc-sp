import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showBack = true,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#3B82F6] text-white shadow-sm">
      <div className="relative flex items-center justify-between h-14 px-3 max-w-lg mx-auto">
        {/* Back button on the left */}
        <div className="w-10 flex items-center justify-start">
          {showBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
              aria-label="Voltar"
            >
              <ChevronLeft size={26} strokeWidth={2.4} />
            </button>
          )}
        </div>

        {/* Centered Tab Title */}
        <h1 className="text-base font-bold text-white tracking-tight select-none">
          {title}
        </h1>

        {/* Balance spacer on the right */}
        <div className="w-10" />
      </div>
    </header>
  );
};

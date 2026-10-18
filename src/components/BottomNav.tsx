import React from 'react';
import { Home, Gift, QrCode } from 'lucide-react';

export type TabType = 'inicio' | 'carteirinha' | 'ofertas' | 'qrcode';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

// Custom icon: smartphone with person silhouette
const SmartphoneUserIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 22,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Phone outer */}
      <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
      {/* Screen area subtle border */}
      <circle cx="12" cy="9" r="2.2" />
      <path d="M8.5 15.5 C8.5 13.5 10 12.5 12 12.5 C14 12.5 15.5 13.5 15.5 15.5" />
      <line x1="11" y1="19" x2="13" y2="19" />
    </svg>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'inicio' as TabType,
      label: 'Início',
      icon: Home,
    },
    {
      id: 'carteirinha' as TabType,
      label: 'Carteirinha Digital',
      customIcon: SmartphoneUserIcon,
    },
    {
      id: 'ofertas' as TabType,
      label: 'Ofertas',
      icon: Gift,
    },
    {
      id: 'qrcode' as TabType,
      label: 'QRCode',
      icon: QrCode,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-md">
      <div className="grid grid-cols-4 max-w-lg mx-auto h-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComp = tab.icon;
          const CustomIconComp = tab.customIcon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full transition-colors cursor-pointer active:scale-95 ${
                isActive ? 'text-[#3B82F6]' : 'text-[#9CA3AF] hover:text-slate-600'
              }`}
            >
              <div className="relative">
                {CustomIconComp ? (
                  <CustomIconComp
                    size={22}
                    className={isActive ? 'text-[#3B82F6]' : 'text-[#9CA3AF]'}
                  />
                ) : (
                  IconComp && (
                    <IconComp
                      size={22}
                      strokeWidth={isActive ? 2.3 : 1.8}
                      className={isActive ? 'text-[#3B82F6]' : 'text-[#9CA3AF]'}
                    />
                  )
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 whitespace-nowrap ${
                  isActive ? 'font-bold text-[#3B82F6]' : 'font-medium text-[#9CA3AF]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

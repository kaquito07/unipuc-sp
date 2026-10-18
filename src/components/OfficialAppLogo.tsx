import React from 'react';

interface OfficialAppLogoProps {
  size?: number;
  className?: string;
}

export const OfficialAppLogo: React.FC<OfficialAppLogoProps> = ({ size = 28, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Blue rounded badge */}
      <rect width="100" height="100" rx="22" fill="#0066FF" />
      
      {/* White outer contour */}
      <path
        d="M50 14 C29 14 14 29 14 50 C14 62 20 72 30 79 L42 87 C46 90 52 86 51 81 L49 76 C50 76 50 76 50 76 C71 76 86 61 86 40 C86 26 70 14 50 14 Z"
        fill="#FFFFFF"
      />

      {/* Red circular speech mark shape */}
      <path
        d="M50 18 C31 18 18 31 18 50 C18 60 23 69 32 75 L42 82 C44 84 48 81 47 78 L45 72 C47 72 48 72 50 72 C69 72 82 59 82 40 C82 28 68 18 50 18 Z"
        fill="#EA384D"
      />

      {/* Two white diagonal strokes */}
      <path
        d="M38 28 L52 42"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M31 35 L58 62"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

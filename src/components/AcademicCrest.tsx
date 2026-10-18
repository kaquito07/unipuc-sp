import React from 'react';

interface AcademicCrestProps {
  className?: string;
  size?: number;
}

export const AcademicCrest: React.FC<AcademicCrestProps> = ({ className = '', size = 52 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Brasão Acadêmico Nostalgia"
    >
      {/* Laurel Wreath Left */}
      <path
        d="M26 70 C16 55 16 35 28 22 C29 32 34 38 40 42 C30 46 25 56 26 70 Z"
        fill="#2B2F5B"
        opacity="0.9"
      />
      <circle cx="21" cy="38" r="3.5" fill="#F2B705" />
      <circle cx="23" cy="52" r="3" fill="#F2B705" />
      <circle cx="28" cy="64" r="3" fill="#F2B705" />

      {/* Laurel Wreath Right */}
      <path
        d="M74 70 C84 55 84 35 72 22 C71 32 66 38 60 42 C70 46 75 56 74 70 Z"
        fill="#2B2F5B"
        opacity="0.9"
      />
      <circle cx="79" cy="38" r="3.5" fill="#F2B705" />
      <circle cx="77" cy="52" r="3" fill="#F2B705" />
      <circle cx="72" cy="64" r="3" fill="#F2B705" />

      {/* Papal / Academic Crown / Mitre Style Top */}
      <path
        d="M40 22 C42 12 50 8 50 8 C50 8 58 12 60 22 C55 24 45 24 40 22 Z"
        fill="#F2B705"
        stroke="#2B2F5B"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="7" r="2.5" fill="#DC2626" />
      <path d="M47 16 H53 M50 13 V19" stroke="#2B2F5B" strokeWidth="1.5" strokeLinecap="round" />

      {/* Central Shield */}
      <path
        d="M32 24 H68 V54 C68 68 50 78 50 78 C50 78 32 68 32 54 V24 Z"
        fill="#1E3A8A"
        stroke="#2B2F5B"
        strokeWidth="2.5"
      />

      {/* Shield inner field with quartering */}
      <path
        d="M35 27 H65 V52 C65 64 50 73 50 73 C50 73 35 64 35 52 V27 Z"
        fill="#2563EB"
      />

      {/* Open Book in the shield with "SAPIENTIA" */}
      <rect x="38" y="32" width="24" height="15" rx="1.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1" />
      <line x1="50" y1="32" x2="50" y2="47" stroke="#1E293B" strokeWidth="1" />
      {/* Book text simulation */}
      <text
        x="50"
        y="42"
        textAnchor="middle"
        fontSize="5"
        fontWeight="800"
        fontFamily="sans-serif"
        fill="#1E3A8A"
        letterSpacing="0.5"
      >
        SAPIENTIA
      </text>

      {/* Crossed Academic Keys / Torch underneath */}
      <path
        d="M42 52 L58 66 M58 52 L42 66"
        stroke="#F2B705"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="59" r="3.5" fill="#F2B705" stroke="#1E3A8A" strokeWidth="1" />

      {/* Ribbon Banner at bottom */}
      <path
        d="M24 78 C34 74 66 74 76 78 L80 84 C68 81 32 81 20 84 L24 78 Z"
        fill="#FFFFFF"
        stroke="#2B2F5B"
        strokeWidth="1.2"
      />
      <text
        x="50"
        y="81.5"
        textAnchor="middle"
        fontSize="4"
        fontWeight="bold"
        fontFamily="serif"
        fill="#2B2F5B"
      >
        FIDELIS · SAPIENTIA
      </text>
    </svg>
  );
};

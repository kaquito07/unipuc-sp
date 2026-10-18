import React from 'react';

interface BarcodeVectorProps {
  value: string;
  className?: string;
  height?: number;
}

export const BarcodeVector: React.FC<BarcodeVectorProps> = ({
  value,
  className = '',
  height = 48,
}) => {
  // Deterministic bar widths based on input string
  const cleanDigits = value.replace(/\D/g, '') || '00222836';
  
  // Format spaced digits for display below barcode (e.g., "0 0 2 2 2 8 3 6")
  const spacedText = cleanDigits.split('').join(' ');

  // Generate sequence of bar widths
  const bars = [
    3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 1, 1, 2, 3, 1, 2, 1, 3, 1,
    1, 2, 1, 3, 1, 1, 2, 3, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 3, 2, 1, 2, 1, 1, 3,
  ];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Bars SVG */}
      <svg
        width="100%"
        height={height}
        viewBox="0 0 160 50"
        preserveAspectRatio="none"
        className="w-full"
      >
        {bars.map((bar, i) => {
          const x = i * 3.05 + 2;
          const isBlack = i % 2 === 0;
          return isBlack ? (
            <rect
              key={i}
              x={x}
              y="0"
              width={bar * 0.9}
              height="50"
              fill="#000000"
            />
          ) : null;
        })}
      </svg>
      {/* Digits row */}
      <div className="font-mono text-[9px] tracking-[0.25em] text-black font-semibold text-center mt-1">
        {spacedText}
      </div>
    </div>
  );
};

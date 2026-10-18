import React from 'react';

interface QRCodeVectorProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export const QRCodeVector: React.FC<QRCodeVectorProps> = ({
  size = 64,
  className = '',
  onClick,
  title = 'QR Code - 4ºB',
}) => {
  // Deterministic 21x21 QR Matrix representation
  const matrix: number[][] = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,1,1,1,0,1,1,0,1,1,1,0,1,0,1,1,0],
    [0,1,0,1,0,0,0,1,1,0,1,0,0,1,0,1,0,1,0,0,1],
    [1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0],
    [0,0,1,1,0,1,0,1,0,0,1,0,0,1,1,0,0,1,1,0,1],
    [1,0,1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,0],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,1,0,1,0,1],
    [1,1,1,1,1,1,1,0,1,1,0,0,1,0,1,0,1,0,1,1,0],
    [1,0,0,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,0,1,0,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,0,1,0,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,1,0,0,1,1,0],
    [1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,0,1,1],
  ];

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      title={title}
      className={`relative inline-block bg-white p-1 rounded-md shadow-sm border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 21 21"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        {matrix.map((row, r) =>
          row.map((cell, c) =>
            cell ? (
              <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#111827" />
            ) : null
          )
        )}
      </svg>
    </div>
  );
};

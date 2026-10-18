import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Smartphone, GraduationCap, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { StudentProfile } from '../types/student';
import { AcademicCrest } from './AcademicCrest';
import { BarcodeVector } from './BarcodeVector';
import { QRCodeVector } from './QRCodeVector';

interface CardRotatedProps {
  profile: StudentProfile;
  onOpenQR: () => void;
  onEditProfile?: () => void;
}

export const CardRotated: React.FC<CardRotatedProps> = ({
  profile,
  onOpenQR,
  onEditProfile,
}) => {
  const [currentPage, setCurrentPage] = useState<'frente' | 'verso'>('frente');
  const [viewOrientation, setViewOrientation] = useState<'rotated90' | 'horizontal'>('rotated90');

  // Swipe detection coordinates
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left -> Next
      setCurrentPage('verso');
    } else if (diff < -50) {
      // Swiped right -> Prev
      setCurrentPage('frente');
    }
    setTouchStartX(null);
  };

  const fullName = `${profile.nome} ${profile.sobrenome}`.trim() || 'ESTUDANTE NOSTALGIA';
  const cleanRA = profile.matricula.replace(/^RA/i, '');

  return (
    <div className="flex flex-col items-center w-full px-2 py-3 select-none">
      {/* Top micro controls */}
      <div className="w-full max-w-sm flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
          <Smartphone size={13} className="text-blue-600" />
          <span>{currentPage === 'frente' ? 'Frente do Cartão' : 'Verso do Cartão'}</span>
        </div>

        <button
          onClick={() =>
            setViewOrientation((prev) => (prev === 'rotated90' ? 'horizontal' : 'rotated90'))
          }
          className="flex items-center gap-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
          title="Alternar entre modo deitado clássico e orientação horizontal direta"
        >
          <RotateCw size={13} className="text-slate-500" />
          <span>{viewOrientation === 'rotated90' ? 'Girar Normal' : 'Modo 90° (Portal)'}</span>
        </button>
      </div>

      {/* Card Viewport Container */}
      <div
        className="relative w-full max-w-[360px] flex items-center justify-center overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {currentPage === 'frente' ? (
            <motion.div
              key="frente"
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className={`w-full flex justify-center ${
                viewOrientation === 'horizontal' ? 'overflow-x-auto py-2' : ''
              }`}
            >
              {/* THE FRONT CARD */}
              <div
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 transition-all ${
                  viewOrientation === 'rotated90'
                    ? 'w-[335px] h-[520px]'
                    : 'w-[520px] h-[335px] max-w-full'
                }`}
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
                }}
              >
                {viewOrientation === 'rotated90' ? (
                  /* ========================================================
                     ROTATED 90° (PORTAL ANTIGO / AS SEEN IN THE USER PHOTOS)
                     The card is vertical on phone, content flows sideways
                     ======================================================== */
                  <div className="absolute inset-0 w-full h-full">
                    {/* Background Guilloche Curved Lines Mesh (top right & middle) */}
                    <svg
                      className="absolute top-0 right-0 w-[240px] h-[300px] pointer-events-none opacity-40"
                      viewBox="0 0 200 250"
                      fill="none"
                    >
                      {[15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180].map((radius, i) => (
                        <circle
                          key={i}
                          cx="200"
                          cy="50"
                          r={radius}
                          stroke="#94A3B8"
                          strokeWidth="0.75"
                          strokeDasharray={i % 3 === 0 ? '4 2' : 'none'}
                        />
                      ))}
                      {[20, 40, 60, 80, 100, 120].map((r, i) => (
                        <ellipse
                          key={`el-${i}`}
                          cx="180"
                          cy="120"
                          rx={r * 1.3}
                          ry={r * 0.9}
                          stroke="#CBD5E1"
                          strokeWidth="0.5"
                        />
                      ))}
                    </svg>

                    {/* Two Diagonal Wavy Ribbons: Yellow (#F2B705) and Navy (#2B2F5B) */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 335 520"
                      preserveAspectRatio="none"
                    >
                      {/* Yellow Wave */}
                      <path
                        d="M -20,200 C 60,160 140,240 220,180 C 270,140 310,130 355,140 L 355,170 C 310,160 270,170 220,210 C 140,270 60,190 -20,230 Z"
                        fill="#F2B705"
                      />
                      {/* Navy Blue Wave overlapping */}
                      <path
                        d="M -20,225 C 60,185 140,265 220,205 C 270,165 310,155 355,165 L 355,195 C 310,185 270,195 220,235 C 140,295 60,215 -20,255 Z"
                        fill="#2B2F5B"
                      />
                    </svg>

                    {/* TOP LEFT: Student 3x4 Photo with dark blue frame */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="w-[100px] h-[133px] border-[2.5px] border-[#2B2F5B] rounded-xs shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
                        <img
                          src={profile.fotoUrl}
                          alt={fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* TOP RIGHT: Validity pill rotated 90° (matches photo: "VAL.: 06/2026") */}
                    <div
                      className="absolute top-8 right-3 z-10 origin-top-right rotate-90 flex items-center"
                    >
                      <div className="bg-white/95 px-2.5 py-0.5 rounded-full border border-slate-300 shadow-xs font-mono font-bold text-[11px] text-slate-700 tracking-wider whitespace-nowrap">
                        VAL.: {profile.validade || '06/2026'}
                      </div>
                    </div>

                    {/* MIDDLE-LEFT: Academic Crest & University Name (Rotated 90° as in photo) */}
                    <div
                      className="absolute left-6 bottom-44 z-10 flex flex-col items-center gap-1.5"
                      style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'left center',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <AcademicCrest size={46} />
                        <div className="flex flex-col">
                          <span
                            className="font-serif text-3xl font-black text-[#1E293B] tracking-wider leading-none"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            PUC-SP
                          </span>
                          <span className="text-[8px] font-sans font-bold text-[#2B2F5B] tracking-widest uppercase">
                            Universidade Nostalgia
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM RIGHT: Student Full Name, Course & Registration (Rotated 90° as in photo) */}
                    <div
                      className="absolute right-8 bottom-6 z-10 flex flex-col items-start"
                      style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'right bottom',
                        width: '320px',
                      }}
                    >
                      <h2 className="text-[17px] font-extrabold text-black uppercase tracking-tight leading-tight line-clamp-1">
                        {fullName}
                      </h2>
                      <p className="text-[12px] font-bold text-slate-800 uppercase tracking-wide mt-0.5">
                        {profile.curso || 'CIÊNCIAS ECONÔMICAS'}
                      </p>
                      <p className="text-[14px] font-bold text-black font-mono tracking-wider mt-0.5">
                        RA{cleanRA || '00223241'}
                      </p>
                    </div>

                    {/* Discreet Watermark: "EDIÇÃO NOSTALGIA" */}
                    <div className="absolute bottom-2 left-3 z-0 pointer-events-none">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-slate-300 select-none uppercase">
                        EDIÇÃO NOSTALGIA
                      </span>
                    </div>
                  </div>
                ) : (
                  /* ========================================================
                     DIRECT HORIZONTAL VIEW (UNROTATED)
                     ======================================================== */
                  <div className="absolute inset-0 w-full h-full p-4 flex flex-col justify-between">
                    {/* Background guilloche */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                      viewBox="0 0 520 335"
                    >
                      {[30, 60, 90, 120, 150, 180, 210].map((r, i) => (
                        <circle
                          key={i}
                          cx="450"
                          cy="80"
                          r={r}
                          stroke="#94A3B8"
                          strokeWidth="0.75"
                        />
                      ))}
                      <path
                        d="M 220,-20 C 260,80 320,180 400,260 C 450,300 480,320 540,340 L 540,310 C 480,290 450,270 400,230 C 320,150 260,50 220,-50 Z"
                        fill="#F2B705"
                      />
                      <path
                        d="M 245,-20 C 285,80 345,180 425,260 C 475,300 505,320 565,340 L 565,310 C 505,290 475,270 425,230 C 345,150 285,50 245,-50 Z"
                        fill="#2B2F5B"
                      />
                    </svg>

                    {/* Top row */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <AcademicCrest size={48} />
                        <div>
                          <span
                            className="font-serif text-3xl font-black text-slate-900 tracking-wider block"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            PUC-SP
                          </span>
                          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                            Universidade Nostalgia
                          </span>
                        </div>
                      </div>

                      <div className="w-[85px] h-[115px] border-2 border-[#2B2F5B] rounded shadow-md overflow-hidden bg-slate-100">
                        <img
                          src={profile.fotoUrl}
                          alt={fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="relative z-10 flex items-end justify-between mt-auto pt-4">
                      <div>
                        <h2 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                          {fullName}
                        </h2>
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          {profile.curso || 'CIÊNCIAS ECONÔMICAS'}
                        </p>
                        <p className="text-sm font-bold text-slate-900 font-mono tracking-wider mt-0.5">
                          RA{cleanRA || '00223241'}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <div className="bg-white/90 border border-slate-300 px-3 py-1 rounded-full font-mono font-bold text-xs text-slate-700 shadow-xs">
                          VAL.: {profile.validade || '06/2026'}
                        </div>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                          EDIÇÃO NOSTALGIA
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="verso"
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className={`w-full flex justify-center ${
                viewOrientation === 'horizontal' ? 'overflow-x-auto py-2' : ''
              }`}
            >
              {/* THE BACK CARD (VERSO) */}
              <div
                className={`relative rounded-2xl shadow-xl overflow-hidden border border-slate-300/80 transition-all ${
                  viewOrientation === 'rotated90'
                    ? 'w-[335px] h-[520px]'
                    : 'w-[520px] h-[335px] max-w-full'
                }`}
                style={{
                  background:
                    'radial-gradient(circle at 70% 30%, #FFFFFF 0%, #F5F6F8 50%, #ECEEF2 100%)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
                }}
              >
                {viewOrientation === 'rotated90' ? (
                  /* ========================================================
                     VERSO: ROTATED 90° (MATCHES IMAGE 2 FROM USER)
                     ======================================================== */
                  <div className="absolute inset-0 w-full h-full p-4 flex flex-col justify-between">
                    {/* Top zone */}
                    <div className="flex items-start justify-between w-full">
                      {/* Left: 28x28 sponsor logo container + Santander Universidades text */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-[32px] h-[32px] rounded border border-slate-300 bg-white/80 p-0.5 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                            {profile.sponsorLogoUrl ? (
                              <img
                                src={profile.sponsorLogoUrl}
                                alt="Patrocinador da Turma"
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <GraduationCap size={18} className="text-red-500" />
                            )}
                          </div>
                          <div>
                            <span className="text-[13px] font-bold text-[#EC0000] tracking-tight block leading-tight font-sans">
                              Santander Universidades
                            </span>
                          </div>
                        </div>

                        {/* Two micro lines with icons */}
                        <div className="space-y-1 pl-0.5">
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-600 font-medium">
                            <span className="w-3.5 h-3.5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-[7px]">
                              ●
                            </span>
                            <span>app santander universitário</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-600 font-medium">
                            <span className="w-3.5 h-3.5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[7px]">
                              f
                            </span>
                            <span>grupo da turma</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Decorative QR Code */}
                      <div className="flex flex-col items-center gap-1">
                        <QRCodeVector size={68} onClick={onOpenQR} />
                        <span className="text-[8px] font-semibold text-blue-600">Toque p/ ler</span>
                      </div>
                    </div>

                    {/* Center: Memorial remembrance text */}
                    <div className="my-2 bg-white/70 backdrop-blur-xs border border-slate-200/90 rounded-xl p-3 shadow-2xs">
                      <p className="text-[11px] font-bold text-slate-800 leading-snug">
                        Patrocínio afetivo: Santander Universidades, parceiro de tantos momentos da nossa
                        turma. Se encontrada, devolva com uma coxinha da cantina.
                      </p>
                    </div>

                    {/* Bottom Area: Student full name written vertically next to Barcode */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/70">
                      {/* Name rotated vertically */}
                      <div
                        className="font-bold text-slate-900 uppercase text-[12px] tracking-wide select-none"
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        {fullName}
                      </div>

                      {/* Barcode vector with registration digits below */}
                      <div className="flex-1 pl-4">
                        <BarcodeVector value={cleanRA || '00222836'} height={48} />
                      </div>
                    </div>

                    {/* Discreet Watermark */}
                    <div className="text-center pt-1">
                      <span className="text-[9px] font-bold tracking-[0.25em] text-slate-400 select-none uppercase">
                        EDIÇÃO NOSTALGIA
                      </span>
                    </div>
                  </div>
                ) : (
                  /* ========================================================
                     VERSO: DIRECT HORIZONTAL VIEW
                     ======================================================== */
                  <div className="absolute inset-0 w-full h-full p-5 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-[36px] h-[36px] rounded border border-slate-300 bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                          {profile.sponsorLogoUrl ? (
                            <img
                              src={profile.sponsorLogoUrl}
                              alt="Logo Patrocinador"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <GraduationCap size={20} className="text-red-500" />
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-[#EC0000] tracking-tight block">
                            Santander Universidades
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            app santander universitário · grupo da turma
                          </span>
                        </div>
                      </div>

                      <QRCodeVector size={64} onClick={onOpenQR} />
                    </div>

                    <div className="bg-white/80 border border-slate-200 rounded-lg p-2.5 my-auto">
                      <p className="text-xs font-bold text-slate-800 leading-snug">
                        Patrocínio afetivo: Santander Universidades, parceiro de tantos momentos da nossa
                        turma. Se encontrada, devolva com uma coxinha da cantina.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <div>
                        <span className="text-xs font-black text-slate-900 uppercase block">
                          {fullName}
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          EDIÇÃO NOSTALGIA
                        </span>
                      </div>
                      <div className="w-48">
                        <BarcodeVector value={cleanRA || '00222836'} height={40} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination indicators (2 dots: active in blue, inactive in slate) */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage('frente')}
          className={`h-2.5 rounded-full transition-all cursor-pointer ${
            currentPage === 'frente' ? 'w-6 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
          }`}
          aria-label="Página 1: Frente"
        />
        <button
          onClick={() => setCurrentPage('verso')}
          className={`h-2.5 rounded-full transition-all cursor-pointer ${
            currentPage === 'verso' ? 'w-6 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
          }`}
          aria-label="Página 2: Verso"
        />
      </div>

      {/* Swipe helper caption */}
      <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
        <Info size={12} className="text-blue-500" />
        Deslize para os lados para alternar entre Frente e Verso
      </p>

      {/* Interactive Quick Buttons */}
      <div className="flex items-center gap-2 mt-3 w-full max-w-xs">
        <button
          onClick={() => setCurrentPage(currentPage === 'frente' ? 'verso' : 'frente')}
          className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCw size={13} />
          {currentPage === 'frente' ? 'Ver Verso' : 'Ver Frente'}
        </button>

        {onEditProfile && (
          <button
            onClick={onEditProfile}
            className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-semibold text-blue-700 shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            Editar Dados
          </button>
        )}
      </div>
    </div>
  );
};

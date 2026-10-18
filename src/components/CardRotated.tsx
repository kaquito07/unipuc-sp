import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../types/student';
import { AcademicCrest } from './AcademicCrest';
import { BarcodeVector } from './BarcodeVector';
import { QRCodeVector } from './QRCodeVector';
import { OfficialAppLogo } from './OfficialAppLogo';

interface CardRotatedProps {
  profile: StudentProfile;
  onOpenQR: () => void;
}

export const CardRotated: React.FC<CardRotatedProps> = ({ profile, onOpenQR }) => {
  const [currentPage, setCurrentPage] = useState<'frente' | 'verso'>('frente');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      // Swiped left -> Verso
      setCurrentPage('verso');
    } else if (diff < -45) {
      // Swiped right -> Frente
      setCurrentPage('frente');
    }
    setTouchStartX(null);
  };

  const fullName = `${profile.nome} ${profile.sobrenome}`.trim().toUpperCase() || 'ALUNO NOSTALGIA';
  const cleanRA = profile.matricula.replace(/^ra/i, '').trim() || '00000000';
  const formattedValidade = profile.validade ? `val ${profile.validade}` : 'val 12/2028';

  return (
    <div
      className="flex flex-col items-center justify-center w-full select-none"
      style={
        {
          '--container-w': 'min(88vw, 360px, calc((100dvh - 165px) / 1.585))',
          '--container-h': 'calc(var(--container-w) * 1.585)',
          '--card-w': 'var(--container-h)',
          '--card-h': 'var(--container-w)',
        } as React.CSSProperties
      }
    >
      {/* 
        Standing container:
        - largura = min(88vw, 380px)
        - altura = largura * 1.585
        - position: relative; overflow: visible; margin: 0 auto
      */}
      <div
        className="relative overflow-visible mx-auto touch-pan-y"
        style={{
          width: 'var(--container-w)',
          height: 'var(--container-h)',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {currentPage === 'frente' ? (
            <motion.div
              key="frente"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2"
              style={{
                width: 'var(--card-w)',
                height: 'var(--card-h)',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                transformOrigin: 'center',
              }}
            >
              {/* ========================================================
                  FRENTE DA CARTEIRINHA (85,6 x 54 mm, ROTATED 90°)
                  ======================================================== */}
              <div
                className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-300"
                style={{
                  boxShadow: '0 12px 30px -6px rgba(0, 0, 0, 0.16), 0 4px 10px -2px rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* 
                  1. CAMADA DE FUNDO (FICA COMO ESTÁ: 
                     Mantém faixas amarela e azul-marinho, círculos e malha na mesma posição e direção na tela)
                */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Thin curved guilloche security lines (right side) */}
                  <svg
                    className="absolute top-0 right-0 w-[55%] h-full pointer-events-none opacity-45"
                    viewBox="0 0 280 315"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    {[30, 55, 80, 105, 130, 155, 180, 205, 230, 255, 280].map((r, i) => (
                      <circle
                        key={i}
                        cx="280"
                        cy="40"
                        r={r}
                        stroke="#94A3B8"
                        strokeWidth="0.8"
                        strokeDasharray={i % 3 === 0 ? '4 2' : 'none'}
                      />
                    ))}
                    {[20, 50, 80, 110, 140, 170].map((r, i) => (
                      <ellipse
                        key={`el-${i}`}
                        cx="240"
                        cy="120"
                        rx={r * 1.3}
                        ry={r * 0.8}
                        stroke="#CBD5E1"
                        strokeWidth="0.6"
                      />
                    ))}
                  </svg>

                  {/* Two diagonal wavy ribbons: Yellow (#F2B705) and Navy (#2B2F5B) */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 500 315"
                    preserveAspectRatio="none"
                  >
                    {/* Yellow Ribbon */}
                    <path
                      d="M 170,0 C 220,100 270,180 340,240 C 380,270 420,290 470,315 L 490,315 C 440,290 400,270 360,240 C 290,180 240,100 190,0 Z"
                      fill="#F2B705"
                    />
                    {/* Navy Blue Ribbon overlapping */}
                    <path
                      d="M 195,0 C 245,100 295,180 365,240 C 405,270 445,290 495,315 L 500,315 L 500,300 C 460,280 420,260 380,230 C 310,170 260,90 215,0 Z"
                      fill="#2B2F5B"
                    />
                  </svg>
                </div>

                {/* 
                  2. CAMADA DE CONTEÚDO:
                     Girada em 180° em relação ao fundo (ou seja, rotate(-90deg) na tela).
                     Resultado na tela:
                     - Foto no canto SUPERIOR ESQUERDO (aumentada ~30% em formato 3x4).
                     - Brasão e PUC-SP na parte de BAIXO à esquerda (lidos de baixo para cima).
                     - Nome, curso e RA na parte de BAIXO à direita do brasão (lidos de baixo para cima, fontes aumentadas).
                     - Etiqueta "val MM/AAAA" no canto SUPERIOR DIREITO.
                */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform: 'rotate(180deg)',
                    transformOrigin: 'center',
                  }}
                >
                  {/* Foto 3x4 com moldura azul-marinho (aumentada ~30%: 106x142 px) */}
                  <div className="absolute top-4 right-6 z-10">
                    <div className="w-[106px] h-[142px] border-[2.5px] border-[#2B2F5B] rounded-xs shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
                      {profile.fotoUrl ? (
                        <img
                          src={profile.fotoUrl}
                          alt={fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-xs font-bold">
                          SEM FOTO
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Etiqueta "val MM/AAAA" arredondada */}
                  <div className="absolute bottom-4 right-6 z-10">
                    <div className="bg-white/95 px-3 py-1 rounded-full border border-slate-300 shadow-xs font-mono font-bold text-[11px] text-slate-700 tracking-wider">
                      {formattedValidade}
                    </div>
                  </div>

                  {/* 
                    Bloco da Faculdade: Brasão ampliado 2,5x + PUC-SP (+25%) + Universidade
                    - Brasão no início da linha (parte de baixo do cartão, margem 12px da borda inferior e esquerda)
                    - PUC-SP serifada preta logo depois do brasão com espaço de 8px
                    - Abaixo dele (à direita na tela), "Universidade" em maiúsculas pequenas, cinza-azulado
                  */}
                  <div className="absolute top-[12px] left-[12px] z-10 flex items-center gap-2">
                    <AcademicCrest size={62} />
                    <div className="flex flex-col justify-center">
                      <span
                        className="font-serif text-[38px] font-black text-black tracking-wider leading-none select-none"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        PUC-SP
                      </span>
                      <span className="text-[9.5px] font-sans font-semibold text-slate-500 tracking-[0.25em] uppercase mt-1 block leading-none">
                        Universidade
                      </span>
                    </div>
                  </div>

                  {/* 
                    Bloco do Aluno (à direita das faixas):
                    - Todas as linhas começam alinhadas na mesma altura do início do brasão (margem 12px)
                    - Nome completo em maiúsculas, sans-serif, negrito forte (800), preto
                    - Curso em maiúsculas, peso normal (400), cinza-escuro, espaço pequeno de 4px
                    - RA mais afastado (cerca de 2x a altura de uma linha), sans-serif normal, sem negrito
                  */}
                  <div className="absolute top-[170px] left-[12px] z-10 flex flex-col items-start">
                    {/* Nome completo */}
                    <h2 className="text-[18px] font-[800] text-black uppercase tracking-tight leading-none whitespace-nowrap max-w-[310px] truncate">
                      {fullName}
                    </h2>

                    {/* Curso (4px abaixo do nome / à direita na tela) */}
                    <p className="text-[14.5px] font-[400] text-slate-700 uppercase tracking-wide leading-none whitespace-nowrap max-w-[310px] truncate mt-[4px]">
                      {profile.curso || 'CIÊNCIAS ECONÔMICAS'}
                    </p>

                    {/* RA (afastado cerca de 2x a altura de uma linha, sans-serif normal, mesmo tamanho do curso) */}
                    <p className="text-[14.5px] font-[400] text-slate-700 font-sans tracking-wide leading-none whitespace-nowrap mt-[30px]">
                      {profile.matricula.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="verso"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2"
              style={{
                width: 'var(--card-w)',
                height: 'var(--card-h)',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                transformOrigin: 'center',
              }}
            >
              {/* ========================================================
                  VERSO DA CARTEIRINHA (85,6 x 54 mm, ROTATED 90°)
                  ======================================================== */}
              <div
                className="relative w-full h-full rounded-2xl shadow-xl overflow-hidden border border-slate-300/80 p-5 flex flex-col justify-between"
                style={{
                  background:
                    'radial-gradient(circle at 60% 40%, #FFFFFF 0%, #F6F7F9 50%, #ECEEF2 100%)',
                  boxShadow: '0 12px 30px -6px rgba(0, 0, 0, 0.16), 0 4px 10px -2px rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Top Row: Sponsor area, Memorial message, and QR Code */}
                <div className="flex items-start justify-between gap-3">
                  {/* Left: 28x28 Sponsor Logo + Santander Universidades */}
                  <div className="flex flex-col gap-1.5 shrink-0 max-w-[155px]">
                    <div className="flex items-center gap-2">
                      <div className="w-[28px] h-[28px] rounded border border-slate-300 bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                        {profile.sponsorLogoUrl ? (
                          <img
                            src={profile.sponsorLogoUrl}
                            alt="Logo Patrocinador"
                            className="w-full h-full object-contain"
                          />
                        ) : null}
                      </div>

                      <span className="text-[12px] font-bold text-[#EC0000] font-sans leading-tight">
                        Santander Universidades
                      </span>
                    </div>

                    {/* Two micro lines with round icons */}
                    <div className="space-y-0.5 pl-0.5 mt-0.5">
                      <div className="flex items-center gap-1.5 text-[8.5px] text-slate-600 font-medium">
                        <OfficialAppLogo size={12} className="shrink-0" />
                        <span className="truncate">app universitário</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[8.5px] text-slate-600 font-medium">
                        <span className="w-3 h-3 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[7px] shrink-0">
                          f
                        </span>
                        <span className="truncate">grupo da turma</span>
                      </div>
                    </div>
                  </div>

                  {/* Center: Memorial message block in bold */}
                  <div className="flex-1 bg-white/70 border border-slate-200 rounded-xl p-2.5 shadow-2xs">
                    <p className="text-[10px] font-bold text-slate-800 leading-snug">
                      Patrocínio afetivo: Santander Universidades, parceiro de tantos momentos da nossa
                      turma. Se encontrada, devolva com uma coxinha da cantina.
                    </p>
                  </div>

                  {/* Right: Decorative QR Code */}
                  <div className="flex flex-col items-center shrink-0">
                    <QRCodeVector size={56} onClick={onOpenQR} />
                  </div>
                </div>

                {/* Bottom Row: Full name and Barcode with digits underneath */}
                <div className="flex items-end justify-between pt-3 border-t border-slate-200/80">
                  <div className="max-w-[210px]">
                    <h3 className="text-xs font-black text-slate-900 uppercase truncate">
                      {fullName}
                    </h3>
                  </div>

                  {/* Barcode vector with digits */}
                  <div className="w-[200px]">
                    <BarcodeVector value={cleanRA} height={42} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Two Pagination Dots (Frente & Verso) - Centered underneath without rotation */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <button
          onClick={() => setCurrentPage('frente')}
          className={`h-2.5 rounded-full transition-all cursor-pointer ${
            currentPage === 'frente' ? 'w-6 bg-[#3B82F6]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
          }`}
          aria-label="Página 1: Frente"
        />
        <button
          onClick={() => setCurrentPage('verso')}
          className={`h-2.5 rounded-full transition-all cursor-pointer ${
            currentPage === 'verso' ? 'w-6 bg-[#3B82F6]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
          }`}
          aria-label="Página 2: Verso"
        />
      </div>
    </div>
  );
};

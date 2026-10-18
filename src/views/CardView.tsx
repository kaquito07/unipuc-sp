import React from 'react';
import { StudentProfile } from '../types/student';
import { CardRotated } from '../components/CardRotated';
import { Sparkles, Share2, Download, Copy, Check } from 'lucide-react';

interface CardViewProps {
  profile: StudentProfile;
  onOpenQR: () => void;
  onOpenEditModal: () => void;
}

export const CardView: React.FC<CardViewProps> = ({
  profile,
  onOpenQR,
  onOpenEditModal,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyRA = () => {
    navigator.clipboard?.writeText(profile.matricula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center py-2 pb-24 animate-fade-in">
      {/* Rotated Digital Card Carousel */}
      <CardRotated
        profile={profile}
        onOpenQR={onOpenQR}
        onEditProfile={onOpenEditModal}
      />

      {/* Auxiliary actions bar */}
      <div className="w-full max-w-sm px-4 mt-2 space-y-2">
        <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Matrícula do Aluno
            </span>
            <span className="text-sm font-black text-slate-800 font-mono">
              {profile.matricula}
            </span>
          </div>

          <button
            onClick={handleCopyRA}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            {copied ? 'Copiado!' : 'Copiar RA'}
          </button>
        </div>

        {/* Nostalgic tip badge */}
        <div className="text-center p-3 rounded-xl bg-blue-50/70 border border-blue-100/80">
          <p className="text-xs text-blue-900 leading-snug">
            💡 Dica: No portal antigo, a carteirinha ficava <strong>deitada a 90°</strong> na tela
            para apresentar na catraca e na portaria do TUCA / Monte Alegre!
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { X, GraduationCap, Heart, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentProfile } from '../types/student';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#F2B705', '#2B2F5B', '#EC0000', '#10B981'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShare = () => {
    const text = `🎓 Carteirinha Nostalgia: ${profile.nome} ${profile.sobrenome} - ${profile.curso} (${profile.matricula}). "4ºB"`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Banner with college blue gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 text-white text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
          
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-3 shadow-inner ring-4 ring-white/10">
            <GraduationCap size={32} className="text-amber-300" />
          </div>

          <h2 className="text-xl font-bold tracking-tight">4ºB</h2>
          <p className="text-blue-100 text-xs mt-1">Leitura de QR Code Concluída</p>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-24 rounded-lg overflow-hidden border-2 border-[#2B2F5B] shadow-md bg-slate-100 mb-3">
              <img
                src={profile.fotoUrl}
                alt={profile.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
              {profile.nome} {profile.sobrenome}
            </h3>
            <span className="text-xs font-semibold text-blue-600 uppercase mt-0.5">
              {profile.curso}
            </span>
            <span className="text-xs text-slate-500 font-mono mt-0.5">
              Matrícula: {profile.matricula}
            </span>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-3.5 text-xs text-amber-900 leading-relaxed text-left flex items-start gap-2.5">
            <Heart size={16} className="text-amber-600 shrink-0 mt-0.5 fill-amber-500" />
            <p>
              Patrocínio afetivo: Santander Universidades, parceiro de tantos momentos da nossa turma.
              Se encontrada, devolva com uma coxinha da cantina.
            </p>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={handleShare}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
              {copied ? 'Copiado!' : 'Compartilhar'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-md shadow-blue-500/20 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

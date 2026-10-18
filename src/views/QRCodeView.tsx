import React from 'react';
import { StudentProfile } from '../types/student';
import { QRCodeVector } from '../components/QRCodeVector';
import { GraduationCap, Sparkles, Smartphone, Share2, Check } from 'lucide-react';

interface QRCodeViewProps {
  profile: StudentProfile;
  onOpenQRModal: () => void;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({ profile, onOpenQRModal }) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    const text = `🎓 Carteirinha Nostalgia: ${profile.nome} ${profile.sobrenome} - ${profile.curso} (${profile.matricula}). "4ºB"`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 space-y-5 pb-24 flex flex-col items-center animate-fade-in text-center">
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Acesso Rápido com QR Code
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          O mesmo código decorativo impresso no verso da sua carteirinha
        </p>
      </div>

      {/* Main QR Card */}
      <div className="w-full max-w-xs bg-white rounded-3xl p-6 shadow-md border border-slate-200/90 flex flex-col items-center">
        {/* Student Mini Avatar Lockup */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100 w-full">
          <div className="w-12 h-15 rounded-md overflow-hidden border-2 border-[#2B2F5B] bg-slate-100 shrink-0 shadow-2xs">
            <img
              src={profile.fotoUrl}
              alt={profile.nome}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left flex-1 min-w-0">
            <h3 className="text-xs font-black text-slate-900 uppercase truncate">
              {profile.nome} {profile.sobrenome}
            </h3>
            <span className="text-[11px] font-semibold text-blue-600 block truncate">
              {profile.curso}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {profile.matricula}
            </span>
          </div>
        </div>

        {/* Large QR Code Display */}
        <div
          onClick={onOpenQRModal}
          className="group relative p-3 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 cursor-pointer transition-all active:scale-95 shadow-inner"
        >
          <QRCodeVector size={210} />
          
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 rounded-2xl flex items-center justify-center transition-colors pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-xs text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm transition-opacity">
              Toque para ler
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenQRModal}
          className="mt-5 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles size={14} />
          Ver
        </button>
      </div>

      {/* Instructions */}
      <div className="w-full max-w-xs bg-white/80 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Smartphone size={15} className="text-blue-600" />
          <span>Como funciona entre amigos:</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Ao apontar a câmera do celular para este QR code (ou tocar no botão acima), é
          exibida a mensagem oficial de recordação da nossa turma:
        </p>
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 text-center">
          "4ºB"
        </div>
      </div>

      {/* Share / Copy Action */}
      <button
        onClick={handleShare}
        className="w-full max-w-xs py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
        {copied ? 'Copiado para a área de transferência!' : 'Compartilhar dados com a turma'}
      </button>
    </div>
  );
};

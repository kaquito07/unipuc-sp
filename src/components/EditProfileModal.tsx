import React, { useState } from 'react';
import { X, Camera, Check, Sparkles, BookOpen, Hash, Calendar, User } from 'lucide-react';
import { StudentProfile } from '../types/student';
import { PhotoCropperModal } from './PhotoCropperModal';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updated: StudentProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [nome, setNome] = useState(profile.nome);
  const [sobrenome, setSobrenome] = useState(profile.sobrenome);
  const [curso, setCurso] = useState(profile.curso || 'Ciências Econômicas');
  const [matricula, setMatricula] = useState(profile.matricula || 'RA00223241');
  const [validadeMes, setValidadeMes] = useState(profile.validade ? profile.validade.split('/')[0] : '06');
  const [validadeAno, setValidadeAno] = useState(profile.validade ? profile.validade.split('/')[1] : '2026');
  const [fotoUrl, setFotoUrl] = useState(profile.fotoUrl);
  
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedRA = matricula.toUpperCase().startsWith('RA')
      ? matricula.toUpperCase()
      : `RA${matricula.trim()}`;

    const updated: StudentProfile = {
      ...profile,
      nome: nome.trim(),
      sobrenome: sobrenome.trim(),
      curso: curso.trim(),
      matricula: formattedRA,
      validade: `${validadeMes}/${validadeAno}`,
      fotoUrl,
    };
    onSave(updated);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Editar Dados da Carteirinha</h3>
              <p className="text-xs text-slate-500">Altere informações ou troque sua foto</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
            {/* Foto preview & change button */}
            <div className="flex items-center gap-4 p-3 bg-blue-50/60 rounded-2xl border border-blue-100">
              <div className="w-16 h-20 rounded-lg overflow-hidden border-2 border-[#2B2F5B] bg-white shrink-0 shadow-sm relative group">
                <img
                  src={fotoUrl}
                  alt="Foto 3x4 do Aluno"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-800 block mb-1">
                  Foto 3x4 do Aluno
                </span>
                <button
                  type="button"
                  onClick={() => setIsCropperOpen(true)}
                  className="flex items-center gap-1.5 py-1.5 px-3 bg-white hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
                >
                  <Camera size={13} />
                  Trocar / Recortar Foto
                </button>
              </div>
            </div>

            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Kaique"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <User size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sobrenome
                </label>
                <input
                  type="text"
                  required
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  placeholder="Ex: Bezerra"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            {/* Curso */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Curso
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  placeholder="Ex: Ciências Econômicas"
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <BookOpen size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
              </div>
            </div>

            {/* Matrícula */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Número de Matrícula (RA)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Ex: RA00223241"
                  className="w-full pl-8 pr-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <Hash size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
              </div>
            </div>

            {/* Validade seletor MM / AAAA */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Validade da Carteirinha (Mês/Ano)
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={validadeMes}
                  onChange={(e) => setValidadeMes(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-mono cursor-pointer"
                >
                  {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <span className="text-slate-400 font-bold">/</span>
                <select
                  value={validadeAno}
                  onChange={(e) => setValidadeAno(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-mono cursor-pointer"
                >
                  {['2024', '2025', '2026', '2027', '2028', '2029', '2030'].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check size={14} />
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Cropper submodal */}
      <PhotoCropperModal
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        initialImage={fotoUrl}
        onCropComplete={(newCropped) => setFotoUrl(newCropped)}
      />
    </>
  );
};

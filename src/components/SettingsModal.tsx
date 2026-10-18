import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Check, Upload, Trash2, LogOut, User, Hash, Calendar, Building } from 'lucide-react';
import { StudentProfile } from '../types/student';
import { formatRA } from '../utils/storage';
import { PhotoCropperModal } from './PhotoCropperModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updated: StudentProfile) => void;
  onLogout: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onLogout,
}) => {
  const [nome, setNome] = useState(profile.nome);
  const [sobrenome, setSobrenome] = useState(profile.sobrenome);
  const [curso, setCurso] = useState(profile.curso || 'Ciências Econômicas');
  const [matricula, setMatricula] = useState(profile.matricula || '');
  
  const initialMes = profile.validade?.includes('/') ? profile.validade.split('/')[0] : '06';
  const initialAno = profile.validade?.includes('/') ? profile.validade.split('/')[1] : '2026';
  const [validadeMes, setValidadeMes] = useState(initialMes);
  const [validadeAno, setValidadeAno] = useState(initialAno);

  const [fotoUrl, setFotoUrl] = useState(profile.fotoUrl);
  const [sponsorLogoUrl, setSponsorLogoUrl] = useState<string | null>(profile.sponsorLogoUrl || null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const sponsorInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setNome(profile.nome);
      setSobrenome(profile.sobrenome);
      setCurso(profile.curso || 'Ciências Econômicas');
      setMatricula(profile.matricula || '');
      const parts = profile.validade ? profile.validade.split('/') : ['06', '2026'];
      setValidadeMes(parts[0] || '06');
      setValidadeAno(parts[1] || '2026');
      setFotoUrl(profile.fotoUrl);
      setSponsorLogoUrl(profile.sponsorLogoUrl || null);
      setErrorMsg('');
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSponsorUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSponsorLogoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSponsor = () => {
    setSponsorLogoUrl(null);
    if (sponsorInputRef.current) sponsorInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!nome.trim() || !sobrenome.trim()) {
      setErrorMsg('Nome e Sobrenome são obrigatórios.');
      return;
    }

    if (!fotoUrl) {
      setErrorMsg('A foto de perfil 3x4 é obrigatória.');
      return;
    }

    if (!matricula.trim()) {
      setErrorMsg('O código do RA é obrigatório.');
      return;
    }

    const updatedProfile: StudentProfile = {
      ...profile,
      nome: nome.trim(),
      sobrenome: sobrenome.trim(),
      curso: curso.trim() || 'Ciências Econômicas',
      matricula: formatRA(matricula),
      validade: `${validadeMes}/${validadeAno}`,
      fotoUrl,
      sponsorLogoUrl,
    };

    onSave(updatedProfile);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Configurações</h3>
              <p className="text-xs text-slate-500">Edite seus dados ou saia da conta</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            {/* Foto de perfil (mostra a atual, permite trocar com upload e recorte 3x4) */}
            <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center gap-3.5">
              <div className="w-16 h-20 rounded-lg overflow-hidden border-2 border-[#2B2F5B] bg-white shrink-0 shadow-xs">
                {fotoUrl ? (
                  <img
                    src={fotoUrl}
                    alt="Foto do Aluno"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                    Sem foto
                  </div>
                )}
              </div>

              <div className="flex-1">
                <span className="text-xs font-bold text-slate-800 block">
                  Foto de Perfil (3x4)
                </span>
                <p className="text-[11px] text-slate-500 mb-1.5">
                  Foto oficial da carteirinha
                </p>
                <button
                  type="button"
                  onClick={() => setIsCropperOpen(true)}
                  className="flex items-center gap-1.5 py-1.5 px-3 bg-white hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Camera size={13} />
                  Trocar / Recortar Foto
                </button>
              </div>
            </div>

            {/* Nome e Sobrenome */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  <User size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sobrenome *
                </label>
                <input
                  type="text"
                  required
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  placeholder="Sobrenome"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            {/* Código do RA */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Código do RA *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Ex: 00223241 ou RA00223241"
                  className="w-full pl-8 pr-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <Hash size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
              </div>
            </div>

            {/* Validade (mês e ano) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Validade (Mês/Ano) *
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

            {/* Logo do banco/patrocinador (upload com pré-visualização e botão "Remover") */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-1">
                Logo do Banco / Patrocinador
              </span>
              <p className="text-[11px] text-slate-500 mb-2.5">
                Exibido no quadradinho à esquerda de "Santander Universidades" no verso.
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-2xs">
                  {sponsorLogoUrl ? (
                    <img
                      src={sponsorLogoUrl}
                      alt="Logo Patrocinador"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-[9px] font-bold text-slate-300">Vazio</span>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <input
                    ref={sponsorInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSponsorUpload}
                  />

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => sponsorInputRef.current?.click()}
                      className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                    >
                      <Upload size={12} />
                      {sponsorLogoUrl ? 'Trocar Logo' : 'Enviar Logo'}
                    </button>

                    {sponsorLogoUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveSponsor}
                        className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} />
                        Remover
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Salvar e Cancelar */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check size={14} />
                Salvar
              </button>
            </div>

            {/* Botão Sair (Logout sem apagar dados) */}
            <div className="pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <LogOut size={14} />
                Sair da Conta (Logout)
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Cropper Modal for photo */}
      <PhotoCropperModal
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        initialImage={fotoUrl}
        onCropComplete={(newCropped) => setFotoUrl(newCropped)}
      />
    </>
  );
};

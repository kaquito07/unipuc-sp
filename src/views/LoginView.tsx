import React, { useState, useRef } from 'react';
import { LogIn, UserPlus, Camera, Upload, Trash2, AlertCircle, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types/student';
import { findProfile, saveProfileToStorage, formatRA } from '../utils/storage';
import { PhotoCropperModal } from '../components/PhotoCropperModal';
import { AcademicCrest } from '../components/AcademicCrest';

interface LoginViewProps {
  onLoginSuccess: (profile: StudentProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  // Mode: 'login' | 'first_access'
  const [mode, setMode] = useState<'login' | 'first_access'>('login');

  // Input fields - ALL START COMPLETELY EMPTY AS REQUESTED
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [validadeMes, setValidadeMes] = useState('06');
  const [validadeAno, setValidadeAno] = useState('2026');
  const [fotoUrl, setFotoUrl] = useState('');
  const [sponsorLogoUrl, setSponsorLogoUrl] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const sponsorInputRef = useRef<HTMLInputElement | null>(null);

  // 1. LOGIN SUBMIT
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nome.trim() || !sobrenome.trim()) {
      setErrorMessage('Por favor, informe seu Nome e Sobrenome para entrar.');
      return;
    }

    const matchedProfile = findProfile(nome, sobrenome);

    if (matchedProfile) {
      // Profile exists! Enters directly into Carteirinha Digital
      onLoginSuccess(matchedProfile);
    } else {
      // Profile does not exist: opens "Primeiro acesso" with Nome and Sobrenome preserved
      setMode('first_access');
      setErrorMessage('');
    }
  };

  // 2. FIRST ACCESS SUBMIT
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Strict validation with clear Portuguese messages
    if (!nome.trim()) {
      setErrorMessage('O Nome é obrigatório.');
      return;
    }
    if (!sobrenome.trim()) {
      setErrorMessage('O Sobrenome é obrigatório.');
      return;
    }
    if (!fotoUrl) {
      setErrorMessage('A foto de perfil 3x4 é obrigatória. Clique para carregar e recortar sua foto.');
      return;
    }
    if (!matricula.trim()) {
      setErrorMessage('O número de matrícula (RA) é obrigatório.');
      return;
    }
    if (!validadeMes || !validadeAno) {
      setErrorMessage('A validade (mês e ano) é obrigatória.');
      return;
    }

    const formattedMatricula = formatRA(matricula);

    const newProfile: StudentProfile = {
      nome: nome.trim(),
      sobrenome: sobrenome.trim(),
      curso: 'Ciências Econômicas',
      matricula: formattedMatricula,
      validade: `${validadeMes}/${validadeAno}`,
      semestre: '5º semestre',
      fotoUrl,
      sponsorLogoUrl,
      faculdadeNome: 'PUC-SP',
    };

    saveProfileToStorage(newProfile);
    onLoginSuccess(newProfile);
  };

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

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center p-4">
      {/* Container */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden flex flex-col">
        {/* Blue Header Branding */}
        <div className="bg-[#3B82F6] px-6 pt-7 pb-6 text-white text-center">
          <div className="w-13 h-13 bg-white/15 backdrop-blur-xs rounded-2xl mx-auto flex items-center justify-center mb-2.5 shadow-inner ring-1 ring-white/20">
            <AcademicCrest size={36} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Carteirinha Nostalgia</h1>
          <p className="text-blue-100 text-xs mt-1">Recordações e brincadeiras da nossa turma</p>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {mode === 'login' ? (
            /* ================= TELA DE LOGIN ================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="text-center mb-1">
                <h2 className="text-sm font-bold text-slate-800">Acesse sua Carteirinha</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Digite seu Nome e Sobrenome para entrar
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
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
                  placeholder="Seu sobrenome"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <LogIn size={15} />
                Entrar
              </button>

              <p className="text-center text-[11px] text-slate-400 pt-2">
                Se ainda não tiver cadastro, abriremos o formulário de primeiro acesso.
              </p>
            </form>
          ) : (
            /* ================= PRIMEIRO ACESSO ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="text-center mb-1">
                <h2 className="text-sm font-bold text-slate-800">Primeiro Acesso</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Preencha os dados obrigatórios para criar sua carteirinha
                </p>
              </div>

              {/* Nome e Sobrenome (preenchidos com o que foi digitado) */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
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

              {/* Foto de perfil (upload com recorte 3x4, OBRIGATÓRIA) */}
              <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-18 rounded-md overflow-hidden border-2 border-[#2B2F5B] bg-white shrink-0 shadow-xs flex items-center justify-center">
                    {fotoUrl ? (
                      <img
                        src={fotoUrl}
                        alt="Foto do Aluno"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold text-center px-1">
                        Foto 3x4
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-800 block">
                      Foto de Perfil (3x4) *
                    </span>
                    <p className="text-[10.5px] text-slate-500 mb-1.5 leading-tight">
                      Obrigatória para a frente da carteirinha
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCropperOpen(true)}
                      className="flex items-center gap-1.5 py-1 px-2.5 bg-white hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      <Camera size={12} />
                      {fotoUrl ? 'Trocar Foto' : 'Carregar e Recortar Foto'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Código do RA */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Código do RA *
                </label>
                <input
                  type="text"
                  required
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Ex: 00223241 (adiciona RA automaticamente)"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              {/* Validade (Mês e Ano) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
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

              {/* Logo do banco/patrocinador (upload opcional) */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-800 block mb-0.5">
                  Logo do Banco / Patrocinador (Opcional)
                </span>
                <p className="text-[10.5px] text-slate-500 mb-2">
                  Exibido no verso ao lado de "Santander Universidades"
                </p>

                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded border border-slate-200 bg-white flex items-center justify-center p-0.5 shrink-0 overflow-hidden shadow-2xs">
                    {sponsorLogoUrl ? (
                      <img
                        src={sponsorLogoUrl}
                        alt="Logo Patrocinador"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-[9px] text-slate-300 font-bold">Vazio</span>
                    )}
                  </div>

                  <input
                    ref={sponsorInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSponsorUpload}
                  />

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => sponsorInputRef.current?.click()}
                      className="py-1 px-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs flex items-center gap-1"
                    >
                      <Upload size={12} />
                      {sponsorLogoUrl ? 'Trocar' : 'Enviar Logo'}
                    </button>
                    {sponsorLogoUrl && (
                      <button
                        type="button"
                        onClick={() => setSponsorLogoUrl(null)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remover logo"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão "Criar carteirinha e entrar" */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <UserPlus size={15} />
                Criar carteirinha e entrar
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage('');
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
                >
                  Voltar para tela de login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 3x4 Cropper Modal */}
      <PhotoCropperModal
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        initialImage={fotoUrl}
        onCropComplete={(newCropped) => setFotoUrl(newCropped)}
      />
    </div>
  );
};

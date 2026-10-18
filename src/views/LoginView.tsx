import React, { useState } from 'react';
import { LogIn, UserPlus, Sparkles, Camera, ShieldCheck, Heart } from 'lucide-react';
import { StudentProfile } from '../types/student';
import { SAMPLE_PORTRAITS, getStoredProfile, saveStoredProfile, setLoggedInState } from '../utils/storage';
import { PhotoCropperModal } from '../components/PhotoCropperModal';
import { AcademicCrest } from '../components/AcademicCrest';

interface LoginViewProps {
  onLoginSuccess: (profile: StudentProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const existingProfile = getStoredProfile();

  // Mode: 'login' or 'first_access'
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(!existingProfile);
  
  // Login fields
  const [nome, setNome] = useState(existingProfile?.nome || '');
  const [sobrenome, setSobrenome] = useState(existingProfile?.sobrenome || '');
  
  // Registration fields
  const [curso, setCurso] = useState('Ciências Econômicas');
  const [matricula, setMatricula] = useState('RA00223241');
  const [validadeMes, setValidadeMes] = useState('06');
  const [validadeAno, setValidadeAno] = useState('2026');
  const [fotoUrl, setFotoUrl] = useState<string>(SAMPLE_PORTRAITS[0].url);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const handleSimpleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nome.trim() || !sobrenome.trim()) {
      setErrorMessage('Por favor, informe seu Nome e Sobrenome.');
      return;
    }

    // Check if matching or existing
    if (existingProfile) {
      if (
        existingProfile.nome.trim().toLowerCase() === nome.trim().toLowerCase() &&
        existingProfile.sobrenome.trim().toLowerCase() === sobrenome.trim().toLowerCase()
      ) {
        setLoggedInState(true);
        onLoginSuccess(existingProfile);
        return;
      }
    }

    // If profile doesn't exist or names differ, smoothly switch to first access
    setIsFirstAccess(true);
  };

  const handleRegisterAndEnter = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nome.trim() || !sobrenome.trim()) {
      setErrorMessage('Por favor, preencha seu Nome e Sobrenome.');
      return;
    }

    const formattedRA = matricula.toUpperCase().startsWith('RA')
      ? matricula.toUpperCase()
      : `RA${matricula.trim()}`;

    const newProfile: StudentProfile = {
      nome: nome.trim(),
      sobrenome: sobrenome.trim(),
      curso: curso.trim() || 'Ciências Econômicas',
      matricula: formattedRA || 'RA00223241',
      validade: `${validadeMes}/${validadeAno}`,
      semestre: '5º semestre',
      fotoUrl: fotoUrl || SAMPLE_PORTRAITS[0].url,
      sponsorLogoUrl: existingProfile?.sponsorLogoUrl || null,
      faculdadeNome: 'PUC-SP',
    };

    saveStoredProfile(newProfile);
    setLoggedInState(true);
    onLoginSuccess(newProfile);
  };

  const fillDemoData = (presetIndex: number = 0) => {
    if (presetIndex === 0) {
      setNome('Kaique');
      setSobrenome('Bezerra Deus');
      setCurso('Administração');
      setMatricula('RA00223241');
      setValidadeMes('06');
      setValidadeAno('2026');
      setFotoUrl(SAMPLE_PORTRAITS[0].url);
    } else {
      setNome('Cindy');
      setSobrenome('R Estevam');
      setCurso('Ciências Econômicas');
      setMatricula('RA00222836');
      setValidadeMes('06');
      setValidadeAno('2026');
      setFotoUrl(SAMPLE_PORTRAITS[1].url);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col items-center justify-center p-4">
      {/* App Container */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col">
        {/* Blue Header Branding */}
        <div className="bg-[#3B82F6] px-6 pt-8 pb-6 text-white text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-white/15 backdrop-blur-xs rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-inner ring-1 ring-white/20">
            <AcademicCrest size={38} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Carteirinha Nostalgia</h1>
          <p className="text-blue-100 text-xs mt-1">Recordações e brincadeiras da nossa turma</p>
          
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[11px] text-white/90">
            <Heart size={12} className="text-pink-300 fill-pink-300" />
            <span>Dados salvos 100% no navegador</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {!isFirstAccess ? (
            /* ================= LOGIN FORM ================= */
            <form onSubmit={handleSimpleLogin} className="space-y-4">
              <div className="text-center mb-2">
                <h2 className="text-sm font-bold text-slate-800">Identifique-se na Turma</h2>
                <p className="text-xs text-slate-500">Digite seu nome para acessar a carteirinha</p>
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
                  placeholder="Ex: Kaique"
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
                  placeholder="Ex: Bezerra Deus"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <LogIn size={15} />
                Entrar na Carteirinha
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsFirstAccess(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  Primeiro acesso? Crie seu cadastro
                </button>
              </div>
            </form>
          ) : (
            /* ================= FIRST ACCESS REGISTRATION FORM ================= */
            <form onSubmit={handleRegisterAndEnter} className="space-y-3.5">
              <div className="text-center mb-1">
                <h2 className="text-sm font-bold text-slate-800">Formulário de Primeiro Acesso</h2>
                <p className="text-xs text-slate-500">Configure sua carteirinha personalizada</p>
              </div>

              {/* Photo Upload with 3x4 preview & crop */}
              <div className="flex items-center gap-3.5 p-3 bg-blue-50/70 rounded-2xl border border-blue-100">
                <div className="w-14 h-18 rounded-md overflow-hidden border-2 border-[#2B2F5B] bg-white shrink-0 shadow-xs">
                  <img
                    src={fotoUrl}
                    alt="Prévia Foto 3x4"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-slate-800 block">
                    Foto 3x4 da Carteirinha
                  </span>
                  <p className="text-[11px] text-slate-500 mb-1.5 leading-tight">
                    Recorte retrato no padrão do portal
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCropperOpen(true)}
                    className="flex items-center gap-1.5 py-1 px-2.5 bg-white hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <Camera size={12} />
                    Carregar / Ajustar Foto
                  </button>
                </div>
              </div>

              {/* Nome e Sobrenome */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Kaique"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    required
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    placeholder="Bezerra Deus"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>

              {/* Curso (Default: Ciências Econômicas) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Curso
                </label>
                <input
                  type="text"
                  required
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  placeholder="Ciências Econômicas"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              {/* Matrícula Fictícia (RA) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Número de Matrícula Fictício
                </label>
                <input
                  type="text"
                  required
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="RA00223241"
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              {/* Validade seletor Mês/Ano */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Validade (Mês/Ano)
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <UserPlus size={15} />
                Gerar Carteirinha e Entrar
              </button>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => setIsFirstAccess(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Já tem carteirinha? Voltar ao login
                </button>
              </div>
            </form>
          )}

          {/* Quick presets for testing */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mb-2">
              <Sparkles size={12} className="text-amber-500" />
              Preenchimento rápido para testar:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoData(0)}
                className="p-2 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
              >
                <span className="text-[11px] font-bold text-slate-800 block">Kaique Bezerra</span>
                <span className="text-[10px] text-slate-500">Administração</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoData(1)}
                className="p-2 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
              >
                <span className="text-[11px] font-bold text-slate-800 block">Cindy Estevam</span>
                <span className="text-[10px] text-slate-500">Ciências Econômicas</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cropper Modal */}
      <PhotoCropperModal
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        initialImage={fotoUrl}
        onCropComplete={(newCropped) => setFotoUrl(newCropped)}
      />
    </div>
  );
};

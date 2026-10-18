import React, { useRef } from 'react';
import {
  BookOpen,
  GraduationCap,
  Upload,
  Trash2,
  LogOut,
  Sparkles,
  TrendingUp,
  UserCheck,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
} from 'lucide-react';
import { StudentProfile, SubjectGrade } from '../types/student';
import { DEFAULT_SUBJECTS } from '../utils/storage';

interface HomeViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onOpenEditModal: () => void;
  onLogout: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenEditModal,
  onLogout,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Calculate semester stats
  const subjects: SubjectGrade[] = DEFAULT_SUBJECTS;
  const totalSubjects = subjects.length;
  const approvedCount = subjects.filter((s) => s.situacao === 'Aprovado').length;
  const semesterAverage = (
    subjects.reduce((acc, curr) => acc + curr.media, 0) / totalSubjects
  ).toFixed(1);
  const progressPercent = Math.round((approvedCount / totalSubjects) * 100);

  const handleSponsorUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const updated = {
            ...profile,
            sponsorLogoUrl: event.target.result as string,
          };
          onUpdateProfile(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveSponsor = () => {
    const updated = {
      ...profile,
      sponsorLogoUrl: null,
    };
    onUpdateProfile(updated);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUseMockSponsor = (type: 'santander' | 'atletica') => {
    let mockUrl = '';
    if (type === 'santander') {
      // Santander flame symbol vector
      mockUrl =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%23EC0000"/><path d="M48 20 C52 28 62 38 62 48 C62 58 54 66 45 66 C40 66 36 62 36 56 C36 46 44 38 48 20 Z" fill="%23FFFFFF"/><path d="M56 34 C64 42 72 52 72 62 C72 74 62 82 50 82 C42 82 36 78 34 72 C40 72 46 66 48 58 C50 48 54 38 56 34 Z" fill="%23FFFFFF"/></svg>';
    } else {
      // Atlética Leo vector
      mockUrl =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%231E3A8A"/><text x="50" y="58" font-size="28" font-weight="bold" fill="%23F2B705" text-anchor="middle" font-family="sans-serif">ECO</text></svg>';
    }
    const updated = {
      ...profile,
      sponsorLogoUrl: mockUrl,
    };
    onUpdateProfile(updated);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-5 space-y-5 pb-24 animate-fade-in">
      {/* Student Greeting & Profile Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/90 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-14 h-18 rounded-xl overflow-hidden border-2 border-[#2B2F5B] bg-slate-100 shadow-xs">
              <img
                src={profile.fotoUrl}
                alt={profile.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 text-white border-2 border-white shadow-xs">
              <GraduationCap size={12} />
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 block">Bem-vindo(a) de volta</span>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              Olá, {profile.nome}!
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-blue-600">
                {profile.curso || 'Ciências Econômicas'}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-medium text-slate-500">5º semestre</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenEditModal}
          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          title="Editar perfil e carteirinha"
          aria-label="Editar Perfil"
        >
          <Edit3 size={17} />
        </button>
      </div>

      {/* Summary Banner with Semester Average & Progress */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">Média Geral do Semestre</h3>
              <p className="text-[11px] text-slate-500">Notas ponderadas da turma</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-blue-600 font-mono tracking-tight">
              {semesterAverage.replace('.', ',')}
            </span>
            <span className="text-xs text-slate-400 block font-medium">de 10,0</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-slate-600">Progresso de Aprovação</span>
            <span className="text-blue-600 font-bold font-mono">
              {approvedCount} de {totalSubjects} aprovadas ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Section: Minhas Matérias */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Minhas Matérias</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Grade 5º Semestre</span>
        </div>

        <div className="space-y-2.5">
          {subjects.map((sub) => {
            const isApproved = sub.situacao === 'Aprovado';
            const isInProgress = sub.situacao === 'Em andamento';
            const isRetake = sub.situacao === 'Recuperação';

            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/90 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {sub.nome}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{sub.professor}</p>
                  </div>

                  {/* Status Tag */}
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                      isApproved
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/80'
                        : isInProgress
                        ? 'text-blue-700 bg-blue-50 border border-blue-200/80'
                        : 'text-amber-700 bg-amber-50 border border-amber-200/80'
                    }`}
                  >
                    {isApproved && <CheckCircle2 size={11} />}
                    {isInProgress && <Clock size={11} />}
                    {isRetake && <AlertCircle size={11} />}
                    {sub.situacao}
                  </span>
                </div>

                {/* Grades row */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center font-mono text-xs">
                  <div className="bg-slate-50/80 rounded-lg p-1.5 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-sans block">P1</span>
                    <span className="font-bold text-slate-800">
                      {sub.p1.toFixed(1).replace('.', ',')}
                    </span>
                  </div>

                  <div className="bg-slate-50/80 rounded-lg p-1.5 border border-slate-100">
                    <span className="text-[10px] text-slate-500 font-sans block">P2</span>
                    <span className="font-bold text-slate-800">
                      {sub.p2.toFixed(1).replace('.', ',')}
                    </span>
                  </div>

                  <div className="bg-blue-50/60 rounded-lg p-1.5 border border-blue-100">
                    <span className="text-[10px] text-blue-700 font-sans font-semibold block">
                      Média
                    </span>
                    <span className="font-bold text-blue-700">
                      {sub.media.toFixed(1).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: Configurações da Turma (Logo do Patrocinador) */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/90 space-y-3">
        <div className="flex items-center gap-2">
          <Building size={16} className="text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Configurações da Turma
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          O <strong>Logo do Patrocinador</strong> aparece no verso da carteirinha digital
          (espaço 28x28 px ao lado de Santander Universidades).
        </p>

        {/* Upload Container */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden shrink-0 shadow-2xs">
            {profile.sponsorLogoUrl ? (
              <img
                src={profile.sponsorLogoUrl}
                alt="Logo Patrocinador"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-[10px] font-bold text-slate-400 text-center">Vazio</span>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <span className="text-xs font-semibold text-slate-800 block">
              Logo do Patrocinador (PNG / JPG)
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/svg+xml"
              className="hidden"
              onChange={handleSponsorUpload}
            />

            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <Upload size={12} />
                Enviar Logo
              </button>

              {profile.sponsorLogoUrl && (
                <button
                  type="button"
                  onClick={handleRemoveSponsor}
                  className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 size={12} />
                  Remover
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick sample sponsors */}
        <div className="pt-1">
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-1.5">
            <Sparkles size={12} className="text-amber-500" />
            Ou teste com um logo pronto:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleUseMockSponsor('santander')}
              className="py-1 px-2.5 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              🔥 Santander Flame
            </button>
            <button
              onClick={() => handleUseMockSponsor('atletica')}
              className="py-1 px-2.5 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              🦁 Atlética Economia
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full py-3 px-4 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-2xl text-xs font-bold text-red-600 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <LogOut size={16} />
          Sair da Conta (Logout)
        </button>
      </div>
    </div>
  );
};

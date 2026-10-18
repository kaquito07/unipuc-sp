import React from 'react';
import { BookOpen, GraduationCap, TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StudentProfile, SubjectGrade } from '../types/student';
import { DEFAULT_SUBJECTS } from '../utils/storage';

interface HomeViewProps {
  profile: StudentProfile;
}

export const HomeView: React.FC<HomeViewProps> = ({ profile }) => {
  const subjects: SubjectGrade[] = DEFAULT_SUBJECTS;
  const totalSubjects = subjects.length;
  const approvedCount = subjects.filter((s) => s.situacao === 'Aprovado').length;
  const semesterAverage = (
    subjects.reduce((acc, curr) => acc + curr.media, 0) / totalSubjects
  ).toFixed(1);
  const progressPercent = Math.round((approvedCount / totalSubjects) * 100);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-5 space-y-4 pb-24 animate-fade-in">
      {/* Student Greeting Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/90 flex items-center gap-3.5">
        <div className="relative">
          <div className="w-14 h-18 rounded-xl overflow-hidden border-2 border-[#2B2F5B] bg-slate-100 shadow-xs">
            {profile.fotoUrl ? (
              <img
                src={profile.fotoUrl}
                alt={profile.nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-xs font-bold">
                Sem Foto
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 text-white border-2 border-white shadow-xs">
            <GraduationCap size={12} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-slate-500 block">Bem-vindo(a) de volta</span>
          <h2 className="text-lg font-bold text-slate-900 leading-snug truncate">
            Olá, {profile.nome}!
          </h2>
          <div className="flex items-center gap-2 mt-1 truncate">
            <span className="text-xs font-semibold text-blue-600 truncate">
              {profile.curso || 'Ciências Econômicas'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">5º semestre</span>
          </div>
        </div>
      </div>

      {/* Semester Average and Progress Bar */}
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
    </div>
  );
};

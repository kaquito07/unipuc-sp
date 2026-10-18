import { StudentProfile, SubjectGrade, OfferItem } from '../types/student';

export const DEFAULT_SUBJECTS: SubjectGrade[] = [
  {
    id: '1',
    nome: 'Macroeconomia II',
    professor: 'Prof. Dr. Arnaldo Silveira',
    p1: 7.5,
    p2: 8.0,
    media: 7.8,
    situacao: 'Aprovado',
  },
  {
    id: '2',
    nome: 'Microeconomia III',
    professor: 'Profa. Dra. Cecília Meireles',
    p1: 6.0,
    p2: 7.0,
    media: 6.5,
    situacao: 'Aprovado',
  },
  {
    id: '3',
    nome: 'Econometria I',
    professor: 'Prof. Carlos Eduardo Prado',
    p1: 5.5,
    p2: 6.5,
    media: 6.0,
    situacao: 'Em andamento',
  },
  {
    id: '4',
    nome: 'Economia Brasileira Contemporânea',
    professor: 'Profa. Lúcia Guimarães',
    p1: 8.5,
    p2: 9.0,
    media: 8.8,
    situacao: 'Aprovado',
  },
  {
    id: '5',
    nome: 'História do Pensamento Econômico',
    professor: 'Prof. Roberto Simonsen',
    p1: 7.0,
    p2: 6.0,
    media: 6.5,
    situacao: 'Aprovado',
  },
  {
    id: '6',
    nome: 'Estatística Econômica',
    professor: 'Prof. Marcelo Faria',
    p1: 4.5,
    p2: 5.5,
    media: 5.0,
    situacao: 'Recuperação',
  },
];

export const DEFAULT_OFFERS: OfferItem[] = [
  {
    id: '1',
    titulo: 'Xerox Ilimitado',
    subtitulo: 'Só não vale o livro inteiro do Mantega',
    categoria: 'Centro Acadêmico',
    desconto: '100% OFF',
    codigo: 'XEROX-NAO-PARA',
    descricao: 'Imprima resumos, provas antigas e folhas de presença sem gastar as moedas do lanche.',
    icone: 'printer',
  },
  {
    id: '2',
    titulo: 'Coxinha da Cantina em Dobro',
    subtitulo: 'Especial pós-prova de Econometria',
    categoria: 'Cantina do Tio',
    desconto: '2 por 1',
    codigo: 'COXINHA-TERAPIA',
    descricao: 'A clássica coxinha com catupiry crocante que curou todas as notas vermelhas da turma.',
    icone: 'utensils',
  },
  {
    id: '3',
    titulo: 'Café Coado da Tia com Refil Eterno',
    subtitulo: 'Garantia de sobrevivência na aula das 7h30',
    categoria: 'Copa dos Alunos',
    desconto: 'Grátis',
    codigo: 'CAFE-NOTURNO',
    descricao: 'Café quente no copo americano com açúcar demerara pra aguentar até o almoço.',
    icone: 'coffee',
  },
  {
    id: '4',
    titulo: 'Choro pro Professor na Revisão',
    subtitulo: 'Arredondar 4,8 para 5,0 garantido',
    categoria: 'Secretaria Acadêmica',
    desconto: '+0,5 ponto',
    codigo: 'CHORADEIRA-P2',
    descricao: 'Argumento infalível: "Professor, eu participei de todas as aulas no fundão!"',
    icone: 'award',
  },
  {
    id: '5',
    titulo: 'Micro-ondas sem Fila no Almoço',
    subtitulo: 'Passe VIP para esquentar a marmita',
    categoria: 'Refeitório',
    desconto: 'VIP',
    codigo: 'MARMITA-VIP',
    descricao: 'Evite a fila de 40 minutos entre 12h e 12h45 e coma seu almoço enquanto ainda está quente.',
    icone: 'clock',
  },
  {
    id: '6',
    titulo: 'Copo Extra no Chopão de Quinta',
    subtitulo: 'Tradição do bar da esquina',
    categoria: 'Integração',
    desconto: 'Refil Amigo',
    codigo: 'CHOPAO-PUC',
    descricao: 'Aquele brinde merecido aos sobreviventes da semana com o clássico amendoim salgado.',
    icone: 'beer',
  },
];

const STORAGE_KEYS = {
  PROFILES_MAP: 'carteirinha_nostalgia_profiles_map',
  ACTIVE_USER_ID: 'carteirinha_nostalgia_active_user_id',
  OFFERS: 'carteirinha_nostalgia_offers',
};

export const getProfileKey = (nome: string, sobrenome: string): string => {
  return `${nome.trim().toLowerCase()}_${sobrenome.trim().toLowerCase()}`;
};

export const formatRA = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^ra/i.test(trimmed)) {
    return `RA${trimmed.slice(2).trim()}`;
  }
  return `RA${trimmed}`;
};

export const getAllStoredProfiles = (): Record<string, StudentProfile> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES_MAP);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const findProfile = (nome: string, sobrenome: string): StudentProfile | null => {
  const key = getProfileKey(nome, sobrenome);
  const profiles = getAllStoredProfiles();
  return profiles[key] || null;
};

export const saveProfileToStorage = (profile: StudentProfile): void => {
  try {
    const key = getProfileKey(profile.nome, profile.sobrenome);
    const profiles = getAllStoredProfiles();
    profiles[key] = profile;
    localStorage.setItem(STORAGE_KEYS.PROFILES_MAP, JSON.stringify(profiles));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, key);
  } catch (e) {
    console.error('Error saving profile to storage', e);
  }
};

export const getActiveProfile = (): StudentProfile | null => {
  try {
    const activeKey = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID);
    if (!activeKey) return null;
    const profiles = getAllStoredProfiles();
    return profiles[activeKey] || null;
  } catch {
    return null;
  }
};

export const setActiveUserId = (nome: string, sobrenome: string): void => {
  try {
    const key = getProfileKey(nome, sobrenome);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, key);
  } catch (e) {
    console.error('Error setting active user', e);
  }
};

export const clearActiveSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
  } catch (e) {
    console.error('Error clearing active session', e);
  }
};

export const getStoredOffers = (): OfferItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFERS);
    if (!raw) return DEFAULT_OFFERS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_OFFERS;
  }
};

export const saveStoredOffers = (offers: OfferItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  } catch (e) {
    console.error('Error saving offers', e);
  }
};

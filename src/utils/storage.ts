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

// High quality sample 3x4 portraits as SVG data URIs
export const SAMPLE_PORTRAITS = [
  {
    id: 'aluno1',
    label: 'Foto Universitário (Masculino)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23dbeafe"/><stop offset="100%" stop-color="%23bfdbfe"/></linearGradient></defs><rect width="300" height="400" fill="url(%23bg)"/><circle cx="150" cy="140" r="65" fill="%23fbcfe8"/><path d="M90 120 C90 70 210 70 210 120 C210 85 180 65 150 65 C120 65 90 85 90 120 Z" fill="%23475569"/><circle cx="130" cy="135" r="6" fill="%231e293b"/><circle cx="170" cy="135" r="6" fill="%231e293b"/><path d="M135 165 Q150 178 165 165" stroke="%23be185d" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M70 380 C70 250 230 250 230 380 Z" fill="%231e3a8a"/><polygon points="135,250 150,290 165,250 150,240" fill="%23ffffff"/><polygon points="144,285 156,285 152,360 148,360" fill="%23dc2626"/></svg>',
  },
  {
    id: 'aluna1',
    label: 'Foto Universitária (Feminina)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fed7aa"/><stop offset="100%" stop-color="%23fdba74"/></linearGradient></defs><rect width="300" height="400" fill="url(%23bg)"/><path d="M80 140 C80 50 220 50 220 140 C220 230 230 270 230 280 L70 280 C70 270 80 230 80 140 Z" fill="%23334155"/><circle cx="150" cy="140" r="65" fill="%23fed7aa"/><circle cx="130" cy="135" r="6" fill="%231e293b"/><circle cx="170" cy="135" r="6" fill="%231e293b"/><path d="M135 165 Q150 180 165 165" stroke="%23c2410c" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M70 380 C70 250 230 250 230 380 Z" fill="%230284c7"/><circle cx="150" cy="270" r="16" fill="%23fcd34d"/></svg>',
  },
];

const STORAGE_KEYS = {
  USER_PROFILE: 'carteirinha_nostalgia_user_profile',
  IS_LOGGED_IN: 'carteirinha_nostalgia_logged_in',
  OFFERS: 'carteirinha_nostalgia_offers',
  REGISTERED_USERS: 'carteirinha_nostalgia_registered_users',
};

export const getStoredProfile = (): StudentProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveStoredProfile = (profile: StudentProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to localStorage', e);
  }
};

export const isUserLoggedIn = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
  } catch {
    return false;
  }
};

export const setLoggedInState = (loggedIn: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, loggedIn ? 'true' : 'false');
  } catch (e) {
    console.error('Error setting login state', e);
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

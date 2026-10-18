export interface SubjectGrade {
  id: string;
  nome: string;
  professor: string;
  p1: number;
  p2: number;
  media: number;
  situacao: 'Aprovado' | 'Em andamento' | 'Recuperação';
}

export interface StudentProfile {
  nome: string;
  sobrenome: string;
  curso: string;
  matricula: string;
  validade: string; // MM/AAAA
  semestre: string;
  fotoUrl: string;
  sponsorLogoUrl?: string | null;
  faculdadeNome?: string;
}

export interface OfferItem {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: string;
  desconto: string;
  codigo: string;
  descricao: string;
  icone: string;
  resgatado?: boolean;
}

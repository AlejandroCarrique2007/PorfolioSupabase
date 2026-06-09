export interface IFormacionRegistro {
  id: number;
  nombre: string;
  descripcion: string | null;
  categoria: string | null;
  plataforma: string | null;
  horas: number | null;
  estado: string | null;
  calificacion: number | null;
  imagen_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface IDistribuidor {
  id: number;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string | null;
  pais: string | null;
  activo: boolean;
  creado_en: string | null;
}

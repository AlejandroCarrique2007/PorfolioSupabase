export interface IFormacionAcademica {
    id: number;
    nivel: string;
    centro: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    detalles?: string[]; 
}

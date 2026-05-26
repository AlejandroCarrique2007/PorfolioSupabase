import { supabase } from "../../utils/supabase"; // Asegúrate de que esté en utils
import type { IFormacionAcademica } from "../../interfaces/IFormacion_Academica";

export const getFormacion = async (): Promise<IFormacionAcademica[]> => {
    const { data, error } = await supabase
        .from('Formacion_Academica') // El nombre exacto de tu tabla en Supabase
        .select('*');

    if (error) {
        console.error("Error al obtener formación:", error.message);
        return [];
    }

    return data as IFormacionAcademica[];
};

import { supabase } from "../../utils/supabase";
import type { IFormacionAcademica } from "../../interfaces/IFormacion_Academica";

export const getFormacionAcademicaById = async (id: string): Promise<IFormacionAcademica | null> => {
    const { data, error } = await supabase  
        .from('Formacion_Academica')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error al obtener el registro académico:", error);
        return null;
    }
    return data;
};

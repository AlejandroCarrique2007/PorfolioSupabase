import { supabase } from "../../utils/supabase";
import type { IFormacion } from "../../interfaces/IFormacion";

export const getFormacion = async (): Promise<IFormacion[]> => {
    const { data, error } = await supabase
        .from('Formacion')
        .select('*');

    if (error) {
        console.error('Error al obtener formación:', error.message);
        return [];
    }

    return data || [];
};

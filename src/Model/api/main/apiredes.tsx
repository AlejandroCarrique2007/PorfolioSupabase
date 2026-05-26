import { supabase } from "../../utils/supabase";
import type { IRedes } from "../../interfaces/IRedes";

export const getRedes = async (): Promise<IRedes[]> => {
    const { data, error } = await supabase
        .from('Redes')
        .select('*');

    if (error) {
        console.error('Error al obtener redes:', error.message);
        return [];
    }

    return data || [];
};

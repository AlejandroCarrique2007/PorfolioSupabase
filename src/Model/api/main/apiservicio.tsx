import { supabase } from "../../utils/supabase";
import type { IServicio } from "../../interfaces/IServicio";

export const getServicios = async (): Promise<IServicio[]> => {
    const { data, error } = await supabase
        .from('Servicios')
        .select('*');

    if (error) {
        console.error('Error al obtener servicios:', error.message);
        return [];
    }

    return data || [];
};

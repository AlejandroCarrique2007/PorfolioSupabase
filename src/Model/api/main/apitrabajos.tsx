import { supabase } from "../../utils/supabase";
import type { ITrabajo } from "../../interfaces/ITrabajo";

export const getTrabajos = async (): Promise<ITrabajo[]> => {
    const { data, error } = await supabase
        .from('Trabajos')
        .select('*');

    if (error) {
        console.error('Error al obtener trabajos:', error.message);
        return [];
    }

    return data || [];
};

import { supabase } from "../../utils/supabase";
import type { ITrabajo } from "../../interfaces/ITrabajo";

export const getTrabajoPorId = async (id: string | number): Promise<ITrabajo | null> => {
    const { data, error } = await supabase
        .from('Trabajos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error al obtener el detalle del trabajo:', error.message);
        return null;
    }

    return data;
};

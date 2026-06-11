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

export const updateTrabajo = async (id: number, payload: Partial<ITrabajo>) => {
    return await supabase
        .from('Trabajos')
        .update(payload)
        .eq('id', id)
        .select();
};

export const deleteTrabajo = async (id: number) => {
    return await supabase
        .from('Trabajos')
        .delete()
        .eq('id', id);
};

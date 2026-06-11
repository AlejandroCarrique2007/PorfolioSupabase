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

export const updateServicio = async (id: number, payload: Partial<IServicio>) => {
    return await supabase
        .from('Servicios')
        .update(payload)
        .eq('id', id)
        .select();
};

export const deleteServicio = async (id: number) => {
    return await supabase
        .from('Servicios')
        .delete()
        .eq('id', id);
};

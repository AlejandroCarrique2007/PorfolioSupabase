import { supabase } from "../../utils/supabase"; 
import type { IServicio } from "../../interfaces/IServicio";

export const getServicioById = async (id: string | number): Promise<IServicio | null> => {
    const { data, error } = await supabase
        .from('Servicios') 
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error al obtener el detalle del servicio:", error.message);
        return null;
    }

    return data as IServicio;
};

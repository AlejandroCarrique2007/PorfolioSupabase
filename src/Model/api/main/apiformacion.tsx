import { supabase } from '../../utils/supabase';
import type { IFormacionRegistro } from '../../interfaces/IFormacionRegistro';

export type NewFormacionPayload = Omit<IFormacionRegistro, 'id' | 'created_at' | 'updated_at'>;

export const getFormacion = async (): Promise<IFormacionRegistro[]> => {
  const { data, error } = await supabase
    .from('formaciones')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener formación:', error.message);
    return [];
  }

  return data || [];
};

export const insertFormacion = async (payload: NewFormacionPayload) => {
  return await supabase.from('formaciones').insert([payload]);
};

import { useEffect, useState } from 'react';
import { supabase } from '../Model/utils/supabase';

export interface Red {
  id: number;
  nombre: string;
  url: string;
  icono: string | null;
  orden?: number;
  activo?: boolean;
}

export function useRedes() {
  const [redes, setRedes] = useState<Red[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRedes = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('Redes')
          .select('*')
          .eq('activo', true)
          .order('orden', { ascending: true });

        if (supabaseError) {
          setError(supabaseError.message);
        } else {
          setRedes(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchRedes();
  }, []);

  return { redes, loading, error };
}

import { useEffect, useState } from 'react';
import { supabase } from '../Model/utils/supabase';

export interface Servicio {
  id: number;
  servicio: string;
  descripcion: string;
  detalles: string[];
}

export function useServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('Servicios')
          .select('*')
          .order('id', { ascending: true });

        if (supabaseError) {
          setError(supabaseError.message);
        } else {
          setServicios(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  return { servicios, loading, error };
}

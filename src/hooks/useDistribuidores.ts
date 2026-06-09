import { useEffect, useState } from 'react';
import { supabase } from '../Model/utils/supabase';
import type { IDistribuidor } from '../Model/interfaces/IDistribuidor';

export function useDistribuidores() {
  const [distribuidores, setDistribuidores] = useState<IDistribuidor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistribuidores = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('Distribuidores')
          .select('*')
          .order('creado_en', { ascending: false });

        if (supabaseError) {
          setError(supabaseError.message);
        } else {
          setDistribuidores(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchDistribuidores();
  }, []);

  return { distribuidores, loading, error };
}

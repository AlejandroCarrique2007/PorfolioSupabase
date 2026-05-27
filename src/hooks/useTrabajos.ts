import { useEffect, useState } from 'react';
import { supabase } from '../Model/utils/supabase';

export interface Trabajo {
  id: number;
  title: string;
  date: string;
  datetime: string;
  description: string;
  href: string;
  category_href: string;
  category_title: string;
  author_imageUrl: string;
  tecnologia: string[];
}

export function useTrabajos() {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('Trabajos')
          .select('*')
          .order('date', { ascending: false });

        if (supabaseError) {
          setError(supabaseError.message);
        } else {
          setTrabajos(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchTrabajos();
  }, []);

  return { trabajos, loading, error };
}

import { useEffect, useState } from 'react';
import { supabase } from '../Model/utils/supabase';

export interface Formacion {
  id: number;
  nombre: string;
  descripcion: string | null;
  horas: number | null;
  estado: string | null;
  categoria: string | null;
  plataforma: string | null;
  calificacion: number | null;
  imagen_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useFormaciones() {
  const [formaciones, setFormaciones] = useState<Formacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormaciones = async () => {
      try {
        setLoading(true);
        const { data: formacionData, error: formacionError } = await supabase
          .from('formaciones')
          .select('*')
          .order('created_at', { ascending: false });

        const combined: Formacion[] = [];

        if (!formacionError && formacionData) {
          combined.push(...formacionData);
        }

        if (combined.length === 0) {
          if (formacionError) {
            setError(formacionError.message);
          } else {
            setFormaciones([]);
          }
        } else {
          const sorted = combined.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setFormaciones(sorted);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchFormaciones();
  }, []);

  return { formaciones, loading, error };
}

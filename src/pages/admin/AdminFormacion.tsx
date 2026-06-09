import { useEffect, useState } from 'react';
import { getFormacion } from '../../Model/api/main/apiformacion';
import type { IFormacionRegistro } from '../../Model/interfaces/IFormacionRegistro';

export default function AdminFormacion() {
  const [formaciones, setFormaciones] = useState<IFormacionRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormaciones = async () => {
      try {
        setLoading(true);
        const data = await getFormacion();
        setFormaciones(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error cargando las formaciones.');
      } finally {
        setLoading(false);
      }
    };

    loadFormaciones();
  }, []);

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Cuestionario</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900">Registros de la nueva formación</h2>
        <p className="mt-3 text-slate-600">
          En esta sección puedes revisar las respuestas enviadas desde el formulario de nueva formación.
        </p>
      </section>

      {loading ? (
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-slate-600">Cargando registros desde Supabase...</p>
        </div>
      ) : error ? (
        <div className="rounded-[32px] border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
          {error}
        </div>
      ) : formaciones.length === 0 ? (
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-slate-600">No hay registros de formación aún.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {formaciones.map((formacion) => (
            <article key={formacion.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{formacion.nombre}</h3>
                    <p className="text-sm text-slate-500">{formacion.categoria || 'Sin categoría'}</p>
                  </div>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
                    {formacion.estado || 'Sin estado'}
                  </span>
                </div>

                {formacion.descripcion && <p className="text-sm leading-6 text-slate-600">{formacion.descripcion}</p>}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Plataforma</p>
                    <p className="mt-2 text-sm text-slate-700">{formacion.plataforma || 'No indicado'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Horas</p>
                    <p className="mt-2 text-sm text-slate-700">{formacion.horas ?? 'N/A'}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Calificación</p>
                    <p className="mt-2 text-sm text-slate-700">{formacion.calificacion ?? 'Sin calificación'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Creado</p>
                    <p className="mt-2 text-sm text-slate-700">{formacion.created_at ? new Date(formacion.created_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>

                {formacion.imagen_url && (
                  <img
                    src={formacion.imagen_url}
                    alt={formacion.nombre}
                    className="mt-6 h-40 w-full rounded-3xl object-cover"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

import * as LucideIcons from 'lucide-react';
import type { ComponentType } from 'react';
import { useRedes } from '../hooks/useRedes';

const Contacto = () => {
  const { redes, loading, error } = useRedes();

  const getIcon = (iconName: string | null): ComponentType<Record<string, unknown>> | null => {
    if (!iconName) return null;
    const lookup = LucideIcons as unknown as Record<string, ComponentType<Record<string, unknown>>>;
    const candidate = lookup[iconName as string];
    return candidate || null;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <div className="mb-10 space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Contacto</p>
            <h1 className="text-4xl font-semibold text-slate-900">Servicio de equipos</h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Me dedico a la reparación, limpieza e instalación de sistemas operativos en equipos informáticos. Ofrezco soluciones prácticas para dejar tu ordenador en perfectas condiciones, ya sea mantenimiento preventivo o solución de problemas.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-[28px] border border-red-200 bg-red-50 p-4">
              <p className="text-red-700">Error al cargar las redes sociales: {error}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {loading ? (
              <div className="col-span-full text-center">
                <p className="text-slate-500">Cargando redes sociales...</p>
              </div>
            ) : (
              redes.map((red) => {
                const IconComponent = getIcon(red.icono);
                return (
                  <a
                    key={red.id}
                    href={red.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-cyan-300 hover:bg-cyan-50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                        {IconComponent && <IconComponent size={20} />}
                      </span>
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{red.nombre}</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900 break-all">{red.url}</p>
                      </div>
                    </div>
                  </a>
                );
              })
            )}
          </div>

          <div className="mt-10">
            <div className="overflow-hidden rounded-[28px] border border-slate-200">
              <iframe
                title="Mapa de Albox"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-2.424%2C37.248%2C-2.338%2C37.324&layer=mapnik&marker=37.289%2C-2.382"
                className="h-[420px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;

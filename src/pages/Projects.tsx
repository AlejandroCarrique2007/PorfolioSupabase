
import { useTrabajos } from '../hooks/useTrabajos';

const ACGTrabajosPage = () => {
  const { trabajos, loading, error } = useTrabajos();

  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Proyectos</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Trabajos prácticos</h1>
          <p className="mt-3 text-slate-600">Equipos, redes y administración: ejemplos reales que muestran mi primer año en ASIR.</p>
        </div>

        {error && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-red-200 bg-red-50 py-12 px-8 mb-6">
            <p className="text-lg font-medium text-red-700">Error al cargar los proyectos</p>
            <p className="text-center text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-[28px] border border-slate-200 bg-slate-50 py-16 px-8">
            <p className="text-lg font-medium text-slate-500">Cargando proyectos...</p>
          </div>
        ) : trabajos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-[28px] border border-slate-200 bg-slate-50 py-16 px-8">
            <p className="text-lg font-medium text-slate-500">Próximamente</p>
            <p className="text-center text-slate-600">Los proyectos se añadirán conforme avances en el ciclo</p>
          </div>
        ) : (
          <div className="space-y-6">
            {trabajos.map((trabajo) => (
              <a
                key={trabajo.id}
                href={trabajo.href || '#'}
                target="_blank"
                rel="noreferrer"
                className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md block"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{trabajo.title}</h2>
                    <p className="mt-2 text-slate-600">{trabajo.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trabajo.tecnologia && trabajo.tecnologia.map((tech) => (
                      <span key={tech} className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">{trabajo.date}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ACGTrabajosPage;

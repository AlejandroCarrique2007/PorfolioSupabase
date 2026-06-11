import { useServicios } from '../hooks/useServicios';

export default function ACGServicios() {
  const { servicios, loading, error } = useServicios();

  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Servicios</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Qué puedo hacer</h1>
          <p className="mt-3 text-slate-600">Herramientas y prácticas que ya manejo en el ciclo ASIR de forma sencilla y funcional.</p>
        </div>

        {error && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-red-200 bg-red-50 py-12 px-8 mb-6">
            <p className="text-lg font-medium text-red-700">Error al cargar los servicios</p>
            <p className="text-center text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-6 rounded-[28px] border border-slate-200 bg-slate-50 py-16 px-8">
            <p className="text-lg font-medium text-slate-500">Cargando servicios...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {servicios.map((servicio) => (
              <article key={servicio.id} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <h2 className="text-xl font-semibold text-slate-900">{servicio.servicio}</h2>
                <p className="mt-4 text-slate-600 leading-7">{servicio.descripcion}</p>
                {servicio.detalles && servicio.detalles.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {servicio.detalles.map((detalle, idx) => (
                      <li key={idx} className="text-sm text-slate-500 flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                        {detalle}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 

import { useFormaciones } from '../hooks/useFormaciones';
import { BookOpen, Zap, Award } from 'lucide-react';

export default function ACGFormacion() {
  const { formaciones, loading, error } = useFormaciones();

  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Formación</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Temas estudiados</h1>
          <p className="mt-3 text-slate-600">Un resumen de los bloques y prácticas más importantes que he trabajado este curso.</p>
        </div>

        {error && (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-red-700">
            Error al cargar las formaciones: {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-600">Cargando formaciones...</p>
          </div>
        ) : formaciones.length === 0 ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center">
            <BookOpen className="mx-auto mb-4 text-slate-300" size={48} />
            <p className="text-slate-600">No hay formaciones registradas aún.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {formaciones.map((formacion) => (
              <article
                key={formacion.id}
                className="flex flex-col rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md overflow-hidden"
              >
                {formacion.imagen_url ? (
                  <div className="relative h-40 w-full overflow-hidden bg-slate-200">
                    <img
                      src={formacion.imagen_url}
                      alt={formacion.nombre}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                    {formacion.estado === 'Completado' && (
                      <div className="absolute top-3 right-3 rounded-full bg-green-500 p-2">
                        <Award className="text-white" size={16} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-50">
                    <BookOpen className="text-cyan-600" size={40} />
                  </div>
                )}

                <div className="flex flex-col p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{formacion.nombre}</h3>
                  {formacion.descripcion && (
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">{formacion.descripcion}</p>
                  )}

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    {formacion.categoria && (
                      <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {formacion.categoria}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Zap size={14} />
                      {formacion.horas ? `${formacion.horas}h` : 'Sin especificar'}
                    </div>
                    <span className={`font-medium ${
                      formacion.estado === 'Completado' ? 'text-green-600' : 'text-cyan-600'
                    }`}>
                      {formacion.estado || 'Sin estado'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 

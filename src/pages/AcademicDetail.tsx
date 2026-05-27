import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';

const studies = [
  {
    id: 'grado-asir',
    title: '1º ASIR',
    summary: 'Ciclo formativo con asignaturas de redes, sistemas y bases de datos.',
    highlights: ['Redes de área local', 'Administración de servidores', 'Seguridad básica'],
  },
  {
    id: 'proyecto-final',
    title: 'Proyecto del curso',
    summary: 'Ejecutar prácticas paso a paso y entregar documentación propia para clase.',
    highlights: ['Trabajo estructurado', 'Presentación clara', 'Material con estilo académico'],
  },
];

export const ACGFormacionAcademicaDetalle = () => {
  const { id } = useParams();
  const record = studies.find((item) => item.id === id);

  if (!record) {
    return (
      <main className="min-h-screen bg-slate-50 py-24 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-lg font-semibold">Registro académico no encontrado</p>
          <p className="mt-3 text-slate-600">El identificador no coincide con una entrada de estudios guardada.</p>
          <Link to="/estudios" className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Volver a estudios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-24 text-slate-900">
      <div className="mx-auto max-w-5xl px-6">
        <Link to="/estudios" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900">
          <ArrowLeft size={18} /> Volver a estudios
        </Link>

        <article className="mt-8 rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <div className="flex items-center gap-3 text-cyan-600">
            <BookOpen size={24} />
            <span className="uppercase tracking-[0.28em] text-slate-500">Detalle académico</span>
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-slate-900">{record.title}</h1>
          <p className="mt-4 text-slate-600 leading-8">{record.summary}</p>

          <div className="mt-8 rounded-3xl bg-slate-50 p-6">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 size={18} />
              <span className="font-semibold">Aspectos destacados</span>
            </div>
            <ul className="mt-4 space-y-3 text-slate-600">
              {record.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </main>
  );
};

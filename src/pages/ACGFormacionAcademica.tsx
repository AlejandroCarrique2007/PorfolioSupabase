import { GraduationCap, ClipboardList } from 'lucide-react';

const academicRecords = [
  {
    id: 'grado-asir',
    title: '1º ASIR',
    subtitle: 'Administración de Sistemas Informáticos en Red',
    description: 'Curso en ciclo formativo con prácticas reales de redes, seguridad y sistemas.',
    details: ['Módulo de redes', 'Módulo de sistemas', 'Bases de datos básicas'],
  },
  {
    id: 'titulacion',
    title: 'Formación complementaria',
    subtitle: 'Cursos y recursos',
    description: 'Material adicional y aprendizaje propio en Linux y administración de sistemas.',
    details: ['Linux básico', 'Documentación técnica', 'Buenas prácticas de montaje'],
  },
];

export default function ACGFormacionAcademica() {
  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Estudios</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Trayectoria académica</h1>
          <p className="mt-3 text-slate-600">Lo que he cursado y los temas que he preparado durante mi primer año en ASIR.</p>
        </div>

        <div className="space-y-6">
          {academicRecords.map((record) => (
            <article key={record.id} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-3 text-cyan-600">
                <GraduationCap size={22} />
                <span className="text-sm uppercase tracking-[0.28em] text-slate-500">{record.subtitle}</span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{record.title}</h2>
                  <p className="mt-2 text-slate-600 leading-7">{record.description}</p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <ClipboardList size={18} />
                  <span className="font-semibold text-slate-700">Contenidos clave</span>
                </div>
                <ul className="mt-4 space-y-3 text-slate-600">
                  {record.details.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 

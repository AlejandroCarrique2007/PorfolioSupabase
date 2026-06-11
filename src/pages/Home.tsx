import { ArrowRight } from "lucide-react";

export const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute left-[-20%] top-[-10%] h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute right-[-15%] top-32 h-72 w-72 rounded-full bg-slate-800/10 blur-3xl" />

        <section className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:px-8 lg:px-0">
          <div className="rounded-[32px] border border-slate-200 bg-white/90 p-10 shadow-lg shadow-slate-200/40 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Portfolio de 1º ASIR</p>
            <h1 className="mt-6 text-4xl font-semibold text-slate-900 sm:text-5xl">Alejandro Carrique Gallego</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
              Estudiante de Administración de Sistemas Informáticos en Red. Diseño soluciones sencillas, transparentes y prácticas, con un estilo claro y elegante para el primer curso.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="/proyectos" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Ver trabajos
                <ArrowRight className="ml-3 h-4 w-4" />
              </a>
              <a href="/contacto" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-100">
                Contactar conmigo
              </a>
            </div>
          </div>

          <article className="rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Lo que aprendo</p>
            <h2 className="mt-6 text-3xl font-semibold text-slate-900">Redes y administración de sistemas</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Configuración de redes locales, servicios básicos y administración de sistemas Linux en prácticas reales. Diseño de infraestructuras sencillas, seguridad elemental y documentación clara para cada proyecto que realizo.</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default function AdminHome() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Visión general</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900">Administración de la aplicación</h2>
        <p className="mt-3 text-slate-600">
          Esta área permite controlar los contenidos del portfolio sin recargar la página. Navega por la barra lateral para añadir cursos,
          servicios, trabajos o clientes.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Cursos</h3>
          <p className="mt-3 text-sm text-slate-600">Inserta nuevo contenido de cursos en la base de datos de Supabase con el formulario.</p>
        </article>

        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Servicios</h3>
          <p className="mt-3 text-sm text-slate-600">Crea y administra los servicios que se muestran en tu portafolio.</p>
        </article>

        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Trabajos</h3>
          <p className="mt-3 text-sm text-slate-600">Gestiona trabajos y proyectos para tu portfolio con un workflow administrativo claro.</p>
        </article>
      </div>
    </div>
  );
}

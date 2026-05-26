

const ACGTrabajosPage = () => {
  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Proyectos</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Trabajos prácticos</h1>
          <p className="mt-3 text-slate-600">Equipos, redes y administración: ejemplos reales que muestran mi primer año en ASIR.</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 rounded-[28px] border border-slate-200 bg-slate-50 py-16 px-8">
          <p className="text-lg font-medium text-slate-500">Próximamente</p>
          <p className="text-center text-slate-600">Los proyectos se añadirán conforme avances en el ciclo</p>
        </div>
      </div>
    </main>
  );
};

export default ACGTrabajosPage;

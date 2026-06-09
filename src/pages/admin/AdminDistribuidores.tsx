import { ArrowUpRight, FileText, Folder, ListChecks, Users, TrendingUp, ShieldCheck, BarChart3 } from 'lucide-react';

export default function AdminDistribuidores() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Distribuidores</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Panel de distribuidores</h1>
            <p className="mt-3 text-slate-600">
              Controla la información de distribuidores, así como métricas clave y documentos relacionados con el trabajo.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <BarChart3 size={18} />
            Estado de la unidad
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.8fr_0.9fr]">
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total Revenue</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">$1,250.00</p>
                </div>
                <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">Trending up this month — visitor traffic crece fuerte.</p>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">New Customers</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">1,234</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <Users size={20} />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">Crecimiento de nuevos clientes en el periodo actual.</p>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Active Accounts</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">45,678</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">Cuentas activas bajo gestión de distribuidores.</p>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Growth Rate</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">4.5%</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <TrendingUp size={20} />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">Rendimiento de crecimiento comparado con el periodo anterior.</p>
            </article>
          </div>

          <article className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total Visitors</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">45,678</h2>
              </div>
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Last 3 months</span>
            </div>

            <div className="mt-6 h-44 overflow-hidden rounded-[28px] bg-gradient-to-r from-cyan-100 via-slate-100 to-slate-50 p-4">
              <div className="relative h-full overflow-hidden rounded-[28px] bg-white/90 p-4">
                <svg viewBox="0 0 280 120" className="h-full w-full">
                  <path d="M10 95 L60 75 L110 85 L160 55 L210 75 L260 45" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="10" cy="95" r="3.5" fill="#0ea5e9" />
                  <circle cx="60" cy="75" r="3.5" fill="#0ea5e9" />
                  <circle cx="110" cy="85" r="3.5" fill="#0ea5e9" />
                  <circle cx="160" cy="55" r="3.5" fill="#0ea5e9" />
                  <circle cx="210" cy="75" r="3.5" fill="#0ea5e9" />
                  <circle cx="260" cy="45" r="3.5" fill="#0ea5e9" />
                </svg>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-2">Last 3 months</span>
              <span className="rounded-full bg-slate-100 px-3 py-2">Last 30 days</span>
            </div>
          </article>
        </div>

        <aside className="space-y-6">
          <article className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Documents</p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">4</span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                <Folder className="text-cyan-600" size={18} />
                <div>
                  <p className="font-semibold text-slate-900">Sección de Datos</p>
                  <p className="text-sm text-slate-500">Resumen de información clave.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                <FileText className="text-slate-700" size={18} />
                <div>
                  <p className="font-semibold text-slate-900">Reports</p>
                  <p className="text-sm text-slate-500">Informes generados automáticamente.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                <ListChecks className="text-slate-700" size={18} />
                <div>
                  <p className="font-semibold text-slate-900">Word Assistant</p>
                  <p className="text-sm text-slate-500">Sugerencias de contenido y texto.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                <Folder className="text-slate-700" size={18} />
                <div>
                  <p className="font-semibold text-slate-900">More</p>
                  <p className="text-sm text-slate-500">Accede a otras secciones administrativas.</p>
                </div>
              </div>
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}

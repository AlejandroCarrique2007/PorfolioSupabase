import { Github, Mail } from 'lucide-react';

const contactMethods = [
  {
    label: 'Email',
    value: 'alejandrocarrique029@gmail.com',
    icon: Mail,
    href: 'mailto:alejandrocarrique029@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/AlejandroCarrique2007',
    icon: Github,
    href: 'https://github.com/AlejandroCarrique2007',
  },
]

const Contacto = () => {
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

          <div className="grid gap-6 md:grid-cols-2">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-cyan-300 hover:bg-cyan-50"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                      <Icon size={20} />
                    </span>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{method.label}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-all">{method.value}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;

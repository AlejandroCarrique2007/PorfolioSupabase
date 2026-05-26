import { Bolt, ShieldCheck, Cpu } from 'lucide-react';

const skills = [
  {
    icon: Bolt,
    title: 'Soporte básico',
    description: 'Instalación de software, resolución de fallos y puesta a punto de clientes y servidores.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad inicial',
    description: 'Control de permisos, usuarios y accesos para mantener un entorno de clase seguro.',
  },
  {
    icon: Cpu,
    title: 'Redes locales',
    description: 'Configuración de direcciones IP, enrutamiento simple y servicios de red para laboratorios.',
  },
];

export default function ACGServicios() {
  return (
    <main className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Habilidades</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Qué puedo hacer</h1>
          <p className="mt-3 text-slate-600">Herramientas y prácticas que ya manejo en el ciclo ASIR de forma sencilla y funcional.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <article key={skill.title} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-100 text-cyan-700">
                  <Icon size={24} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-slate-900">{skill.title}</h2>
                <p className="mt-4 text-slate-600 leading-7">{skill.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
} 

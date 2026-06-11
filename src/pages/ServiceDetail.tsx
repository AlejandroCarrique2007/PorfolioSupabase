import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Layers, Sparkles } from 'lucide-react';

const services = [
  {
    slug: 'linux-basico',
    title: 'Linux básico',
    summary: 'Configuración de usuarios, permisos y tareas en un servidor local.',
    details: ['Shell y comandos fundamentales', 'Gestión de paquetes', 'Usuarios y permisos'],
  },
  {
    slug: 'redes-virtuales',
    title: 'Redes virtuales',
    summary: 'Diseño de una red de aula con segmentos y servicios compartidos.',
    details: ['DHCP y DNS simples', 'NAT de salida', 'Topología clara y documentada'],
  },
  {
    slug: 'web-portfolio',
    title: 'Portfolio web',
    summary: 'Sitio personal con diseño limpio para mostrar proyectos de ASIR.',
    details: ['React y Tailwind', 'Estructura intuitiva', 'Contenido con identidad propia'],
  },
];

export const ACGServicioDetalle = () => {
  const { id } = useParams();
  const servicio = services.find((item) => item.slug === id);

  if (!servicio) {
    return (
      <main className="min-h-screen bg-slate-50 py-24 text-slate-900">
        <div className="mx-auto max-w-3xl px-6 text-center rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-lg font-semibold">Servicio no encontrado</p>
          <p className="mt-3 text-slate-600">El identificador no coincide con un proyecto guardado.</p>
          <Link to="/habilidades" className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Volver a servicios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-24 text-slate-900">
      <div className="mx-auto max-w-5xl px-6">
        <Link to="/habilidades" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900">
          <ArrowLeft size={18} /> Volver a servicios
        </Link>

        <article className="mt-8 rounded-[32px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <div className="flex items-center gap-3 text-cyan-600">
            <Layers size={24} />
            <span className="uppercase tracking-[0.28em] text-slate-500">Servicio detallado</span>
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-slate-900">{servicio.title}</h1>
          <p className="mt-4 text-slate-600 leading-8">{servicio.summary}</p>

          <div className="mt-8 rounded-3xl bg-slate-50 p-6">
            <div className="flex items-center gap-2 text-slate-700">
              <Sparkles size={18} />
              <span className="font-semibold">Puntos clave</span>
            </div>
            <ul className="mt-4 space-y-3 text-slate-600">
              {servicio.details.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </main>
  );
};

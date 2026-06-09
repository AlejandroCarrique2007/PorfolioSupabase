import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, Briefcase, LayoutGrid, Users, Home, ClipboardList } from 'lucide-react';

const navItems = [
  { name: 'Portfolio Personal', path: '/admin', icon: Home },
  { name: 'Cursos', path: '/admin/cursos', icon: BookOpen },
  { name: 'Distribuidores', path: '/admin/distribuidores', icon: ClipboardList },
  { name: 'Formación', path: '/admin/formacion', icon: BookOpen },
  { name: 'Servicios', path: '/admin/servicios', icon: Briefcase },
  { name: 'Trabajos', path: '/admin/trabajos', icon: LayoutGrid },
  { name: 'Clientes', path: '/admin/clientes', icon: Users },
];

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-full max-w-xs border-r border-slate-200 bg-white px-5 py-6 shadow-sm md:w-80">
          <div className="mb-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center">
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-600 text-2xl font-bold text-white">
              AC
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Administrador</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Alex CG</h2>
            <p className="mt-1 text-sm text-slate-500">alejandrocarrique029@gmail.com</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-[24px] px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200/50'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white px-6 py-6 shadow-sm">
            <div className="mx-auto max-w-7xl">
              <h1 className="text-2xl font-semibold text-slate-900">Panel de administración</h1>
              <p className="mt-2 text-sm text-slate-500">
                Gestiona contenidos, crea nuevos registros y prueba el backend usando formularios en Supabase.
              </p>
            </div>
          </header>

          <main className="mx-auto max-w-7xl p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

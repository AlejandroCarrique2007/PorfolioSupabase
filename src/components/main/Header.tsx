import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Habilidades', href: '/habilidades' },
  { name: 'Formación', href: '/formacion' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Admin', href: '/admin' },
]

function Header1() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-lg font-semibold tracking-[0.18em] text-slate-900">
          ALEJANDRO CARRIQUE GALLEGO
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700 md:gap-6">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="transition-colors hover:text-cyan-600">
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header1

import './App.css'

function App() {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar">ACG</div>
          <h1>Alex CG</h1>
          <p>Alumno de 1º ASIR</p>
        </div>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </aside>

      <main className="content">
        <section id="inicio" className="card hero">
          <h2>Portfolio Personal</h2>
          <p>
            Página creada para prácticas de desarrollo web y presentación
            personal del módulo.
          </p>
        </section>

        <section id="sobre-mi" className="card">
          <h3>Sobre mí</h3>
          <p>
            Me gusta la informática, el hardware y la administración de sistemas.
            Actualmente estudio ASIR y estoy aprendiendo redes, Linux y bases de datos.
          </p>
        </section>

        <section id="proyectos" className="card">
          <h3>Proyectos</h3>

          <div className="projects">
            <div className="project">
              <h4>Servidor Linux</h4>
              <p>Configuración básica de un servidor Ubuntu con usuarios y permisos.</p>
            </div>

            <div className="project">
              <h4>Red local</h4>
              <p>Montaje de una pequeña red virtual para prácticas de clase.</p>
            </div>

            <div className="project">
              <h4>Portfolio Web</h4>
              <p>Proyecto realizado con React y CSS para aprender frontend.</p>
            </div>
          </div>
        </section>

        <section id="contacto" className="card">
          <h3>Contacto</h3>
          <p>Email: alexasir@example.com</p>
          <p>GitHub: github.com/alexcg</p>
        </section>
      </main>
    </div>
  )
}

export default App


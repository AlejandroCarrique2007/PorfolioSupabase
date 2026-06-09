import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Home } from "../pages/Home";
import ProjectsPage from "../pages/Projects";
import Services from "../pages/Services";
import Training from "../pages/Training";
import Academic from "../pages/Academic";
import Contact from "../pages/Contact";
import AdminHome from "../pages/admin/AdminHome";
import AdminCursos from "../pages/admin/AdminCursos";
import AdminDistribuidores from "../pages/admin/AdminDistribuidores";
import AdminServicios from "../pages/admin/AdminServicios";
import AdminTrabajos from "../pages/admin/AdminTrabajos";
import AdminClientes from "../pages/admin/AdminClientes";
import AdminFormacion from "../pages/admin/AdminFormacion";
import { ACGServicioDetalle as ServiceDetail } from "../pages/ServiceDetail";
import { ACGFormacionAcademicaDetalle as AcademicDetail } from "../pages/AcademicDetail";
import NewFormacion from "../pages/newformacion";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/habilidades" element={<Services />} />
          <Route path="/habilidades/:id" element={<ServiceDetail />} />
          <Route path="/formacion" element={<Training />} />
          <Route path="/estudios" element={<Academic />} />
          <Route path="/estudios/:id" element={<AcademicDetail />} />
          <Route path="/newformacion" element={<NewFormacion />} />
          <Route path="/contacto" element={<Contact />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="cursos" element={<AdminCursos />} />
          <Route path="distribuidores" element={<AdminDistribuidores />} />
          <Route path="servicios" element={<AdminServicios />} />
          <Route path="trabajos" element={<AdminTrabajos />} />
          <Route path="clientes" element={<AdminClientes />} />
          <Route path="formacion" element={<AdminFormacion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

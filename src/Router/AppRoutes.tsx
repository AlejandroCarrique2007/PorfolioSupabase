import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Home } from "../pages/Home";
import ProjectsPage from "../pages/Projects";
import Services from "../pages/Services";
import Training from "../pages/Training";
import Academic from "../pages/Academic";
import Contact from "../pages/Contact";
import { ACGServicioDetalle as ServiceDetail } from "../pages/ServiceDetail";
import { ACGFormacionAcademicaDetalle as AcademicDetail } from "../pages/AcademicDetail";

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
          <Route path="/contacto" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

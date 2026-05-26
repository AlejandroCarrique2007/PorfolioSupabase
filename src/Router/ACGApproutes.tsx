import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layout/ACGmainlayout";
import { Home } from "../pages/ACGhome";
import ACGTrabajosPage from "../pages/ACGTrabajos";
import ACGServicio from "../pages/ACGServicio";
import ACGFormacion from "../pages/ACGFormacion";
import ACGFormacionAcademica from "../pages/ACGFormacionAcademica";
import ACGContacto from "../pages/ACGcontacto";
import { ACGServicioDetalle } from "../pages/ACGDetServicio";
import { ACGFormacionAcademicaDetalle } from "../pages/ACGDetForAcademica";

export default function Approuter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/proyectos" element={<ACGTrabajosPage />} />
          <Route path="/habilidades" element={<ACGServicio />} />
          <Route path="/habilidades/:id" element={<ACGServicioDetalle />} />
          <Route path="/formacion" element={<ACGFormacion />} />
          <Route path="/estudios" element={<ACGFormacionAcademica />} />
          <Route path="/estudios/:id" element={<ACGFormacionAcademicaDetalle />} />
          <Route path="/contacto" element={<ACGContacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

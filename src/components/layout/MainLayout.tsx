import { Outlet } from 'react-router-dom';
import Header1 from "../main/Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header1 />
      <main className="pt-28 px-4 pb-12">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
        Portfolio académico de 1º ASIR · Alejandro Carrique Gallego
      </footer>
    </div>
  );
};

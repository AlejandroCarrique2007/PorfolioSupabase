import type { ITrabajo } from "../../Model/interfaces/ITrabajo";
import { ACGTrabajoEstile } from "./ACGTrabajoEstile";

interface Props {
  index: ITrabajo[];
}

export const ACGTrabajoMuestra = ({ index }: Props) => {
  return (
    <div className="bg-[#050505] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-blue-600 font-mono text-xl font-bold">./</span>
          <h2 className="text-2xl font-mono text-white tracking-[0.4em] uppercase">Proyectos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {index.map((trabajo) => (
            <ACGTrabajoEstile key={trabajo.id} item={trabajo} />
          ))}
        </div>
      </div>
    </div>
  );
};

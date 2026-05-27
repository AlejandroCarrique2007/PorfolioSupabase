import { Terminal, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { IFormacionAcademica } from "../../Model/interfaces/IFormacion_Academica";

interface Props {
    item: IFormacionAcademica;
    index: number;
}

export const ACGFormacionAcademicaEstile = ({ item, index }: Props) => {
    return (
        <article className="group relative bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 p-8 md:p-12 flex flex-col h-full min-h-[500px] transition-all duration-700 hover:border-blue-500/30 hover:bg-[#0c0c0c] overflow-hidden shadow-2xl">
            
            <span className="absolute -top-6 -right-4 text-8xl md:text-[10rem] font-black text-white/[0.03] italic group-hover:text-blue-600/10 transition-all duration-700 select-none">
                0{index + 1}
            </span>

            <div className="relative z-10 flex-grow">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic leading-[0.85] mb-10 tracking-tighter group-hover:text-blue-500 transition-colors duration-500">
                    {item.nivel}<span className="text-blue-600">.</span>
                </h2>

                <div className="border-l-4 border-blue-600 pl-6 mb-10">
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                        {item.centro}
                    </p>
                </div>
                
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4">
                    {item.fecha_inicio} — {item.fecha_fin}
                </p>
            </div>

            <div className="mt-auto pt-10 flex items-center justify-between border-t border-white/5">
                <Link 
                    to={`/formacion/${item.id}`} 
                    className="flex items-center gap-4 group/btn cursor-pointer z-20"
                >
                    <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500 group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-500">
                        <Terminal size={20} />
                    </div>
                    <span className="text-white font-black text-[10px] uppercase tracking-[0.4em] group-hover/btn:text-blue-400 transition-colors">
                        Ver_Expediente
                    </span>
                </Link>

                <GraduationCap className="text-white/10 group-hover:text-blue-600/20 transition-colors" size={32} />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
        </article>
    );
};

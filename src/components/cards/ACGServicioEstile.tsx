import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { IServicio } from "../../Model/interfaces/IServicio";

interface Props {
    item: IServicio;
    index: number;
}

export const ACGServicioEstile = ({ item, index }: Props) => {
    return (
        <article className="group relative bg-[#121212] rounded-3xl border border-white/5 p-6 md:p-10 flex flex-col h-full transition-all duration-500 hover:border-blue-500/40 overflow-hidden">
            <span className="absolute -top-4 -right-2 text-7xl md:text-9xl font-black text-white/[0.02] italic group-hover:text-blue-600/10 transition-all duration-500">
                0{index + 1}
            </span>

            <div className="relative z-10 flex-grow">
                <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic leading-[0.9] mb-6 break-words group-hover:text-blue-500 transition-colors">
                    {item.servicio}
                </h2>

                <div className="border-l-2 border-blue-600 pl-4 mb-8">
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {item.descripcion}
                    </p>
                </div>

                <div className="space-y-3">
                    {item.detalles?.map((detalle, i) => (
                        <div key={i} className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                            <div className="h-1 w-1 bg-blue-600 rounded-full shadow-[0_0_5px_rgba(37,99,235,0.5)]" />
                            <span className="break-words">{detalle}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-8 flex items-center justify-between">
                <Link 
                    to={`/servicio/${item.id}`} 
                    className="flex items-center gap-3 group/btn cursor-pointer z-20"
                >
                    <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500 group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-300">
                        <Terminal size={16} className="animate-pulse" />
                    </div>
                    <span className="text-white/40 font-black text-[9px] uppercase tracking-[0.3em] group-hover/btn:text-blue-400 transition-colors">
                        Ready_to_deploy
                    </span>
                </Link>

                <div className="h-[1px] flex-grow mx-4 bg-white/5" />
                <div className="text-blue-500/30 font-mono text-[8px] uppercase tracking-widest hidden sm:block">
                    v.2026
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </article>
    );
};

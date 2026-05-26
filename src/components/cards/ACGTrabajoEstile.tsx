import { ArrowRight } from 'lucide-react';
import type { ITrabajo } from "../../Model/interfaces/ITrabajo";

interface Props {
    item: ITrabajo;
}

export const ACGTrabajoEstile = ({ item }: Props) => {
    if (!item) return null;

    return (
        <article className="group relative bg-[#050505] flex flex-col transition-all duration-500 hover:bg-[#080808] border border-white/5 overflow-hidden h-full">
            <div className="relative w-full aspect-video overflow-hidden bg-black">
                <img 
                    src={item.author.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3">
                    <span className="text-white font-mono text-[8px] uppercase tracking-widest bg-blue-600/90 px-2 py-0.5">
                        {item.category.title}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-serif italic text-white leading-tight mb-2 tracking-tight group-hover:text-blue-500 transition-colors">
                    {item.title}
                </h2>

                <p className="text-gray-500 text-[11px] font-light leading-relaxed mb-6 line-clamp-2">
                    {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <a 
                        href={item.category.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-all cursor-pointer"
                    >
                        <span>Explorar</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    <span className="text-[8px] font-mono text-gray-700 uppercase">
                        {item.date}
                    </span>
                </div>
            </div>
        </article>
    );
};

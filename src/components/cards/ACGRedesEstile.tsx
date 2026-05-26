import type { IRedes } from "../../Model/interfaces/IRedes";

interface Props {
    item: IRedes;
}

export const ACGRedesEstile = ({ item }: Props) => {
    return (
        <a href={item.url}target="_blank" rel="noreferrer" className="flex items-center gap-3 py-2 px-4 hover:bg-white/5 rounded-xl transition-all duration-300 group border border-transparent hover:border-white/10">
            {item.icono ? (
                <img
                    src={item.icono}
                    alt={item.nombre}
                    className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all"
                />
            ) : (
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] text-white">
                    {item.nombre.charAt(0)}
                </div>
            )}

            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                {item.nombre}
            </span>
        </a>
    );
};

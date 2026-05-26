import type { IFormacion } from "../../Model/interfaces/IFormacion";

interface Props {
    item: IFormacion;
}

export const ACGFormacionEstile = ({ item }: Props) => {
    if (!item) return null;

    return (
        <article className="w-full max-w-6xl mx-auto bg-black flex flex-col items-center text-center px-8 pt-4 pb-16">
            <div className="flex items-center gap-4 mb-6">
                <span className="h-[1px] w-8 bg-blue-600/50"></span>
                <span className="text-blue-500 font-mono text-xs md:text-sm tracking-[0.5em] font-bold uppercase">
                    {item.date}
                </span>
                <span className="h-[1px] w-8 bg-blue-600/50"></span>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-white leading-tight tracking-tighter mb-8 uppercase">
                {item.title}
            </h2>

            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-12 opacity-80">
                {item.description}
            </p>
            
            <div className="flex flex-col items-center gap-12 w-full">
                {item.author?.imageUrl && (
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 group-hover:border-blue-500 transition-all duration-700">
                            <img 
                                src={item.author.imageUrl} 
                                alt={item.title}
                                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                            />
                        </div>
                    </div>
                )}

                {item.category?.href && (
                    <a 
                        href={item.category.href} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] md:text-xs font-black uppercase tracking-[1em] text-gray-500 hover:text-blue-500 transition-all duration-300"
                    >
                        {item.category.title || "VIEW_DETAILS"}
                    </a>
                )}
            </div>
        </article>
    );
};

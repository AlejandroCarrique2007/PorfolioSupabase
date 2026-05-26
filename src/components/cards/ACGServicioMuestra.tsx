import type { IServicio } from "../../Model/interfaces/IServicio";
import { ACGServicioEstile } from "./ACGServicioEstile";

interface Props {
    index: IServicio[];
}

export const ACGServicioMuestra = ({ index }: Props) => {
    return (
        <div className="relative min-h-screen bg-[#0a0a0a] p-8 md:p-24 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-orange-900/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                    {index.map((card, i) => (
                        <ACGServicioEstile
                            key={card.id}
                            item={card}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

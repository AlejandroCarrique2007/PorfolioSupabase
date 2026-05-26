import type { IFormacion } from "../../Model/interfaces/IFormacion";
import { ACGFormacionEstile } from "./ACGFormacionEstile";

interface Props {
    index: IFormacion[]; 
}

export const ACGFormacionMuestra = ({ index }: Props) => {
    return (
        <div className="bg-black w-full min-h-screen">
            <section className="max-w-7xl mx-auto px-6 pt-0 pb-20">
                <div className="flex flex-col gap-0">
                    {index.map((card) => (
                        <ACGFormacionEstile
                            key={card.id} 
                            item={card} 
                        />
                    ))}
                </div>
            </section>

            <footer className="py-20 border-t border-white/5 text-center bg-black">
                <p className="text-[9px] font-black tracking-[0.8em] uppercase text-gray-600">
                    End of Education Record
                </p>
            </footer>
        </div>
    );
};

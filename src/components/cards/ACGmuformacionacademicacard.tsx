import type { IFormacionAcademica } from "../../Model/interfaces/IFormacion_Academica";
import { ACGFormacionAcademicaEstile } from "./ACGesformacionacademicacards";

interface Props {
    formacionAcademica: IFormacionAcademica[]; 
}

export const ACGFormacionAcademicaMuestra = ({ formacionAcademica }: Props) => {
    return (
        <div className="relative min-h-screen bg-[#050505] p-4 sm:p-6 md:p-12 lg:p-20 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                <header className="mb-12 md:mb-24 px-2">
                    <div className="relative inline-block w-full">
                        <h2 className="text-[10vw] sm:text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9] break-words">
                            FORMACIÓN<br />
                            <span className="text-white">ACADÉMICA</span><span className="text-blue-600">.</span>
                        </h2>
                        <div className="h-2 w-24 md:w-64 bg-blue-600 mt-4 md:mt-6 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                    </div>
                </header>

                <div className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    {formacionAcademica.map((item, i) => (
                        <div key={item.id} className="h-full flex">
                            <ACGFormacionAcademicaEstile 
                                item={item} 
                                index={i} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

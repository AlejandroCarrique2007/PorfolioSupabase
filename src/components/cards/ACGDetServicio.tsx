    import { Terminal } from 'lucide-react';
    import type { IServicio } from "../../Model/interfaces/IServicio";

    interface Props {
        item: IServicio;
    }

    export const ACGServicioDetalleCard = ({ item }: Props) => {
        return (
            <div className="w-full max-w-[95%] mx-auto animate-in fade-in zoom-in duration-700 px-2 sm:px-6">
                <div className="flex flex-col items-center">
                    
                    <header className="mb-12 md:mb-24 w-full text-center">
                        <div className="flex items-center justify-center gap-3 mb-6 md:mb-10">
                            <div className="h-[1px] w-12 md:w-24 bg-blue-600" />
                            <span className="text-blue-500 font-black text-[10px] md:text-xs uppercase tracking-[0.6em]">
                                Análisis Detallado del Servicio
                            </span>
                            <div className="h-[1px] w-12 md:w-24 bg-blue-600" />
                        </div>
                        
                        <h1 className="text-[12vw] sm:text-[10vw] md:text-8xl lg:text-9xl font-black italic text-white uppercase leading-[0.8] mb-10 break-words">
                            {item.servicio}<span className="text-blue-600">.</span>
                        </h1>
                        
                        <div className="max-w-[90%] mx-auto md:pt-12 border-t border-white/5">
                            <p className="text-xl sm:text-2xl md:text-4xl text-gray-400 leading-tight font-light italic">
                                "{item.descripcion}"
                            </p>
                        </div>
                    </header>

                    <div className="w-full bg-[#080808] border border-white/5 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 lg:p-24 mb-16 relative overflow-hidden group shadow-2xl">
                        
                        <div className="relative z-10 w-full">
                            <h3 className="text-white font-bold mb-12 flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-xs md:text-base text-blue-500">
                                <Terminal size={24} />
                                Descripcion y Campos
                            </h3>
                            
                            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                                <div className="w-full lg:w-1/2">
                                    <p className="text-gray-400 leading-relaxed text-lg md:text-2xl font-light text-left">
                                        La implementación de <span className="text-white font-bold underline decoration-blue-600 decoration-4 underline-offset-8">{item.servicio}</span> se gestiona bajo estándares de máxima exigencia. 
                                        Priorizamos la estabilidad estructural, la seguridad de la información y un rendimiento optimizado para infraestructuras de alto nivel.
                                    </p>
                                </div>

                                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {item.detalles?.map((detalle, i) => (
                                        <div key={i} className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:bg-white/[0.05] hover:border-blue-600/40 transition-all group/item">
                                            <div className="h-3 w-3 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                            <span className="text-xs md:text-sm text-gray-200 uppercase font-bold tracking-wider">{detalle}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-40 pb-12 border-t border-white/5 pt-10">
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span>Estado: Operativo</span>
                        </div>
                        <span>© 2026 J.L. López · Sistemas e Infraestructura</span>
                        <span>Despliegue Finalizado</span>
                    </footer>
                </div>
            </div>
        );
    };

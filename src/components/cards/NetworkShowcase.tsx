import type { IRedes } from "../../Model/interfaces/IRedes";
import { ACGRedesEstile } from "./NetworkStyle";

interface Props {
    index: IRedes[]; 
}

export const ACGRedesMuestra = ({ index }: Props) => {
    return (
        <footer className="bg-[#050505] py-20">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col items-center gap-10">
                    <div className="text-center">
                        <h2 className="text-white text-2xl font-serif italic mb-2">Social</h2>
                        <div className="h-1 w-8 bg-blue-600 mx-auto" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {index.map((red) => (
                            <ACGRedesEstile
                                key={red.id} 
                                item={red} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

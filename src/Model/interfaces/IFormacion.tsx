export interface IFormacion {
    id: number;
    title: string;
    description: string;
    date: string;
    category: {
        href: string;
        title: string;
    };
    author: {
        imageUrl: string;
    };
}

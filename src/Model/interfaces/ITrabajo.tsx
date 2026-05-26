export interface ITrabajo {
    id: number;
    title: string;
    datetime: string;
    date: string;
    description: string;
    href: string;
    category: {
        href: string;
        title: string;
    };
    author: {
        imageUrl: string;
    };
    tecnologia: string[];
}

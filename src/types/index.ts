
export interface Author {
    id: number;
    name: string;
    email: string;
    picture?: string | null;
    role: "ADMIN";
    createdAt: string;
    updatedAt: string;
}

export interface BlogPost {
    id: string;
    title: string;
    summary?: string;
    content: string;
    thumbnail?: string;
    tags: string[];
    author: Author;
    views?: number;
    createdAt: Date;
}

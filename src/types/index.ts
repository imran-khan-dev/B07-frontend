
export interface Author {
    name: string;
    picture?: string;
    isVerified?: boolean;
}

export interface BlogPost {
    id: string;
    title: string;
    summary?: string;
    content: string;
    thumbnail?: string;
    tags?: string[];
    author: Author;
    views?: number;
    createdAt: Date;
}

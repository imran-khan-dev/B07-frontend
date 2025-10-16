import { ComponentType } from "react";

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
  summary?: string | null;
  content: string;
  isFeatured: string
  thumbnail?: string | null;
  tags: string[];
  author: Author;
  views?: number;
  createdAt: Date;
}



export interface Owner {
  id: number;
  name: string;
  email: string;
  picture?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  features: string[];
  views?: number;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
}

export interface ProjectsProps {
  projects: Project[];
}


export interface BlogData {
  data: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


export interface ProjectData {
  data: Project[]
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

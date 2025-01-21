import { ReactElement } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: ReactElement;
  publishedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  coverImage?: string;
  tags: string[];
  readingTime: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface BlogAuthor {
  name: string;
  bio?: string;
  avatar?: string;
  role?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
} 
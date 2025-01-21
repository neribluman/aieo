import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { BlogPost } from './types';

const postsDirectory = path.join(process.cwd(), 'content/blog');

const components: MDXComponents = {
  img: Image as any,
};

export async function getAllPosts(): Promise<BlogPost[]> {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const { content: compiledContent } = await compileMDX({
          source: content,
          components,
          options: { 
            parseFrontmatter: true,
            mdxOptions: {
              development: process.env.NODE_ENV === 'development'
            }
          }
        });

        return {
          slug,
          content: compiledContent,
          title: data.title,
          excerpt: data.excerpt,
          publishedAt: data.publishedAt,
          author: data.author,
          coverImage: data.coverImage,
          tags: data.tags || [],
          readingTime: calculateReadingTime(content)
        } as BlogPost;
      })
  );

  return allPostsData.sort((a, b) => (
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const { content: compiledContent } = await compileMDX({
      source: content,
      components,
      options: { 
        parseFrontmatter: true,
        mdxOptions: {
          development: process.env.NODE_ENV === 'development'
        }
      }
    });

    return {
      slug,
      content: compiledContent,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt,
      author: data.author,
      coverImage: data.coverImage,
      tags: data.tags || [],
      readingTime: calculateReadingTime(content)
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
} 
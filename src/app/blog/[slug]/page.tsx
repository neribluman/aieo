import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug } from '../lib/mdx';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | xfunnel.ai Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  const ogImage = post.coverImage || '/logo(512x512).png';

  return {
    title: `${post.title} | xfunnel.ai Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://xfunnel.ai/blog/${params.slug}`,
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    authors: [{ name: post.author.name }],
    keywords: post.tags,
    alternates: {
      canonical: `https://xfunnel.ai/blog/${params.slug}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a0533] to-[#0c0118]">
      <div className="max-w-4xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
        <Link 
          href="/blog"
          className="inline-flex items-center text-sm text-purple-200/60 hover:text-purple-200 transition-colors duration-200"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
      
      <article className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-purple-200/40 mb-4">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-purple-200/60 mb-8">
            {post.excerpt}
          </p>
          {post.coverImage && (
            <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="flex items-center space-x-4">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-medium text-purple-200">
                {post.author.name}
              </div>
            </div>
          </div>
        </header>
        
        <div className="prose prose-invert prose-purple max-w-none">
          {post.content}
        </div>

        <footer className="mt-16 pt-8 border-t border-purple-500/10">
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-purple-900/20 text-purple-200/60 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-900/20 text-purple-200 hover:bg-purple-900/30 transition-colors duration-200"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
} 
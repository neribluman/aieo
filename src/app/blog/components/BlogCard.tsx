'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  readingTime: string;
  coverImage?: string;
}

export function BlogCard({
  title,
  excerpt,
  slug,
  publishedAt,
  readingTime,
  coverImage,
}: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group bg-purple-900/10 rounded-lg overflow-hidden border border-purple-500/10 hover:border-purple-500/20 transition-colors duration-200"
    >
      <Link href={`/blog/${slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={coverImage || '/logo(512x512).png'}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center text-xs text-purple-200/40 mb-3 space-x-4">
            <time dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
          <h2 className="text-xl font-semibold text-purple-200 mb-2 group-hover:text-purple-400 transition-colors duration-200">
            {title}
          </h2>
          <p className="text-sm text-purple-200/60 line-clamp-2">
            {excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  );
} 
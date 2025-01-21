import { Metadata } from 'next';
import { BlogCard } from './components/BlogCard';
import { getAllPosts } from './lib/mdx';

export const metadata: Metadata = {
  title: 'Blog | AIEO',
  description: 'Explore our latest insights, updates, and stories about AI and technology.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a0533] to-[#0c0118]">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-4 leading-normal sm:leading-normal pb-2">
            Our Blog
          </h1>
          <p className="text-purple-200/60 max-w-2xl mx-auto">
            Discover the latest insights, tutorials, and updates from our team
          </p>
        </header>
        
        {posts.length === 0 ? (
          <div className="text-center text-purple-200/40">
            No blog posts yet. Check back soon!
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                publishedAt={post.publishedAt}
                readingTime={post.readingTime}
                coverImage={post.coverImage}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 
import { Metadata } from 'next';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Blog | xfunnel.ai',
  description: 'Explore insights about AI search engines, SEO strategies, and content optimization.',
  openGraph: {
    title: 'xfunnel.ai Blog',
    description: 'Discover the latest insights about AI search engines and content optimization strategies.',
    type: 'website',
    url: 'https://xfunnel.ai/blog',
    images: [
      {
        url: '/logo(512x512).png',
        width: 512,
        height: 512,
        alt: 'xfunnel.ai Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xfunnel.ai Blog',
    description: 'Discover the latest insights about AI search engines and content optimization strategies.',
    images: ['/logo(512x512).png'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
      {children}
    </>
  );
} 
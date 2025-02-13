'use client';

import Image from 'next/image';

interface MdxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function MdxImage({ src, alt, className = '' }: MdxImageProps) {
  return (
    <span className="block relative aspect-video w-full my-8 rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover ${className}`}
      />
    </span>
  );
} 
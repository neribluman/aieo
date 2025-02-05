'use client';

import { useRef, useEffect } from 'react';

interface VideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function Video({
  src,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observerRef.current.observe(videoRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
} 
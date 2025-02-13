import React from 'react';
import { Card as ShadcnCard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function TableOfContents() {
  return (
    <nav className="my-8 p-4 bg-purple-900/20 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-purple-100">Table of Contents</h2>
      {/* Content will be auto-generated */}
    </nav>
  );
}

export function Quote({ children, author, source }: { children: React.ReactNode; author: string; source?: string }) {
  return (
    <blockquote className="my-6 border-l-4 border-purple-500 pl-4 italic">
      <div className="text-purple-100">{children}</div>
      <footer className="mt-2 text-sm text-purple-200">
        — {author}
        {source && <span> ({source})</span>}
      </footer>
    </blockquote>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <ShadcnCard className="my-6 bg-purple-900/20 border-purple-500/20 text-purple-100">
      {children}
    </ShadcnCard>
  );
}

export { CardHeader, CardTitle, CardContent };

export function InfoBox({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' }) {
  return (
    <div className={cn(
      'my-6 p-4 rounded-lg text-purple-100',
      type === 'info' ? 'bg-blue-900/20 border border-blue-500/20' : 'bg-yellow-900/20 border border-yellow-500/20'
    )}>
      {children}
    </div>
  );
}

export function Diagram({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="my-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
      <h4 className="font-semibold mb-2 text-purple-100">{title}</h4>
      <div className="space-y-2 text-purple-200">
        {children}
      </div>
    </div>
  );
}

export function TechStack({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-gray-900/40 rounded-lg border border-purple-500/20 text-purple-100">
      {children}
    </div>
  );
}

export function CheckList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-6 space-y-2 list-none text-purple-100">
      {React.Children.map(children, (child) => (
        <li className="flex items-start">
          <span className="mr-2 text-green-400">✓</span>
          {child}
        </li>
      ))}
    </ul>
  );
}

export function CallToAction({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg text-center">
      <div className="text-lg font-medium text-purple-100">{children}</div>
    </div>
  );
} 
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Visibility Dashboard | xfunnel.ai",
  description: "Track and analyze your company's visibility across AI platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/Favicon(32x32).png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo(192x192).png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo(512x512).png" />
        <link rel="apple-touch-icon" href="/logo(192x192).png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link 
                    href="/" 
                    className="flex items-center transition-all duration-300"
                  >
                    <Image
                      src="/logo(320x80)2.png"
                      alt="AIEO Logo"
                      width={320}
                      height={80}
                      priority
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
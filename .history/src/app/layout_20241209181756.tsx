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
        <link rel="icon" type="image/png" sizes="32x32" href="/Favicon(40x40).png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/Favicon(192x192).png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/Favicon(512x512).png" />
        <link rel="apple-touch-icon" href="/Favicon(192x192).png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link 
                    href="/" 
                    className="flex items-center text-xl bg-gradient-to-r from-blue-600 to-purple-600 
                             text-transparent bg-clip-text transition-all duration-300 
                             hover:from-blue-500 hover:to-purple-500"
                  >
                    <Image
                      src="/Favicon(40x40).png"
                      alt="xFunnel Logo"
                      width={32}
                      height={32}
                      className="mr-2"
                    />
                    <span className="font-extrabold text-2xl tracking-tight">
                      x<span className="font-black">Funnel</span>
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center px-1 pt-1 text-gray-600 
                             hover:text-blue-600 transition-colors duration-300
                             border-b-2 border-transparent hover:border-blue-600"
                  >
                    Home
                  </Link>
                  {/* Commented out Dashboard and Buying Journey links
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-1 pt-1 text-gray-600 
                             hover:text-blue-600 transition-colors duration-300
                             border-b-2 border-transparent hover:border-blue-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/buying-journey"
                    className="inline-flex items-center px-1 pt-1 text-gray-600 
                             hover:text-blue-600 transition-colors duration-300
                             border-b-2 border-transparent hover:border-blue-600"
                  >
                    Buying Journey
                  </Link>
                  */}
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
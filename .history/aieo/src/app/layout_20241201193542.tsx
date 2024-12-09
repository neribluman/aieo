import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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
  title: "AI Visibility Dashboard | Ariga.io",
  description: "Track and analyze your company's visibility across AI platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        <nav className="fixed w-full z-50 bg-transparent backdrop-blur-md border-b border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link 
                    href="/" 
                    className="text-xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 
                             text-transparent bg-clip-text transition-all duration-300 
                             hover:from-blue-300 hover:to-purple-300"
                  >
                    Ariga.io
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/landing-page"
                    className="inline-flex items-center px-1 pt-1 text-blue-100/70 
                             hover:text-blue-300 transition-colors duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center px-1 pt-1 text-blue-100/70 
                             hover:text-blue-300 transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/buying-journey"
                    className="inline-flex items-center px-1 pt-1 text-blue-100/70 
                             hover:text-blue-300 transition-colors duration-300"
                  >
                    Buying Journey
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
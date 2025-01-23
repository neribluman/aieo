import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { MobileNav } from "@/components/MobileNav";

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
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo(320x80).png"
                alt="xfunnel.ai Logo"
                width={320}
                height={80}
                priority
                className="h-8 w-auto"
              />
            </Link>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-gray-900 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/about">
                    About
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-gray-900 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/pricing">
                    Pricing
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-gray-900 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/login">
                    Log in
                  </Link>
                </Button>
                <Button
                  className="text-sm font-medium bg-[#2E0854] text-white hover:bg-[#2E0854]/90"
                  asChild
                >
                  <Link href="/contact">
                    Contact us
                  </Link>
                </Button>
              </div>
              <MobileNav />
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
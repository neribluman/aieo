'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] px-0">
        <nav className="flex flex-col h-full">
          <div className="flex-1 py-4">
            <div className="flex flex-col space-y-1">
              <Link 
                href="/about"
                onClick={() => setOpen(false)}
                className="text-lg font-medium px-6 py-4 hover:bg-gray-100 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/pricing"
                onClick={() => setOpen(false)}
                className="text-lg font-medium px-6 py-4 hover:bg-gray-100 transition-colors"
              >
                Pricing
              </Link>
              <Link 
                href="/login"
                onClick={() => setOpen(false)}
                className="text-lg font-medium px-6 py-4 hover:bg-gray-100 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200">
            <Button 
              className="w-full bg-[#2E0854] text-white hover:bg-[#2E0854]/90"
              asChild
            >
              <Link 
                href="/contact"
                onClick={() => setOpen(false)}
              >
                Contact us
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
} 
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // drei ScrollControls intercepts native scroll — listen to wheel instead
    const handleWheel = () => setScrolled(true);
    const handleReset = () => {}; // keep scrolled=true once user scrolls

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 pointer-events-auto ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#f97316] rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">S</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-[#1c1c1c]">SERVTECH</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link href="/solutions" className="hover:text-[#1c1c1c] transition-colors">Solutions</Link>
          <Link href="/industries" className="hover:text-[#1c1c1c] transition-colors">Industries</Link>
          <Link href="/about" className="hover:text-[#1c1c1c] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#1c1c1c] transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

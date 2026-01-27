"use client";

import React from 'react';

export default function FortuneHub() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-serif">
      <div className="max-w-2xl w-full text-center space-y-12">
        <h1 className="text-6xl md:text-8xl tracking-tighter hover:italic transition-all duration-700 cursor-default">
          FORTUNE 5 BILLION
        </h1>
        
        <nav className="flex flex-col space-y-6 text-xl md:text-2xl">
          {/* INTERNAL LINK: Same Tab */}
          <a 
            href="/niragame" 
            className="hover:text-red-600 transition-colors duration-300 tracking-widest uppercase"
          >
            Play N.I.R.A. Game
          </a>

          {/* EXTERNAL LINKS: New Tab */}
          <a 
            href="https://ko-fi.com/yourlink" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-300 tracking-widest uppercase text-sm opacity-80"
          >
            Support on Ko-fi
          </a>

          <a 
            href="mailto:business@fortune5billion.com" 
            className="hover:text-gray-400 transition-colors duration-300 tracking-widest uppercase text-sm opacity-80"
          >
            Contact Business
          </a>
        </nav>

        <div className="pt-20 text-xs tracking-[0.3em] uppercase opacity-30">
          Dark Elegance • Established 2026
        </div>
      </div>
    </main>
  );
}

import React from 'react';

export default function MarqueeTicker() {
  const items = [
    'FULL-STACK ARCHITECTURE',
    'SYSTEM ADMINISTRATION (ITEP 414)',
    'PYTHON 3.11 & FLASK',
    'SUPABASE POSTGRESQL & RLS',
    'FACIAL BIOMETRICS ENGINE',
    'DOCKER & CLOUD RESILIENCE',
    'REACT & MODERN WEB SYSTEMS',
    'BSIT SCHOLAR • LAGUNA PH',
    '99.9% SYSTEM RELIABILITY'
  ];

  return (
    <div className="w-full py-4 border-y border-zinc-800 bg-black/90 backdrop-blur-md overflow-hidden relative select-none">
      <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-5 mx-3">
            <span className="text-xs font-sans tracking-wider text-zinc-400 font-medium uppercase hover:text-white transition-colors">
              {text}
            </span>
            <span className="text-zinc-600 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.getAttribute('role') === 'button'
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer Glow Follower */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 1.8 : 1})`,
        }}
      >
        <div className={`rounded-full transition-all duration-300 ${
          hovered 
            ? 'w-12 h-12 bg-gold-500/15 border border-gold-400/60 blur-[1px]' 
            : 'w-8 h-8 bg-gold-500/10 border border-gold-500/30'
        }`} />
      </div>

      {/* Tiny Core Dot */}
      <div
        className="fixed pointer-events-none z-50 hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-gold-300 shadow-gold-glow" />
      </div>
    </>
  );
}

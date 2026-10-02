import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVolumeHigh, 
  faVolumeXmark, 
  faBars, 
  faTerminal 
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { soundFx } from '../utils/audio';
import { PERSONAL_INFO } from '../utils/constants';

export default function Navbar({ onOpenSidebar, onOpenTerminal, soundEnabled, setSoundEnabled, triggerToast }) {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const handleSoundToggle = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
    triggerToast(
      newState ? 'Sound Effects On' : 'Sound Effects Off',
      newState ? 'Interactive audio feedback enabled.' : 'Sound synthesizers muted.',
      'info'
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#06070a]/95 backdrop-blur-xl border-b border-slate-800 shadow-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Name (No Crown Icon) */}
        <Link
          to="/"
          onClick={() => soundFx.playChime(659.25)}
          className="group flex flex-col"
        >
          <span className="font-sans font-semibold text-base sm:text-lg text-white tracking-tight group-hover:text-slate-200 transition-colors">
            Princess Azucena
          </span>
          <span className="text-xs text-slate-400 font-sans">
            Full-Stack & IT Specialist
          </span>
        </Link>

        {/* Center Live Time Clock */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-sans text-slate-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>MNL {time || '12:00 PM'}</span>
        </div>

        {/* Right Tools & Sidebar Menu Trigger */}
        <div className="flex items-center gap-2">
          
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={`p-2 rounded-lg border text-xs transition-colors hidden sm:block ${
              soundEnabled
                ? 'bg-slate-800 border-slate-600 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FontAwesomeIcon icon={soundEnabled ? faVolumeHigh : faVolumeXmark} className="w-3.5 h-3.5" />
          </button>

          {/* CLI Terminal */}
          <button
            onClick={() => {
              soundFx.playChime(880);
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-sans transition-colors"
          >
            <FontAwesomeIcon icon={faTerminal} className="w-3 h-3 text-purple-400" />
            <span>CLI</span>
          </button>

          {/* LinkedIn */}
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600/15 border border-blue-500/40 text-blue-400 hover:bg-blue-600/25 text-xs font-medium font-sans transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-3 h-3" />
            <span>LinkedIn</span>
          </a>

          {/* Menu Drawer Toggle Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenSidebar();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-colors font-sans font-medium text-xs shadow-sm"
            aria-label="Open navigation menu"
          >
            <FontAwesomeIcon icon={faBars} className="w-3.5 h-3.5" />
            <span>Menu</span>
          </button>

        </div>

      </div>
    </header>
  );
}

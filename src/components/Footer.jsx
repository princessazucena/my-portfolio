import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { PERSONAL_INFO } from '../utils/constants';
import { soundFx } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playChime(1046.50);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-900 bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Typographic Brand */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-medium text-lg sm:text-xl text-white">
                PRINCESS ANNE B. AZUCENA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-xs font-sans text-zinc-400 mt-0.5">
              Full-Stack Engineer & IT Specialist • Majayjay, Laguna, Philippines
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors w-fit shadow-sm"
          >
            <span>Ascend to Top</span>
            <FontAwesomeIcon icon={faArrowUp} className="w-3 h-3" />
          </button>
        </div>

        {/* Navigation & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-400">
          <div className="flex flex-wrap items-center gap-4 text-zinc-400">
            <a href="/" className="hover:text-white transition-colors">Overview</a>
            <a href="/dossier" className="hover:text-white transition-colors">Dossier</a>
            <a href="/systems" className="hover:text-white transition-colors">Systems</a>
            <a href="/capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="/credentials" className="hover:text-white transition-colors">Credentials</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <FontAwesomeIcon icon={faGithub} className="w-3.5 h-3.5" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              title="LinkedIn Profile"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-3.5 h-3.5" />
            </a>
            <a
              href={PERSONAL_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              title="Facebook Profile"
            >
              <FontAwesomeIcon icon={faFacebook} className="w-3.5 h-3.5" />
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              title="Instagram Profile"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-[10px] font-sans text-zinc-500 gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Princess Anne B. Azucena. All Rights Reserved.</p>
          <p>Deployable on Vercel • Majayjay, Laguna, Philippines</p>
        </div>

      </div>
    </footer>
  );
}

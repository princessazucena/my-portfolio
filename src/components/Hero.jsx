import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLayerGroup, 
  faTerminal, 
  faEnvelope, 
  faCopy, 
  faShieldHalved, 
  faLocationDot, 
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { PERSONAL_INFO } from '../utils/constants';
import { soundFx } from '../utils/audio';
import profileImg from '../assets/profile.jpg';

export default function Hero({ onOpenTerminal, triggerToast }) {
  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
    soundFx.playSuccess();
    triggerToast(
      'Email Copied',
      `${PERSONAL_INFO.socials.email} copied to clipboard.`,
      'success'
    );
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 my-auto">
        
        {/* Left Column: Content & Actions */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Available for Projects & Full-Time Roles</span>
          </div>

          {/* Minimalist Solid Headline */}
          <div className="space-y-2">
            <p className="text-xs font-sans uppercase tracking-wider text-zinc-400 font-medium">
              Full-Stack Engineer & IT Specialist
            </p>
            <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Architecting Resilient Systems & Modern Web Platforms
            </h1>
          </div>

          {/* Bio */}
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed">
            <strong className="text-white font-medium">{PERSONAL_INFO.name}</strong> — 4th-year BSIT scholar at <strong className="text-white font-medium">Laguna State Polytechnic University (Sta. Cruz Campus)</strong>, specializing in scalable full-stack architectures, enterprise server administration, and reliable cloud deployments.
          </p>

          {/* Metadata Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-sans text-zinc-300 pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-zinc-400" />
              <span>Majayjay, Laguna, PH</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <FontAwesomeIcon icon={faShieldHalved} className="w-3 h-3 text-emerald-400" />
              <span>4th Year BSIT • LSPU Sta. Cruz</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <a
              href="#projects"
              onClick={() => soundFx.playClick()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-medium text-xs sm:text-sm hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5" />
              <span>View Projects</span>
            </a>

            <button
              onClick={() => {
                soundFx.playChime(880);
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs sm:text-sm font-sans transition-colors"
            >
              <FontAwesomeIcon icon={faTerminal} className="w-3.5 h-3.5 text-zinc-400" />
              <span>CLI Terminal</span>
            </button>

            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs sm:text-sm font-sans transition-colors"
              title="Copy Email Address"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-zinc-400" />
              <span>Contact</span>
              <FontAwesomeIcon icon={faCopy} className="w-3 h-3 text-zinc-500" />
            </button>

            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Right Column: Clean Minimalist Portrait Card */}
        <div className="relative shrink-0 flex flex-col items-center">
          
          <div className="relative w-64 sm:w-72 rounded-2xl bg-zinc-950 border border-zinc-800 p-2.5 shadow-2xl shadow-black/90 group">
            
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80">
              <img
                src={profileImg}
                alt="Princess Anne B. Azucena"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/profile.jpg';
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-sans">
                <span className="text-white font-medium">Princess Azucena</span>
                <span className="flex items-center gap-1 text-zinc-200 bg-black/80 px-2 py-0.5 rounded border border-zinc-700">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 text-emerald-400" />
                  <span>4th Year BSIT</span>
                </span>
              </div>
            </div>

            {/* Bottom Card Ribbon */}
            <div className="mt-2 px-2 py-1 flex items-center justify-between text-[11px] font-sans text-zinc-400">
              <span>Status: Active</span>
              <span className="text-emerald-400">● Laguna, PH</span>
            </div>

          </div>

        </div>

      </div>

      {/* Minimalist Stats Ribbon */}
      <div className="w-full max-w-6xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
        {PERSONAL_INFO.stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#09090b] border border-zinc-800 text-left transition-colors hover:border-zinc-700"
          >
            <span className="text-[10px] font-sans font-medium text-zinc-500 uppercase tracking-wider block mb-1">
              0{idx + 1} // {stat.label}
            </span>
            <p className="font-sans text-xl sm:text-2xl font-semibold text-white">
              {stat.value}
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5 font-sans">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}

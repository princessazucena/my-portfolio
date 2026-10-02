import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLayerGroup, 
  faTerminal, 
  faEnvelope, 
  faCopy, 
  faShieldHalved, 
  faLocationDot, 
  faArrowRight,
  faCircleCheck,
  faCode,
  faServer,
  faAward
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { PERSONAL_INFO, PROJECTS_DATA } from '../utils/constants';
import { soundFx } from '../utils/audio';
import profileImg from '../assets/profile.jpg';
import MarqueeTicker from '../components/MarqueeTicker';

export default function Home({ onOpenTerminal, triggerToast }) {
  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
    soundFx.playSuccess();
    triggerToast(
      'Email Copied',
      `${PERSONAL_INFO.socials.email} copied to clipboard.`,
      'success'
    );
  };

  const featuredProjects = PROJECTS_DATA.slice(0, 2);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Intro */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Available for Projects & Full-Time Roles</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-sans uppercase tracking-wider text-slate-400 font-medium">
                Full-Stack Engineer & IT Specialist
              </p>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                Architecting Resilient Systems & Modern Web Platforms
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              <strong className="text-white font-medium">{PERSONAL_INFO.name}</strong> — Specializing in scalable full-stack architectures, enterprise server administration, and reliable cloud deployments from Majayjay, Laguna, Philippines.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-sans text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-slate-400" />
                <span>Majayjay, Laguna, PH</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <FontAwesomeIcon icon={faShieldHalved} className="w-3 h-3 text-emerald-400" />
                <span>BSIT • Systems Administration</span>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/systems"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-950 font-medium text-xs sm:text-sm hover:bg-slate-200 transition-colors"
              >
                <FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5" />
                <span>Explore Systems</span>
              </Link>

              <button
                onClick={() => {
                  soundFx.playChime(880);
                  onOpenTerminal();
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs sm:text-sm font-sans transition-colors"
              >
                <FontAwesomeIcon icon={faTerminal} className="w-3.5 h-3.5 text-purple-400" />
                <span>CLI Terminal</span>
              </button>

              <Link
                to="/contact"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs sm:text-sm font-sans transition-colors"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-slate-400" />
                <span>Contact Page</span>
              </Link>

              <button
                onClick={copyEmail}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Copy Email Address"
              >
                <FontAwesomeIcon icon={faCopy} className="w-3.5 h-3.5" />
              </button>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
                title="GitHub Profile"
              >
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20 transition-colors"
                title="LinkedIn Profile"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Profile Portrait */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="relative w-64 sm:w-72 rounded-2xl bg-[#0f1118] border border-slate-800 p-2.5 shadow-2xl shadow-black/80 group">
              
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80">
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
                  <span className="flex items-center gap-1 text-slate-200 bg-black/70 px-2 py-0.5 rounded border border-slate-700">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 text-emerald-400" />
                    <span>BSIT</span>
                  </span>
                </div>
              </div>

              <div className="mt-2 px-2 py-1 flex items-center justify-between text-[11px] font-sans text-slate-400">
                <span>Status: Active</span>
                <span className="text-emerald-400">● Laguna, PH</span>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0d0f17] border border-slate-800/80 text-left transition-colors hover:border-slate-700"
            >
              <span className="text-[10px] font-sans font-medium text-slate-500 uppercase tracking-wider block mb-1">
                0{idx + 1} // {stat.label}
              </span>
              <p className="font-sans text-xl sm:text-2xl font-semibold text-white">
                {stat.value}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker />

      {/* Quick Navigation Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <h2 className="text-lg font-sans font-semibold text-white">
            Explore Portfolio Sections
          </h2>
          <span className="text-xs text-slate-500 font-sans">Direct Page Access</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/dossier"
            onClick={() => soundFx.playClick()}
            className="p-5 rounded-2xl bg-[#0d0f17] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-slate-400 group-hover:text-white">
                <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4" />
                <span className="text-xs font-sans text-slate-500">01</span>
              </div>
              <h3 className="text-base font-sans font-medium text-white mb-1">
                The Dossier
              </h3>
              <p className="text-xs text-slate-400">
                Philosophy, engineering background, and core pillars.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-medium text-slate-300 group-hover:text-white">
              <span>Read Dossier</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/systems"
            onClick={() => soundFx.playClick()}
            className="p-5 rounded-2xl bg-[#0d0f17] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-slate-400 group-hover:text-white">
                <FontAwesomeIcon icon={faLayerGroup} className="w-4 h-4" />
                <span className="text-xs font-sans text-slate-500">02</span>
              </div>
              <h3 className="text-base font-sans font-medium text-white mb-1">
                Systems Vault
              </h3>
              <p className="text-xs text-slate-400">
                All 5 production systems, capstone, and repositories.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-medium text-slate-300 group-hover:text-white">
              <span>View Systems</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/capabilities"
            onClick={() => soundFx.playClick()}
            className="p-5 rounded-2xl bg-[#0d0f17] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-slate-400 group-hover:text-white">
                <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                <span className="text-xs font-sans text-slate-500">03</span>
              </div>
              <h3 className="text-base font-sans font-medium text-white mb-1">
                Capabilities
              </h3>
              <p className="text-xs text-slate-400">
                Backend, frontend, cloud, DevOps, and database radar.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-medium text-slate-300 group-hover:text-white">
              <span>Inspect Stack</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/contact"
            onClick={() => soundFx.playClick()}
            className="p-5 rounded-2xl bg-[#0d0f17] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-slate-400 group-hover:text-white">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                <span className="text-xs font-sans text-slate-500">04</span>
              </div>
              <h3 className="text-base font-sans font-medium text-white mb-1">
                Direct Contact
              </h3>
              <p className="text-xs text-slate-400">
                Supabase database inquiry form and email dispatch.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-medium text-slate-300 group-hover:text-white">
              <span>Send Message</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}

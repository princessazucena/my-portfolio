import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faUser, 
  faLayerGroup, 
  faCode, 
  faAward, 
  faEnvelope, 
  faTerminal, 
  faVolumeHigh, 
  faVolumeXmark, 
  faXmark,
  faCopy
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { PERSONAL_INFO } from '../utils/constants';
import { soundFx } from '../utils/audio';
import profileImg from '../assets/profile.jpg';

export default function Sidebar({ 
  isOpen, 
  onClose, 
  onOpenTerminal, 
  soundEnabled, 
  setSoundEnabled, 
  triggerToast 
}) {
  const navItems = [
    { label: 'Overview', to: '/', icon: faHouse, number: '00' },
    { label: 'Dossier', to: '/dossier', icon: faUser, number: '01' },
    { label: 'Systems', to: '/systems', icon: faLayerGroup, number: '02' },
    { label: 'Capabilities', to: '/capabilities', icon: faCode, number: '03' },
    { label: 'Credentials', to: '/credentials', icon: faAward, number: '04' },
    { label: 'Contact', to: '/contact', icon: faEnvelope, number: '05' },
  ];

  const handleNavClick = () => {
    soundFx.playClick();
    onClose();
  };

  const handleSoundToggle = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
    triggerToast(
      newState ? 'Sound Effects On' : 'Sound Effects Off',
      newState ? 'Interactive audio feedback enabled.' : 'Sound synthesizers muted.',
      'info'
    );
  };

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
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 right-0 bottom-0 w-80 sm:w-96 bg-black border-l border-zinc-800 z-50 flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-5 border-b border-zinc-800">
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-3">
              <img 
                src={profileImg} 
                alt="Princess Azucena" 
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                onError={(e) => { e.currentTarget.src = '/profile.jpg'; }}
              />
              <div>
                <h3 className="font-sans font-semibold text-sm text-white">
                  Princess Azucena
                </h3>
                <p className="text-xs text-zinc-400">
                  Full-Stack & IT Specialist
                </p>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-500 px-3 mb-2">
              Navigation Menu
            </p>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-black' : 'text-zinc-500 group-hover:text-zinc-200'
                        }`} 
                      />
                      <span>{item.label}</span>
                    </div>
                    <span className={`text-xs font-sans ${
                      isActive ? 'text-zinc-700 font-medium' : 'text-zinc-600 group-hover:text-zinc-400'
                    }`}>
                      {item.number}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions & Contacts */}
        <div className="space-y-4 pt-5 border-t border-zinc-800">
          
          {/* Quick Tools */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenTerminal();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faTerminal} className="w-3.5 h-3.5 text-zinc-400" />
              <span>CLI Terminal</span>
            </button>

            <button
              onClick={handleSoundToggle}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                soundEnabled
                  ? 'bg-zinc-800 border-zinc-600 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FontAwesomeIcon 
                icon={soundEnabled ? faVolumeHigh : faVolumeXmark} 
                className="w-3.5 h-3.5 text-zinc-300" 
              />
              <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
            </button>
          </div>

          {/* Direct Email Card */}
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-300 truncate max-w-[200px]">
              {PERSONAL_INFO.socials.email}
            </span>
            <button
              onClick={copyEmail}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Copy email"
            >
              <FontAwesomeIcon icon={faCopy} className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 text-xs font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 text-zinc-400" />
              <span>LinkedIn</span>
            </a>
          </div>

          <p className="text-[11px] text-zinc-500 text-center font-sans">
            © {new Date().getFullYear()} Princess Anne B. Azucena
          </p>
        </div>
      </aside>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faXmark, 
  faMicrochip, 
  faShieldHalved, 
  faLayerGroup, 
  faCircleCheck, 
  faArrowUpRightFromSquare,
  faImages,
  faExpand,
  faFileSignature,
  faChartLine,
  faAward
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { soundFx } from '../utils/audio';

// Direct screenshot asset imports for reliable bundling
import skLanding from '../assets/projects/sk/sk-landing.png';
import skStudentDash from '../assets/projects/sk/sk-student-dashboard.png';
import skAdminDash from '../assets/projects/sk/sk-admin-dashboard.png';
import skLogin from '../assets/projects/sk/sk-login.png';

const SCREENSHOT_MAP = {
  'sk-landing': skLanding,
  'sk-student-dashboard': skStudentDash,
  'sk-admin-dashboard': skAdminDash,
  'sk-login': skLogin,
};

export default function ProjectModal({ project, onClose }) {
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, lightboxOpen]);

  if (!project) return null;

  const screenshots = project.screenshots || [];
  const currentScreenshot = screenshots[activeScreenshotIdx];
  const currentImgSrc = currentScreenshot 
    ? (SCREENSHOT_MAP[currentScreenshot.id] || currentScreenshot.image)
    : null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
        <div 
          className="relative w-full max-w-4xl my-auto rounded-2xl bg-black border border-zinc-700 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-sans uppercase font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                {project.type}
              </span>
              <span className="text-xs font-sans text-zinc-400">
                ID: <span className="text-zinc-200">{project.id}</span>
              </span>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            <div>
              <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider block mb-1">
                {project.category}
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-semibold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Special System Feature Callouts for SK Portal */}
            {project.id === 'sk-scholarship' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-sans font-medium text-emerald-400">
                    <FontAwesomeIcon icon={faAward} className="w-3.5 h-3.5" />
                    <span>Auto Certificates</span>
                  </div>
                  <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                    Automatically generates verifiable certificates of scholarship eligibility and awards.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-sans font-medium text-blue-400">
                    <FontAwesomeIcon icon={faChartLine} className="w-3.5 h-3.5" />
                    <span>Admin Monitoring</span>
                  </div>
                  <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                    Live analytics dashboard monitoring applications, verification stages, and student demographics.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/90 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-sans font-medium text-purple-400">
                    <FontAwesomeIcon icon={faFileSignature} className="w-3.5 h-3.5" />
                    <span>Signed Attendance</span>
                  </div>
                  <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                    Compiles official attendance sheets with digital signatures for government audit documentaries.
                  </p>
                </div>
              </div>
            )}

            {/* Screenshots & Interactive UI Showcase */}
            {screenshots.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-sans text-zinc-300 font-medium uppercase">
                    <FontAwesomeIcon icon={faImages} className="w-3.5 h-3.5 text-zinc-400" />
                    <span>System Interface Screenshots ({screenshots.length})</span>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playChime(783.99);
                      setLightboxOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-[11px] font-sans text-zinc-300 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faExpand} className="w-3 h-3" />
                    <span>Full Screen</span>
                  </button>
                </div>

                {/* Main Large Active Screenshot */}
                <div 
                  onClick={() => {
                    soundFx.playChime(783.99);
                    setLightboxOpen(true);
                  }}
                  className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-black border border-zinc-800 cursor-pointer group shadow-xl"
                >
                  <img
                    src={currentImgSrc}
                    alt={currentScreenshot?.title}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white text-black font-medium text-xs flex items-center gap-1.5 shadow-lg">
                      <FontAwesomeIcon icon={faExpand} className="w-3 h-3" />
                      <span>Click to Enlarge Interface</span>
                    </span>
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <p className="text-xs font-sans font-medium text-white">
                      {currentScreenshot?.title}
                    </p>
                    <p className="text-[11px] font-sans text-zinc-300">
                      {currentScreenshot?.caption}
                    </p>
                  </div>
                </div>

                {/* Screenshot Thumbnails Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {screenshots.map((shot, idx) => {
                    const thumbSrc = SCREENSHOT_MAP[shot.id] || shot.image;
                    const isActive = activeScreenshotIdx === idx;

                    return (
                      <button
                        key={shot.id}
                        onClick={() => {
                          soundFx.playClick();
                          setActiveScreenshotIdx(idx);
                        }}
                        className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all duration-200 text-left ${
                          isActive
                            ? 'border-white ring-1 ring-white/50'
                            : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                        }`}
                      >
                        <img
                          src={thumbSrc}
                          alt={shot.title}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1.5">
                          <span className="text-[9px] font-sans font-medium text-white truncate">
                            {shot.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Architecture Blueprint Card */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-sans text-zinc-300 font-medium uppercase">
                <FontAwesomeIcon icon={faMicrochip} className="w-3.5 h-3.5 text-zinc-400" />
                <span>Architectural Blueprint</span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-zinc-200 bg-black p-3 rounded-lg border border-zinc-800/80 leading-relaxed">
                {project.architecture}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-sans text-zinc-300 font-medium uppercase">
                <FontAwesomeIcon icon={faShieldHalved} className="w-3.5 h-3.5 text-zinc-400" />
                <span>Key Capabilities & Governance Modules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-xs text-zinc-300 leading-relaxed">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-2 text-xs font-sans text-zinc-300 font-medium uppercase mb-2">
                <FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5 text-zinc-400" />
                <span>Technologies & Tools</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-sans bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-zinc-800 bg-zinc-950">
            <div className="text-xs font-sans text-zinc-400">
              Live Domain: <span className="text-white font-medium">{project.metrics?.liveLink || project.metrics?.deploy || 'Operational'}</span>
            </div>

            <div className="flex items-center gap-2.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-xs font-sans text-zinc-200 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}

              {project.demoUrl && project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white text-black text-xs font-medium font-sans hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  <span>Launch Live System</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Resolution Screenshot */}
      {lightboxOpen && currentScreenshot && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl my-auto rounded-2xl bg-black border border-zinc-700 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-3.5 bg-zinc-950 border-b border-zinc-800">
              <div>
                <h4 className="font-sans font-medium text-sm text-white">
                  {currentScreenshot.title}
                </h4>
                <p className="text-xs text-zinc-400 font-sans">
                  {currentScreenshot.caption}
                </p>
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 sm:p-4 bg-black flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={currentImgSrc}
                alt={currentScreenshot.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-zinc-800 shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faXmark, 
  faMicrochip, 
  faShieldHalved, 
  faLayerGroup, 
  faCircleCheck, 
  faArrowUpRightFromSquare 
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { soundFx } from '../utils/audio';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-auto rounded-2xl bg-black border border-zinc-700 shadow-2xl overflow-hidden"
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
              <span>Key Capabilities</span>
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
            Deployment: <span className="text-white">{project.metrics?.deploy || project.metrics?.status || 'Cloud Platform'}</span>
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
                <span>Live Project</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

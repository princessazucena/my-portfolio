import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, 
  faArrowUpRightFromSquare, 
  faCircleCheck,
  faImages,
  faAward,
  faChartLine,
  faFileSignature
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { PROJECTS_DATA } from '../utils/constants';
import { soundFx } from '../utils/audio';
import ProjectModal from './ProjectModal';

// Direct screenshot asset imports
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

export default function ProjectVault() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Full-Stack & Cloud', 'DevOps & Systems', 'Interactive Web'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  const handleCategoryChange = (cat) => {
    soundFx.playClick();
    setActiveCategory(cat);
  };

  const handleOpenModal = (project) => {
    soundFx.playChime(783.99);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800 mb-10">
        <div>
          <span className="text-xs font-sans text-zinc-400 font-medium uppercase tracking-wider block mb-1">
            02 // Systems Archive
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Engineered Systems & Repositories
          </h2>
        </div>
        <p className="font-sans text-xs text-zinc-400 max-w-sm text-left sm:text-right font-light">
          Production platforms, civic grant systems, and infrastructure repositories.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-colors ${
              activeCategory === cat
                ? 'bg-white text-black font-medium'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-5">
        {filteredProjects.map((project, idx) => {
          const hasScreenshots = project.screenshots && project.screenshots.length > 0;

          return (
            <div
              key={project.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#09090b] border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between gap-6 group shadow-lg"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Left Column */}
                <div className="lg:max-w-2xl space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-sans text-xs font-medium text-zinc-500">
                      0{idx + 1} //
                    </span>
                    <span className="text-[11px] font-sans uppercase px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                      {project.type}
                    </span>
                    {project.featured && (
                      <span className="text-[11px] font-sans text-emerald-400 flex items-center gap-1">
                        <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" />
                        <span>Flagship</span>
                      </span>
                    )}
                    {hasScreenshots && (
                      <span className="text-[11px] font-sans text-zinc-300 flex items-center gap-1 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        <FontAwesomeIcon icon={faImages} className="w-3 h-3 text-zinc-400" />
                        <span>UI Screenshots Included</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans font-medium text-lg sm:text-xl text-white group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    {project.description}
                  </p>

                  {/* Special Features for SK Scholarship */}
                  {project.id === 'sk-scholarship' && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="text-[11px] font-sans px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faAward} className="w-3 h-3" />
                        <span>Auto-Generates Certificates</span>
                      </span>
                      <span className="text-[11px] font-sans px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faChartLine} className="w-3 h-3 text-zinc-400" />
                        <span>Admin Application Monitoring</span>
                      </span>
                      <span className="text-[11px] font-sans px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faFileSignature} className="w-3 h-3 text-zinc-400" />
                        <span>Signed Attendance for Documentaries</span>
                      </span>
                    </div>
                  )}

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-sans bg-zinc-900 border border-zinc-800 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Actions */}
                <div className="lg:min-w-[220px] flex flex-col sm:flex-row lg:flex-col justify-between items-start lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800 shrink-0">
                  
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-sans text-zinc-500 uppercase block">
                      Category
                    </span>
                    <span className="text-xs font-sans text-zinc-300 font-medium">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors shadow-sm"
                    >
                      <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                      <span>{hasScreenshots ? 'Blueprint & Screenshots' : 'Blueprint'}</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                        title="GitHub Source"
                      >
                        <FontAwesomeIcon icon={faGithub} className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                        title="Launch Live System"
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                </div>
              </div>

              {/* Screenshot Thumbnails Strip Preview directly in Card */}
              {hasScreenshots && (
                <div className="pt-3 border-t border-zinc-850 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {project.screenshots.map((shot) => {
                    const thumbSrc = SCREENSHOT_MAP[shot.id] || shot.image;

                    return (
                      <div
                        key={shot.id}
                        onClick={() => handleOpenModal(project)}
                        className="relative aspect-[16/9] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer group/thumb hover:border-zinc-600 transition-colors"
                      >
                        <img
                          src={thumbSrc}
                          alt={shot.title}
                          className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-2">
                          <span className="text-[10px] font-sans font-medium text-white truncate">
                            {shot.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Blueprint & Screenshot Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEye, 
  faArrowUpRightFromSquare, 
  faCircleCheck 
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { PROJECTS_DATA } from '../utils/constants';
import { soundFx } from '../utils/audio';
import ProjectModal from './ProjectModal';

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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800 mb-10">
        <div>
          <span className="text-xs font-sans text-slate-400 font-medium uppercase tracking-wider block mb-1">
            02 // Systems Archive
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Engineered Systems & Repositories
          </h2>
        </div>
        <p className="font-sans text-xs text-slate-400 max-w-sm text-left sm:text-right font-light">
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
                ? 'bg-white text-slate-950 font-medium'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="p-6 rounded-2xl bg-[#0d0f17] border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
          >
            {/* Left Column */}
            <div className="lg:max-w-2xl space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-medium text-slate-500">
                  0{idx + 1} //
                </span>
                <span className="text-[11px] font-sans uppercase px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  {project.type}
                </span>
                {project.featured && (
                  <span className="text-[11px] font-sans text-emerald-400 flex items-center gap-1">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" />
                    <span>Flagship</span>
                  </span>
                )}
              </div>

              <h3 className="font-sans font-medium text-lg sm:text-xl text-white group-hover:text-slate-200 transition-colors">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                {project.description}
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-sans bg-slate-900 border border-slate-800 text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Actions */}
            <div className="lg:min-w-[220px] flex flex-col sm:flex-row lg:flex-col justify-between items-start lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
              
              <div className="text-left lg:text-right">
                <span className="text-[10px] font-sans text-slate-500 uppercase block">
                  Category
                </span>
                <span className="text-xs font-sans text-slate-300 font-medium">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-950 font-medium text-xs hover:bg-slate-200 transition-colors"
                >
                  <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                  <span>Blueprint</span>
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
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
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Live Access"
                  >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Blueprint Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

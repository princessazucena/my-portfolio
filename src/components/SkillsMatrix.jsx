import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faServer, 
  faCode, 
  faCloud, 
  faDatabase, 
  faCircleCheck,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { SKILLS_DATA } from '../utils/constants';
import { soundFx } from '../utils/audio';

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const iconMap = {
    server: faServer,
    code: faCode,
    cloud: faCloud,
    database: faDatabase,
  };

  const handleSelectCategory = (idx) => {
    soundFx.playClick();
    setSelectedCategory(idx);
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800 mb-10">
        <div>
          <span className="text-xs font-sans text-slate-400 font-medium uppercase tracking-wider block mb-1">
            03 // Capabilities
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Technical Stack & Expertise
          </h2>
        </div>
        <p className="font-sans text-xs text-slate-400 max-w-sm text-left sm:text-right font-light">
          Engineering capabilities across systems, cloud, and modern interfaces.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
        {SKILLS_DATA.map((cat, idx) => {
          const icon = iconMap[cat.icon] || faLayerGroup;
          const isSelected = selectedCategory === idx;

          return (
            <button
              key={cat.category}
              onClick={() => handleSelectCategory(idx)}
              className={`p-4 rounded-xl text-left transition-colors flex items-center gap-3 border ${
                isSelected
                  ? 'bg-slate-900 border-slate-600 text-white'
                  : 'bg-[#0d0f17] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isSelected ? 'bg-slate-800 text-white' : 'bg-slate-950 text-slate-400'
              }`}>
                <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-medium font-sans line-clamp-1">{cat.category}</p>
                <p className="text-[10px] font-sans text-slate-500">{cat.skills.length} Skills</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Skills Display */}
      <div className="rounded-2xl p-6 sm:p-8 bg-[#0d0f17] border border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs font-sans text-slate-400 tracking-wider uppercase">
              Domain 0{selectedCategory + 1}
            </span>
            <h3 className="font-sans font-medium text-lg sm:text-xl text-white mt-0.5">
              {SKILLS_DATA[selectedCategory].category}
            </h3>
          </div>
          <FontAwesomeIcon icon={iconMap[SKILLS_DATA[selectedCategory].icon] || faLayerGroup} className="w-4 h-4 text-slate-500" />
        </div>

        {/* Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILLS_DATA[selectedCategory].skills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => soundFx.playClick()}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs font-sans text-slate-400 font-medium">
                  {skill.level}%
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                <div
                  className="h-full rounded-full bg-slate-200 transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

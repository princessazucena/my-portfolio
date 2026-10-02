import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAward, 
  faCircleCheck, 
  faLocationDot 
} from '@fortawesome/free-solid-svg-icons';
import { CREDENTIALS_DATA } from '../utils/constants';
import { soundFx } from '../utils/audio';

export default function CredentialsTimeline() {
  return (
    <section id="credentials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800 mb-10">
        <div>
          <span className="text-xs font-sans text-zinc-400 font-medium uppercase tracking-wider block mb-1">
            04 // Honors
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Credentials & Academic Records
          </h2>
        </div>
        <p className="font-sans text-xs text-zinc-400 max-w-sm text-left sm:text-right font-light">
          Academic foundations, course distinctions, and capstone leadership.
        </p>
      </div>

      {/* Grid of Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CREDENTIALS_DATA.map((item, idx) => (
          <div
            key={item.id}
            onMouseEnter={() => soundFx.playClick()}
            className="p-6 rounded-2xl bg-[#09090b] border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-sans text-xs font-medium text-zinc-500">
                  0{idx + 1} // {item.badge}
                </span>

                {item.verified && (
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-emerald-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 text-emerald-400" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-sans font-medium text-lg sm:text-xl text-white mb-2 group-hover:text-zinc-200 transition-colors">
                {item.title}
              </h3>

              {/* Institution & Location */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-zinc-400 mb-3">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <FontAwesomeIcon icon={faAward} className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{item.institution}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-zinc-500" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Bottom Status */}
            <div className="pt-3 border-t border-zinc-800 text-[11px] font-sans text-zinc-500 flex items-center justify-between">
              <span>{item.type}</span>
              <span className="text-zinc-300 font-medium">{item.period}</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

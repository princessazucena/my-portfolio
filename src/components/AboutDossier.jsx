import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faServer, 
  faShieldHalved, 
  faCloud, 
  faCompass, 
  faCircleCheck 
} from '@fortawesome/free-solid-svg-icons';
import { PERSONAL_INFO } from '../utils/constants';
import { soundFx } from '../utils/audio';

export default function AboutDossier() {
  const capabilities = [
    {
      num: "01",
      icon: faServer,
      title: "Full-Stack System Engineering",
      subtitle: "Python 3.11+, Flask & React",
      desc: "Architecting reliable backend systems in Flask, Python, and RESTful architectures backed by modular, responsive client applications.",
      tags: ["Flask", "React", "Python", "REST APIs"]
    },
    {
      num: "02",
      icon: faShieldHalved,
      title: "System Admin & Hardening",
      subtitle: "ITEP 414 Distinction",
      desc: "Enterprise Linux/Windows server administration, role-based access control, firewall hardening, and automated disaster recovery schedules.",
      tags: ["Linux Server", "Windows Server", "Bash", "IAM Security"]
    },
    {
      num: "03",
      icon: faCloud,
      title: "Cloud & Container Workflows",
      subtitle: "Docker, Supabase & AWS",
      desc: "Containerizing services with Docker Compose, orchestrating PostgreSQL with Supabase RLS policies, and deploying on AWS/Render/Vercel.",
      tags: ["Docker", "Supabase", "AWS", "Vercel"]
    },
    {
      num: "04",
      icon: faCompass,
      title: "Civic & Enterprise Platforms",
      subtitle: "Biometrics & Automated Grants",
      desc: "Delivering real-world civic impact — from municipal scholarship portals with auto-expiring signed URLs to dispatch logistics with facial verification.",
      tags: ["Biometrics", "Brevo API", "RBAC", "Logistics"]
    },
  ];

  return (
    <section id="dossier" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800 mb-12">
        <div>
          <span className="text-xs font-sans text-slate-400 font-medium uppercase tracking-wider block mb-1">
            01 // Profile
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Engineering Background & Philosophy
          </h2>
        </div>
        <p className="font-sans text-xs text-slate-400 max-w-sm text-left sm:text-right">
          A disciplined pursuit of bulletproof infrastructure and clean human interfaces.
        </p>
      </div>

      {/* Main Story Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left Bio Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0d0f17] border border-slate-800 space-y-4">
          <span className="text-xs font-sans font-medium text-slate-400 uppercase tracking-wider block">
            Core Profile
          </span>
          <h3 className="font-sans text-xl font-medium text-white leading-snug">
            Bridging high-assurance backend systems with minimalist, refined interfaces.
          </h3>
          <div className="pt-3 text-xs font-sans text-slate-300 space-y-1.5 border-t border-slate-800">
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 w-3 h-3" />
              <span>Majayjay, Laguna, Philippines</span>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 w-3 h-3" />
              <span>Bachelor of Science in Information Technology</span>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCircleCheck} className="text-emerald-400 w-3 h-3" />
              <span>Systems Administration & Web Systems</span>
            </p>
          </div>
        </div>

        {/* Right Narrative Paragraphs (7 cols) */}
        <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm font-normal leading-relaxed">
          <p>
            I am an IT scholar and engineer committed to architecting dependable software systems. From real-time field operations to municipal grant platforms, my engineering discipline bridges heavy backend logic with seamless user interactions.
          </p>
          <p>
            My major capstone systems include the <strong className="text-white font-medium">E.B. Dela Cruz Operations & Dispatch System</strong> (with Docker, facial biometric verification, and SMS dispatch) and the <strong className="text-white font-medium">Sangguniang Kabataan Scholarship Portal</strong> (powered by Flask and Supabase PostgreSQL with auto-expiring signed URLs).
          </p>
          <p>
            Whether administering enterprise servers under <strong className="text-white font-medium">ITEP 414</strong> or configuring cloud containers, I prioritize security, resilience, and maintainability.
          </p>
        </div>

      </div>

      {/* Capabilities 4-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {capabilities.map((cap) => (
          <div
            key={cap.num}
            onMouseEnter={() => soundFx.playClick()}
            className="p-6 rounded-2xl bg-[#0d0f17] border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs font-medium text-slate-500">
                  {cap.num} //
                </span>
                <span className="text-[10px] font-sans text-slate-400 uppercase px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {cap.subtitle}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <FontAwesomeIcon icon={cap.icon} className="w-4 h-4 text-slate-400" />
                <h4 className="font-sans font-medium text-base sm:text-lg text-white">
                  {cap.title}
                </h4>
              </div>

              <p className="text-xs text-slate-400 font-normal leading-relaxed mb-4">
                {cap.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
              {cap.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-sans px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

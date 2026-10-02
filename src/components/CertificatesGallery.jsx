import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAward, 
  faCircleCheck, 
  faExpand, 
  faXmark, 
  faArrowUpRightFromSquare, 
  faDownload, 
  faShieldHalved,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import { faAws } from '@fortawesome/free-brands-svg-icons';
import { CERTIFICATIONS_DATA } from '../utils/constants';
import { soundFx } from '../utils/audio';

// Direct imports for reliable bundler asset resolution
import certCloudEssentials from '../assets/certificates/aws-cloud-essentials.png';
import certGenAiQuest from '../assets/certificates/aws-genai-quest.png';
import certMlAi from '../assets/certificates/aws-ml-ai.png';
import certCloudQuest from '../assets/certificates/aws-cloud-quest.png';

const CERT_IMAGES = {
  'aws-cloud-essentials': certCloudEssentials,
  'aws-genai-quest': certGenAiQuest,
  'aws-ml-ai': certMlAi,
  'aws-cloud-quest': certCloudQuest,
};

export default function CertificatesGallery() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Cloud Computing', 'Artificial Intelligence', 'Machine Learning', 'Cloud Infrastructure'];

  const filteredCerts = filter === 'All'
    ? CERTIFICATIONS_DATA
    : CERTIFICATIONS_DATA.filter(c => c.category === filter);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openModal = (cert) => {
    soundFx.playChime(783.99);
    setSelectedCert(cert);
  };

  return (
    <div className="space-y-8">
      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <span className="text-xs font-sans text-zinc-400 font-medium uppercase tracking-wider block mb-1">
            Official Accreditations
          </span>
          <h3 className="font-sans text-xl sm:text-2xl font-semibold text-white tracking-tight flex items-center gap-2.5">
            <FontAwesomeIcon icon={faAws} className="w-6 h-6 text-zinc-200" />
            <span>AWS Verified Certifications</span>
          </h3>
        </div>
        <p className="font-sans text-xs text-zinc-400 max-w-sm text-left sm:text-right font-light">
          Click any certificate to inspect full resolution credentials, dates, and authorization signatures.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundFx.playClick();
              setFilter(cat);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${
              filter === cat
                ? 'bg-white text-black font-medium shadow-sm'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2-Column High-Impact Certificate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCerts.map((cert, idx) => {
          const imgSrc = CERT_IMAGES[cert.id] || cert.image;

          return (
            <div
              key={cert.id}
              onClick={() => openModal(cert)}
              onMouseEnter={() => soundFx.playClick()}
              className="group cursor-pointer rounded-2xl bg-[#09090b] border border-zinc-800 hover:border-zinc-600 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-black/80"
            >
              {/* Image Preview Container */}
              <div className="relative w-full aspect-[16/10] bg-zinc-950 overflow-hidden border-b border-zinc-800/80 p-3 sm:p-4 flex items-center justify-center">
                <img
                  src={imgSrc}
                  alt={cert.title}
                  className="w-full h-full object-contain rounded-lg shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = cert.image;
                  }}
                />

                {/* Hover Overlay with Expand Prompt */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white text-black font-medium text-xs flex items-center gap-1.5 shadow-lg">
                    <FontAwesomeIcon icon={faExpand} className="w-3 h-3" />
                    <span>Inspect Certificate</span>
                  </span>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-sans text-emerald-400 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-700 shadow-sm">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" />
                  <span>AWS Verified</span>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5 space-y-3.5">
                <div className="flex items-center justify-between text-xs font-sans text-zinc-400">
                  <span className="uppercase tracking-wider font-medium text-zinc-500">
                    0{idx + 1} // {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-300">
                    <FontAwesomeIcon icon={faCalendarCheck} className="w-3 h-3 text-zinc-500" />
                    <span>{cert.completedDate}</span>
                  </span>
                </div>

                <h4 className="font-sans font-medium text-base sm:text-lg text-white group-hover:text-zinc-200 transition-colors leading-snug">
                  {cert.title}
                </h4>

                <p className="text-xs text-zinc-400 font-sans">
                  Awarded to: <strong className="text-white font-medium">{cert.recipient}</strong>
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-sans px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center p-3 pt-20 pb-12 sm:p-6 sm:pt-24 sm:pb-16 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-4xl my-auto rounded-2xl bg-black border border-zinc-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-zinc-950 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faAws} className="w-5 h-5 text-white" />
                <div>
                  <h4 className="font-sans font-medium text-sm sm:text-base text-white">
                    {selectedCert.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans">
                    {selectedCert.issuer} • Completed {selectedCert.completedDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCert(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-xs font-medium font-sans text-zinc-200 hover:text-white transition-colors shadow-sm"
                aria-label="Close certificate viewer"
              >
                <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
                <span>Close (Esc)</span>
              </button>
            </div>

            {/* Modal High-Res Certificate Display */}
            <div className="p-4 sm:p-6 bg-zinc-950 flex flex-col items-center justify-center">
              <div className="relative w-full rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-white">
                <img
                  src={CERT_IMAGES[selectedCert.id] || selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-zinc-950 border-t border-zinc-800 text-xs font-sans text-zinc-400">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faShieldHalved} className="w-3.5 h-3.5 text-emerald-400" />
                <span>Authorized by {selectedCert.signatory}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={CERT_IMAGES[selectedCert.id] || selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
                  <span>Open Full Image</span>
                </a>

                <a
                  href={CERT_IMAGES[selectedCert.id] || selectedCert.image}
                  download={`${selectedCert.id}.png`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition-colors shadow-sm"
                >
                  <FontAwesomeIcon icon={faDownload} className="w-3 h-3" />
                  <span>Save Certificate</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

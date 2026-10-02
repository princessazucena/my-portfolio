import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleInfo, faXmark, faStar } from '@fortawesome/free-solid-svg-icons';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0e111a] border border-slate-700 shadow-2xl text-slate-100 animate-slide-up backdrop-blur-xl">
      <div className="text-emerald-400">
        {toast.type === 'success' ? (
          <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
        ) : toast.type === 'secret' ? (
          <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-purple-400" />
        ) : (
          <FontAwesomeIcon icon={faCircleInfo} className="w-4 h-4 text-blue-400" />
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-white font-sans">{toast.title}</p>
        <p className="text-[11px] text-slate-400 font-sans">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-2 text-slate-500 hover:text-white transition-colors p-1"
        aria-label="Close notification"
      >
        <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

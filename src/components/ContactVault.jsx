import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faCopy, 
  faPaperPlane, 
  faLocationDot, 
  faCircleCheck,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { PERSONAL_INFO } from '../utils/constants';
import { soundFx } from '../utils/audio';
import { submitContactInquiry } from '../utils/supabaseClient';

export default function ContactVault({ triggerToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    soundFx.playSuccess();
    triggerToast(
      `${label} Copied`,
      `Copied ${text} to clipboard.`,
      'success'
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundFx.playClick();

    let emailDispatched = false;

    // 1. Dispatch directly via Brevo serverless endpoint (/api/contact)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();

        if (response.ok && result.success) {
          emailDispatched = true;
          soundFx.playSuccess();
          setIsSuccess(true);
          triggerToast(
            'Transmission Delivered',
            'Your message was sent directly to Princess Anne Azucena at ceaneazucena@gmail.com.',
            'success'
          );
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          console.warn('API reported issue:', result.error);
        }
      }
    } catch (apiErr) {
      console.warn('API endpoint connection:', apiErr);
    }

    // 2. Also record to Supabase database table if configured
    try {
      await submitContactInquiry(formData);
    } catch (dbErr) {
      console.warn('Supabase DB log:', dbErr);
    }

    // 3. Fallback to mailto client only if serverless API was unavailable
    if (!emailDispatched) {
      soundFx.playSuccess();
      triggerToast(
        'Email Client Ready',
        'Direct API queued. Opening your email app to ensure transmission.',
        'info'
      );

      const mailtoUrl = `mailto:${PERSONAL_INFO.socials.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800 mb-12">
        <div>
          <span className="text-xs font-sans text-zinc-400 font-medium uppercase tracking-wider block mb-1">
            05 // Contact
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Direct Transmission & Inquiries
          </h2>
        </div>
        <p className="font-sans text-xs text-zinc-400 max-w-sm text-left sm:text-right font-light">
          Messages sent here are delivered directly to <span className="text-white font-medium">{PERSONAL_INFO.socials.email}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Channels */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* Email Card */}
          <div className="p-5 rounded-2xl bg-[#09090b] border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium font-sans uppercase text-white">Direct Email</h4>
                  <p className="text-[11px] font-sans text-zinc-400">Powered by Brevo</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.socials.email, 'Email')}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                title="Copy Email"
              >
                <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
              </button>
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.socials.email}`}
              className="font-sans text-xs text-zinc-300 hover:underline block break-all"
            >
              {PERSONAL_INFO.socials.email}
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="p-5 rounded-2xl bg-[#09090b] border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <FontAwesomeIcon icon={faLinkedin} className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium font-sans uppercase text-white">LinkedIn Profile</h4>
                  <p className="text-[11px] font-sans text-zinc-400">Professional Dossier</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.socials.linkedin, 'LinkedIn URL')}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                title="Copy LinkedIn URL"
              >
                <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
              </button>
            </div>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-zinc-300 hover:text-white hover:underline block truncate"
            >
              {PERSONAL_INFO.socials.linkedin}
            </a>
          </div>

          {/* GitHub Card */}
          <div className="p-5 rounded-2xl bg-[#09090b] border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <FontAwesomeIcon icon={faGithub} className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium font-sans uppercase text-white">GitHub Profile</h4>
                  <p className="text-[11px] font-sans text-zinc-400">Code repositories</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.socials.github, 'GitHub URL')}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                title="Copy GitHub URL"
              >
                <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
              </button>
            </div>
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-zinc-300 hover:underline block truncate"
            >
              {PERSONAL_INFO.socials.github}
            </a>
          </div>

          {/* Location & Status Card */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs font-sans text-zinc-300">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5 text-zinc-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <span className="text-emerald-400 font-medium">● Brevo Active</span>
          </div>

        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#09090b] border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-sans font-medium text-lg sm:text-xl text-white">
              Send Transmission
            </h3>
            <span className="text-[11px] font-sans text-zinc-400 flex items-center gap-1.5 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
              <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 text-emerald-400" />
              <span>Brevo Active</span>
            </span>
          </div>

          <p className="text-xs font-sans text-zinc-400 mb-6">
            Sends an instant notification to <span className="text-zinc-200">{PERSONAL_INFO.socials.email}</span>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Smith"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Full-Stack / Cloud Collaboration"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                Message Content
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project, timeline, or inquiry..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-zinc-500 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-medium text-xs sm:text-sm hover:bg-zinc-200 transition-colors disabled:opacity-70 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="w-3.5 h-3.5 animate-spin" />
                  <span>Transmitting via Brevo...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
                  <span>Send Message Directly</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faCopy, 
  faPaperPlane, 
  faLocationDot, 
  faCircleCheck,
  faDatabase,
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

    // 1. Dispatch directly via Brevo API (/api/contact)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        emailDispatched = true;
        soundFx.playSuccess();
        setIsSuccess(true);
        triggerToast(
          'Message Delivered',
          'Your message was sent directly to Princess Anne Azucena via Brevo.',
          'success'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (apiErr) {
      console.warn('API route not available (e.g. static dev preview):', apiErr);
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
        'Drafting Transmission',
        'Opening your default email client with your message prepared.',
        'success'
      );

      const mailtoUrl = `mailto:${PERSONAL_INFO.socials.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 300);
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800 mb-12">
        <div>
          <span className="text-xs font-sans text-slate-400 font-medium uppercase tracking-wider block mb-1">
            05 // Contact
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Direct Transmission & Inquiries
          </h2>
        </div>
        <p className="font-sans text-xs text-slate-400 max-w-sm text-left sm:text-right font-light">
          Messages sent here are delivered directly to <span className="text-white font-medium">{PERSONAL_INFO.socials.email}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Channels */}
        <div className="lg:col-span-5 space-y-3.5">
          
          {/* Email Card */}
          <div className="p-5 rounded-2xl bg-[#0d0f17] border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium font-sans uppercase text-white">Direct Email</h4>
                  <p className="text-[11px] font-sans text-slate-400">Powered by Brevo</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.socials.email, 'Email')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy Email"
              >
                <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
              </button>
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.socials.email}`}
              className="font-sans text-xs text-slate-300 hover:underline block break-all"
            >
              {PERSONAL_INFO.socials.email}
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="p-5 rounded-2xl bg-[#0d0f17] border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400">
                  <FontAwesomeIcon icon={faLinkedin} className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium font-sans uppercase text-white">LinkedIn Profile</h4>
                  <p className="text-[11px] font-sans text-slate-400">Professional Dossier</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.socials.linkedin, 'LinkedIn URL')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                title="Copy LinkedIn URL"
              >
                <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
              </button>
            </div>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-blue-400 hover:underline block truncate"
            >
              {PERSONAL_INFO.socials.linkedin}
            </a>
          </div>

          {/* GitHub Card */}
          <div className="p-5 rounded-2xl bg-[#0d0f17] border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <FontAwesomeIcon icon={faGithub} className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium font-sans uppercase text-white">GitHub Profile</h4>
                  <p className="text-[11px] font-sans text-slate-400">Code repositories</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.socials.github, 'GitHub URL')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy GitHub URL"
              >
                <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
              </button>
            </div>
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-slate-300 hover:underline block truncate"
            >
              {PERSONAL_INFO.socials.github}
            </a>
          </div>

          {/* Location & Status Card */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs font-sans text-slate-300">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5 text-slate-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <span className="text-emerald-400 font-medium">● Brevo Active</span>
          </div>

        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0d0f17] border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-sans font-medium text-lg sm:text-xl text-white">
              Send Transmission
            </h3>
            <span className="text-[11px] font-sans text-slate-400 flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 text-emerald-400" />
              <span>Brevo API Connected</span>
            </span>
          </div>

          <p className="text-xs font-sans text-slate-400 mb-6">
            Sends an instant notification to <span className="text-slate-200">{PERSONAL_INFO.socials.email}</span>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-sans font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Smith"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-slate-500 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-slate-500 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Full-Stack / Cloud Collaboration"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-slate-500 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Message Content
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project, timeline, or inquiry..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-slate-500 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-slate-950 font-medium text-xs sm:text-sm hover:bg-slate-200 transition-colors disabled:opacity-70"
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

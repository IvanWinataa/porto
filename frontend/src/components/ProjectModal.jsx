import { useEffect, useRef } from 'react';
import NeonButton from './NeonButton';
import { useLanguage } from '../context/useLanguage';

export default function ProjectModal({ project, onClose }) {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = [...(dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) || [])].filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        e.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const focusIsOutsideDialog = !dialogRef.current?.contains(document.activeElement);

      if (e.shiftKey && (document.activeElement === firstElement || focusIsOutsideDialog)) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && (document.activeElement === lastElement || focusIsOutsideDialog)) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, []);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="glass-card border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-[0_20px_60px_rgba(59,130,246,0.3)] text-left cursor-default transition-all duration-300"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-description"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label={t('Close modal', 'Tutup detail proyek')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
            {project.category}
          </span>
          <h2 id="project-dialog-title" className="text-2xl sm:text-3xl font-extrabold mt-3 text-white">
            {project.title}
          </h2>
        </div>

        {/* Visual Banner Preview */}
        <div className={`relative h-52 sm:h-64 w-full rounded-2xl mb-8 overflow-hidden bg-gradient-to-br ${project.gradient || 'from-blue-900/50 to-cyan-900/50'} border border-white/15 flex items-center justify-center`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
          
          <div className="absolute w-48 h-48 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl -bottom-6 -right-6"></div>

          <div className="z-10 text-center px-4">
            <div className="font-mono text-xs text-slate-400 mb-2 uppercase tracking-widest">// {t('SYSTEM PREVIEW ARCHITECTURE', 'PRATINJAU SISTEM')}</div>
            <div className="text-2xl font-bold text-gradient">{project.title}</div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">// {t('System Overview', 'Ringkasan Sistem')}</h3>
            <p id="project-dialog-description" className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {t(
                project.long_description || project.description,
                project.long_descriptionId || project.descriptionId || project.long_description || project.description
              )}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">// {t('Technologies & Libraries', 'Teknologi & Pustaka')}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            {project.live_url ? (
              <NeonButton href={project.live_url} className="px-6 py-2.5 text-xs">
                <span className="flex items-center gap-2">
                  <span>{t('Live Preview', 'Pratinjau Langsung')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </NeonButton>
            ) : (
              <span className="text-slate-500 font-mono text-xs">{t('Internal Production Service', 'Layanan Produksi Internal')}</span>
            )}

            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-2"
              >
                <span>{t('Source Code', 'Kode Sumber')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </a>
            )}
          </div>

          <span className="text-xs font-mono text-slate-500">
            {t('Press', 'Tekan')} <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-slate-300">ESC</kbd> {t('to close', 'untuk menutup')}
          </span>
        </div>
      </div>
    </div>
  );
}


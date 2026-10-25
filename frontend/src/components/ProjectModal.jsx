import { useEffect, useRef } from 'react';
import NeonButton from './NeonButton';
import { useLanguage } from '../context/useLanguage';

export default function ProjectModal({ project, onClose }) {
  const { t, language } = useLanguage();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const caseStudy = project?.case_study || project?.caseStudy || {};
  const localizeCaseStudyValue = (value) => {
    if (typeof value === 'string') return value;
    if (!value || typeof value !== 'object') return '';
    return language === 'id' ? value.id || value.en || '' : value.en || value.id || '';
  };
  const highlights = Array.isArray(caseStudy.highlights)
    ? caseStudy.highlights.map(localizeCaseStudyValue).filter(Boolean)
    : [];
  const storySections = [
    { key: 'challenge', label: t('Challenge', 'Tantangan') },
    { key: 'approach', label: t('Approach', 'Pendekatan') },
    { key: 'role', label: t('My role', 'Peran saya') },
    { key: 'outcome', label: t('Outcome', 'Hasil') }
  ].map((section) => ({ ...section, value: localizeCaseStudyValue(caseStudy[section.key]) }))
    .filter((section) => section.value);

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
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          aria-label={t('Close modal', 'Tutup detail proyek')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="font-mono text-xs text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
            {project.category}
          </span>
          <h2 id="project-dialog-title" className="mt-3 pr-12 text-2xl font-extrabold text-white sm:pr-14 sm:text-3xl">
            {project.title}
          </h2>
        </div>

        {/* Visual Banner Preview */}
        <div className={`relative h-52 sm:h-64 w-full rounded-2xl mb-8 overflow-hidden bg-gradient-to-br ${project.gradient || 'from-blue-900/50 to-teal-900/50'} border border-white/15 flex items-center justify-center`}>
          {project.image_url && (
            <img
              src={project.image_url}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              onError={(event) => event.currentTarget.remove()}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
          
          <div className="absolute w-48 h-48 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute w-36 h-36 bg-teal-500/20 rounded-full blur-2xl -bottom-6 -right-6"></div>

          <div className="z-10 text-center px-4">
            <div className="font-mono text-xs text-slate-400 mb-2 uppercase tracking-widest">// {t('SYSTEM PREVIEW ARCHITECTURE', 'PRATINJAU SISTEM')}</div>
            <div className="text-2xl font-bold text-gradient">{project.title}</div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">// {t('Project Overview', 'Ringkasan Proyek')}</h3>
            <p id="project-dialog-description" className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {t(
                project.long_description || project.description,
                project.long_descriptionId || project.descriptionId || project.long_description || project.description
              )}
            </p>
          </div>

          {(highlights.length > 0 || storySections.length > 0) && (
            <section aria-labelledby="project-case-study-title">
              <h3 id="project-case-study-title" className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
                // {t('Case Study', 'Studi Kasus')}
              </h3>

              {highlights.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-3">
                    {t('Features and focus', 'Fitur dan fokus')}
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {highlights.map((highlight, idx) => (
                      <li key={`${idx}-${highlight}`} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm leading-relaxed text-slate-300">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {storySections.length > 0 && (
                <div className={`grid gap-3 sm:grid-cols-2 ${highlights.length > 0 ? 'mt-5' : ''}`}>
                  {storySections.map(({ key, label, value }) => (
                    <article key={key} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <h4 className="mb-2 text-sm font-semibold text-slate-200">{label}</h4>
                      <p className="text-sm leading-relaxed text-slate-400">{value}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">// {t('Tech Stack', 'Teknologi')}</h3>
            <div className="flex flex-wrap gap-2">
              {(project.tech_stack || []).map((tech, idx) => (
                <span 
                  key={idx} 
                  className="font-mono text-xs text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-lg"
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


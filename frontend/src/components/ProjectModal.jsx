import { useEffect, useRef } from 'react';
import Icon from './Icon';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-lg transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="glass-card flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/20 text-left shadow-[0_20px_60px_rgba(59,130,246,0.3)] cursor-default transition-all duration-300"
        style={{ maxHeight: '92dvh' }}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-description"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 bg-black/40 px-4 py-4 backdrop-blur-xl sm:px-7 sm:py-5">
          <div className="min-w-0">
            <span className="inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-teal-300 sm:text-xs">
              {project.category}
            </span>
            <h2 id="project-dialog-title" className="mt-2 break-words pr-1 text-xl font-extrabold text-white sm:text-2xl">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label={t('Close modal', 'Tutup detail proyek')}
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-7 sm:py-6">
        {/* Visual Banner Preview */}
        <div className={`relative mb-6 flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br sm:mb-8 sm:h-64 ${project.gradient || 'from-blue-900/50 to-teal-900/50'}`}>
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
            <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-400 sm:text-xs sm:tracking-widest">// {t('SYSTEM PREVIEW ARCHITECTURE', 'PRATINJAU SISTEM')}</div>
            <div className="break-words text-lg font-bold text-gradient sm:text-2xl">{project.title}</div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6 pb-1">
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
        </div>

        {/* Pinned Project Actions */}
        <footer className="flex shrink-0 flex-col gap-3 border-t border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-4">
          <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto">
            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-500/50 bg-blue-600 px-4 text-xs font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:min-w-40"
              >
                <span>{t('Live Demo', 'Demo Langsung')}</span>
                <Icon name="externalLink" className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] px-4 text-center font-mono text-xs text-slate-500 sm:min-w-40">
                {t('Demo link unavailable', 'Tautan demo belum tersedia')}
              </span>
            )}

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:min-w-40"
              >
                <Icon name="github" className="h-4 w-4" />
                <span>{t('Source Code', 'Kode Sumber')}</span>
              </a>
            )}
          </div>

          <span className="hidden shrink-0 items-center gap-2 font-mono text-[11px] text-slate-500 sm:inline-flex">
            {t('Press', 'Tekan')} <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-slate-300">ESC</kbd> {t('to close', 'untuk menutup')}
          </span>
        </footer>
      </div>
    </div>
  );
}


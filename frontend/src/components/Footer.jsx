import { useLanguage } from '../context/useLanguage';
import Icon from './Icon';

export default function Footer() {
  const { t } = useLanguage();
  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <footer className="footer-surface relative overflow-hidden border-t border-white/10 py-8 font-mono text-xs text-slate-400 backdrop-blur-md sm:py-10">
      <div aria-hidden="true" className="footer-accent-line absolute inset-x-0 top-0 h-px" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-[-5rem] h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
              <Icon name="code" className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="font-sans text-base font-bold tracking-tight text-white">Ivan.dev</div>
              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                {t('Fullstack Engineering Showcase', 'Portofolio Rekayasa Fullstack')}
              </p>
            </div>
          </div>

          <nav aria-label={t('Social links', 'Tautan sosial')} className="flex w-full flex-wrap gap-2 md:w-auto">
            <a
              href="https://github.com/IvanWinataa"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-blue-400/15 bg-gradient-to-br from-blue-500/[0.08] to-teal-500/[0.04] px-3 font-sans text-[11px] font-semibold text-slate-300 transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-blue-300/30 hover:from-blue-500/[0.14] hover:to-teal-500/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:translate-y-0 md:flex-none md:px-3.5"
            >
              <Icon name="github" className="h-4 w-4 text-blue-300 transition-colors group-hover:text-teal-300" />
              <span>GitHub</span>
              <Icon name="externalLink" className="h-3 w-3 text-slate-500 transition-colors group-hover:text-teal-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/ivan-winata-33b15b286/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-teal-400/15 bg-gradient-to-br from-teal-500/[0.07] to-blue-500/[0.04] px-3 font-sans text-[11px] font-semibold text-slate-300 transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-teal-300/30 hover:from-teal-500/[0.13] hover:to-blue-500/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:translate-y-0 md:flex-none md:px-3.5"
            >
              <Icon name="linkedin" className="h-4 w-4 text-teal-300 transition-colors group-hover:text-blue-300" />
              <span>LinkedIn</span>
              <Icon name="externalLink" className="h-3 w-3 text-slate-500 transition-colors group-hover:text-blue-300" />
            </a>
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t('Back to top', 'Kembali ke atas')}
            className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-500/10 to-teal-500/10 px-4 text-xs font-semibold text-blue-200 transition-[border-color,background-color,color] duration-200 hover:border-teal-300/40 hover:from-blue-500/15 hover:to-teal-500/15 hover:text-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 md:w-auto"
          >
            <span>{t('Back to Top', 'Kembali ke Atas')}</span>
            <svg aria-hidden="true" className="h-3.5 w-3.5 text-blue-300 transition-transform group-hover:-translate-y-0.5 group-hover:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-5 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] leading-relaxed text-slate-500">
            &copy; {new Date().getFullYear()} {t('Designed & built with', 'Dirancang & dibangun dengan')}{' '}
            <Icon name="heart" className="inline-block h-3.5 w-3.5 align-[-2px] text-blue-400" />{' '}
            <span aria-hidden="true">&amp;</span>{' '}
            <span className="text-teal-400">React 19</span>
          </p>
          <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
            {t('Built for the web', 'Dibuat untuk web')}
          </span>
        </div>
      </div>
    </footer>
  );
}

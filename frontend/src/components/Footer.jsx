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
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-[-5rem] h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
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

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t('Back to top', 'Kembali ke atas')}
            className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 text-xs font-semibold text-blue-200 transition-colors hover:border-teal-300/40 hover:bg-teal-400/10 hover:text-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:w-auto"
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

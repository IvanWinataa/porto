import { useState } from 'react';
import NeonButton from '../components/NeonButton';
import { useLanguage } from '../context/useLanguage';

export default function Hero({ onOpenResume }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const codeSnippet = `const developer = {
  name: 'Ivan Winata',
  title: 'Fullstack Software Engineer',
  location: 'Indonesia (Remote)',
  coreStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
  status: 'Open to high-impact projects & opportunities',
  codeQuote: "Clean code is its own best documentation."
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-grid-pattern pt-24 pb-14 sm:pt-28 sm:pb-20">
      {/* Background ambient lighting blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-600/20 via-teal-500/15 to-teal-500/10 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Hero Content */}
          <div className="space-y-5 text-left sm:space-y-6 lg:col-span-7">

            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
              <span aria-hidden="true" className="h-px w-6 bg-teal-400" />
              {t("Hi, I'm Ivan Winata", 'Halo, saya Ivan Winata')}
            </div>
            
            {/* Live Availability Badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md sm:gap-2.5 sm:px-3.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-wide text-emerald-300 sm:text-xs sm:tracking-wider">
                {t('Available for new projects & roles', 'Terbuka untuk proyek dan posisi baru')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-balance text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              {t('Building Next-Gen', 'Membangun')} <span className="text-gradient">{t('Web Applications', 'Aplikasi Web')}</span> {t('& Digital Experiences', '& Pengalaman Digital')}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              {t(
                'Fullstack Engineer specializing in high-concurrency Node.js services, pixel-perfect React/Next.js interfaces, and scalable database architectures.',
                'Fullstack Engineer dengan fokus pada layanan Node.js berkonkurensi tinggi, antarmuka React/Next.js yang presisi, dan arsitektur basis data yang skalabel.'
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-2">
              <NeonButton href="#projects" className="min-h-12 w-full px-7 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:w-auto">
                <span>{t('View Projects', 'Lihat Proyek')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </NeonButton>

              <button
                type="button"
                onClick={onOpenResume}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-teal-500/30 bg-blue-600/15 px-6 py-3 font-mono text-sm text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.12)] backdrop-blur-md transition-all duration-300 hover:border-teal-400 hover:bg-blue-600/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:w-auto"
              >
                <svg aria-hidden="true" className="h-4 w-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{t('View CV / Resume', 'Lihat CV / Resume')}</span>
              </button>
              
              <a 
                href="#contact" 
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-sm text-slate-200 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:w-auto"
              >
                <span>{t('Contact Me', 'Hubungi Saya')}</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid max-w-md grid-cols-3 gap-2 border-t border-white/10 pt-5 sm:gap-4 sm:pt-6">
              <div>
                <div className="font-mono text-2xl font-bold text-white sm:text-3xl">3+</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase leading-snug tracking-wide text-slate-400 sm:text-xs sm:tracking-wider">{t('Years Exp.', 'Tahun Pengalaman')}</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-teal-400 sm:text-3xl">20+</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase leading-snug tracking-wide text-slate-400 sm:text-xs sm:tracking-wider">{t('Projects', 'Proyek')}</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-blue-400 sm:text-3xl">99.9%</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase leading-snug tracking-wide text-slate-400 sm:text-xs sm:tracking-wider">{t('Uptime', 'Waktu Aktif')}</div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Terminal / Code Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-2xl border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              
              {/* Terminal Titlebar */}
              <div className="bg-[#0b0e17] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50" />
                  <span className="ml-2 font-mono text-xs text-slate-400 font-medium">developer.config.ts</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md border border-white/10 transition-colors"
                  title={t('Copy snippet', 'Salin cuplikan kode')}
                >
                  {copied ? (
                    <span className="text-emerald-400 flex items-center gap-1">{t('✓ Copied!', '✓ Tersalin!')}</span>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>{t('Copy', 'Salin')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Code Area */}
              <div className="overflow-x-auto bg-[#060812]/90 p-3 font-mono text-xs leading-relaxed text-slate-300 sm:p-5 sm:text-sm">
                <div className="flex min-w-max items-start gap-2 sm:gap-4">
                  <div className="select-none pr-1 text-right font-mono text-slate-600 sm:pr-2">
                    1<br />2<br />3<br />4<br />5<br />6<br />7<br />8
                  </div>
                  <div>
                    <div><span className="text-blue-400 font-semibold">const</span> <span className="text-teal-300">developer</span> = &#123;</div>
                    <div className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-300">'Ivan Winata'</span>,</div>
                    <div className="pl-4"><span className="text-slate-400">title:</span> <span className="text-emerald-300">'Fullstack Engineer'</span>,</div>
                    <div className="pl-4"><span className="text-slate-400">location:</span> <span className="text-emerald-300">'Indonesia (Remote)'</span>,</div>
                    <div className="pl-4"><span className="text-slate-400">coreStack:</span> [<span className="text-blue-300">'React'</span>, <span className="text-blue-300">'Node.js'</span>, <span className="text-blue-300">'Postgres'</span>],</div>
                    <div className="pl-4"><span className="text-slate-400">status:</span> <span className="text-teal-400">'Open for hire'</span>,</div>
                    <div className="pl-4"><span className="text-slate-400">codeQuote:</span> <span className="text-emerald-300">"Build with passion"</span></div>
                    <div>&#125;;</div>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-[#050b16] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  {t('TypeScript React Ready', 'TypeScript React Siap')}
                </span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


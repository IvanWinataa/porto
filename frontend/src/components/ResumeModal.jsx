import { useEffect, useRef, useState } from 'react';
import NeonButton from './NeonButton';
import { useLanguage } from '../context/useLanguage';

export default function ResumeModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Keyboard trap and ESC handling
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeBtnRef.current?.focus());

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = modalRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + '#experience';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="glass-card border border-white/20 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-2 px-3 py-3 border-b border-white/10 bg-black/40 shrink-0 sm:px-6 sm:py-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <h2 id="resume-title" className="truncate font-mono text-[10px] font-bold text-white tracking-wide sm:text-sm">
              {t('CURRICULUM VITAE // IVAN WINATA', 'DAFTAR RIWAYAT HIDUP // IVAN WINATA')}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Print / Save as PDF Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg border border-cyan-500/30 bg-blue-600/20 px-2 text-xs font-mono text-cyan-300 transition-all hover:bg-blue-600/30 sm:px-3"
              title={t('Print or Save as PDF', 'Cetak atau Simpan sebagai PDF')}
              aria-label={t('Print or save as PDF', 'Cetak atau simpan sebagai PDF')}
            >
              <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="hidden sm:inline">{t('Print / PDF', 'Cetak / PDF')}</span>
            </button>

            {/* Share / Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 text-xs font-mono text-slate-300 transition-all hover:bg-white/10 hover:text-white sm:px-3"
              title={t('Copy Profile Link', 'Salin Tautan Profil')}
              aria-label={copiedLink ? t('Profile link copied', 'Tautan profil tersalin') : t('Copy profile link', 'Salin tautan profil')}
            >
              {copiedLink ? (
                <span className="text-emerald-400 font-semibold">✓ {t('Copied!', 'Tersalin!')}</span>
              ) : (
                <>
                  <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">{t('Share', 'Bagikan')}</span>
                </>
              )}
            </button>

            {/* Close ESC */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="ml-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={t('Close modal', 'Tutup')}
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Content */}
        <div id="resume-printable-content" className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-200">
          
          {/* Header Profile */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ivan Winata
              </h1>
              <p className="text-base sm:text-lg font-medium text-gradient mt-1">
                Fullstack Software Engineer &amp; UI/UX Specialist
              </p>
              <p className="text-xs font-mono text-slate-400 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <span>📍 Indonesia (Available Worldwide / Remote)</span>
                <a
                  href="mailto:ivanwinata1972@gmail.com"
                  className="transition-colors hover:text-cyan-300 focus-visible:rounded-sm"
                >
                  ✉️ ivanwinata1972@gmail.com
                </a>
                <span>🔗 github.com/IvanWinataa</span>
              </p>
            </div>

            <div className="shrink-0 flex sm:flex-col items-start sm:items-end gap-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                ● {t('Available for Hire', 'Siap Menerima Proyek')}
              </span>
              <span className="text-slate-500 text-[11px]">
                {t('Status: Active 2026', 'Status: Aktif 2026')}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2">
              // {t('Professional Summary', 'Ringkasan Profesional')}
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              {t(
                'Results-driven Fullstack Software Engineer with 3+ years of experience engineering high-performance web applications, scalable Node.js microservices, and pixel-perfect React 19 interfaces. Proven track record in PostgreSQL database optimization, RESTful API architecture, zero-trust security validation, and glassmorphism design systems. Passionate about clean code, high concurrency, and delivering seamless user experiences.',
                'Fullstack Software Engineer dengan pengalaman 3+ tahun membangun aplikasi web berkinerja tinggi, microservice Node.js yang skalabel, dan antarmuka React 19 yang presisi. Berpengalaman dalam optimasi database PostgreSQL, arsitektur RESTful API, validasi keamanan zero-trust, dan design system glassmorphism. Berkomitmen pada clean code, konkurensi tinggi, dan pengalaman pengguna yang mulus.'
              )}
            </p>
          </div>

          {/* Core Technical Arsenal */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-3">
              // {t('Technical Competencies', 'Kompetensi Teknis')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚛️</span> Frontend Engineering
                </span>
                <p className="text-xs text-slate-400 leading-normal">
                  React 19, Next.js (App Router), TypeScript, TailwindCSS v4, Vite, Redux, Zustand
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⚡</span> Backend &amp; Architecture
                </span>
                <p className="text-xs text-slate-400 leading-normal">
                  Node.js, Express.js, RESTful APIs, Clean Architecture, WebSockets, JWT Authentication
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🐘</span> Database &amp; DevOps
                </span>
                <p className="text-xs text-slate-400 leading-normal">
                  PostgreSQL, Connection Pooling, Docker, Git / GitHub Workflows, CI/CD, Redis
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-4">
              // {t('Work Experience', 'Pengalaman Kerja')}
            </h3>
            <div className="space-y-6">
              {/* Job 1 */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-white">
                    Senior Fullstack Engineer <span className="text-cyan-400 font-mono text-sm font-normal">@ TechCorp Solutions</span>
                  </h4>
                  <span className="font-mono text-xs text-slate-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                    2024 - Present • Remote
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 leading-relaxed">
                  <li>
                    {t(
                      'Architected high-concurrency Node.js services reducing initial page load by 45% through route-based code splitting and caching.',
                      'Merancang arsitektur microservice Node.js konkurensi tinggi dan menurunkan waktu muat halaman hingga 45% melalui code splitting dan caching.'
                    )}
                  </li>
                  <li>
                    {t(
                      'Optimized PostgreSQL query execution plans and database connection pooling to handle enterprise-level request volumes.',
                      'Mengoptimalkan rencana eksekusi query PostgreSQL dan pooling koneksi untuk menangani volume transaksi skala enterprise.'
                    )}
                  </li>
                  <li>
                    {t(
                      'Engineered zero-downtime deployment pipelines and automated unit testing suites.',
                      'Membangun pipeline deployment tanpa downtime dan rangkaian automated unit testing.'
                    )}
                  </li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-white">
                    Frontend Developer Specialist <span className="text-cyan-400 font-mono text-sm font-normal">@ Nexus Digital Agency</span>
                  </h4>
                  <span className="font-mono text-xs text-slate-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                    2023 - 2024 • Jakarta, ID
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 leading-relaxed">
                  <li>
                    {t(
                      'Crafted responsive glassmorphism component libraries used across 6 enterprise web platforms.',
                      'Membangun pustaka komponen responsif glassmorphism yang digunakan di 6 aplikasi web enterprise.'
                    )}
                  </li>
                  <li>
                    {t(
                      'Integrated WebSocket live feeds and interactive chart visualizers for data monitoring dashboards.',
                      'Mengintegrasikan feed real-time WebSocket dan visualisasi grafik interaktif untuk dashboard telemetri.'
                    )}
                  </li>
                </ul>
              </div>

              {/* Job 3 */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-white">
                    Software Engineering Intern <span className="text-cyan-400 font-mono text-sm font-normal">@ Innovation Labs</span>
                  </h4>
                  <span className="font-mono text-xs text-slate-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                    2022 - 2023 • Hybrid
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 leading-relaxed">
                  <li>
                    {t(
                      'Built RESTful API endpoints in Node.js/Express and implemented database schema migrations in PostgreSQL.',
                      'Mengembangkan endpoint RESTful API dengan Node.js/Express dan migrasi skema tabel PostgreSQL.'
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-3">
              // {t('Education & Certifications', 'Pendidikan & Sertifikasi')}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <h5 className="font-bold text-white">Bachelor of Computer Science / Software Engineering</h5>
                <p className="text-slate-400 mt-0.5">Top Tier University • Graduated with Honors</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <h5 className="font-bold text-white">Certified Fullstack Engineer &amp; Cloud Specialist</h5>
                <p className="text-slate-400 mt-0.5">Cloud Microservices, Scalable SQL, and Modern React</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <span className="font-mono text-xs text-slate-500">
            {t('Press ESC to close or click outside', 'Tekan ESC untuk menutup')}
          </span>

          <div className="flex items-center gap-3">
            <NeonButton onClick={handlePrint} variant="primary" className="text-xs px-5 py-2">
              <span className="flex items-center gap-1.5">
                <span>{t('Print / Save PDF', 'Cetak / Simpan PDF')}</span>
              </span>
            </NeonButton>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              {t('Close', 'Tutup')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

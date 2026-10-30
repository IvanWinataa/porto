import { useState, useEffect } from 'react';
import NeonButton from './NeonButton';
import { useLanguage } from '../context/useLanguage';
import { useTheme } from '../context/useTheme';

const SECTION_IDS = ['about', 'skills', 'architecture', 'api-playground', 'projects', 'experience', 'contact'];

function LanguageToggle({ language, setLanguage, t }) {
  return (
    <div role="group" aria-label={t('Choose language', 'Pilih bahasa')} className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1 font-mono text-[10px]">
      {['en', 'id'].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          aria-label={option === 'en' ? t('Switch to English', 'Ganti ke bahasa Inggris') : t('Switch to Indonesian', 'Ganti ke bahasa Indonesia')}
          className={`rounded-lg px-2 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
            language === option ? 'bg-blue-500/30 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ t }) {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark'
    ? t('Switch to light mode', 'Beralih ke mode terang')
    : t('Switch to dark mode', 'Beralih ke mode gelap');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300 transition-colors hover:border-blue-400/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
    >
      {theme === 'dark' ? (
        <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
          <path strokeLinecap="round" strokeWidth="1.8" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
        </svg>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}

export default function Navbar({ onOpenCommandPalette, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      const updateActiveSection = () => {
        const marker = window.scrollY + window.innerHeight * 0.28;
        const currentSection = sections
          .filter((section) => section.getBoundingClientRect().top + window.scrollY <= marker)
          .at(-1);
        setActiveSection(currentSection?.id || '');
      };

      updateActiveSection();
      window.addEventListener('scroll', updateActiveSection, { passive: true });
      window.addEventListener('resize', updateActiveSection);
      return () => {
        window.removeEventListener('scroll', updateActiveSection);
        window.removeEventListener('resize', updateActiveSection);
      };
    }

    const sectionOrder = new Map(SECTION_IDS.map((id, index) => [id, index]));
    const intersectingSections = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.set(entry.target.id, entry.target);
        } else {
          intersectingSections.delete(entry.target.id);
        }
      });

      const currentSection = [...intersectingSections.keys()]
        .sort((first, second) => sectionOrder.get(first) - sectionOrder.get(second))
        .at(-1);
      setActiveSection(currentSection || '');
    }, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: t('About', 'Tentang'), href: '#about' },
    { name: t('Skills', 'Keahlian'), href: '#skills' },
    { name: t('Architecture', 'Arsitektur'), href: '#architecture' },
    { name: t('API', 'API'), href: '#api-playground' },
    { name: t('Projects', 'Proyek'), href: '#projects' },
    { name: t('Experience', 'Pengalaman'), href: '#experience' },
    { name: t('Contact', 'Kontak'), href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav aria-label={t('Main navigation', 'Navigasi utama')} className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
        scrolled 
          ? 'glass shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-white/10 py-3' 
          : 'bg-black/30 backdrop-blur-md border border-white/5 py-4'
      }`}>
        <div className="px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all">
              <div className="w-full h-full bg-[#070A14] rounded-[11px] flex items-center justify-center font-mono font-bold text-sm text-teal-400">
                {'</>'}
              </div>
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors">
              Ivan<span className="text-gradient">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 font-mono text-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative group rounded-lg border px-3.5 py-2 text-xs uppercase tracking-wider transition-all ${
                    isActive
                      ? 'border-teal-400/20 bg-teal-400/10 text-teal-100 shadow-[0_0_18px_rgba(20,184,166,0.08)]'
                      : 'border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-teal-300 align-middle transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 shadow-[0_0_8px_rgba(45,212,191,0.85)]'
                        : 'opacity-0 group-hover:opacity-50'
                    }`}
                  />
                  {link.name}
                  <span className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-blue-500 to-teal-400 transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </a>
              );
            })}
          </div>

          {/* Right Actions: Command Palette & Status Badge */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle language={language} setLanguage={setLanguage} t={t} />
            <ThemeToggle t={t} />

            {/* Resume / CV Quick Trigger */}
            <button
              type="button"
              onClick={onOpenResume}
              className="flex items-center gap-1.5 font-mono text-xs text-teal-300 bg-blue-600/10 hover:bg-blue-600/20 hover:text-teal-200 border border-teal-500/30 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
              title={t('View Interactive CV & Printable Resume', 'Lihat CV Interaktif & Cetak Resume')}
            >
              <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t('CV', 'CV')}</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-blue-500/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer group shadow-sm"
              title={t('Open Command Palette (Ctrl+K)', 'Buka Command Palette (Ctrl+K)')}
              aria-label={t('Open search and command palette', 'Buka pencarian dan menu perintah')}
              aria-haspopup="dialog"
            >
              <svg aria-hidden="true" className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{t('Search', 'Cari')}</span>
              <kbd className="text-[10px] bg-white/10 text-blue-300 px-1.5 py-0.5 rounded border border-white/10 font-mono">
                ⌘K
              </kbd>
            </button>

            <NeonButton href="#contact" className="text-xs px-5 py-2">
              {t("Let's Talk", 'Mari Bicara')}
            </NeonButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              title={t('Search', 'Cari')}
              aria-label={t('Open search and command palette', 'Buka pencarian dan menu perintah')}
              aria-haspopup="dialog"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label={mobileMenuOpen ? t('Close navigation menu', 'Tutup menu navigasi') : t('Open navigation menu', 'Buka menu navigasi')}
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuOpen ? 'mobile-navigation-menu' : undefined}
            >
              {mobileMenuOpen ? (
                <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-menu" className="md:hidden mt-3 max-h-[calc(100dvh_-_7rem)] overflow-y-auto overscroll-contain pt-3 border-t border-white/10 px-4 pb-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex min-h-11 items-center rounded-lg border px-3 py-2 font-mono text-sm transition-all ${
                    isActive
                      ? 'border-teal-400/25 bg-teal-500/10 text-teal-100 shadow-[0_4px_16px_rgba(20,184,166,0.08)]'
                      : 'border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mr-2 h-1.5 w-1.5 rounded-full bg-teal-300 transition-all duration-300 ${
                      isActive ? 'opacity-100 shadow-[0_0_8px_rgba(45,212,191,0.85)]' : 'opacity-0'
                    }`}
                  />
                  {link.name}
                </a>
              );
            })}

            <div className="flex min-h-11 items-center justify-between gap-3 border-t border-white/10 pt-3">
              <LanguageToggle language={language} setLanguage={setLanguage} t={t} />
              <ThemeToggle t={t} />
            </div>
            
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenResume) onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 text-teal-300 hover:text-white font-mono text-xs py-2 px-3 rounded-lg bg-blue-600/10 border border-teal-500/20"
            >
              <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t('View CV / Resume', 'Lihat CV / Resume')}</span>
            </button>

            <div className="pt-2">
              <NeonButton 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-xs py-2.5"
              >
                {t("Let's Talk", 'Mari Bicara')}
              </NeonButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


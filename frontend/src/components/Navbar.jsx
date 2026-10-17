import { useState, useEffect } from 'react';
import NeonButton from './NeonButton';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

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
          className={`rounded-lg px-2 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300 transition-colors hover:border-blue-400/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      <nav className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
        scrolled 
          ? 'glass shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-white/10 py-3' 
          : 'bg-black/30 backdrop-blur-md border border-white/5 py-4'
      }`}>
        <div className="px-4 sm:px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all">
              <div className="w-full h-full bg-[#070A14] rounded-[11px] flex items-center justify-center font-mono font-bold text-sm text-cyan-400">
                {'</>'}
              </div>
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Ivan<span className="text-gradient">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white px-3.5 py-2 rounded-lg hover:bg-white/5 transition-all text-xs uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* Right Actions: Command Palette & Status Badge */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle language={language} setLanguage={setLanguage} t={t} />
            <ThemeToggle t={t} />

            {/* Resume / CV Quick Trigger */}
            <button
              type="button"
              onClick={onOpenResume}
              className="flex items-center gap-1.5 font-mono text-xs text-cyan-300 bg-blue-600/10 hover:bg-blue-600/20 hover:text-cyan-200 border border-cyan-500/30 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
              title={t('View Interactive CV & Printable Resume', 'Lihat CV Interaktif & Cetak Resume')}
            >
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t('CV', 'CV')}</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-blue-500/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer group shadow-sm"
              title={t('Open Command Palette (Ctrl+K)', 'Buka Command Palette (Ctrl+K)')}
            >
              <svg className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <LanguageToggle language={language} setLanguage={setLanguage} t={t} />
            <ThemeToggle t={t} />
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-xl bg-white/5 text-blue-400 border border-white/10"
              title={t('Search', 'Cari')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
              aria-label={t('Toggle Navigation Menu', 'Buka/tutup menu navigasi')}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 px-4 pb-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-white font-mono text-sm py-2 px-3 rounded-lg hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
            
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenResume) onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 text-cyan-300 hover:text-white font-mono text-xs py-2 px-3 rounded-lg bg-blue-600/10 border border-cyan-500/20"
            >
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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


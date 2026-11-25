import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/useLanguage';
import Icon from './Icon';

export default function CommandPalette({ isOpen, onClose, onOpen, onOpenResume }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const resultsRef = useRef(null);
  const previousFocusRef = useRef(null);
  const toastTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const commands = [
    {
      id: 'nav-hero',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Home (Hero)', 'Ke Beranda (Hero)'),
      shortcut: 'HERO',
      icon: 'home',
      action: () => scrollToSection('hero')
    },
    {
      id: 'nav-about',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to About Me & Tech Stack', 'Ke Tentang Saya & Tech Stack'),
      shortcut: 'ABOUT',
      icon: 'user',
      action: () => scrollToSection('about')
    },
    {
      id: 'nav-skills',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Competency Radar Chart', 'Ke Grafik Kompetensi'),
      shortcut: 'SKILLS',
      icon: 'chart',
      action: () => scrollToSection('skills')
    },
    {
      id: 'nav-architecture',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to System Architecture Flow', 'Ke Alur Arsitektur Sistem'),
      shortcut: 'ARCH',
      icon: 'settings',
      action: () => scrollToSection('architecture')
    },
    {
      id: 'nav-api',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Live API Playground', 'Ke Live API Playground'),
      shortcut: 'API',
      icon: 'bolt',
      action: () => scrollToSection('api-playground')
    },
    {
      id: 'nav-projects',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Featured Projects Showcase', 'Ke Proyek Unggulan'),
      shortcut: 'PROJECTS',
      icon: 'code',
      action: () => scrollToSection('projects')
    },
    {
      id: 'nav-experience',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Experience & Journey', 'Ke Pengalaman & Perjalanan Karier'),
      shortcut: 'EXP',
      icon: 'rocket',
      action: () => scrollToSection('experience')
    },
    {
      id: 'nav-contact',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Contact Section', 'Ke Bagian Kontak'),
      shortcut: 'CONTACT',
      icon: 'mail',
      action: () => scrollToSection('contact')
    },
    {
      id: 'act-resume',
      category: t('Actions', 'Aksi'),
      label: t('View Interactive CV & Printable Resume', 'Lihat CV Interaktif & Cetak Resume'),
      shortcut: 'CV',
      icon: 'file',
      action: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      }
    },
    {
      id: 'act-email',
      category: t('Actions', 'Aksi'),
      label: t('Copy Email Address to Clipboard', 'Salin Alamat Email'),
      shortcut: 'COPY',
      icon: 'clipboard',
      action: () => handleCopyEmail()
    },
    {
      id: 'act-github',
      category: t('Actions', 'Aksi'),
      label: t('Open GitHub Profile', 'Buka Profil GitHub'),
      shortcut: 'GITHUB',
      icon: 'github',
      action: () => {
        window.open('https://github.com/IvanWinataa', '_blank', 'noopener,noreferrer');
        onClose();
      }
    }
  ];

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLocaleLowerCase().includes(normalizedQuery) ||
    cmd.category.toLocaleLowerCase().includes(normalizedQuery)
  );

  const scrollToSection = (id) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      element.scrollIntoView({ behavior });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ivanwinata1972@gmail.com');
      showToast(t('✓ Email copied to clipboard!', '✓ Email berhasil disalin!'), 'success');
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = window.setTimeout(onClose, 1200);
    } catch {
      window.clearTimeout(closeTimerRef.current);
      showToast(t('Could not copy email. Try again.', 'Gagal menyalin email. Coba lagi.'), 'error');
    }
  };

  const showToast = (message, type) => {
    window.clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    if (!isOpen) {
      window.clearTimeout(toastTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
      setToast(null);
    }

    return () => {
      window.clearTimeout(toastTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      const previousFocus = previousFocusRef.current;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleModalKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
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
      } else if (document.activeElement !== inputRef.current) {
        return;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleModalKey);
    return () => window.removeEventListener('keydown', handleModalKey);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const results = resultsRef.current;
    const selectedOption = results?.querySelector('[aria-selected="true"]');
    if (!selectedOption) return;

    const resultsBounds = results.getBoundingClientRect();
    const optionBounds = selectedOption.getBoundingClientRect();
    if (optionBounds.top < resultsBounds.top) {
      results.scrollTop += optionBounds.top - resultsBounds.top;
    } else if (optionBounds.bottom > resultsBounds.bottom) {
      results.scrollTop += optionBounds.bottom - resultsBounds.bottom;
    }
  }, [isOpen, selectedIndex, normalizedQuery]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/80 backdrop-blur-lg transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="glass-card border border-white/20 rounded-2xl max-w-xl w-full overflow-hidden shadow-[0_20px_60px_rgba(59,130,246,0.3)] text-left cursor-default transition-all duration-300 relative"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('Command palette', 'Menu perintah')}
        aria-describedby="command-palette-help"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-white/10 bg-black/40">
          <span className="font-mono text-blue-400 text-lg mr-3 select-none">{'>_'}</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            role="combobox"
            aria-label={t('Search commands', 'Cari perintah')}
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="command-palette-results"
            aria-activedescendant={filteredCommands[selectedIndex] ? `command-option-${filteredCommands[selectedIndex].id}` : undefined}
            placeholder={t('Type a command or section name... (e.g. Projects, Copy)', 'Ketik perintah atau nama bagian... (mis. Proyek, Salin)')}
            className="min-w-0 flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded font-mono text-xs sm:text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label={t('Clear command search', 'Hapus pencarian perintah')}
              title={t('Clear search', 'Hapus pencarian')}
              className="ml-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 animate-fadeIn"
            >
              <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          )}
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close command palette', 'Tutup menu perintah')}
            className="ml-2 p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Command Results */}
        <div ref={resultsRef} id="command-palette-results" role="listbox" aria-label={t('Commands', 'Perintah')} className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const matchIndex = normalizedQuery ? cmd.label.toLocaleLowerCase().indexOf(normalizedQuery) : -1;
              return (
                <div
                  key={cmd.id}
                  id={`command-option-${cmd.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex min-w-0 items-center justify-between gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer sm:px-4 ${
                    isSelected 
                      ? 'bg-blue-600/30 border border-blue-500/40 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Icon name={cmd.icon} className="h-4 w-4 shrink-0 text-teal-300" />
                    <span className="min-w-0 break-words font-sans text-xs font-medium leading-snug sm:text-sm">
                      {matchIndex < 0 ? cmd.label : (
                        <>
                          {cmd.label.slice(0, matchIndex)}
                          <mark className="rounded-sm bg-teal-400/20 text-teal-100">{cmd.label.slice(matchIndex, matchIndex + normalizedQuery.length)}</mark>
                          {cmd.label.slice(matchIndex + normalizedQuery.length)}
                        </>
                      )}
                    </span>
                  </div>
                  <span aria-hidden="true" className="shrink-0 font-mono text-[10px] text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">
                    {cmd.shortcut}
                  </span>
                </div>
              );
            })
          ) : (
            <div role="status" className="mx-1 my-2 rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-8 text-center animate-fadeIn">
              <span aria-hidden="true" className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-teal-400/20 bg-gradient-to-br from-blue-500/10 to-teal-500/10 text-teal-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="10.5" cy="10.5" r="6.5" strokeWidth="1.8" />
                  <path d="m15.5 15.5 5 5" strokeLinecap="round" strokeWidth="1.8" />
                </svg>
              </span>
              <p className="mt-3 font-sans text-sm font-semibold text-slate-200">
                {t('No commands found', 'Perintah tidak ditemukan')}
              </p>
              <p className="mt-1 break-words font-mono text-xs leading-relaxed text-slate-400">
                {t(`No results for "${query}". Try another keyword.`, `Tidak ada hasil untuk "${query}". Coba kata kunci lain.`)}
              </p>
            </div>
          )}
        </div>

        {/* Footer info & Toast feedback */}
        <div id="command-palette-help" className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-t border-white/10 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="text-slate-300 bg-white/10 px-1 rounded">↑↓</kbd> {t('navigate', 'navigasi')}</span>
            <span><kbd className="text-slate-300 bg-white/10 px-1 rounded">↵</kbd> {t('select', 'pilih')}</span>
          </div>

          {toast ? (
            <span
              role={toast.type === 'error' ? 'alert' : 'status'}
              aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
              className={`max-w-[55%] text-right leading-relaxed font-semibold animate-fadeIn ${toast.type === 'error' ? 'text-amber-300' : 'text-emerald-400'}`}
            >
              {toast.message}
            </span>
          ) : (
            <span>Portfolio CLI v2.0</span>
          )}
        </div>
      </div>
    </div>
  );
}


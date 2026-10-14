import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function CommandPalette({ isOpen, onClose, onOpen }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  const commands = [
    {
      id: 'nav-hero',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Home (Hero)', 'Ke Beranda (Hero)'),
      shortcut: 'HERO',
      icon: '🏠',
      action: () => scrollToSection('hero')
    },
    {
      id: 'nav-about',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to About Me & Tech Stack', 'Ke Tentang Saya & Tech Stack'),
      shortcut: 'ABOUT',
      icon: '👤',
      action: () => scrollToSection('about')
    },
    {
      id: 'nav-skills',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Competency Radar Chart', 'Ke Grafik Kompetensi'),
      shortcut: 'SKILLS',
      icon: '📊',
      action: () => scrollToSection('skills')
    },
    {
      id: 'nav-architecture',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to System Architecture Flow', 'Ke Alur Arsitektur Sistem'),
      shortcut: 'ARCH',
      icon: '⚙️',
      action: () => scrollToSection('architecture')
    },
    {
      id: 'nav-projects',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Featured Projects Showcase', 'Ke Proyek Unggulan'),
      shortcut: 'PROJECTS',
      icon: '💻',
      action: () => scrollToSection('projects')
    },
    {
      id: 'nav-experience',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Experience & Journey', 'Ke Pengalaman & Perjalanan Karier'),
      shortcut: 'EXP',
      icon: '🚀',
      action: () => scrollToSection('experience')
    },
    {
      id: 'nav-contact',
      category: t('Navigation', 'Navigasi'),
      label: t('Go to Contact Section', 'Ke Bagian Kontak'),
      shortcut: 'CONTACT',
      icon: '✉️',
      action: () => scrollToSection('contact')
    },
    {
      id: 'act-email',
      category: t('Actions', 'Aksi'),
      label: t('Copy Email Address to Clipboard', 'Salin Alamat Email'),
      shortcut: 'COPY',
      icon: '📋',
      action: () => handleCopyEmail()
    },
    {
      id: 'act-github',
      category: t('Actions', 'Aksi'),
      label: t('Open GitHub Profile', 'Buka Profil GitHub'),
      shortcut: 'GITHUB',
      icon: '🐙',
      action: () => {
        window.open('https://github.com', '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const scrollToSection = (id) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dev@high-end-tech.io');
    showToast(t('✓ Email copied to clipboard!', '✓ Email berhasil disalin!'));
    setTimeout(() => onClose(), 1200);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/80 backdrop-blur-lg transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="glass-card border border-white/20 rounded-2xl max-w-xl w-full overflow-hidden shadow-[0_20px_60px_rgba(139,92,246,0.3)] text-left cursor-default transition-all duration-300 relative"
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
          <span className="font-mono text-purple-400 text-lg mr-3 select-none">{'>_'}</span>
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
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded font-mono text-xs sm:text-sm"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close command palette', 'Tutup menu perintah')}
            className="ml-2 p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Command Results */}
        <div id="command-palette-results" role="listbox" aria-label={t('Commands', 'Perintah')} className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  id={`command-option-${cmd.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-purple-600/30 border border-purple-500/40 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]' 
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="text-base">{cmd.icon}</span>
                    <span className="font-sans text-xs sm:text-sm font-medium">{cmd.label}</span>
                  </div>
                  <span aria-hidden="true" className="font-mono text-[10px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {cmd.shortcut}
                  </span>
                </div>
              );
            })
          ) : (
            <div role="status" className="py-8 text-center font-mono text-xs text-slate-500">
              {t(`No matching commands found for "${query}"`, `Tidak ada perintah yang cocok untuk "${query}"`)}
            </div>
          )}
        </div>

        {/* Footer info & Toast feedback */}
        <div id="command-palette-help" className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-t border-white/10 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="text-slate-300 bg-white/10 px-1 rounded">↑↓</kbd> {t('navigate', 'navigasi')}</span>
            <span><kbd className="text-slate-300 bg-white/10 px-1 rounded">↵</kbd> {t('select', 'pilih')}</span>
          </div>

          {toastMessage ? (
            <span role="status" aria-live="polite" className="text-emerald-400 font-semibold animate-pulse">{toastMessage}</span>
          ) : (
            <span>Portfolio CLI v2.0</span>
          )}
        </div>
      </div>
    </div>
  );
}


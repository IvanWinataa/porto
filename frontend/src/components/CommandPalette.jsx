import { useState, useEffect, useRef } from 'react';

export default function CommandPalette({ isOpen, onClose, onOpen }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const inputRef = useRef(null);

  const commands = [
    {
      id: 'nav-hero',
      category: 'Navigation',
      label: 'Go to Home (Hero)',
      shortcut: 'HERO',
      icon: '🏠',
      action: () => scrollToSection('hero')
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      label: 'Go to About Me & Tech Stack',
      shortcut: 'ABOUT',
      icon: '👤',
      action: () => scrollToSection('about')
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      label: 'Go to Featured Projects Showcase',
      shortcut: 'PROJECTS',
      icon: '💻',
      action: () => scrollToSection('projects')
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      label: 'Go to Experience & Journey',
      shortcut: 'EXP',
      icon: '🚀',
      action: () => scrollToSection('experience')
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      label: 'Go to Contact Section',
      shortcut: 'CONTACT',
      icon: '✉️',
      action: () => scrollToSection('contact')
    },
    {
      id: 'act-email',
      category: 'Actions',
      label: 'Copy Email Address to Clipboard',
      shortcut: 'COPY',
      icon: '📋',
      action: () => handleCopyEmail()
    },
    {
      id: 'act-github',
      category: 'Actions',
      label: 'Open GitHub Profile',
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
    showToast('✓ Email copied to clipboard!');
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

    setTimeout(() => inputRef.current?.focus(), 50);
    document.body.style.overflow = 'hidden';

    const handleModalKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
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
    return () => {
      window.removeEventListener('keydown', handleModalKey);
      document.body.style.overflow = 'unset';
    };
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
            placeholder="Type a command or section name... (e.g. Projects, Copy)"
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none font-mono text-xs sm:text-sm"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Command Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-purple-600/30 border border-purple-500/40 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]' 
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{cmd.icon}</span>
                    <span className="font-sans text-xs sm:text-sm font-medium">{cmd.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {cmd.shortcut}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center font-mono text-xs text-slate-500">
              No matching commands found for "{query}"
            </div>
          )}
        </div>

        {/* Footer info & Toast feedback */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-t border-white/10 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="text-slate-300 bg-white/10 px-1 rounded">↑↓</kbd> navigate</span>
            <span><kbd className="text-slate-300 bg-white/10 px-1 rounded">↵</kbd> select</span>
          </div>

          {toastMessage ? (
            <span className="text-emerald-400 font-semibold animate-pulse">{toastMessage}</span>
          ) : (
            <span>Portfolio CLI v2.0</span>
          )}
        </div>
      </div>
    </div>
  );
}


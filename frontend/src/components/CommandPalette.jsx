import { useState, useEffect, useRef } from 'react';

export default function CommandPalette({ isOpen, onClose, onOpen }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const inputRef = useRef(null);

  // Define commands list
  const commands = [
    {
      id: 'nav-hero',
      category: 'Navigation',
      label: 'Go to Home (Hero)',
      shortcut: 'HERO',
      action: () => scrollToSection('hero')
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      label: 'Go to About Me',
      shortcut: 'ABOUT',
      action: () => scrollToSection('about')
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      label: 'Go to Projects Showcase',
      shortcut: 'PROJECTS',
      action: () => scrollToSection('projects')
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      label: 'Go to Contact Section',
      shortcut: 'CONTACT',
      action: () => scrollToSection('contact')
    },
    {
      id: 'act-email',
      category: 'Quick Actions',
      label: 'Copy Email Address to Clipboard',
      shortcut: 'COPY',
      action: () => handleCopyEmail()
    },
    {
      id: 'act-github',
      category: 'Quick Actions',
      label: 'Open GitHub Profile',
      shortcut: 'GITHUB',
      action: () => {
        window.open('https://github.com', '_blank');
        onClose();
      }
    },
    {
      id: 'act-resume',
      category: 'Quick Actions',
      label: 'Download Curriculum Vitae (CV)',
      shortcut: 'CV',
      action: () => handleDownloadCV()
    }
  ];

  // Filter commands by search query
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

  const handleDownloadCV = () => {
    showToast('⚡ Initiating CV download...');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
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

  // Handle modal internal keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    // Focus input on open
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

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="glass border border-white/20 rounded-2xl max-w-xl w-full overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.25)] text-left cursor-default transition-all duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-white/5">
          <span className="font-mono text-primary text-lg mr-3 select-none">{'>_'}</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search section... (e.g. Projects, CV)"
            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none font-mono text-sm"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-gray-400 bg-white/10 px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Command List Results */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
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
                      ? 'bg-primary/20 border border-primary/40 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                      : 'text-gray-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gray-500 uppercase">{cmd.category}</span>
                    <span className="font-sans text-sm font-medium">{cmd.label}</span>
                  </div>
                  <span className="font-mono text-[11px] text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
                    {cmd.shortcut}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center font-mono text-sm text-gray-500">
              No matching commands found for "{query}"
            </div>
          )}
        </div>

        {/* Footer info & Toast feedback */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-t border-white/5 text-[11px] font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span><kbd className="text-gray-400 bg-white/10 px-1 rounded">↑↓</kbd> navigate</span>
            <span><kbd className="text-gray-400 bg-white/10 px-1 rounded">↵</kbd> select</span>
          </div>

          {toastMessage ? (
            <span className="text-emerald font-semibold animate-pulse">{toastMessage}</span>
          ) : (
            <span>Portfolio CLI v1.0</span>
          )}
        </div>
      </div>
    </div>
  );
}

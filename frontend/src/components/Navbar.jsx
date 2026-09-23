import { useState, useEffect } from 'react';
import NeonButton from './NeonButton';

export default function Navbar({ onOpenCommandPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition-all">
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
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* Right Actions: Command Palette & Status Badge */}
          <div className="hidden md:flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-purple-500/40 px-3.5 py-2 rounded-xl transition-all cursor-pointer group shadow-sm"
              title="Open Command Palette (Ctrl+K)"
            >
              <svg className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
              <kbd className="text-[10px] bg-white/10 text-purple-300 px-1.5 py-0.5 rounded border border-white/10 font-mono">
                ⌘K
              </kbd>
            </button>

            <NeonButton href="#contact" className="text-xs px-5 py-2">
              Let's Talk
            </NeonButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-xl bg-white/5 text-purple-400 border border-white/10"
              title="Search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle Navigation Menu"
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
            <div className="pt-2">
              <NeonButton 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-xs py-2.5"
              >
                Let's Talk
              </NeonButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


import NeonButton from './NeonButton';

export default function Navbar({ onOpenCommandPalette }) {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b-0 rounded-none border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-mono text-xl font-bold tracking-tighter">
            <span className="text-white">{'<'}</span>
            <span className="text-gradient">Portfolio</span>
            <span className="text-white">{' />'}</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">About</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors text-sm">Projects</a>
            
            {/* Command Palette Trigger Badge */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 font-mono text-xs text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              title="Open Command Palette (Ctrl+K)"
            >
              <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Command</span>
              <kbd className="text-[10px] bg-white/10 text-primary px-1.5 py-0.5 rounded border border-white/10">Ctrl K</kbd>
            </button>

            <NeonButton href="#contact">Contact Me</NeonButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

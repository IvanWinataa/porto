export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#04060C]/80 backdrop-blur-md py-12 relative overflow-hidden font-mono text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold">Ivan.dev</span>
          <span>— Fullstack Engineering Showcase</span>
        </div>

        {/* Center copyright */}
        <div className="text-center sm:text-left text-slate-500">
          &copy; {new Date().getFullYear()} Designed & Built with <span className="text-purple-400">♥</span> & <span className="text-cyan-400">React 19</span>
        </div>

        {/* Back to top CTA */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer group"
          title="Back to top"
        >
          <span>Back to Top</span>
          <svg className="w-3.5 h-3.5 text-purple-400 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>

      </div>
    </footer>
  );
}


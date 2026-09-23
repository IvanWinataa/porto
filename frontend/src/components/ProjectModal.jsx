import { useEffect } from 'react';
import NeonButton from './NeonButton';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="glass-card border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-[0_20px_60px_rgba(139,92,246,0.3)] text-left cursor-default transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors cursor-pointer border border-white/10"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
            {project.category}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 text-white">
            {project.title}
          </h2>
        </div>

        {/* Visual Banner Preview */}
        <div className={`relative h-52 sm:h-64 w-full rounded-2xl mb-8 overflow-hidden bg-gradient-to-br ${project.gradient || 'from-purple-900/50 to-cyan-900/50'} border border-white/15 flex items-center justify-center`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
          
          <div className="absolute w-48 h-48 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl -bottom-6 -right-6"></div>

          <div className="z-10 text-center px-4">
            <div className="font-mono text-xs text-slate-400 mb-2 uppercase tracking-widest">// SYSTEM PREVIEW ARCHITECTURE</div>
            <div className="text-2xl font-bold text-gradient">{project.title}</div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">// System Overview</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.long_description || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">// Technologies & Libraries</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            {project.live_url ? (
              <NeonButton href={project.live_url} className="px-6 py-2.5 text-xs">
                <span className="flex items-center gap-2">
                  <span>Live Preview</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </NeonButton>
            ) : (
              <span className="text-slate-500 font-mono text-xs">Internal Production Service</span>
            )}

            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-2"
              >
                <span>Source Code</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </a>
            )}
          </div>

          <span className="text-xs font-mono text-slate-500">
            Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-slate-300">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}


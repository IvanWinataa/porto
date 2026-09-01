import { useEffect } from 'react';
import NeonButton from './NeonButton';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    // Lock body scroll when modal is active
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="glass border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-[0_0_50px_rgba(139,92,246,0.2)] text-left cursor-default transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 rounded-full p-2 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="font-mono text-xs text-secondary bg-secondary/10 px-3 py-1 rounded-full uppercase tracking-wider">
            {project.category}
          </span>
          <h2 className="text-3xl font-bold mt-3 text-white">
            {project.title}
          </h2>
        </div>

        {/* Visual Banner Preview */}
        <div className="relative h-56 sm:h-64 w-full rounded-2xl mb-8 overflow-hidden bg-gradient-to-br from-dark-surface to-dark border border-white/10 flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
          
          <div className="absolute w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute w-32 h-32 bg-secondary/20 rounded-full blur-2xl -bottom-6 -right-6"></div>

          <div className="z-10 text-center px-4">
            <div className="font-mono text-sm text-gray-400 mb-2">SYSTEM PREVIEW MOCKUP</div>
            <div className="text-2xl font-bold text-gradient">{project.title}</div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400 mb-2">System Overview</h3>
            <p className="text-gray-300 leading-relaxed text-base">
              {project.long_description || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-400 mb-3">Technologies Employed</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg"
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
              <NeonButton href={project.live_url} className="px-6 py-2.5 text-sm">
                <span className="flex items-center gap-2">
                  <span>Live Demo</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </NeonButton>
            ) : (
              <span className="text-gray-500 font-mono text-xs">Production Link Offline</span>
            )}

            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-sm font-mono flex items-center gap-2"
              >
                <span>View Source</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </a>
            )}
          </div>

          <button 
            onClick={onClose} 
            className="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors"
          >
            Press ESC to close
          </button>
        </div>
      </div>
    </div>
  );
}

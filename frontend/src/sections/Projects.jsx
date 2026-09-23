import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import ProjectModal from '../components/ProjectModal';
import { fetchProjects } from '../services/api';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'DevPulse Realtime Analytics',
    category: 'Fullstack',
    description: 'High-concurrency developer telemetry platform with live WebSocket streaming, microsecond metrics parsing, and interactive glass charts.',
    long_description: 'DevPulse is a fullstack monitoring solution engineered for cloud-native microservices. It ingests thousands of metrics per second, presenting real-time system health, error traces, and latency distribution through a reactive React dashboard.',
    tech_stack: ['React 19', 'Node.js', 'Express', 'PostgreSQL', 'TailwindCSS', 'WebSockets'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    gradient: 'from-purple-600/30 to-cyan-500/30'
  },
  {
    id: '2',
    title: 'Nova Headless E-Commerce',
    category: 'Fullstack',
    description: 'Ultra-fast headless commerce platform featuring dynamic cart state management, Stripe payment processing, and inventory synchronization.',
    long_description: 'Nova Commerce provides enterprise-grade online shopping experiences. Built with Next.js App Router and PostgreSQL backend, it delivers sub-100ms page loads and full PCI-compliant checkout workflow.',
    tech_stack: ['Next.js', 'PostgreSQL', 'Express.js', 'Stripe API', 'TailwindCSS'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    gradient: 'from-cyan-600/30 to-blue-500/30'
  },
  {
    id: '3',
    title: 'CyberAuth Key Vault',
    category: 'Backend',
    description: 'Zero-trust API gateway & secret management microservice with JWT authentication, rate limiting, and encrypted storage.',
    long_description: 'A secure backend service designed for identity management and key rotation. Includes automated rate limiting, bcrypt key hashing, and role-based access control (RBAC) middleware.',
    tech_stack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    github_url: 'https://github.com',
    live_url: null,
    gradient: 'from-emerald-600/30 to-teal-500/30'
  },
  {
    id: '4',
    title: 'AI Prompt Studio & Workspace',
    category: 'Frontend',
    description: 'Interactive playground for prompt engineering with live token counter, side-by-side output comparison, and export utilities.',
    long_description: 'Designed for AI developers to test and evaluate LLM prompts in real time. Features dynamic model preset selection, variable injection, and visual output diffing.',
    tech_stack: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'Vite'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    gradient: 'from-amber-500/30 to-rose-500/30'
  }
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const response = await fetchProjects();
        if (response.success && response.data && response.data.length > 0) {
          setProjects(response.data);
          setFilteredProjects(response.data);
          const cats = ['All', ...new Set(response.data.map(p => p.category))];
          setCategories(cats);
        } else {
          // Use mock project data fallback
          setProjects(MOCK_PROJECTS);
          setFilteredProjects(MOCK_PROJECTS);
          setCategories(['All', 'Fullstack', 'Backend', 'Frontend']);
        }
      } catch (err) {
        console.warn('API fetch failed, falling back to curated mock project data:', err.message);
        setProjects(MOCK_PROJECTS);
        setFilteredProjects(MOCK_PROJECTS);
        setCategories(['All', 'Fullstack', 'Backend', 'Frontend']);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === category));
    }
  };

  return (
    <section id="projects" className="py-28 relative overflow-hidden bg-grid-pattern">
      {/* Glow highlight */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-purple-400 text-sm font-semibold tracking-wider uppercase">02. Showcase</span>
              <div className="h-[1px] w-12 bg-purple-400/40"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Featured Projects</h2>
          </div>
          <p className="text-slate-400 text-sm font-mono max-w-xs">
            // Selected software systems, fullstack platforms, and APIs.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-600/30 text-white border-purple-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] font-semibold'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-mono text-xs">Loading projects from system network...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <GlassCard 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 cursor-pointer relative"
              >
                <div>
                  {/* Banner mockup container */}
                  <div className={`relative h-48 sm:h-52 w-full rounded-xl mb-6 overflow-hidden bg-gradient-to-br ${project.gradient || 'from-purple-900/40 to-cyan-900/40'} border border-white/10 flex items-center justify-center`}>
                    
                    {/* Grid backdrop */}
                    <div className="absolute inset-0 bg-dots-pattern opacity-40 pointer-events-none" />
                    
                    {/* Floating title tag */}
                    <div className="z-10 text-center px-6 transform group-hover:scale-105 transition-transform duration-500">
                      <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest bg-black/50 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                        {project.category}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h4>
                    </div>

                    {/* Inspect hover banner */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="font-mono text-xs text-white bg-purple-600/40 border border-purple-400/50 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Inspect System Architecture
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech_stack.map((tech, idx) => (
                      <span key={idx} className="font-mono text-[11px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                    {project.github_url ? (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
                      >
                        <span>GitHub Repo</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </a>
                    ) : <div />}

                    {project.live_url ? (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 text-xs font-mono font-semibold"
                      >
                        <span>Live Preview</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-slate-500 text-xs font-mono">Service internal</span>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}


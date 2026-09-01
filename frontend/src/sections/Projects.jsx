import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import ProjectModal from '../components/ProjectModal';
import { fetchProjects } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const response = await fetchProjects();
        if (response.success) {
          setProjects(response.data);
          setFilteredProjects(response.data);
          
          // Extract unique categories
          const cats = ['All', ...new Set(response.data.map(p => p.category))];
          setCategories(cats);
        } else {
          throw new Error(response.message || 'Failed to fetch projects');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
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
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Subtle Glow background */}
      <div className="absolute top-1/3 right-1/10 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-primary font-mono text-xl mr-2">02.</span>
            My Projects
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary/20 text-primary border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-transparent text-gray-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-mono">Loading assets from mainframe...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20 glass rounded-2xl border-red-500/20 max-w-xl mx-auto">
            <p className="text-red-400 font-mono mb-4">⚠️ Database error: {error}</p>
            <p className="text-gray-400 text-sm">Please make sure database server is running and seeded.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <GlassCard 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col justify-between hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative"
              >
                <div>
                  {/* Visual Represent (Premium Glow / Image container) */}
                  <div className="relative h-48 w-full rounded-xl mb-6 overflow-hidden bg-gradient-to-br from-dark-surface to-dark border border-white/5 flex items-center justify-center">
                    {/* Abstract Grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
                    
                    {/* Glow Spot */}
                    <div className="absolute w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 group-hover:scale-150 transition-all duration-500"></div>
                    
                    {/* Inspect hint overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="font-mono text-xs text-primary bg-primary/20 border border-primary/40 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Inspect Details
                      </span>
                    </div>

                    <span className="font-mono text-xs text-gray-500 z-10 select-none uppercase tracking-widest group-hover:opacity-20 transition-opacity">{project.category}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack.map((tech, idx) => (
                      <span key={idx} className="font-mono text-xs text-secondary bg-secondary/5 px-2.5 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5" onClick={(e) => e.stopPropagation()}>
                    {project.github_url ? (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm font-mono"
                      >
                        <span>Source</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </a>
                    ) : <div></div>}
                    
                    {project.live_url ? (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 text-sm font-mono font-semibold"
                      >
                        <span>Demo</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-gray-600 text-xs font-mono">Production offline</span>
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


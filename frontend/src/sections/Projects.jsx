import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import Icon from '../components/Icon';
import ProjectModal from '../components/ProjectModal';
import ScrollReveal from '../components/ScrollReveal';
import { fetchProjects } from '../services/api';
import { useLanguage } from '../context/useLanguage';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'DevPulse Realtime Analytics',
    category: 'Fullstack',
    description: 'High-concurrency developer telemetry platform with live WebSocket streaming, microsecond metrics parsing, and interactive glass charts.',
    descriptionId: 'Platform telemetri developer berkonkurensi tinggi dengan streaming WebSocket langsung, pemrosesan metrik mikrodetik, dan grafik interaktif.',
    long_description: 'DevPulse is a fullstack monitoring solution engineered for cloud-native microservices. It ingests thousands of metrics per second, presenting real-time system health, error traces, and latency distribution through a reactive React dashboard.',
    long_descriptionId: 'DevPulse adalah solusi pemantauan fullstack untuk microservice cloud-native. Platform ini menerima ribuan metrik per detik dan menampilkan kondisi sistem, error trace, serta distribusi latensi secara real-time melalui dashboard React.',
    case_study: {
      highlights: [
        { en: 'Real-time metrics ingestion', id: 'Penerimaan metrik secara real-time' },
        { en: 'Dashboard for system health, error traces, and latency distribution', id: 'Dashboard untuk kondisi sistem, error trace, dan distribusi latensi' }
      ]
    },
    tech_stack: ['React 19', 'Node.js', 'Express', 'PostgreSQL', 'TailwindCSS', 'WebSockets'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    gradient: 'from-blue-600/30 to-teal-500/30'
  },
  {
    id: '2',
    title: 'Nova Headless E-Commerce',
    category: 'Fullstack',
    description: 'Ultra-fast headless commerce platform featuring dynamic cart state management, Stripe payment processing, and inventory synchronization.',
    descriptionId: 'Platform headless commerce yang cepat dengan pengelolaan keranjang dinamis, pemrosesan pembayaran Stripe, dan sinkronisasi inventaris.',
    long_description: 'Nova Commerce provides enterprise-grade online shopping experiences. Built with Next.js App Router and PostgreSQL backend, it delivers sub-100ms page loads and full PCI-compliant checkout workflow.',
    long_descriptionId: 'Nova Commerce menghadirkan pengalaman belanja online untuk kebutuhan enterprise. Dibangun dengan Next.js App Router dan backend PostgreSQL, platform ini menargetkan pemuatan halaman di bawah 100 ms dan alur checkout yang sesuai PCI.',
    case_study: {
      highlights: [
        { en: 'Dynamic cart state management', id: 'Pengelolaan state keranjang dinamis' },
        { en: 'Stripe payment processing and inventory synchronization', id: 'Pemrosesan pembayaran Stripe dan sinkronisasi inventaris' },
        { en: 'Next.js App Router with a PostgreSQL backend', id: 'Next.js App Router dengan backend PostgreSQL' }
      ]
    },
    tech_stack: ['Next.js', 'PostgreSQL', 'Express.js', 'Stripe API', 'TailwindCSS'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    gradient: 'from-teal-600/30 to-teal-500/30'
  },
  {
    id: '3',
    title: 'CyberAuth Key Vault',
    category: 'Backend',
    description: 'Zero-trust API gateway & secret management microservice with JWT authentication, rate limiting, and encrypted storage.',
    descriptionId: 'API gateway zero-trust dan microservice pengelolaan secret dengan autentikasi JWT, rate limiting, dan penyimpanan terenkripsi.',
    long_description: 'A secure backend service designed for identity management and key rotation. Includes automated rate limiting, bcrypt key hashing, and role-based access control (RBAC) middleware.',
    long_descriptionId: 'Layanan backend untuk pengelolaan identitas dan rotasi key. Mencakup rate limiting otomatis, hashing key dengan bcrypt, dan middleware role-based access control (RBAC).',
    case_study: {
      highlights: [
        { en: 'JWT authentication and automated rate limiting', id: 'Autentikasi JWT dan rate limiting otomatis' },
        { en: 'Bcrypt key hashing and role-based access control', id: 'Hashing key dengan bcrypt dan kontrol akses berbasis peran' }
      ]
    },
    tech_stack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    github_url: 'https://github.com',
    live_url: null,
    gradient: 'from-teal-600/30 to-blue-500/30'
  },
  {
    id: '4',
    title: 'AI Prompt Studio & Workspace',
    category: 'Frontend',
    description: 'Interactive playground for prompt engineering with live token counter, side-by-side output comparison, and export utilities.',
    descriptionId: 'Playground interaktif untuk prompt engineering dengan penghitung token langsung, perbandingan output berdampingan, dan fitur ekspor.',
    long_description: 'Designed for AI developers to test and evaluate LLM prompts in real time. Features dynamic model preset selection, variable injection, and visual output diffing.',
    long_descriptionId: 'Dirancang bagi developer AI untuk menguji dan mengevaluasi prompt LLM secara real-time. Fiturnya mencakup pemilihan preset model, penyisipan variabel, dan perbandingan output secara visual.',
    case_study: {
      highlights: [
        { en: 'Model preset selection and variable injection', id: 'Pemilihan preset model dan penyisipan variabel' },
        { en: 'Side-by-side output comparison and export utilities', id: 'Perbandingan output berdampingan dan fitur ekspor' }
      ]
    },
    tech_stack: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'Vite'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    gradient: 'from-blue-700/30 to-teal-500/30'
  }
];

function ProjectSkeletonCard() {
  return (
    <div aria-hidden="true" className="glass-card animate-pulse rounded-2xl p-4 sm:p-6">
      <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:mb-6">
        <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-black/30 px-3">
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="ml-auto h-3 w-2/5 rounded bg-white/10" />
        </div>
        <div className="h-40 bg-white/5 sm:h-48" />
      </div>
      <div className="mb-6 space-y-2.5">
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-4/5 rounded bg-white/10" />
      </div>
      <div className="mb-4 flex gap-2 sm:mb-6">
        <div className="h-6 w-20 rounded-md bg-white/10" />
        <div className="h-6 w-16 rounded-md bg-white/10" />
        <div className="h-6 w-24 rounded-md bg-white/10" />
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div className="h-3 w-28 rounded bg-white/10" />
        <div className="h-3 w-24 rounded bg-white/10" />
      </div>
    </div>
  );
}

export default function Projects() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTechnology, setActiveTechnology] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const technologies = [...new Set(projects.flatMap((project) => project.tech_stack || []))]
    .sort((first, second) => first.localeCompare(second));
  const hasActiveFilters = searchQuery.trim().length > 0
    || activeCategory !== 'All'
    || activeTechnology !== 'All';

  function clearFilters() {
    setSearchQuery('');
    setActiveTechnology('All');
    setActiveCategory('All');
  }

  const searchTerms = searchQuery.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const filteredProjects = projects.filter((project) => {
    const projectTechnologies = project.tech_stack || [];
    const searchableText = [
      project.title,
      project.category,
      project.description,
      project.descriptionId,
      project.long_description,
      project.long_descriptionId,
      ...projectTechnologies
    ].filter(Boolean).join(' ').toLocaleLowerCase();

    const matchesSearch = searchTerms.every((term) => searchableText.includes(term));
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesTechnology = activeTechnology === 'All' || projectTechnologies.includes(activeTechnology);

    return matchesSearch && matchesCategory && matchesTechnology;
  });

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const response = await fetchProjects();
        if (response.success && response.data && response.data.length > 0) {
          setProjects(response.data);
          const cats = ['All', ...new Set(response.data.map(p => p.category))];
          setCategories(cats);
        } else {
          // Use mock project data fallback
          setProjects(MOCK_PROJECTS);
          setCategories(['All', 'Fullstack', 'Backend', 'Frontend']);
        }
      } catch (err) {
        console.warn('API fetch failed, falling back to curated mock project data:', err.message);
        setProjects(MOCK_PROJECTS);
        setCategories(['All', 'Fullstack', 'Backend', 'Frontend']);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden section-surface">
      {/* Glow highlight */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 sm:mb-14 lg:mb-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-blue-400 text-sm font-semibold tracking-wider uppercase">{t('02. Showcase', '02. Karya Pilihan')}</span>
              <div className="h-[1px] w-12 bg-blue-400/40"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">{t('Featured Projects', 'Proyek Unggulan')}</h2>
          </div>
          <p className="max-w-sm font-mono text-sm leading-relaxed text-slate-400">
            // {t('Selected software systems, fullstack platforms, and APIs.', 'Pilihan sistem perangkat lunak, platform fullstack, dan API.')}
          </p>
        </div>

        {/* Search and technology filter */}
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_16rem] mb-6">
          <div>
            <label htmlFor="project-search" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
              {t('Search projects', 'Cari proyek')}
            </label>
            <div className="relative">
              <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="m16 16 4 4" />
              </svg>
              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t('Name, description, or technology...', 'Nama, deskripsi, atau teknologi...')}
                className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="project-technology-filter" className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
              {t('Filter by technology', 'Filter teknologi')}
            </label>
            <select
              id="project-technology-filter"
              value={activeTechnology}
              onChange={(event) => setActiveTechnology(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0D111D] px-3 py-3 text-sm text-slate-200 focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/20"
            >
              <option value="All">{t('All technologies', 'Semua teknologi')}</option>
              {technologies.map((technology) => (
                <option key={technology} value={technology}>{technology}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`min-h-10 px-3 py-2 sm:px-4 rounded-xl text-xs font-mono transition-all duration-300 border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600/30 text-white border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] font-semibold'
                  : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat === 'All' ? t('All', 'Semua') : cat}
            </button>
          ))}
        </div>

        {!loading && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] text-slate-500" aria-live="polite">
              {language === 'id'
                ? `Menampilkan ${filteredProjects.length} dari ${projects.length} proyek`
                : `Showing ${filteredProjects.length} of ${projects.length} projects`}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg px-2 py-1 font-mono text-[11px] text-teal-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                {t('Clear filters', 'Hapus filter')}
              </button>
            )}
          </div>
        )}

        {/* Project Skeletons */}
        {loading && (
          <div role="status" aria-live="polite" aria-busy="true" className="py-2">
            <p className="sr-only">{t('Loading projects from system network...', 'Memuat proyek...')}</p>
            <div className="grid gap-5 sm:gap-8 md:grid-cols-2" aria-hidden="true">
              {Array.from({ length: 4 }, (_, index) => <ProjectSkeletonCard key={index} />)}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
          <div className="grid gap-5 sm:gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={Math.min(index * 90, 360)} className="h-full min-w-0">
                <GlassCard
                  className="group flex h-full flex-col justify-between hover:border-blue-500/40 transition-all duration-300 relative"
                >
                <div>
                  {/* Browser-style project preview */}
                  <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-all duration-500 group-hover:border-blue-400/35 group-hover:shadow-[0_12px_30px_rgba(37,99,235,0.16)] sm:mb-6">
                    <div aria-hidden="true" className="relative flex h-8 items-center border-b border-white/10 bg-black/30 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-400/80" />
                        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                      </div>
                      <div className="absolute left-1/2 flex h-4 w-2/5 -translate-x-1/2 items-center gap-1.5 rounded-md border border-white/5 bg-white/5 px-2">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-teal-400/70" />
                        <span className="h-1 flex-1 rounded-full bg-white/10" />
                      </div>
                    </div>

                    <div className={`project-preview relative flex h-40 w-full items-center justify-center overflow-hidden bg-gradient-to-br sm:h-48 ${project.gradient || 'from-blue-900/40 to-teal-900/40'}`}>
                      {project.image_url && (
                        <img
                          src={project.image_url}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          onError={(event) => event.currentTarget.remove()}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" />
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots-pattern opacity-40" />

                      <div className="z-10 transform px-3 text-center transition-transform duration-500 group-hover:scale-105 sm:px-6">
                        <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-teal-300 backdrop-blur-md">
                          {project.category}
                        </span>
                        <h4 className="mt-3 text-lg font-bold text-white transition-colors group-hover:text-teal-300 sm:text-xl">
                          {project.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2">
                        {t(project.description, project.descriptionId || project.description)}
                  </p>
                </div>

                <div>
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-6">
                    {(project.tech_stack || []).map((tech, idx) => (
                      <span key={idx} className="font-mono text-[11px] text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-haspopup="dialog"
                      aria-label={t(`View details for ${project.title}`, `Lihat detail ${project.title}`)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded text-xs font-mono text-blue-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    >
                      <span>{t('View Case Study', 'Lihat Studi Kasus')}</span>
                      <Icon name="arrowRight" className="h-3.5 w-3.5" />
                    </button>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t(`Open source code for ${project.title}`, `Buka kode sumber ${project.title}`)}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                        >
                          <Icon name="github" className="h-4 w-4" />
                          <span>{t('Source Code', 'Kode Sumber')}</span>
                        </a>
                      )}

                      {project.live_url ? (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t(`Open live demo for ${project.title}`, `Buka demo ${project.title}`)}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-500/50 bg-blue-600 px-4 text-xs font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                        >
                          <span>{t('Live Demo', 'Demo Langsung')}</span>
                          <Icon name="externalLink" className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] px-4 text-center text-xs font-mono text-slate-500">
                          {t('Demo link unavailable', 'Tautan demo belum tersedia')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
            <p className="text-sm font-semibold text-white">{t('No matching projects found', 'Tidak ada proyek yang cocok')}</p>
            <p className="mt-2 text-xs text-slate-400">{t('Try another search term or clear the selected filters.', 'Coba kata pencarian lain atau hapus filter yang dipilih.')}</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-lg border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-200 transition-colors hover:bg-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              {t('Clear filters', 'Hapus filter')}
            </button>
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


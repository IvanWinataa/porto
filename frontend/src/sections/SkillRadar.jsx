import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import Icon from '../components/Icon';
import { useLanguage } from '../context/useLanguage';

export default function SkillRadar() {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const { t } = useLanguage();

  const skills = [
    {
      id: 'frontend',
      label: 'Frontend Eng.',
      score: 95,
      level: 'Mastery',
      levelId: 'Mahir',
      color: '#61DAFB',
      icon: 'atom',
      description: 'Building high-performance, accessible Single Page Applications & Next.js web applications with modern state management and glassmorphism UIs.',
      descriptionId: 'Membangun Single Page Application dan aplikasi web Next.js yang cepat, mudah diakses, serta menggunakan pengelolaan state modern dan antarmuka glassmorphism.',
      technologies: ['React 19', 'Next.js App Router', 'TypeScript', 'TailwindCSS v4', 'Vite', 'Redux / Zustand'],
      highlights: ['99+ Lighthouse Performance Score', 'Sub-100ms Page Transitions', 'Pixel-perfect responsive layouts'],
      highlightsId: ['Skor performa Lighthouse 99+', 'Transisi halaman di bawah 100 ms', 'Tata letak responsif yang presisi']
    },
    {
      id: 'backend',
      label: 'Backend Dev.',
      score: 92,
      level: 'Expert',
      levelId: 'Ahli',
      color: '#339933',
      icon: 'server',
      description: 'Designing non-blocking async RESTful APIs, Express gateways, middleware pipelines, and scalable serverless microservices.',
      descriptionId: 'Merancang REST API asinkron non-blocking, gateway Express, pipeline middleware, dan microservice serverless yang skalabel.',
      technologies: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT / Auth', 'CORS Middleware', 'WebSockets'],
      highlights: ['High-concurrency event handling', 'Clean Modular Architecture', 'Comprehensive error boundaries'],
      highlightsId: ['Menangani event dengan konkurensi tinggi', 'Arsitektur modular yang rapi', 'Penanganan error yang menyeluruh']
    },
    {
      id: 'database',
      label: 'Database Arch.',
      score: 88,
      level: 'Advanced',
      levelId: 'Lanjutan',
      color: '#4169E1',
      icon: 'database',
      description: 'Architecting relational PostgreSQL schemas, optimizing connection pool clients, and writing indexed SQL queries.',
      descriptionId: 'Merancang skema relasional PostgreSQL, mengoptimalkan connection pool, dan menulis query SQL dengan indeks.',
      technologies: ['PostgreSQL', 'Connection Pooling (`pg`)', 'SQL Optimization', 'Database Migrations', 'ACID Transactions'],
      highlights: ['Zero-downtime query execution', 'Normalized DB Schema design', 'Parameterized SQL Injection guards'],
      highlightsId: ['Eksekusi query tanpa downtime', 'Perancangan skema basis data ternormalisasi', 'Pencegahan SQL injection dengan parameter']
    },
    {
      id: 'architecture',
      label: 'System Arch.',
      score: 85,
      level: 'Advanced',
      levelId: 'Lanjutan',
      color: '#A78BFA',
      icon: 'layers',
      description: 'Enforcing clean code principles, modular component decoupling, design patterns, and end-to-end data flow optimization.',
      descriptionId: 'Menerapkan prinsip clean code, pemisahan komponen modular, design pattern, dan optimasi alur data menyeluruh.',
      technologies: ['Clean Architecture', 'Design Patterns', 'Async Flow Control', 'API Specifications', 'DTO Validation'],
      highlights: ['Maintainable self-documenting code', 'Loosely coupled modules', 'High testability standards'],
      highlightsId: ['Kode yang mudah dirawat dan menjelaskan dirinya sendiri', 'Modul dengan keterikatan rendah', 'Standar kemudahan pengujian yang tinggi']
    },
    {
      id: 'devops',
      label: 'DevOps & Tools',
      score: 82,
      level: 'Proficient',
      levelId: 'Terampil',
      color: '#2496ED',
      icon: 'box',
      description: 'Containerizing application environments with Docker, automating git workflows, and managing build pipelines.',
      descriptionId: 'Mengemas lingkungan aplikasi dengan Docker, mengotomatisasi alur kerja Git, dan mengelola pipeline build.',
      technologies: ['Docker', 'Git & GitHub', 'CI/CD Basics', 'npm / Vite Bundling', 'Environment Isolation'],
      highlights: ['Multi-stage build optimization', 'Reproducible dev environments', 'Version control hygiene'],
      highlightsId: ['Optimasi build multi-stage', 'Lingkungan pengembangan yang dapat direproduksi', 'Pengelolaan version control yang rapi']
    },
    {
      id: 'uiux',
      label: 'UI/UX Design',
      score: 88,
      level: 'Advanced',
      levelId: 'Lanjutan',
      color: '#F24E1E',
      icon: 'palette',
      description: 'Designing intuitive glassmorphism wireframes in Figma and translating them into dynamic, interactive web interfaces.',
      descriptionId: 'Merancang wireframe glassmorphism yang intuitif di Figma dan menerjemahkannya menjadi antarmuka web yang dinamis dan interaktif.',
      technologies: ['Figma Prototyping', 'Design Systems', 'Micro-interactions', 'Dark Mode Ergonomics', 'Accessibility'],
      highlights: ['Custom design tokens', 'Smooth 60fps micro-animations', 'User-centered design focus'],
      highlightsId: ['Design token khusus', 'Mikroanimasi halus 60 fps', 'Berfokus pada kebutuhan pengguna']
    }
  ];

  const currentSkill = skills[selectedSkillIndex] || skills[0];

  // Radar SVG Math constants
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const totalAxes = skills.length;

  // Calculate coordinates for any skill given index and score percentage (0-100)
  const getCoordinates = (index, valuePercent) => {
    const angle = (index * (360 / totalAxes) - 90) * (Math.PI / 180);
    const r = (valuePercent / 100) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    };
  };

  // Generate polygon points string for data overlay
  const polygonPoints = skills
    .map((skill, idx) => {
      const { x, y } = getCoordinates(idx, skill.score);
      return `${x},${y}`;
    })
    .join(' ');

  // Concentric background rings (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-grid-pattern">
      {/* Background glow spot */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 sm:mb-14 lg:mb-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-teal-400 text-sm font-semibold tracking-wider uppercase">{t('Competency Matrix', 'Matriks Kompetensi')}</span>
              <div className="h-[1px] w-12 bg-teal-400/40"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">{t('Skill Radar Chart', 'Grafik Radar Keahlian')}</h2>
          </div>
          <p className="max-w-sm font-mono text-sm leading-relaxed text-slate-400">
            // {t('Multi-dimensional evaluation across technical domains.', 'Evaluasi multidimensi untuk berbagai bidang teknis.')}
          </p>
        </div>

        {/* Main Grid: Radar Chart SVG (Left) & Skill Detail Inspector (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Radar Chart SVG Visualizer Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="glass-card rounded-3xl p-6 sm:p-8 w-full border border-white/10 relative flex flex-col items-center shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              
              <div className="w-full flex flex-col items-start gap-2 justify-between font-mono text-[10px] text-slate-400 pb-2 mb-4 border-b border-white/10 sm:flex-row sm:items-center sm:text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                  SVG Vector Competency Radar
                </span>
                  <span className="text-teal-300 font-bold">{t('6-Axis Metric', 'Metrik 6 Sumbu')}</span>
              </div>

              {/* SVG Canvas */}
              <div className="relative aspect-square w-full max-w-[320px] flex items-center justify-center">
                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${size} ${size}`}
                  role="img"
                  aria-label={t('Radar chart visualizing six skill areas. Use the skill buttons to inspect each area.', 'Grafik radar enam area keahlian. Gunakan tombol keahlian untuk melihat detail setiap area.')}
                  className="overflow-visible select-none"
                >
                  
                  {/* Concentric Hexagon Grid Rings */}
                  {gridLevels.map((level) => {
                    const points = skills
                      .map((_, idx) => {
                        const { x, y } = getCoordinates(idx, level);
                        return `${x},${y}`;
                      })
                      .join(' ');

                    return (
                      <polygon
                        key={level}
                        points={points}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="1"
                        strokeDasharray={level === 100 ? 'none' : '3,3'}
                      />
                    );
                  })}

                  {/* Radial Axis Lines */}
                  {skills.map((_, idx) => {
                    const outerPoint = getCoordinates(idx, 100);
                    return (
                      <line
                        key={idx}
                        x1={cx}
                        y1={cy}
                        x2={outerPoint.x}
                        y2={outerPoint.y}
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Filled Skill Data Polygon */}
                  <polygon
                    points={polygonPoints}
                    fill="url(#radarGradient)"
                    stroke="#60a5fa"
                    strokeWidth="2.5"
                    className="transition-all duration-500 filter drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]"
                  />

                  {/* SVG Gradient Def */}
                  <defs>
                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.45)" />
                      <stop offset="100%" stopColor="rgba(20,184,166, 0.35)" />
                    </linearGradient>
                  </defs>

                  {/* Vertex Circles / Nodes */}
                  {skills.map((skill, idx) => {
                    const { x, y } = getCoordinates(idx, skill.score);
                    const isSelected = idx === selectedSkillIndex;

                    return (
                      <g key={skill.id} aria-hidden="true">
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? "7" : "4.5"}
                          fill={isSelected ? "#2dd4bf" : "#60a5fa"}
                          stroke="#030712"
                          strokeWidth="2"
                          className="transition-all duration-300 hover:scale-150"
                        />
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r="11"
                            fill="none"
                            stroke="#2dd4bf"
                            strokeWidth="1.5"
                            className="animate-ping opacity-75"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

              </div>

              {/* Skill categories stay visible and easy to scan on every screen size. */}
              <div
                role="group"
                aria-label={t('Choose a skill area', 'Pilih bidang keahlian')}
                className="mt-5 grid w-full grid-cols-2 gap-2 border-t border-white/10 pt-4 sm:grid-cols-3"
              >
                {skills.map((skill, idx) => {
                  const isSelected = idx === selectedSkillIndex;

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkillIndex(idx)}
                      aria-pressed={isSelected}
                      aria-label={t(`Show ${skill.label} details`, `Tampilkan detail ${skill.label}`)}
                      className={`flex min-h-[62px] min-w-0 items-center gap-2 rounded-xl border p-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 sm:gap-2.5 sm:p-2.5 ${
                        isSelected
                          ? 'border-teal-300/45 bg-teal-400/10 shadow-[0_0_18px_rgba(20,184,166,0.12)]'
                          : 'border-white/10 bg-white/[0.025] hover:border-blue-300/30 hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                        isSelected
                          ? 'border-teal-300/25 bg-teal-400/10 text-teal-300'
                          : 'border-white/10 bg-blue-400/[0.06] text-blue-300'
                      }`}>
                        <Icon name={skill.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate font-mono text-[10px] font-semibold leading-tight sm:text-[11px] ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {skill.label}
                        </span>
                        <span className="mt-1 block truncate font-mono text-[9px] text-slate-500 sm:text-[10px]">
                          {skill.score}% · {t(skill.level, skill.levelId)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Skill Detail Inspector Column (Right 6 cols) */}
          <div className="lg:col-span-6">
            
            <GlassCard className="space-y-6">
              
              {/* Skill Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-teal-300 flex items-center justify-center">
                    <Icon name={currentSkill.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-teal-300 uppercase tracking-widest">// {t('DOMAIN INSPECTOR', 'DETAIL BIDANG')}</span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">{currentSkill.label}</h3>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-teal-400">{currentSkill.score}%</div>
                  <div className="font-mono text-[10px] text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md mt-1">
                    {t(currentSkill.level, currentSkill.levelId)}
                  </div>
                </div>
              </div>

              {/* Skill Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span>{t('Proficiency Rating', 'Tingkat Penguasaan')}</span>
                  <span className="text-slate-200">{currentSkill.score} / 100</span>
                </div>
                <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(20,184,166,0.5)]"
                    style={{ width: `${currentSkill.score}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {t(currentSkill.description, currentSkill.descriptionId)}
              </p>

              {/* Stack Pills */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">// {t('Technologies Employed', 'Teknologi yang Digunakan')}</h4>
                <div className="flex flex-wrap gap-2">
                  {currentSkill.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-xs text-teal-300 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="pt-2 border-t border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">// {t('Engineering Highlights', 'Sorotan Rekayasa')}</h4>
                <div className="space-y-2">
                  {currentSkill.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-mono">✓</span>
                      <span>{t(item, currentSkill.highlightsId[idx])}</span>
                    </div>
                  ))}
                </div>
              </div>

            </GlassCard>

          </div>

        </div>

      </div>
    </section>
  );
}

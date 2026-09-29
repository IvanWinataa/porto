import { useState } from 'react';
import GlassCard from '../components/GlassCard';

export default function SkillRadar() {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);

  const skills = [
    {
      id: 'frontend',
      label: 'Frontend Eng.',
      score: 95,
      level: 'Mastery',
      color: '#61DAFB',
      icon: '⚛️',
      description: 'Building high-performance, accessible Single Page Applications & Next.js web applications with modern state management and glassmorphism UIs.',
      technologies: ['React 19', 'Next.js App Router', 'TypeScript', 'TailwindCSS v4', 'Vite', 'Redux / Zustand'],
      highlights: ['99+ Lighthouse Performance Score', 'Sub-100ms Page Transitions', 'Pixel-perfect responsive layouts']
    },
    {
      id: 'backend',
      label: 'Backend Dev.',
      score: 92,
      level: 'Expert',
      color: '#339933',
      icon: '⚡',
      description: 'Designing non-blocking async RESTful APIs, Express gateways, middleware pipelines, and scalable serverless microservices.',
      technologies: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT / Auth', 'CORS Middleware', 'WebSockets'],
      highlights: ['High-concurrency event handling', 'Clean Modular Architecture', 'Comprehensive error boundaries']
    },
    {
      id: 'database',
      label: 'Database Arch.',
      score: 88,
      level: 'Advanced',
      color: '#4169E1',
      icon: '🐘',
      description: 'Architecting relational PostgreSQL schemas, optimizing connection pool clients, and writing indexed SQL queries.',
      technologies: ['PostgreSQL', 'Connection Pooling (`pg`)', 'SQL Optimization', 'Database Migrations', 'ACID Transactions'],
      highlights: ['Zero-downtime query execution', 'Normalized DB Schema design', 'Parameterized SQL Injection guards']
    },
    {
      id: 'architecture',
      label: 'System Arch.',
      score: 85,
      level: 'Advanced',
      color: '#A78BFA',
      icon: '🏛️',
      description: 'Enforcing clean code principles, modular component decoupling, design patterns, and end-to-end data flow optimization.',
      technologies: ['Clean Architecture', 'Design Patterns', 'Async Flow Control', 'API Specifications', 'DTO Validation'],
      highlights: ['Maintainable self-documenting code', 'Loosely coupled modules', 'High testability standards']
    },
    {
      id: 'devops',
      label: 'DevOps & Tools',
      score: 82,
      level: 'Proficient',
      color: '#2496ED',
      icon: '🐳',
      description: 'Containerizing application environments with Docker, automating git workflows, and managing build pipelines.',
      technologies: ['Docker', 'Git & GitHub', 'CI/CD Basics', 'npm / Vite Bundling', 'Environment Isolation'],
      highlights: ['Multi-stage build optimization', 'Reproducible dev environments', 'Version control hygiene']
    },
    {
      id: 'uiux',
      label: 'UI/UX Design',
      score: 88,
      level: 'Advanced',
      color: '#F24E1E',
      icon: '🎨',
      description: 'Designing intuitive glassmorphism wireframes in Figma and translating them into dynamic, interactive web interfaces.',
      technologies: ['Figma Prototyping', 'Design Systems', 'Micro-interactions', 'Dark Mode Ergonomics', 'Accessibility'],
      highlights: ['Custom design tokens', 'Smooth 60fps micro-animations', 'User-centered design focus']
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
    <section id="skills" className="py-28 relative overflow-hidden bg-grid-pattern">
      {/* Background glow spot */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-cyan-400 text-sm font-semibold tracking-wider uppercase">Competency Matrix</span>
              <div className="h-[1px] w-12 bg-cyan-400/40"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Skill Radar Chart</h2>
          </div>
          <p className="text-slate-400 text-sm font-mono max-w-xs">
            // Multi-dimensional evaluation across technical domains.
          </p>
        </div>

        {/* Main Grid: Radar Chart SVG (Left) & Skill Detail Inspector (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Radar Chart SVG Visualizer Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="glass-card rounded-3xl p-6 sm:p-8 w-full border border-white/10 relative flex flex-col items-center shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              
              <div className="w-full flex items-center justify-between font-mono text-xs text-slate-400 pb-2 mb-4 border-b border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  SVG Vector Competency Radar
                </span>
                <span className="text-cyan-300 font-bold">6-Axis Metric</span>
              </div>

              {/* SVG Canvas */}
              <div className="relative w-[320px] h-[320px] flex items-center justify-center">
                <svg width={size} height={size} className="overflow-visible select-none">
                  
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
                    stroke="#a78bfa"
                    strokeWidth="2.5"
                    className="transition-all duration-500 filter drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]"
                  />

                  {/* SVG Gradient Def */}
                  <defs>
                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(139, 92, 246, 0.45)" />
                      <stop offset="100%" stopColor="rgba(6, 182, 212, 0.35)" />
                    </linearGradient>
                  </defs>

                  {/* Vertex Circles / Nodes */}
                  {skills.map((skill, idx) => {
                    const { x, y } = getCoordinates(idx, skill.score);
                    const isSelected = idx === selectedSkillIndex;

                    return (
                      <g key={skill.id} className="cursor-pointer" onClick={() => setSelectedSkillIndex(idx)}>
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? "7" : "4.5"}
                          fill={isSelected ? "#38bdf8" : "#a78bfa"}
                          stroke="#05070F"
                          strokeWidth="2"
                          className="transition-all duration-300 hover:scale-150"
                        />
                        {isSelected && (
                          <circle
                            cx={x}
                            cy={y}
                            r="11"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="1.5"
                            className="animate-ping opacity-75"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Outer Axis Label Buttons */}
                {skills.map((skill, idx) => {
                  const labelPos = getCoordinates(idx, 122);
                  const isSelected = idx === selectedSkillIndex;

                  return (
                    <button
                      key={skill.id}
                      onClick={() => setSelectedSkillIndex(idx)}
                      style={{
                        position: 'absolute',
                        left: `${labelPos.x}px`,
                        top: `${labelPos.y}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`font-mono text-[11px] px-2.5 py-1 rounded-lg border transition-all duration-300 cursor-pointer whitespace-nowrap shadow-md ${
                        isSelected
                          ? 'bg-purple-600/40 text-white border-cyan-400 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105'
                          : 'bg-black/60 text-slate-400 border-white/10 hover:border-white/30 hover:text-slate-200'
                      }`}
                    >
                      <span>{skill.icon}</span> {skill.label}
                    </button>
                  );
                })}

              </div>

              {/* Bottom Quick Axis Selector Bar */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 pt-4 border-t border-white/10 w-full">
                {skills.map((skill, idx) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                      idx === selectedSkillIndex 
                        ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(6,182,212,0.8)]' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    title={skill.label}
                  />
                ))}
              </div>

            </div>

          </div>

          {/* Skill Detail Inspector Column (Right 6 cols) */}
          <div className="lg:col-span-6">
            
            <GlassCard className="space-y-6">
              
              {/* Skill Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-2xl flex items-center justify-center">
                    {currentSkill.icon}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest">// DOMAIN INSPECTOR</span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">{currentSkill.label}</h3>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-cyan-400">{currentSkill.score}%</div>
                  <div className="font-mono text-[10px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md mt-1">
                    {currentSkill.level}
                  </div>
                </div>
              </div>

              {/* Skill Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span>Proficiency Rating</span>
                  <span className="text-slate-200">{currentSkill.score} / 100</span>
                </div>
                <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                    style={{ width: `${currentSkill.score}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {currentSkill.description}
              </p>

              {/* Stack Pills */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">// Technologies Employed</h4>
                <div className="flex flex-wrap gap-2">
                  {currentSkill.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="pt-2 border-t border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">// Engineering Highlights</h4>
                <div className="space-y-2">
                  {currentSkill.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-mono">✓</span>
                      <span>{item}</span>
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

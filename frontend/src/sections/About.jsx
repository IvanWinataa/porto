import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import Icon from '../components/Icon';
import { useLanguage } from '../context/useLanguage';

export default function About() {
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useLanguage();

  const allSkills = [
    { name: 'React.js', category: 'frontend', color: 'text-[#61DAFB]', bg: 'bg-[#61DAFB]/10 border-[#61DAFB]/30' },
    { name: 'Next.js', category: 'frontend', color: 'text-white', bg: 'bg-white/10 border-white/20' },
    { name: 'TypeScript', category: 'frontend', color: 'text-[#3178C6]', bg: 'bg-[#3178C6]/10 border-[#3178C6]/30' },
    { name: 'TailwindCSS', category: 'frontend', color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/10 border-[#06B6D4]/30' },
    { name: 'Node.js', category: 'backend', color: 'text-[#339933]', bg: 'bg-[#339933]/10 border-[#339933]/30' },
    { name: 'Express.js', category: 'backend', color: 'text-[#A8B2C1]', bg: 'bg-white/10 border-white/20' },
    { name: 'PostgreSQL', category: 'database', color: 'text-[#4169E1]', bg: 'bg-[#4169E1]/10 border-[#4169E1]/30' },
    { name: 'Docker', category: 'tools', color: 'text-[#2496ED]', bg: 'bg-[#2496ED]/10 border-[#2496ED]/30' },
    { name: 'REST API', category: 'backend', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    { name: 'Figma', category: 'tools', color: 'text-[#F24E1E]', bg: 'bg-[#F24E1E]/10 border-[#F24E1E]/30' },
    { name: 'Git & GitHub', category: 'tools', color: 'text-[#F05032]', bg: 'bg-[#F05032]/10 border-[#F05032]/30' }
  ];

  const filteredSkills = activeTab === 'all' 
    ? allSkills 
    : allSkills.filter(s => s.category === activeTab);

  const marqueeRow1 = [
    { name: 'React.js', icon: 'atom' },
    { name: 'Next.js', icon: 'triangle' },
    { name: 'TypeScript', icon: 'fileCode' },
    { name: 'TailwindCSS', icon: 'wind' },
    { name: 'Node.js', icon: 'server' },
    { name: 'Express.js', icon: 'code' },
  ];

  const marqueeRow2 = [
    { name: 'PostgreSQL', icon: 'database' },
    { name: 'Docker', icon: 'box' },
    { name: 'REST API', icon: 'plug' },
    { name: 'Figma', icon: 'penTool' },
    { name: 'Git', icon: 'gitBranch' },
    { name: 'Vite', icon: 'bolt' },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden section-surface">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 sm:mb-14 lg:mb-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-teal-400 text-sm font-semibold tracking-wider uppercase">{t('01. Discovery', '01. Tentang Saya')}</span>
              <div className="h-[1px] w-12 bg-teal-400/40"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">{t('About Me', 'Tentang Saya')}</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-sm font-mono">
            // {t('Blending software engineering precision with aesthetic design.', 'Memadukan ketelitian rekayasa perangkat lunak dengan desain yang menarik.')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Bio Column */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{t('Passionate Developer & Problem Solver', 'Developer yang Antusias & Pemecah Masalah')}</span>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">Fullstack</span>
              </h3>
              
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {t(
                  'Hello! I am a fullstack software engineer committed to crafting fast, user-centered, and scalable web applications. My path began with a fascination for interactive frontends, expanding into robust backend architecture and data systems.',
                  'Halo! Saya seorang software engineer fullstack yang berfokus membangun aplikasi web yang cepat, berpusat pada pengguna, dan skalabel. Perjalanan saya dimulai dari ketertarikan pada frontend interaktif, lalu berkembang ke arsitektur backend dan sistem data yang andal.'
                )}
              </p>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {t(
                  'I take pride in producing maintainable, self-documenting code, enforcing seamless API design, and delivering glassmorphism UI interfaces that engage users at first glance.',
                  'Saya mengutamakan kode yang mudah dirawat dan dipahami, desain API yang konsisten, serta antarmuka glassmorphism yang menarik bagi pengguna.'
                )}
              </p>

              {/* Core Principles Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="mb-1 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-teal-400"><Icon name="bolt" className="h-3.5 w-3.5" /> {t('High Performance', 'Performa Tinggi')}</div>
                  <div className="text-xs text-slate-400">{t('Optimized bundle size, crisp animations, and fast response times.', 'Ukuran bundle yang optimal, animasi halus, dan waktu respons cepat.')}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="mb-1 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-blue-400"><Icon name="shield" className="h-3.5 w-3.5" /> {t('Clean Architecture', 'Arsitektur yang Bersih')}</div>
                  <div className="text-xs text-slate-400">{t('Modular backend design, validated schemas, and clear REST APIs.', 'Desain backend modular, skema tervalidasi, dan REST API yang jelas.')}</div>
                </div>
              </div>
            </GlassCard>

            {/* Marquee Skills Slider */}
            <div className="space-y-3">
              <div className="font-mono text-xs text-slate-400 uppercase tracking-widest pl-1">{t('Continuous Stack Marquee', 'Rangkaian Teknologi')}</div>
              
              {/* Row 1 */}
              <div className="relative w-full overflow-hidden py-1 mask-gradient-horizontal">
                <div className="flex w-max animate-marquee space-x-3">
                  {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((skill, index) => (
                    <div 
                      key={`m1-${index}`} 
                      className="flex items-center gap-2 font-mono text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-slate-300 hover:border-blue-500/50 hover:text-white transition-all cursor-default"
                    >
                      <Icon name={skill.icon} className="h-4 w-4 shrink-0" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 */}
              <div className="relative w-full overflow-hidden py-1 mask-gradient-horizontal">
                <div className="flex w-max animate-marquee space-x-3" style={{ animationDirection: 'reverse' }}>
                  {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((skill, index) => (
                    <div 
                      key={`m2-${index}`} 
                      className="flex items-center gap-2 font-mono text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-slate-300 hover:border-teal-500/50 hover:text-white transition-all cursor-default"
                    >
                      <Icon name={skill.icon} className="h-4 w-4 shrink-0" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Skill Category Box */}
          <div className="lg:col-span-5">
            <GlassCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">{t('Technical Arsenal', 'Kumpulan Teknologi')}</h3>
                <span className="font-mono text-xs text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                  {filteredSkills.length} {t('Technologies', 'Teknologi')}
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5 mb-6">
                {[
                  { id: 'all', label: t('All', 'Semua') },
                  { id: 'frontend', label: 'Frontend' },
                  { id: 'backend', label: 'Backend' },
                  { id: 'database', label: t('Database', 'Basis Data') },
                  { id: 'tools', label: t('Tools', 'Tools') },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-blue-600/30 text-white border border-blue-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Skill Badges Display Grid */}
              <div className="flex flex-wrap gap-2.5 min-h-[160px]">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`flex items-center gap-2 font-mono text-xs px-3.5 py-2 rounded-xl border transition-all duration-300 hover:scale-105 cursor-default ${skill.bg}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                    <span className="text-slate-100 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-slate-500 flex items-center justify-between">
                <span>{t('Status: Updated 2026', 'Status: Diperbarui 2026')}</span>
                <span className="text-blue-400">{t('100% Modular', '100% Modular')}</span>
              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
}


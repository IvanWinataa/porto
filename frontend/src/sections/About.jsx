import GlassCard from '../components/GlassCard';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { useLanguage } from '../context/useLanguage';

export default function About() {
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

  const skillGroups = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: t('Database', 'Basis Data') },
    { id: 'tools', label: t('Tools', 'Tools') },
  ].map((group) => ({
    ...group,
    skills: allSkills.filter((skill) => skill.category === group.id),
  })).filter((group) => group.skills.length > 0);

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden section-surface">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow={t('01. Discovery', '01. Tentang Saya')}
          title={t('About Me', 'Tentang Saya')}
          description={t('Blending software engineering precision with aesthetic design.', 'Memadukan ketelitian rekayasa perangkat lunak dengan desain yang menarik.')}
        />

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

          </div>

          {/* Grouped Skills */}
          <div className="lg:col-span-5">
            <GlassCard>
              <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
                <h3 className="text-lg font-bold text-white">{t('Technical Arsenal', 'Kumpulan Teknologi')}</h3>
                <span className="font-mono text-xs text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                  {allSkills.length} {t('Technologies', 'Teknologi')}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <section key={group.id} aria-labelledby={`skill-group-${group.id}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h4 id={`skill-group-${group.id}`} className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {group.label}
                      </h4>
                      <span className="font-mono text-[10px] text-slate-500">{String(group.skills.length).padStart(2, '0')}</span>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li key={skill.name} className={`rounded-lg border px-2.5 py-1.5 font-mono text-xs font-medium ${skill.bg} ${skill.color}`}>
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </section>
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


import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/useLanguage';
import { experiences, getEmploymentTypeLabel, getLocationLabel, getPeriodLabel } from '../data/experience';

export default function Experience() {
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="py-28 relative overflow-hidden bg-grid-pattern">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-cyan-400 text-sm font-semibold tracking-wider uppercase">{t('03. Career Track', '03. Perjalanan Karier')}</span>
              <div className="h-[1px] w-12 bg-cyan-400/40"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">{t('Experience & Journey', 'Pengalaman & Perjalanan')}</h2>
          </div>
          <p className="text-slate-400 text-sm font-mono max-w-xs">
            // {t('Track record of engineering high-impact digital solutions.', 'Rekam jejak membangun solusi digital dengan dampak tinggi.')}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-white/10 ml-4 md:ml-36 space-y-12 pl-6 md:pl-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Glowing Node Marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#030712] shadow-[0_0_15px_rgba(59,130,246,0.9)] group-hover:scale-125 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.9)] transition-all duration-300" />

              {/* Period badge floating left on Desktop */}
              <div className="hidden md:block absolute -left-48 top-1.5 font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-center w-36 shadow-sm">
                {getPeriodLabel(exp.period, language)}
              </div>

              {/* Experience Card */}
              <GlassCard className="hover:border-blue-500/40 transition-all duration-300">
                
                {/* Mobile Period badge */}
                <div className="md:hidden inline-block mb-3 font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                  {getPeriodLabel(exp.period, language)}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                    📍 {getLocationLabel(exp.location, language)} • {getEmploymentTypeLabel(exp.type, language)}
                  </span>
                </div>

                <h4 className="font-mono text-sm text-blue-400 mb-4 font-medium">
                  @ {exp.company}
                </h4>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {t(exp.description, exp.descriptionId)}
                </p>

                {/* Key Achievements Bullet list */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2 mb-6 pt-2">
                    {exp.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="text-emerald-400 mt-0.5 select-none">✓</span>
                        <span>{t(item, exp.achievementsId[idx])}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {exp.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[11px] text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md group-hover:border-blue-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


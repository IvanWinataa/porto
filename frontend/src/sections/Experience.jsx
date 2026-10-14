import GlassCard from '../components/GlassCard';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  const experiences = [
    {
      id: 1,
      period: '2024 - PRESENT',
      role: 'Senior Fullstack Engineer',
      company: 'TechCorp Solutions',
      location: 'Remote',
      type: 'Full-time',
      description: 'Architecting high-concurrency web applications and cloud microservices. Leading front-end and back-end integration using Next.js, Express, and PostgreSQL with a strong focus on system performance and zero-downtime deployments.',
      descriptionId: 'Merancang aplikasi web dengan konkurensi tinggi dan microservice cloud. Memimpin integrasi frontend dan backend menggunakan Next.js, Express, serta PostgreSQL dengan fokus pada performa sistem dan deployment tanpa downtime.',
      achievements: [
        'Reduced frontend initial page load time by 45% through route-based code splitting and image optimizations.',
        'Engineered automated database migrations and optimized query execution plans in PostgreSQL.',
        'Mentored junior engineers and conducted strict code reviews to ensure clean architecture.'
      ],
      achievementsId: [
        'Mempercepat pemuatan awal halaman frontend sebesar 45% melalui pemisahan kode per rute dan optimasi gambar.',
        'Membangun migrasi basis data otomatis dan mengoptimalkan rencana eksekusi query PostgreSQL.',
        'Membimbing engineer junior dan melakukan code review untuk menjaga arsitektur yang rapi.'
      ],
      skills: ['React 19', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'TailwindCSS']
    },
    {
      id: 2,
      period: '2023 - 2024',
      role: 'Frontend Developer Specialist',
      company: 'Nexus Digital Agency',
      location: 'Jakarta, ID',
      type: 'Full-time',
      description: 'Crafted interactive web applications and design systems for enterprise clients. Implemented responsive glassmorphism UIs, dynamic chart visualizers, and fluid micro-interactions.',
      descriptionId: 'Membangun aplikasi web interaktif dan design system untuk klien enterprise. Mengimplementasikan UI glassmorphism responsif, visualisasi grafik dinamis, dan mikrointeraksi yang halus.',
      achievements: [
        'Built reusable component libraries used across 6 enterprise web applications.',
        'Integrated real-time WebSocket communication for live client data streams.'
      ],
      achievementsId: [
        'Membangun pustaka komponen reusable yang digunakan di 6 aplikasi web enterprise.',
        'Mengintegrasikan komunikasi WebSocket real-time untuk aliran data klien.'
      ],
      skills: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'Redux Toolkit']
    },
    {
      id: 3,
      period: '2022 - 2023',
      role: 'Software Engineering Intern',
      company: 'Innovation Labs',
      location: 'Hybrid',
      type: 'Internship',
      description: 'Developed RESTful API endpoints in Node.js/Express, implemented database schema migrations, and collaborated on automated unit testing pipelines.',
      descriptionId: 'Mengembangkan endpoint REST API dengan Node.js/Express, menerapkan migrasi skema basis data, dan berkolaborasi dalam pipeline pengujian unit otomatis.',
      achievements: [
        'Authored comprehensive Swagger/OpenAPI documentation for core endpoints.',
        'Achieved 90%+ code coverage for new backend controller modules.'
      ],
      achievementsId: [
        'Menulis dokumentasi Swagger/OpenAPI untuk endpoint utama.',
        'Mencapai code coverage lebih dari 90% untuk modul controller backend baru.'
      ],
      skills: ['Express.js', 'Node.js', 'PostgreSQL', 'REST API', 'Git']
    }
  ];

  return (
    <section id="experience" className="py-28 relative overflow-hidden bg-grid-pattern">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

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
              <div className="absolute -left-[31px] md:-left-[47px] top-2 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#05070F] shadow-[0_0_15px_rgba(139,92,246,0.9)] group-hover:scale-125 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.9)] transition-all duration-300" />

              {/* Period badge floating left on Desktop */}
              <div className="hidden md:block absolute -left-48 top-1.5 font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-center w-36 shadow-sm">
                {exp.period}
              </div>

              {/* Experience Card */}
              <GlassCard className="hover:border-purple-500/40 transition-all duration-300">
                
                {/* Mobile Period badge */}
                <div className="md:hidden inline-block mb-3 font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                  {exp.period}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                    📍 {t(exp.location, exp.location === 'Remote' ? 'Jarak jauh' : exp.location)} • {t(exp.type, exp.type === 'Full-time' ? 'Penuh waktu' : 'Magang')}
                  </span>
                </div>

                <h4 className="font-mono text-sm text-purple-400 mb-4 font-medium">
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
                      className="font-mono text-[11px] text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md group-hover:border-purple-500/30 transition-colors"
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


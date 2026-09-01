import GlassCard from '../components/GlassCard';

export default function Experience() {
  const experiences = [
    {
      id: 1,
      period: '2024 - PRESENT',
      role: 'Senior Fullstack Engineer',
      company: 'TechCorp Solutions',
      location: 'Remote',
      type: 'Full-time',
      description: 'Architecting high-concurrency web applications and microservices. Leading front-end and back-end integration using Next.js, Express, and PostgreSQL with a strong emphasis on performance optimization.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TailwindCSS']
    },
    {
      id: 2,
      period: '2023 - 2024',
      role: 'Frontend Developer Specialist',
      company: 'Nexus Digital Agency',
      location: 'Jakarta, ID',
      type: 'Full-time',
      description: 'Crafted interactive web applications and design systems for enterprise clients. Implemented responsive glassmorphism UIs and smooth micro-interactions.',
      skills: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'Redux']
    },
    {
      id: 3,
      period: '2022 - 2023',
      role: 'Software Engineering Intern',
      company: 'Innovation Labs',
      location: 'Hybrid',
      type: 'Internship',
      description: 'Developed RESTful API endpoints in Node.js/Express, implemented database schema migrations, and collaborated on automated unit testing.',
      skills: ['Express.js', 'Node.js', 'PostgreSQL', 'REST API', 'Git']
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/10 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[130px] -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-primary font-mono text-xl mr-2">03.</span>
            Experience & Journey
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Glowing Node Marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-dark shadow-[0_0_15px_rgba(139,92,246,0.8)] group-hover:scale-125 group-hover:bg-secondary transition-all duration-300"></div>

              {/* Period badge (Desktop floating left) */}
              <div className="hidden md:block absolute -left-44 top-1 font-mono text-xs text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full text-center w-32">
                {exp.period}
              </div>

              {/* Experience Card */}
              <GlassCard className="hover:border-primary/40 transition-all duration-300">
                {/* Mobile Period badge */}
                <div className="md:hidden inline-block mb-3 font-mono text-xs text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
                  {exp.period}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded">
                    {exp.location} • {exp.type}
                  </span>
                </div>

                <h4 className="font-mono text-sm text-primary mb-4">
                  @ {exp.company}
                </h4>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-xs text-gray-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded group-hover:border-primary/30 transition-colors"
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

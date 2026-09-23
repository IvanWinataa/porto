import { useState } from 'react';
import NeonButton from '../components/NeonButton';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `const developer = {
  name: 'Ivan Winata',
  title: 'Fullstack Software Engineer',
  location: 'Indonesia (Remote)',
  coreStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
  status: 'Open to high-impact projects & opportunities',
  codeQuote: "Clean code is its own best documentation."
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-28 pb-20 relative overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-purple-600/20 via-cyan-500/15 to-pink-500/10 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Available for new projects & roles
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Building Next-Gen <br className="hidden sm:block" />
              <span className="text-gradient">Web Applications</span> <br />
              & Digital Experiences
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              Fullstack Engineer specializing in high-concurrency Node.js services, pixel-perfect React/Next.js interfaces, and scalable database architectures.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <NeonButton href="#projects" className="px-7 py-3 text-sm">
                <span>View Projects</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </NeonButton>
              
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 transition-all duration-300 font-mono text-sm flex items-center gap-2 backdrop-blur-md"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">3+</div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">Years Exp.</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">20+</div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-400">99.9%</div>
                <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Terminal / Code Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-2xl border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              
              {/* Terminal Titlebar */}
              <div className="bg-[#0b0e17] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50" />
                  <span className="ml-2 font-mono text-xs text-slate-400 font-medium">developer.config.ts</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md border border-white/10 transition-colors"
                  title="Copy snippet"
                >
                  {copied ? (
                    <span className="text-emerald-400 flex items-center gap-1">✓ Copied!</span>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Code Area */}
              <div className="p-5 font-mono text-xs sm:text-sm bg-[#060812]/90 overflow-x-auto leading-relaxed text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="select-none text-slate-600 text-right pr-2 font-mono">
                    1<br />2<br />3<br />4<br />5<br />6<br />7<br />8
                  </div>
                  <div>
                    <div><span className="text-purple-400 font-semibold">const</span> <span className="text-cyan-300">developer</span> = &#123;</div>
                    <div className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-300">'Ivan Winata'</span>,</div>
                    <div className="pl-4"><span className="text-slate-400">title:</span> <span className="text-emerald-300">'Fullstack Engineer'</span>,</div>
                    <div className="pl-4"><span className="text-slate-400">location:</span> <span className="text-emerald-300">'Indonesia (Remote)'</span>,</div>
                    <div className="pl-4"><span className="text-slate-400">coreStack:</span> [<span className="text-amber-300">'React'</span>, <span className="text-amber-300">'Node.js'</span>, <span className="text-amber-300">'Postgres'</span>],</div>
                    <div className="pl-4"><span className="text-slate-400">status:</span> <span className="text-cyan-400">'Open for hire'</span>,</div>
                    <div className="pl-4"><span className="text-slate-400">codeQuote:</span> <span className="text-emerald-300">"Build with passion"</span></div>
                    <div>&#125;;</div>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-[#080B14] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  TypeScript React Ready
                </span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


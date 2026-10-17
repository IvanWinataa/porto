import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import { useLanguage } from '../context/useLanguage';

export default function Architecture() {
  const { t } = useLanguage();
  const [selectedNodeId, setSelectedNodeId] = useState('frontend');
  const [simulating, setSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const nodes = [
    {
      id: 'frontend',
      title: 'React 19 Frontend',
      subtitle: 'Client Interface Layer',
      subtitleId: 'Lapisan Antarmuka Klien',
      icon: '⚛️',
      color: 'border-[#61DAFB] text-[#61DAFB]',
      badge: 'Client Side',
      badgeId: 'Sisi Klien',
      latency: '< 1 ms',
      protocol: 'HTTPS / TLS 1.3',
      description: 'Single Page Application built with React 19, Vite, and TailwindCSS. Utilizes Glassmorphism design tokens, optimistic state updates, and command palette navigation.',
      descriptionId: 'Single Page Application yang dibangun dengan React 19, Vite, dan TailwindCSS. Menggunakan token desain Glassmorphism, pembaruan state optimistis, dan navigasi command palette.',
      specifications: [
        'Component-driven architecture',
        'Command Palette Keyboard Shortcuts (⌘K)',
        'Responsive layout & mobile drawers',
        'Client-side state & API fetching'
      ],
      specificationsId: [
        'Arsitektur berbasis komponen',
        'Pintasan keyboard Command Palette (⌘K)',
        'Tata letak responsif dan panel menu seluler',
        'State sisi klien dan pengambilan data API'
      ],
      codeSnippet: `// Client API invocation
const response = await fetch('/api/projects', {
  headers: { 'Accept': 'application/json' }
});
const { data } = await response.json();`
    },
    {
      id: 'gateway',
      title: 'Express API Gateway',
      subtitle: 'REST Dispatcher Layer',
      subtitleId: 'Lapisan Pengatur REST',
      icon: '⚡',
      color: 'border-blue-400 text-blue-400',
      badge: 'Node.js Runtime',
      badgeId: 'Runtime Node.js',
      latency: '~4 ms',
      protocol: 'HTTP/2 REST',
      description: 'Central entry point handling routing, CORS headers, rate limiting, and request logging across all application endpoints.',
      descriptionId: 'Titik masuk utama yang menangani routing, header CORS, pembatasan laju, dan pencatatan permintaan di seluruh endpoint aplikasi.',
      specifications: [
        'Non-blocking async I/O loop',
        'Modular route handlers (/api/projects, /api/contact)',
        'CORS security middleware',
        'Centralized error handling'
      ],
      specificationsId: [
        'Loop I/O asinkron non-blocking',
        'Handler rute modular (/api/projects, /api/contact)',
        'Middleware keamanan CORS',
        'Penanganan error terpusat'
      ],
      codeSnippet: `// Express REST Gateway Route
const router = require('express').Router();
router.get('/api/projects', projectController.getAllProjects);
router.post('/api/contact', contactController.sendMessage);`
    },
    {
      id: 'security',
      title: 'Security & Validation',
      subtitle: 'Middleware Guard Layer',
      subtitleId: 'Lapisan Proteksi Middleware',
      icon: '🛡️',
      color: 'border-sky-400 text-sky-400',
      badge: 'Middleware',
      badgeId: 'Middleware',
      latency: '~2 ms',
      protocol: 'Regex & JWT Guard',
      description: 'Sanitizes incoming payloads, enforces email validation regex patterns, prevents SQL injection via parameterized parameters, and manages CORS origin policies.',
      descriptionId: 'Membersihkan payload masuk, memvalidasi email dengan pola regex, mencegah SQL injection melalui parameter, dan mengatur kebijakan origin CORS.',
      specifications: [
        'Strict regex email pattern verification',
        'SQL injection defense via $1, $2 placeholders',
        'Payload length & dynamic sanitization',
        'Structured HTTP status error codes'
      ],
      specificationsId: [
        'Verifikasi email dengan pola regex yang ketat',
        'Perlindungan SQL injection melalui placeholder $1, $2',
        'Panjang payload dan sanitasi dinamis',
        'Kode error HTTP yang terstruktur'
      ],
      codeSnippet: `// Input Sanitization Middleware
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
if (!name || !email || !emailRegex.test(email)) {
  return res.status(400).json({ message: 'Invalid payload' });
}`
    },
    {
      id: 'database',
      title: 'PostgreSQL DB Engine',
      subtitle: 'Persistence Data Layer',
      subtitleId: 'Lapisan Persistensi Data',
      icon: '🐘',
      color: 'border-cyan-400 text-cyan-400',
      badge: 'Database Pool',
      badgeId: 'Pool Database',
      latency: '~6 ms',
      protocol: 'TCP / SQL Protocol',
      description: 'Relational data store managed via a PostgreSQL client connection pool. Stores project showcases, categories, system metadata, and contact transmissions.',
      descriptionId: 'Penyimpanan data relasional yang dikelola melalui connection pool klien PostgreSQL. Menyimpan proyek, kategori, metadata sistem, dan pesan kontak.',
      specifications: [
        'Pooled database connection client (`pg.Pool`)',
        'ACID compliant transactional safety',
        'Indexed queries ordered by featured state',
        'Environment variable credential isolation'
      ],
      specificationsId: [
        'Klien koneksi database dengan pool (`pg.Pool`)',
        'Keamanan transaksi sesuai ACID',
        'Query terindeks berdasarkan status featured',
        'Kredensial diisolasi melalui environment variable'
      ],
      codeSnippet: `// PostgreSQL Query Execution
const query = 'SELECT * FROM projects ORDER BY featured DESC, created_at DESC';
const result = await db.query(query, params);
return result.rows;`
    }
  ];

  const currentNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const handleSimulatePulse = () => {
    if (simulating) return;
    setSimulating(true);
    setSimulationStep(1);

    const stepInterval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setSimulating(false);
            setSimulationStep(0);
          }, 800);
          return 4;
        }
        return prev + 1;
      });
    }, 600);
  };

  useEffect(() => {
    const stepNodeIds = ['frontend', 'gateway', 'security', 'database'];
    if (simulationStep > 0 && simulationStep <= stepNodeIds.length) {
      setSelectedNodeId(stepNodeIds[simulationStep - 1]);
    }
  }, [simulationStep]);

  return (
    <section id="architecture" className="py-28 relative overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-cyan-400 text-sm font-semibold tracking-wider uppercase">{t('Architecture Flow', 'Alur Arsitektur')}</span>
              <div className="h-[1px] w-12 bg-cyan-400/40"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">{t('System Architecture', 'Arsitektur Sistem')}</h2>
          </div>
          
          {/* Simulation Trigger Button */}
          <div className="flex items-center gap-3">
            <NeonButton 
              onClick={handleSimulatePulse} 
              disabled={simulating}
              variant="blue"
              className="text-xs px-5 py-2.5"
            >
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${simulating ? 'bg-blue-400 animate-ping' : 'bg-blue-300'}`} />
                <span>{simulating ? t(`Transmitting Step ${simulationStep}/4...`, `Mengirim tahap ${simulationStep}/4...`) : t('Simulate Request Pulse', 'Simulasikan Alur Permintaan')}</span>
              </span>
            </NeonButton>
          </div>
        </div>

        {/* Main Grid: Left Node Visualizer & Right Inspector Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Architecture Flow Diagram (Left Column 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Interactive Nodes Flow Box */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden border border-white/10">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t('Live Topology Graph', 'Graf Topologi Langsung')}
                </span>
                <span>{t('Total Latency', 'Latensi Total')}: <strong className="text-cyan-300">~12ms</strong></span>
              </div>

              {/* Stacked Flow Nodes */}
              <div className="space-y-4 relative">
                
                {nodes.map((node, index) => {
                  const isSelected = node.id === selectedNodeId;
                  const isStepActive = simulationStep === index + 1;

                  return (
                    <div key={node.id} className="relative">
                      
                      {/* Interactive Card Node */}
                      <button
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        aria-pressed={isSelected}
                        aria-label={t(`Select ${node.title} details`, `Pilih detail ${node.title}`)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] ${
                          isSelected 
                            ? 'bg-blue-600/20 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.3)] scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                        } ${isStepActive ? 'ring-2 ring-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)]' : ''}`}
                      >
                        <span className="flex items-center gap-3.5">
                          <span aria-hidden="true" className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xl shrink-0">
                            {node.icon}
                          </span>
                          <span>
                            <span className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm sm:text-base">{node.title}</span>
                              <span className="font-mono text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                                {t(node.badge, node.badgeId)}
                              </span>
                            </span>
                            <span className="block text-xs text-slate-400 font-mono mt-0.5">{t(node.subtitle, node.subtitleId)}</span>
                          </span>
                        </span>

                        <span className="text-right font-mono text-xs hidden sm:block shrink-0">
                          <span className="block text-slate-300 font-medium">{node.latency}</span>
                          <span className="block text-[10px] text-slate-500">{node.protocol}</span>
                        </span>
                      </button>

                      {/* Animated Flow Connector Arrow */}
                      {index < nodes.length - 1 && (
                        <div className="flex items-center justify-center py-1">
                          <div className="h-6 w-[2px] bg-gradient-to-b from-blue-500/60 to-cyan-500/60 relative">
                            {/* Moving packet particle */}
                            {simulating && (simulationStep === index + 1 || simulationStep === index + 2) && (
                              <div className="absolute -top-1 -left-[3px] w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,1)] animate-bounce" />
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>

              {/* Status Simulation Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="text-blue-400">⚡ {t('Request Flow:', 'Alur Permintaan')}</span>{' '}
                  Client ➔ Router ➔ Guard ➔ DB
                </span>
                <span className="text-emerald-400 font-semibold">200 OK</span>
              </div>

            </div>

          </div>

          {/* Detailed Inspector Panel (Right Column 5 cols) */}
          <div className="lg:col-span-5">
            
            <GlassCard className="space-y-6">
              
              {/* Header Inspector */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">// {t('NODE INSPECTION PANEL', 'PANEL INSPEKSI NODE')}</span>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                    <span>{currentNode.icon}</span>
                    <span>{currentNode.title}</span>
                  </h3>
                </div>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                  {t(currentNode.badge, currentNode.badgeId)}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {t(currentNode.description, currentNode.descriptionId)}
              </p>

              {/* Specifications List */}
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">// {t('Layer Capabilities', 'Kapabilitas Lapisan')}</h5>
                <ul className="space-y-2">
                  {currentNode.specifications.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400 font-mono">▸</span>
                      <span>{t(spec, currentNode.specificationsId[idx])}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet */}
              <div>
                <div className="flex justify-between items-center mb-2 font-mono text-[11px] text-slate-400">
                  <span>{t('Implementation Pattern', 'Pola Implementasi')}</span>
                  <span className="text-blue-400">JavaScript ES6</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{currentNode.codeSnippet}</pre>
                </div>
              </div>

              {/* Performance Telemetry */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">{t('Est. Latency', 'Perkiraan Latensi')}</div>
                  <div className="text-cyan-300 font-bold mt-0.5">{currentNode.latency}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">{t('Protocol Guard', 'Proteksi Protokol')}</div>
                  <div className="text-blue-300 font-bold mt-0.5">{currentNode.protocol}</div>
                </div>
              </div>

            </GlassCard>

          </div>

        </div>

      </div>
    </section>
  );
}

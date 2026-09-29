import { useState, useEffect } from 'react';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';

export default function Architecture() {
  const [selectedNodeId, setSelectedNodeId] = useState('frontend');
  const [simulating, setSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);

  const nodes = [
    {
      id: 'frontend',
      title: 'React 19 Frontend',
      subtitle: 'Client Interface Layer',
      icon: '⚛️',
      color: 'border-[#61DAFB] text-[#61DAFB]',
      badge: 'Client Side',
      latency: '< 1 ms',
      protocol: 'HTTPS / TLS 1.3',
      description: 'Single Page Application built with React 19, Vite, and TailwindCSS. Utilizes Glassmorphism design tokens, optimistic state updates, and command palette navigation.',
      specifications: [
        'Component-driven architecture',
        'Command Palette Keyboard Shortcuts (⌘K)',
        'Responsive layout & mobile drawers',
        'Client-side state & API fetching'
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
      icon: '⚡',
      color: 'border-purple-400 text-purple-400',
      badge: 'Node.js Runtime',
      latency: '~4 ms',
      protocol: 'HTTP/2 REST',
      description: 'Central entry point handling routing, CORS headers, rate limiting, and request logging across all application endpoints.',
      specifications: [
        'Non-blocking async I/O loop',
        'Modular route handlers (/api/projects, /api/contact)',
        'CORS security middleware',
        'Centralized error handling'
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
      icon: '🛡️',
      color: 'border-amber-400 text-amber-400',
      badge: 'Middleware',
      latency: '~2 ms',
      protocol: 'Regex & JWT Guard',
      description: 'Sanitizes incoming payloads, enforces email validation regex patterns, prevents SQL injection via parameterized parameters, and manages CORS origin policies.',
      specifications: [
        'Strict regex email pattern verification',
        'SQL injection defense via $1, $2 placeholders',
        'Payload length & dynamic sanitization',
        'Structured HTTP status error codes'
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
      icon: '🐘',
      color: 'border-cyan-400 text-cyan-400',
      badge: 'Database Pool',
      latency: '~6 ms',
      protocol: 'TCP / SQL Protocol',
      description: 'Relational data store managed via a PostgreSQL client connection pool. Stores project showcases, categories, system metadata, and contact transmissions.',
      specifications: [
        'Pooled database connection client (`pg.Pool`)',
        'ACID compliant transactional safety',
        'Indexed queries ordered by featured state',
        'Environment variable credential isolation'
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
    if (simulationStep > 0 && simulationStep <= 4) {
      setSelectedNodeId(nodes[simulationStep - 1].id);
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
              <span className="font-mono text-cyan-400 text-sm font-semibold tracking-wider uppercase">Architecture Flow</span>
              <div className="h-[1px] w-12 bg-cyan-400/40"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">System Architecture</h2>
          </div>
          
          {/* Simulation Trigger Button */}
          <div className="flex items-center gap-3">
            <NeonButton 
              onClick={handleSimulatePulse} 
              disabled={simulating}
              variant="amber"
              className="text-xs px-5 py-2.5"
            >
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${simulating ? 'bg-amber-400 animate-ping' : 'bg-amber-300'}`} />
                <span>{simulating ? `Transmitting Step ${simulationStep}/4...` : 'Simulate Request Pulse'}</span>
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
                  Live Topology Graph
                </span>
                <span>Total Latency: <strong className="text-cyan-300">~12ms</strong></span>
              </div>

              {/* Stacked Flow Nodes */}
              <div className="space-y-4 relative">
                
                {nodes.map((node, index) => {
                  const isSelected = node.id === selectedNodeId;
                  const isStepActive = simulationStep === index + 1;

                  return (
                    <div key={node.id} className="relative">
                      
                      {/* Interactive Card Node */}
                      <div
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                          isSelected 
                            ? 'bg-purple-600/20 border-purple-400 shadow-[0_0_25px_rgba(139,92,246,0.3)] scale-[1.02]' 
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                        } ${isStepActive ? 'ring-2 ring-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : ''}`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-xl shrink-0">
                            {node.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white text-sm sm:text-base">{node.title}</h4>
                              <span className="font-mono text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                                {node.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{node.subtitle}</p>
                          </div>
                        </div>

                        <div className="text-right font-mono text-xs hidden sm:block shrink-0">
                          <div className="text-slate-300 font-medium">{node.latency}</div>
                          <div className="text-[10px] text-slate-500">{node.protocol}</div>
                        </div>
                      </div>

                      {/* Animated Flow Connector Arrow */}
                      {index < nodes.length - 1 && (
                        <div className="flex items-center justify-center py-1">
                          <div className="h-6 w-[2px] bg-gradient-to-b from-purple-500/60 to-cyan-500/60 relative">
                            {/* Moving packet particle */}
                            {simulating && (simulationStep === index + 1 || simulationStep === index + 2) && (
                              <div className="absolute -top-1 -left-[3px] w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,1)] animate-bounce" />
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
                  <span className="text-purple-400">⚡ Request Flow:</span> 
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
                  <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest">// NODE INSPECTION PANEL</span>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                    <span>{currentNode.icon}</span>
                    <span>{currentNode.title}</span>
                  </h3>
                </div>
                <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                  {currentNode.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {currentNode.description}
              </p>

              {/* Specifications List */}
              <div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">// Layer Capabilities</h5>
                <ul className="space-y-2">
                  {currentNode.specifications.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400 font-mono">▸</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet */}
              <div>
                <div className="flex justify-between items-center mb-2 font-mono text-[11px] text-slate-400">
                  <span>Implementation Pattern</span>
                  <span className="text-purple-400">JavaScript ES6</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{currentNode.codeSnippet}</pre>
                </div>
              </div>

              {/* Performance Telemetry */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">Est. Latency</div>
                  <div className="text-cyan-300 font-bold mt-0.5">{currentNode.latency}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">Protocol Guard</div>
                  <div className="text-purple-300 font-bold mt-0.5">{currentNode.protocol}</div>
                </div>
              </div>

            </GlassCard>

          </div>

        </div>

      </div>
    </section>
  );
}

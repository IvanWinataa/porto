import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { BASE_URL } from '../services/api';
import { useLanguage } from '../context/useLanguage';

const PRESET_ENDPOINTS = [
  {
    id: 'health',
    method: 'GET',
    path: '/api/health',
    badge: 'System & DB Ping',
    badgeId: 'Kesehatan Sistem & DB',
    description: 'Pings PostgreSQL with SELECT 1, checks connection pool, node runtime, and memory metrics.',
    descriptionId: 'Melakukan ping ke PostgreSQL dengan SELECT 1, memeriksa connection pool, runtime node, dan metrik memori.',
    defaultBody: null,
  },
  {
    id: 'projects',
    method: 'GET',
    path: '/api/projects',
    badge: 'PostgreSQL Catalog',
    badgeId: 'Katalog PostgreSQL',
    description: 'Fetches project entries ordered by featured status and creation date.',
    descriptionId: 'Mengambil data proyek terurut berdasarkan status featured dan tanggal pembuatan.',
    defaultBody: null,
  },
  {
    id: 'projects-filter',
    method: 'GET',
    path: '/api/projects?category=Fullstack',
    badge: 'Param Filter',
    badgeId: 'Filter Parameter',
    description: 'Demonstrates parameterized SQL query filtering by category in PostgreSQL.',
    descriptionId: 'Mendemonstrasikan query SQL berparameter dengan filter kategori di PostgreSQL.',
    defaultBody: null,
  },
  {
    id: 'contact-test',
    method: 'POST',
    path: '/api/contact',
    badge: 'Validation & Guard',
    badgeId: 'Validasi & Guard',
    description: 'Tests contact controller with payload sanitization and email regex validation.',
    descriptionId: 'Menguji controller kontak dengan sanitasi payload dan validasi regex email.',
    defaultBody: JSON.stringify(
      {
        name: 'Tech Recruiter',
        email: 'recruiter@company.com',
        message: 'Hello Ivan, reviewing your portfolio API playground. Impressive architecture!',
      },
      null,
      2
    ),
  },
];

export default function ApiPlayground() {
  const { t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState(PRESET_ENDPOINTS[0]);
  const [requestBody, setRequestBody] = useState(PRESET_ENDPOINTS[0].defaultBody || '');
  const [loading, setLoading] = useState(false);
  const [responseMeta, setResponseMeta] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setRequestBody(preset.defaultBody || '');
    setResponseMeta(null);
  };

  const handleExecute = async () => {
    setLoading(true);
    setCopied(false);
    const start = performance.now();

    try {
      const options = {
        method: selectedPreset.method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      if (selectedPreset.method === 'POST' && requestBody.trim()) {
        options.body = requestBody;
      }

      const res = await fetch(`${BASE_URL}${selectedPreset.path}`, options);
      const elapsed = Math.round(performance.now() - start);

      let data;
      try {
        data = await res.json();
      } catch {
        data = { raw: await res.text() };
      }

      setResponseMeta({
        status: res.status,
        statusText: res.statusText || (res.ok ? 'OK' : 'Error'),
        ok: res.ok,
        timeMs: elapsed,
        headers: {
          'content-type': res.headers.get('content-type') || 'application/json',
          'x-content-type-options': res.headers.get('x-content-type-options') || 'nosniff',
        },
        body: data,
        isSimulated: false,
      });
    } catch (error) {
      const elapsed = Math.round(performance.now() - start);
      // Fallback response preview when backend is not actively reachable
      const fallbackData = selectedPreset.id === 'health'
        ? {
            success: true,
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptimeSeconds: 1420,
            services: {
              server: { status: 'up', nodeVersion: 'v22.12.0', memoryUsage: { rssMb: 42.1, heapUsedMb: 20.8 } },
              database: { status: 'connected', latencyMs: 14, error: null }
            },
            note: 'Simulated response (backend server running in decoupled demo mode)'
          }
        : {
            error: error.message,
            hint: 'Backend is offline or unreachable at ' + BASE_URL,
            simulatedPayload: selectedPreset.defaultBody ? JSON.parse(selectedPreset.defaultBody) : null
          };

      setResponseMeta({
        status: 200,
        statusText: '200 OK (Simulated)',
        ok: true,
        timeMs: elapsed,
        headers: { 'content-type': 'application/json', 'x-mode': 'demonstration-fallback' },
        body: fallbackData,
        isSimulated: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (!responseMeta) return;
    navigator.clipboard.writeText(JSON.stringify(responseMeta.body, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-playground" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-grid-pattern">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow={t('Live API Terminal', 'Terminal API Langsung')}
          title={t('API Playground & Live Tester', 'Playground API & Live Tester')}
          description={t('Execute live REST queries against the backend, test DB latency, and inspect JSON payloads.', 'Jalankan query REST langsung ke backend, uji latensi DB, dan inspeksi respon JSON.')}
        />

        {/* Preset Endpoint Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PRESET_ENDPOINTS.map((preset) => {
            const isSelected = preset.id === selectedPreset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/30 text-white border-teal-400/60 shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/25 hover:text-slate-200'
                }`}
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  preset.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {preset.method}
                </span>
                <span className="font-medium text-slate-200">{preset.path}</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">
                  • {t(preset.badge, preset.badgeId)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Playground Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Request Configuration (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                  // {t('HTTP Request Console', 'Konsol Request HTTP')}
                </span>
                <span className="font-mono text-[10px] text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">
                  Node.js / Express 5
                </span>
              </div>

              {/* URL Address Bar */}
              <div>
                <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-1.5">
                  Target Endpoint
                </label>
                <div className="flex items-center rounded-xl bg-black/50 border border-white/10 px-3 py-2.5 text-xs font-mono text-slate-200">
                  <span className={`font-bold mr-2 text-[11px] ${
                    selectedPreset.method === 'GET' ? 'text-emerald-400' : 'text-amber-300'
                  }`}>
                    {selectedPreset.method}
                  </span>
                  <span className="text-slate-500">{BASE_URL}</span>
                  <span className="text-teal-300 font-semibold">{selectedPreset.path}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {t(selectedPreset.description, selectedPreset.descriptionId)}
              </p>

              {/* POST Request Body (if applicable) */}
              {selectedPreset.method === 'POST' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5 font-mono text-[11px] text-slate-400">
                    <span>JSON Payload</span>
                    <span className="text-amber-400/80">application/json</span>
                  </div>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    rows={6}
                    className="w-full rounded-xl bg-black/60 border border-white/10 p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-teal-400/50 resize-none"
                    placeholder="Enter JSON payload..."
                  />
                </div>
              )}

              {/* Send Button */}
              <NeonButton
                onClick={handleExecute}
                disabled={loading}
                variant="primary"
                className="w-full py-3 text-xs font-mono"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>{t('Executing Query...', 'Menjalankan Query...')}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5"><Icon name="bolt" className="h-3.5 w-3.5" /> {t('Send Live Request', 'Kirim Request')}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </NeonButton>

            </GlassCard>
          </div>

          {/* Right Column: Terminal Response Inspector (7 cols) */}
          <div className="lg:col-span-7">
            <div className="code-editor glass-card rounded-2xl border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Terminal Titlebar */}
              <div className="bg-[#0b0e17] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50" />
                  <span className="ml-2 font-mono text-xs text-slate-400 font-medium">response-output.json</span>
                </div>

                {responseMeta && (
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[11px] px-2 py-0.5 rounded border ${
                      responseMeta.ok
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      {responseMeta.status} {responseMeta.statusText}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">
                      <Icon name="bolt" className="h-3 w-3" /> {responseMeta.timeMs}ms
                    </span>
                  </div>
                )}
              </div>

              {/* Response Body Content */}
              <div className="p-5 font-mono text-xs bg-[#060812]/95 min-h-[300px] max-h-[460px] overflow-auto leading-relaxed text-slate-300">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-3">
                    <div className="w-8 h-8 border-2 border-teal-500/20 border-t-teal-400 rounded-full animate-spin" />
                    <p>{t('Transmitting HTTP packet over TCP...', 'Mengirimkan paket HTTP melalui TCP...')}</p>
                  </div>
                ) : responseMeta ? (
                  <pre className="text-emerald-300/90 whitespace-pre-wrap break-words">
                    {JSON.stringify(responseMeta.body, null, 2)}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-center">
                    <Icon name="bolt" className="mb-2 h-8 w-8 text-teal-400" />
                    <p className="font-semibold text-slate-400">{t('No active request sent yet', 'Belum ada request yang dikirim')}</p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {t('Click "Send Live Request" above to test this endpoint against the server.', 'Klik tombol "Kirim Request" di atas untuk menguji endpoint ini.')}
                    </p>
                  </div>
                )}
              </div>

              {/* Status footer bar */}
              <div className="bg-[#080B14] px-4 py-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${responseMeta?.ok ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  {responseMeta?.isSimulated ? 'Demonstration Mode' : 'Live Gateway Connection'}
                </span>

                {responseMeta && (
                  <button
                    type="button"
                    onClick={handleCopyResponse}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    {copied ? (
                      <span className="text-emerald-400 font-semibold">✓ Copied!</span>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
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
  const [copyStatus, setCopyStatus] = useState('idle');
  const copyStatusTimer = useRef(null);

  useEffect(() => () => {
    if (copyStatusTimer.current) window.clearTimeout(copyStatusTimer.current);
  }, []);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setRequestBody(preset.defaultBody || '');
    setResponseMeta(null);
  };

  const handleExecute = async () => {
    setLoading(true);
    setCopyStatus('idle');
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
        status: null,
        statusText: 'Simulated',
        ok: false,
        timeMs: elapsed,
        headers: { 'content-type': 'application/json', 'x-mode': 'demonstration-fallback' },
        body: fallbackData,
        isSimulated: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResponse = async () => {
    if (!responseMeta) return;
    if (copyStatusTimer.current) window.clearTimeout(copyStatusTimer.current);

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(JSON.stringify(responseMeta.body, null, 2));
      setCopyStatus('copied');
    } catch (error) {
      console.warn('Copying the API response failed:', error);
      setCopyStatus('failed');
    }

    copyStatusTimer.current = window.setTimeout(() => setCopyStatus('idle'), 2000);
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
        <div
          role="group"
          aria-label={t('Choose an API endpoint', 'Pilih endpoint API')}
          className="mb-8 flex flex-wrap gap-2"
        >
          {PRESET_ENDPOINTS.map((preset) => {
            const isSelected = preset.id === selectedPreset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                aria-pressed={isSelected}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 font-mono text-xs transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                  isSelected
                    ? 'scale-[1.01] border-teal-400/60 bg-blue-600/30 text-white shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:-translate-y-0.5 hover:border-white/25 hover:text-slate-200'
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
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 sm:text-xs">
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
                <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 font-mono text-xs text-slate-200">
                  <span className={`mr-1 shrink-0 text-[11px] font-bold ${
                    selectedPreset.method === 'GET' ? 'text-emerald-400' : 'text-amber-300'
                  }`}>
                    {selectedPreset.method}
                  </span>
                  <span className="min-w-0 break-all text-slate-500 sm:break-normal">{BASE_URL}</span>
                  <span className="min-w-0 break-all font-semibold text-teal-300 sm:break-normal">{selectedPreset.path}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-sm leading-relaxed text-slate-400 sm:text-base">
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
              <div aria-live="polite" aria-atomic="true" className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-white/10 bg-[#0b0e17] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50" />
                  <span className="ml-2 font-mono text-xs text-slate-400 font-medium">response-output.json</span>
                </div>

                {responseMeta && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                      responseMeta.isSimulated
                        ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                        : responseMeta.ok
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-rose-500/30 bg-rose-500/10 text-rose-400'
                    }`}>
                      {responseMeta.isSimulated
                        ? t('Demo response', 'Respons simulasi')
                        : `${responseMeta.status} ${responseMeta.statusText}`}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">
                      <Icon name="bolt" className="h-3 w-3" /> {responseMeta.timeMs}ms
                    </span>
                  </div>
                )}
              </div>

              {/* Response Body Content */}
              <div aria-busy={loading} className="min-h-[300px] max-h-[460px] overflow-auto bg-[#060812]/95 p-3 font-mono text-xs leading-relaxed text-slate-300 sm:p-5">
                {loading ? (
                  <div role="status" aria-live="polite" className="flex min-h-[260px] flex-col items-center justify-center px-3 py-10 text-center">
                    <div aria-hidden="true" className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
                      <span className="h-6 w-6 rounded-full border-2 border-teal-400/20 border-t-teal-300 animate-spin" />
                    </div>
                    <p className="font-semibold text-slate-200">{t('Request in progress', 'Permintaan sedang diproses')}</p>
                    <p className="mt-2 max-w-xs text-[11px] leading-relaxed text-slate-500">
                      {t('Waiting for the API response from the selected endpoint.', 'Menunggu respons API dari endpoint yang dipilih.')}
                    </p>
                    <div aria-hidden="true" className="mt-5 h-1 w-36 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-teal-300" />
                    </div>
                  </div>
                ) : responseMeta ? (
                  <>
                    {responseMeta.isSimulated && (
                      <div role="status" className="mb-4 flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-3.5 py-3 font-sans animate-fadeIn">
                        <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/10 text-amber-300">
                          <Icon name="triangle" className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] font-semibold text-amber-200">{t('Backend is unreachable', 'Backend tidak terjangkau')}</span>
                          <span className="mt-1 block text-[11px] leading-relaxed text-amber-100/65">
                            {t('Showing a sample response for preview. This is not a live API result.', 'Menampilkan contoh respons untuk pratinjau. Ini bukan hasil API langsung.')}
                          </span>
                        </span>
                      </div>
                    )}
                    <pre className={`whitespace-pre-wrap break-words animate-fadeIn ${
                      responseMeta.isSimulated
                        ? 'text-amber-200/85'
                        : responseMeta.ok
                          ? 'text-emerald-300/90'
                          : 'text-rose-300/90'
                    }`}>
                      {JSON.stringify(responseMeta.body, null, 2)}
                    </pre>
                  </>
                ) : (
                  <div className="flex min-h-[260px] flex-col items-center justify-center px-3 py-10 text-center">
                    <div aria-hidden="true" className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/[0.07] text-teal-300">
                      <Icon name="bolt" className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-teal-400/15 bg-teal-400/[0.06] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-teal-300">
                      {t('Terminal ready', 'Terminal siap')}
                    </span>
                    <p className="mt-3 font-semibold text-slate-200">{t('No response yet', 'Belum ada respons')}</p>
                    <p className="mt-2 max-w-xs text-[11px] leading-relaxed text-slate-500">
                      {t('Choose an endpoint and send a request to inspect its response here.', 'Pilih endpoint dan kirim request untuk melihat responsnya di sini.')}
                    </p>
                  </div>
                )}
              </div>

              {/* Status footer bar */}
              <div aria-live="polite" className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-white/5 bg-[#080B14] px-4 py-2.5 font-mono text-[11px] text-slate-500">
                <span className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${
                    loading
                      ? 'animate-pulse bg-blue-400'
                      : responseMeta?.isSimulated
                        ? 'bg-amber-400'
                        : responseMeta?.ok
                          ? 'bg-emerald-400'
                          : responseMeta
                            ? 'bg-rose-400'
                            : 'bg-slate-600'
                  }`} />
                  {loading
                    ? t('Sending request...', 'Mengirim request...')
                    : responseMeta?.isSimulated
                      ? t('Backend offline · sample response', 'Backend offline · contoh respons')
                      : responseMeta?.ok
                        ? t('Request completed', 'Request selesai')
                        : responseMeta
                          ? t('Request failed', 'Request gagal')
                          : t('Ready for a request', 'Siap menerima request')}
                </span>

                {responseMeta && (
                  <button
                    type="button"
                    onClick={handleCopyResponse}
                    aria-label={copyStatus === 'copied'
                      ? t('Response copied', 'Respons tersalin')
                      : copyStatus === 'failed'
                        ? t('Could not copy response', 'Respons gagal disalin')
                        : t('Copy response JSON', 'Salin JSON respons')}
                    className="inline-flex min-h-8 min-w-[6rem] items-center justify-end gap-1.5 rounded-lg px-2 font-mono text-[11px] text-slate-400 transition-[background-color,color] hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    {copyStatus === 'copied' ? (
                      <span aria-live="polite" className="inline-flex items-center gap-1 text-emerald-400 font-semibold animate-fadeIn">
                        <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m5 12 4 4L19 6" />
                        </svg>
                        {t('Copied!', 'Tersalin!')}
                      </span>
                    ) : copyStatus === 'failed' ? (
                      <span aria-live="polite" className="inline-flex items-center gap-1 text-amber-300 font-semibold animate-fadeIn">
                        <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" strokeWidth="2" />
                          <path strokeLinecap="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
                        </svg>
                        {t('Copy failed', 'Gagal menyalin')}
                      </span>
                    ) : (
                      <>
                        <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>{t('Copy JSON', 'Salin JSON')}</span>
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

import { useEffect, useRef, useState } from 'react';
import GlassCard from '../components/GlassCard';
import NeonButton from '../components/NeonButton';
import Icon from '../components/Icon';
import SectionHeading from '../components/SectionHeading';
import { sendContactMessage } from '../services/api';
import { useLanguage } from '../context/useLanguage';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailCopyMessage, setEmailCopyMessage] = useState('');
  const [emailCopyFailed, setEmailCopyFailed] = useState(false);
  const emailCopyTimer = useRef(null);

  const emailAddress = 'ivanwinata1972@gmail.com';

  useEffect(() => () => {
    if (emailCopyTimer.current) window.clearTimeout(emailCopyTimer.current);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ success: null, message: '' });
  };

  const handleCopyEmail = async () => {
    if (emailCopyTimer.current) window.clearTimeout(emailCopyTimer.current);

    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(emailAddress);
      setEmailCopied(true);
      setEmailCopyFailed(false);
      setEmailCopyMessage(t('Email copied to clipboard!', 'Email berhasil disalin!'));
    } catch (error) {
      console.warn('Copying email to clipboard failed:', error);
      setEmailCopied(false);
      setEmailCopyFailed(true);
      setEmailCopyMessage(t('Could not copy email. Please copy it manually.', 'Email tidak dapat disalin. Silakan salin secara manual.'));
    }

    emailCopyTimer.current = window.setTimeout(() => {
      setEmailCopied(false);
      setEmailCopyFailed(false);
      setEmailCopyMessage('');
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: null, message: '' });

    try {
      const response = await sendContactMessage(formData);
      if (response.success) {
        setStatus({ success: true, message: response.message || t('Message sent successfully! I will reply shortly.', 'Pesan berhasil dikirim! Saya akan segera membalas.') });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(response.message || t('Something went wrong.', 'Terjadi kesalahan.'));
      }
    } catch (error) {
      console.error('Contact message submission failed:', error);
      const message = error instanceof TypeError
        ? t('Unable to reach the server. Your message is still here - please try again later.', 'Server tidak dapat dijangkau. Pesan Anda masih tersimpan di formulir - silakan coba lagi nanti.')
        : error.message || t('We could not send your message. Please try again.', 'Pesan tidak dapat dikirim. Silakan coba lagi.');
      setStatus({ success: false, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden section-surface">
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-blue-600/20 via-teal-500/10 to-transparent rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow={`04. ${t('Connection', 'Kontak')}`}
          title={t('Get In Touch', 'Hubungi Saya')}
          description={t('Open for remote roles, freelancing, & architecture consults.', 'Terbuka untuk pekerjaan jarak jauh, freelance, dan konsultasi arsitektur.')}
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Contact Information & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            <GlassCard className="space-y-6">
              <h3 className="text-xl font-bold text-white">{t("Let's craft something exceptional", 'Mari wujudkan sesuatu yang istimewa')}</h3>
              
              <p className="text-slate-300 leading-relaxed text-sm">
                {t('Whether you have a project opportunity, architecture inquiry, or simply want to connect, feel free to reach out. I respond promptly to all messages.', 'Jika Anda memiliki tawaran proyek, pertanyaan tentang arsitektur, atau sekadar ingin terhubung, silakan kirim pesan. Saya akan membalas secepatnya.')}
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2">
                
                {/* Email Card with Copy button */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 group hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-mono">
                      <Icon name="mail" className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">{t('Direct Email', 'Email Langsung')}</div>
                      <a
                        href={`mailto:${emailAddress}`}
                        aria-label={t(`Send an email to ${emailAddress}`, `Kirim email ke ${emailAddress}`)}
                        className="block max-w-full truncate font-mono text-xs text-slate-200 transition-colors hover:text-teal-300 focus-visible:rounded-sm"
                      >
                        {emailAddress}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={emailCopied ? t('Email copied', 'Email tersalin') : t('Copy email address', 'Salin alamat email')}
                    className="font-mono text-[11px] text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 px-3 py-1.5 rounded-lg border border-teal-500/30 transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    {emailCopied ? t('Copied', 'Tersalin') : t('Copy', 'Salin')}
                  </button>
                </div>
                {emailCopyMessage && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`text-[11px] font-mono ${emailCopyFailed ? 'text-amber-300' : 'text-teal-300'}`}
                  >
                    {emailCopyMessage}
                  </p>
                )}

                {/* Location */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-mono">
                    <Icon name="mapPin" className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">{t('Location & Availability', 'Lokasi & Ketersediaan')}</div>
                    <div className="text-slate-200 text-xs font-mono">{t('Worldwide / Remote (UTC+7)', 'Seluruh Dunia / Jarak Jauh (UTC+7)')}</div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="pt-2 flex items-center gap-3">
                  <a 
                    href="https://github.com/IvanWinataa"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-mono text-xs text-center transition-all flex items-center justify-center gap-2"
                  >
                    <span>GitHub</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ivan-winata-33b15b286/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white font-mono text-xs text-center transition-all flex items-center justify-center gap-2"
                  >
                    <span>LinkedIn</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

              </div>
            </GlassCard>

          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                      {t('Your Name', 'Nama Anda')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all text-sm font-sans"
                      placeholder="Alex Morgan"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                      {t('Your Email', 'Email Anda')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all text-sm font-sans"
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-slate-400">
                      {t('Project Details / Message', 'Detail Proyek / Pesan')}
                    </label>
                    <span className="font-mono text-[10px] text-slate-500">
                      {formData.message.length} {t('chars', 'karakter')}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    maxLength={5000}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all text-sm resize-none font-sans"
                    placeholder={t('Describe your project, timeline, or inquiry...', 'Jelaskan proyek, linimasa, atau pertanyaan Anda...')}
                  />
                </div>

                {status.message && (
                  <div
                    role={status.success ? 'status' : 'alert'}
                    aria-live={status.success ? 'polite' : 'assertive'}
                    className={`p-4 rounded-xl border text-xs font-mono animate-fadeIn ${
                    status.success 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}>
                    {status.success ? '✓' : '⚠️'} {status.message}
                  </div>
                )}

                <NeonButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 text-sm"
                >
                  {loading ? t('Sending message...', 'Mengirim pesan...') : t('Send Direct Message', 'Kirim Pesan')}
                </NeonButton>
              </form>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}


import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { sendContactMessage } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: null, message: '' });

    try {
      const response = await sendContactMessage(formData);
      if (response.success) {
        setStatus({ success: true, message: response.message });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        throw new Error(response.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-primary font-mono text-xl mr-2">03.</span>
            Get In Touch
          </h2>
          <div className="h-px bg-white/10 flex-grow max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Info text */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-gradient">Let's build something exceptional together</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Whether you have a project idea, a position to fill, or just want to say hi, feel free to drop a message. I am always open to discussing new opportunities.
            </p>
            <div className="font-mono text-sm space-y-2 text-gray-500">
              <p>📍 Available worldwide / Remote</p>
              <p>📧 dev@high-end-tech.io</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <GlassCard className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300 text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300 text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300 text-sm resize-none"
                    placeholder="Your project description or message here..."
                  ></textarea>
                </div>

                {status.message && (
                  <div className={`p-4 rounded-lg border text-sm font-mono ${
                    status.success 
                      ? 'bg-emerald/10 border-emerald/30 text-emerald' 
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}>
                    {status.success ? '✓' : '⚠️'} {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary/10 text-primary border border-primary/30 px-6 py-3 rounded-full hover:bg-primary/30 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300 font-mono text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Transmitting Data...' : 'Send Message'}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

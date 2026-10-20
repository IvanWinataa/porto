import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/useLanguage';

const skillTopics = [
  {
    id: 'frontend',
    keywords: ['frontend', 'front-end', 'react', 'next', 'typescript', 'tailwind', 'vite', 'redux', 'zustand', 'web app', 'web aplikasi'],
    label: 'Frontend Engineering',
    labelId: 'Rekayasa Frontend',
    technologies: 'React 19, Next.js App Router, TypeScript, TailwindCSS v4, Vite, serta Redux/Zustand.',
    technologiesEn: 'React 19, Next.js App Router, TypeScript, TailwindCSS v4, Vite, and Redux/Zustand.',
    summary: 'Fokus pada aplikasi web yang responsif, berkinerja tinggi, dan mudah diakses.',
    summaryEn: 'Focused on responsive, high-performance, and accessible web applications.'
  },
  {
    id: 'backend',
    keywords: ['backend', 'back-end', 'node', 'express', 'api', 'jwt', 'auth', 'websocket', 'server'],
    label: 'Backend Development',
    labelId: 'Pengembangan Backend',
    technologies: 'Node.js, Express.js, RESTful APIs, JWT/Auth, CORS middleware, dan WebSockets.',
    technologiesEn: 'Node.js, Express.js, RESTful APIs, JWT/Auth, CORS middleware, and WebSockets.',
    summary: 'Fokus pada API asinkron, middleware, dan integrasi layanan.',
    summaryEn: 'Focused on asynchronous APIs, middleware, and service integrations.'
  },
  {
    id: 'database',
    keywords: ['database', 'basis data', 'postgres', 'sql', 'query', 'migrasi', 'migration', 'acid'],
    label: 'Database Architecture',
    labelId: 'Arsitektur Database',
    technologies: 'PostgreSQL, connection pooling (`pg`), optimasi SQL, database migrations, dan transaksi ACID.',
    technologiesEn: 'PostgreSQL, connection pooling (`pg`), SQL optimization, database migrations, and ACID transactions.',
    summary: 'Fokus pada skema relasional dan optimasi query.',
    summaryEn: 'Focused on relational schemas and query optimization.'
  },
  {
    id: 'architecture',
    keywords: ['arsitektur', 'architecture', 'clean architecture', 'design pattern', 'dto', 'validasi', 'validation'],
    label: 'System Architecture',
    labelId: 'Arsitektur Sistem',
    technologies: 'Clean Architecture, design patterns, async flow control, API specifications, dan DTO validation.',
    technologiesEn: 'Clean Architecture, design patterns, async flow control, API specifications, and DTO validation.',
    summary: 'Fokus pada modul yang terstruktur, terpisah, dan mudah dirawat.',
    summaryEn: 'Focused on well-structured, decoupled, and maintainable modules.'
  },
  {
    id: 'devops',
    keywords: ['devops', 'docker', 'git', 'github', 'ci/cd', 'cicd', 'npm', 'deploy', 'deployment'],
    label: 'DevOps & Tools',
    labelId: 'DevOps & Peralatan',
    technologies: 'Docker, Git/GitHub, dasar CI/CD, npm/Vite bundling, dan environment isolation.',
    technologiesEn: 'Docker, Git/GitHub, CI/CD fundamentals, npm/Vite bundling, and environment isolation.',
    summary: 'Fokus pada lingkungan pengembangan yang konsisten dan alur kerja version control.',
    summaryEn: 'Focused on consistent development environments and version control workflows.'
  },
  {
    id: 'uiux',
    keywords: ['ui', 'ux', 'ui/ux', 'figma', 'desain', 'design system', 'aksesibilitas', 'accessibility', 'dark mode'],
    label: 'UI/UX Design',
    labelId: 'Desain UI/UX',
    technologies: 'Figma prototyping, design systems, micro-interactions, dark mode, dan accessibility.',
    technologiesEn: 'Figma prototyping, design systems, micro-interactions, dark mode, and accessibility.',
    summary: 'Fokus pada antarmuka yang intuitif dan pengalaman pengguna yang jelas.',
    summaryEn: 'Focused on intuitive interfaces and clear user experiences.'
  }
];

const experienceKeywords = ['pengalaman', 'experience', 'karier', 'career', 'kerja', 'bekerja', 'pernah', 'perusahaan', 'achievement'];
const allSkillKeywords = ['skill', 'keahlian', 'kemampuan', 'tech stack', 'teknologi', 'kuasai', 'dikuasai'];
const projectKeywords = ['proyek', 'project', 'portfolio', 'portofolio'];

function normalize(value) {
  return value
    .toLocaleLowerCase('id')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ' ')
    .replace(/[^a-z0-9+#./\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function includesAny(text, keywords) {
  return keywords.some((keyword) => text.includes(normalize(keyword)));
}

function getAnswerAction(question, language) {
  const query = normalize(question);

  if (/^(hai|halo|hello|hi|assalamualaikum|pagi|siang|sore|malam)\b/.test(query)) {
    return null;
  }

  if (includesAny(query, experienceKeywords)) {
    return { href: '#experience', label: language === 'id' ? 'Lihat pengalaman kerja' : 'View work experience' };
  }

  if (includesAny(query, projectKeywords) && !includesAny(query, skillTopics.flatMap((topic) => topic.keywords))) {
    return { href: '#projects', label: language === 'id' ? 'Lihat proyek' : 'View projects' };
  }

  if (skillTopics.some((topic) => includesAny(query, topic.keywords)) || includesAny(query, allSkillKeywords)) {
    return { href: '#skills', label: language === 'id' ? 'Lihat bagian Skills' : 'View skills section' };
  }

  if (includesAny(query, ['kontak', 'contact', 'email', 'hubungi', 'menghubungi'])) {
    return { href: '#contact', label: language === 'id' ? 'Buka bagian Kontak' : 'Open contact section' };
  }

  return null;
}

function answerQuestion(question, language) {
  const query = normalize(question);
  const isIndonesian = language === 'id';

  if (/^(hai|halo|hello|hi|assalamualaikum|pagi|siang|sore|malam)\b/.test(query)) {
    return isIndonesian
      ? 'Halo! Saya bisa membantu menjelaskan skill, teknologi, dan pengalaman yang tercantum di portofolio ini. Silakan pilih pertanyaan cepat atau ketik pertanyaan Anda.'
      : 'Hello! I can explain the skills, technologies, and experience listed in this portfolio. Choose a quick question or type your own.';
  }

  if (includesAny(query, experienceKeywords)) {
    return isIndonesian
      ? 'Bagian pengalaman mencantumkan tiga posisi: Senior Fullstack Engineer (2024-sekarang), Frontend Developer Specialist (2023-2024), dan Software Engineering Intern (2022-2023). Detail tugas dan pencapaiannya ada di bagian Pengalaman.'
      : 'The experience section lists three roles: Senior Fullstack Engineer (2024-present), Frontend Developer Specialist (2023-2024), and Software Engineering Intern (2022-2023). Details and achievements are in the Experience section.';
  }

  if (includesAny(query, projectKeywords) && !includesAny(query, skillTopics.flatMap((topic) => topic.keywords))) {
    return isIndonesian
      ? 'Informasi proyek ditampilkan di bagian Proyek pada halaman ini. Saya belum memiliki rincian tambahan di luar yang tertulis di sana.'
      : 'Project information is shown in the Projects section of this page. I do not have additional details beyond what is listed there.';
  }

  const matchedTopic = skillTopics.find((topic) => includesAny(query, topic.keywords));
  if (matchedTopic) {
    const label = isIndonesian ? matchedTopic.labelId : matchedTopic.label;
    const summary = isIndonesian ? matchedTopic.summary : matchedTopic.summaryEn;
    const technologies = isIndonesian ? matchedTopic.technologies : matchedTopic.technologiesEn;
    return `${label}: ${summary} ${isIndonesian ? 'Teknologi yang dicantumkan meliputi' : 'Listed technologies include'} ${technologies}`;
  }

  if (includesAny(query, allSkillKeywords)) {
    const topics = skillTopics.map((topic) => isIndonesian ? topic.labelId : topic.label).join(', ');
    return isIndonesian
      ? `Portofolio ini mencantumkan enam area: ${topics}. Anda bisa bertanya lebih spesifik, misalnya tentang React, backend, database, Docker, atau Figma.`
      : `This portfolio lists six areas: ${topics}. You can ask about React, backend, databases, Docker, or Figma.`;
  }

  if (includesAny(query, ['kontak', 'contact', 'email', 'hubungi', 'menghubungi'])) {
    return isIndonesian
      ? 'Informasi untuk menghubungi pemilik portofolio tersedia di bagian Kontak. Saya tidak menampilkan alamat yang tidak tercantum di sana.'
      : 'Contact details are available in the Contact section. I will not provide an address that is not listed there.';
  }

  return isIndonesian
    ? 'Saya belum menemukan informasi itu di konten portofolio yang tersedia. Coba tanyakan tentang frontend, backend, database, arsitektur sistem, DevOps, UI/UX, pengalaman kerja, atau proyek.'
    : 'I could not find that in the available portfolio content. Ask about frontend, backend, databases, system architecture, DevOps, UI/UX, work experience, or projects.';
}

export default function SkillChatbot() {
  const { language, t } = useLanguage();
  const suggestions = language === 'id'
    ? ['Skill apa saja yang dikuasai?', 'Ceritakan kemampuan backend', 'Tools UI/UX yang digunakan?', 'Bagaimana pengalaman kerjanya?']
    : ['What skills are listed?', 'Tell me about backend skills', 'Which UI/UX tools are used?', 'What work experience is listed?'];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [launcherOffset, setLauncherOffset] = useState({ x: 0, y: 0 });
  const [panelOffset, setPanelOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'welcome'
    }
  ]);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const dragRef = useRef(null);
  const suppressLauncherClickRef = useRef(false);

  const startDrag = (target, event) => {
    if (event.button !== 0) return;
    if (target === 'panel' && event.target.closest('button, a, input, textarea')) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offset = target === 'launcher' ? launcherOffset : panelOffset;
    dragRef.current = {
      target,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offset,
      rect,
      hasMoved: false
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.hasMoved && Math.hypot(deltaX, deltaY) < 5) return;

    drag.hasMoved = true;
    const minDeltaX = 8 - drag.rect.left;
    const maxDeltaX = window.innerWidth - 8 - drag.rect.right;
    const minDeltaY = 8 - drag.rect.top;
    const maxDeltaY = window.innerHeight - 8 - drag.rect.bottom;
    const nextOffset = {
      x: drag.offset.x + Math.min(maxDeltaX, Math.max(minDeltaX, deltaX)),
      y: drag.offset.y + Math.min(maxDeltaY, Math.max(minDeltaY, deltaY))
    };

    if (drag.target === 'launcher') {
      setLauncherOffset(nextOffset);
    } else {
      setPanelOffset(nextOffset);
    }
  };

  const movePanelByKeyboard = (event) => {
    if (event.target !== event.currentTarget) return;

    const directions = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1]
    };
    const direction = directions[event.key];
    if (!direction) return;

    event.preventDefault();
    const panel = event.currentTarget.parentElement;
    const rect = panel?.getBoundingClientRect();
    if (!rect) return;

    const step = event.shiftKey ? 32 : 12;
    const minDeltaX = 8 - rect.left;
    const maxDeltaX = window.innerWidth - 8 - rect.right;
    const minDeltaY = 8 - rect.top;
    const maxDeltaY = window.innerHeight - 8 - rect.bottom;
    const deltaX = Math.min(maxDeltaX, Math.max(minDeltaX, direction[0] * step));
    const deltaY = Math.min(maxDeltaY, Math.max(minDeltaY, direction[1] * step));

    setPanelOffset((currentOffset) => ({
      x: currentOffset.x + deltaX,
      y: currentOffset.y + deltaY
    }));
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (drag.target === 'launcher' && drag.hasMoved) {
      suppressLauncherClickRef.current = true;
    }
    dragRef.current = null;
  };

  const closeChat = useCallback(() => {
    setIsOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    endOfMessagesRef.current?.scrollIntoView({ behavior, block: 'nearest' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeChat();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeChat, isOpen]);

  const submitQuestion = (question = input) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;
    const answer = answerQuestion(trimmedQuestion, language);

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, role: 'user', text: trimmedQuestion },
      { id: `assistant-${Date.now()}`, role: 'assistant', text: answer, action: getAnswerAction(trimmedQuestion, language) }
    ]);
    setInput('');
  };

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3"
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {isOpen && (
        <section
          id="skill-chatbot-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="skill-chatbot-title"
          style={{ transform: `translate3d(${panelOffset.x}px, ${panelOffset.y}px, 0)` }}
          className="glass-card flex h-[min(34rem,calc(100dvh_-_7rem))] w-[min(23rem,calc(100vw_-_2rem))] flex-col overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        >
          <header
            onPointerDown={(event) => startDrag('panel', event)}
            onKeyDown={movePanelByKeyboard}
            role="group"
            tabIndex={0}
            aria-label={t('Chat panel move handle', 'Pegangan untuk memindahkan panel chat')}
            aria-describedby="skill-chatbot-move-help"
            aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight"
            title={t('Drag the header to move the chat', 'Seret header untuk memindahkan chat')}
            className="flex cursor-grab touch-none select-none items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3 active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <div>
              <h2 id="skill-chatbot-title" className="text-sm font-bold text-white">{t('Portfolio Assistant', 'Asisten Portofolio')}</h2>
              <p id="skill-chatbot-move-help" className="mt-0.5 text-[11px] text-slate-400">{t('Drag header or focus it and use arrow keys to move', 'Seret header atau fokuskan lalu gunakan tombol panah untuk memindahkan')}</p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label={t('Close portfolio assistant', 'Tutup asisten portofolio')}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-3" role="log" aria-label={t('Chat messages', 'Pesan chat')} aria-live="polite" aria-relevant="additions text">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[90%] flex-col gap-2 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <p className={`whitespace-pre-wrap rounded-2xl px-3 py-2.5 text-xs leading-relaxed ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-blue-600/50 text-white'
                      : 'rounded-bl-md border border-white/10 bg-white/5 text-slate-200'
                  }`}>
                    {message.id === 'welcome'
                      ? t('Hello! I am the portfolio assistant. Ask about the skills, technologies, or experience listed on this page.', 'Halo! Saya asisten portofolio. Tanyakan tentang skill, teknologi, atau pengalaman yang tercantum di halaman ini.')
                      : message.text}
                  </p>
                  {message.action && (
                    <a
                      href={message.action.href}
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1.5 text-[11px] font-medium text-cyan-200 transition-colors hover:border-cyan-300/40 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      {message.action.label}
                      <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => submitQuestion(suggestion)}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-1.5 text-left text-[10px] leading-snug text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitQuestion();
            }}
            className="border-t border-white/10 bg-black/30 p-3"
          >
            <label className="sr-only" htmlFor="skill-chatbot-input">{t('Ask about skills or experience', 'Tulis pertanyaan tentang skill atau pengalaman')}</label>
            <div className="flex items-center gap-2">
              <input
                id="skill-chatbot-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={300}
                placeholder={t('Ask about skills...', 'Tanyakan tentang skill...')}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label={t('Send question', 'Kirim pertanyaan')}
                className="rounded-xl bg-blue-500/80 p-2.5 text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="mt-1.5 text-right text-[10px] text-slate-500">Maks. 300 karakter · Enter untuk mengirim</p>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? t('Close chat assistant', 'Tutup asisten chat') : t('Ask about skills', 'Tanya tentang skill')}
        aria-controls={isOpen ? 'skill-chatbot-panel' : undefined}
        onPointerDown={(event) => startDrag('launcher', event)}
        onClick={(event) => {
          if (suppressLauncherClickRef.current) {
            suppressLauncherClickRef.current = false;
            event.preventDefault();
            return;
          }
          setIsOpen((open) => !open);
        }}
        style={{ transform: `translate3d(${launcherOffset.x}px, ${launcherOffset.y}px, 0)` }}
        className="group flex h-14 touch-none cursor-grab items-center gap-2 rounded-full border border-blue-300/30 bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(59,130,246,0.4)] transition-colors hover:bg-blue-500 active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
      >
        <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 10h8M8 14h5m-7 6 1.7-3.4A8 8 0 1 1 20 12a8 8 0 0 1-8 8H6Z" />
        </svg>
        <span>{isOpen ? t('Close chat', 'Tutup chat') : t('Ask about skills', 'Tanya skill')}</span>
      </button>
    </div>
  );
}

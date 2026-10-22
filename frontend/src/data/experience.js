export const experiences = [
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
    resumeHighlights: [
      {
        en: 'Architected high-concurrency Node.js services reducing initial page load by 45% through route-based code splitting and caching.',
        id: 'Merancang arsitektur microservice Node.js konkurensi tinggi dan menurunkan waktu muat halaman hingga 45% melalui code splitting dan caching.'
      },
      {
        en: 'Optimized PostgreSQL query execution plans and database connection pooling to handle enterprise-level request volumes.',
        id: 'Mengoptimalkan rencana eksekusi query PostgreSQL dan pooling koneksi untuk menangani volume transaksi skala enterprise.'
      },
      {
        en: 'Engineered zero-downtime deployment pipelines and automated unit testing suites.',
        id: 'Membangun pipeline deployment tanpa downtime dan rangkaian automated unit testing.'
      }
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
    resumeHighlights: [
      {
        en: 'Crafted responsive glassmorphism component libraries used across 6 enterprise web platforms.',
        id: 'Membangun pustaka komponen responsif glassmorphism yang digunakan di 6 aplikasi web enterprise.'
      },
      {
        en: 'Integrated WebSocket live feeds and interactive chart visualizers for data monitoring dashboards.',
        id: 'Mengintegrasikan feed real-time WebSocket dan visualisasi grafik interaktif untuk dashboard telemetri.'
      }
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
    resumeHighlights: [
      {
        en: 'Built RESTful API endpoints in Node.js/Express and implemented database schema migrations in PostgreSQL.',
        id: 'Mengembangkan endpoint RESTful API dengan Node.js/Express dan migrasi skema tabel PostgreSQL.'
      }
    ],
    skills: ['Express.js', 'Node.js', 'PostgreSQL', 'REST API', 'Git']
  }
];

export function getPeriodLabel(period, language) {
  if (period !== '2024 - PRESENT') return period;
  return language === 'id' ? '2024 - Sekarang' : '2024 - Present';
}

export function getEmploymentTypeLabel(type, language) {
  if (language !== 'id') return type;
  return type === 'Full-time' ? 'Penuh waktu' : type === 'Internship' ? 'Magang' : type;
}

export function getLocationLabel(location, language) {
  if (language === 'id' && location === 'Remote') return 'Jarak jauh';
  return location;
}

-- ================================================
-- Portfolio Database Schema
-- ================================================

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[] NOT NULL,
  image_url VARCHAR(512),
  github_url VARCHAR(512),
  live_url VARCHAR(512),
  category VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- Seed: Dummy Projects Data
-- ================================================
INSERT INTO projects (title, description, long_description, tech_stack, image_url, github_url, live_url, category, featured) VALUES
(
  'E-Commerce Platform',
  'A high-performance, full-stack e-commerce platform with real-time inventory management and seamless payment integration.',
  'Built from the ground up with scalability in mind. Features include a real-time inventory system, Stripe payment gateway, admin dashboard, and a blazing-fast storefront powered by Next.js and server-side rendering.',
  ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'TailwindCSS'],
  '/images/project-ecommerce.jpg',
  'https://github.com',
  'https://example.com',
  'Fullstack',
  TRUE
),
(
  'AI Content Dashboard',
  'An intelligent content management dashboard powered by OpenAI API with smart summarization and auto-tagging features.',
  'Integrates OpenAI GPT-4 API to automatically generate content summaries, suggest tags, and analyze sentiment. The dashboard provides real-time analytics with beautiful chart visualizations.',
  ARRAY['React', 'Express', 'OpenAI API', 'Chart.js', 'PostgreSQL', 'TailwindCSS'],
  '/images/project-ai-dashboard.jpg',
  'https://github.com',
  'https://example.com',
  'AI/ML',
  TRUE
),
(
  'Real-Time Chat App',
  'A production-ready, real-time chat application supporting thousands of concurrent users with end-to-end encryption.',
  'Built with WebSockets (Socket.io) for real-time bi-directional communication. Features include private rooms, message history, online presence indicators, and file sharing.',
  ARRAY['React', 'Socket.io', 'Node.js', 'Redis', 'MongoDB', 'JWT'],
  '/images/project-chat.jpg',
  'https://github.com',
  'https://example.com',
  'Fullstack',
  TRUE
),
(
  'DevOps Monitoring Suite',
  'A comprehensive infrastructure monitoring tool with alerting, log aggregation, and performance metrics visualization.',
  'Provides real-time monitoring for Docker containers, cloud VMs, and Kubernetes clusters. Built with a microservices architecture and integrates with PagerDuty for incident management.',
  ARRAY['React', 'Node.js', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
  '/images/project-devops.jpg',
  'https://github.com',
  NULL,
  'DevOps',
  FALSE
),
(
  'Design System Library',
  'A comprehensive React component library following atomic design principles with full Storybook documentation.',
  'Contains 80+ production-ready components with TypeScript support, dark/light mode theming, accessibility compliance (WCAG 2.1 AA), and fully animated micro-interactions.',
  ARRAY['React', 'TypeScript', 'Storybook', 'Rollup', 'CSS-in-JS', 'Jest'],
  '/images/project-design-system.jpg',
  'https://github.com',
  'https://example.com',
  'Frontend',
  FALSE
),
(
  'Blockchain Wallet App',
  'A secure, non-custodial multi-chain crypto wallet with DeFi integration and NFT gallery support.',
  'Supports 10+ blockchain networks including Ethereum, Solana, and Polygon. Features hardware wallet integration, transaction history, and a built-in DEX aggregator for best swap rates.',
  ARRAY['React Native', 'ethers.js', 'Web3.js', 'Solana/web3.js', 'TypeScript'],
  '/images/project-blockchain.jpg',
  'https://github.com',
  NULL,
  'Web3',
  FALSE
);

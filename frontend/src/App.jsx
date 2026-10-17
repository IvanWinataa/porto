import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import SkillRadar from './sections/SkillRadar';
import Architecture from './sections/Architecture';
import ApiPlayground from './sections/ApiPlayground';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import CommandPalette from './components/CommandPalette';
import ResumeModal from './components/ResumeModal';
import SkillChatbot from './components/SkillChatbot';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="selection:bg-primary/30 selection:text-white">
          <Navbar 
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} 
            onOpenResume={() => setIsResumeModalOpen(true)}
          />
          <main>
            <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
            <About />
            <SkillRadar />
            <Architecture />
            <ApiPlayground />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />

          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onOpen={() => setIsCommandPaletteOpen(true)}
            onOpenResume={() => setIsResumeModalOpen(true)}
          />
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
          <SkillChatbot />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App;

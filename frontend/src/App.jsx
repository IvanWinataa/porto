import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';

function App() {
  return (
    <div className="selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* Projects and Contact sections will be added here */}
      </main>
      <Footer />
    </div>
  )
}

export default App;

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Studio from './components/Studio';
import Contact from './components/Contact';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Studio />
      <Contact />
    </div>
  );
}

export default App;

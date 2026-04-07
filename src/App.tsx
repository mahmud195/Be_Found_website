import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Partners from './components/Partners';
import Contact from './components/Contact';

function App() {
  return (
    <div className="overflow-x-hidden bg-[#25282A]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Partners />
        <Contact />
      </main>
    </div>
  );
}

export default App;


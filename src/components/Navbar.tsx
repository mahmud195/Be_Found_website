import { useState, useEffect } from 'react';
import logo from '../assets/logos/Primary_Logo_BF_White.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll-Spy logic
    const sections = ['home', 'about', 'services', 'projects', 'partners', 'contact'];
    const observers = sections.map((section) => {
      const el = document.getElementById(section);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      return observer;
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#25282A]/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 relative flex items-center justify-center min-h-[48px]">
        {/* Brand Group - Absolutely Positioned Left */}
        <div className="absolute left-8 flex items-center">
          <a href="#" className="flex items-center space-x-4 group">
            <img src={logo} alt="BeFound Logo" className="h-14 w-auto transition-transform duration-500 group-hover:scale-105" />
          </a>
        </div>

        {/* Centered Navigation Menu */}
        <div className="hidden lg:flex items-center space-x-12">
          {['Home', 'About', 'Services', 'Projects', 'Partners'].map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={item}
                href={`#${id}`}
                className={`text-xs tracking-[0.2em] uppercase transition-all duration-500 relative group ${isActive ? 'text-[#E6F0F0] scale-125 font-semibold' : 'text-[#E6F0F0]/60 font-light hover:text-[#E6F0F0]'
                  }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-px bg-[#E6F0F0] transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            );
          })}
        </div>

        {/* Contact Button - Absolutely Positioned Right */}
        <div className="absolute right-8 hidden lg:block">
          <a
            href="#contact"
            className={`px-6 py-2 border transition-all duration-700 text-xs tracking-[0.2em] uppercase ${activeSection === 'contact'
              ? 'bg-[#E6F0F0] border-[#E6F0F0] text-[#25282A] scale-110'
              : 'border-[#E6F0F0]/10 text-[#E6F0F0] font-light hover:bg-[#E6F0F0] hover:text-[#25282A]'
              }`}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

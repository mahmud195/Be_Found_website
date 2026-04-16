import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logos/Primary_Logo_BF_White.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-[#25282A]/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative flex items-center justify-between lg:justify-center min-h-[48px]">

          {/* Mobile menu Button - Left side */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-white hover:text-white/80 transition-colors z-[60]"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>

          {/* Brand Group - Centered on mobile, absolute left on Desktop */}
          <div className="flex-1 lg:flex-none flex justify-center lg:absolute lg:left-8 items-center z-[55]">
            <a href="#" className="flex items-center space-x-4 group">
              <img src={logo} alt="BeFound Logo" className="h-10 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105" />
            </a>
          </div>

          <div className="lg:hidden w-[28px]"></div> {/* Spacer for mobile balance */}

          {/* Centered Navigation Menu - Desktop only */}
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

          {/* Contact Button - Right - Desktop only */}
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#25282A] flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white hover:text-white/80 transition-colors p-2"
          aria-label="Close Menu"
        >
          <X size={32} />
        </button>

        <div className="flex flex-col items-center space-y-8">
          {['Home', 'About', 'Services', 'Projects', 'Partners', 'Contact'].map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={item}
                href={`#${id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl tracking-[0.2em] uppercase transition-all duration-300 ${isActive ? 'text-[#E6F0F0] font-semibold' : 'text-[#E6F0F0]/70 font-light hover:text-[#E6F0F0]'
                  }`}
                style={{ fontFamily: "'Gambetta', serif" }}
              >
                {item}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

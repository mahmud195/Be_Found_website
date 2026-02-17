import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'bg-[#25282A]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-white" />
          <a href="#" className="text-white text-xl tracking-wider font-light">
            BeFound
          </a>
        </div>

        <div className="hidden lg:flex items-center space-x-16">
          {['Home', 'About Us', 'Services', 'Projects', 'Partners'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-sm tracking-wide font-light hover:text-[#E56A54] transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#E56A54] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="text-white text-sm tracking-wide font-light hover:text-[#E56A54] transition-colors duration-300 relative group"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#E56A54] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-white" />
          <span className="text-white text-sm tracking-widest font-light hidden md:block" style={{ direction: 'rtl' }}>
            بيفاوند
          </span>
        </div>
      </div>
    </nav>
  );
}

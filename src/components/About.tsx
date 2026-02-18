import { useEffect, useRef, useState } from 'react';
import aboutBg from '../assets/images/Main shot.jpg';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen px-8 py-32 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={aboutBg}
          alt="About background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}>
        <div className="relative mb-12 flex justify-center">
          {/* Decorative Wave SVG */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 opacity-40">
            <svg viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 20C20 20 30 10 50 10C70 10 80 30 100 30C120 30 130 10 150 10C170 10 180 20 200 20" stroke="#E56A54" strokeWidth="1" />
              <path d="M0 25C20 25 30 15 50 15C70 15 80 35 100 35C120 35 130 15 150 15C170 15 180 25 200 25" stroke="#E56A54" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </div>

          <h2 className="text-5xl md:text-6xl text-[#E6F0F0] font-light relative z-10 tracking-widest">
            About Us
          </h2>
        </div>

        <p className="text-[#E6F0F0]/80 text-xl md:text-2xl leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
          BeFound creates spaces that transcend the ordinary. Every structure we create
          is a chapter in a larger narrative—one that honors heritage while embracing the future.
          Each project is a dialogue between light, material, and human experience.
        </p>

        <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="flex flex-col items-center">
            <span className="text-[#E56A54] text-sm tracking-[0.3em] font-light uppercase mb-2">Since</span>
            <span className="text-3xl text-[#E6F0F0] font-light">2010</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#E56A54] text-sm tracking-[0.3em] font-light uppercase mb-2">Projects</span>
            <span className="text-3xl text-[#E6F0F0] font-light">120+</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#E56A54] text-sm tracking-[0.3em] font-light uppercase mb-2">Awards</span>
            <span className="text-3xl text-[#E6F0F0] font-light">15</span>
          </div>
        </div>
      </div>
    </section>
  );
}


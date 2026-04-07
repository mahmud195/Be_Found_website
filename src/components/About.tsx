import { useEffect, useRef, useState } from 'react';
import aboutBg from '../assets/images/Main shot.jpg';
import aboutPattern from '../assets/images/About us/Typography_Pattern_03_-_BF_White.png';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={aboutBg}
          alt="About background"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-8 py-12 md:py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
      >
        {/* ─── Pattern + "About Us" Title ─── */}
        <div className="flex flex-col items-center mb-12 md:mb-20">
          <div className="relative flex items-center justify-center w-full max-w-4xl">
            {/* Typography Pattern */}
            <img
              src={aboutPattern}
              alt="About us typography pattern"
              loading="lazy"
              className="w-full h-auto max-h-[550px] object-contain"
            />
            {/* "About Us" title overlaid on center of pattern */}
            <h2
              className="absolute text-center text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light tracking-wider"
              style={{ fontFamily: "'Gambarino', serif" }}
            >
              About Us
            </h2>
          </div>
        </div>

        {/* ─── Bottom: Two-column paragraphs ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
            >
              At the heart of BeFound lies the belief that a space is never just
              a structure; it is a living extension of the soul.
            </p>

            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 400 }}
            >
              Our philosophy is rooted in Artistic Intentionality, the idea that
              every architectural line and interior detail should serve a dual
              purpose: to function flawlessly and to inspire deeply.
            </p>

            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
            >
              We reject the "one-size-fits-all" approach, choosing instead to
              view each project as a narrative canvas.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 400 }}
            >
              In a world of constant noise, we strive to design "quiet"
              environments that invite inhabitants to pause, breathe, and
              reclaim their peace of mind.
            </p>

            <p
              className="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
              style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
            >
              For us, successful design is found at the intersection of human
              aspiration and artistic exploration, creating harmonious
              sanctuaries where individuality is celebrated and where you can
              finally feel a true sense of belonging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

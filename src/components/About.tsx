import { useEffect, useRef, useState } from 'react';

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
      className={`min-h-screen bg-[#25282A] px-8 py-32 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-6xl md:text-7xl text-white font-light leading-tight mb-8">
              Architecture as Art
            </h2>
            <div className="w-20 h-px bg-[#E56A54] mb-8" />
            <p className="text-white/70 text-lg leading-relaxed font-light tracking-wide">
              BeFound creates spaces that transcend the ordinary. Each project is a dialogue
              between light, material, and human experience—crafted with precision and
              infused with emotion.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-[#E6F0F0] rounded-sm overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Architecture detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#E56A54]/10 -z-10 rounded-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

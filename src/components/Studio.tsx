import { useEffect, useRef, useState } from 'react';

const principles = [
  {
    number: '01',
    title: 'Context & Place',
    description: 'Every site tells a story. We listen deeply to the land, the light, and the cultural narrative before we design.'
  },
  {
    number: '02',
    title: 'Material Truth',
    description: 'Materials speak their own language. We honor their inherent qualities, celebrating texture, weight, and patina.'
  },
  {
    number: '03',
    title: 'Timeless Form',
    description: 'Architecture outlives trends. We design for permanence, creating spaces that age with grace and dignity.'
  }
];

export default function Studio() {
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
      id="studio"
      className="min-h-screen bg-[#25282A] px-8 py-32"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`mb-24 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <h2 className="text-6xl md:text-7xl text-white font-light mb-12">
            Our Approach
          </h2>
          <p className="text-white/70 text-xl leading-relaxed font-light tracking-wide max-w-3xl">
            BeFound was founded on the belief that architecture is a form of storytelling.
            Each structure we create is a chapter in a larger narrative—one that honors
            heritage while embracing the future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {principles.map((principle, index) => (
            <div
              key={principle.number}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="space-y-6">
                <div className="text-[#E56A54] text-sm tracking-[0.3em] font-light">
                  {principle.number}
                </div>
                <h3 className="text-2xl text-white font-light">
                  {principle.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

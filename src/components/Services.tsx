import { useEffect, useRef, useState } from 'react';

import serviceImg1 from '../assets/images/005_Post.png';
import serviceImg2 from '../assets/images/019_Post night .jpg';

const services = [
  {
    title: 'Architectural Design',
    description: 'Contextual and sustainable architectural solutions that harmonize with their surroundings.',
    image: serviceImg1
  },
  {
    title: 'Interior Design',
    description: 'Curated interiors that blend functionality with a refined aesthetic sensibility.',
    image: serviceImg2
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="min-h-screen bg-[#25282A] px-8 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}>
          <h2 className="text-5xl md:text-6xl text-[#E6F0F0] font-light mb-4">
            Services
          </h2>
          <p className="text-[#E6F0F0]/60 text-lg font-light tracking-wide">
            Explore our comprehensive range of architectural services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative flex bg-[#E6F0F0]/5 rounded-sm overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Vertical Text */}
              <div className="w-16 bg-[#25282A] border-r border-[#E6F0F0]/10 flex items-center justify-center">
                <span className="rotate-[-90deg] whitespace-nowrap text-[#E6F0F0]/40 text-xs tracking-[0.5em] uppercase font-light">
                  {service.title}
                </span>
              </div>

              <div className="flex-1 p-8 md:p-12">
                <div className="relative aspect-[16/10] mb-8 overflow-hidden rounded-sm">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#25282A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <h3 className="text-2xl text-[#E6F0F0] font-light mb-4 group-hover:text-[#E56A54] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-[#E6F0F0]/60 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


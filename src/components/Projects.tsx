import { useEffect, useRef, useState } from 'react';

import projectImg1 from '../assets/images/Main shot.jpg';
import projectImg2 from '../assets/images/1.png';
import projectImg3 from '../assets/images/3.jpg';
import projectImg4 from '../assets/images/6.jpg';

const projects = [
  {
    title: 'Residencia Vista',
    location: 'Ibiza, Spain',
    year: '2024',
    image: projectImg1,
    color: '#E56A54'
  },
  {
    title: 'Marina Commons',
    location: 'Miami, USA',
    year: '2023',
    image: projectImg2,
    color: '#6BA4B8'
  },
  {
    title: 'Sanctuary House',
    location: 'Kyoto, Japan',
    year: '2023',
    image: projectImg3,
    color: '#A2A569'
  },
  {
    title: 'Desert Oasis',
    location: 'Dubai, UAE',
    year: '2024',
    image: projectImg4,
    color: '#D4AF37'
  }
];

export default function Projects() {
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
      id="projects"
      className="min-h-screen bg-[#25282A] px-8 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
        >
          <h2 className="text-5xl md:text-6xl text-[#E6F0F0] font-light mb-4">
            Projects
          </h2>
          <p className="text-[#E6F0F0]/60 text-lg font-light tracking-wide max-w-2xl">
            A curation of our most significant architectural achievements, where form meets feeling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                } ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#25282A] via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-8 h-px" style={{ backgroundColor: project.color }} />
                    <span className="text-[#E6F0F0]/60 text-xs tracking-widest uppercase font-light">
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl text-[#E6F0F0] font-light">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="px-12 py-4 border border-[#E6F0F0]/20 text-[#E6F0F0] text-sm tracking-[0.3em] uppercase font-light hover:bg-[#E6F0F0] hover:text-[#25282A] transition-all duration-700">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}


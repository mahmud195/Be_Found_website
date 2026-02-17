import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'Residencia Vista',
    location: 'Ibiza, Spain',
    year: '2024',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#E56A54'
  },
  {
    title: 'Marina Commons',
    location: 'Miami, USA',
    year: '2023',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#6BA4B8'
  },
  {
    title: 'Sanctuary House',
    location: 'Kyoto, Japan',
    year: '2023',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: '#A2A569'
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
      id="work"
      className="min-h-screen bg-[#E6F0F0] px-8 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <h2 className="text-6xl md:text-7xl text-[#25282A] font-light mb-4">
            Selected Works
          </h2>
          <p className="text-[#25282A]/60 text-lg font-light tracking-wide">
            Landmark projects across continents
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className={`md:col-span-3 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="aspect-[16/10] overflow-hidden rounded-sm group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className={`md:col-span-2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="space-y-6">
                    <div className="w-12 h-px" style={{ backgroundColor: project.color }} />
                    <h3 className="text-4xl md:text-5xl text-[#25282A] font-light">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-8 text-[#25282A]/60">
                      <span className="text-sm tracking-widest">{project.location}</span>
                      <span className="text-sm tracking-widest">{project.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

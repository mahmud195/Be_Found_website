import { useEffect, useRef, useState } from 'react';

import serviceImg1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Service Pictures/Architecture/Contemporary Exterior Image.jpg';
import serviceImg2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Service Pictures/Interior/Living Room with Tree.jpg';
import serviceImg3 from '../assets/BeFound Company Profile With Linked Pictures/Links/Service Pictures/Landscape/Architecture Design Image (1).jpg';
import serviceImg4 from '../assets/BeFound Company Profile With Linked Pictures/Links/Service Pictures/FF&E/Modern Living Room Design (1).jpg';

const services = [
  {
    title: 'Architectural Design',
    description:
      'Our architectural approach is defined by the seamless blend of structural innovation and emotional resonance.\n\nWe design forms that transcend functionality, creating the "canvas" upon which your life unfolds.\n\nBy merging artistic exploration with meticulous precision, we shape buildings that harmonize with their surroundings, while standing as bold statements of individuality.\n\nFor us, architecture is about more than just shelter; it is about creating a permanent sense of place where you truly belong.',
    image: serviceImg1,
    accent: '#6BA4B8',
    overlayRgb: '107, 164, 184',
  },
  {
    title: 'Interior Design',
    description:
      'At BeFound, we view interiors as the art of sculpting atmosphere.\n\nWe move beyond surface-level aesthetics to curate spaces that deeply resonate with your identity.\n\nBy balancing textures, colors, and spatial elements, we transform rooms into intimate sanctuaries of self-expression.\n\nEvery detail is intentionally selected to foster comfort and inspire creativity, ensuring your home is not just a space, but a true reflection of who you are.',
    image: serviceImg2,
    accent: '#E56A54',
    overlayRgb: '229, 106, 84',
  },
  {
    title: 'Landscape Design',
    description:
      'We design outdoor spaces that harmonize with nature and architecture. Our landscapes foster serenity, seamlessly integrating greenery, water features, and pathways to create vibrant, inviting environments.\n\nEvery landscape we design is a dialogue between built form and the natural world, ensuring spaces that breathe life into their surroundings.',
    image: serviceImg3,
    accent: '#A2A569',
    overlayRgb: '162, 165, 105',
  },
  {
    title: 'FF&E Services',
    description:
      'We curate and source bespoke furniture, fixtures, and equipment that complement your space. Our selections prioritize quality, style, and comfort to complete the design vision with cohesive elegance.\n\nEvery piece is chosen with intention, balancing form and function to create interiors that feel both luxurious and lived-in.',
    image: serviceImg4,
    accent: '#E6F0F0',
    overlayRgb: '200, 210, 210',
  },
];

/* ─── Book-open hover styles ─── */
const carouselStyles = `
  /* Hide scrollbar but keep scrollable */
  .services-scroll-track {
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .services-scroll-track::-webkit-scrollbar {
    display: none;
  }

  .service-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .service-card .card-title-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: opacity 0.5s ease 0.05s;
  }
  .service-card:hover .card-title-overlay {
    opacity: 0;
    pointer-events: none;
  }

  .service-card .card-text-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    z-index: 15;
    transform: translateX(-100%);
    opacity: 0;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.5s ease 0.1s;
    will-change: transform, opacity;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 2.5rem;
    overflow-y: auto;
  }
  .service-card:hover .card-text-panel {
    transform: translateX(0);
    opacity: 1;
  }

  .service-card .card-default-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.55) 0%,
      rgba(0,0,0,0.15) 50%,
      rgba(0,0,0,0.25) 100%
    );
    z-index: 5;
    transition: opacity 0.5s ease;
  }
  .service-card:hover .card-default-gradient {
    opacity: 0.3;
  }

  .service-card .card-text-panel::-webkit-scrollbar {
    width: 3px;
  }
  .service-card .card-text-panel::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.3);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    .service-card .card-text-panel {
      width: 70%;
      padding: 1.5rem;
    }
  }
`;

// We triple the items for seamless infinite loop
const REPEAT_COUNT = 3;
const GAP_PX = 16; // matches the gap-4 in tailwind

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isPaused = useRef(false);

  // Get the width of one card (including gap)
  const getCardStep = () => {
    const el = scrollRef.current;
    if (!el) return 400;
    const firstCard = el.querySelector('.service-slide') as HTMLElement;
    if (!firstCard) return 400;
    return firstCard.offsetWidth + GAP_PX;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // On mount, start in the middle copy
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const oneSetWidth = el.scrollWidth / REPEAT_COUNT;
    el.scrollLeft = oneSetWidth;
  }, []);

  // Infinite loop: silently reset to middle copy at edges
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const oneSetWidth = el.scrollWidth / REPEAT_COUNT;
      if (el.scrollLeft <= 0) {
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = oneSetWidth;
        el.style.scrollBehavior = 'smooth';
      } else if (el.scrollLeft >= oneSetWidth * 2) {
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = oneSetWidth;
        el.style.scrollBehavior = 'smooth';
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll every 6 seconds (pauses on hover) — snaps to next card
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        scrollRef.current?.scrollBy({ left: getCardStep(), behavior: 'smooth' });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeftFn = () => {
    scrollRef.current?.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
  };

  const scrollRightFn = () => {
    scrollRef.current?.scrollBy({ left: getCardStep(), behavior: 'smooth' });
  };

  // Triple the services array for seamless infinite loop
  const repeatedServices = Array.from({ length: REPEAT_COUNT }, () => services).flat();

  return (
    <>
      <style>{carouselStyles}</style>
      <section
        ref={sectionRef}
        id="services"
        className="min-h-screen bg-[#25282A] px-6 md:px-8 py-24 md:py-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
          >
            <h2
              className="text-5xl md:text-6xl text-[#E6F0F0] font-light mb-4"
              style={{ fontFamily: "'Gambarino', serif" }}
            >
              Services
            </h2>
            <p className="text-[#E6F0F0]/60 text-base md:text-lg font-light tracking-wide">
              Explore BeFound wide experience in different architectural services.
            </p>
          </div>

          {/* Carousel */}
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
          >
            <div className="relative">
              {/* Scrollable Track */}
              <div
                ref={scrollRef}
                className="services-scroll-track flex gap-4"
                onMouseEnter={() => { isPaused.current = true; }}
                onMouseLeave={() => { isPaused.current = false; }}
              >
                {repeatedServices.map((service, idx) => (
                  <div
                    key={`${service.title}-${idx}`}
                    className="service-slide flex-shrink-0 flex rounded-sm overflow-hidden"
                    style={{ width: 'min(80%, 900px)', height: '480px' }}
                  >
                    {/* Vertical Title Strip */}
                    <div
                      className="relative flex-shrink-0 flex items-center justify-center"
                      style={{ width: '52px', backgroundColor: '#1a1c1e' }}
                    >
                      <span
                        className="whitespace-nowrap text-sm md:text-base font-light tracking-[0.15em] uppercase"
                        style={{
                          color: service.accent,
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                          fontFamily: "'Gambetta', serif",
                        }}
                      >
                        {service.title}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="service-card flex-1">
                      {/* Image — fills the entire card, no black space */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Dark gradient */}
                      <div className="card-default-gradient" />

                      {/* Title overlay (fades out on hover) */}
                      <div className="card-title-overlay">
                        <h3
                          className="text-3xl md:text-5xl font-light text-center px-8 leading-tight"
                          style={{
                            color: service.accent,
                            fontFamily: "'Gambarino', serif",
                            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                          }}
                        >
                          {service.title}
                        </h3>
                      </div>

                      {/* Text panel (slides in from left on hover) */}
                      <div
                        className="card-text-panel"
                        style={{
                          background: `linear-gradient(135deg, rgba(${service.overlayRgb}, 0.85) 0%, rgba(${service.overlayRgb}, 0.65) 100%)`,
                          backdropFilter: 'blur(6px)',
                        }}
                      >
                        <h3
                          className="text-2xl md:text-3xl font-light mb-5 text-white"
                          style={{ fontFamily: "'Gambarino', serif" }}
                        >
                          {service.title}
                        </h3>
                        {service.description.split('\n\n').map((para, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-white/90 text-xs md:text-sm font-light leading-relaxed mb-3 last:mb-0"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow Buttons */}
              <button
                onClick={scrollLeftFn}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/70 group"
                aria-label="Scroll left"
              >
                <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={scrollRightFn}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/70 group"
                aria-label="Scroll right"
              >
                <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

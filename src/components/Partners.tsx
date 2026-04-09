import { useEffect, useRef, useState } from 'react';
import partnerImg from '../assets/images/15.jpg';

const partners = [
  {
    name: 'ENG. AHMED ABDEL AZEEM',
    role: 'Chief Executive Officer\n& Head Of Development',
    bio: [
      "Eng. Ahmed has contributed to the design and management of a wide range of projects, gaining hands-on experience by navigating the unique challenges of each stage in his professional journey.",
      "He later acquired the role of CEO with a vision to expand the firm's design services and enhance internal performance across all divisions. Within just two years, he successfully positioned the office to deliver its services both within the Kingdom and internationally—further strengthening its leadership in the field of engineering consultancy."
    ],
    image: partnerImg
  },
];

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('.partner-card') as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 32;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setCurrentIndex(idx);
  };

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="min-h-screen bg-[#1a1c1d] py-16 md:py-32 overflow-hidden"
    >
      {/* Title */}
      <div
        className={`px-5 sm:px-8 md:px-16 mb-10 md:mb-16 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light leading-tight"
          style={{ fontFamily: "'Gambarino', serif" }}
        >
          Partners<br />& Associates
        </h2>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        className={`flex gap-8 px-5 sm:px-8 md:px-16 overflow-x-auto hide-scrollbar justify-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {partners.map((partner, idx) => (
          <div
            key={idx}
            className="partner-card flex-shrink-0 flex flex-col md:flex-row gap-0 rounded-sm overflow-hidden"
            style={{ width: 'min(92vw, 1000px)', scrollSnapAlign: 'start' }}
          >
            {/* Portrait Photo — full width on mobile (order 1), right column on desktop (order 2) */}
            <div
              className={`w-full md:flex-1 overflow-hidden order-1 md:order-2 transition-all duration-1000 delay-[400ms] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'}`}
              style={{ height: 'clamp(220px, 58vw, 380px)' }}
            >
              <img
                src={partner.image}
                alt={partner.name}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Text Content — below image on mobile (order 2), left column on desktop (order 1) */}
            <div
              className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 bg-[#1a1c1d] order-2 md:order-1 md:w-[45%] md:flex-none"
            >
              <h3
                className={`text-base sm:text-lg md:text-xl text-[#E6F0F0] font-bold tracking-wider uppercase mb-3 md:mb-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ fontFamily: "'Gambetta', serif" }}
              >
                {partner.name}
              </h3>
              <p
                className={`text-[#E6F0F0]/70 text-sm md:text-base lg:text-lg mb-5 md:mb-8 leading-snug transition-all duration-700 delay-[450ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ fontFamily: "'Gambetta', serif", fontStyle: 'italic', whiteSpace: 'pre-line' }}
              >
                {partner.role}
              </p>
              <div className="space-y-3 md:space-y-4">
                {partner.bio.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className={`text-[#E6F0F0]/65 text-sm leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ fontFamily: "'Gambetta', serif", fontWeight: 300, textAlign: 'justify', transitionDelay: `${600 + pIdx * 100}ms` }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots (only if multiple partners) */}
      {partners.length > 1 && (
        <div className="flex justify-center mt-10 gap-2 px-8">
          {partners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-6 bg-[#E6F0F0]' : 'w-2 bg-[#E6F0F0]/30'}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

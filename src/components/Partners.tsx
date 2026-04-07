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
    const cardWidth = card.offsetWidth + 32; // gap-8 = 32px
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setCurrentIndex(idx);
  };

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="min-h-screen bg-[#1a1c1d] py-24 md:py-32 overflow-hidden"
    >
      {/* Title */}
      <div
        className={`px-8 md:px-16 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <h2
          className="text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light leading-tight"
          style={{ fontFamily: "'Gambarino', serif" }}
        >
          Partners<br />& Associates
        </h2>
      </div>

      {/* Carousel Track */}
      <div
        ref={scrollRef}
        className={`flex gap-8 px-8 md:px-16 overflow-x-auto scrollbar-hide transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {partners.map((partner, idx) => (
          <div
            key={idx}
            className="partner-card flex-shrink-0 flex gap-0 rounded-sm overflow-hidden"
            style={{
              width: 'min(85vw, 1000px)',
              scrollSnapAlign: 'start',
              minHeight: '520px',
            }}
          >
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center px-10 py-12 bg-[#1a1c1d]" style={{ flex: '0 0 45%' }}>
              <h3
                className="text-lg md:text-xl text-[#E6F0F0] font-bold tracking-wider uppercase mb-4"
                style={{ fontFamily: "'Gambetta', serif" }}
              >
                {partner.name}
              </h3>
              <p
                className="text-[#E6F0F0]/70 text-base md:text-lg mb-8 leading-snug"
                style={{ fontFamily: "'Gambetta', serif", fontStyle: 'italic', whiteSpace: 'pre-line' }}
              >
                {partner.role}
              </p>
              <div className="space-y-4">
                {partner.bio.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[#E6F0F0]/65 text-sm leading-relaxed"
                    style={{ fontFamily: "'Gambetta', serif", fontWeight: 300, textAlign: 'justify' }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: Portrait Photo */}
            <div className="flex-1 overflow-hidden" style={{ minHeight: '520px' }}>
              <img
                src={partner.image}
                alt={partner.name}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        ))}

        {/* Spacer so last card doesn't touch edge */}
        <div className="flex-shrink-0 w-8 md:w-16" />
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

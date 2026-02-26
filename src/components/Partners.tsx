import { useEffect, useRef, useState } from 'react';

import partnerImg from '../assets/images/15.jpg';

const partners = [
    {
        name: 'ISOLADIMURANO ARCHITECTI',
        role: 'Principal Architect & Partner',
        description: "Specializing in Mediterranean luxury architecture and sustainable urban planning. Awarded 'Architect of the Year' 2023 for the Ibiza project.",
        image: partnerImg
    },
    {
        name: 'ISOLADIMURANO DESIGN',
        role: 'Interior Design Partner',
        description: 'Bringing Venetian craftsmanship to modern interiors. A focus on material truth and timeless aesthetic sensibility.',
        image: partnerImg
    }
];

export default function Partners() {
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
            id="partners"
            className="min-h-screen bg-[#25282A] px-8 py-32"
        >
            <div className="max-w-7xl mx-auto">
                <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    }`}>
                    <h2 className="text-5xl md:text-6xl text-[#E6F0F0] font-light mb-12">
                        Partners<br />& Associates
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-24 items-center">
                    <div className="space-y-16">
                        {partners.map((partner, index) => (
                            <div
                                key={partner.name}
                                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                                    }`}
                                style={{ transitionDelay: `${index * 300}ms` }}
                            >
                                <div className="space-y-6">
                                    <h3 className="text-[#E6F0F0]/60 text-sm tracking-[0.3em] font-light uppercase">
                                        {partner.role}
                                    </h3>
                                    <h4 className="text-3xl text-[#E6F0F0] font-light">
                                        {partner.name}
                                    </h4>
                                    <p className="text-[#E6F0F0]/60 font-light leading-relaxed max-w-md">
                                        {partner.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                        <div className="aspect-[4/5] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
                            <img
                                src={partners[0].image}
                                alt="Partner portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import contactImg from '../assets/images/pexels-adrien-olichon-1257089-13025277.jpg';

export default function Contact() {
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
      id="contact"
      className="min-h-screen bg-[#25282A] px-8 py-32 border-t border-[#E6F0F0]/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
          >
            <h2 className="text-6xl md:text-7xl text-[#E6F0F0] font-light leading-tight mb-12">
              Let's Create Together
            </h2>
            <p className="text-[#E6F0F0]/60 text-lg leading-relaxed font-light tracking-wide mb-16">
              Whether you're envisioning a private residence, a cultural landmark, or a
              commercial space, we approach every project with the same dedication to craft
              and vision.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-[#E6F0F0] mt-1" />
                <div>
                  <p className="text-[#E6F0F0] font-light mb-1">Email</p>
                  <a
                    href="mailto:studio@befound.com"
                    className="text-[#E6F0F0]/60 hover:text-[#E6F0F0] transition-colors duration-300"
                  >
                    studio@befound.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-[#E6F0F0] mt-1" />
                <div>
                  <p className="text-[#E6F0F0] font-light mb-1">Studio</p>
                  <p className="text-[#E6F0F0]/60">
                    Copenhagen, Denmark
                    <br />
                    New York, USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
          >
            <div className="aspect-[4/5] bg-[#E6F0F0]/5 rounded-sm overflow-hidden border border-[#E6F0F0]/10">
              <img
                src={contactImg}
                alt="Studio space"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
        </div>

        <div
          className={`mt-32 pt-16 border-t border-[#E6F0F0]/10 flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <p className="text-[#E6F0F0]/30 text-sm tracking-wide font-light mb-4 md:mb-0">
            © 2024 BeFound Architecture Studio
          </p>
          <div className="flex space-x-8">
            {['Instagram', 'LinkedIn', 'Behance'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[#E6F0F0]/60 text-sm tracking-[0.2em] uppercase font-light hover:text-[#E6F0F0] transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}

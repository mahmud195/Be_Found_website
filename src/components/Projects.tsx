import { useEffect, useRef, useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Abdelkreim Apartment
import abdelkreimMain from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Abdelkreim Apartment/Main shot.jpg';
import abdelkreim1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Abdelkreim Apartment/019_Post night .jpg';
import abdelkreim2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Abdelkreim Apartment/020_Post night0.jpg';

// Hamoud Building
import hamoudMain from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hamoud Building/Main shot.jpg';
import hamoud1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hamoud Building/02_Post.jpg';
import hamoud2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hamoud Building/1_View04.jpg';
import hamoud3 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hamoud Building/1_View08.jpg';
import hamoud4 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hamoud Building/6.jpg';

// Hotel
import hotelMain from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hotel/Main shot.jpg';
import hotel1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hotel/005_Post.png';
import hotel2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hotel/3.jpg';
import hotel3 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hotel/4.jpg';
import hotel4 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Hotel/8.jpg';

// Offices
import officesMain from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Offices/Main shot.jpg';
import offices1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Offices/20_Post.jpg';
import offices2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Offices/26_Post.jpg';

// Restaurant
import restaurantMain from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Restaurant/Main shot.jpg';
import restaurant1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Restaurant/14.jpg';
import restaurant2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Restaurant/15.jpg';
import restaurant3 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Restaurant/20_Post_1.jpg';
import restaurant4 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Restaurant/30_Post.jpg';

// Villa1
import villa1Main from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa1/Main shot.jpg';
import villa1_1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa1/12_Post.jpg';
import villa1_2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa1/cam 18 _Post.jpg';

// Villa2
import villa2Main from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa2/Main shot.jpg';
import villa2_1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa2/camera-18--.jpg';
import villa2_2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa2/camera-19.jpg';

// Villa47
import villa47Main from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa47/Main shot.jpg';
import villa47_1 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa47/01.jpg';
import villa47_2 from '../assets/BeFound Company Profile With Linked Pictures/Links/Projects Pictures/Villa47/03.jpg';


const projects = [
  {
    title: 'Abdelkreim Apartment',
    description: 'A luxurious residential interior focused on warm tones and distinct atmospheres.',
    image: abdelkreimMain,
    gallery: [abdelkreimMain, abdelkreim1, abdelkreim2]
  },
  {
    title: 'Hamoud Building',
    description: 'An architectural exploration merging function and profound aesthetics.',
    image: hamoudMain,
    gallery: [hamoudMain, hamoud1, hamoud2, hamoud3, hamoud4]
  },
  {
    title: 'Hotel',
    description: 'Creating harmonious sanctuaries where individuality is celebrated in hospitality.',
    image: hotelMain,
    gallery: [hotelMain, hotel1, hotel2, hotel3, hotel4]
  },
  {
    title: 'Offices',
    description: 'Workspace environments designed to inspire creativity and peace of mind.',
    image: officesMain,
    gallery: [officesMain, offices1, offices2]
  },
  {
    title: 'Restaurant',
    description: 'A culinary space crafted as a narrative canvas of flavors and design.',
    image: restaurantMain,
    gallery: [restaurantMain, restaurant1, restaurant2, restaurant3, restaurant4]
  },
  {
    title: 'Villa 1',
    description: 'A private residential villa blending modern elegance with lasting comfort.',
    image: villa1Main,
    gallery: [villa1Main, villa1_1, villa1_2]
  },
  {
    title: 'Villa 2',
    description: 'Sleek architectural lines forming a quiet environment for family life.',
    image: villa2Main,
    gallery: [villa2Main, villa2_1, villa2_2]
  },
  {
    title: 'Villa 47',
    description: 'At the intersection of human aspiration and artistic exploration.',
    image: villa47Main,
    gallery: [villa47Main, villa47_1, villa47_2]
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Drag state
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Modal states
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (selectedProject || fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject, fullscreenImage]);

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

  // Auto-play
  useEffect(() => {
    if (isHovered || isDragging || selectedProject) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, isDragging, selectedProject]);

  const goToSlide = (index: number) => {
    setCurrentIndex(((index % projects.length) + projects.length) % projects.length);
  };

  const prevSlide = () => goToSlide(currentIndex - 1);
  const nextSlide = () => goToSlide(currentIndex + 1);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 50) {
      prevSlide();
    } else if (dragOffset < -50) {
      nextSlide();
    }
    setDragOffset(0);
  };

  // Get indices for the 3-card view: prev, current, next
  const prevIndex = ((currentIndex - 1) + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="min-h-screen bg-[#25282A] py-24 md:py-32 overflow-hidden select-none"
      >
        {/* Header */}
        <div
          className={`max-w-6xl mx-auto px-8 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light mb-6"
            style={{ fontFamily: "'Gambarino', serif" }}
          >
            Projects
          </h2>
          <p
            className="text-[#E6F0F0] text-base font-semibold mb-3 max-w-3xl"
            style={{ fontFamily: "'Gambetta', serif" }}
          >
            Explore a curated selection of environments crafted by BeFound.
          </p>
          <p
            className="text-[#E6F0F0]/70 text-sm md:text-base leading-relaxed max-w-3xl text-justify"
            style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
          >
            Our work spans the intersection of form and feeling, showcasing our commitment to creating
            'quiet' spaces in a noisy world. Every project in our gallery is an exploration of harmony
            merging artistic vision with functional excellence to deliver interiors and architecture
            that invite you to pause, breathe, and feel truly at home.
          </p>
        </div>

        {/* Slider */}
        <div
          className={`relative transition-all duration-1000 delay-300 touch-pan-y ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="flex items-center justify-center gap-4 md:gap-6 px-4">
            {/* Left peek card */}
            <div
              className="hidden md:block flex-shrink-0 w-[8%] cursor-pointer transition-all duration-700 opacity-60 hover:opacity-80"
              onClick={prevSlide}
              style={{ transform: `translateX(${dragOffset * 0.2}px)` }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={projects[prevIndex].image}
                  alt={projects[prevIndex].title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>

            {/* Center card */}
            <div
              className="flex-shrink-0 w-full md:w-[60%] lg:w-[55%] transition-transform duration-300"
              style={{ transform: `translateX(${dragOffset}px)` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm group">
                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  className="w-full h-full object-cover transition-all duration-700 pointer-events-none"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Project info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3
                    className="text-xl md:text-2xl text-white font-light mb-2"
                    style={{ fontFamily: "'Gambarino', serif" }}
                  >
                    {projects[currentIndex].title}
                  </h3>
                  <p
                    className="text-white/80 text-xs md:text-sm leading-relaxed mb-3 max-w-lg"
                    style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
                  >
                    {projects[currentIndex].description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (Math.abs(dragOffset) < 5) {
                        setSelectedProject(projects[currentIndex]);
                      }
                    }}
                    className="text-white text-xs tracking-widest uppercase underline underline-offset-4 hover:text-white/70 transition-colors cursor-pointer"
                    style={{ fontFamily: "'Gambetta', serif" }}
                  >
                    Read More...
                  </button>
                </div>
              </div>
            </div>

            {/* Right peek card */}
            <div
              className="hidden md:block flex-shrink-0 w-[8%] cursor-pointer transition-all duration-700 opacity-60 hover:opacity-80"
              onClick={nextSlide}
              style={{ transform: `translateX(${dragOffset * 0.2}px)` }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={projects[nextIndex].image}
                  alt={projects[nextIndex].title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Navigation arrows for mobile */}
          <div className="flex md:hidden justify-center gap-8 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 border border-white/30 text-white/70 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 border border-white/30 text-white/70 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/30'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Project Modal (Instagram style scroll) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-[#1a1c1d] flex flex-col pt-20">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          <div className="absolute top-6 left-6 z-50">
            <h2
              className="text-3xl text-white font-light drop-shadow-lg"
              style={{ fontFamily: "'Gambarino', serif" }}
            >
              {selectedProject.title}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-20 scrollbar-hide">
            <div className="max-w-4xl mx-auto flex flex-col gap-12 mt-12">
              {selectedProject.gallery.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`${selectedProject.title} ${idx + 1}`}
                    className="w-full h-auto object-contain rounded-sm"
                  />
                  <button
                    onClick={() => {
                      setFullscreenImage(img);
                      setScale(1);
                    }}
                    className="absolute bottom-4 right-4 p-3 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    title="Fullscreen Zoom"
                  >
                    <Maximize2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Deep Zoom Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[110] bg-black flex items-center justify-center overflow-hidden cursor-zoom-in"
          onClick={() => {
            if (scale === 1) setScale(1.5);
            else if (scale === 1.5) setScale(2);
            else {
              setScale(1);
              setFullscreenImage(null);
            }
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
              setScale(1);
            }}
            className="absolute top-6 right-6 z-50 p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          <img
            src={fullscreenImage}
            alt="Fullscreen zoom"
            className="w-full h-full object-contain transition-transform duration-300"
            style={{ transform: `scale(${scale})` }}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest pointer-events-none">
            {scale === 1 ? 'CLICK TO ZOOM' : scale === 1.5 ? 'CLICK TO ZOOM MORE' : 'CLICK TO CLOSE'}
          </div>
        </div>
      )}
    </>
  );
}

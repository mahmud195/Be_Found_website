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
    fullDescription: 'Located in the heart of the city, this luxurious apartment merges modern aesthetic sensibilities with timeless comforts. Warm tones wrap the interior, creating an inviting atmosphere that celebrates light and shadow. Every element has been meticulously placed to ensure functional elegance while offering a quiet sanctuary from the bustling world outside.',
    image: abdelkreimMain,
    gallery: [abdelkreimMain, abdelkreim1, abdelkreim2]
  },
  {
    title: 'Hamoud Building',
    description: 'An architectural exploration merging function and profound aesthetics.',
    fullDescription: 'An exploration of architectural grandeur and sculptural form. The Hamoud Building stands as a testament to structural poetry, where the interaction of concrete and glass redefines the skyline. The interior layouts prioritize natural light, offering expansive views and fostering a deeply inspirational environment for all who enter.',
    image: hamoudMain,
    gallery: [hamoudMain, hamoud1, hamoud2, hamoud3, hamoud4]
  },
  {
    title: 'Hotel',
    description: 'Creating harmonious sanctuaries where individuality is celebrated in hospitality.',
    fullDescription: 'A hospitality experience designed around the concept of a harmonious sanctuary. This hotel project seamlessly blends opulent luxury with intimate, quiet corners that invite guests to pause and breathe. The materials and textures are carefully curated to celebrate both individuality and a shared sense of arrival.',
    image: hotelMain,
    gallery: [hotelMain, hotel1, hotel2, hotel3, hotel4]
  },
  {
    title: 'Offices',
    description: 'Workspace environments designed to inspire creativity and peace of mind.',
    fullDescription: 'Rethinking the modern workspace, this gallery-style office environment prioritizes creativity, collaboration, and peace of mind. By integrating elements of nature and utilizing a serene color palette, the design minimizes cognitive noise and encourages deep focus and profound inspiration.',
    image: officesMain,
    gallery: [officesMain, offices1, offices2]
  },
  {
    title: 'Restaurant',
    description: 'A culinary space crafted as a narrative canvas of flavors and design.',
    fullDescription: 'A culinary journey crafted as a rich narrative canvas. The interior of this restaurant balances dynamic energy with refined dining intimacy. Bespoke lighting fixtures and carefully sourced materials create an ambiance that elevates every flavor, turning a simple meal into an evocative, unforgettable event.',
    image: restaurantMain,
    gallery: [restaurantMain, restaurant1, restaurant2, restaurant3, restaurant4]
  },
  {
    title: 'Villa 1',
    description: 'A private residential villa blending modern elegance with lasting comfort.',
    fullDescription: 'A private residential haven that champions modern elegance alongside lasting comfort. This villa features expansive, flowing spaces that blur the boundaries between indoor tranquility and outdoor beauty. The quiet design language allows the inhabitants\' personal stories to take center stage.',
    image: villa1Main,
    gallery: [villa1Main, villa1_1, villa1_2]
  },
  {
    title: 'Villa 2',
    description: 'Sleek architectural lines forming a quiet environment for family life.',
    fullDescription: 'Sleek architectural lines define this family residence, forming a quiet and sophisticated environment for daily life. The design philosophy centers on stripping away the unnecessary, leaving behind pure spaces that breathe, inspire, and offer true solace to its residents.',
    image: villa2Main,
    gallery: [villa2Main, villa2_1, villa2_2]
  },
  {
    title: 'Villa 47',
    description: 'At the intersection of human aspiration and artistic exploration.',
    fullDescription: 'At the true intersection of human aspiration and artistic exploration. Villa 47 is an architectural marvel that pushes the boundaries of contemporary living. It features ambitious structural elements and a fluid interior layout, designed not just as a home, but as a living piece of art.',
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

  // Pan & pinch state for fullscreen zoom
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const panOffsetStartRef = useRef({ x: 0, y: 0 });
  const lastPinchDistRef = useRef<number | null>(null);

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

  // Projects array navigation handles looping mathematically now

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
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-visible px-4">
            {projects.map((project, idx) => {
              // Calculate circular offset mapping
              let offset = idx - currentIndex;
              const half = projects.length / 2;
              if (offset > half) offset -= projects.length;
              else if (offset < -half) offset += projects.length;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              // Derive animation properties
              let translateX = 0;
              let cardScale = 1;
              let opacity = 0;
              let zIndex = 0;

              if (isCenter) {
                translateX = 0;
                cardScale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (isLeft) {
                translateX = -108;
                cardScale = 0.75;
                opacity = 0.75;
                zIndex = 20;
              } else if (isRight) {
                translateX = 108;
                cardScale = 0.75;
                opacity = 0.75;
                zIndex = 20;
              } else if (offset < 0) {
                translateX = -180;
                cardScale = 0.5;
                opacity = 0;
                zIndex = 10;
              } else {
                translateX = 180;
                cardScale = 0.5;
                opacity = 0;
                zIndex = 10;
              }

              return (
                <div
                  key={idx}
                  className="absolute w-[80%] md:w-[45%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    transform: `translateX(calc(${translateX}% + ${dragOffset}px)) scale(${cardScale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    visibility: Math.abs(offset) <= 2 ? 'visible' : 'hidden', // Optimize paint
                    cursor: Math.abs(offset) === 1 ? 'pointer' : 'default'
                  }}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    if (isRight) nextSlide();
                  }}
                >
                  <div className={`relative aspect-[3/2] overflow-hidden rounded-sm group ${isCenter ? 'shadow-2xl' : ''}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    
                    {/* Dark gradient overlay - fade in only when center */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 pointer-events-none ${isCenter ? 'opacity-100' : 'opacity-0'}`} 
                    />

                    {/* Content overlay */}
                    <div 
                      className={`absolute bottom-6 left-6 right-6 transition-opacity duration-700 ${isCenter ? 'opacity-100' : 'opacity-0'}`}
                      style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
                    >
                      <h3
                        className="text-xl md:text-2xl text-white font-light mb-2"
                        style={{ fontFamily: "'Gambarino', serif" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-white/80 text-xs md:text-sm leading-relaxed mb-3 max-w-lg"
                        style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
                      >
                        {project.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (Math.abs(dragOffset) < 5) {
                            setSelectedProject(project);
                          }
                        }}
                        className="text-white text-xs tracking-widest uppercase underline underline-offset-4 hover:text-white/70 transition-colors pointer-events-auto"
                        style={{ fontFamily: "'Gambetta', serif" }}
                      >
                        Read More...
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop navigation arrows (positioned on sides) */}
          <div className="hidden md:block">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/30 text-white/70 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full backdrop-blur-sm bg-black/20"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/30 text-white/70 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full backdrop-blur-sm bg-black/20"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Mobile navigation arrows */}
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
        <div className="fixed inset-0 z-[100] bg-[#1a1c1d] flex flex-col pt-24 md:pt-32">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex-1 overflow-y-auto px-4 pb-20 scrollbar-hide">
            <div className="max-w-4xl mx-auto">
              {/* Project Title and Full Description Header */}
              <div className="mb-16">
                <h2
                  className="text-4xl md:text-5xl text-white font-light drop-shadow-lg mb-6"
                  style={{ fontFamily: "'Gambarino', serif" }}
                >
                  {selectedProject.title}
                </h2>
                <div className="w-16 h-[1px] bg-white/30 mb-6"></div>
                <p 
                  className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl text-justify"
                  style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
                >
                  {selectedProject.fullDescription}
                </p>
              </div>

              <div className="flex flex-col gap-12">
              {selectedProject.gallery.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`${selectedProject.title} ${idx + 1}`}
                    loading="lazy"
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
      </div>
    )}

      {/* Deep Zoom Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[110] bg-black flex items-center justify-center overflow-hidden"
          style={{ cursor: scale > 1 ? 'grab' : 'zoom-in', touchAction: 'none' }}
          onWheel={(e) => {
            e.preventDefault();
            setScale((prev) => {
              const next = prev - e.deltaY * 0.002;
              const clamped = Math.min(Math.max(next, 1), 5);
              if (clamped === 1) setPanOffset({ x: 0, y: 0 });
              return clamped;
            });
          }}
          onPointerDown={(e) => {
            if ((e.pointerType === 'mouse' || e.pointerType === 'pen') && scale > 1) {
              setIsPanning(true);
              panStartRef.current = { x: e.clientX, y: e.clientY };
              panOffsetStartRef.current = { ...panOffset };
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
            }
          }}
          onPointerMove={(e) => {
            if (isPanning && (e.pointerType === 'mouse' || e.pointerType === 'pen')) {
              setPanOffset({
                x: panOffsetStartRef.current.x + (e.clientX - panStartRef.current.x),
                y: panOffsetStartRef.current.y + (e.clientY - panStartRef.current.y),
              });
            }
          }}
          onPointerUp={() => setIsPanning(false)}
          onPointerLeave={() => setIsPanning(false)}
          onTouchStart={(e) => {
            if (e.touches.length === 2) {
              const dx = e.touches[0].clientX - e.touches[1].clientX;
              const dy = e.touches[0].clientY - e.touches[1].clientY;
              lastPinchDistRef.current = Math.hypot(dx, dy);
            } else if (e.touches.length === 1 && scale > 1) {
              setIsPanning(true);
              panStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
              panOffsetStartRef.current = { ...panOffset };
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length === 2 && lastPinchDistRef.current !== null) {
              e.preventDefault();
              const dx = e.touches[0].clientX - e.touches[1].clientX;
              const dy = e.touches[0].clientY - e.touches[1].clientY;
              const dist = Math.hypot(dx, dy);
              const delta = dist - lastPinchDistRef.current;
              lastPinchDistRef.current = dist;
              setScale((prev) => {
                const next = prev + delta * 0.008;
                const clamped = Math.min(Math.max(next, 1), 5);
                if (clamped === 1) setPanOffset({ x: 0, y: 0 });
                return clamped;
              });
            } else if (e.touches.length === 1 && isPanning) {
              setPanOffset({
                x: panOffsetStartRef.current.x + (e.touches[0].clientX - panStartRef.current.x),
                y: panOffsetStartRef.current.y + (e.touches[0].clientY - panStartRef.current.y),
              });
            }
          }}
          onTouchEnd={(e) => {
            if (e.touches.length < 2) lastPinchDistRef.current = null;
            if (e.touches.length === 0) setIsPanning(false);
          }}
          onClick={() => {
            if (!isPanning) {
              if (scale === 1) setScale(1.5);
              else if (scale < 2) setScale(2);
              else {
                setScale(1);
                setPanOffset({ x: 0, y: 0 });
              }
            }
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreenImage(null);
              setScale(1);
              setPanOffset({ x: 0, y: 0 });
            }}
            className="absolute top-6 right-6 z-50 p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          <img
            src={fullscreenImage}
            alt="Fullscreen zoom"
            className="w-full h-full object-contain transition-transform duration-200 select-none"
            style={{ transform: `scale(${scale}) translate(${panOffset.x / scale}px, ${panOffset.y / scale}px)` }}
            draggable={false}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest pointer-events-none">
            {scale <= 1 ? 'SCROLL OR PINCH TO ZOOM' : 'DRAG TO PAN • SCROLL TO ZOOM'}
          </div>
        </div>
      )}
    </>
  );
}

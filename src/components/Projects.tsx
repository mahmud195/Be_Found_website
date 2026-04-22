import { useEffect, useRef, useState, useCallback } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// Abdelkreim Apartment
import abdelkreimMain from '../assets/projects/abdelkreim/main.jpg';
import abdelkreim1 from '../assets/projects/abdelkreim/01.jpg';
import abdelkreim2 from '../assets/projects/abdelkreim/02.jpg';

// Hotel
import hotelMain from '../assets/projects/hotel/main.jpg';
import hotel1 from '../assets/projects/hotel/01.jpg';
import hotel2 from '../assets/projects/hotel/02.jpg';
import hotel3 from '../assets/projects/hotel/03.jpg';
import hotel4 from '../assets/projects/hotel/04.jpg';

// Offices
import officesMain from '../assets/projects/offices/main.jpg';
import offices1 from '../assets/projects/offices/01.jpg';
import offices2 from '../assets/projects/offices/02.jpg';

// Restaurant
import restaurantMain from '../assets/projects/restaurant/main.jpg';
import restaurant1 from '../assets/projects/restaurant/01.jpg';
import restaurant2 from '../assets/projects/restaurant/02.jpg';
import restaurant3 from '../assets/projects/restaurant/03.jpg';
import restaurant4 from '../assets/projects/restaurant/04.jpg';

// Villa1
import villa1Main from '../assets/projects/villa1/main.jpg';
import villa1_1 from '../assets/projects/villa1/01.jpg';
import villa1_2 from '../assets/projects/villa1/02.jpg';

// Villa2
import villa2Main from '../assets/projects/villa2/main.jpg';
import villa2_1 from '../assets/projects/villa2/01.jpg';
import villa2_2 from '../assets/projects/villa2/02.jpg';

// Villa3
import villa47Main from '../assets/projects/villa3/main.jpg';
import villa47_1 from '../assets/projects/villa3/01.jpg';
import villa47_2 from '../assets/projects/villa3/02.jpg';

// Villa4
import villa4Main from '../assets/projects/Villa 4/main.jpg';
import villa4_1 from '../assets/projects/Villa 4/01.jpg';
import villa4_2 from '../assets/projects/Villa 4/02.jpg';
import villa4_3 from '../assets/projects/Villa 4/03.jpg';
import villa4_4 from '../assets/projects/Villa 4/04.jpg';


const projects = [
  {
    title: 'Villa 1',
    location: 'Riyadh',
    description: 'A private residential villa blending modern elegance with lasting comfort.',
    fullDescription: 'A private residential haven that champions modern elegance alongside lasting comfort. This villa features expansive, flowing spaces that blur the boundaries between indoor tranquility and outdoor beauty. The quiet design language allows the inhabitants\' personal stories to take center stage.',
    image: villa1Main,
    gallery: [villa1Main, villa1_1, villa1_2]
  },
  {
    title: 'Villa 2',
    location: 'Riyadh',
    description: 'Sleek architectural lines forming a quiet environment for family life.',
    fullDescription: 'Sleek architectural lines define this family residence, forming a quiet and sophisticated environment for daily life. The design philosophy centers on stripping away the unnecessary, leaving behind pure spaces that breathe, inspire, and offer true solace to its residents.',
    image: villa2Main,
    gallery: [villa2Main, villa2_1, villa2_2]
  },
  {
    title: 'Villa 3',
    location: 'CFC - Egypt',
    description: 'A private residential building merging contemporary design with refined living spaces.',
    fullDescription: 'This private residential building exemplifies the harmonious integration of modern design principles with timeless architectural excellence. The space features ambitious structural elements and a thoughtfully planned interior layout, creating environments that celebrate both functional elegance and aesthetic sophistication.',
    image: villa47Main,
    gallery: [villa47Main, villa47_1, villa47_2]
  },
  {
    title: 'LUXURY RESIDENTIAL BUILDING 3',
    location: 'Riyadh',
    description: 'A contemporary villa where refined materiality meets serene spatial composition.',
    fullDescription: 'A contemporary residential villa that sets a new benchmark for refined living. Every space has been conceived with intention — from the expansive open-plan living areas to the intimate private retreats. Rich materiality and a restrained palette work in harmony to create an atmosphere of understated luxury, where light, form, and texture tell a quiet, compelling story.',
    image: villa4Main,
    gallery: [villa4Main, villa4_1, villa4_2, villa4_3, villa4_4]
  },
  {
    title: 'Apartment 1',
    location: 'Jeddah',
    description: 'A luxurious residential interior focused on warm tones and distinct atmospheres.',
    fullDescription: 'Located in the heart of the city, this luxurious apartment merges modern aesthetic sensibilities with timeless comforts. Warm tones wrap the interior, creating an inviting atmosphere that celebrates light and shadow. Every element has been meticulously placed to ensure functional elegance while offering a quiet sanctuary from the bustling world outside.',
    image: abdelkreimMain,
    gallery: [abdelkreimMain, abdelkreim1, abdelkreim2]
  },
  {
    title: 'Hotel 1',
    location: 'Jeddah',
    description: 'Creating harmonious sanctuaries where individuality is celebrated in hospitality.',
    fullDescription: 'A hospitality experience designed around the concept of a harmonious sanctuary. This hotel project seamlessly blends opulent luxury with intimate, quiet corners that invite guests to pause and breathe. The materials and textures are carefully curated to celebrate both individuality and a shared sense of arrival.',
    image: hotelMain,
    gallery: [hotelMain, hotel1, hotel2, hotel3, hotel4]
  },
  {
    title: "Eco Construction's Office",
    location: 'Riyadh',
    description: 'Workspace environments designed to inspire creativity and peace of mind.',
    fullDescription: 'Rethinking the modern workspace, this gallery-style office environment prioritizes creativity, collaboration, and peace of mind. By integrating elements of nature and utilizing a serene color palette, the design minimizes cognitive noise and encourages deep focus and profound inspiration.',
    image: officesMain,
    gallery: [officesMain, offices1, offices2]
  },
  {
    title: 'Restaurant 1',
    location: 'Jeddah',
    description: 'A culinary space crafted as a narrative canvas of flavors and design.',
    fullDescription: 'A culinary journey crafted as a rich narrative canvas. The interior of this restaurant balances dynamic energy with refined dining intimacy. Bespoke lighting fixtures and carefully sourced materials create an ambiance that elevates every flavor, turning a simple meal into an evocative, unforgettable event.',
    image: restaurantMain,
    gallery: [restaurantMain, restaurant1, restaurant2, restaurant3, restaurant4]
  }
];

// ─── Fullscreen Lightbox ──────────────────────────────────────────────────────

interface FullscreenLightboxProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

function FullscreenLightbox({ images, initialIndex, alt, onClose }: FullscreenLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOffset = useRef({ x: 0, y: 0 });

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [images.length]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => {
    setZoom(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom(prev => Math.min(prev + 0.25, 5));
    } else {
      setZoom(prev => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY };
    panOffset.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: panOffset.current.x + (e.clientX - panStart.current.x),
      y: panOffset.current.y + (e.clientY - panStart.current.y),
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === '+' || e.key === '=') handleZoomIn();
      else if (e.key === '-') handleZoomOut();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, handlePrev, handleNext]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onWheel={handleWheel}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[210] w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Zoom controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[210] flex items-center gap-3">
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ZoomOut size={16} />
        </button>
        <span className="text-white/70 text-sm min-w-[3rem] text-center" style={{ fontFamily: "'Gambetta', serif" }}>
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 5}
          className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ZoomIn size={16} />
        </button>
      </div>

      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors bg-black/40"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors bg-black/40"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <div
        className="w-full h-full flex items-center justify-center overflow-hidden"
        style={{ cursor: zoom > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          draggable={false}
          className="max-w-[90vw] max-h-[85vh] object-contain select-none pointer-events-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isPanning ? 'none' : 'transform 0.2s ease',
          }}
        />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest pointer-events-none" style={{ fontFamily: "'Gambetta', serif" }}>
        {zoom <= 1 ? 'SCROLL OR USE +/- TO ZOOM' : 'DRAG TO PAN · SCROLL TO ZOOM'}
      </div>
    </div>
  );
}

// ─── Swipe Gallery ────────────────────────────────────────────────────────────

interface SwipeGalleryProps {
  images: string[];
  alt: string;
}

function SwipeGallery({ images, alt }: SwipeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [skipTransition, setSkipTransition] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const startXRef = useRef(0);

  const SWIPE_THRESHOLD = 50;

  const triggerTransition = useCallback((fromIdx: number, toIdx: number) => {
    if (isAnimating) return;
    setDisplayIndex(fromIdx);
    setPendingIndex(toIdx);
    setIsAnimating(true);
    setIsDragging(false);
    setDragX(0);

    setTimeout(() => {
      setSkipTransition(true);
      setDisplayIndex(toIdx);
      setCurrentIndex(toIdx);
      setPendingIndex(null);
      setIsAnimating(false);
      requestAnimationFrame(() => setSkipTransition(false));
    }, 400);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating || images.length <= 1) return;
    triggerTransition(currentIndex, currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, isAnimating, triggerTransition]);

  const handleNext = useCallback(() => {
    if (isAnimating || images.length <= 1) return;
    triggerTransition(currentIndex, currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, isAnimating, triggerTransition]);

  const handleSwipeEnd = useCallback((deltaX: number) => {
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || isAnimating) {
      setDragX(0);
      setIsDragging(false);
      return;
    }
    const newIndex = deltaX < 0
      ? (currentIndex < images.length - 1 ? currentIndex + 1 : 0)
      : (currentIndex > 0 ? currentIndex - 1 : images.length - 1);
    triggerTransition(currentIndex, newIndex);
  }, [currentIndex, images.length, isAnimating, triggerTransition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating || images.length <= 1) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    setDragX(0);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragX(e.clientX - startXRef.current);
  };
  const handleMouseUp = () => { if (isDragging) handleSwipeEnd(dragX); };
  const handleMouseLeave = () => { if (isDragging) handleSwipeEnd(dragX); };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating || images.length <= 1) return;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    setDragX(0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragX(e.touches[0].clientX - startXRef.current);
  };
  const handleTouchEnd = () => { if (isDragging) handleSwipeEnd(dragX); };

  const dragOpacity = isDragging ? Math.max(0.3, 1 - Math.abs(dragX) / 300) : 1;
  const activeDot = pendingIndex !== null ? pendingIndex : displayIndex;

  if (images.length === 0) return null;

  return (
    <div className="relative select-none group">
      <div
        className="aspect-[4/3] overflow-hidden cursor-grab active:cursor-grabbing relative rounded-sm"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Incoming image (bottom layer) */}
        {pendingIndex !== null && (
          <img
            src={images[pendingIndex]}
            alt={`${alt} ${pendingIndex + 1}`}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
        )}

        {/* Current / outgoing image (top layer) */}
        <img
          src={images[displayIndex]}
          alt={`${alt} ${displayIndex + 1}`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 2,
            transform: isDragging
              ? `translateX(${dragX}px)`
              : isAnimating
                ? `translateX(${dragX < 0 || (dragX === 0 && pendingIndex !== null && pendingIndex > displayIndex) ? '-50%' : '50%'})`
                : 'translateX(0)',
            opacity: isDragging ? dragOpacity : isAnimating ? 0 : 1,
            transition: (isDragging || skipTransition) ? 'none' : 'transform 0.4s ease-out, opacity 0.4s ease-out',
          }}
        />

        {/* Left arrow */}
        {images.length > 1 && (
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* Right arrow */}
        {images.length > 1 && (
          <button
            onMouseDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); handleNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        )}

        {/* Fullscreen button */}
        <button
          onMouseDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); setIsFullscreen(true); }}
          className="absolute top-2 right-2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
        >
          <Maximize2 size={14} />
        </button>
      </div>

      {/* Pagination dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2.5 mt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (isAnimating || idx === currentIndex) return;
                triggerTransition(currentIndex, idx);
              }}
              className="relative w-4 h-4 flex items-center justify-center"
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === activeDot ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}`} />
              {idx === activeDot && (
                <span className="absolute inset-0 rounded-full border border-white/70 transition-opacity duration-300" />
              )}
            </button>
          ))}
        </div>
      )}

      {isFullscreen && (
        <FullscreenLightbox
          images={images}
          initialIndex={currentIndex}
          alt={alt}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
}

// ─── Main Projects Component ──────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [initialProjectIndex, setInitialProjectIndex] = useState(0);
  const projectAnchorRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    document.body.style.overflow = isProjectsModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isProjectsModalOpen]);

  // Scroll to clicked project after modal opens
  useEffect(() => {
    if (!isProjectsModalOpen) return;
    requestAnimationFrame(() => {
      projectAnchorRefs.current[initialProjectIndex]?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }, [isProjectsModalOpen, initialProjectIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered || isDragging || isProjectsModalOpen) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % projects.length);
    }, 5000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isHovered, isDragging, isProjectsModalOpen]);

  const openProjectsModal = (index: number) => {
    setInitialProjectIndex(index);
    setIsProjectsModalOpen(true);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(((index % projects.length) + projects.length) % projects.length);
  };

  const prevSlide = () => goToSlide(currentIndex - 1);
  const nextSlide = () => goToSlide(currentIndex + 1);

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
    if (dragOffset > 50) prevSlide();
    else if (dragOffset < -50) nextSlide();
    setDragOffset(0);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="min-h-screen bg-[#25282A] py-24 md:py-32 overflow-hidden select-none"
      >
        {/* Header */}
        <div
          className={`max-w-6xl mx-auto px-5 sm:px-8 mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light mb-4 md:mb-6"
            style={{ fontFamily: "'Gambarino', serif" }}
          >
            Projects
          </h2>
          <p
            className="text-[#E6F0F0] text-sm sm:text-base font-semibold mb-3 max-w-3xl"
            style={{ fontFamily: "'Gambetta', serif" }}
          >
            Explore a curated selection of environments crafted by BeFound.
          </p>
        </div>

        {/* Slider */}
        <div
          className={`relative transition-all duration-1000 delay-300 touch-pan-y ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-visible px-4">
            {projects.map((project, idx) => {
              let offset = idx - currentIndex;
              const half = projects.length / 2;
              if (offset > half) offset -= projects.length;
              else if (offset < -half) offset += projects.length;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              let translateX = 0;
              let cardScale = 1;
              let opacity = 0;
              let zIndex = 0;

              if (isCenter) { translateX = 0; cardScale = 1; opacity = 1; zIndex = 30; }
              else if (isLeft) { translateX = -108; cardScale = 0.75; opacity = 0.75; zIndex = 20; }
              else if (isRight) { translateX = 108; cardScale = 0.75; opacity = 0.75; zIndex = 20; }
              else if (offset < 0) { translateX = -180; cardScale = 0.5; opacity = 0; zIndex = 10; }
              else { translateX = 180; cardScale = 0.5; opacity = 0; zIndex = 10; }

              return (
                <div
                  key={idx}
                  className="absolute w-[80%] md:w-[45%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    transform: `translateX(calc(${translateX}% + ${dragOffset}px)) scale(${cardScale})`,
                    opacity,
                    zIndex,
                    visibility: Math.abs(offset) <= 2 ? 'visible' : 'hidden',
                    cursor: Math.abs(offset) <= 1 ? 'pointer' : 'default'
                  }}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    if (isRight) nextSlide();
                    if (isCenter && Math.abs(dragOffset) < 5) openProjectsModal(idx);
                  }}
                >
                  <div className={`relative aspect-[3/2] overflow-hidden rounded-sm group ${isCenter ? 'shadow-2xl' : ''}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 pointer-events-none ${isCenter ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <div
                      className={`absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 transition-opacity duration-700 ${isCenter ? 'opacity-100' : 'opacity-0'}`}
                      style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
                    >
                      <h3
                        className="text-lg sm:text-xl md:text-2xl text-white font-light mb-0 sm:mb-1"
                        style={{ fontFamily: "'Gambarino', serif" }}
                      >
                        {project.title}
                      </h3>
                      {project.location && (
                        <p
                          className="text-white/60 text-xs md:text-sm font-light mb-2 sm:mb-3"
                          style={{ fontFamily: "'Gambetta', serif", fontWeight: 200 }}
                        >
                          {project.location}
                        </p>
                      )}
                      <p
                        className="hidden sm:block text-white/80 text-xs md:text-sm leading-relaxed mb-3 max-w-lg"
                        style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
                      >
                        {project.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (Math.abs(dragOffset) < 5) openProjectsModal(idx);
                        }}
                        className="inline-flex items-center min-h-[44px] text-white text-xs tracking-widest uppercase underline underline-offset-4 hover:text-white/70 transition-colors pointer-events-auto py-2"
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

          {/* Desktop arrows */}
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

          {/* Mobile arrows */}
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
                className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All-Projects Modal */}
      {isProjectsModalOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1a1c1d] flex flex-col" style={{ paddingTop: '72px' }}>
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 h-[72px] bg-[#1a1c1d]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-end px-6 z-50">
            <button
              onClick={() => setIsProjectsModalOpen(false)}
              className="w-10 h-10 flex items-center justify-center border border-white/30 text-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-20" style={{ scrollbarWidth: 'none' }}>
            <div className="max-w-5xl mx-auto">
              {projects.map((project, pIdx) => (
                <div
                  key={pIdx}
                  ref={el => { projectAnchorRefs.current[pIdx] = el; }}
                  className="pt-10 md:pt-16"
                >
                  {pIdx > 0 && (
                    <div className="w-full flex items-center gap-4 mb-10 md:mb-16">
                      <div className="flex-1 h-px bg-white/10" />
                      <div className="w-1 h-1 rounded-full bg-white/40" />
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                  )}

                  {/* Card: image left, text right */}
                  <div
                    className="rounded-sm overflow-visible mb-10 md:mb-16"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(16px)',
                      padding: '2rem 2rem 2.5rem',
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                      {/* Swipeable image gallery */}
                      <div className="md:w-[48%] shrink-0">
                        <SwipeGallery images={project.gallery} alt={project.title} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 flex flex-col justify-center">
                        <h2
                          className="text-3xl md:text-4xl lg:text-5xl text-white font-light mb-1 md:mb-2 leading-tight"
                          style={{ fontFamily: "'Gambarino', serif" }}
                        >
                          {project.title}
                        </h2>
                        {project.location && (
                          <p
                            className="text-white/50 text-sm md:text-base mb-4 md:mb-6"
                            style={{ fontFamily: "'Gambetta', serif", fontWeight: 200 }}
                          >
                            {project.location}
                          </p>
                        )}
                        <div className="w-12 h-px bg-white/25 mb-4 md:mb-6" />
                        <p
                          className="text-white/75 text-sm md:text-base leading-relaxed text-justify"
                          style={{ fontFamily: "'Gambetta', serif", fontWeight: 300 }}
                        >
                          {project.fullDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

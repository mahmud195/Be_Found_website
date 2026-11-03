(function () {
  'use strict';

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const classSwap = (element, addClasses, removeClasses) => {
    if (!element) return;
    removeClasses.forEach((name) => element.classList.remove(name));
    addClasses.forEach((name) => element.classList.add(name));
  };

  const iconSvg = (name, className) => {
    const attrs = `xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="${className}"`;
    const icons = {
      x: `<svg ${attrs}><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`,
      chevronLeft: `<svg ${attrs}><path d="m15 18-6-6 6-6"></path></svg>`,
      chevronRight: `<svg ${attrs}><path d="m9 18 6-6-6-6"></path></svg>`,
      zoomIn: `<svg ${attrs}><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line><line x1="11" x2="11" y1="8" y2="14"></line><line x1="8" x2="14" y1="11" y2="11"></line></svg>`,
      zoomOut: `<svg ${attrs}><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line><line x1="8" x2="14" y1="11" y2="11"></line></svg>`,
    };
    return icons[name] || '';
  };

  const revealElement = (element) => {
    element.classList.remove(
      'opacity-0',
      'translate-y-16',
      'translate-y-12',
      'translate-y-10',
      'translate-y-8',
      'translate-y-4',
      'scale-[1.03]'
    );
    element.classList.add('opacity-100');

    if (
      element.classList.contains('translate-y-16') ||
      element.classList.contains('translate-y-12') ||
      element.classList.contains('translate-y-10') ||
      element.classList.contains('translate-y-8') ||
      element.classList.contains('translate-y-4')
    ) {
      element.classList.add('translate-y-0');
    } else {
      element.classList.add('translate-y-0');
    }

    if (element.hasAttribute('data-reveal-scale')) {
      element.classList.add('scale-100');
    }
  };

  const initReveals = () => {
    qsa('[data-reveal-scope]').forEach((scope) => {
      const threshold = parseFloat(scope.getAttribute('data-reveal-threshold') || '0.1');
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          qsa('[data-reveal]', scope).forEach(revealElement);
          observer.disconnect();
        },
        { threshold }
      );
      observer.observe(scope);
    });

    const footer = qs('[data-footer-reveal]');
    if (footer) {
      const footerObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          revealElement(footer);
          footerObserver.disconnect();
        },
        { threshold: 0.1 }
      );
      footerObserver.observe(footer);
    }
  };

  const initNavbar = () => {
    const nav = qs('[data-befound-nav]');
    const mobileMenu = qs('[data-mobile-menu]');
    const desktopLinks = qsa('[data-nav-link]');
    const mobileLinks = qsa('[data-mobile-nav-link]');
    const contactLink = qs('[data-nav-contact]');
    let activeSection = 'home';

    const desktopActive = ['text-[#E6F0F0]', 'scale-125', 'font-semibold'];
    const desktopInactive = ['text-[#E6F0F0]/60', 'font-light', 'hover:text-[#E6F0F0]'];
    const mobileActive = ['text-[#E6F0F0]', 'font-semibold'];
    const mobileInactive = ['text-[#E6F0F0]/70', 'font-light', 'hover:text-[#E6F0F0]'];
    const contactActive = ['bg-[#E6F0F0]', 'border-[#E6F0F0]', 'text-[#25282A]', 'scale-110'];
    const contactInactive = ['border-[#E6F0F0]/10', 'text-[#E6F0F0]', 'font-light', 'hover:bg-[#E6F0F0]', 'hover:text-[#25282A]'];

    const setScrolled = () => {
      if (!nav) return;
      if (window.scrollY > 50) {
        classSwap(nav, ['bg-[#25282A]/95', 'backdrop-blur-md', 'py-4'], ['bg-transparent', 'py-6']);
      } else {
        classSwap(nav, ['bg-transparent', 'py-6'], ['bg-[#25282A]/95', 'backdrop-blur-md', 'py-4']);
      }

      if (window.scrollY < window.innerHeight * 0.4) {
        setActiveSection('home');
      }
    };

    const setActiveSection = (section) => {
      activeSection = section;

      desktopLinks.forEach((link) => {
        const isActive = link.getAttribute('data-section') === activeSection;
        classSwap(link, isActive ? desktopActive : desktopInactive, isActive ? desktopInactive : desktopActive);
        const underline = qs('[data-nav-underline]', link);
        classSwap(
          underline,
          isActive ? ['w-full'] : ['w-0', 'group-hover:w-full'],
          isActive ? ['w-0', 'group-hover:w-full'] : ['w-full']
        );
      });

      mobileLinks.forEach((link) => {
        const isActive = link.getAttribute('data-section') === activeSection;
        classSwap(link, isActive ? mobileActive : mobileInactive, isActive ? mobileInactive : mobileActive);
      });

      if (contactLink) {
        const isActive = activeSection === 'contact';
        classSwap(contactLink, isActive ? contactActive : contactInactive, isActive ? contactInactive : contactActive);
      }
    };

    qsa('[data-mobile-menu-open]').forEach((button) => {
      button.addEventListener('click', () => {
        classSwap(mobileMenu, ['opacity-100', 'pointer-events-auto'], ['opacity-0', 'pointer-events-none']);
      });
    });

    qsa('[data-mobile-menu-close], [data-mobile-nav-link]').forEach((element) => {
      element.addEventListener('click', () => {
        classSwap(mobileMenu, ['opacity-0', 'pointer-events-none'], ['opacity-100', 'pointer-events-auto']);
      });
    });

    window.addEventListener('scroll', setScrolled, { passive: true });
    setScrolled();
    setActiveSection(activeSection);

    ['home', 'about', 'services', 'projects', 'partners', 'contact'].forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section);
          }
        },
        { threshold: 0, rootMargin: '0px 0px -55% 0px' }
      );
      observer.observe(element);
    });
  };

  const initAboutToggle = () => {
    const button = qs('[data-about-toggle]');
    if (!button) return;

    let expanded = false;
    const extras = qsa('[data-about-extra-left]');
    const rightColumn = qs('[data-about-right]');
    const readMore = button.getAttribute('data-read-more') || 'Read More';
    const readLess = button.getAttribute('data-read-less') || 'Read Less';

    button.addEventListener('click', () => {
      expanded = !expanded;
      extras.forEach((paragraph) => {
        classSwap(paragraph, expanded ? ['block'] : ['hidden'], expanded ? ['hidden'] : ['block']);
      });
      classSwap(rightColumn, expanded ? ['flex'] : ['hidden'], expanded ? ['hidden'] : ['flex']);
      button.textContent = expanded ? readLess : readMore;
    });
  };

  const initServices = () => {
    const track = qs('[data-services-track]');
    if (!track) return;

    let paused = false;
    const repeatCount = parseInt(track.getAttribute('data-repeat-count') || '3', 10);
    const cardGap = parseInt(track.getAttribute('data-card-gap') || '16', 10);

    const getCardStep = () => {
      const firstCard = qs('.service-slide', track);
      return firstCard ? firstCard.offsetWidth + cardGap : 400;
    };

    const setMiddle = () => {
      const oneSetWidth = track.scrollWidth / repeatCount;
      track.scrollLeft = oneSetWidth;
    };

    const keepInLoop = () => {
      const oneSetWidth = track.scrollWidth / repeatCount;
      if (track.scrollLeft <= 0) {
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = oneSetWidth;
        track.style.scrollBehavior = 'smooth';
      } else if (track.scrollLeft >= oneSetWidth * 2) {
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = oneSetWidth;
        track.style.scrollBehavior = 'smooth';
      }
    };

    requestAnimationFrame(setMiddle);
    window.addEventListener('load', setMiddle, { once: true });
    track.addEventListener('scroll', keepInLoop, { passive: true });
    track.addEventListener('mouseenter', () => {
      paused = true;
    });
    track.addEventListener('mouseleave', () => {
      paused = false;
    });

    qs('[data-services-prev]')?.addEventListener('click', () => {
      track.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
    });

    qs('[data-services-next]')?.addEventListener('click', () => {
      track.scrollBy({ left: getCardStep(), behavior: 'smooth' });
    });

    window.setInterval(() => {
      if (paused || document.hidden) return;
      track.scrollBy({ left: getCardStep(), behavior: 'smooth' });
    }, 6000);
  };

  const initProjects = () => {
    const slider = qs('[data-projects-slider]');
    const modal = qs('[data-projects-modal]');
    if (!slider) return;

    const cards = qsa('[data-project-card]', slider);
    const dots = qsa('[data-project-dot]', slider);
    const count = cards.length;
    let currentIndex = 0;
    let dragStartX = 0;
    let dragOffset = 0;
    let lastDragDistance = 0;
    let isDragging = false;
    let isHovered = false;
    let isModalOpen = false;

    const offsetFor = (index) => {
      let offset = index - currentIndex;
      const half = count / 2;
      if (offset > half) offset -= count;
      else if (offset < -half) offset += count;
      return offset;
    };

    const setDot = (dot, active) => {
      classSwap(dot, active ? ['bg-white', 'w-6'] : ['bg-white/30', 'w-2'], active ? ['bg-white/30', 'w-2'] : ['bg-white', 'w-6']);
    };

    const updateCards = () => {
      cards.forEach((card, index) => {
        const offset = offsetFor(index);
        const isCenter = offset === 0;
        const isLeft = offset === -1;
        const isRight = offset === 1;
        let translateX = 180;
        let scale = 0.5;
        let opacity = 0;
        let zIndex = 10;

        if (isCenter) {
          translateX = 0;
          scale = 1;
          opacity = 1;
          zIndex = 30;
        } else if (isLeft) {
          translateX = -108;
          scale = 0.75;
          opacity = 0.75;
          zIndex = 20;
        } else if (isRight) {
          translateX = 108;
          scale = 0.75;
          opacity = 0.75;
          zIndex = 20;
        } else if (offset < 0) {
          translateX = -180;
        }

        card.style.transform = `translateX(calc(${translateX}% + ${dragOffset}px)) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(zIndex);
        card.style.visibility = Math.abs(offset) <= 2 ? 'visible' : 'hidden';
        card.style.cursor = Math.abs(offset) <= 1 ? 'pointer' : 'default';

        qs('[data-project-card-frame]', card)?.classList.toggle('shadow-2xl', isCenter);
        const overlay = qs('[data-project-overlay]', card);
        const content = qs('[data-project-content]', card);
        classSwap(overlay, isCenter ? ['opacity-100'] : ['opacity-0'], isCenter ? ['opacity-0'] : ['opacity-100']);
        classSwap(content, isCenter ? ['opacity-100'] : ['opacity-0'], isCenter ? ['opacity-0'] : ['opacity-100']);
        if (content) {
          content.style.pointerEvents = isCenter ? 'auto' : 'none';
        }
      });

      dots.forEach((dot, index) => setDot(dot, index === currentIndex));
    };

    const goToSlide = (index) => {
      currentIndex = ((index % count) + count) % count;
      updateCards();
    };

    const openModal = (index) => {
      if (!modal) return;
      isModalOpen = true;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        const target = qs(`[data-project-modal-item][data-index="${index}"]`, modal);
        target?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    };

    const closeModal = () => {
      if (!modal) return;
      isModalOpen = false;
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    };

    qsa('[data-projects-prev]', slider).forEach((button) => button.addEventListener('click', () => goToSlide(currentIndex - 1)));
    qsa('[data-projects-next]', slider).forEach((button) => button.addEventListener('click', () => goToSlide(currentIndex + 1)));
    qsa('[data-projects-close]').forEach((button) => button.addEventListener('click', closeModal));

    dots.forEach((dot) => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.getAttribute('data-index') || '0', 10)));
    });

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        if (lastDragDistance >= 5) return;
        const index = parseInt(card.getAttribute('data-index') || '0', 10);
        const offset = offsetFor(index);
        if (offset === -1) goToSlide(currentIndex - 1);
        if (offset === 1) goToSlide(currentIndex + 1);
        if (offset === 0) openModal(index);
      });
    });

    qsa('[data-project-open]', slider).forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        if (lastDragDistance >= 5) return;
        openModal(parseInt(button.getAttribute('data-index') || '0', 10));
      });
    });

    slider.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    slider.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    slider.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      isDragging = true;
      dragStartX = event.clientX;
      dragOffset = 0;
      lastDragDistance = 0;
    });

    slider.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      dragOffset = event.clientX - dragStartX;
      updateCards();
    });

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      lastDragDistance = Math.abs(dragOffset);
      if (dragOffset > 50) goToSlide(currentIndex - 1);
      else if (dragOffset < -50) goToSlide(currentIndex + 1);
      dragOffset = 0;
      updateCards();
      window.setTimeout(() => {
        lastDragDistance = 0;
      }, 80);
    };

    slider.addEventListener('pointerup', endDrag);
    slider.addEventListener('pointerleave', endDrag);
    slider.addEventListener('pointercancel', endDrag);

    window.setInterval(() => {
      if (isHovered || isDragging || isModalOpen || document.hidden) return;
      goToSlide(currentIndex + 1);
    }, 5000);

    updateCards();
  };

  const updateSwipeDots = (dots, activeIndex) => {
    dots.forEach((dot, index) => {
      const inner = qs('[data-swipe-dot-inner]', dot);
      const active = qs('[data-swipe-dot-active]', dot);
      classSwap(inner, index === activeIndex ? ['bg-white'] : ['bg-white/30', 'hover:bg-white/60'], index === activeIndex ? ['bg-white/30', 'hover:bg-white/60'] : ['bg-white']);
      classSwap(active, index === activeIndex ? [] : ['hidden'], index === activeIndex ? ['hidden'] : []);
    });
  };

  const initSwipeGallery = (gallery) => {
    const imagesScript = qs('[data-gallery-images]', gallery);
    const stage = qs('[data-swipe-stage]', gallery);
    const currentImage = qs('[data-swipe-current]', gallery);
    const pendingImage = qs('[data-swipe-pending]', gallery);
    const dots = qsa('[data-swipe-dot]', gallery);
    const alt = gallery.getAttribute('data-gallery-alt') || '';
    if (!imagesScript || !stage || !currentImage || !pendingImage) return;

    let images = [];
    try {
      images = JSON.parse(imagesScript.textContent || '[]');
    } catch (error) {
      images = [];
    }
    if (!images.length) return;

    let currentIndex = 0;
    let displayIndex = 0;
    let isDragging = false;
    let isAnimating = false;
    let dragX = 0;
    let startX = 0;

    const setCurrentImage = (index) => {
      currentImage.src = images[index];
      currentImage.alt = `${alt} ${index + 1}`;
      currentImage.style.transform = 'translateX(0)';
      currentImage.style.opacity = '1';
      currentImage.style.transition = 'none';
      pendingImage.classList.add('hidden');
      displayIndex = index;
      currentIndex = index;
      updateSwipeDots(dots, index);
      requestAnimationFrame(() => {
        currentImage.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
      });
    };

    const triggerTransition = (toIndex, direction) => {
      if (isAnimating || toIndex === currentIndex || images.length <= 1) return;
      isAnimating = true;
      pendingImage.src = images[toIndex];
      pendingImage.alt = `${alt} ${toIndex + 1}`;
      pendingImage.classList.remove('hidden');
      pendingImage.style.zIndex = '1';
      currentImage.style.zIndex = '2';
      currentImage.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
      currentImage.style.transform = direction === 'next' ? 'translateX(-50%)' : 'translateX(50%)';
      currentImage.style.opacity = '0';
      updateSwipeDots(dots, toIndex);
      window.setTimeout(() => {
        setCurrentImage(toIndex);
        isAnimating = false;
      }, 400);
    };

    const prev = () => triggerTransition(currentIndex > 0 ? currentIndex - 1 : images.length - 1, 'prev');
    const next = () => triggerTransition(currentIndex < images.length - 1 ? currentIndex + 1 : 0, 'next');

    const finishDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      if (Math.abs(dragX) < 50 || isAnimating) {
        currentImage.style.transform = 'translateX(0)';
        currentImage.style.opacity = '1';
        dragX = 0;
        return;
      }
      if (dragX < 0) next();
      else prev();
      dragX = 0;
    };

    stage.addEventListener('mousedown', (event) => {
      if (isAnimating || images.length <= 1) return;
      isDragging = true;
      startX = event.clientX;
      dragX = 0;
      currentImage.style.transition = 'none';
    });
    stage.addEventListener('mousemove', (event) => {
      if (!isDragging) return;
      dragX = event.clientX - startX;
      currentImage.style.transform = `translateX(${dragX}px)`;
      currentImage.style.opacity = String(Math.max(0.3, 1 - Math.abs(dragX) / 300));
    });
    stage.addEventListener('mouseup', finishDrag);
    stage.addEventListener('mouseleave', finishDrag);
    stage.addEventListener('touchstart', (event) => {
      if (isAnimating || images.length <= 1) return;
      isDragging = true;
      startX = event.touches[0].clientX;
      dragX = 0;
      currentImage.style.transition = 'none';
    }, { passive: true });
    stage.addEventListener('touchmove', (event) => {
      if (!isDragging) return;
      dragX = event.touches[0].clientX - startX;
      currentImage.style.transform = `translateX(${dragX}px)`;
      currentImage.style.opacity = String(Math.max(0.3, 1 - Math.abs(dragX) / 300));
    }, { passive: true });
    stage.addEventListener('touchend', finishDrag);

    qs('[data-swipe-prev]', gallery)?.addEventListener('click', (event) => {
      event.stopPropagation();
      prev();
    });
    qs('[data-swipe-next]', gallery)?.addEventListener('click', (event) => {
      event.stopPropagation();
      next();
    });
    qs('[data-swipe-fullscreen]', gallery)?.addEventListener('click', (event) => {
      event.stopPropagation();
      openLightbox(images, currentIndex, alt);
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const toIndex = parseInt(dot.getAttribute('data-index') || '0', 10);
        triggerTransition(toIndex, toIndex > displayIndex ? 'next' : 'prev');
      });
    });

    setCurrentImage(0);
  };

  const openLightbox = (images, initialIndex, alt) => {
    let currentIndex = initialIndex;
    let zoom = 1;
    let pan = { x: 0, y: 0 };
    let isPanning = false;
    let panStart = { x: 0, y: 0 };
    let panOffset = { x: 0, y: 0 };

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[200] bg-black/95 flex items-center justify-center';
    overlay.innerHTML = `
      <button type="button" class="absolute top-4 right-4 z-[210] w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors" data-lightbox-close>${iconSvg('x', 'w-5 h-5')}</button>
      <div class="absolute top-4 left-1/2 -translate-x-1/2 z-[210] flex items-center gap-3">
        <button type="button" class="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none" data-lightbox-zoom-out>${iconSvg('zoomOut', 'w-4 h-4')}</button>
        <span class="text-white/70 text-sm min-w-[3rem] text-center" style="font-family: 'Gambetta', serif" data-lightbox-zoom-label>100%</span>
        <button type="button" class="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none" data-lightbox-zoom-in>${iconSvg('zoomIn', 'w-4 h-4')}</button>
      </div>
      <button type="button" class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors bg-black/40 ${images.length > 1 ? '' : 'hidden'}" data-lightbox-prev>${iconSvg('chevronLeft', 'w-5 h-5')}</button>
      <button type="button" class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors bg-black/40 ${images.length > 1 ? '' : 'hidden'}" data-lightbox-next>${iconSvg('chevronRight', 'w-5 h-5')}</button>
      <div class="w-full h-full flex items-center justify-center overflow-hidden" data-lightbox-pan>
        <img draggable="false" class="max-w-[90vw] max-h-[85vh] object-contain select-none pointer-events-none" data-lightbox-image>
      </div>
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest pointer-events-none" style="font-family: 'Gambetta', serif" data-lightbox-help>SCROLL OR USE +/- TO ZOOM</div>
    `;

    document.body.appendChild(overlay);
    const image = qs('[data-lightbox-image]', overlay);
    const zoomLabel = qs('[data-lightbox-zoom-label]', overlay);
    const zoomOutButton = qs('[data-lightbox-zoom-out]', overlay);
    const zoomInButton = qs('[data-lightbox-zoom-in]', overlay);
    const panSurface = qs('[data-lightbox-pan]', overlay);
    const help = qs('[data-lightbox-help]', overlay);

    const update = () => {
      image.src = images[currentIndex];
      image.alt = `${alt} ${currentIndex + 1}`;
      image.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
      image.style.transition = isPanning ? 'none' : 'transform 0.2s ease';
      zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
      zoomOutButton.disabled = zoom <= 1;
      zoomInButton.disabled = zoom >= 5;
      panSurface.style.cursor = zoom > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default';
      help.textContent = zoom <= 1 ? 'SCROLL OR USE +/- TO ZOOM' : 'DRAG TO PAN \u00b7 SCROLL TO ZOOM';
    };

    const goPrev = () => {
      currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      zoom = 1;
      pan = { x: 0, y: 0 };
      update();
    };

    const goNext = () => {
      currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      zoom = 1;
      pan = { x: 0, y: 0 };
      update();
    };

    const zoomIn = () => {
      zoom = Math.min(zoom + 0.5, 5);
      update();
    };

    const zoomOut = () => {
      zoom = Math.max(zoom - 0.5, 1);
      if (zoom === 1) pan = { x: 0, y: 0 };
      update();
    };

    const close = () => {
      window.removeEventListener('keydown', onKey);
      overlay.remove();
    };

    const onKey = (event) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowLeft') goPrev();
      else if (event.key === 'ArrowRight') goNext();
      else if (event.key === '+' || event.key === '=') zoomIn();
      else if (event.key === '-') zoomOut();
    };

    overlay.addEventListener('wheel', (event) => {
      event.preventDefault();
      if (event.deltaY < 0) {
        zoom = Math.min(zoom + 0.25, 5);
      } else {
        zoom = Math.max(zoom - 0.25, 1);
        if (zoom === 1) pan = { x: 0, y: 0 };
      }
      update();
    }, { passive: false });

    panSurface.addEventListener('mousedown', (event) => {
      if (zoom <= 1) return;
      event.preventDefault();
      isPanning = true;
      panStart = { x: event.clientX, y: event.clientY };
      panOffset = { ...pan };
      update();
    });

    panSurface.addEventListener('mousemove', (event) => {
      if (!isPanning) return;
      pan = {
        x: panOffset.x + (event.clientX - panStart.x),
        y: panOffset.y + (event.clientY - panStart.y),
      };
      update();
    });

    const stopPan = () => {
      isPanning = false;
      update();
    };
    panSurface.addEventListener('mouseup', stopPan);
    panSurface.addEventListener('mouseleave', stopPan);

    qs('[data-lightbox-close]', overlay).addEventListener('click', close);
    qs('[data-lightbox-prev]', overlay).addEventListener('click', goPrev);
    qs('[data-lightbox-next]', overlay).addEventListener('click', goNext);
    zoomInButton.addEventListener('click', zoomIn);
    zoomOutButton.addEventListener('click', zoomOut);
    window.addEventListener('keydown', onKey);
    update();
  };

  const initLanguageReadiness = () => {
    const config = window.BeFoundTheme && window.BeFoundTheme.language;
    if (!config || !config.enable_switcher) return;

    if (config.default === 'ar') {
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initLanguageReadiness();
    initNavbar();
    initReveals();
    initAboutToggle();
    initServices();
    initProjects();
    qsa('[data-swipe-gallery]').forEach(initSwipeGallery);
  });
})();

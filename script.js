// document.querySelector('button[aria-label="Toggle menu"]').addEventListener('click', function() {
//     const mobileMenu = document.getElementById("menu");
//     mobileMenu.classList.toggle('hidden');
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('#home');
    const slides = document.querySelectorAll('#home .carousel-slide');
    const controls = document.querySelectorAll('.carousel-control');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let isTransitioning = false;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Initialize slider
    function initSlider() {
        // Ensure first slide is visible on load
        slides[0].classList.add('opacity-100');
        slides[0].classList.remove('opacity-0');
        
        // Start auto-sliding
        startAutoSlide();
        
        // Pause on hover
        slider.addEventListener('mouseenter', pauseAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Show specific slide
    function showSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        
        isTransitioning = true;
        
        // Wrap around if at ends
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Hide current slide
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');
        
        // Show new slide
        slides[index].classList.remove('opacity-0');
        slides[index].classList.add('opacity-100');
        
        // Update controls
        updateControls(index);
        
        currentSlide = index;
        
        // Reset transitioning flag after animation
        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    }
    
    // Update control indicators
    function updateControls(index) {
        controls.forEach((control, i) => {
            control.classList.toggle('opacity-50', i !== index);
            control.classList.toggle('opacity-100', i === index);
        });
    }
    
    // Go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Go to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Start auto-sliding
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Pause auto-sliding
    function pauseAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Initialize controls
    controls.forEach((control, index) => {
        control.addEventListener('click', () => {
            pauseAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Add navigation arrows
    prevBtn.addEventListener('click', () => {
        pauseAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        pauseAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Initialize slider
    initSlider();
});

  document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    this.innerHTML = menu.classList.contains('hidden') ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
  });

document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.syllabus-tab');
  const contents = document.querySelectorAll('.syllabus-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active classes from all tabs
      tabs.forEach(t => {
        t.classList.remove('active', 'text-primary', 'border-b-2', 'border-accent');
        t.classList.add('text-gray-500');
      });
      
      // Add active classes to clicked tab
      tab.classList.add('active', 'text-primary', 'border-b-2', 'border-accent');
      tab.classList.remove('text-gray-500');
      
      // Hide all content
      contents.forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
      });
      
      // Show selected content
      const contentId = tab.getAttribute('data-tab') + '-content';
      const activeContent = document.getElementById(contentId);
      if (activeContent) {
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
      }
    });
  });
});
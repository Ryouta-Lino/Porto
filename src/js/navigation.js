// Enhanced navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('header');

  // Toggle mobile menu with animation
  const toggleMenu = () => {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
    
    // Add slide animation
    if (!navMenu.classList.contains('hidden')) {
      navMenu.classList.add('animate-slide-in');
    } else {
      navMenu.classList.remove('animate-slide-in');
    }
  };

  hamburger?.addEventListener('click', toggleMenu);

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
      hamburger?.classList.remove('hamburger-active');
      navMenu?.classList.add('hidden');
    }
  });

  // Smooth scroll with active state
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu
        hamburger?.classList.remove('hamburger-active');
        navMenu?.classList.add('hidden');

        // Smooth scroll
        const headerHeight = header?.offsetHeight || 0;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active section detection on scroll
  const sections = document.querySelectorAll('section[id]');
  
  const activateNavLink = () => {
    const scrollY = window.scrollY;
    const headerHeight = header?.offsetHeight || 0;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  // Throttle scroll event
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(activateNavLink);
  });

  // Initial active state
  activateNavLink();
});
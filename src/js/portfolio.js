// Enhanced portfolio functionality
document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.getElementById('portfolioProjects');
  
  if (!projectsContainer) return;

  // Intersection Observer for fade-in animation
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        projectObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all project cards
  const projectCards = projectsContainer.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.style.opacity = '0';
    projectObserver.observe(card);
  });

  // Image lazy loading
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, observerOptions);

  lazyImages.forEach(img => imageObserver.observe(img));

  // Filter projects functionality (if needed)
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});
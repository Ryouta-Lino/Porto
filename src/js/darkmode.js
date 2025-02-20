// Enhanced dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
  const darkToggle = document.getElementById('darkToggle');
  const html = document.documentElement;

  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Get saved preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark.matches);

  // Initial theme setup
  if (isDark) {
    html.classList.add('dark');
  }
  updateDarkToggleIcon(isDark);

  // Toggle theme with transition
  const toggleTheme = () => {
    // Add transition class
    html.classList.add('transition-colors', 'duration-300');
    
    // Toggle dark class
    html.classList.toggle('dark');
    
    // Update localStorage
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update icon
    updateDarkToggleIcon(isDark);
    
    // Remove transition class after animation
    setTimeout(() => {
      html.classList.remove('transition-colors', 'duration-300');
    }, 300);
  };

  // Update icon with animation
  function updateDarkToggleIcon(isDark) {
    const icon = darkToggle?.querySelector('i');
    if (!icon) return;

    // Add fade out
    icon.style.opacity = '0';
    
    setTimeout(() => {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      // Fade in
      icon.style.opacity = '1';
    }, 150);
  }

  // Event listeners
  darkToggle?.addEventListener('click', toggleTheme);
  
  // Listen for system theme changes
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      updateDarkToggleIcon(e.matches);
    }
  });
});
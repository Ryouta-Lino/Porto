// Enhanced contact form functionality
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const inputs = contactForm.querySelectorAll('input, textarea');

  // Form validation
  const validateForm = () => {
    let isValid = true;
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
      }
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
        }
      }
    });
    return isValid;
  };

  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      submitButton.disabled = !validateForm();
    });
  });

  // Handle form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Disable form during submission
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';

    try {
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      showNotification('Message sent successfully!', 'success');
      contactForm.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification('Error sending message. Please try again.', 'error');
    } finally {
      // Re-enable form
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });

  // Notification system
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
});
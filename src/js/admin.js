// Admin functionality
const adminModal = document.getElementById('adminModal');
const adminLoginForm = document.getElementById('adminLoginForm');
const closeModal = document.getElementById('closeModal');

// Show/hide admin modal
function toggleAdminModal() {
  adminModal.classList.toggle('hidden');
  adminModal.classList.toggle('flex');
}

// Close modal when clicking outside
adminModal.addEventListener('click', (e) => {
  if (e.target === adminModal) {
    toggleAdminModal();
  }
});

closeModal.addEventListener('click', toggleAdminModal);

// Handle admin login
adminLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;
  
  // Here you would typically validate credentials against your backend
  console.log('Login attempt:', { username, password });
  
  // For demo purposes
  alert('Login functionality to be implemented');
});
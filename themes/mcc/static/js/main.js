// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    let isMenuOpen = false;

    // Function to toggle mobile menu
    const toggleMobileMenu = () => {
      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        // Show menu
        mobileMenu.classList.add('show');
        mobileMenuButton.setAttribute('aria-expanded', 'true');
      } else {
        // Hide menu
        mobileMenu.classList.remove('show');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      }
    };

    // Event listeners
    mobileMenuButton?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        toggleMobileMenu();
      }
    });

    // Close menu when clicking a navigation link
    const navLinks = mobileMenu?.querySelectorAll('a[href^="/"]');
    navLinks?.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) {
          setTimeout(() => toggleMobileMenu(), 100);
        }
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        toggleMobileMenu();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        toggleMobileMenu();
      }
    });
});
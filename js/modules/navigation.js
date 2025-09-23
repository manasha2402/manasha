// modules/navigation.js - Handles navigation interactions
export default class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.isScrolling = false;
    this.scrollTimeout = null;
  }

  init() {
    this.handleScroll();
    this.handleNavClick();
    this.updateActiveLink();
    this.addScrollListener();
  }

  handleScroll() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add/remove navbar background on scroll
      if (currentScroll > 50) {
        this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        this.navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
      }

      // Hide/show navbar on scroll
      if (currentScroll > lastScroll && currentScroll > 100) {
        this.navbar.style.transform = 'translateY(-100%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });
  }

  handleNavClick() {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        // Only prevent default for hash links
        if (link.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
            const offset = 80; // Navbar height
            const targetPosition = targetSection.offsetTop - offset;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });

            // Update active state
            this.setActiveLink(link);
          }
        }
      });
    });
  }

  updateActiveLink() {
    window.addEventListener('scroll', () => {
      // Debounce scroll events
      this.isScrolling = true;
      clearTimeout(this.scrollTimeout);

      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
        this.highlightActiveSection();
      }, 100);
    });
  }

  highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const correspondingLink = document.querySelector(
          `.nav-link[href="#${section.id}"]`
        );
        if (correspondingLink) {
          this.setActiveLink(correspondingLink);
        }
      }
    });
  }

  setActiveLink(activeLink) {
    this.navLinks.forEach((link) => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  addScrollListener() {
    // Add smooth transition to navbar
    this.navbar.style.transition = 'all 0.3s ease';
  }

  // Mobile menu toggle (if you add a hamburger menu)
  toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
  }

  destroy() {
    // Clean up event listeners if needed
    clearTimeout(this.scrollTimeout);
  }
}
// modules/scrollAnimations.js - Handles scroll-based animations
export default class ScrollAnimations {
  constructor() {
    this.elements = [];
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
  }

  init() {
    this.collectElements();
    this.createObserver();
    this.observeElements();
  }

  collectElements() {
    // Collect all elements that should animate on scroll
    const selectors = ['.hero-content', '.section-title', '.contact-content'];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (!el.classList.contains('animated')) {
          this.elements.push(el);
        }
      });
    });
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          entry.target.classList.add('animated');
          this.observer.unobserve(entry.target);
        }
      });
    }, this.options);
  }

  observeElements() {
    this.elements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  animateElement(element) {
    element.style.animation = 'fadeInUp 0.8s ease forwards';
  }

  // Add parallax scrolling effect for hero section
  addParallaxEffect() {
    const hero = document.querySelector('.hero-content');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      hero.style.opacity = 1 - scrolled / 600;
    });
  }

  // Reveal elements with stagger effect
  staggerReveal(elements, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * delay);
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
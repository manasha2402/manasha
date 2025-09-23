// main.js - ES6 Module
import Constellation from './modules/constellation.js';
import ScrollAnimations from './modules/scrollAnimations.js';
import Navigation from './modules/navigation.js';

// Initialize the constellation background effect
const constellation = new Constellation('constellation');
constellation.init();

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();
scrollAnimations.init();

// Initialize navigation
const navigation = new Navigation();
navigation.init();

// Add smooth reveal animation to project cards
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all project cards
  document.querySelectorAll('.project-card').forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Add click handlers for project cards
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', function () {
    // You can add navigation to project details here
    console.log('Project clicked:', this.querySelector('.project-title').textContent);
  });
});

// Export for potential use in other modules
export { constellation, scrollAnimations, navigation };
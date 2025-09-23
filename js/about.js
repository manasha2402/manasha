// about.js - ES6 Module for About Page
import Constellation from './modules/constellation.js';

// Initialize constellation background
const constellation = new Constellation('constellation');
constellation.init();

// Animate timeline items on scroll
const observeTimeline = () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  timelineItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
  });
};

// Animate skill categories
const animateSkills = () => {
  const skillCategories = document.querySelectorAll('.skill-category');

  skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';

    setTimeout(() => {
      category.style.transition = 'all 0.6s ease';
      category.style.opacity = '1';
      category.style.transform = 'translateY(0)';
    }, index * 150);
  });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  observeTimeline();
  animateSkills();
});

export { constellation };

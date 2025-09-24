document.addEventListener('DOMContentLoaded', function () {
  const skillTags = document.querySelectorAll('.tag');
  skillTags.forEach((tag) => {
    tag.style.cursor = 'pointer';

    tag.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.2s ease';
    });

    tag.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
    tag.addEventListener('click', function (e) {
      e.preventDefault();
      const skill = this.textContent.trim();

      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(skill + ' documentation')}`;
      if (searchUrl) {
        window.open(searchUrl, '_blank');
      }
    });
  });
});

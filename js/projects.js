// projects.js - Handle skill tag clicks and web searches

document.addEventListener('DOMContentLoaded', function() {
    // Get all skill tags
    const skillTags = document.querySelectorAll('.tag');
    
    // Add click event listener to each tag
    skillTags.forEach(tag => {
        // Add cursor pointer style to indicate clickability
        tag.style.cursor = 'pointer';
        
        // Add hover effect
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add click event for web search
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the skill text
            const skill = this.textContent.trim();
            
            // Google Search (default)
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(skill + ' documentation')}`;
            if (searchUrl) {
                window.open(searchUrl, '_blank');
            }
            // Optional: Add a visual feedback effect
            this.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
});

// Function to add a ripple effect on click (optional enhancement)
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

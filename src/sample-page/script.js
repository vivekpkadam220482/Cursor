// Sample page interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        // Update button text based on current theme
        if (body.classList.contains('dark-theme')) {
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            themeToggle.textContent = 'Toggle Dark Mode';
        }
        
        // Add a visual feedback animation
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Modal functionality
    const showModalBtn = document.getElementById('showModal');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    showModalBtn.addEventListener('click', function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside of it
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Add some interactive hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#007bff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
    });
    
    // Smooth scroll for navigation links (if they had actual targets)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add a visual feedback
            this.style.opacity = '0.6';
            setTimeout(() => {
                this.style.opacity = '';
            }, 200);
        });
    });
});
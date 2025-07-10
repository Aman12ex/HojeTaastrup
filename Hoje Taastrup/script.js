// Nepali Community Website Interactive Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initFormValidation();
    initGalleryModal();
    initParallaxEffects();
    initTypingEffect();
    initCounterAnimations();
    initNavigationEffects();
    initLoadingAnimations();
    initParticleEffect();
    initHamburgerMenu();
    
    // Add loading class to body
    document.body.classList.add('loading');
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        // Remove any existing event listeners
        link.removeEventListener('click', handleNavClick);
        
        // Add single event listener
        link.addEventListener('click', handleNavClick);
    });
}

// Separate function to handle navigation clicks
function handleNavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    console.log('Clicked link:', this.textContent, 'Target:', targetId); // Debug log
    
    if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        // Remove active class from all links
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Add active state animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    } else {
        console.error('Target section not found:', targetId);
    }
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add special animations for specific elements
                if (entry.target.tagName === 'SECTION') {
                    animateSection(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and important elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe event cards
    const eventCards = document.querySelectorAll('#events li');
    eventCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Section-specific animations
function animateSection(section) {
    const sectionId = section.id;
    
    switch(sectionId) {
        case 'events':
            animateEventCards();
            break;
        case 'gallery':
            animateGalleryImages();
            break;
        case 'about':
            animateAboutContent();
            break;
    }
}

// Event cards staggered animation
function animateEventCards() {
    const cards = document.querySelectorAll('#events li');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = `slideInUp 0.6s ease-out forwards`;
        }, index * 200);
    });
}

// Gallery images staggered animation
function animateGalleryImages() {
    const images = document.querySelectorAll('.gallery-grid img');
    images.forEach((img, index) => {
        setTimeout(() => {
            img.style.animation = `fadeInScale 0.6s ease-out forwards`;
        }, index * 100);
    });
}

// About content animation
function animateAboutContent() {
    const aboutText = document.querySelector('#about p');
    if (aboutText) {
        aboutText.style.animation = 'fadeInUp 1s ease-out forwards';
    }
}

// Enhanced Form Validation
function initFormValidation() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            this.style.transform = 'scale(1)';
            validateField(this);
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form);
        }
    });
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    removeErrorMessage(field);
    
    // Validation rules
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        showErrorMessage(field, errorMessage);
    } else {
        field.classList.add('valid');
    }
    
    return isValid;
}

// Show error message
function showErrorMessage(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#dc143c';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';
    field.parentNode.appendChild(errorElement);
}

// Remove error message
function removeErrorMessage(field) {
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Form submission
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.style.background = '#7f8c8d';
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        showSuccessMessage();
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.background = '';
    }, 2000);
}

// Success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="background: #27ae60; color: white; padding: 15px; border-radius: 10px; margin: 20px 0; text-align: center; animation: fadeInUp 0.5s ease-out;">
            <strong>Success!</strong> Your message has been sent successfully.
        </div>
    `;
    
    const form = document.querySelector('form');
    form.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Gallery Modal
function initGalleryModal() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            createModal(this.src, this.alt);
        });
    });
}

// Create and show modal
function createModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <img src="${src}" alt="${alt}">
                <span class="close-modal">&times;</span>
            </div>
        </div>
    `;
    
    // Add styles for modal
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: scaleIn 0.3s ease-out;
        }
        
        .modal-content img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 10px;
        }
        
        .close-modal {
            position: absolute;
            top: -40px;
            right: -40px;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 300);
    }
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('#hero, header');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroText = document.querySelector('#hero p');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let index = 0;
        const typingSpeed = 50;
        
        function typeText() {
            if (index < originalText.length) {
                heroText.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeText, 1000);
    }
}

// Counter Animations (for future stats)
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Navigation Effects
function initNavigationEffects() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Clear any existing event listeners and add fresh ones
    navLinks.forEach(link => {
        // Clone the node to remove all event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });
    
    // Re-query the links after cloning
    const freshNavLinks = document.querySelectorAll('nav a');
    
    // Add active link highlighting based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 150; // Increased offset for better detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                freshNavLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkHref = link.getAttribute('href');
                    if (linkHref === `#${sectionId}`) {
                        link.classList.add('active');
                        console.log('Active section:', sectionId); // Debug log
                    }
                });
            }
        });
    });
    
    // Add ripple effect to nav links (only visual effect)
    freshNavLinks.forEach(link => {
        link.addEventListener('mousedown', function(e) {
            createRipple(e, this);
        });
    });
    
    // Re-initialize smooth scrolling after cleaning up
    initSmoothScrolling();
}

// Ripple effect function
function createRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Loading Animations
function initLoadingAnimations() {
    const elements = document.querySelectorAll('section, header, #hero');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Particle Effect for Hero Section
function initParticleEffect() {
    const heroSection = document.querySelector('#hero');
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    heroSection.style.position = 'relative';
    heroSection.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

// Create individual particle
function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        left: ${startX}%;
        top: 100%;
        animation: floatUp ${duration}s linear ${delay}s infinite;
    `;
    
    container.appendChild(particle);
    
    // Add CSS animation for floating particles
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #dc143c, #003893);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced Form Interactions
function initAdvancedFormFeatures() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add character counter for textarea
    const messageField = form.querySelector('textarea[name="message"]');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.9rem;
            color: #7f8c8d;
            margin-top: 5px;
        `;
        
        messageField.parentNode.appendChild(counter);
        
        messageField.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} characters`;
            
            if (length > 500) {
                counter.style.color = '#dc143c';
            } else {
                counter.style.color = '#7f8c8d';
            }
        });
    }
    
    // Add floating labels
    inputs.forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.style.transition = 'all 0.3s ease';
            
            input.addEventListener('focus', function() {
                label.style.transform = 'translateY(-10px) scale(0.9)';
                label.style.color = '#003893';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '#2c3e50';
                }
            });
        }
    });
}

// Initialize advanced form features
initAdvancedFormFeatures();

// Mobile Touch Gestures
function initMobileGestures() {
    if ('ontouchstart' in window) {
        const galleryImages = document.querySelectorAll('.gallery-grid img');
        
        galleryImages.forEach(img => {
            let touchStartX = 0;
            let touchStartY = 0;
            
            img.addEventListener('touchstart', function(e) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            });
            
            img.addEventListener('touchmove', function(e) {
                e.preventDefault(); // Prevent scrolling
            });
            
            img.addEventListener('touchend', function(e) {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                
                // If it's a tap (minimal movement)
                if (Math.abs(touchEndX - touchStartX) < 10 && Math.abs(touchEndY - touchStartY) < 10) {
                    createModal(this.src, this.alt);
                }
            });
        });
    }
}

// Initialize mobile gestures
initMobileGestures();

// Performance Optimization
function initPerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Update scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle resize events here
            console.log('Window resized');
        }, 250);
    });
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Hamburger/Cheeseburger Toggle for Mobile Navigation
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-toggle');
    const navUl = document.querySelector('nav ul');
    if (!hamburger || !navUl) return;

    hamburger.addEventListener('click', function() {
        const isOpen = navUl.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a nav link (on mobile)
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 900) {
                navUl.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu on resize if switching to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            navUl.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Add custom CSS animations
const additionalStyles = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #dc143c !important;
        animation: shake 0.5s ease-in-out;
    }
    
    .valid {
        border-color: #27ae60 !important;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .nav a.active {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;

// Add additional styles to head
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalStyles;
document.head.appendChild(additionalStyleSheet);

// Console welcome message
console.log(`
🇳🇵 Welcome to Høje Taastrup Nepaliske Samfund Website! 🇳🇵
Website loaded successfully with all interactive features enabled.
Namaste! 🙏
`);

// Export functions for external use (if needed)
window.CommunityWebsite = {
    initSmoothScrolling,
    initScrollAnimations,
    initFormValidation,
    initGalleryModal,
    createModal,
    showSuccessMessage
};
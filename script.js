// Velez Bakery - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initProductInteractions();
    initReviewCarousel();
    initFormHandling();
    initTypedText();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            const navLinksContainer = document.getElementById('navLinks');
            navLinksContainer.classList.remove('active');
        });
    });
}

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Hero section animations
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const logoAnimation = document.querySelector('.logo-animation');
    const heroTitle = document.querySelector('.hero-title');
    const heroButtons = document.querySelector('.hero-buttons');

    // Animate hero elements on load
    if (heroContent) {
        // Logo animation
        anime({
            targets: logoAnimation,
            scale: [0, 1],
            rotate: [0, 360],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)',
            delay: 500
        });

        // Title animation
        anime({
            targets: heroTitle,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutQuart',
            delay: 800
        });

        // Buttons animation
        anime({
            targets: heroButtons.children,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            easing: 'easeOutQuart',
            delay: anime.stagger(200, {start: 1200})
        });
    }
}

// Initialize typed text effect
function initTypedText() {
    const typedElement = document.querySelector('.typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'Crafted with care, baked with love',
                'Authentic Filipino flavors',
                'Fresh daily from our oven',
                'Where tradition meets innovation'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate specific elements
                if (entry.target.classList.contains('product-card')) {
                    animateProductCard(entry.target);
                } else if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCard(entry.target);
                } else if (entry.target.classList.contains('review-card')) {
                    animateReviewCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('.product-card, .feature-card, .review-card, .story-card, .info-card');
    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Product card animations
function animateProductCard(card) {
    anime({
        targets: card,
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 600,
        easing: 'easeOutQuart'
    });
}

// Feature card animations
function animateFeatureCard(card) {
    const icon = card.querySelector('.feature-icon');
    
    anime({
        targets: card,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: 'easeOutQuart'
    });

    anime({
        targets: icon,
        scale: [0, 1],
        rotate: [0, 360],
        duration: 800,
        easing: 'easeOutElastic(1, .8)',
        delay: 200
    });
}

// Review card animations
function animateReviewCard(card) {
    anime({
        targets: card,
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 600,
        easing: 'easeOutQuart'
    });
}

// Product interactions
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card.querySelector('.product-image'),
                scale: 1.1,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card.querySelector('.product-image'),
                scale: 1,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        // Add click interaction
        card.addEventListener('click', () => {
            const productName = card.querySelector('h3').textContent;
            showProductModal(productName);
        });
    });
}

// Product modal (simple alert for now)
function showProductModal(productName) {
    const messages = {
        'Ube Cheesecake': 'Our signature Ube Cheesecake is made fresh daily with real purple yam from the Philippines!',
        'Pandan Pandesal': 'Soft, fluffy, and aromatic - our Pandan Pandesal is perfect for your morning coffee!',
        'Traditional Bibingka': 'Baked in banana leaves just like Lola used to make - perfect for the holidays!',
        'Ensaymada': 'Buttery, cheesy, and absolutely delicious - a Filipino breakfast favorite!',
        'Hopia Mongo': 'Flaky pastry filled with sweet mung bean paste - a classic Filipino treat!',
        'Sapin-Sapin': 'Colorful layers of rice cake topped with coconut - a feast for the eyes and taste buds!'
    };
    
    alert(messages[productName] || `Learn more about our delicious ${productName}!`);
}

// Review carousel
function initReviewCarousel() {
    const reviewCards = document.querySelectorAll('.review-card');
    let currentReview = 0;

    // Auto-advance reviews
    setInterval(() => {
        changeReview(1);
    }, 5000);
}

// Change review function
function changeReview(direction) {
    const reviewCards = document.querySelectorAll('.review-card');
    let currentReview = 0;

    // Find current active review
    reviewCards.forEach((card, index) => {
        if (card.classList.contains('active')) {
            currentReview = index;
        }
    });

    // Remove active class from current review
    reviewCards[currentReview].classList.remove('active');

    // Calculate new review index
    let newReview = currentReview + direction;
    if (newReview >= reviewCards.length) {
        newReview = 0;
    } else if (newReview < 0) {
        newReview = reviewCards.length - 1;
    }

    // Add active class to new review
    reviewCards[newReview].classList.add('active');
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
}

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        maxWidth: '300px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateX: [0, 100],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                notification.remove();
            }
        });
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollTop > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.id = 'scrollToTopBtn';
            scrollToTopBtn.innerHTML = '↑';
            scrollToTopBtn.title = 'Scroll to top';
            
            Object.assign(scrollToTopBtn.style, {
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#D2691E',
                color: 'white',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: '1000',
                boxShadow: '0 4px 15px rgba(210, 105, 30, 0.3)',
                transition: 'all 0.3s ease'
            });
            
            scrollToTopBtn.addEventListener('click', scrollToTop);
            scrollToTopBtn.addEventListener('mouseenter', () => {
                scrollToTopBtn.style.backgroundColor = '#B8860B';
                scrollToTopBtn.style.transform = 'scale(1.1)';
            });
            scrollToTopBtn.addEventListener('mouseleave', () => {
                scrollToTopBtn.style.backgroundColor = '#D2691E';
                scrollToTopBtn.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(scrollToTopBtn);
        }
        
        scrollToTopBtn.style.display = 'block';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.display = 'none';
    }
}, 100));

// Easter egg - Konami code
let konamiCode = [];
const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === correctCode.length && konamiCode.every((code, index) => code === correctCode[index])) {
        showEasterEgg();
        konamiCode = [];
    }
});

function showEasterEgg() {
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = '🎉🥖 Welcome to Velez Bakery! You found the secret code! 🍰🎉';
    
    Object.assign(easterEgg.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(135deg, #D2691E, #CD853F)',
        color: 'white',
        padding: '20px 30px',
        borderRadius: '15px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        zIndex: '10000',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        textAlign: 'center'
    });
    
    document.body.appendChild(easterEgg);
    
    anime({
        targets: easterEgg,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .8)'
    });
    
    setTimeout(() => {
        anime({
            targets: easterEgg,
            scale: [1, 0],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                easterEgg.remove();
            }
        });
    }, 3000);
}

// Initialize particle effect for hero section (optional)
function initParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 248, 220, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        heroSection.appendChild(particle);
        
        // Animate particle
        anime({
            targets: particle,
            translateX: () => anime.random(-100, 100),
            translateY: () => anime.random(-100, 100),
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            duration: () => anime.random(3000, 6000),
            loop: true,
            easing: 'easeInOutSine',
            delay: () => anime.random(0, 2000)
        });
    }
}

// Initialize particle effect after page load
window.addEventListener('load', initParticleEffect);
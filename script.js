/* ========================================= */
/* ENGINEERING PORTFOLIO JAVASCRIPT          */
/* Complete functionality - No additional coding needed */
/* All features are plug-and-play             */
/* ========================================= */

'use strict';

// ========================================= 
// THEME MANAGEMENT
// ========================================= 
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Apply saved theme
        document.body.setAttribute('data-theme', this.currentTheme);
        this.updateIcon();

        // Add click listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateIcon();
        this.animateToggle();
    }

    updateIcon() {
        const icon = this.themeToggle.querySelector('svg');
        if (this.currentTheme === 'dark') {
            // Sun icon (for switching to light)
            icon.innerHTML = `
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            `;
        } else {
            // Moon icon (for switching to dark)
            icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        }
    }

    animateToggle() {
        this.themeToggle.style.transform = 'rotate(180deg) scale(0.8)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'rotate(0deg) scale(1)';
        }, 300);
    }
}

// ========================================= 
// MUSIC PLAYER
// ========================================= 
class MusicPlayer {
    constructor() {
        this.toggle = document.getElementById('musicToggle');
        this.audio = document.getElementById('bgMusic');
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => this.toggleMusic());
        
        // Update icon when audio ends
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updateIcon();
        });
    }

    toggleMusic() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            this.audio.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
            this.isPlaying = true;
        }
        
        this.updateIcon();
        this.toggle.classList.toggle('playing', this.isPlaying);
    }

    updateIcon() {
        const svg = this.toggle.querySelector('svg');
        if (this.isPlaying) {
            // Playing icon (pause)
            svg.innerHTML = `
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
            `;
        } else {
            // Paused icon (music note)
            svg.innerHTML = `
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
            `;
        }
    }
}

// ========================================= 
// SCROLL PROGRESS BAR
// ========================================= 
class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scrollProgress');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateProgress());
    }

    updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    }
}

// ========================================= 
// NAVIGATION HIGHLIGHTER
// ========================================= 
class NavigationHighlighter {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navItems = document.querySelectorAll('.nav-item[href^="#"]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.highlightActiveSection());
        
        // Smooth scroll for nav links
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').slice(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    highlightActiveSection() {
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
}

// ========================================= 
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ========================================= 
class ScrollAnimations {
    constructor() {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger stat counter animation
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateStatCounter(entry.target);
                    }
                }
            });
        }, this.options);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll(`
            .section-header,
            .about-text,
            .stats-grid,
            .skill-card,
            .involvement-card,
            .project-card,
            .hero
        `);

        animatedElements.forEach(el => observer.observe(el));
        
        // Observe stat numbers separately for counter animation
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(el => observer.observe(el));
    }

    animateStatCounter(element) {
        if (element.dataset.animated) return; // Don't animate twice
        element.dataset.animated = 'true';
        
        const target = parseInt(element.dataset.target);
        const prefix = element.dataset.prefix || '';
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        const increment = target / totalFrames;
        
        let currentValue = 0;
        let frame = 0;
        
        const counter = setInterval(() => {
            frame++;
            currentValue += increment;
            
            if (frame === totalFrames || currentValue >= target) {
                clearInterval(counter);
                currentValue = target;
            }
            
            // Format the number
            let displayValue = Math.floor(currentValue);
            if (displayValue >= 1000) {
                displayValue = displayValue.toLocaleString();
            }
            
            element.textContent = prefix + displayValue;
        }, frameDuration);
    }
}

// ========================================= 
// STAGGER ANIMATION DELAYS
// ========================================= 
class StaggerAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.applyStagger('.skill-card', 0.1);
        this.applyStagger('.involvement-card', 0.15);
        this.applyStagger('.project-card', 0.1);
    }

    applyStagger(selector, delayIncrement) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * delayIncrement}s`;
        });
    }
}

// ========================================= 
// FLOATING NAV HIDE ON SCROLL DOWN
// ========================================= 
class FloatingNavController {
    constructor() {
        this.nav = document.getElementById('floatingNav');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 100) {
            this.nav.style.transform = 'translateX(-50%) translateY(0)';
            this.nav.style.opacity = '1';
        } else if (currentScroll > this.lastScroll && currentScroll > 500) {
            // Scrolling down - hide nav
            this.nav.style.transform = 'translateX(-50%) translateY(100px)';
            this.nav.style.opacity = '0';
        } else {
            // Scrolling up - show nav
            this.nav.style.transform = 'translateX(-50%) translateY(0)';
            this.nav.style.opacity = '1';
        }
        
        this.lastScroll = currentScroll;
    }
}

// ========================================= 
// SMOOTH SCROLL POLYFILL
// ========================================= 
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip if it's just '#' or already handled
                if (href === '#' || anchor.classList.contains('nav-item')) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ========================================= 
// PARALLAX EFFECTS FOR GRADIENT ORBS
// ========================================= 
class ParallaxEffects {
    constructor() {
        this.orbs = document.querySelectorAll('.gradient-orb');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateParallax());
    }

    updateParallax() {
        const scrolled = window.scrollY;
        
        this.orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ========================================= 
// KEYBOARD NAVIGATION
// ========================================= 
class KeyboardNavigation {
    constructor() {
        this.sections = ['home', 'about', 'skills', 'involvement', 'projects', 'contact'];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Alt + Arrow keys for section navigation
            if (e.altKey) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateSection(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateSection(-1);
                }
            }
            
            // Escape to close any modals (future use)
            if (e.key === 'Escape') {
                // Can be extended for modals
            }
        });
    }

    navigateSection(direction) {
        this.currentIndex = (this.currentIndex + direction + this.sections.length) % this.sections.length;
        const targetSection = document.getElementById(this.sections[this.currentIndex]);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// ========================================= 
// PERFORMANCE MONITORING
// ========================================= 
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Log performance metrics in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log(`Page Load Time: ${pageLoadTime}ms`);
                }, 0);
            });
        }
    }
}

// ========================================= 
// IMAGE LAZY LOADING
// ========================================= 
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            this.images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
}

// ========================================= 
// EASTER EGG - KONAMI CODE
// ========================================= 
class EasterEgg {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.konamiCode[this.konamiIndex]) {
                this.konamiIndex++;
                if (this.konamiIndex === this.konamiCode.length) {
                    this.activate();
                    this.konamiIndex = 0;
                }
            } else {
                this.konamiIndex = 0;
            }
        });
    }

    activate() {
        // Fun easter egg activation
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Remove after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        console.log('🎉 Easter egg activated! You found the secret!');
    }
}

// ========================================= 
// FORM VALIDATION (for future contact form)
// ========================================= 
class FormValidator {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
    }

    handleSubmit(e, form) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                this.showError(input, 'This field is required');
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                isValid = false;
                this.showError(input, 'Please enter a valid email');
            } else {
                this.removeError(input);
            }
        });
        
        if (isValid) {
            // Form is valid, can proceed with submission
            console.log('Form is valid');
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showError(input, message) {
        input.classList.add('error');
        let errorDiv = input.nextElementSibling;
        
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        
        errorDiv.textContent = message;
    }

    removeError(input) {
        input.classList.remove('error');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }
}

// ========================================= 
// CONSOLE WELCOME MESSAGE
// ========================================= 
class ConsoleWelcome {
    constructor() {
        this.init();
    }

    init() {
        const styles = [
            'color: #0066CC',
            'font-size: 20px',
            'font-weight: bold',
            'padding: 10px'
        ].join(';');

        console.log('%c👋 Welcome to Miles Lucatorto\'s Portfolio!', styles);
        console.log('%cInterested in the code? Check out the repository on GitHub!', 'color: #48dbfb; font-size: 14px;');
        console.log('%cKeyboard shortcuts:\n  • Alt + ↑/↓ - Navigate sections\n  • Try the Konami code 😉', 'color: #999; font-size: 12px;');
    }
}

// ========================================= 
// INITIALIZE EVERYTHING
// ========================================= 
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        // Initialize all components
        new ThemeManager();
        new MusicPlayer();
        new ScrollProgress();
        new NavigationHighlighter();
        new ScrollAnimations();
        new StaggerAnimations();
        new FloatingNavController();
        new SmoothScroll();
        new ParallaxEffects();
        new KeyboardNavigation();
        new PerformanceMonitor();
        new LazyImageLoader();
        new EasterEgg();
        new FormValidator();
        new ConsoleWelcome();

        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Log initialization
        console.log('✅ Portfolio initialized successfully');
    }
}

// ========================================= 
// START THE APPLICATION
// ========================================= 
new App();

// ========================================= 
// EXPORT FOR POTENTIAL MODULE USE
// ========================================= 
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App };
}

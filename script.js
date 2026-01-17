/* ========================================= */
/* PORTFOLIO JAVASCRIPT                      */
/* Miles Lucatorto - Mechanical Engineering  */
/* ========================================= */

/* HOW TO EDIT THIS FILE:
   1. Each function is clearly labeled with comments
   2. To change animation speeds, look for duration values (in milliseconds)
   3. To change scroll positions, look for offset values (in pixels)
   4. Numbers in functions are explained with comments
*/


/* ========================================= */
/* THEME TOGGLE (Light/Dark Mode)            */
/* Switches between light and dark themes    */
/* ========================================= */

// Get the theme toggle button
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme from browser storage (defaults to 'dark' if none saved)
const savedTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme when page loads
body.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀' : '🌙';

// When theme button is clicked
themeToggle.addEventListener('click', () => {
    // Get current theme
    const currentTheme = body.getAttribute('data-theme');
    
    // Switch to opposite theme
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀' : '🌙';
    
    // Save theme preference to browser storage
    localStorage.setItem('theme', newTheme);
});


/* ========================================= */
/* MUSIC PLAYER                              */
/* Controls background music playback        */
/* ========================================= */

// Get music elements
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false; // Track if music is currently playing

// When music button is clicked
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        // If playing, pause it
        bgMusic.pause();
        musicToggle.textContent = '🔇'; // Muted icon
        musicToggle.classList.remove('playing'); // Remove pulsing animation
    } else {
        // If paused, play it
        bgMusic.play();
        musicToggle.textContent = '🔊'; // Speaker icon
        musicToggle.classList.add('playing'); // Add pulsing animation
    }
    // Toggle the playing state
    isPlaying = !isPlaying;
});


/* ========================================= */
/* ACTIVE NAVIGATION HIGHLIGHTING            */
/* Highlights nav item based on scroll       */
/* ========================================= */

// Get all sections with IDs
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

// When user scrolls
window.addEventListener('scroll', () => {
    let current = ''; // Will store the current section ID
    
    // Loop through each section
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Distance from top of page
        const sectionHeight = section.clientHeight; // Height of section
        
        // If we've scrolled past this section (with 200px offset)
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id'); // Update current section
        }
    });
    
    // Update nav items to show which is active
    navItems.forEach(item => {
        item.classList.remove('active'); // Remove active from all
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active'); // Add to current section
        }
    });
});


/* ========================================= */
/* INTERSECTION OBSERVER                     */
/* Triggers animations when elements scroll  */
/* into view                                 */
/* ========================================= */

// Settings for when to trigger animations
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px' // Trigger 100px before element enters view
};

// Create the observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If element is in view
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add 'visible' class to trigger CSS animation
        }
    });
}, observerOptions);

// Watch these elements for scroll animations
// Add 'visible' class when they come into view
document.querySelectorAll('.section-header, .about-text, .stats-grid, .card, .project-card').forEach(el => {
    observer.observe(el);
});


/* ========================================= */
/* ANIMATED COUNTER FOR STATS                */
/* Counts up numbers in stat cards          */
/* ========================================= */

// Function to animate a single counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target')); // Final number
    const duration = 2000; // Animation duration in milliseconds (2 seconds)
    const increment = target / (duration / 16); // How much to add each frame (60fps = 16ms)
    let current = 0; // Starting number
    
    // Function that runs each frame
    const updateCounter = () => {
        current += increment; // Increase current number
        
        if (current < target) {
            // If we haven't reached target yet
            element.textContent = Math.floor(current); // Update display
            requestAnimationFrame(updateCounter); // Schedule next frame
        } else {
            // We've reached the target
            // Format large numbers with commas
            element.textContent = target >= 1000 ? target.toLocaleString() : target;
        }
    };
    
    updateCounter(); // Start the animation
}

// Observer specifically for stat counters
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Find all stat numbers in this section
            const statNumbers = entry.target.querySelectorAll('[data-target]');
            // Animate each one
            statNumbers.forEach(animateCounter);
            // Stop observing (only animate once)
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of section is visible

// Watch the about section for stat animations
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}


/* ========================================= */
/* SMOOTH SCROLLING                          */
/* Makes anchor links scroll smoothly        */
/* ========================================= */

// Find all links that start with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior
        
        // Get the target element
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Scroll to it smoothly
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Align to top of viewport
            });
        }
    });
});


/* ========================================= */
/* STAGGER ANIMATIONS                        */
/* Makes cards animate in sequence           */
/* ========================================= */

// Add progressive delay to each card
// This makes them appear one after another

// Skill cards
document.querySelectorAll('.card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`; // 0.1s delay per card
});

// Project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`; // 0.1s delay per card
});


/* ========================================= */
/* END OF JAVASCRIPT                         */
/* ========================================= */


/* ========================================= */
/* CUSTOMIZATION GUIDE                       */
/* ========================================= */

/* TO CHANGE ANIMATION SPEEDS:
   - Look for 'duration' variables (in milliseconds)
   - 1000 = 1 second, 2000 = 2 seconds, etc.
   
   TO CHANGE SCROLL SENSITIVITY:
   - Look for offset values like '200' in scroll listeners
   - Larger = triggers earlier, smaller = triggers later
   
   TO CHANGE COUNTER ANIMATION:
   - Edit the 'duration' value in animateCounter function
   - Change 2000 to make it faster/slower
   
   TO CHANGE STAGGER TIMING:
   - Edit the multiplication factor (0.1)
   - 0.1 = 100ms between cards, 0.2 = 200ms, etc.
   
   TO ADD NEW MUSIC:
   - Replace the src URL in the HTML file's <audio> tag
   - Find free music at: mixkit.co, freesound.org, or incompetech.com
*/

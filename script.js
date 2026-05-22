// Connor with Honor Landing Pages - Interactive JavaScript

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky header background on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.style.background = 'rgba(10, 22, 40, 0.98)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 22, 40, 0.95)';
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Fade in animations DISABLED - all content visible immediately
// This prevents text from flashing and disappearing
console.log('Fade-in animations disabled - all content visible immediately');

// Phone click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        const phoneNumber = this.getAttribute('href').replace('tel:', '');
        console.log('Phone call initiated:', phoneNumber);

        // Analytics tracking (if Google Analytics is installed)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_call', {
                'event_category': 'Contact',
                'event_label': phoneNumber,
                'value': 1
            });
        }
    });
});

// Calendar booking tracking
document.querySelectorAll('a[href="#calendar"]').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Calendar booking initiated');

        if (typeof gtag !== 'undefined') {
            gtag('event', 'calendar_view', {
                'event_category': 'Lead Generation',
                'event_label': 'Calendar Booking Click'
            });
        }
    });
});

// Email click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        const email = this.getAttribute('href').replace('mailto:', '');
        console.log('Email initiated:', email);

        if (typeof gtag !== 'undefined') {
            gtag('event', 'email_click', {
                'event_category': 'Contact',
                'event_label': email
            });
        }
    });
});

// Handle iframe height adjustment for calendar
function adjustCalendarHeight() {
    const calendarIframe = document.querySelector('.calendar-embed iframe');

    if (calendarIframe) {
        calendarIframe.addEventListener('load', function() {
            try {
                const iframeDoc = calendarIframe.contentDocument || calendarIframe.contentWindow.document;
                if (iframeDoc) {
                    const height = iframeDoc.body.scrollHeight;
                    if (height > 0) {
                        calendarIframe.style.minHeight = height + 'px';
                    }
                }
            } catch (e) {
                // Cross-origin restriction - use default height
                console.log('Using default calendar height');
            }
        });
    }
}

window.addEventListener('load', adjustCalendarHeight);

// Message listener for calendar form
window.addEventListener('message', function(event) {
    if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'booking_completed' || event.data.formSubmitted) {
            console.log('Calendar booking completed');

            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'booking_completed', {
                    'event_category': 'Lead Generation',
                    'event_label': 'Calendar Booking Submission'
                });
            }

            // You can add a thank you message or redirect here
            // showThankYouMessage();
        }

        // Handle iframe height messages
        if (event.data.frameHeight) {
            const iframe = document.querySelector(`iframe[id="${event.data.frameId}"]`);
            if (iframe) {
                iframe.style.minHeight = event.data.frameHeight + 'px';
            }
        }
    }
});

// Add subtle animation to stats on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateStat(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateStat(element) {
    const text = element.textContent;

    // Only animate if it contains numbers
    if (!/\d/.test(text)) return;

    // Simple pulse animation
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

document.querySelectorAll('.stat-number, .result-stat').forEach(stat => {
    stat.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    statsObserver.observe(stat);
});

// Performance monitoring
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);

        if (typeof gtag !== 'undefined' && pageLoadTime > 0) {
            gtag('event', 'timing_complete', {
                name: 'page_load',
                value: pageLoadTime,
                event_category: 'Performance'
            });
        }
    }
});

// Add hover effect to CTA buttons
document.querySelectorAll('.btn-hero-primary, .btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Accessibility: Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Allow escape key to close any modals if added later
    if (e.key === 'Escape') {
        console.log('Escape pressed');
    }
});

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Connor with Honor landing page initialized');
    console.log('Tron grid animation active');
    console.log('All tracking enabled');

    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);

    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: event.error.message,
            fatal: false
        });
    }
});

// Custom Cursor Logic
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const hoverables = document.querySelectorAll('a, button, .timeline-item, .expertise-card');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.add('hover');
        cursor.classList.remove('hover');
    });
});

// Loader Logic
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    
    // Simulate loading time for visual effect
    setTimeout(() => {
        gsap.to(loader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
                initAnimations();
            }
        });
    }, 1500);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal
    const tlHero = gsap.timeline();
    
    tlHero.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
    .from(".hero-desc", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from(".hero-actions", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from(".image-wrapper", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=1")
    .from(".experience-badge", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.4");

    // Scroll Elements Animation
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    scrollElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Metrics Counter Animation
    const metrics = document.querySelectorAll('.metric-number');
    
    metrics.forEach(metric => {
        // Extract number for calculation, assuming formats like "12", "500", "3", "1"
        const text = metric.innerText;
        const numMatch = text.match(/\d+/);
        
        if (numMatch) {
            const endValue = parseInt(numMatch[0]);
            
            ScrollTrigger.create({
                trigger: ".metrics",
                start: "top 80%",
                once: true,
                onEnter: () => {
                    gsap.fromTo(metric, 
                        { innerHTML: 0 },
                        { 
                            innerHTML: endValue, 
                            duration: 2, 
                            ease: "power2.out",
                            snap: { innerHTML: 1 },
                            onUpdate: function() {
                                // Re-append non-numeric characters if needed (very basic handling)
                                if(text.includes('M+')) metric.innerHTML = '$' + metric.innerHTML + 'M+';
                                else if(text.includes('k+')) metric.innerHTML = metric.innerHTML + 'k+';
                                else if(text.includes('%')) metric.innerHTML = metric.innerHTML + '%';
                                else if(text.includes('+')) metric.innerHTML = metric.innerHTML + '+';
                            }
                        }
                    );
                }
            });
        }
    });
}

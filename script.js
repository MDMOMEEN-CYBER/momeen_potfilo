// Custom Cursor Logic
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    // Smoother magnetic cursor via GSAP
    gsap.to(cursor, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.15,
        ease: "power2.out"
    });
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

    // Staggered Grids Animation (Projects, Skills, Metrics, Timeline)
    const grids = document.querySelectorAll('.expertise-grid, .timeline');
    
    grids.forEach(grid => {
        const children = grid.children;
        gsap.from(children, {
            scrollTrigger: {
                trigger: grid,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2, // Staggered reveal
            ease: "power3.out"
        });
    });

    // 3D Tilt Effect for Glass Cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Subtle 3D tilt effect
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                ease: "power1.out",
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: "power3.out",
                duration: 0.6
            });
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

// ========== Mobile Menu Toggle ==========
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.querySelectorAll('span').forEach((span, index) => {
            span.style.transform = 'none';
            if (index === 1) span.style.opacity = '1';
        });
    });
});

// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// ========== Active Navigation Link ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Scroll to Top Button ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== Global Variables ==========
let isPhoneAnimating = false;

// ========== Intersection Observer for Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
            entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animate-in');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all feature cards and reward cards
document.querySelectorAll('.feature-card, .reward-card, .impact-item, .rank-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ========== Parallax Effect for Hero Section ==========
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            
            // Only apply parallax if phone is not being interacted with
            if (heroVisual && scrolled < window.innerHeight * 1.5 && !isPhoneAnimating) {
                const parallaxValue = scrolled * 0.15;
                heroVisual.style.transform = `translateY(${parallaxValue}px)`;
            }
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });

// ========== Smooth Reveal Animation for Sections ==========
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    sectionObserver.observe(section);
});

// ========== Counter Animation for Stats ==========
const animateCounter = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        // Format based on content
        if (element.textContent.includes('kg')) {
            element.textContent = Math.floor(current).toLocaleString() + ' kg';
        } else if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

// Observe stats elements
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number && text.includes('k')) {
                const target = number * 1000;
                animateCounter(entry.target, 0, target, 2000);
            } else if (number) {
                animateCounter(entry.target, 0, number, 2000);
            }
            
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(stat => {
    statsObserver.observe(stat);
});

// ========== Download Button Click Handler ==========
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Show download options
    const downloadOptions = document.createElement('div');
    downloadOptions.className = 'download-modal';
    downloadOptions.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h3>Escolha sua plataforma</h3>
            <div class="download-buttons">
                <a href="#" class="download-option">
                    <span class="download-icon">🤖</span>
                    <div>
                        <div class="download-title">Google Play</div>
                        <div class="download-subtitle">Android</div>
                    </div>
                </a>
                <a href="#" class="download-option">
                    <span class="download-icon">📱</span>
                    <div>
                        <div class="download-title">App Store</div>
                        <div class="download-subtitle">iOS</div>
                    </div>
                </a>
            </div>
            <p style="margin-top: 20px; color: var(--text-secondary); font-size: 0.875rem;">
                🚧 Em breve disponível nas lojas oficiais
            </p>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: var(--text-secondary);
        }
        
        .modal-content h3 {
            margin-bottom: 30px;
            color: var(--text);
        }
        
        .download-buttons {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .download-option {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px;
            border: 2px solid #E0E0E0;
            border-radius: 12px;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .download-option:hover {
            border-color: var(--primary);
            background: rgba(0, 200, 83, 0.05);
            transform: translateX(5px);
        }
        
        .download-icon {
            font-size: 3rem;
        }
        
        .download-title {
            font-weight: 600;
            color: var(--text);
            font-size: 1.125rem;
        }
        
        .download-subtitle {
            color: var(--text-secondary);
            font-size: 0.875rem;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(downloadOptions);
    
    // Close modal handlers
    const closeModal = () => {
        downloadOptions.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => downloadOptions.remove(), 300);
    };
    
    downloadOptions.querySelector('.modal-close').addEventListener('click', closeModal);
    downloadOptions.addEventListener('click', (e) => {
        if (e.target === downloadOptions) closeModal();
    });
    
    document.querySelectorAll('.download-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    });
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// ========== Reward Buttons Interaction ==========
document.querySelectorAll('.btn-reward').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Add pulse animation
        this.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
        
        // Show notification
        showNotification('Recompensa adicionada ao carrinho!');
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(pulseStyle);

// ========== Premium Button Handler ==========
document.querySelectorAll('.btn-premium, .btn-primary').forEach(btn => {
    if (btn.textContent.includes('Assinar') || btn.textContent.includes('Premium')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecionando para assinatura...', 'info');
        });
    }
});

// ========== Notification System ==========
function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ️'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // Add styles
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 20px 30px;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.25), 0 0 20px rgba(0, 200, 83, 0.2);
                display: flex;
                align-items: center;
                gap: 15px;
                z-index: 10000;
                animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border-left: 4px solid var(--primary);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            
            .notification-info {
                border-left-color: var(--secondary);
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }
            
            .notification-icon {
                font-size: 1.5rem;
                color: var(--primary);
                animation: bounce 0.5s ease;
            }
            
            @keyframes bounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            .notification-message {
                font-weight: 500;
                color: var(--text);
            }
            
            .notification-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 200, 83, 0.5);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add slideOutRight animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(slideOutStyle);

// ========== Event Registration Handler ==========
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Inscrever')) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Inscrição realizada com sucesso! 🎉', 'success');
        });
    }
});

// ========== Social Links Handler ==========
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Redirecionando para rede social...', 'info');
    });
});

// ========== Store Badge Handler ==========
document.querySelectorAll('.store-badge').forEach(badge => {
    badge.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Em breve disponível!', 'info');
    });
});

// ========== Cursor Effect for Interactive Elements ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('TrashMove website loaded successfully! 🗑️🌿');
    
    // Add cursor hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .feature-card, .reward-card, .rank-badge');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Add smooth reveal for page content
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ========== Mouse Move Parallax Effect for Phone ==========
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isPhoneAnimating) {
        isPhoneAnimating = true;
        animatePhoneParallax();
    }
}, { passive: true });

// Smooth mouse tracking for phone mockup
function animatePhoneParallax() {
    const phoneMockup = document.querySelector('.phone-mockup');
    const phoneFrame = document.querySelector('.phone-frame');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (!phoneMockup || !phoneFrame) {
        isPhoneAnimating = false;
        return;
    }
    
    const rect = phoneMockup.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (mouseX - centerX) / window.innerWidth;
    const deltaY = (mouseY - centerY) / window.innerHeight;
    
    targetX = deltaX * 8;
    targetY = deltaY * 8;
    
    // Smooth interpolation
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    
    // Check if phone is hovered
    const isHovered = phoneMockup.matches(':hover') || 
                     (mouseX >= rect.left && mouseX <= rect.right && 
                      mouseY >= rect.top && mouseY <= rect.bottom);
    
    if (isHovered && (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1)) {
        // Disable CSS animation when interacting
        phoneFrame.style.animation = 'none';
        phoneFrame.style.transform = `translate(${currentX}px, ${currentY}px) rotateY(${currentX * 0.3}deg) rotateX(${-currentY * 0.2}deg)`;
        
        // Reset hero visual transform to allow phone movement
        if (heroVisual) {
            heroVisual.style.transform = '';
        }
        
        requestAnimationFrame(animatePhoneParallax);
    } else {
        // Smooth return to center
        if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
            currentX *= 0.9;
            currentY *= 0.9;
            phoneFrame.style.transform = `translate(${currentX}px, ${currentY}px) rotateY(${currentX * 0.3}deg) rotateX(${-currentY * 0.2}deg)`;
            requestAnimationFrame(animatePhoneParallax);
        } else {
            // Re-enable CSS animation when not interacting
            phoneFrame.style.animation = '';
            phoneFrame.style.transform = '';
            isPhoneAnimating = false;
        }
    }
}

// ========== Performance Optimization ==========
// Lazy load images when implemented
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== Analytics Helper Functions ==========
function trackEvent(eventName, eventData = {}) {
    // Integrate with your analytics service (Google Analytics, etc.)
    console.log('Event tracked:', eventName, eventData);
    
    // Example: gtag('event', eventName, eventData);
}

// Track important user actions
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('button_click', {
            button_text: this.textContent.trim(),
            button_location: this.closest('section')?.id || 'unknown'
        });
    });
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const scroll25 = scrollPercent >= 25 && maxScroll < 25;
    const scroll50 = scrollPercent >= 50 && maxScroll < 50;
    const scroll75 = scrollPercent >= 75 && maxScroll < 75;
    const scroll100 = scrollPercent >= 100 && maxScroll < 100;
    
    if (scroll25) { trackEvent('scroll_depth', { depth: 25 }); maxScroll = 25; }
    if (scroll50) { trackEvent('scroll_depth', { depth: 50 }); maxScroll = 50; }
    if (scroll75) { trackEvent('scroll_depth', { depth: 75 }); maxScroll = 75; }
    if (scroll100) { trackEvent('scroll_depth', { depth: 100 }); maxScroll = 100; }
}, { passive: true });


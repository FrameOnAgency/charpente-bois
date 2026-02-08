// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scroll for anchor links (if browser behavior isn't enough or for more control)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Offset for fixed header
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
        navbar.style.boxShadow = "none";
        navbar.style.background = "rgba(255, 255, 255, 0.90)";
    }
});

// Modal functionality
const modal = document.getElementById('contact-modal');
const beamCharacter = document.getElementById('beam-character');
const closeModal = document.querySelector('.close-modal');
const modalForm = document.querySelector('.modal-form');
const fireworksContainer = document.getElementById('fireworks');

// Open modal when clicking the beam
if (beamCharacter) {
    beamCharacter.addEventListener('click', function () {
        modal.classList.add('show');
        createFireworks();
    });
}

// Close modal when clicking X
if (closeModal) {
    closeModal.addEventListener('click', function () {
        modal.classList.remove('show');
    });
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Handle form submission
if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous contacterons bientôt.');
        modal.classList.remove('show');
        modalForm.reset();
    });
}

// Create fireworks effect
function createFireworks() {
    // Clear existing fireworks
    fireworksContainer.innerHTML = '';

    // Create multiple bursts
    for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500'];
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6;

            // Create particles for each burst
            for (let i = 0; i < 30; i++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                const angle = (Math.PI * 2 * i) / 30;
                const velocity = 100 + Math.random() * 100;
                const xVel = Math.cos(angle) * velocity;
                const yVel = Math.sin(angle) * velocity;

                firework.style.setProperty('--x', xVel + 'px');
                firework.style.setProperty('--y', yVel + 'px');

                fireworksContainer.appendChild(firework);

                // Remove after animation
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }
        }, burst * 300);
    }
}

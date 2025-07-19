// DOM Elements
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links");
const typedTextSpan = document.querySelector(".typed-text");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const certificateCards = document.querySelectorAll(".certificate-card");
const modal = document.getElementById("certificate-modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.querySelector(".close-modal");
const contactForm = document.getElementById("contactForm");

// Touch variables for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

// Navbar highlight on scroll
function highlightNav() {
    let index = sections.length - 1;
    for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 80) {
            index = i;
        }
    }
    navLinks.forEach(link => link.classList.remove("active"));
    if (navLinks[index]) navLinks[index].classList.add("active");
}

// Animate sections on scroll
function animateSections() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            section.classList.add("visible");
        }
    });
    document.querySelectorAll(".fade-in").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add("visible");
        }
    });
}

// Handle swipe gesture for modal
function handleSwipe() {
    if (touchEndX < touchStartX - 50 || touchEndX > touchStartX + 50) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    }
}

// Initialize Typed.js effect
function initTypeEffect() {
    if (typedTextSpan) {
        const typed = new Typed(typedTextSpan, {
            strings: ["ECE Student", "FPGA Developer", "Embedded Systems Designer", "VLSI Engineer"],
            typeSpeed: 70,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }
}

// Event Listeners
window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);
window.addEventListener("scroll", animateSections);
window.addEventListener("load", animateSections);

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinksContainer.classList.toggle("active");
        
        // Prevent scrolling when menu is open
        if (hamburger.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (hamburger && hamburger.classList.contains("active")) {
                hamburger.classList.remove("active");
                navLinksContainer.classList.remove("active");
                document.body.style.overflow = "auto";
            }
            
            // Calculate header height for offset
            const navHeight = document.querySelector(".navbar").offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - navHeight,
                behavior: "smooth"
            });
        }
    });
});

// Tabs functionality
tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const tabName = btn.dataset.tab;
        
        tabBtns.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
        
        btn.classList.add("active");
        document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.add("active");
    });
});

// Certificate modal functionality
certificateCards.forEach(card => {
    card.addEventListener("click", function() {
        modal.style.display = "block";
        modalImg.src = this.querySelector("img").src;
        
        // Add slight delay before adding show class for smooth animation
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
        
        // Prevent scrolling on body when modal is open
        document.body.style.overflow = "hidden";
    });
});

if (closeModal) {
    closeModal.addEventListener("click", function() {
        modal.classList.remove("show");
        
        // Add delay to match transition before hiding
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    });
}

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.classList.remove("show");
        
        // Add delay to match transition before hiding
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    }
});

// Add swipe functionality for mobile devices
modal.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Contact form validation
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject ? contactForm.subject.value.trim() : "";
        const message = contactForm.message.value.trim();
        const formMessage = document.getElementById("formMessage");
        let error = "";
        
        if (!name) error = "Please enter your name.";
        else if (!email || !/^\S+@\S+\.\S+$/.test(email)) error = "Please enter a valid email.";
        else if (!message) error = "Please enter your message.";
        
        if (error) {
            e.preventDefault();
            formMessage.innerHTML = `<div class="error-message">${error}</div>`;
        } else {
            // Show sending message but allow form to submit to FormSubmit
            formMessage.innerHTML = '<div class="success-message">Sending message...</div>';
            // Form will submit naturally to FormSubmit
        }
    });
}

// Add resize handler for responsive adjustments
window.addEventListener("resize", function() {
    // Reset body overflow when resizing from mobile to desktop
    if (window.innerWidth > 768 && hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinksContainer.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Handle page load events
document.addEventListener("DOMContentLoaded", function() {
    // Initialize typed.js
    initTypeEffect();
    
    // Preload images for smoother transitions
    const imagesToPreload = document.querySelectorAll("img");
    imagesToPreload.forEach(img => {
        if (img.getAttribute("src")) {
            const preloadLink = document.createElement("link");
            preloadLink.href = img.getAttribute("src");
            preloadLink.rel = "preload";
            preloadLink.as = "image";
            document.head.appendChild(preloadLink);
        }
    });
    
    // Initialize animations
    animateSections();
    highlightNav();
});

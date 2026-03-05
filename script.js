// script.js - animations, sticky header, form validation, hamburger, counters

document.addEventListener('DOMContentLoaded', function() {
    // Sticky header color change
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // back-to-top button visibility
    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });

    //Toggle
      const toggleBtn = document.getElementById("darkModeToggle");

// Load saved mode
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀ ";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀ ";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙 ";
    }
});
    


    // Mobile hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    // close menu after clicking a link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // SKILL BARS ANIMATION on scroll (counters)
    const skillBars = document.querySelectorAll('.bar-fill');
    const animateBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar) && bar.style.width !== width+'%') {
                bar.style.width = width + '%';
                // counter inside bar (text content)
                let start = 0;
                const end = parseInt(width);
                const increment = end > 30 ? 2 : 1;
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        bar.textContent = end + '%';
                        clearInterval(timer);
                    } else {
                        bar.textContent = start + '%';
                    }
                }, 15);
            }
        });
    };

    // helper to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 50;
    }

    // run on scroll and initially
    window.addEventListener('scroll', () => {
        animateBars();
        // fade-in / slide-up on scroll: they have classes, but we can re-trigger by adding class if needed, 
        // but they already play once on load. we'll keep them as is.
    });
    animateBars(); // initial check

   // FORM VALIDATION + WHATSAPP SEND
const form = document.getElementById('contact-form');
const errorSpan = document.getElementById('form-error');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let errorMsg = '';

    if (name === '') {
        errorMsg = 'Name is required';
    } else if (email === '') {
        errorMsg = 'Email is required';
    } else if (!isValidEmail(email)) {
        errorMsg = 'Enter a valid email';
    } else if (message === '') {
        errorMsg = 'Message cannot be blank';
    }

    if (errorMsg) {
        errorSpan.textContent = errorMsg;
    } else {
        errorSpan.textContent = '';

        const phoneNumber = "2349154171123"; // PUT YOUR REAL NUMBER

        const text = `Hello,
Name: ${name}
Email: ${email}
Message: ${message}`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

        window.open(url, "_blank");

        form.reset();
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
   
});
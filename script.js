document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    function openMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (hamburger) hamburger.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ==========================================================================
       Typing Effect
       ========================================================================== */
    const typedTextSpan = document.querySelector(".typing-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Computer Science Student", "Website Developer", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    /* ==========================================================================
       Scroll Animations using Intersection Observer
       ========================================================================== */
    const animationElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animationElements.forEach(el => {
        observer.observe(el);
    });

    /* ==========================================================================
       Navbar Scroll Effect
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 28, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        } else {
            navbar.style.background = 'rgba(17, 24, 39, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    /* ==========================================================================
       Contact Form - Web3Forms Integration
       Form data is emailed to rsatti718@gmail.com via Web3Forms (free service).
       Setup: https://web3forms.com — sign up to get an access key, and replace
       'YOUR_ACCESS_KEY_HERE' below with your real key.
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const successMsg  = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const origHTML  = submitBtn.innerHTML;

            // --- Loading state ---
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
            submitBtn.disabled  = true;

            const accessKey = 'e16c6b2d-d21f-4174-846a-d70cb2ed92a4';

            const params = {
                name   : document.getElementById('name').value.trim(),
                email  : document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim(),
            };

            if (accessKey === 'YOUR_ACCESS_KEY_HERE') {
                // Mock success for local testing/preview if key is placeholder
                console.log('Form submission (Local Testing Mode - Web3Forms key not configured):', params);
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'none';
                    if (successMsg) successMsg.style.display = 'flex';
                }, 1000);
            } else {
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: accessKey,
                        ...params
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        contactForm.reset();
                        contactForm.style.display = 'none';
                        if (successMsg) successMsg.style.display = 'flex';
                    } else {
                        throw new Error(data.message || 'Submission failed');
                    }
                })
                .catch((error) => {
                    console.error('Submission error:', error);
                    submitBtn.innerHTML = origHTML;
                    submitBtn.disabled  = false;
                    // Show inline error without alert
                    const errEl = document.createElement('p');
                    errEl.className = 'form-error-msg';
                    errEl.textContent = '❌ Could not send message. Please email me directly at rsatti718@gmail.com';
                    contactForm.prepend(errEl);
                    setTimeout(() => errEl.remove(), 6000);
                });
            }
        });
    }
});


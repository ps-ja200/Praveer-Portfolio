document.addEventListener('DOMContentLoaded', (event) => {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < window.innerHeight - 50) {
                bar.style.width = bar.getAttribute('data-width');
            }
        });
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); 

    // Animate SVG circular progress for skills
    document.querySelectorAll('.skill-circle').forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent')) || 0;
        const progress = circle.querySelector('.progress');
        if (progress) {
            const radius = 28;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference * (1 - percent / 100);
            progress.style.strokeDasharray = `${circumference}`;
            setTimeout(() => {
                progress.style.strokeDashoffset = offset;
            }, 400);
        }
    });

    // Timeline animation for experience/education
    const timelineItems = document.querySelectorAll('.timeline-item');
    const animateTimeline = () => {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 60) {
                item.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', animateTimeline);
    animateTimeline();

    // Typewriter effect for hero text (if not handled by CSS only)
    const heroH2 = document.querySelector('.hero-text h2');
    if (heroH2 && heroH2.dataset.typewriter) {
        const text = heroH2.textContent;
        heroH2.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                heroH2.textContent += text.charAt(i);
                i++;
                setTimeout(type, 60);
            }
        }
        type();
    }

    // Section reveal on scroll
    function revealOnScroll() {
        document.querySelectorAll('.reveal, .slide-up, .slide-left, .slide-right').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('reveal-visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Modal accessibility: ESC closes, close button focusable, trap focus
    function trapFocus(modal) {
        const focusable = modal.querySelectorAll('a, button, textarea, input, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    function openModal(modalId) {
        document.body.style.overflow = 'hidden';
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        // Focus close button
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) closeBtn.focus();
        trapFocus(modal);
    }
    function closeModal() {
        document.body.style.overflow = '';
        document.querySelectorAll('.project-modal').forEach(m => m.classList.remove('active'));
    }
    document.querySelectorAll('.project-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = btn.closest('.project-card');
            const modalId = card.getAttribute('data-modal');
            if (modalId) openModal(modalId);
        });
    });
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeModal();
            }
        });
    });
    document.querySelectorAll('.project-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
    });
});



// Remove old contact form handler and add modular Firestore usage instructions
// The following code assumes you have imported Firestore in your HTML as per the latest Firebase modular SDK
// Example (add to your HTML):
// <script type="module">
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// window.db = db;
// </script>

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  try {
    // Use window.db set in the HTML module script
    const db = window.db;
    if (!db) throw new Error('Firestore not initialized.');
    const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js');
    await addDoc(collection(db, 'contacts'), data);
    alert('Message sent successfully!');
    contactForm.reset();
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error sending your message.');
  }
});

// Smooth scrolling for anchor links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});


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
    animateSkillBars(); // Initial check on page load
});


// Example of handling form submission with Firebase
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Send to Firebase
  firebase.firestore().collection('contacts').add(data)
    .then(() => alert('Message sent successfully!'))
    .catch((error) => console.error('Error:', error));
});


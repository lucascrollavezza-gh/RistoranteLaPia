document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    
    // Gestione Scroll Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (da implementare con overlay)
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        // Logica per apertura menu mobile
        console.log('Menu aperto');
    });

    // Lazy Loading per le immagini (Polyfill o nativo)
    const images = document.querySelectorAll('img');
    const observerOptions = {
        threshold: 0.1
    };

    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // img.src = img.dataset.src; // Se usassimo data-src
                imgObserver.unobserve(img);
            }
        });
    }, observerOptions);

    images.forEach(img => imgObserver.observe(img));
});

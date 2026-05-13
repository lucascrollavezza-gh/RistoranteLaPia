document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTIONE HEADER AL SCROLL ---
    const header = document.querySelector('.main-header');
    
    const handleHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeader);


    // --- 2. SMOOTH SCROLL PER I LINK INTERNI ---
    // Gestisce lo scorrimento dolce quando si clicca sul menu o sui bottoni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return; // Salta se è solo un cancelletto
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight, // Sottrae l'altezza dell'header per non coprire il titolo
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 3. ANIMAZIONI DI ENTRATA (INTERSECTION OBSERVER) ---
    // Prepara le sezioni aggiungendo la classe reveal
    const sectionsToReveal = document.querySelectorAll('section, .bio-image, .menu-category');
    sectionsToReveal.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Una volta visibile, smettiamo di osservare l'elemento
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // L'animazione parte quando il 15% dell'elemento è visibile
        rootMargin: "0px 0px -50px 0px" // Parte leggermente prima che entri del tutto nel viewport
    });

    sectionsToReveal.forEach(section => {
        revealOnScroll.observe(section);
    });

});

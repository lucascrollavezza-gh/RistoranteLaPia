document.addEventListener('DOMContentLoaded', () => {
    
    // --- GESTIONE HEADER ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- GENERAZIONE ORARI PRENOTAZIONE ---
    const timeSelect = document.getElementById('time');
    if (timeSelect) {
        for (let h = 19; h <= 22; h++) {
            for (let m = 0; m < 60; m += 15) {
                const time = `${h}:${m === 0 ? '00' : m}`;
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            }
        }
        // Aggiunge le 23:00 come ultimo orario
        const lastOption = document.createElement('option');
        lastOption.value = "23:00";
        lastOption.textContent = "23:00";
        timeSelect.appendChild(lastOption);
    }

    // --- CONTATORE PERSONE & POPUP ---
    const plusBtn = document.getElementById('plus');
    const minusBtn = document.getElementById('minus');
    const peopleInput = document.getElementById('people');
    const popup = document.getElementById('popup-overlay');
    const closePopup = document.getElementById('close-popup');

    if (plusBtn && minusBtn) {
        plusBtn.addEventListener('click', () => {
            let val = parseInt(peopleInput.value);
            if (val < 20) {
                peopleInput.value = val + 1;
            } else {
                popup.style.display = 'flex';
            }
        });

        minusBtn.addEventListener('click', () => {
            let val = parseInt(peopleInput.value);
            if (val > 1) peopleInput.value = val - 1;
        });

        closePopup.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    // --- ANIMAZIONI ALL'ENTRATA ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .bio-image, .review-card, .menu-category').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // --- INVIO FORM (SIMULAZIONE) ---
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Grazie! La tua richiesta di prenotazione è stata inviata. Ti contatteremo al più presto per confermare la disponibilità del tavolo.');
            form.reset();
            peopleInput.value = 2;
        });
    }
});

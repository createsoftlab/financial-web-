/* ==========================================================================
   Financial Web - Custom Interactive JavaScript (No 3rd Party Plugins)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Navbar scrolled state styling
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
    });

    // 2. Interactive Loan / Investment Calculator
    const loanAmountInput = document.getElementById('loanAmount');
    const loanTermInput = document.getElementById('loanTerm');
    const interestRateInput = document.getElementById('interestRate');
    
    const monthlyPaymentDisplay = document.getElementById('monthlyPayment');
    const totalPaymentDisplay = document.getElementById('totalPayment');

    function calculateFinance() {
        if (!loanAmountInput || !loanTermInput || !interestRateInput) return;

        const principal = parseFloat(loanAmountInput.value);
        const years = parseFloat(loanTermInput.value);
        const annualRate = parseFloat(interestRateInput.value);

        // Update displayed range values if corresponding spans exist
        const amtVal = document.getElementById('amountVal');
        const termVal = document.getElementById('termVal');
        const rateVal = document.getElementById('rateVal');
        
        if (amtVal) amtVal.innerText = '$' + principal.toLocaleString();
        if (termVal) termVal.innerText = years + ' Years';
        if (rateVal) rateVal.innerText = annualRate + '%';

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;

        if (monthlyRate === 0) {
            const monthly = principal / numberOfPayments;
            monthlyPaymentDisplay.innerText = '$' + monthly.toFixed(2);
            totalPaymentDisplay.innerText = '$' + principal.toFixed(2);
            return;
        }

        const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                               (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        const totalPayment = monthlyPayment * numberOfPayments;

        monthlyPaymentDisplay.innerText = '$' + monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        totalPaymentDisplay.innerText = '$' + totalPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    if (loanAmountInput && loanTermInput && interestRateInput) {
        loanAmountInput.addEventListener('input', calculateFinance);
        loanTermInput.addEventListener('input', calculateFinance);
        interestRateInput.addEventListener('input', calculateFinance);
        calculateFinance(); // Initial calculation on load
    }

    // 3. Contact Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const alertBox = document.getElementById('formAlert');
            
            // Basic simulation of success
            alertBox.classList.remove('d-none', 'alert-danger');
            alertBox.classList.add('alert-success');
            alertBox.innerText = 'Thank you! Your inquiry has been submitted successfully. Our finance team will contact you shortly.';
            contactForm.reset();

            setTimeout(() => {
                alertBox.classList.add('d-none');
            }, 6000);
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    
    // Navbar scrolled state handler (adds/removes .scrolled class)
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Run on load and on scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // ... rest of your calculator and form JS code remains the same ...
});



// 4. Scroll Reveal Animation Trigger using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => scrollObserver.observe(el));
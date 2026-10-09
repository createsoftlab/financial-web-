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







 // ==========================================
// Auto-calculating Progress Bars & Circular Metrics on Scroll Only
// ==========================================
const expertiseSection = document.querySelector('.expertise-section');

if (expertiseSection) {
    let animatedProgress = false;

    const expertiseObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Triggers when 20% of the section is visible on scroll
    };

    const expertiseObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedProgress) {
                animatedProgress = true;

                // 1. Animate Horizontal Bars & Percentages
                const progressBars = document.querySelectorAll('.custom-bar');
                const percentageTexts = document.querySelectorAll('.progress-percentage');

                progressBars.forEach((bar, index) => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;

                    const targetVal = parseInt(percentageTexts[index].getAttribute('data-target'));
                    let currentVal = 0;
                    const counter = setInterval(() => {
                        if (currentVal >= targetVal) {
                            clearInterval(counter);
                        } else {
                            currentVal++;
                            percentageTexts[index].innerText = currentVal + '%';
                        }
                    }, 1500 / targetVal);
                });

                // 2. Animate Circular Image Card Numbers
                const circularNumbers = document.querySelectorAll('.circular-number');
                circularNumbers.forEach(numEl => {
                    const target = parseInt(numEl.getAttribute('data-target'));
                    let current = 0;
                    const timer = setInterval(() => {
                        if (current >= target) {
                            clearInterval(timer);
                        } else {
                            current++;
                            numEl.innerText = current + '%';
                        }
                    }, 1500 / target);
                });

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, expertiseObserverOptions);

    expertiseObserver.observe(expertiseSection);
}



    // ==========================================
// Auto-calculating Stat Counters on Scroll Only
// ==========================================
const statCardElement = document.querySelector('.stat-card-modern');

if (statCardElement) {
    const statSection = statCardElement.closest('section') || statCardElement;
    let statAnimated = false;

    const statObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Triggers when 20% of the section is visible on scroll
    };

    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statAnimated) {
                statAnimated = true;

                const counters = document.querySelectorAll('.counter-number');
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const isDecimal = counter.getAttribute('data-decimal') === '1';
                    
                    let current = 0;
                    const steps = 40; // smoothness steps
                    const increment = target / steps;
                    const speed = 1500 / steps;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        
                        if (isDecimal) {
                            counter.innerText = current.toFixed(1) + suffix;
                        } else {
                            counter.innerText = Math.floor(current) + suffix;
                        }
                    }, speed);
                });

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, statObserverOptions);

    statObserver.observe(statSection);
}

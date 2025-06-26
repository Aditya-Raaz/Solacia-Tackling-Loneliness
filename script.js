
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Dynamic stats counter animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const finalValue = stat.textContent;
                        if (finalValue.includes('%')) {
                            animateNumber(stat, 0, parseInt(finalValue), '%');
                        } else if (finalValue.includes('M+')) {
                            animateNumber(stat, 0, parseInt(finalValue), 'M+');
                        } else if (finalValue.includes('/')) {
                            stat.textContent = finalValue; // Keep as is for 24/7
                        } else {
                            animateNumber(stat, 0, parseInt(finalValue), '');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stats').forEach(el => {
            statsObserver.observe(el);
        });

        function animateNumber(element, start, end, suffix) {
            const duration = 2000;
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(start + (end - start) * progress);
                element.textContent = currentValue + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            requestAnimationFrame(updateNumber);
        }

        // Interactive hover effects for cards
        document.querySelectorAll('.feature-card, .solution-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add floating animation delay to solution cards
        document.querySelectorAll('.solution-card.floating').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.3}s`;
        });
    
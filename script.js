// Enhanced Bilingual Website with Animations
class EnhancedDoctorWebsite {
    constructor() {
        this.currentLang = 'bn';
        this.init();
    }

    init() {
        this.setupLanguageSwitcher();
        this.updateAllText();
        this.setupAnimations();
        this.setupInteractiveFeatures();
        this.setupScrollAnimations();
        this.setupCopyFunctionality();
    }

    setupLanguageSwitcher() {
        const bnBtn = document.getElementById('langBn');
        const enBtn = document.getElementById('langEn');

        bnBtn.addEventListener('click', () => {
            this.switchLanguage('bn');
            this.updateActiveButton(bnBtn, enBtn);
            this.animateLanguageSwitch();
        });

        enBtn.addEventListener('click', () => {
            this.switchLanguage('en');
            this.updateActiveButton(enBtn, bnBtn);
            this.animateLanguageSwitch();
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        document.body.classList.toggle('english', lang === 'en');
        this.updateAllText();
        
        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Update meta information
        this.updateMetaInfo();
    }

    updateActiveButton(activeBtn, inactiveBtn) {
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
    }

    animateLanguageSwitch() {
        const mainContent = document.querySelector('main');
        mainContent.style.animation = 'none';
        setTimeout(() => {
            mainContent.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 10);
    }

    updateAllText() {
        const bilingualElements = document.querySelectorAll('.bilingual');
        
        bilingualElements.forEach(element => {
            const bnText = element.getAttribute('data-bn');
            const enText = element.getAttribute('data-en');
            
            if (this.currentLang === 'bn') {
                this.setTextContent(element, bnText);
            } else {
                this.setTextContent(element, enText);
            }
        });
    }

    setTextContent(element, text) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
            element.innerHTML = text;
        } else {
            // Handle HTML entities properly
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            element.textContent = tempDiv.textContent;
        }
    }

    updateMetaInfo() {
        // Update page title based on language
        const title = this.currentLang === 'bn' 
            ? 'ডাঃ মারজিয়া হোসেন মিতু - হোমিওপ্যাথিক বিশেষজ্ঞ' 
            : 'Dr. Marjia Hossan Mitu - Homeopathic Specialist';
        document.title = title;
    }

    setupAnimations() {
        // Add initial animations to elements
        this.animateOnLoad();
    }

    animateOnLoad() {
        const elements = document.querySelectorAll('.info-card, .section-header');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    if (entry.target.classList.contains('info-card')) {
                        entry.target.style.animation = 'fadeIn 0.8s ease-in-out';
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.info-card, .section-header, .treatment-category').forEach(element => {
            observer.observe(element);
        });
    }

    setupInteractiveFeatures() {
        this.setupPhoneCopy();
        this.setupWhatsAppTracking();
        this.setupSmoothScrolling();
        this.setupHoverEffects();
        this.loadSavedLanguage();
    }

    setupCopyFunctionality() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const phoneNumber = '01624342544';
                
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    this.showCopyFeedback(button);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    this.showCopyFeedback(button, false);
                });
            });
        });
    }

    showCopyFeedback(button, success = true) {
        const originalContent = button.innerHTML;
        const successText = this.currentLang === 'bn' ? 'কপি হয়েছে!' : 'Copied!';
        const errorText = this.currentLang === 'bn' ? 'ব্যর্থ!' : 'Failed!';
        
        button.innerHTML = success ? 
            `<i class="fas fa-check"></i> ${successText}` : 
            `<i class="fas fa-times"></i> ${errorText}`;
        
        button.style.background = success ? '#28a745' : '#dc3545';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '';
        }, 2000);
    }

    setupPhoneCopy() {
        const phoneElements = document.querySelectorAll('.phone-number');
        
        phoneElements.forEach(element => {
            element.style.cursor = 'pointer';
            element.title = this.currentLang === 'bn' ? 'ক্লিক করে কপি করুন' : 'Click to copy';
            
            element.addEventListener('click', () => {
                const phoneNumber = element.textContent.trim();
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    this.showToast(
                        this.currentLang === 'bn' ? 'ফোন নম্বর কপি করা হয়েছে!' : 'Phone number copied!',
                        'success'
                    );
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    this.showToast(
                        this.currentLang === 'bn' ? 'কপি করতে ব্যর্থ!' : 'Copy failed!',
                        'error'
                    );
                });
            });
        });
    }

    showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast-message toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-in-out;
            font-weight: 500;
        `;

        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease-in-out reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    setupWhatsAppTracking() {
        const whatsappLinks = document.querySelectorAll('.whatsapp-btn, .whatsapp-link');
        
        whatsappLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Analytics tracking can be added here
                console.log('WhatsApp contact initiated - Language:', this.currentLang);
                
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
            });
        });
    }

    setupSmoothScrolling() {
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
    }

    setupHoverEffects() {
        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .info-item, .treatment-category');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-2px)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && (savedLang === 'bn' || savedLang === 'en')) {
            this.switchLanguage(savedLang);
            this.updateActiveButton(
                document.getElementById(`lang${savedLang === 'bn' ? 'Bn' : 'En'}`),
                document.getElementById(`lang${savedLang === 'bn' ? 'En' : 'Bn'}`)
            );
        }
    }
}

// Utility functions
const WebsiteUtils = {
    // Format phone number for display
    formatPhoneNumber: (number) => {
        return number.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
    },

    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new EnhancedDoctorWebsite();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    // Add any additional initialization here
    console.log('Doctor website initialized successfully');
});

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .toast-message {
        font-family: inherit;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .loading {
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    .feature-highlight {
        position: relative;
    }
    
    .feature-highlight::after {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        border: 2px solid var(--accent-color);
        border-radius: inherit;
        opacity: 0;
        animation: highlightPulse 2s ease-in-out;
    }
    
    @keyframes highlightPulse {
        0%, 100% { opacity: 0; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.02); }
    }
`;
document.head.appendChild(additionalStyles);

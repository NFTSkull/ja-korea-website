// JavaScript mejorado con animaciones elegantes
document.addEventListener('DOMContentLoaded', function() {
    // Función para hacer elementos críticos visibles inmediatamente
    function makeCriticalElementsVisible() {
        const criticalElements = document.querySelectorAll('.hero-content, .section-header');
        criticalElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // Ejecutar inmediatamente para elementos críticos
    makeCriticalElementsVisible();

    // Intersection Observer para animaciones de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Animación especial para contadores
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animateElements = document.querySelectorAll('.service-credential, .equipment-card, .about-card, .stat-item, .contact-item, .section-header, .about-hero, .about-values, .about-stats, .about-locations, .services-container, .equipment-grid');
    
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Animación de contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Efectos de hover mejorados
    const cards = document.querySelectorAll('.service-credential, .equipment-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navegación suave mejorada
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Menú móvil mejorado
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animación de las barras del hamburger
            const bars = this.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (this.classList.contains('active')) {
                    bar.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                        index === 1 ? 'opacity(0)' :
                                        'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                }
            });
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                });
            });
        });
    }

    // Formulario de contacto mejorado
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación mejorada
            const formData = new FormData(this);
            let isValid = true;
            let message = '';
            
            // Validar campos requeridos
            const requiredFields = ['nombre', 'email', 'telefono', 'servicio'];
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                } else {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }
            });
            
            // Validar email
            const email = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value && !emailRegex.test(email.value)) {
                isValid = false;
                email.style.borderColor = '#ef4444';
                email.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            }
            
            if (isValid) {
                // Simular envío exitoso
                message = '¡Gracias por tu mensaje! Te contactaremos pronto.';
                showNotification(message, 'success');
                this.reset();
                
                // Resetear estilos
                this.querySelectorAll('input, textarea, select').forEach(input => {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                });
            } else {
                message = 'Por favor, completa todos los campos correctamente.';
                showNotification(message, 'error');
            }
        });

        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                    this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                } else {
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#10b981';
                    this.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }
            });
        });
    }

    // Sistema de notificaciones mejorado
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.4s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 5000);
    }

    // Efectos de partículas para el hero mejorado
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Crear partículas dinámicas
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 3}px;
                height: ${2 + Math.random() * 3}px;
                background: rgba(245, 158, 11, ${0.2 + Math.random() * 0.3});
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat ${8 + Math.random() * 12}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 1;
            `;
            hero.appendChild(particle);
        }
        
        // Crear elementos de brillo
        for (let i = 0; i < 5; i++) {
            const glow = document.createElement('div');
            glow.style.cssText = `
                position: absolute;
                width: ${50 + Math.random() * 100}px;
                height: ${50 + Math.random() * 100}px;
                background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                animation: glowFloat ${10 + Math.random() * 10}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 1;
            `;
            hero.appendChild(glow);
        }
    }

    // Animación de partículas flotantes
    function addParticleAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% { 
                    transform: translateY(0px) rotate(0deg); 
                    opacity: 0;
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { 
                    transform: translateY(-100vh) rotate(360deg); 
                    opacity: 0;
                }
            }
            
            @keyframes glowFloat {
                0%, 100% { 
                    transform: translate(0, 0) scale(1); 
                    opacity: 0.3;
                }
                50% { 
                    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.2); 
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Inicializar efectos del hero
    addParticleAnimation();
    createParticles();

    // Animaciones de texto del hero mejoradas
    function animateHeroText() {
        const titleElements = document.querySelectorAll('.hero-title-primary, .hero-title-secondary, .hero-title-accent');
        const subtitleElements = document.querySelectorAll('.hero-subtitle-main, .hero-subtitle-accent');
        const descriptionElements = document.querySelectorAll('.hero-description-main, .hero-description-location');
        
        // Animación escalonada para títulos con mejor timing
        titleElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(40px) scale(0.9)';
            
            setTimeout(() => {
                element.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }, 400 + (index * 300));
        });
        
        // Animación para subtítulos - sin movimiento en "Movimiento"
        subtitleElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateX(50px) scale(0.95)';
            
            setTimeout(() => {
                element.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateX(0) scale(1)';
            }, 1400 + (index * 200));
        });
        
        // Animación para descripción con efecto de línea
        descriptionElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px) scale(0.95)';
            
            setTimeout(() => {
                element.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }, 2000 + (index * 300));
        });
    }

    // Ejecutar animaciones del hero
    animateHeroText();

    // Efectos de scroll para el header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(55, 65, 81, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(55, 65, 81, 0.95)';
            header.style.backdropFilter = 'blur(5px)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animaciones de entrada para elementos específicos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
    
    // ===== FUNCIONALIDADES ESPECTACULARES PARA SERVICIOS =====
    
    // Animación de estadísticas de servicios
    function animateServiceStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const increment = target / 50;
                    let current = 0;
                    
                    const updateStat = () => {
                        if (current < target) {
                            current += increment;
                            entry.target.textContent = Math.ceil(current);
                            requestAnimationFrame(updateStat);
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    
                    updateStat();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    // Modal de detalles de servicio
    function showServiceDetails(serviceType) {
        const modal = document.getElementById('serviceModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const modalDescription = document.getElementById('modalDescription');
        const modalFeatures = document.getElementById('modalFeatures');
        const modalTime = document.getElementById('modalTime');
        const modalWarranty = document.getElementById('modalWarranty');
        const modalTeam = document.getElementById('modalTeam');
        
        // Datos de servicios
        const serviceData = {
            estructuras: {
                title: 'Estructuras Metálicas',
                image: 'Trabajador ensamblando estructura de acero.png',
                description: 'Fabricación e instalación de estructuras metálicas para proyectos industriales de gran envergadura. Nuestro equipo especializado garantiza calidad y durabilidad en cada proyecto.',
                features: [
                    'Fabricación de estructuras personalizadas',
                    'Instalación especializada con equipos de alta precisión',
                    'Soldadura industrial certificada',
                    'Control de calidad en cada etapa del proceso',
                    'Certificaciones de seguridad industrial',
                    'Mantenimiento preventivo incluido'
                ],
                time: '48h',
                warranty: '2 años',
                team: 'Ingenieros Especializados'
            },
            montacargas: {
                title: 'Montacargas',
                image: 'Montacargas.png',
                description: 'Renta, venta y maniobras con montacargas para carga y descarga de contenedores. Soluciones logísticas completas para tu empresa.',
                features: [
                    'Renta de montacargas de diferentes capacidades',
                    'Venta de equipos nuevos y seminuevos',
                    'Maniobras especializadas para carga pesada',
                    'Carga y descarga de contenedores',
                    'Servicio técnico 24/7',
                    'Capacitación de operadores incluida'
                ],
                time: '24h',
                warranty: '1 año',
                team: 'Operadores Certificados'
            },
            plataformas: {
                title: 'Plataformas Genie',
                image: 'Renta y Venta.png',
                description: 'Renta y venta de plataformas tipo Genie, incluyendo tijeras industriales. Acceso seguro a alturas para mantenimiento y construcción.',
                features: [
                    'Plataformas articuladas de alta calidad',
                    'Tijeras industriales para diferentes alturas',
                    'Equipos certificados de seguridad',
                    'Mantenimiento preventivo incluido',
                    'Capacitación de seguridad obligatoria',
                    'Respaldo técnico especializado'
                ],
                time: '12h',
                warranty: '1 año',
                team: 'Técnicos Especializados'
            }
        };
        
        const service = serviceData[serviceType];
        if (service) {
            modalTitle.textContent = service.title;
            modalImage.src = service.image;
            modalImage.alt = service.title;
            modalDescription.textContent = service.description;
            
            // Limpiar características anteriores
            modalFeatures.innerHTML = '';
            
            // Agregar nuevas características
            service.features.forEach(feature => {
                const featureDiv = document.createElement('div');
                featureDiv.className = 'feature-item';
                featureDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>${feature}</span>
                `;
                modalFeatures.appendChild(featureDiv);
            });
            
            modalTime.textContent = service.time;
            modalWarranty.textContent = service.warranty;
            modalTeam.textContent = service.team;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeServiceModal() {
        const modal = document.getElementById('serviceModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function contactService() {
        // Redirigir a la sección de contacto
        const contactSection = document.getElementById('contacto');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        closeServiceModal();
    }
    
    // Efectos de hover mejorados para servicios
    function enhanceServiceCards() {
        const serviceCards = document.querySelectorAll('.service-credential');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            });
        });
    }
    
    // Animación de elementos flotantes
    function animateFloatingElements() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // Efecto de partículas para servicios
    function createServiceParticles() {
        const servicesSection = document.querySelector('.services');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'service-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(245, 158, 11, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            servicesSection.appendChild(particle);
        }
    }
    
    // Inicializar funcionalidades espectaculares
    animateServiceStats();
    enhanceServiceCards();
    animateFloatingElements();
    createServiceParticles();
    
    // Hacer funciones globales para el modal
    window.showServiceDetails = showServiceDetails;
    window.closeServiceModal = closeServiceModal;
    window.contactService = contactService;
}); 
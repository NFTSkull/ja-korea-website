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
    
    // ===== FUNCIONALIDAD DE CAMBIO DE IDIOMA =====
    
    // Diccionario de traducciones completo
    const translations = {
        es: {
            // Navegación
            'inicio': 'Inicio',
            'nosotros': 'Nosotros',
            'servicios': 'Servicios',
            'equipos': 'Equipos',
            'contacto': 'Contacto',
            
            // Hero
            'hero_title_1': 'La opción inteligente',
            'hero_title_2': 'para tus proyectos',
            'hero_subtitle_1': 'en todo',
            'hero_subtitle_2': 'México y el extranjero',
            'hero_description': 'Especialistas en fabricación e instalación de estructuras metálicas, conveyors, mantenimiento industrial, servicios de ingeniería, renta y venta de maquinaria pesada y maniobras.',
            
            // Botones
            'cotiza_con_nosotros': 'Cotiza con nosotros',
            'conoce_nuestros_servicios': 'Conoce nuestros servicios',
            
            // Secciones
            'about_title': 'Nosotros',
            'about_subtitle': 'Conoce nuestra historia y compromiso con la excelencia industrial',
            'about_history': 'Nuestra Historia',
            'about_mission': 'Misión',
            'about_vision': 'Visión',
            'about_values': 'Valores',
            
            // About Section
            'about_history_text': 'J&A KOREA S.A. de C.V. nació con la visión de convertirse en un referente en el sector industrial mexicano. Con años de experiencia en el mercado, hemos desarrollado soluciones integrales que satisfacen las necesidades más exigentes de nuestros clientes.',
            'about_expansion_text': 'Desde nuestros inicios en el área metropolitana de Nuevo León, hemos expandido nuestros servicios para incluir estructuras metálicas, montacargas, plataformas Genie, mantenimiento industrial y maniobras especializadas.',
            'mission_text': 'Proporcionar la opción inteligente para tus proyectos que impulse el crecimiento y la eficiencia de nuestros clientes, manteniendo los más altos estándares de calidad y seguridad.',
            'vision_text': 'Ser reconocidos como el socio estratégico preferido en soluciones industriales, liderando la innovación y el desarrollo sostenible en el sector.',
            'values_list_1': 'Excelencia en todo lo que hacemos',
            'values_list_2': 'Integridad y transparencia',
            'values_list_3': 'Innovación constante',
            'values_list_4': 'Compromiso con el cliente',
            
            // Estadísticas
            'years_experience': 'Años de Experiencia',
            'projects_completed': 'Proyectos Realizados',
            'satisfied_clients': 'Clientes Satisfechos',
            'quality_commitment': 'Compromiso con la Calidad',
            
            // Zonas de Operación
            'operation_zones': 'Zonas de Operación',
            'metro_area': 'Área Metropolitana',
            'main_operations': 'Centro de operaciones principal',
            'nuevo_leon': 'Nuevo León',
            'industrial_expansion': 'Zona de expansión industrial',
            'international_expansion': 'Expansión Internacional',
            'projects_development': 'Proyectos en desarrollo',
            
            // Servicios
            'services_title': 'Nuestros Servicios',
            'services_subtitle': 'La opción inteligente para tus proyectos',
            'specialized_services': 'Servicios Especializados',
            'completed_projects': 'Proyectos Realizados',
            'response_hours': 'Horas de Respuesta',
            
            // Servicios específicos
            'metal_structures': 'Estructuras Metálicas',
            'metal_structures_desc': 'Fabricación e instalación de estructuras metálicas para proyectos industriales de gran envergadura.',
            'forklifts': 'Montacargas',
            'forklifts_desc': 'Renta, venta y maniobras con montacargas para carga y descarga de contenedores.',
            'genie_platforms': 'Plataformas Genie',
            'genie_platforms_desc': 'Renta y venta de plataformas tipo Genie, incluyendo tijeras industriales.',
            'industrial_maintenance': 'Mantenimiento Industrial',
            'industrial_maintenance_desc': 'Mantenimiento de dollys, rodamientos, maquinaria etc...',
            'civil_works': 'Obra Civil',
            'civil_works_desc': 'Construcción y urbanización de proyectos industriales con los más altos estándares.',
            'electromechanical': 'Electromecánica',
            'electromechanical_desc': 'Instalaciones eléctricas y sistemas de automatización para optimizar procesos.',
            'specialized_maintenance': 'Mantenimiento Especializado',
            'specialized_maintenance_desc': 'Servicios de ingeniería y mantenimiento integral de equipos industriales críticos.',
            'global_services': 'Servicios Globales',
            'global_services_desc': 'Ampliamos nuestros servicios a cualquier parte del mundo con presencia internacional.',
            'industrial_recruitment': 'Reclutamiento Industrial',
            'industrial_recruitment_desc': 'Encontramos el talento especializado que tu empresa necesita para crecer.',
            'industrial_parts': 'Venta de Refacciones Industriales',
            'industrial_parts_desc': 'Venta de refacciones y accesorios de equipo industrial desde cualquier parte del mundo.',
            'personal_transport': 'Transporte de Personal',
            'personal_transport_desc': 'Servicio de transporte especializado para personal industrial y ejecutivo.',
            
            // Características de servicios
            'structure_fabrication': 'Fabricación de estructuras',
            'specialized_installation': 'Instalación especializada',
            'industrial_welding': 'Soldadura industrial',
            'quality_control': 'Control de calidad',
            'forklift_rental': 'Renta de montacargas',
            'equipment_sales': 'Venta de equipos',
            'specialized_maneuvers': 'Maniobras especializadas',
            'loading_unloading': 'Carga y descarga',
            'articulated_platforms': 'Plataformas articuladas',
            'industrial_scissors': 'Tijeras industriales',
            'different_heights': 'Diferentes alturas',
            'included_maintenance': 'Mantenimiento incluido',
            'dolly_maintenance': 'Mantenimiento de dollys',
            'industrial_machinery': 'Maquinaria industrial',
            'preventive_service': 'Servicio preventivo',
            'urgent_repairs': 'Reparaciones urgentes',
            'industrial_construction': 'Construcción industrial',
            'urbanization': 'Urbanización',
            'infrastructure': 'Infraestructura',
            'project_management': 'Gestión de proyectos',
            'electrical_installations': 'Instalaciones eléctricas',
            'industrial_automation': 'Automatización industrial',
            'control_systems': 'Sistemas de control',
            'energy_efficiency': 'Eficiencia energética',
            'dolly_hanger_maintenance': 'Mantenimiento de Dollys, Hangers etc..',
            'specialized_engineering': 'Servicios de ingeniería especializada',
            'industrial_parts_sales': 'Venta de refacciones industriales',
            'conveyor_installation': 'Instalación de conveyors',
            'worldwide_service': 'Servicio a cualquier parte del mundo',
            'foreign_business': 'Negocios en el extranjero',
            'international_logistics': 'Logística internacional',
            'global_consulting': 'Consultoría global',
            'technical_recruitment': 'Reclutamiento de personal técnico',
            'engineer_selection': 'Selección de ingenieros especializados',
            'operational_personnel': 'Personal operativo industrial',
            'hr_consulting': 'Consultoría en recursos humanos',
            'industrial_parts': 'Refacciones industriales',
            'equipment_accessories': 'Accesorios de equipos',
            'worldwide_shipping': 'Envío desde cualquier parte del mundo',
            'complete_catalog': 'Catálogo completo de repuestos',
            'industrial_personnel_transport': 'Transporte de personal industrial',
            'executive_service': 'Servicio ejecutivo',
            'custom_routes': 'Rutas personalizadas',
            'flexible_hours': 'Horarios flexibles',
            
            // Equipos
            'equipment_rental_sales': 'Renta y Venta de Equipos',
            'equipment_catalog': 'Catálogo de equipos industriales disponibles para renta y venta',
            'different_capacities': 'Montacargas de diferentes capacidades para uso industrial y logístico.',
            'capacity': 'Capacidad',
            'height': 'Altura',
            'fuel': 'Combustible',
            'service': 'Servicio',
            'equipment_type': 'Tipo',
            'availability': 'Disponibilidad',
            'zone': 'Zona',
            'up_to_15_tons': 'Hasta 15 toneladas',
            'up_to_10_meters': 'Hasta 10 metros',
            'gasoline_diesel_electric': 'Gasolina/Diesel/Eléctrico',
            'rent_sale_maneuvers': 'Renta, Venta y Maniobras',
            'up_to_20_meters': 'Hasta 20 metros',
            'up_to_300_kg': 'Hasta 300 kg',
            'articulated_scissors': 'Articulada/Tijera',
            'rent_sale': 'Renta y Venta',
            'preventive_maintenance': 'Mantenimiento Preventivo',
            'dollys_machinery': 'Dollys, Rodamientos, Maquinaria etc...',
            'area_metropolitana': 'Área Metropolitana',
            'quick_quote': 'Cotización Rápida',
            'request_service': 'Solicitar Servicio',
            
            // Contacto
            'contact_title': 'Contacto',
            'contact_subtitle': 'Trabaja con expertos industriales',
            'locations': 'Ubicaciones',
            'whatsapp': 'WhatsApp',
            'phone': 'Teléfono',
            'email': 'Email',
            'operation_zones_contact': 'Zonas de Operación',
            'full_name': 'Nombre completo',
            'email_address': 'Correo electrónico',
            'phone_number': 'Teléfono',
            'select_service': 'Selecciona un servicio',
            'describe_project': 'Describe tu proyecto o consulta',
            'send_message': 'Enviar Mensaje',
            
            // Footer
            'copyright': 'Todos los derechos reservados.',
            'privacy': 'Aviso de Privacidad',
            'terms': 'Términos y Condiciones',
            'footer_description': 'La opción inteligente para tus proyectos y el crecimiento de tu empresa.',
            'footer_services': 'Servicios',
            'footer_company': 'Empresa',
            'footer_contact': 'Contacto',
            'footer_metal_structures': 'Estructuras Metálicas',
            'footer_forklifts': 'Montacargas',
            'footer_genie_platforms': 'Plataformas Genie',
            'footer_industrial_maintenance': 'Mantenimiento Industrial',
            'footer_civil_works': 'Obra Civil',
            'footer_electromechanical': 'Electromecánica',
            'footer_about': 'Nosotros',
            'footer_contact_link': 'Contacto',
            'footer_location': 'Área Metropolitana, N.L.'
        },
        en: {
            // Navigation
            'inicio': 'Home',
            'nosotros': 'About',
            'servicios': 'Services',
            'equipos': 'Equipment',
            'contacto': 'Contact',
            
            // Hero
            'hero_title_1': 'The Smart Option',
            'hero_title_2': 'for your projects',
            'hero_subtitle_1': 'throughout',
            'hero_subtitle_2': 'Mexico and abroad',
            'hero_description': 'Specialists in manufacturing and installation of metal structures, conveyors, industrial maintenance, engineering services, rental and sale of heavy machinery and maneuvers.',
            
            // Buttons
            'cotiza_con_nosotros': 'Get Quote',
            'conoce_nuestros_servicios': 'Learn about our services',
            
            // Sections
            'about_title': 'About Us',
            'about_subtitle': 'Learn about our history and commitment to industrial excellence',
            'about_history': 'Our History',
            'about_mission': 'Mission',
            'about_vision': 'Vision',
            'about_values': 'Values',
            
            // About Section
            'about_history_text': 'J&A KOREA S.A. de C.V. was born with the vision of becoming a reference in the Mexican industrial sector. With years of market experience, we have developed comprehensive solutions that meet the most demanding needs of our clients.',
            'about_expansion_text': 'Since our beginnings in the metropolitan area of Nuevo León, we have expanded our services to include metal structures, forklifts, Genie platforms, industrial maintenance and specialized maneuvers.',
            'mission_text': 'Provide the intelligent option for your projects that drives growth and efficiency of our clients, maintaining the highest standards of quality and safety.',
            'vision_text': 'To be recognized as the preferred strategic partner in industrial solutions, leading innovation and sustainable development in the sector.',
            'values_list_1': 'Excellence in everything we do',
            'values_list_2': 'Integrity and transparency',
            'values_list_3': 'Constant innovation',
            'values_list_4': 'Commitment to the client',
            
            // Statistics
            'years_experience': 'Years of Experience',
            'projects_completed': 'Projects Completed',
            'satisfied_clients': 'Satisfied Clients',
            'quality_commitment': 'Quality Commitment',
            
            // Operation Zones
            'operation_zones': 'Operation Zones',
            'metro_area': 'Metropolitan Area',
            'main_operations': 'Main operations center',
            'nuevo_leon': 'Nuevo León',
            'industrial_expansion': 'Industrial expansion zone',
            'international_expansion': 'International Expansion',
            'projects_development': 'Projects in development',
            
            // Services
            'services_title': 'OUR Services',
            'services_subtitle': 'Comprehensive solutions for all your industrial needs',
            'specialized_services': 'Specialized Services',
            'completed_projects': 'Projects Completed',
            'response_hours': 'Response Hours',
            
            // Specific Services
            'metal_structures': 'Metal Structures',
            'metal_structures_desc': 'Manufacturing and installation of metal structures for large-scale industrial projects.',
            'forklifts': 'Forklifts',
            'forklifts_desc': 'Rental, sale and maneuvers with forklifts for loading and unloading containers.',
            'genie_platforms': 'Genie Platforms',
            'genie_platforms_desc': 'Rental and sale of Genie-type platforms, including industrial scissors.',
            'industrial_maintenance': 'Industrial Maintenance',
            'industrial_maintenance_desc': 'Maintenance of dollies, bearings, machinery etc...',
            'civil_works': 'Civil Works',
            'civil_works_desc': 'Construction and urbanization of industrial projects with the highest standards.',
            'electromechanical': 'Electromechanical',
            'electromechanical_desc': 'Electrical installations and automation systems to optimize processes.',
            'specialized_maintenance': 'Specialized Maintenance',
            'specialized_maintenance_desc': 'Engineering services and comprehensive maintenance of critical industrial equipment.',
            'global_services': 'Global Services',
            'global_services_desc': 'We expand our services to any part of the world with international presence.',
            'industrial_recruitment': 'Industrial Recruitment',
            'industrial_recruitment_desc': 'We find the specialized talent your company needs to grow.',
            'industrial_parts': 'Industrial Parts Sales',
            'industrial_parts_desc': 'Sale of industrial equipment parts and accessories from anywhere in the world.',
            'personal_transport': 'Personal Transport',
            'personal_transport_desc': 'Specialized transportation service for industrial and executive personnel.',
            
            // Service Features
            'structure_fabrication': 'Structure fabrication',
            'specialized_installation': 'Specialized installation',
            'industrial_welding': 'Industrial welding',
            'quality_control': 'Quality control',
            'forklift_rental': 'Forklift rental',
            'equipment_sales': 'Equipment sales',
            'specialized_maneuvers': 'Specialized maneuvers',
            'loading_unloading': 'Loading and unloading',
            'articulated_platforms': 'Articulated platforms',
            'industrial_scissors': 'Industrial scissors',
            'different_heights': 'Different heights',
            'included_maintenance': 'Included maintenance',
            'dolly_maintenance': 'Dolly maintenance',
            'industrial_machinery': 'Industrial machinery',
            'preventive_service': 'Preventive service',
            'urgent_repairs': 'Urgent repairs',
            'industrial_construction': 'Industrial construction',
            'urbanization': 'Urbanization',
            'infrastructure': 'Infrastructure',
            'project_management': 'Project management',
            'electrical_installations': 'Electrical installations',
            'industrial_automation': 'Industrial automation',
            'control_systems': 'Control systems',
            'energy_efficiency': 'Energy efficiency',
            'dolly_hanger_maintenance': 'Maintenance of Dollies, Hangers etc..',
            'specialized_engineering': 'Specialized engineering services',
            'industrial_parts_sales': 'Industrial parts sales',
            'conveyor_installation': 'Conveyor installation',
            'worldwide_service': 'Service to any part of the world',
            'foreign_business': 'Foreign business',
            'international_logistics': 'International logistics',
            'global_consulting': 'Global consulting',
            'technical_recruitment': 'Technical personnel recruitment',
            'engineer_selection': 'Specialized engineer selection',
            'operational_personnel': 'Industrial operational personnel',
            'hr_consulting': 'Human resources consulting',
            'industrial_parts': 'Industrial parts',
            'equipment_accessories': 'Equipment accessories',
            'worldwide_shipping': 'Shipping from anywhere in the world',
            'complete_catalog': 'Complete spare parts catalog',
            'industrial_personnel_transport': 'Industrial personnel transport',
            'executive_service': 'Executive service',
            'custom_routes': 'Custom routes',
            'flexible_hours': 'Flexible hours',
            
            // Equipment
            'equipment_rental_sales': 'Equipment Rental and Sales',
            'equipment_catalog': 'Catalog of industrial equipment available for rental and sale',
            'different_capacities': 'Forklifts of different capacities for industrial and logistics use.',
            'capacity': 'Capacity',
            'height': 'Height',
            'fuel': 'Fuel',
            'service': 'Service',
            'equipment_type': 'Type',
            'availability': 'Availability',
            'zone': 'Zone',
            'up_to_15_tons': 'Up to 15 tons',
            'up_to_10_meters': 'Up to 10 meters',
            'gasoline_diesel_electric': 'Gasoline/Diesel/Electric',
            'rent_sale_maneuvers': 'Rent, Sale and Maneuvers',
            'up_to_20_meters': 'Up to 20 meters',
            'up_to_300_kg': 'Up to 300 kg',
            'articulated_scissors': 'Articulated/Scissors',
            'rent_sale': 'Rent and Sale',
            'preventive_maintenance': 'Preventive Maintenance',
            'dollys_machinery': 'Dollies, Bearings, Machinery etc...',
            'area_metropolitana': 'Metropolitan Area',
            'quick_quote': 'Quick Quote',
            'request_service': 'Request Service',
            
            // Contact
            'contact_title': 'Contact',
            'contact_subtitle': 'Work with industrial experts',
            'locations': 'Locations',
            'whatsapp': 'WhatsApp',
            'phone': 'Phone',
            'email': 'Email',
            'operation_zones_contact': 'Operation Zones',
            'full_name': 'Full name',
            'email_address': 'Email address',
            'phone_number': 'Phone number',
            'select_service': 'Select a service',
            'describe_project': 'Describe your project or inquiry',
            'send_message': 'Send Message',
            
            // Footer
            'copyright': 'All rights reserved.',
            'privacy': 'Privacy Policy',
            'terms': 'Terms and Conditions',
            'footer_description': 'The intelligent option for your projects and your company\'s growth.',
            'footer_services': 'Services',
            'footer_company': 'Company',
            'footer_contact': 'Contact',
            'footer_metal_structures': 'Metal Structures',
            'footer_forklifts': 'Forklifts',
            'footer_genie_platforms': 'Genie Platforms',
            'footer_industrial_maintenance': 'Industrial Maintenance',
            'footer_civil_works': 'Civil Works',
            'footer_electromechanical': 'Electromechanical',
            'footer_about': 'About',
            'footer_contact_link': 'Contact',
            'footer_location': 'Metropolitan Area, N.L.'
        },
        ko: {
            // 네비게이션
            'inicio': '홈',
            'nosotros': '회사소개',
            'servicios': '서비스',
            'equipos': '장비',
            'contacto': '연락처',
            
            // 히어로
            'hero_title_1': '스마트 옵션',
            'hero_title_2': '프로젝트를 위한',
            'hero_subtitle_1': '멕시코 전역과',
            'hero_subtitle_2': '해외에서',
            'hero_description': '금속 구조물 제조 및 설치, 컨베이어, 산업 유지보수, 엔지니어링 서비스, 중장비 임대 및 판매, 기동 작업 전문가.',
            
            // 버튼
            'cotiza_con_nosotros': '견적 요청',
            'conoce_nuestros_servicios': '서비스 알아보기',
            
            // 섹션
            'about_title': '회사소개',
            'about_subtitle': '우리의 역사와 산업 우수성에 대한 약속을 알아보세요',
            'about_history': '우리의 역사',
            'about_mission': '미션',
            'about_vision': '비전',
            'about_values': '가치',
            
            // About Section
            'about_history_text': 'J&A KOREA S.A. de C.V.는 멕시코 산업계의 선도자가 되겠다는 비전으로 탄생했습니다. 수년간의 시장 경험을 바탕으로 고객의 가장 까다로운 요구를 충족하는 종합 솔루션을 개발했습니다.',
            'about_expansion_text': '누에보 레온 대도시권에서 시작하여 금속 구조물, 지게차, 지니 플랫폼, 산업 유지보수 및 전문 기동 작업을 포함한 서비스를 확장했습니다.',
            'mission_text': '최고의 품질과 안전 기준을 유지하면서 고객의 성장과 효율성을 촉진하는 프로젝트를 위한 지능형 옵션을 제공합니다.',
            'vision_text': '혁신과 지속 가능한 개발을 주도하는 산업 솔루션의 선호 전략 파트너로 인정받는 것입니다.',
            'values_list_1': '우리가 하는 모든 일에서 탁월함',
            'values_list_2': '정직과 투명성',
            'values_list_3': '지속적인 혁신',
            'values_list_4': '고객에 대한 약속',
            
            // 통계
            'years_experience': '경험 연수',
            'projects_completed': '완료된 프로젝트',
            'satisfied_clients': '만족한 고객',
            'quality_commitment': '품질 약속',
            
            // 운영 지역
            'operation_zones': '운영 지역',
            'metro_area': '대도시권',
            'main_operations': '주요 운영 센터',
            'nuevo_leon': '누에보 레온',
            'industrial_expansion': '산업 확장 지역',
            'international_expansion': '국제 확장',
            'projects_development': '개발 중인 프로젝트',
            
            // 서비스
            'services_title': '우리의 서비스',
            'services_subtitle': '모든 산업적 요구에 대한 종합 솔루션',
            'specialized_services': '전문 서비스',
            'completed_projects': '완료된 프로젝트',
            'response_hours': '응답 시간',
            
            // 특정 서비스
            'metal_structures': '금속 구조물',
            'metal_structures_desc': '대규모 산업 프로젝트를 위한 금속 구조물 제조 및 설치.',
            'forklifts': '지게차',
            'forklifts_desc': '컨테이너 적재 및 하역을 위한 지게차 임대, 판매 및 기동 작업.',
            'genie_platforms': '지니 플랫폼',
            'genie_platforms_desc': '산업용 가위를 포함한 지니형 플랫폼 임대 및 판매.',
            'industrial_maintenance': '산업 유지보수',
            'industrial_maintenance_desc': '돌리, 베어링, 기계류 등 유지보수.',
            'civil_works': '토목 공사',
            'civil_works_desc': '최고 기준의 산업 프로젝트 건설 및 도시화.',
            'electromechanical': '전기기계',
            'electromechanical_desc': '프로세스 최적화를 위한 전기 설치 및 자동화 시스템.',
            'specialized_maintenance': '전문 유지보수',
            'specialized_maintenance_desc': '중요 산업 장비의 엔지니어링 서비스 및 종합 유지보수.',
            'global_services': '글로벌 서비스',
            'global_services_desc': '국제적 존재감으로 세계 어느 곳에서나 서비스를 확장합니다.',
            'industrial_recruitment': '산업 채용',
            'industrial_recruitment_desc': '회사 성장에 필요한 전문 인재를 찾아드립니다.',
            'industrial_parts': '산업 부품 판매',
            'industrial_parts_desc': '세계 어디서나 산업 장비 부품 및 액세서리 판매.',
            'personal_transport': '인력 운송',
            'personal_transport_desc': '산업 및 경영진을 위한 전문 운송 서비스.',
            
            // 서비스 특징
            'structure_fabrication': '구조물 제조',
            'specialized_installation': '전문 설치',
            'industrial_welding': '산업용 용접',
            'quality_control': '품질 관리',
            'forklift_rental': '지게차 임대',
            'equipment_sales': '장비 판매',
            'specialized_maneuvers': '전문 기동 작업',
            'loading_unloading': '적재 및 하역',
            'articulated_platforms': '관절식 플랫폼',
            'industrial_scissors': '산업용 가위',
            'different_heights': '다양한 높이',
            'included_maintenance': '포함된 유지보수',
            'dolly_maintenance': '돌리 유지보수',
            'industrial_machinery': '산업 기계',
            'preventive_service': '예방 서비스',
            'urgent_repairs': '긴급 수리',
            'industrial_construction': '산업 건설',
            'urbanization': '도시화',
            'infrastructure': '인프라',
            'project_management': '프로젝트 관리',
            'electrical_installations': '전기 설치',
            'industrial_automation': '산업 자동화',
            'control_systems': '제어 시스템',
            'energy_efficiency': '에너지 효율성',
            'dolly_hanger_maintenance': '돌리, 행거 등 유지보수',
            'specialized_engineering': '전문 엔지니어링 서비스',
            'industrial_parts_sales': '산업 부품 판매',
            'conveyor_installation': '컨베이어 설치',
            'worldwide_service': '세계 어느 곳에서나 서비스',
            'foreign_business': '해외 사업',
            'international_logistics': '국제 물류',
            'global_consulting': '글로벌 컨설팅',
            'technical_recruitment': '기술 인력 채용',
            'engineer_selection': '전문 엔지니어 선발',
            'operational_personnel': '산업 운영 인력',
            'hr_consulting': '인사 컨설팅',
            'industrial_parts': '산업 부품',
            'equipment_accessories': '장비 액세서리',
            'worldwide_shipping': '세계 어디서나 배송',
            'complete_catalog': '완전한 예비 부품 카탈로그',
            'industrial_personnel_transport': '산업 인력 운송',
            'executive_service': '경영진 서비스',
            'custom_routes': '맞춤형 경로',
            'flexible_hours': '유연한 시간',
            
            // 장비
            'equipment_rental_sales': '장비 임대 및 판매',
            'equipment_catalog': '임대 및 판매 가능한 산업 장비 카탈로그',
            'different_capacities': '산업 및 물류용 다양한 용량의 지게차.',
            'capacity': '용량',
            'height': '높이',
            'fuel': '연료',
            'service': '서비스',
            'equipment_type': '유형',
            'availability': '가용성',
            'zone': '지역',
            'up_to_15_tons': '최대 15톤',
            'up_to_10_meters': '최대 10미터',
            'gasoline_diesel_electric': '가솔린/디젤/전기',
            'rent_sale_maneuvers': '임대, 판매 및 기동 작업',
            'up_to_20_meters': '최대 20미터',
            'up_to_300_kg': '최대 300kg',
            'articulated_scissors': '관절식/가위식',
            'rent_sale': '임대 및 판매',
            'preventive_maintenance': '예방 유지보수',
            'dollys_machinery': '돌리, 베어링, 기계류 등',
            'area_metropolitana': '대도시권',
            'quick_quote': '빠른 견적',
            'request_service': '서비스 요청',
            
            // 연락처
            'contact_title': '연락처',
            'contact_subtitle': '산업 전문가와 함께 일하세요',
            'locations': '위치',
            'whatsapp': '왓츠앱',
            'phone': '전화',
            'email': '이메일',
            'operation_zones_contact': '운영 지역',
            'full_name': '전체 이름',
            'email_address': '이메일 주소',
            'phone_number': '전화번호',
            'select_service': '서비스 선택',
            'describe_project': '프로젝트 또는 문의사항 설명',
            'send_message': '메시지 보내기',
            
            // 푸터
            'copyright': '모든 권리 보유.',
            'privacy': '개인정보처리방침',
            'terms': '이용약관',
            'footer_description': '프로젝트와 회사 성장을 위한 지능형 옵션.',
            'footer_services': '서비스',
            'footer_company': '회사',
            'footer_contact': '연락처',
            'footer_metal_structures': '금속 구조물',
            'footer_forklifts': '지게차',
            'footer_genie_platforms': '지니 플랫폼',
            'footer_industrial_maintenance': '산업 유지보수',
            'footer_civil_works': '토목 공사',
            'footer_electromechanical': '전기기계',
            'footer_about': '회사소개',
            'footer_contact_link': '연락처',
            'footer_location': '대도시권, 누에보 레온'
        }
    };
    
    // Función para cambiar idioma
    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-lang]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Actualizar elementos específicos
        updateSpecificElements(lang);
        
        // Guardar preferencia de idioma
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Función para actualizar elementos específicos
    function updateSpecificElements(lang) {
        const currentLang = translations[lang];
        if (!currentLang) return;
        
        // Actualizar elementos del hero
        const heroTitle1 = document.querySelector('.hero-title-primary');
        const heroTitle2 = document.querySelector('.hero-title-secondary');
        const heroTitle3 = document.querySelector('.hero-title-accent');
        const heroSubtitle1 = document.querySelector('.hero-subtitle-main');
        const heroSubtitle2 = document.querySelector('.hero-subtitle-accent');
        const heroDescription = document.querySelector('.hero-description-main');
        
        if (heroTitle1) heroTitle1.textContent = currentLang.hero_title_1;
        if (heroTitle2) heroTitle2.textContent = currentLang.hero_title_2;

        if (heroSubtitle1) heroSubtitle1.textContent = currentLang.hero_subtitle_1;
        if (heroSubtitle2) heroSubtitle2.textContent = currentLang.hero_subtitle_2;
        if (heroDescription) heroDescription.textContent = currentLang.hero_description;
        
        // Actualizar botones del hero
        const btnPrimary = document.querySelector('.btn-primary .btn-text');
        const btnSecondary = document.querySelector('.btn-secondary .btn-text');
        
        if (btnPrimary) btnPrimary.textContent = currentLang.cotiza_con_nosotros;
        if (btnSecondary) btnSecondary.textContent = currentLang.conoce_nuestros_servicios;
        
        // Actualizar sección About
        const aboutTitle = document.querySelector('#nosotros .section-header h2');
        const aboutSubtitle = document.querySelector('#nosotros .section-header p');
        const aboutHistoryTitle = document.querySelector('#nosotros .about-hero-text h3');
        const aboutHistoryText = document.querySelector('#nosotros .about-hero-text p:first-of-type');
        const aboutExpansionText = document.querySelector('#nosotros .about-hero-text p:last-of-type');
        
        if (aboutTitle) aboutTitle.textContent = currentLang.about_title;
        if (aboutSubtitle) aboutSubtitle.textContent = currentLang.about_subtitle;
        if (aboutHistoryTitle) aboutHistoryTitle.textContent = currentLang.about_history;
        if (aboutHistoryText) aboutHistoryText.textContent = currentLang.about_history_text;
        if (aboutExpansionText) aboutExpansionText.textContent = currentLang.about_expansion_text;
        
        // Actualizar valores (Misión, Visión, Valores)
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const content = card.querySelector('p');
            const list = card.querySelector('ul');
            
            if (index === 0 && title) title.textContent = currentLang.about_mission;
            if (index === 1 && title) title.textContent = currentLang.about_vision;
            if (index === 2 && title) title.textContent = currentLang.about_values;
            
            if (index === 0 && content) content.textContent = currentLang.mission_text;
            if (index === 1 && content) content.textContent = currentLang.vision_text;
            
            if (index === 2 && list) {
                const listItems = list.querySelectorAll('li');
                if (listItems[0]) listItems[0].textContent = currentLang.values_list_1;
                if (listItems[1]) listItems[1].textContent = currentLang.values_list_2;
                if (listItems[2]) listItems[2].textContent = currentLang.values_list_3;
                if (listItems[3]) listItems[3].textContent = currentLang.values_list_4;
            }
        });
        
        // Actualizar estadísticas
        const statItems = document.querySelectorAll('.stat-item p');
        if (statItems[0]) statItems[0].textContent = currentLang.years_experience;
        if (statItems[1]) statItems[1].textContent = currentLang.projects_completed;
        if (statItems[2]) statItems[2].textContent = currentLang.satisfied_clients;
        if (statItems[3]) statItems[3].textContent = currentLang.quality_commitment;
        
        // Actualizar zonas de operación
        const operationZonesTitle = document.querySelector('.about-locations h3');
        const locationCards = document.querySelectorAll('.location-card');
        
        if (operationZonesTitle) operationZonesTitle.textContent = currentLang.operation_zones;
        
        if (locationCards[0]) {
            const title1 = locationCards[0].querySelector('h4');
            const desc1 = locationCards[0].querySelector('p');
            if (title1) title1.textContent = currentLang.metro_area;
            if (desc1) desc1.textContent = currentLang.main_operations;
        }
        
        if (locationCards[1]) {
            const title2 = locationCards[1].querySelector('h4');
            const desc2 = locationCards[1].querySelector('p');
            if (title2) title2.textContent = currentLang.nuevo_leon;
            if (desc2) desc2.textContent = currentLang.industrial_expansion;
        }
        
        if (locationCards[2]) {
            const title3 = locationCards[2].querySelector('h4');
            const desc3 = locationCards[2].querySelector('p');
            if (title3) title3.textContent = currentLang.international_expansion;
            if (desc3) desc3.textContent = currentLang.projects_development;
        }
        
        // Actualizar sección de servicios
        const servicesTitle = document.querySelector('#servicios .services-main-title .services-title-line');
        const servicesTitleAccent = document.querySelector('#servicios .services-main-title .services-title-accent');
        const servicesSubtitle = document.querySelector('#servicios .services-description');
        const serviceStats = document.querySelectorAll('.service-stat .stat-label');
        
        if (servicesTitle) {
            const titleWords = currentLang.services_title.split(' ');
            servicesTitle.textContent = titleWords[0];
            if (servicesTitleAccent && titleWords.length > 1) {
                servicesTitleAccent.textContent = titleWords.slice(1).join(' ');
            }
        }
        if (servicesSubtitle) servicesSubtitle.textContent = currentLang.services_subtitle;
        
        if (serviceStats[0]) serviceStats[0].textContent = currentLang.specialized_services;
        if (serviceStats[1]) serviceStats[1].textContent = currentLang.completed_projects;
        if (serviceStats[2]) serviceStats[2].textContent = currentLang.response_hours;
        
        // Actualizar servicios específicos
        updateServiceCards(currentLang);
        
        // Actualizar sección de equipos
        const equipmentTitle = document.querySelector('#equipos .section-header h2');
        const equipmentSubtitle = document.querySelector('#equipos .section-header p');
        
        if (equipmentTitle) equipmentTitle.textContent = currentLang.equipment_rental_sales;
        if (equipmentSubtitle) equipmentSubtitle.textContent = currentLang.equipment_catalog;
        
        updateEquipmentCards(currentLang);
        
        // Actualizar sección de contacto
        const contactTitle = document.querySelector('#contacto .section-header h2');
        const contactSubtitle = document.querySelector('#contacto .section-header p');
        
        if (contactTitle) contactTitle.textContent = currentLang.contact_title;
        if (contactSubtitle) contactSubtitle.textContent = currentLang.contact_subtitle;
        
        updateContactSection(currentLang);
        
        // Actualizar footer
        updateFooter(currentLang);
    }
    
    // Función para actualizar tarjetas de servicios
    function updateServiceCards(currentLang) {
        const serviceCards = document.querySelectorAll('.service-credential');
        
        serviceCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            const list = card.querySelector('ul');
            
            // Mapear índices a servicios específicos
            const serviceMap = [
                { title: currentLang.metal_structures, desc: currentLang.metal_structures_desc },
                { title: currentLang.forklifts, desc: currentLang.forklifts_desc },
                { title: currentLang.genie_platforms, desc: currentLang.genie_platforms_desc },
                { title: currentLang.industrial_maintenance, desc: currentLang.industrial_maintenance_desc },
                { title: currentLang.civil_works, desc: currentLang.civil_works_desc },
                { title: currentLang.electromechanical, desc: currentLang.electromechanical_desc },
                { title: currentLang.specialized_maintenance, desc: currentLang.specialized_maintenance_desc },
                { title: currentLang.global_services, desc: currentLang.global_services_desc },
                { title: currentLang.industrial_recruitment, desc: currentLang.industrial_recruitment_desc },
                { title: currentLang.personal_transport, desc: currentLang.personal_transport_desc }
            ];
            
            if (serviceMap[index]) {
                if (title) title.textContent = serviceMap[index].title;
                if (description) description.textContent = serviceMap[index].desc;
                
                // Actualizar listas de características
                if (list) {
                    const listItems = list.querySelectorAll('li');
                    updateServiceListItems(listItems, index, currentLang);
                }
            }
        });
    }
    
    // Función para actualizar elementos de lista de servicios
    function updateServiceListItems(listItems, serviceIndex, currentLang) {
        const serviceFeatures = [
            // Estructuras Metálicas
            [currentLang.structure_fabrication, currentLang.specialized_installation, currentLang.industrial_welding, currentLang.quality_control],
            // Montacargas
            [currentLang.forklift_rental, currentLang.equipment_sales, currentLang.specialized_maneuvers, currentLang.loading_unloading],
            // Plataformas Genie
            [currentLang.articulated_platforms, currentLang.industrial_scissors, currentLang.different_heights, currentLang.included_maintenance],
            // Mantenimiento Industrial
            [currentLang.dolly_maintenance, currentLang.industrial_machinery, currentLang.preventive_service, currentLang.urgent_repairs],
            // Obra Civil
            [currentLang.industrial_construction, currentLang.urbanization, currentLang.infrastructure, currentLang.project_management],
            // Electromecánica
            [currentLang.electrical_installations, currentLang.industrial_automation, currentLang.control_systems, currentLang.energy_efficiency],
            // Mantenimiento Especializado
            [currentLang.dolly_hanger_maintenance, currentLang.specialized_engineering, currentLang.industrial_parts_sales, currentLang.conveyor_installation],
            // Servicios Globales
            [currentLang.worldwide_service, currentLang.foreign_business, currentLang.international_logistics, currentLang.global_consulting],
            // Reclutamiento Industrial
            [currentLang.technical_recruitment, currentLang.engineer_selection, currentLang.operational_personnel, currentLang.hr_consulting],
            // Transporte de Personal
            [currentLang.industrial_personnel_transport, currentLang.executive_service, currentLang.custom_routes, currentLang.flexible_hours]
        ];
        
        if (serviceFeatures[serviceIndex]) {
            serviceFeatures[serviceIndex].forEach((feature, index) => {
                if (listItems[index]) {
                    listItems[index].textContent = feature;
                }
            });
        }
    }
    
    // Función para actualizar tarjetas de equipos
    function updateEquipmentCards(currentLang) {
        const equipmentCards = document.querySelectorAll('.equipment-card');
        
        equipmentCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            const specs = card.querySelectorAll('.spec');
            const button = card.querySelector('.btn');
            
            if (index === 0) { // Montacargas
                if (title) title.textContent = currentLang.forklifts;
                if (description) description.textContent = currentLang.different_capacities;
                if (button) button.textContent = currentLang.quick_quote;
                
                // Actualizar especificaciones
                if (specs[0]) {
                    const label = specs[0].querySelector('span:first-child');
                    const value = specs[0].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.capacity + ':';
                    if (value) value.textContent = currentLang.up_to_15_tons;
                }
                if (specs[1]) {
                    const label = specs[1].querySelector('span:first-child');
                    const value = specs[1].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.height + ':';
                    if (value) value.textContent = currentLang.up_to_10_meters;
                }
                if (specs[2]) {
                    const label = specs[2].querySelector('span:first-child');
                    const value = specs[2].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.fuel + ':';
                    if (value) value.textContent = currentLang.gasoline_diesel_electric;
                }
                if (specs[3]) {
                    const label = specs[3].querySelector('span:first-child');
                    const value = specs[3].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.service + ':';
                    if (value) value.textContent = currentLang.rent_sale_maneuvers;
                }
            } else if (index === 1) { // Plataformas Genie
                if (title) title.textContent = currentLang.genie_platforms;
                if (description) description.textContent = currentLang.genie_platforms_desc;
                if (button) button.textContent = currentLang.quick_quote;
                
                // Actualizar especificaciones
                if (specs[0]) {
                    const label = specs[0].querySelector('span:first-child');
                    const value = specs[0].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.height + ':';
                    if (value) value.textContent = currentLang.up_to_20_meters;
                }
                if (specs[1]) {
                    const label = specs[1].querySelector('span:first-child');
                    const value = specs[1].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.capacity + ':';
                    if (value) value.textContent = currentLang.up_to_300_kg;
                }
                if (specs[2]) {
                    const label = specs[2].querySelector('span:first-child');
                    const value = specs[2].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.equipment_type + ':';
                    if (value) value.textContent = currentLang.articulated_scissors;
                }
                if (specs[3]) {
                    const label = specs[3].querySelector('span:first-child');
                    const value = specs[3].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.service + ':';
                    if (value) value.textContent = currentLang.rent_sale;
                }
            } else if (index === 2) { // Mantenimiento Industrial
                if (title) title.textContent = currentLang.industrial_maintenance;
                if (description) description.textContent = currentLang.industrial_maintenance_desc;
                if (button) button.textContent = currentLang.request_service;
                
                // Actualizar especificaciones
                if (specs[0]) {
                    const label = specs[0].querySelector('span:first-child');
                    const value = specs[0].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.service + ':';
                    if (value) value.textContent = currentLang.preventive_maintenance;
                }
                if (specs[1]) {
                    const label = specs[1].querySelector('span:first-child');
                    const value = specs[1].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.equipment_type + ':';
                    if (value) value.textContent = currentLang.dollys_machinery;
                }
                if (specs[2]) {
                    const label = specs[2].querySelector('span:first-child');
                    const value = specs[2].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.availability + ':';
                    if (value) value.textContent = '24/7';
                }
                if (specs[3]) {
                    const label = specs[3].querySelector('span:first-child');
                    const value = specs[3].querySelector('span:last-child');
                    if (label) label.textContent = currentLang.zone + ':';
                    if (value) value.textContent = currentLang.area_metropolitana;
                }
            }
        });
    }
    
    // Función para actualizar sección de contacto
    function updateContactSection(currentLang) {
        const contactItems = document.querySelectorAll('.contact-item');
        
        // Ubicaciones
        if (contactItems[0]) {
            const title = contactItems[0].querySelector('h4');
            if (title) title.textContent = currentLang.locations;
        }
        
        // WhatsApp
        if (contactItems[1]) {
            const title = contactItems[1].querySelector('h4');
            if (title) title.textContent = currentLang.whatsapp;
        }
        
        // Teléfono
        if (contactItems[2]) {
            const title = contactItems[2].querySelector('h4');
            if (title) title.textContent = currentLang.phone;
        }
        
        // Email
        if (contactItems[3]) {
            const title = contactItems[3].querySelector('h4');
            if (title) title.textContent = currentLang.email;
        }
        
        // Zonas de Operación
        const operationZones = document.querySelector('.contact-map h4');
        if (operationZones) operationZones.textContent = currentLang.operation_zones_contact;
        
        // Formulario de contacto
        const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
        if (formInputs[0]) formInputs[0].placeholder = currentLang.full_name;
        if (formInputs[1]) formInputs[1].placeholder = currentLang.email_address;
        if (formInputs[2]) formInputs[2].placeholder = currentLang.phone_number;
        if (formInputs[3]) {
            formInputs[3].innerHTML = `<option value="">${currentLang.select_service}</option>`;
        }
        if (formInputs[4]) formInputs[4].placeholder = currentLang.describe_project;
        
        const submitButton = document.querySelector('#contactForm button[type="submit"]');
        if (submitButton) submitButton.textContent = currentLang.send_message;
    }
    
    // Función para actualizar footer completo
    function updateFooter(currentLang) {
        // Copyright
        const copyright = document.querySelector('.footer-bottom p');
        if (copyright) {
            copyright.innerHTML = `&copy; 2023 J&A KOREA S.A. de C.V. ${currentLang.copyright}`;
        }
        
        // Enlaces legales
        const privacyLink = document.querySelector('.footer-links a:first-child');
        const termsLink = document.querySelector('.footer-links a:last-child');
        
        if (privacyLink) privacyLink.textContent = currentLang.privacy;
        if (termsLink) termsLink.textContent = currentLang.terms;
        
        // Secciones del footer
        const footerSections = document.querySelectorAll('.footer-section h4');
        if (footerSections[0]) footerSections[0].textContent = currentLang.footer_services;
        if (footerSections[1]) footerSections[1].textContent = currentLang.footer_company;
        if (footerSections[2]) footerSections[2].textContent = currentLang.footer_contact;
        
        // Enlaces de servicios
        const serviceLinks = document.querySelectorAll('.footer-section:nth-child(2) ul li a');
        if (serviceLinks[0]) serviceLinks[0].textContent = currentLang.footer_metal_structures;
        if (serviceLinks[1]) serviceLinks[1].textContent = currentLang.footer_forklifts;
        if (serviceLinks[2]) serviceLinks[2].textContent = currentLang.footer_genie_platforms;
        if (serviceLinks[3]) serviceLinks[3].textContent = currentLang.footer_industrial_maintenance;
        if (serviceLinks[4]) serviceLinks[4].textContent = currentLang.footer_civil_works;
        if (serviceLinks[5]) serviceLinks[5].textContent = currentLang.footer_electromechanical;
        
        // Enlaces de empresa
        const companyLinks = document.querySelectorAll('.footer-section:nth-child(3) ul li a');
        if (companyLinks[0]) companyLinks[0].textContent = currentLang.footer_about;
        if (companyLinks[1]) companyLinks[1].textContent = currentLang.footer_contact_link;
        
        // Información de contacto
        const contactInfo = document.querySelectorAll('.footer-section:nth-child(4) p');
        if (contactInfo[0]) {
            contactInfo[0].innerHTML = `<i class="fas fa-map-marker-alt"></i> ${currentLang.footer_location}`;
        }
        // Los números de teléfono y email se mantienen igual
    }
    
    // Cargar idioma preferido al cargar la página
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
    document.getElementById('languageSelect').value = savedLanguage;
    changeLanguage(savedLanguage);
    
    // Hacer función global
    window.changeLanguage = changeLanguage;
}); 
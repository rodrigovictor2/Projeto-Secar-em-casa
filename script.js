document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const diff = endOfDay - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Sales Counter Animation
    function animateSalesCounter() {
        const target = 1278;
        const duration = 3000;
        const start = target - 100;
        const element = document.getElementById('sales-counter');
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(start + (target - start) * progress);
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Video Play Button
    const videoPlaceholder = document.getElementById('video-placeholder');
    const videoEmbed = document.getElementById('video-embed');
    const playButton = document.getElementById('play-video');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            videoPlaceholder.style.display = 'none';
            videoEmbed.style.display = 'block';
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
    
    // Floating CTA
    function handleScroll() {
        const floatingCta = document.querySelector('.floating-cta');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 500) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Exit Intent Popup
    let mouseY = null;
    
    document.addEventListener('mouseout', function(e) {
        if (!e.relatedTarget && e.clientY < 50) {
            showPopup();
        }
    });
    
    function showPopup() {
        // Only show once per session
        if (sessionStorage.getItem('popupShown')) return;
        
        document.getElementById('popup-overlay').classList.add('active');
        sessionStorage.setItem('popupShown', 'true');
    }
    
    document.getElementById('popup-close').addEventListener('click', function() {
        document.getElementById('popup-overlay').classList.remove('active');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.benefit-card, .result-card, .step, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.benefit-card, .result-card, .step, .testimonial');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Start animations
    animateSalesCounter();
});// Notificações de Compra em Tempo Real
function initPurchaseNotifications() {
    const notifications = [
        { name: "Ana Claudia", city: "São Paulo" },
        { name: "Juliana", city: "Rio de Janeiro" },
        { name: "Fernanda", city: "Belo Horizonte" },
        { name: "Camila", city: "Porto Alegre" },
        { name: "Mariana", city: "Recife" }
    ];
    
    const cities = ["SP", "RJ", "MG", "RS", "PE", "SC", "PR"];
    const products = ["Projeto Secar em Casa", "Guia 21 Dias", "Método Secar"];
    
    function showNotification() {
        const notification = document.createElement('div');
        notification.className = 'purchase-notification';
        
        const randomUser = Math.floor(Math.random() * 99) + 1;
        const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
        const minutes = Math.floor(Math.random() * 10) + 1;
        
        notification.innerHTML = `
            <img src="https://randomuser.me/api/portraits/women/${randomUser}.jpg" alt="${randomNotif.name}">
            <div class="content">
                <strong>${randomNotif.name}</strong>
                Comprou ${products[Math.floor(Math.random() * products.length)]}
                <div class="time">Há ${minutes} min • ${randomNotif.city}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Força o reflow para ativar a animação
        void notification.offsetWidth;
        
        notification.classList.add('show');
        
        // Remove após 6 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 6000);
    }
    
    // Primeira notificação após 8 segundos
    setTimeout(showNotification, 8000);

    const salesCounter = document.getElementById("sales-counter");
    if (salesCounter) {
        let current = parseInt(salesCounter.textContent);
        salesCounter.textContent = current + 1;
    }
    
    // Novas notificações a cada 12-25 segundos
    setInterval(showNotification, Math.random() * 13000 + 12000);
}

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initPurchaseNotifications);

// ==== FUNÇÕES CUSTOMIZADAS ====

document.addEventListener('DOMContentLoaded', function () {
    // === Carrossel de imagens ===
    const imagens = document.querySelectorAll('.carousel-image');
    let index = 0;

    setInterval(() => {
        imagens[index].classList.remove('active');
        index = (index + 1) % imagens.length;
        imagens[index].classList.add('active');
    }, 4000);

    // === Contador de vendas dinâmico ===
    const contador = document.getElementById('sales-counter');
    if (contador) {
        let atual = parseInt(contador.innerText);
        setInterval(() => {
            atual += 1;
            contador.innerText = atual;
        }, 60000); // incrementa a cada 60 segundos como simulação
    }
});
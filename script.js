document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Lógica do Modal "A Marca" ---
    const modal = document.getElementById('brand-modal');
    const btnOpen = document.getElementById('btn-open-modal');
    const btnOpenMobile = document.getElementById('btn-open-modal-mobile');
    const btnClose = document.getElementById('btn-close-modal');

    // Função para abrir modal
    const openModal = (e) => {
        e.preventDefault();
        modal.classList.add('active');
        // Fechar menu mobile se estiver aberto
        closeMobileMenu();
    };

    // Abrir Modal (desktop e mobile)
    if (btnOpen) {
        btnOpen.addEventListener('click', openModal);
    }
    if (btnOpenMobile) {
        btnOpenMobile.addEventListener('click', openModal);
    }

    // Fechar Modal (botão X)
    btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Fechar Modal (clicando fora do conteúdo)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // --- 2. Menu Hambúrguer e Menu Mobile ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Função para abrir/fechar menu mobile
    const toggleMobileMenu = () => {
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Previne scroll do body quando menu está aberto
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Função para fechar menu mobile
    const closeMobileMenu = () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event listener no botão hambúrguer
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Fechar menu ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Fechar menu ao redimensionar janela (se passar do breakpoint)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // --- 3. Efeito Header Scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
            header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
        } else {
            header.style.boxShadow = "none";
            header.style.backgroundColor = "rgba(250, 250, 250, 0.95)";
        }
    });

    // --- 4. Scroll Reveal (Animação ao rolar) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // --- 5. Smooth Scroll para links de navegação ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Não fazer scroll se for o link do modal
            if (href === '#marca') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = header.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. Modal de Produto ---
    const productModal = document.getElementById('product-modal');
    const btnCloseProductModal = document.getElementById('btn-close-product-modal');
    const productCards = document.querySelectorAll('.product-card[data-product]');
    const btnViewProducts = document.querySelectorAll('.btn-view-product');

    // Função para abrir modal de produto
    const openProductModal = (productData) => {
        // Preencher dados do modal
        document.getElementById('modal-product-image').src = productData.image;
        document.getElementById('modal-product-image').alt = productData.name;
        document.getElementById('modal-product-name').textContent = productData.name;
        document.getElementById('modal-product-description').textContent = productData.description;
        document.getElementById('modal-product-details').textContent = productData.details;
        document.getElementById('modal-product-notes').textContent = productData.notes;
        document.getElementById('modal-product-burnTime').textContent = productData.burnTime;
        document.getElementById('modal-product-material').textContent = productData.material;
        document.getElementById('modal-product-size').textContent = productData.size;

        // Configurar link do WhatsApp
        const whatsappMessage = `Olá, gostaria de encomendar a vela ${productData.name}`;
        const whatsappLink = `https://wa.me/553195873230?text=${encodeURIComponent(whatsappMessage)}`;
        document.getElementById('modal-whatsapp-link').href = whatsappLink;

        // Abrir modal
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Adicionar event listeners aos botões "Ver Detalhes"
    btnViewProducts.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productCard = btn.closest('.product-card');
            const productData = JSON.parse(productCard.getAttribute('data-product'));
            openProductModal(productData);
        });
    });

    // Adicionar event listener para clicar no card inteiro (opcional)
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Não abrir se clicar no botão (já tem seu próprio listener)
            if (e.target.closest('.btn-view-product')) return;
            
            const productData = JSON.parse(card.getAttribute('data-product'));
            openProductModal(productData);
        });
    });

    // Fechar modal de produto
    const closeProductModal = () => {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event listeners para fechar modal
    if (btnCloseProductModal) {
        btnCloseProductModal.addEventListener('click', closeProductModal);
    }

    // Fechar modal ao clicar fora
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeProductModal();
        }
    });
});
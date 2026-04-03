// Application principale
class TechHub {
    constructor() {
        this.currentCategory = 'all';
        this.currentSearch = '';
        this.products = this.prepareProductsFor2026(getProducts());
        this.init();
    }

    prepareProductsFor2026(products) {
        // Ajustement marché 2026 : inflation / prix du jour et sélection promos autorisées.
        const inflationMultiplier = 1.09; // +9% en moyenne 2026
        const promoIds = [1, 3, 5, 9, 16, 20, 24, 28];
        const nonPromoIds = [2, 7, 18];

        return products.map(product => {
            const adjusted = { ...product };
            adjusted.price = Math.round(product.price * inflationMultiplier);
            if (product.originalPrice) {
                adjusted.originalPrice = Math.round(product.originalPrice * inflationMultiplier);
            }

            if (promoIds.includes(product.id)) {
                adjusted.badge = 'promo';
            } else if (nonPromoIds.includes(product.id)) {
                adjusted.badge = null;
            }
            // Nouveaux produits conservant le badge new
            if (product.badge === 'new' && !promoIds.includes(product.id)) {
                adjusted.badge = 'new';
            }

            // Vérification standard pour des promotions crédibles
            if (adjusted.originalPrice && adjusted.price >= adjusted.originalPrice) {
                adjusted.originalPrice = null; // pas de fausse réduction
            }

            return adjusted;
        });
    }

    init() {
        this.displayProducts();
        this.setupEventListeners();
        this.setupModal();
        this.setupCartModal();
        this.setupNewsletter();
    }

    displayProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const productsCount = document.getElementById('productsCount');
        
        if (!productsGrid) return;
        
        // Appliquer les filtres
        let filteredProducts = this.products;
        
        if (this.currentCategory !== 'all') {
            filteredProducts = filterProductsByCategory(this.currentCategory);
        }
        
        if (this.currentSearch) {
            filteredProducts = searchProducts(this.currentSearch);
        }
        
        // Mettre à jour le compteur
        if (productsCount) {
            productsCount.textContent = filteredProducts.length;
        }
        
        // Afficher les produits
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-color); margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.1rem; margin-bottom: 1rem;">Aucun produit trouvé</p>
                    <button class="btn-primary reset-search">Réinitialiser la recherche</button>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge === 'promo' ? 'PROMO' : 'NOUVEAU'}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        ${product.originalPrice ? `<span style="text-decoration: line-through; color: #999; font-size: 0.9rem;">${product.originalPrice} FCFA</span> ` : ''}
                        ${product.price.toLocaleString('fr-FR')} FCFA
                    </div>
                    <div class="product-stock">${product.stock ? `Stock : ${product.stock}` : 'Stock : indéterminé'}</div>
                    <div class="product-specs">
                        ${this.getProductSpecsSummary(product.specs)}
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        `).join('');
        
        // Ajouter les écouteurs d'événements pour les boutons d'ajout au panier
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.dataset.id);
                const product = getProductById(productId);
                if (product) {
                    cart.addItem(product);
                }
            });
        });
        
        // Ajouter les écouteurs pour les cartes produits (ouverture modale)
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('add-to-cart-btn')) {
                    const productId = parseInt(card.dataset.id);
                    this.openProductModal(productId);
                }
            });
        });
    }
    
    getProductSpecsSummary(specs) {
        const summary = [];
        if (specs.ram) summary.push(`📀 ${specs.ram}`);
        if (specs.storage) summary.push(`💾 ${specs.storage}`);
        if (specs.processor) summary.push(`⚡ ${specs.processor}`);
        if (specs.screen) summary.push(`📱 ${specs.screen}`);
        if (specs.battery) summary.push(`🔋 ${specs.battery}`);
        if (specs.camera) summary.push(`📷 ${specs.camera}`);
        return summary.slice(0, 3).join(' • ');
    }
    
    setupEventListeners() {
        // Filtres catégories
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.currentCategory = category;
                
                // Mettre à jour l'état actif des boutons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.displayProducts();
            });
        });
        
        // Recherche
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentSearch = e.target.value;
                this.displayProducts();
            });
        }
        
        // Réinitialisation de la recherche (via le bouton)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('reset-search')) {
                this.currentSearch = '';
                this.currentCategory = 'all';
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.value = '';
                const activeFilter = document.querySelector('.filter-btn.active');
                if (activeFilter) activeFilter.classList.remove('active');
                document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
                this.displayProducts();
            }
        });
        
        // Mobile menu (simple toggle)
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const filterSection = document.querySelector('.filters-section');
        if (mobileMenuBtn && filterSection) {
            mobileMenuBtn.addEventListener('click', () => {
                filterSection.classList.toggle('show');
            });
        }
    }
    
    setupModal() {
        const modal = document.getElementById('productModal');
        const closeBtn = document.querySelector('#productModal .close-modal');
        
        // Fermer la modale
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        // Fermer en cliquant en dehors
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    openProductModal(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const modal = document.getElementById('productModal');
        const modalContent = document.getElementById('modalProductDetails');

        if (modalContent) {
            const availabilityText = product.stock && product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock';
            const percentageDiscount = product.originalPrice ? Math.round((1 - (product.price / product.originalPrice)) * 100) : 0;

            modalContent.innerHTML = `
                <div class="modal-product">
                    <img src="${product.image}" alt="${product.name}" class="modal-product-image">
                    <h2>${product.name}</h2>
                    <div class="modal-price">
                        ${product.originalPrice ? `<span class="strikethrough">${product.originalPrice} FCFA</span> ` : ''}
                        <strong class="current-price">${product.price.toLocaleString('fr-FR')} FCFA</strong>
                        ${product.originalPrice ? `<span class="discount-badge">-${percentageDiscount}%</span>` : ''}
                    </div>
                    <p class="modal-description">${product.description}</p>
                    <div class="modal-meta">
                        <span class="availability">${availabilityText}</span>
                        <span class="sku">Référence : ${product.id}</span>
                    </div>

                    <h3>Caractéristiques techniques</h3>
                    <table class="modal-spec-table">
                        <tbody>
                            ${Object.entries(product.specs).map(([key, value]) => `
                                <tr>
                                    <td>${this.formatSpecKey(key)}</td>
                                    <td>${value}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <button class="add-to-cart-btn modal-add-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Ajouter au panier
                    </button>
                </div>
            `;

            const addBtn = modalContent.querySelector('.modal-add-btn');
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    cart.addItem(product);
                    modal.style.display = 'none';
                });
            }
        }

        modal.style.display = 'block';
    }
    
    formatSpecKey(key) {
        const specNames = {
            ram: 'Mémoire RAM',
            storage: 'Stockage',
            processor: 'Processeur',
            battery: 'Batterie',
            camera: 'Appareil photo',
            screen: 'Écran',
            gpu: 'Carte graphique',
            movement: 'Mouvement',
            case: 'Boîtier',
            glass: 'Verre',
            waterResistance: 'Étanchéité',
            features: 'Fonctionnalités',
            bezel: 'Lunette',
            gps: 'GPS',
            strap: 'Bracelet'
        };
        return specNames[key] || key.charAt(0).toUpperCase() + key.slice(1);
    }
    
    setupCartModal() {
        const cartButton = document.getElementById('cartButton');
        const cartModal = document.getElementById('cartModal');
        const closeBtn = document.querySelector('#cartModal .close-modal');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        if (cartButton) {
            cartButton.addEventListener('click', () => {
                cart.renderCart();
                cartModal.style.display = 'block';
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                cartModal.style.display = 'none';
            });
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (cart.items.length === 0) {
                    alert('Votre panier est vide');
                } else {
                    alert(`Merci pour votre commande ! Total : ${cart.getTotal().toFixed(2)} FCFA`);
                    cart.clearCart();
                    cart.renderCart();
                    cartModal.style.display = 'none';
                }
            });
        }
    }
    
    setupNewsletter() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                if (email) {
                    alert(`✨ Merci ${email} ! Vous recevrez nos actualités exclusives.`);
                    newsletterForm.reset();
                }
            });
        }
    }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const app = new TechHub();
});
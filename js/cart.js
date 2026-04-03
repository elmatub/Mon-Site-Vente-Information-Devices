// Gestion du panier
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    // Charger le panier depuis localStorage
    loadCart() {
        const savedCart = localStorage.getItem('techhub_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Sauvegarder le panier
    saveCart() {
        localStorage.setItem('techhub_cart', JSON.stringify(this.items));
    }

    // Ajouter un produit au panier
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} ajouté au panier !`);
    }

    // Supprimer un item du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    // Mettre à jour la quantité
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
        this.updateCartCount();
    }

    // Calculer le total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obtenir le nombre d'articles
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Mettre à jour l'affichage du compteur
    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const totalItems = this.getTotalItems();
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Vider le panier
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
    }

    // Afficher une notification
    showNotification(message) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Ajouter les styles
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--secondary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 2000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Afficher le contenu du panier
    renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        
        if (!cartItemsContainer) return;
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Votre panier est vide</p>
                </div>
            `;
            cartTotalElement.textContent = '0';
            return;
        }
        
        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price} FCFA</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        cartTotalElement.textContent = this.getTotal().toFixed(2);
        
        // Ajouter les écouteurs d'événements
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity - 1);
                    this.renderCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity + 1);
                    this.renderCart();
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                this.removeItem(id);
                this.renderCart();
            });
        });
    }
}

// Créer une instance globale du panier
const cart = new Cart();

// Ajouter les styles manquants pour le panier
const cartStyles = `
    .cart-item {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        align-items: center;
    }
    
    .cart-item-image {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
    }
    
    .cart-item-info {
        flex: 1;
    }
    
    .cart-item-info h4 {
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
    }
    
    .cart-item-info p {
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .cart-item-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quantity-btn {
        width: 30px;
        height: 30px;
        background: var(--light-color);
        border: 1px solid #e5e7eb;
        border-radius: 5px;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .quantity-btn:hover {
        background: var(--primary-color);
        color: white;
    }
    
    .remove-item {
        background: none;
        border: none;
        color: var(--danger-color);
        cursor: pointer;
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .remove-item:hover {
        transform: scale(1.1);
    }
    
    .empty-cart {
        text-align: center;
        padding: 3rem;
        color: var(--gray-color);
    }
    
    .empty-cart i {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .cart-total {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 2px solid #e5e7eb;
        text-align: right;
        font-size: 1.2rem;
    }
    
    .checkout-btn {
        width: 100%;
        margin-top: 1rem;
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;

// Ajouter les styles
const styleSheet = document.createElement("style");
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet);
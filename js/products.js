// Base de données des produits
const products = [
    // iPHONES
    {
        id: 1,
        name: "iPhone 11",
        category: "iphone",
        price: 499,
        originalPrice: 599,
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400",
        badge: "promo",
        specs: {
            ram: "4 Go",
            storage: "64 Go",
            processor: "A13 Bionic",
            battery: "3110 mAh",
            camera: "12MP + 12MP"
        },
        description: "Un excellent rapport qualité-prix avec des performances solides et un appareil photo polyvalent."
    },
    {
        id: 2,
        name: "iPhone 14",
        category: "iphone",
        price: 799,
        originalPrice: 899,
        image: "images/14pro.PNG",
        badge: null,
        specs: {
            ram: "6 Go",
            storage: "128 Go",
            processor: "A15 Bionic",
            battery: "3279 mAh",
            camera: "12MP + 12MP"
        },
        description: "Performances améliorées, autonomie exceptionnelle et mode cinématique."
    },
    {
        id: 3,
        name: "iPhone 14 Pro Max",
        category: "iphone",
        price: 1099,
        originalPrice: 1199,
        image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=400",
        badge: "promo",
        specs: {
            ram: "6 Go",
            storage: "256 Go",
            processor: "A16 Bionic",
            battery: "4323 mAh",
            camera: "48MP + 12MP + 12MP"
        },
        description: "L'écran Dynamic Island et l'appareil photo professionnel 48MP."
    },
    {
        id: 4,
        name: "iPhone 15 Pro",
        category: "iphone",
        price: 1099,
        originalPrice: 1199,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400",
        badge: "new",
        specs: {
            ram: "8 Go",
            storage: "256 Go",
            processor: "A17 Pro",
            battery: "3274 mAh",
            camera: "48MP + 12MP + 12MP"
        },
        description: "Design en titane, puce A17 Pro et USB-C."
    },
    {
        id: 5,
        name: "iPhone 15 Pro Max",
        category: "iphone",
        price: 1299,
        originalPrice: 1499,
        image: "images/15proMax.png",
        badge: "promo",
        specs: {
            ram: "8 Go",
            storage: "256 Go",
            processor: "A17 Pro",
            battery: "4422 mAh",
            camera: "48MP + 12MP + 12MP"
        },
        description: "Le dernier iPhone avec la puce A17 Pro, zoom optique 5x."
    },
    {
        id: 6,
        name: "iPhone 17 Pro",
        category: "iphone",
        price: 1399,
        originalPrice: 1599,
        image: "images/17pro.png",
        badge: "new",
        specs: {
            ram: "12 Go",
            storage: "512 Go",
            processor: "A19 Pro",
            battery: "5000 mAh",
            camera: "64MP + 48MP + 48MP"
        },
        description: "L'innovation ultime avec l'IA avancée et une autonomie record."
    },

    // SAMSUNG
    {
        id: 7,
        name: "Samsung Galaxy S23",
        category: "android",
        price: 699,
        originalPrice: 799,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        badge: null,
        specs: {
            ram: "8 Go",
            storage: "128 Go",
            processor: "Snapdragon 8 Gen 2",
            battery: "3900 mAh",
            camera: "50MP + 12MP + 10MP"
        },
        description: "Design compact, performances puissantes et photos exceptionnelles."
    },
    {
        id: 8,
        name: "Samsung Galaxy S24 Ultra",
        category: "android",
        price: 1099,
        originalPrice: 1299,
        image: "images/S24Uta.png",
        badge: "new",
        specs: {
            ram: "12 Go",
            storage: "256 Go",
            processor: "Snapdragon 8 Gen 3",
            battery: "5000 mAh",
            camera: "200MP + 50MP + 12MP"
        },
        description: "L'ultra-puissant smartphone Samsung avec stylet S Pen intégré."
    },
    {
        id: 9,
        name: "Samsung Galaxy A55",
        category: "android",
        price: 449,
        originalPrice: 499,
        image: "images/A55.png",
        badge: "promo",
        specs: {
            ram: "8 Go",
            storage: "128 Go",
            processor: "Exynos 1480",
            battery: "5000 mAh",
            camera: "50MP + 12MP + 5MP"
        },
        description: "Le meilleur rapport qualité-prix avec une grande autonomie."
    },
    {
        id: 10,
        name: "Samsung Galaxy Z Fold 5",
        category: "android",
        price: 1699,
        originalPrice: 1899,
        image: "images/Zfold.png",
        badge: "new",
        specs: {
            ram: "12 Go",
            storage: "512 Go",
            processor: "Snapdragon 8 Gen 2",
            battery: "4400 mAh",
            camera: "50MP + 12MP + 10MP"
        },
        description: "Smartphone pliable révolutionnaire avec écran immersif."
    },

    // TECNO
    {
        id: 11,
        name: "Tecno Camon 30 Pro",
        category: "android",
        price: 399,
        originalPrice: 449,
        image: "images/camon30.png",
        badge: "promo",
        specs: {
            ram: "8 Go",
            storage: "256 Go",
            processor: "MediaTek Dimensity 8200",
            battery: "5000 mAh",
            camera: "50MP + 50MP + 2MP"
        },
        description: "Appareil photo professionnel et charge ultra-rapide 70W."
    },
    {
        id: 12,
        name: "Tecno Phantom X2 Pro",
        category: "android",
        price: 599,
        originalPrice: 699,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
        badge: "new",
        specs: {
            ram: "12 Go",
            storage: "256 Go",
            processor: "MediaTek Dimensity 9000",
            battery: "5160 mAh",
            camera: "50MP + 50MP + 13MP"
        },
        description: "Design premium avec appareil photo rétractable unique."
    },
    {
        id: 13,
        name: "Tecno Spark 20 Pro",
        category: "android",
        price: 199,
        originalPrice: 249,
        image: "images/Tecno20pro.png",
        badge: "promo",
        specs: {
            ram: "6 Go",
            storage: "128 Go",
            processor: "MediaTek Helio G99",
            battery: "5000 mAh",
            camera: "108MP + 2MP"
        },
        description: "Excellent rapport qualité-prix avec grand écran et batterie durable."
    },

    // XIAOMI
    {
        id: 14,
        name: "Xiaomi 13 Ultra",
        category: "android",
        price: 799,
        originalPrice: 899,
        image: "images/xiaomi13.png",
        badge: null,
        specs: {
            ram: "12 Go",
            storage: "256 Go",
            processor: "Snapdragon 8 Gen 2",
            battery: "5000 mAh",
            camera: "50MP + 50MP + 50MP"
        },
        description: "Appareil photo professionnel Leica, performances exceptionnelles."
    },
    {
        id: 15,
        name: "Xiaomi 14 Pro",
        category: "android",
        price: 899,
        originalPrice: 999,
        image: "images/xiaomi14pro.png",
        badge: "new",
        specs: {
            ram: "12 Go",
            storage: "512 Go",
            processor: "Snapdragon 8 Gen 3",
            battery: "4880 mAh",
            camera: "50MP + 50MP + 50MP"
        },
        description: "Le summum de la photographie mobile avec HyperOS."
    },

    // ORDINATEURS
    {
        id: 16,
        name: "MacBook Pro M3",
        category: "computer",
        price: 1899,
        originalPrice: 2199,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        badge: "promo",
        specs: {
            ram: "16 Go",
            storage: "512 Go SSD",
            processor: "Apple M3 Pro",
            screen: "14.2 pouces Liquid Retina"
        },
        description: "Performance révolutionnaire avec la puce M3, parfait pour les créatifs."
    },
    {
        id: 17,
        name: "MacBook Air M2",
        category: "computer",
        price: 1099,
        originalPrice: 1199,
        image: "images/Mac14pro.png",
        badge: "promo",
        specs: {
            ram: "8 Go",
            storage: "256 Go SSD",
            processor: "Apple M2",
            screen: "13.6 pouces Liquid Retina"
        },
        description: "Ultra-fin, léger et incroyablement performant."
    },
    {
        id: 18,
        name: "Dell XPS 15",
        category: "computer",
        price: 1599,
        originalPrice: 1799,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
        badge: null,
        specs: {
            ram: "16 Go",
            storage: "512 Go SSD",
            processor: "Intel Core i7-13700H",
            screen: "15.6 pouces 4K OLED"
        },
        description: "L'ordinateur portable ultime pour les professionnels."
    },
    {
        id: 19,
        name: "Lenovo ThinkPad X1 Carbon",
        category: "computer",
        price: 1499,
        originalPrice: 1699,
        image: "images/Lenovo.png",
        badge: null,
        specs: {
            ram: "16 Go",
            storage: "512 Go SSD",
            processor: "Intel Core i7-1365U",
            screen: "14 pouces IPS"
        },
        description: "Le laptop professionnel par excellence, robuste et léger."
    },
    {
        id: 20,
        name: "HP Spectre x360",
        category: "computer",
        price: 1399,
        originalPrice: 1599,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
        badge: "promo",
        specs: {
            ram: "16 Go",
            storage: "1 To SSD",
            processor: "Intel Core i7-1355U",
            screen: "13.5 pouces OLED tactile"
        },
        description: "2-en-1 élégant avec écran OLED et format convertible."
    },
    {
        id: 21,
        name: "ASUS ROG Zephyrus",
        category: "computer",
        price: 1799,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
        badge: "promo",
        specs: {
            ram: "32 Go",
            storage: "1 To SSD",
            processor: "Intel Core i9-13900H",
            gpu: "RTX 4070",
            screen: "16 pouces 240Hz"
        },
        description: "Le laptop gamer ultime avec des performances de bureau."
    },
    {
        id: 22,
        name: "Acer Swift 5",
        category: "computer",
        price: 899,
        originalPrice: 999,
        image: "images/AS5.png",
        badge: null,
        specs: {
            ram: "16 Go",
            storage: "512 Go SSD",
            processor: "Intel Core i5-13420H",
            screen: "14 pouces IPS"
        },
        description: "Ultra-léger et puissant pour la mobilité."
    },

    // MONTRES
    {
        id: 23,
        name: "Apple Watch Ultra 2",
        category: "watch",
        price: 899,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400",
        badge: "new",
        specs: {
            screen: "49mm Retina",
            battery: "36 heures",
            processor: "S9 SiP",
            waterResistance: "100m"
        },
        description: "La montre la plus robuste d'Apple, conçue pour l'aventure."
    },
    {
        id: 24,
        name: "Apple Watch Series 9",
        category: "watch",
        price: 549,
        originalPrice: 599,
        image: "images/AppleW9.png",
        badge: "promo",
        specs: {
            screen: "45mm Retina",
            battery: "18 heures",
            processor: "S9 SiP",
            features: "Double tap gesture"
        },
        description: "Intelligence et connectivité avancées avec le double tap."
    },
    {
        id: 25,
        name: "Samsung Galaxy Watch 6 Classic",
        category: "watch",
        price: 399,
        originalPrice: 449,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
        badge: null,
        specs: {
            screen: "47mm Super AMOLED",
            battery: "425 mAh",
            processor: "Exynos W930",
            bezel: "Rotation physique"
        },
        description: "Design classique avec lunette rotative et suivi santé complet."
    },
    {
        id: 26,
        name: "Garmin Fenix 7X",
        category: "watch",
        price: 799,
        originalPrice: 899,
        image: "images/GarminF7.png",
        badge: null,
        specs: {
            screen: "1.4 pouces",
            battery: "28 jours",
            gps: "Multi-band",
            waterResistance: "100m"
        },
        description: "Montre GPS multi-sport haut de gamme pour les athlètes."
    },
    {
        id: 27,
        name: "Montre Classique Tissot PRX",
        category: "watch",
        price: 449,
        originalPrice: 499,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400",
        badge: null,
        specs: {
            movement: "Automatique",
            case: "40mm acier",
            glass: "Saphir",
            waterResistance: "100m"
        },
        description: "Montre suisse élégante au design rétro-modern."
    },
    {
        id: 28,
        name: "Montre Élégante Fossil",
        category: "watch",
        price: 199,
        originalPrice: 249,
        image: "images/MEF.png",
        badge: "promo",
        specs: {
            movement: "Quartz",
            case: "42mm acier inoxydable",
            glass: "Minéral",
            strap: "Cuir véritable"
        },
        description: "Design intemporel et élégant pour toutes les occasions."
    }
];

// Fonctions exportées
function getProducts() {
    return products;
}

function filterProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

function searchProducts(query) {
    if (!query) return products;
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

function getProductById(id) {
    return products.find(product => product.id === id);
}
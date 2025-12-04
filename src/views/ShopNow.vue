<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="page-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack" class="header-button">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="header-title">Marketplace</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openCart" class="header-button">
            <ion-icon :icon="cartOutline"></ion-icon>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <!-- SEARCH BAR -->
      <div class="search-container">
        <div class="search-bar">
          <ion-icon :icon="searchOutline"></ion-icon>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search coffee, equipment..."
            @input="handleSearch"
          />
          <button v-if="searchQuery" class="clear-btn" @click="clearSearch">
            <ion-icon :icon="closeCircleOutline"></ion-icon>
          </button>
        </div>
        <button class="filter-btn" @click="showFilters = !showFilters">
          <ion-icon :icon="optionsOutline"></ion-icon>
        </button>
      </div>

      <!-- CATEGORY TABS -->
      <div class="category-tabs">
        <div 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-tab', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id">
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-label">{{ category.label }}</span>
        </div>
      </div>
    </ion-header>

    <ion-content class="page-content">
      <div class="content-container">

        <!-- FILTERS PANEL -->
        <div v-if="showFilters" class="filters-panel">
          <div class="filter-section">
            <h3 class="filter-title">Price Range</h3>
            <div class="price-range">
              <button 
                v-for="range in priceRanges" 
                :key="range.id"
                :class="['price-btn', { active: selectedPrice === range.id }]"
                @click="selectedPrice = range.id">
                {{ range.label }}
              </button>
            </div>
          </div>

          <div class="filter-section">
            <h3 class="filter-title">Sort By</h3>
            <div class="sort-options">
              <button 
                v-for="sort in sortOptions" 
                :key="sort.id"
                :class="['sort-btn', { active: selectedSort === sort.id }]"
                @click="selectedSort = sort.id">
                <ion-icon :icon="sort.icon"></ion-icon>
                <span>{{ sort.label }}</span>
              </button>
            </div>
          </div>

          <div class="filter-actions">
            <button class="clear-filters-btn" @click="clearFilters">Clear All</button>
            <button class="apply-filters-btn" @click="applyFilters">Apply</button>
          </div>
        </div>

        <!-- FEATURED BANNER -->
        <div v-if="!searchQuery && activeCategory === 'all'" class="featured-banner">
          <div class="banner-content">
            <span class="banner-badge">New Arrival</span>
            <h2 class="banner-title">Ethiopian Yirgacheffe</h2>
            <p class="banner-subtitle">Limited Edition • Single Origin</p>
            <button class="banner-btn" @click="viewProduct(1)">
              <span>Shop Now</span>
              <ion-icon :icon="arrowForwardOutline"></ion-icon>
            </button>
          </div>
          <div class="banner-image">
            <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400" alt="Featured" />
          </div>
        </div>

        <!-- PRODUCTS GRID -->
        <div class="products-section">
          <div class="products-header">
            <h3 class="products-title">{{ productsTitle }}</h3>
            <span class="products-count">{{ filteredProducts.length }} products</span>
          </div>

          <div v-if="filteredProducts.length === 0" class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3 class="empty-title">No Products Found</h3>
            <p class="empty-message">Try adjusting your filters or search terms</p>
            <button class="empty-btn" @click="clearFilters">Clear Filters</button>
          </div>

          <div class="products-grid">
            <div 
              v-for="product in filteredProducts" 
              :key="product.id" 
              class="product-tile"
              @click="viewProduct(product.id)">
              
              <div class="product-image-wrapper">
                <img :src="product.image" :alt="product.name" class="product-image" />
                
                <button 
                  class="favorite-btn" 
                  :class="{ active: product.favorite }"
                  @click.stop="toggleFavorite(product.id)">
                  <ion-icon :icon="product.favorite ? heartSharp : heartOutline"></ion-icon>
                </button>

                <div v-if="product.badge" class="product-badge" :style="{ background: product.badgeColor }">
                  {{ product.badge }}
                </div>

                <div v-if="product.discount" class="discount-badge">
                  -{{ product.discount }}%
                </div>
              </div>

              <div class="product-info">
                <div class="product-header">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <div class="product-rating">
                    <ion-icon :icon="starSharp"></ion-icon>
                    <span>{{ product.rating }}</span>
                  </div>
                </div>

                <p class="product-description">{{ product.description }}</p>

                <div class="product-meta">
                  <span class="product-origin">
                    <ion-icon :icon="locationOutline"></ion-icon>
                    {{ product.origin }}
                  </span>
                  <span class="product-weight">{{ product.weight }}</span>
                </div>

                <div class="product-footer">
                  <div class="product-price">
                    <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice }}</span>
                    <span class="current-price">${{ product.price }}</span>
                  </div>
                  <button 
                    class="add-to-cart-btn" 
                    @click.stop="addToCart(product.id)">
                    <ion-icon :icon="cartOutline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
} from "@ionic/vue";
import {
  arrowBackOutline,
  cartOutline,
  searchOutline,
  closeCircleOutline,
  optionsOutline,
  arrowForwardOutline,
  heartOutline,
  heartSharp,
  starSharp,
  locationOutline,
  trendingUpOutline,
  pricetagOutline,
  timeOutline,
  sparklesOutline,
} from "ionicons/icons";

const router = useRouter();

const searchQuery = ref('');
const activeCategory = ref('all');
const showFilters = ref(false);
const selectedPrice = ref('all');
const selectedSort = ref('featured');
const cartCount = ref(3);

const categories = [
  { id: 'all', label: 'All', icon: '☕' },
  { id: 'coffee', label: 'Coffee', icon: '🫘' },
  { id: 'equipment', label: 'Equipment', icon: '⚙️' },
  { id: 'accessories', label: 'Accessories', icon: '🎁' },
  { id: 'bundles', label: 'Bundles', icon: '📦' }
];

const priceRanges = [
  { id: 'all', label: 'All Prices' },
  { id: 'under20', label: 'Under $20' },
  { id: '20to50', label: '$20 - $50' },
  { id: '50to100', label: '$50 - $100' },
  { id: 'over100', label: 'Over $100' }
];

const sortOptions = [
  { id: 'featured', label: 'Featured', icon: sparklesOutline },
  { id: 'popular', label: 'Most Popular', icon: trendingUpOutline },
  { id: 'price-low', label: 'Price: Low to High', icon: pricetagOutline },
  { id: 'price-high', label: 'Price: High to Low', icon: pricetagOutline },
  { id: 'newest', label: 'Newest', icon: timeOutline }
];

const products = ref([
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    description: 'Floral notes with citrus undertones',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
    price: 18.99,
    originalPrice: 22.99,
    discount: 17,
    rating: 4.9,
    origin: 'Ethiopia',
    weight: '250g',
    category: 'coffee',
    badge: 'New',
    badgeColor: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    favorite: false,
    featured: true
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    description: 'Smooth, balanced with chocolate notes',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    price: 24.99,
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    origin: 'Colombia',
    weight: '500g',
    category: 'coffee',
    badge: 'Best Seller',
    badgeColor: 'linear-gradient(135deg, #ff9800, #ff5722)',
    favorite: true,
    featured: true
  },
  {
    id: 3,
    name: 'Costa Rica Honey',
    description: 'Sweet and syrupy body',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    price: 21.99,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    origin: 'Costa Rica',
    weight: '250g',
    category: 'coffee',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  },
  {
    id: 4,
    name: 'Brazilian Santos',
    description: 'Nutty, low acidity, smooth',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    price: 19.99,
    originalPrice: null,
    discount: 0,
    rating: 4.6,
    origin: 'Brazil',
    weight: '1kg',
    category: 'coffee',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  },
  {
    id: 5,
    name: 'Manual Coffee Grinder',
    description: 'Portable ceramic burr grinder',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400',
    price: 45.99,
    originalPrice: 59.99,
    discount: 23,
    rating: 4.9,
    origin: 'Premium',
    weight: 'Portable',
    category: 'equipment',
    badge: 'Sale',
    badgeColor: 'linear-gradient(135deg, #ef4444, #dc2626)',
    favorite: false,
    featured: true
  },
  {
    id: 6,
    name: 'Espresso Machine',
    description: 'Professional home espresso maker',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    price: 299.99,
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    origin: 'Premium',
    weight: 'Countertop',
    category: 'equipment',
    badge: null,
    badgeColor: null,
    favorite: true,
    featured: true
  },
  {
    id: 7,
    name: 'Pour Over Set',
    description: 'Complete brewing kit with dripper',
    image: 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=400',
    price: 34.99,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    origin: 'Premium',
    weight: 'Kit',
    category: 'equipment',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  },
  {
    id: 8,
    name: 'Coffee Storage Canister',
    description: 'Airtight container with CO2 valve',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    price: 28.99,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    origin: 'Premium',
    weight: '500g',
    category: 'accessories',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  },
  {
    id: 9,
    name: 'Ceramic Coffee Mug Set',
    description: 'Handcrafted artisan mug collection',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    price: 42.99,
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    origin: 'Artisan',
    weight: '4 mugs',
    category: 'accessories',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  },
  {
    id: 10,
    name: 'Milk Frother',
    description: 'Electric milk steamer and frother',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4.6,
    origin: 'Premium',
    weight: 'Electric',
    category: 'equipment',
    badge: 'Sale',
    badgeColor: 'linear-gradient(135deg, #ef4444, #dc2626)',
    favorite: false,
    featured: false
  },
  {
    id: 11,
    name: 'Coffee Lover Bundle',
    description: '2 bags + grinder + brewing guide',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.9,
    origin: 'Bundle',
    weight: 'Complete',
    category: 'bundles',
    badge: 'Bundle Deal',
    badgeColor: 'linear-gradient(135deg, #9b51e0, #7c3aed)',
    favorite: false,
    featured: true
  },
  {
    id: 12,
    name: 'Starter Kit',
    description: 'Everything you need to start brewing',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    price: 59.99,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    origin: 'Bundle',
    weight: 'Complete',
    category: 'bundles',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  },
  {
    id: 13,
    name: 'Kenya AA',
    description: 'Bright, wine-like acidity',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
    price: 22.99,
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    origin: 'Kenya',
    weight: '250g',
    category: 'coffee',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  },
  {
    id: 14,
    name: 'Guatemala Antigua',
    description: 'Full-bodied with spicy notes',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    price: 20.99,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    origin: 'Guatemala',
    weight: '250g',
    category: 'coffee',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  },
  {
    id: 15,
    name: 'Digital Scale',
    description: 'Precision brewing scale with timer',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400',
    price: 34.99,
    originalPrice: null,
    discount: 0,
    rating: 4.6,
    origin: 'Premium',
    weight: 'Digital',
    category: 'equipment',
    badge: null,
    badgeColor: null,
    favorite: false,
    featured: false
  }
]);

const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filter by category
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory.value);
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.origin.toLowerCase().includes(query)
    );
  }

  // Filter by price
  if (selectedPrice.value !== 'all') {
    filtered = filtered.filter(p => {
      if (selectedPrice.value === 'under20') return p.price < 20;
      if (selectedPrice.value === '20to50') return p.price >= 20 && p.price <= 50;
      if (selectedPrice.value === '50to100') return p.price >= 50 && p.price <= 100;
      if (selectedPrice.value === 'over100') return p.price > 100;
      return true;
    });
  }

  // Sort
  if (selectedSort.value === 'popular') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (selectedSort.value === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (selectedSort.value === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (selectedSort.value === 'newest') {
    filtered = [...filtered].sort((a, b) => a.id - b.id);
  } else if (selectedSort.value === 'featured') {
    filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return filtered;
});

const productsTitle = computed(() => {
  if (searchQuery.value) return 'Search Results';
  if (activeCategory.value === 'all') return 'All Products';
  const category = categories.find(c => c.id === activeCategory.value);
  return category ? category.label : 'Products';
});

const goBack = () => {
  router.back();
};

const openCart = () => {
  console.log('Open cart');
  alert('Cart feature coming soon!');
};

const handleSearch = () => {
  console.log('Searching:', searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = '';
};

const clearFilters = () => {
  selectedPrice.value = 'all';
  selectedSort.value = 'featured';
  searchQuery.value = '';
  activeCategory.value = 'all';
  showFilters.value = false;
};

const applyFilters = () => {
  showFilters.value = false;
};

const viewProduct = (productId) => {
  console.log('View product:', productId);
  alert(`Product ${productId} details coming soon!`);
};

const toggleFavorite = (productId) => {
  const product = products.value.find(p => p.id === productId);
  if (product) {
    product.favorite = !product.favorite;
  }
};

const addToCart = (productId) => {
  console.log('Add to cart:', productId);
  cartCount.value++;
  alert('Added to cart!');
};
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
  --coffee-dark: #4a2c2a;
  --coffee-medium: #6b4226;
  --coffee-light: #a87b54;
  --text-dark: #2c1810;
  --text-light: #8b7355;
  --green: #27ae60;
  --blue: #2196f3;
  --purple: #9b51e0;
  --orange: #ff9800;
  --red: #ef4444;
}

* {
  -webkit-tap-highlight-color: transparent;
}

/* ===== HEADER ===== */
.page-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
}

.header-button {
  --background: rgba(107, 66, 38, 0.08);
  --color: var(--coffee-dark);
  width: 42px;
  height: 42px;
  margin: 4px;
  border-radius: 50%;
  position: relative;
}

.cart-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  background: var(--red);
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
}

/* ===== SEARCH BAR ===== */
.search-container {
  display: flex;
  gap: 10px;
  padding: 12px;
  background: white;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-radius: 12px;
}

.search-bar ion-icon {
  font-size: 20px;
  color: var(--text-light);
  flex-shrink: 0;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  font-weight: 600;
  color: var(--coffee-dark);
}

.search-bar input::placeholder {
  color: var(--text-light);
}

.clear-btn {
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  cursor: pointer;
}

.clear-btn ion-icon {
  font-size: 20px;
}

.filter-btn {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}

.filter-btn ion-icon {
  font-size: 24px;
}

/* ===== CATEGORY TABS ===== */
.category-tabs {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: white;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.category-tab.active {
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
}

.category-icon {
  font-size: 24px;
}

.category-label {
  font-size: 12px;
  font-weight: 800;
  color: var(--coffee-dark);
}

.category-tab.active .category-label {
  color: white;
}

/* ===== CONTENT ===== */
.page-content {
  --background: #f5f5f5;
}

.content-container {
  padding: 12px;
  padding-bottom: 24px;
}

/* ===== FILTERS PANEL ===== */
.filters-panel {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-section:last-of-type {
  margin-bottom: 20px;
}

.filter-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 12px 0;
}

.price-range {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.price-btn {
  padding: 10px 16px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
  cursor: pointer;
  transition: all 0.3s ease;
}

.price-btn.active {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.08));
  border-color: var(--coffee-medium);
}

.sort-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-btn ion-icon {
  font-size: 18px;
}

.sort-btn.active {
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.08));
  border-color: var(--coffee-medium);
}

.filter-actions {
  display: flex;
  gap: 10px;
}

.clear-filters-btn {
  flex: 1;
  padding: 14px;
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-dark);
  cursor: pointer;
}

.apply-filters-btn {
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 800;
  color: white;
  cursor: pointer;
}

/* ===== FEATURED BANNER ===== */
.featured-banner {
  display: flex;
  background: linear-gradient(135deg, #fff5e6, #ffe4cc);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  min-height: 160px;
}

.banner-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}

.banner-badge {
  display: inline-block;
  width: fit-content;
  padding: 4px 10px;
  background: var(--green);
  color: white;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.banner-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--coffee-dark);
  margin: 0;
  line-height: 1.2;
}

.banner-subtitle {
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
  font-weight: 600;
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 10px 16px;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 8px;
}

.banner-btn ion-icon {
  font-size: 18px;
}

.banner-image {
  width: 140px;
  flex-shrink: 0;
  overflow: hidden;
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ===== PRODUCTS SECTION ===== */
.products-section {
  margin-top: 8px;
}

.products-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 4px;
}

.products-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
}

.products-count {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-light);
}

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 48px 24px;
  background: white;
  border-radius: 20px;
}

.empty-icon {
  font-size: 72px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
}

.empty-message {
  font-size: 14px;
  color: var(--text-light);
  margin: 0 0 20px 0;
  font-weight: 600;
}

.empty-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}

/* ===== PRODUCTS GRID ===== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* ===== PRODUCT TILE ===== */
.product-tile {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-tile:active {
  transform: scale(0.98);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #e8e8e8;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
}

.favorite-btn ion-icon {
  font-size: 20px;
  color: var(--text-light);
}

.favorite-btn.active ion-icon {
  color: var(--red);
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.discount-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px 10px;
  background: var(--red);
  color: white;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 900;
}

.product-info {
  padding: 14px;
}

.product-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.product-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-dark);
  margin: 0;
  line-height: 1.3;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 8px;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.12), rgba(255, 152, 0, 0.08));
  border-radius: 6px;
  flex-shrink: 0;
}

.product-rating ion-icon {
  font-size: 12px;
  color: var(--orange);
}

.product-rating span {
  font-size: 12px;
  font-weight: 800;
  color: var(--orange);
}

.product-description {
  font-size: 12px;
  color: var(--text-light);
  margin: 0 0 10px 0;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f5f5f5;
}

.product-origin {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-light);
}

.product-origin ion-icon {
  font-size: 12px;
}

.product-weight {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-light);
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.product-price {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.original-price {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-light);
  text-decoration: line-through;
  line-height: 1;
}

.current-price {
  font-size: 18px;
  font-weight: 900;
  color: var(--coffee-dark);
  line-height: 1;
}

.add-to-cart-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}

.add-to-cart-btn:active {
  transform: scale(0.9);
}

.add-to-cart-btn ion-icon {
  font-size: 20px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 480px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 400px) {
  .banner-image {
    width: 100px;
  }
  
  .banner-title {
    font-size: 18px;
  }
}
</style>
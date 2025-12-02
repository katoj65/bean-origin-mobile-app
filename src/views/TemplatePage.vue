<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border" translucent>
      <ion-toolbar class="custom-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="page-title">Shop Coffee</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="toggleView">
            <ion-icon :icon="viewMode === 'grid' ? listOutline : gridOutline"></ion-icon>
          </ion-button>
          <ion-button @click="openCart">
            <ion-icon :icon="cartOutline"></ion-icon>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <!-- SEARCH BAR -->
      <div class="search-section">
        <div class="search-wrapper">
          <ion-icon :icon="searchOutline" class="search-icon"></ion-icon>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search coffee..."
            class="search-input"
          />
          <button v-if="searchQuery" class="clear-search" @click="searchQuery = ''">
            <ion-icon :icon="closeOutline"></ion-icon>
          </button>
        </div>
      </div>

      <!-- FILTERS & SORT -->
      <div class="controls-section">
        <button class="filter-btn" @click="showFilters = !showFilters">
          <ion-icon :icon="funnelOutline"></ion-icon>
          <span>Filters</span>
          <span v-if="activeFiltersCount > 0" class="filter-count">{{ activeFiltersCount }}</span>
        </button>

        <div class="sort-dropdown">
          <select v-model="sortBy" class="sort-select">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
          <ion-icon :icon="chevronDownOutline" class="sort-arrow"></ion-icon>
        </div>
      </div>

      <!-- EXPANDABLE FILTERS -->
      <div v-if="showFilters" class="filters-panel">
        <!-- Categories -->
        <div class="filter-group">
          <h4 class="filter-title">Origin</h4>
          <div class="filter-chips">
            <button 
              v-for="origin in origins" 
              :key="origin"
              :class="['filter-chip', { active: selectedOrigins.includes(origin) }]"
              @click="toggleFilter(selectedOrigins, origin)">
              {{ origin }}
            </button>
          </div>
        </div>

        <!-- Roast Level -->
        <div class="filter-group">
          <h4 class="filter-title">Roast Level</h4>
          <div class="filter-chips">
            <button 
              v-for="roast in roastLevels" 
              :key="roast"
              :class="['filter-chip', { active: selectedRoasts.includes(roast) }]"
              @click="toggleFilter(selectedRoasts, roast)">
              {{ roast }}
            </button>
          </div>
        </div>

        <!-- Price Range -->
        <div class="filter-group">
          <h4 class="filter-title">Price Range</h4>
          <div class="price-range">
            <input 
              v-model.number="priceRange.min" 
              type="number" 
              placeholder="Min"
              class="price-input"
            />
            <span class="price-separator">—</span>
            <input 
              v-model.number="priceRange.max" 
              type="number" 
              placeholder="Max"
              class="price-input"
            />
          </div>
        </div>

        <!-- Clear Filters -->
        <button v-if="activeFiltersCount > 0" class="clear-filters-btn" @click="clearFilters">
          <ion-icon :icon="closeCircleOutline"></ion-icon>
          <span>Clear All Filters</span>
        </button>
      </div>
    </ion-header>

    <ion-content fullscreen class="content-bg">
      <!-- RESULTS COUNT -->
      <div class="results-header">
        <p class="results-count">
          {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'product' : 'products' }} found
        </p>
      </div>

      <!-- PRODUCTS GRID VIEW -->
      <div v-if="viewMode === 'grid'" class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-card"
          @click="viewProduct(product.id)">
          
          <!-- Image -->
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-image" />
            
            <!-- Badges -->
            <div class="product-badges">
              <span v-if="product.discount" class="badge discount">-{{ product.discount }}%</span>
              <span v-if="product.featured" class="badge featured">⭐ Featured</span>
              <span v-if="product.new" class="badge new">🆕 New</span>
            </div>

            <!-- Quick Add -->
            <button class="quick-add-btn" @click.stop="addToCart(product)">
              <ion-icon :icon="cartOutline"></ion-icon>
            </button>

            <!-- Favorite -->
            <button class="favorite-btn" @click.stop="toggleFavorite(product.id)">
              <ion-icon :icon="product.favorite ? heart : heartOutline"></ion-icon>
            </button>
          </div>

          <!-- Info -->
          <div class="product-info">
            <div class="product-meta">
              <span class="product-origin">
                <ion-icon :icon="locationOutline"></ion-icon>
                {{ product.origin }}
              </span>
              <span class="product-rating">
                <ion-icon :icon="star"></ion-icon>
                {{ product.rating }}
              </span>
            </div>

            <h3 class="product-name">{{ product.name }}</h3>
            
            <p class="product-description">{{ product.description }}</p>

            <div class="product-tags">
              <span class="tag">{{ product.roast }}</span>
              <span class="tag">{{ product.process }}</span>
            </div>

            <div class="product-footer">
              <div class="product-pricing">
                <span v-if="product.discount" class="original-price">${{ product.price }}</span>
                <span class="current-price">${{ calculatePrice(product) }}</span>
              </div>
              <span class="product-size">{{ product.size }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- PRODUCTS LIST VIEW -->
      <div v-else class="products-list">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-list-item"
          @click="viewProduct(product.id)">
          
          <!-- Image -->
          <div class="list-image-wrapper">
            <img :src="product.image" :alt="product.name" class="list-image" />
            <div v-if="product.discount" class="list-discount">-{{ product.discount }}%</div>
          </div>

          <!-- Info -->
          <div class="list-info">
            <div class="list-header">
              <div class="list-title-section">
                <h3 class="list-name">{{ product.name }}</h3>
                <div class="list-meta">
                  <span class="list-origin">
                    <ion-icon :icon="locationOutline"></ion-icon>
                    {{ product.origin }}
                  </span>
                  <span class="list-separator">•</span>
                  <span class="list-rating">
                    <ion-icon :icon="star"></ion-icon>
                    {{ product.rating }}
                  </span>
                </div>
              </div>
              
              <button class="list-favorite" @click.stop="toggleFavorite(product.id)">
                <ion-icon :icon="product.favorite ? heart : heartOutline"></ion-icon>
              </button>
            </div>

            <p class="list-description">{{ product.description }}</p>

            <div class="list-tags">
              <span class="list-tag">{{ product.roast }} Roast</span>
              <span class="list-tag">{{ product.process }}</span>
              <span class="list-tag">{{ product.size }}</span>
            </div>

            <div class="list-footer">
              <div class="list-pricing">
                <span v-if="product.discount" class="list-original-price">${{ product.price }}</span>
                <span class="list-current-price">${{ calculatePrice(product) }}</span>
              </div>
              
              <button class="list-add-btn" @click.stop="addToCart(product)">
                <ion-icon :icon="cartOutline"></ion-icon>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="filteredProducts.length === 0" class="empty-results">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">No products found</h3>
        <p class="empty-text">Try adjusting your filters or search term</p>
        <button class="reset-btn" @click="resetFilters">
          <ion-icon :icon="refreshOutline"></ion-icon>
          <span>Reset Filters</span>
        </button>
      </div>

      <!-- SPACER -->
      <div class="bottom-spacer"></div>
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
  closeOutline,
  funnelOutline,
  chevronDownOutline,
  closeCircleOutline,
  locationOutline,
  star,
  heartOutline,
  heart,
  gridOutline,
  listOutline,
  refreshOutline,
} from "ionicons/icons";

const router = useRouter();

const viewMode = ref('grid'); // 'grid' or 'list'
const searchQuery = ref('');
const sortBy = ref('featured');
const showFilters = ref(false);
const cartCount = ref(3);

// Filter states
const selectedOrigins = ref([]);
const selectedRoasts = ref([]);
const priceRange = ref({ min: null, max: null });

// Filter options
const origins = ['Ethiopia', 'Colombia', 'Costa Rica', 'Brazil', 'Kenya', 'Guatemala'];
const roastLevels = ['Light', 'Medium', 'Medium-Dark', 'Dark'];

// Products data
const products = ref([
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    roast: "Light",
    process: "Washed",
    size: "250g",
    price: 18.99,
    discount: 15,
    rating: 4.8,
    featured: true,
    new: false,
    favorite: false,
    description: "Floral notes with bright citrus acidity and tea-like body",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400"
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    roast: "Medium",
    process: "Washed",
    size: "500g",
    price: 24.99,
    discount: 0,
    rating: 4.6,
    featured: false,
    new: false,
    favorite: true,
    description: "Balanced profile with caramel sweetness and nutty finish",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400"
  },
  {
    id: 3,
    name: "Costa Rica Honey",
    origin: "Costa Rica",
    roast: "Medium",
    process: "Honey",
    size: "250g",
    price: 21.99,
    discount: 20,
    rating: 4.9,
    featured: true,
    new: true,
    favorite: false,
    description: "Sweet tropical fruit notes with honey-like body",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400"
  },
  {
    id: 4,
    name: "Brazilian Santos",
    origin: "Brazil",
    roast: "Dark",
    process: "Natural",
    size: "500g",
    price: 19.99,
    discount: 10,
    rating: 4.5,
    featured: false,
    new: false,
    favorite: false,
    description: "Rich chocolate notes with low acidity and full body",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400"
  },
  {
    id: 5,
    name: "Kenyan AA",
    origin: "Kenya",
    roast: "Medium-Dark",
    process: "Washed",
    size: "250g",
    price: 22.99,
    discount: 0,
    rating: 4.7,
    featured: false,
    new: true,
    favorite: false,
    description: "Bold berry flavors with wine-like acidity",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"
  },
  {
    id: 6,
    name: "Guatemalan Antigua",
    origin: "Guatemala",
    roast: "Medium",
    process: "Washed",
    size: "250g",
    price: 20.99,
    discount: 15,
    rating: 4.6,
    featured: false,
    new: false,
    favorite: true,
    description: "Smooth cocoa and spice with balanced acidity",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
  },
  {
    id: 7,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    roast: "Dark",
    process: "Wet-Hulled",
    size: "500g",
    price: 23.99,
    discount: 0,
    rating: 4.4,
    featured: false,
    new: false,
    favorite: false,
    description: "Earthy and herbal with syrupy body",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400"
  },
  {
    id: 8,
    name: "Peru Organic",
    origin: "Peru",
    roast: "Light",
    process: "Washed",
    size: "250g",
    price: 17.99,
    discount: 10,
    rating: 4.5,
    featured: true,
    new: false,
    favorite: false,
    description: "Bright and clean with nutty undertones",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400"
  }
]);

const activeFiltersCount = computed(() => {
  let count = 0;
  if (selectedOrigins.value.length > 0) count += selectedOrigins.value.length;
  if (selectedRoasts.value.length > 0) count += selectedRoasts.value.length;
  if (priceRange.value.min !== null || priceRange.value.max !== null) count += 1;
  return count;
});

const filteredProducts = computed(() => {
  let filtered = [...products.value];

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.origin.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  // Origin filter
  if (selectedOrigins.value.length > 0) {
    filtered = filtered.filter(p => selectedOrigins.value.includes(p.origin));
  }

  // Roast filter
  if (selectedRoasts.value.length > 0) {
    filtered = filtered.filter(p => selectedRoasts.value.includes(p.roast));
  }

  // Price filter
  if (priceRange.value.min !== null) {
    filtered = filtered.filter(p => calculatePrice(p) >= priceRange.value.min);
  }
  if (priceRange.value.max !== null) {
    filtered = filtered.filter(p => calculatePrice(p) <= priceRange.value.max);
  }

  // Sorting
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => calculatePrice(a) - calculatePrice(b));
      break;
    case 'price-high':
      filtered.sort((a, b) => calculatePrice(b) - calculatePrice(a));
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return filtered;
});

const calculatePrice = (product) => {
  if (product.discount) {
    return (product.price * (1 - product.discount / 100)).toFixed(2);
  }
  return product.price.toFixed(2);
};

const toggleView = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid';
};

const toggleFilter = (array, value) => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  } else {
    array.push(value);
  }
};

const clearFilters = () => {
  selectedOrigins.value = [];
  selectedRoasts.value = [];
  priceRange.value = { min: null, max: null };
};

const resetFilters = () => {
  clearFilters();
  searchQuery.value = '';
  sortBy.value = 'featured';
};

const goBack = () => {
  router.back();
};

const openCart = () => {
  router.push('/cart');
};

const viewProduct = (id) => {
  router.push(`/product/${id}`);
};

const addToCart = (product) => {
  console.log('Add to cart:', product);
  cartCount.value++;
  // Add animation or toast notification
};

const toggleFavorite = (id) => {
  const product = products.value.find(p => p.id === id);
  if (product) {
    product.favorite = !product.favorite;
  }
};
</script>

<style scoped>
/* ===== CSS VARIABLES ===== */
:root {
  --coffee-dark: #4a2c2a;
  --coffee-medium: #6b4226;
  --coffee-light: #a87b54;
  --text-dark: #2c1810;
  --text-light: #8b7355;
  --green: #27ae60;
  --blue: #2196f3;
  --orange: #ff9800;
  --red: #ef4444;
}

/* ===== HEADER ===== */
.custom-toolbar {
  --background: white;
  --border-width: 0;
  padding: 8px 4px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.cart-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--red);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}

/* ===== SEARCH ===== */
.search-section {
  padding: 8px 16px 12px;
  background: white;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  font-size: 20px;
  color: var(--text-light);
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 12px 42px;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--coffee-dark);
  background: #fafafa;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--coffee-medium);
  background: white;
}

.clear-search {
  position: absolute;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #e8e8e8;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-search:active {
  transform: scale(0.95);
}

.clear-search ion-icon {
  font-size: 16px;
}

/* ===== CONTROLS ===== */
.controls-section {
  display: flex;
  gap: 10px;
  padding: 0 16px 12px;
  background: white;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  background: white;
  color: var(--coffee-dark);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:active {
  background: #f5f5f5;
}

.filter-btn ion-icon {
  font-size: 18px;
}

.filter-count {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: var(--coffee-dark);
  color: white;
  font-size: 11px;
  border-radius: 10px;
}

.sort-dropdown {
  flex: 1;
  position: relative;
}

.sort-select {
  width: 100%;
  padding: 10px 36px 10px 14px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  background: white;
  cursor: pointer;
  appearance: none;
}

.sort-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: var(--text-light);
  pointer-events: none;
}

/* ===== FILTERS PANEL ===== */
.filters-panel {
  background: white;
  padding: 16px;
  border-top: 1px solid #e8e8e8;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group:last-of-type {
  margin-bottom: 12px;
}

.filter-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-chip {
  padding: 8px 14px;
  border: 2px solid #e8e8e8;
  border-radius: 20px;
  background: white;
  color: var(--text-dark);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-chip:active {
  transform: scale(0.97);
}

.filter-chip.active {
  border-color: var(--coffee-medium);
  background: var(--coffee-medium);
  color: white;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price-input {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--coffee-dark);
}

.price-input:focus {
  outline: none;
  border-color: var(--coffee-medium);
}

.price-separator {
  color: var(--text-light);
  font-weight: 700;
}

.clear-filters-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid var(--red);
  border-radius: 10px;
  background: white;
  color: var(--red);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:active {
  background: rgba(239, 68, 68, 0.1);
}

.clear-filters-btn ion-icon {
  font-size: 18px;
}

/* ===== CONTENT ===== */
.content-bg {
  --background: #f5f5f5;
}

/* ===== RESULTS HEADER ===== */
.results-header {
  padding: 16px;
}

.results-count {
  font-size: 14px;
  color: var(--text-light);
  font-weight: 600;
  margin: 0;
}

/* ===== PRODUCTS GRID ===== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  padding: 0 16px 20px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:active {
  transform: scale(0.98);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-badges {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.badge.discount {
  background: var(--red);
  color: white;
}

.badge.featured {
  background: var(--orange);
  color: white;
}

.badge.new {
  background: var(--green);
  color: white;
}

.quick-add-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: white;
  color: var(--coffee-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.quick-add-btn:active {
  transform: scale(0.95);
}

.quick-add-btn ion-icon {
  font-size: 20px;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-btn:active {
  transform: scale(0.95);
}

.favorite-btn ion-icon {
  font-size: 18px;
}

.product-info {
  padding: 12px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.product-origin {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--coffee-medium);
  font-weight: 700;
}

.product-origin ion-icon {
  font-size: 12px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: var(--orange);
  font-weight: 700;
}

.product-rating ion-icon {
  font-size: 13px;
}

.product-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 6px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  font-size: 12px;
  color: var(--text-light);
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  font-size: 10px;
  padding: 3px 8px;
  background: #f0f0f0;
  border-radius: 6px;
  color: var(--coffee-medium);
  font-weight: 700;
  text-transform: uppercase;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.product-pricing {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.original-price {
  font-size: 12px;
  color: var(--text-light);
  text-decoration: line-through;
}

.current-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.product-size {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

/* ===== PRODUCTS LIST ===== */
.products-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px 20px;
}

.product-list-item {
  background: white;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-list-item:active {
  transform: scale(0.99);
}

.list-image-wrapper {
  position: relative;
  flex-shrink: 0;
}

.list-image {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
}

.list-discount {
  position: absolute;
  top: 6px;
  left: 6px;
  background: var(--red);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}

.list-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.list-title-section {
  flex: 1;
}

.list-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.list-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-origin {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--coffee-medium);
  font-weight: 700;
}

.list-origin ion-icon {
  font-size: 13px;
}

.list-separator {
  color: #e0e0e0;
  font-weight: 700;
}

.list-rating {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: var(--orange);
  font-weight: 700;
}

.list-rating ion-icon {
  font-size: 13px;
}

.list-favorite {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f5f5f5;
  color: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.list-favorite:active {
  transform: scale(0.95);
}

.list-favorite ion-icon {
  font-size: 18px;
}

.list-description {
  font-size: 13px;
  color: var(--text-light);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.list-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.list-tag {
  font-size: 11px;
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 6px;
  color: var(--coffee-medium);
  font-weight: 700;
}

.list-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.list-pricing {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.list-original-price {
  font-size: 12px;
  color: var(--text-light);
  text-decoration: line-through;
}

.list-current-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.list-add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.list-add-btn:active {
  transform: scale(0.98);
}

.list-add-btn ion-icon {
  font-size: 18px;
}

/* ===== EMPTY STATE ===== */
.empty-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 32px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 10px 0;
}

.empty-text {
  font-size: 15px;
  color: var(--text-light);
  margin: 0 0 24px 0;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  border: 2px solid var(--coffee-medium);
  background: white;
  color: var(--coffee-medium);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:active {
  background: rgba(107, 66, 38, 0.05);
}

.reset-btn ion-icon {
  font-size: 20px;
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 30px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 360px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
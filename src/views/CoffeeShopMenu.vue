<template>
<app-layout title="Menu">
<template #content>
<div class="menu-page">
<!-- Categories -->
<div class="categories-section">
<div class="categories-scroll">
<button 
v-for="category in categories" 
:key="category.id"
class="category-btn"
:class="{ active: activeCategory === category.id }"
@click="activeCategory = category.id"
>
<span class="category-icon">{{ category.icon }}</span>
<span class="category-name">{{ category.name }}</span>
</button>
</div>
</div>

<!-- Menu Items -->
<div class="menu-items-section">
<div class="menu-grid">
<div 
v-for="item in filteredItems" 
:key="item.id"
class="menu-card"
>
<div class="menu-card-image">
<img :src="item.image" :alt="item.name" />
<div v-if="item.popular" class="popular-badge">
<ion-icon :icon="flameOutline"></ion-icon>
<span>Popular</span>
</div>
</div>
<div class="menu-card-content">
<div class="menu-card-header">
<h3 class="menu-item-name">{{ item.name }}</h3>
<span class="menu-item-price">${{ item.price.toFixed(2) }}</span>
</div>
<p class="menu-item-description">{{ item.description }}</p>
<div class="menu-card-footer">
<div class="menu-item-meta">
<span v-if="item.rating" class="rating">
<ion-icon :icon="starSharp"></ion-icon>
{{ item.rating }}
</span>
<span class="size">{{ item.size }}</span>
</div>
<button class="add-btn">
<ion-icon :icon="addOutline"></ion-icon>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
</template>
</app-layout>
</template>

<script setup>
import { ref, computed } from 'vue';
import AppLayout from './template/AppLayout.vue';
import { IonIcon } from '@ionic/vue';
import {
  flameOutline,
  starSharp,
  addOutline
} from 'ionicons/icons';

const activeCategory = ref('all');

const categories = [
  { id: 'all', name: 'All', icon: '☕' },
  { id: 'espresso', name: 'Espresso', icon: '☕' },
  { id: 'cold', name: 'Cold Drinks', icon: '🧊' },
  { id: 'food', name: 'Food', icon: '🥐' },
  { id: 'beans', name: 'Beans', icon: '🫘' }
];

const menuItems = ref([
  {
    id: 1,
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk and foam',
    price: 4.50,
    size: '12 oz',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    category: 'espresso',
    popular: true
  },
  {
    id: 2,
    name: 'Latte',
    description: 'Smooth espresso with steamed milk',
    price: 4.00,
    size: '12 oz',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    category: 'espresso',
    popular: true
  },
  {
    id: 3,
    name: 'Cold Brew',
    description: 'Smooth cold-steeped coffee',
    price: 5.00,
    size: '16 oz',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
    category: 'cold',
    popular: true
  },
  {
    id: 4,
    name: 'Croissant',
    description: 'Buttery, flaky French pastry',
    price: 3.50,
    size: 'Regular',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    category: 'food',
    popular: true
  },
  {
    id: 5,
    name: 'Americano',
    description: 'Espresso with hot water',
    price: 3.50,
    size: '12 oz',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    category: 'espresso',
    popular: false
  },
  {
    id: 6,
    name: 'Iced Latte',
    description: 'Espresso with cold milk over ice',
    price: 4.50,
    size: '16 oz',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
    category: 'cold',
    popular: false
  },
  {
    id: 7,
    name: 'Ethiopian Beans',
    description: 'Premium single-origin coffee beans',
    price: 18.99,
    size: '12 oz bag',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    category: 'beans',
    popular: true
  },
  {
    id: 8,
    name: 'Blueberry Muffin',
    description: 'Fresh baked with real blueberries',
    price: 3.00,
    size: 'Regular',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400',
    category: 'food',
    popular: false
  }
]);

const filteredItems = computed(() => {
  if (activeCategory.value === 'all') {
    return menuItems.value;
  }
  return menuItems.value.filter(item => item.category === activeCategory.value);
});
</script>

<style scoped>
.menu-page {
  background: var(--cream-200, #faf8f5);
  min-height: 100%;
  padding-bottom: 20px;
}

/* ===== CATEGORIES ===== */
.categories-section {
  background: white;
  padding: 16px 0;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.categories-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 0 20px;
  -webkit-overflow-scrolling: touch;
}

.categories-scroll::-webkit-scrollbar {
  display: none;
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: #faf8f5;
  border: none;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 700;
  color: #6b5444;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  min-width: 80px;
}

.category-btn.active {
  background: #6b4226;
  color: white;
}

.category-btn:active {
  transform: scale(0.95);
}

.category-icon {
  font-size: 24px;
}

.category-name {
  white-space: nowrap;
}

/* ===== MENU ITEMS ===== */
.menu-items-section {
  padding: 0 20px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.menu-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-card:active {
  transform: scale(0.97);
}

.menu-card-image {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f1ed, #ebe4dc);
}

.menu-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.popular-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: rgba(255, 107, 0, 0.95);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 900;
  color: white;
}

.popular-badge ion-icon {
  font-size: 14px;
}

.menu-card-content {
  padding: 14px;
}

.menu-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
}

.menu-item-name {
  font-size: 15px;
  font-weight: 900;
  color: #000000;
  margin: 0;
  letter-spacing: -0.3px;
  line-height: 1.2;
  flex: 1;
}

.menu-item-price {
  font-size: 16px;
  font-weight: 900;
  color: #6b4226;
  flex-shrink: 0;
}

.menu-item-description {
  font-size: 12px;
  font-weight: 600;
  color: #6b5444;
  line-height: 1.4;
  margin: 0 0 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.menu-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #6b5444;
}

.rating {
  display: flex;
  align-items: center;
  gap: 3px;
  color: #000000;
}

.rating ion-icon {
  font-size: 13px;
  color: #fbbf24;
}

.size {
  color: #6b5444;
}

.add-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6b4226;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:active {
  transform: scale(0.9);
  background: #5d3a2f;
}

.add-btn ion-icon {
  font-size: 20px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 480px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .menu-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

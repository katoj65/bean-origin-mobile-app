<template>

<div class="content-container" style="padding-top:0px;">
<coffee-shop-heading style="margin-bottom:20px;"/>
<div class="search-categories-section">
<!-- Categories -->
<div class="categories-row">
<button 
v-for="category in categories" 
:key="category.id"
class="category-chip"
:class="{ active: activeCategory === category.id }"
@click="selectCategory(category.id)"
>
<div class="category-icon-wrapper">
<ion-icon :icon="category.icon"></ion-icon>
</div>
<span class="category-label">{{ category.name }}</span>
</button>
</div>
</div>

<!-- Menu Items Section -->
<h3 style="padding:0;margin:0;font-weight:bolder;margin-bottom:15px;">MENU</h3>
<div class="section">
<div class="menu-items">
<div v-for="item in filteredMenuItems" 
:key="item.id"
class="menu-item-card"
@click="viewItemDetails(item.id)">

<div class="item-image-wrapper">
<img :src="item.image" :alt="item.name" class="item-image"/>
<div v-if="item.popular" class="popular-badge">
<ion-icon :icon="flameOutline"></ion-icon>
<span>Popular</span>
</div>
</div>

<div class="item-content">
<div class="item-header">
<h3 class="item-name">{{ item.name }}</h3>
<div class="item-price">${{ item.price }}</div>
</div>
<p class="item-description">{{ item.description }}</p>

<div class="item-footer">
<div class="item-meta">
<span v-if="item.rating" class="item-rating">
<ion-icon :icon="starSharp"></ion-icon>
{{ item.rating }}
</span>
<span class="item-size">{{ item.size }}</span>
</div>
<button class="add-item-btn" @click.stop="addToCart(item.id)">
<ion-icon :icon="addOutline"></ion-icon>
</button>
</div>
</div>
</div>
</div>
</div>
</div>

</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
IonButtons,
IonButton,
IonIcon,
} from "@ionic/vue";
import {
heartOutline,
heartSharp,
shareOutline,
starSharp,
timeOutline,
pricetagOutline,
cardOutline,
cartOutline,
navigateOutline,
chevronForwardOutline,
flameOutline,
addOutline,
mapOutline,
globeOutline,
arrowForwardOutline,
searchOutline,
closeCircle,
cafeOutline,
leafOutline,
fastFoodOutline,
ellipsisHorizontalOutline,
} from "ionicons/icons";
import CoffeeShopHeading from '../template/CoffeeShopHeading.vue';

const router = useRouter();

// Search & Categories State
const searchQuery = ref('');
const activeCategory = ref('all');

// Categories
const categories = [
{
id: 'all',
name: 'All',
icon: cafeOutline,
},
{
id: 'espresso',
name: 'Espresso',
icon: cafeOutline,
},
{
id: 'cold',
name: 'Cold',
icon: leafOutline,
},
{
id: 'food',
name: 'Food',
icon: fastFoodOutline,
},
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
}
]);

// Filtered Menu Items
const filteredMenuItems = computed(() => {
let filtered = menuItems.value;

// Filter by category
if (activeCategory.value !== 'all') {
filtered = filtered.filter(item => item.category === activeCategory.value);
}

// Filter by search query
if (searchQuery.value) {
const query = searchQuery.value.toLowerCase();
filtered = filtered.filter(item =>
item.name.toLowerCase().includes(query) ||
item.description.toLowerCase().includes(query) ||
item.category.toLowerCase().includes(query)
);
}

return filtered;
});

// Methods
const handleSearch = () => {
console.log('Search query:', searchQuery.value);
};

const clearSearch = () => {
searchQuery.value = '';
};

const selectCategory = (categoryId) => {
activeCategory.value = categoryId;
console.log('Selected category:', categoryId);
};

const viewItemDetails = (itemId) => {
console.log('View item:', itemId);
};

const addToCart = (itemId) => {
console.log('Add to cart:', itemId);
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

/* ===== CONTENT CONTAINER ===== */
.content-container {
padding: 10px 10px 10px;
position: relative;
}

/* ===== SEARCH & CATEGORIES SECTION ===== */
.search-categories-section {
margin-bottom: 24px;
}

.search-bar-wrapper {
margin-bottom: 16px;
}

.search-bar {
position: relative;
display: flex;
align-items: center;
background: white;
border-radius: 16px;
padding: 0 16px;
transition: all 0.3s ease;
}

.search-bar:focus-within {
transform: translateY(-2px);
}

.search-icon {
font-size: 22px;
color: #8a8a8a;
flex-shrink: 0;
margin-right: 12px;
}

.search-input {
flex: 1;
padding: 16px 0;
border: none;
background: transparent;
font-size: 15px;
font-weight: 600;
color: #2a2a2a;
outline: none;
}

.search-input::placeholder {
color: #afafaf;
font-weight: 500;
}

.clear-search-btn {
width: 32px;
height: 32px;
display: flex;
align-items: center;
justify-content: center;
background: transparent;
border: none;
border-radius: 50%;
cursor: pointer;
flex-shrink: 0;
transition: all 0.3s ease;
}

.clear-search-btn ion-icon {
font-size: 24px;
color: #8a8a8a;
}

.clear-search-btn:active {
transform: scale(0.9);
}

/* ===== CATEGORIES ROW ===== */
.categories-row {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 12px;
}

.category-chip {
display: flex;
flex-direction: column;
align-items: center;
gap: 8px;
padding: 16px 12px;
background: white;
border: 2px solid transparent;
border-radius: 16px;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-chip:active {
transform: scale(0.96);
}

.category-icon-wrapper {
width: 48px;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
background: #f5f3f0;
border-radius: 50%;
transition: all 0.3s ease;
}

.category-icon-wrapper ion-icon {
font-size: 24px;
color: #6b4423;
transition: all 0.3s ease;
}

.category-label {
font-size: 13px;
font-weight: 700;
color: #5a5a5a;
text-align: center;
transition: all 0.3s ease;
}

.category-chip.active {
background: linear-gradient(135deg, #6b4423, #4a2f18);
border-color: #6b4423;
transform: translateY(-2px);
}

.category-chip.active .category-icon-wrapper {
background: rgba(255, 255, 255, 0.2);
}

.category-chip.active .category-icon-wrapper ion-icon {
color: white;
}

.category-chip.active .category-label {
color: white;
}

/* ===== SECTIONS ===== */
.section {
margin-bottom: 16px;
}

/* ===== MENU ITEMS ===== */
.menu-items {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 14px;
}

.menu-item-card {
background: white;
border-radius: 24px;
overflow: hidden;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item-card:active {
transform: scale(0.97);
}

.item-image-wrapper {
position: relative;
width: 100%;
aspect-ratio: 1;
background: linear-gradient(135deg, #f0f0f0, #e8e8e8);
overflow: hidden;
}

.item-image {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item-card:active .item-image {
transform: scale(1.08);
}

.popular-badge {
position: absolute;
top: 12px;
left: 12px;
display: flex;
align-items: center;
gap: 5px;
padding: 8px 12px;
background: linear-gradient(135deg, #ff9800, #ff5722);
border-radius: 12px;
color: white;
font-size: 12px;
font-weight: 900;
letter-spacing: 0.3px;
}

.popular-badge ion-icon {
font-size: 16px;
}

.item-content {
padding: 16px;
}

.item-header {
display: flex;
align-items: flex-start;
justify-content: space-between;
gap: 10px;
margin-bottom: 8px;
}

.item-name {
font-size: 16px;
font-weight: 900;
color: var(--coffee-dark);
margin: 0;
line-height: 1.3;
flex: 1;
letter-spacing: -0.2px;
}

.item-price {
font-size: 17px;
font-weight: 900;
color: var(--coffee-dark);
flex-shrink: 0;
}

.item-description {
font-size: 13px;
line-height: 1.5;
color: var(--text-light);
margin: 0 0 14px 0;
font-weight: 600;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}

.item-footer {
display: flex;
align-items: center;
justify-content: space-between;
gap: 10px;
}

.item-meta {
display: flex;
align-items: center;
gap: 10px;
font-size: 12px;
font-weight: 800;
color: var(--text-light);
}

.item-rating {
display: flex;
align-items: center;
gap: 4px;
}

.item-rating ion-icon {
font-size: 14px;
color: var(--orange);
}

.add-item-btn {
width: 36px;
height: 36px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
border: none;
border-radius: 50%;
color: white;
cursor: pointer;
flex-shrink: 0;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.add-item-btn:active {
transform: scale(0.88);
}

.add-item-btn ion-icon {
font-size: 20px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 480px) {
.menu-items {
grid-template-columns: repeat(3, 1fr);
}

.categories-row {
gap: 16px;
}

.category-chip {
padding: 20px 16px;
}

.category-icon-wrapper {
width: 56px;
height: 56px;
}

.category-icon-wrapper ion-icon {
font-size: 28px;
}

.category-label {
font-size: 14px;
}
}

@media (min-width: 768px) {
.search-categories-section {
max-width: 600px;
margin-left: auto;
margin-right: auto;
}
}
</style>
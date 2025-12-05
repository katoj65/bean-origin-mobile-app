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
<ion-title class="header-title">Nearby Coffee Shops</ion-title>
<ion-buttons slot="end">
<ion-button @click="toggleView" class="header-button">
<ion-icon :icon="viewMode === 'map' ? listOutline : mapOutline"></ion-icon>
</ion-button>
</ion-buttons>
</ion-toolbar>

<!-- LOCATION BAR -->
<div class="location-bar">
<div class="location-info">
<ion-icon :icon="locationSharp"></ion-icon>
<div class="location-text">
<span class="location-label">Current Location</span>
<span class="location-name">{{ userLocation }}</span>
</div>
</div>
<button class="change-location-btn" @click="changeLocation">
<span>Change</span>
</button>
</div>

<!-- FILTERS -->
<div class="filters-bar">
<div class="filter-chips">
<button 
v-for="filter in filters" 
:key="filter.id"
:class="['filter-chip', { active: activeFilter === filter.id }]"
@click="activeFilter = filter.id">
<span class="filter-icon">{{ filter.icon }}</span>
<span class="filter-label">{{ filter.label }}</span>
</button>
</div>
</div>
</ion-header>

<ion-content class="page-content">
<div class="content-container">

<!-- MAP VIEW -->
<div v-if="viewMode === 'map'" class="map-view">
<div class="map-placeholder">
<div class="map-background">
<div class="map-marker" v-for="shop in nearbyShops" :key="shop.id" 
:style="{ top: shop.mapPosition.y + '%', left: shop.mapPosition.x + '%' }"
@click="selectShop(shop.id)">
<div class="marker-pin">☕</div>
<div v-if="selectedShopId === shop.id" class="marker-popup">
<span class="popup-name">{{ shop.name }}</span>
<span class="popup-distance">{{ shop.distance }} km</span>
</div>
</div>
<div class="user-marker">
<div class="user-pin">📍</div>
</div>
</div>
</div>

<!-- MAP OVERLAY CARD -->
<div v-if="selectedShopId" class="map-overlay-card">
<div class="overlay-shop-card" v-if="selectedShop">
<button class="close-overlay-btn" @click="selectedShopId = null">
<ion-icon :icon="closeOutline"></ion-icon>
</button>

<div class="overlay-image-wrapper">
<img :src="selectedShop.image" :alt="selectedShop.name" />
</div>

<div class="overlay-content">
<div class="overlay-header">
<h3>{{ selectedShop.name }}</h3>
<div class="overlay-rating">
<ion-icon :icon="starSharp"></ion-icon>
<span>{{ selectedShop.rating }}</span>
</div>
</div>

<div class="overlay-meta">
<span class="overlay-distance">
<ion-icon :icon="locationOutline"></ion-icon>
{{ selectedShop.distance }} km
</span>
<span class="overlay-time">{{ selectedShop.deliveryTime }}</span>
</div>

<button class="overlay-order-btn" @click="viewShopMenu(selectedShop.id)">
<span>Order Now</span>
<ion-icon :icon="arrowForwardOutline"></ion-icon>
</button>
</div>
</div>
</div>
</div>

<!-- LIST VIEW -->
<div v-if="viewMode === 'list'" class="list-view">

<!-- QUICK FILTERS -->
<div class="quick-filters">
<button 
:class="['quick-filter-btn', { active: sortBy === 'distance' }]"
@click="sortBy = 'distance'">
<ion-icon :icon="navigateOutline"></ion-icon>
<span>Nearest</span>
</button>
<button 
:class="['quick-filter-btn', { active: sortBy === 'rating' }]"
@click="sortBy = 'rating'">
<ion-icon :icon="starOutline"></ion-icon>
<span>Top Rated</span>
</button>
<button 
:class="['quick-filter-btn', { active: sortBy === 'delivery' }]"
@click="sortBy = 'delivery'">
<ion-icon :icon="timeOutline"></ion-icon>
<span>Fastest</span>
</button>
</div>

<!-- SHOPS LIST -->
<div class="shops-list">
<div 
v-for="shop in sortedShops" 
:key="shop.id" 
class="shop-card"
@click="viewShopMenu(shop.id)">

<div class="shop-image-wrapper">
<img :src="shop.image" :alt="shop.name" class="shop-image" />

<div v-if="shop.offer" class="offer-badge">
<ion-icon :icon="pricetagOutline"></ion-icon>
<span>{{ shop.offer }}</span>
</div>

<button 
class="favorite-btn" 
:class="{ active: shop.favorite }"
@click.stop="toggleFavorite(shop.id)">
<ion-icon :icon="shop.favorite ? heartSharp : heartOutline"></ion-icon>
</button>
</div>

<div class="shop-content">
<div class="shop-header">
<h3 class="shop-name">{{ shop.name }}</h3>
<div class="shop-status" :class="shop.status">
<span class="status-dot"></span>
<span class="status-text">{{ shop.status === 'open' ? 'Open' : 'Closed' }}</span>
</div>
</div>

<p class="shop-description">{{ shop.description }}</p>

<div class="shop-tags">
<span v-for="tag in shop.tags" :key="tag" class="tag">{{ tag }}</span>
</div>

<div class="shop-info">
<div class="info-item">
<ion-icon :icon="starSharp"></ion-icon>
<span>{{ shop.rating }}</span>
<span class="info-subtext">({{ shop.reviews }})</span>
</div>
<div class="info-divider"></div>
<div class="info-item">
<ion-icon :icon="locationOutline"></ion-icon>
<span>{{ shop.distance }} km</span>
</div>
<div class="info-divider"></div>
<div class="info-item">
<ion-icon :icon="timeOutline"></ion-icon>
<span>{{ shop.deliveryTime }}</span>
</div>
</div>

<div class="shop-footer">
<div class="popular-items">
<span class="popular-label">Popular:</span>
<span class="popular-item" v-for="(item, index) in shop.popularItems.slice(0, 2)" :key="index">
{{ item }}<span v-if="index < 1">,</span>
</span>
</div>
<button class="quick-order-btn" @click.stop="quickOrder(shop.id)">
<ion-icon :icon="flashOutline"></ion-icon>
<span>Quick Order</span>
</button>
</div>
</div>
</div>
</div>
</div>

</div>
</ion-content>

<!-- FLOATING FILTER BUTTON -->
<button v-if="viewMode === 'map'" class="fab-filter-btn" @click="showFilterModal">
<ion-icon :icon="funnelOutline"></ion-icon>
</button>
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
listOutline,
mapOutline,
locationSharp,
locationOutline,
starSharp,
starOutline,
arrowForwardOutline,
closeOutline,
navigateOutline,
timeOutline,
pricetagOutline,
heartOutline,
heartSharp,
flashOutline,
funnelOutline,
} from "ionicons/icons";

const router = useRouter();

const viewMode = ref('list'); // 'map' or 'list'
const userLocation = ref('Downtown, Kampala');
const activeFilter = ref('all');
const sortBy = ref('distance');
const selectedShopId = ref(null);

const filters = [
{ id: 'all', label: 'All', icon: '☕' },
{ id: 'delivery', label: 'Delivery', icon: '🚚' },
{ id: 'pickup', label: 'Pickup', icon: '🏃' },
{ id: 'dine-in', label: 'Dine-in', icon: '🪑' },
{ id: 'open-now', label: 'Open Now', icon: '⏰' }
];

const nearbyShops = ref([
{
id: 1,
name: 'Brew & Beans',
description: 'Artisan coffee roasted daily with pastries',
image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600',
rating: 4.8,
reviews: 234,
distance: 0.5,
deliveryTime: '15-20 min',
status: 'open',
offer: '20% OFF',
tags: ['Specialty Coffee', 'Pastries', 'WiFi'],
popularItems: ['Cappuccino', 'Croissant', 'Latte'],
favorite: false,
mapPosition: { x: 35, y: 45 }
},
{
id: 2,
name: 'The Coffee House',
description: 'Cozy atmosphere with premium single origins',
image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600',
rating: 4.9,
reviews: 456,
distance: 0.8,
deliveryTime: '20-25 min',
status: 'open',
offer: null,
tags: ['Single Origin', 'Cold Brew', 'Outdoor'],
popularItems: ['Pour Over', 'Cold Brew', 'Espresso'],
favorite: true,
mapPosition: { x: 55, y: 35 }
},
{
id: 3,
name: 'Java Junction',
description: 'Quick service coffee and breakfast sandwiches',
image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
rating: 4.6,
reviews: 189,
distance: 1.2,
deliveryTime: '25-30 min',
status: 'open',
offer: 'Free Delivery',
tags: ['Fast Service', 'Breakfast', 'Smoothies'],
popularItems: ['Americano', 'Bagel', 'Smoothie'],
favorite: false,
mapPosition: { x: 45, y: 60 }
},
{
id: 4,
name: 'Espresso Express',
description: 'Italian-style espresso bar and gelato',
image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600',
rating: 4.7,
reviews: 312,
distance: 1.5,
deliveryTime: '30-35 min',
status: 'open',
offer: null,
tags: ['Italian', 'Gelato', 'Panini'],
popularItems: ['Macchiato', 'Gelato', 'Tiramisu'],
favorite: false,
mapPosition: { x: 65, y: 50 }
},
{
id: 5,
name: 'Morning Grind',
description: 'Early opening for your morning coffee fix',
image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600',
rating: 4.5,
reviews: 167,
distance: 1.8,
deliveryTime: '35-40 min',
status: 'open',
offer: null,
tags: ['Early Opening', 'Grab & Go', 'Muffins'],
popularItems: ['Drip Coffee', 'Muffin', 'Breakfast Wrap'],
favorite: false,
mapPosition: { x: 25, y: 55 }
},
{
id: 6,
name: 'Roast & Toast',
description: 'Small batch roastery with tasting sessions',
image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
rating: 4.9,
reviews: 421,
distance: 2.1,
deliveryTime: '40-45 min',
status: 'open',
offer: '10% OFF',
tags: ['Roastery', 'Tasting', 'Beans'],
popularItems: ['Ethiopian Pour Over', 'Coffee Beans', 'Tasting Flight'],
favorite: true,
mapPosition: { x: 70, y: 40 }
},
{
id: 7,
name: 'Café Noir',
description: 'French-inspired café with wine and cheese',
image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600',
rating: 4.8,
reviews: 289,
distance: 2.4,
deliveryTime: '45-50 min',
status: 'closed',
offer: null,
tags: ['French', 'Wine Bar', 'Cheese'],
popularItems: ['Café au Lait', 'Croissant', 'Quiche'],
favorite: false,
mapPosition: { x: 40, y: 30 }
},
{
id: 8,
name: 'Bean Scene',
description: 'Hip café with live music on weekends',
image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
rating: 4.6,
reviews: 234,
distance: 2.7,
deliveryTime: '50-55 min',
status: 'open',
offer: null,
tags: ['Live Music', 'Craft Beer', 'Vegan'],
popularItems: ['Oat Milk Latte', 'Avocado Toast', 'Craft Beer'],
favorite: false,
mapPosition: { x: 60, y: 65 }
}
]);

const selectedShop = computed(() => {
return nearbyShops.value.find(shop => shop.id === selectedShopId.value);
});

const sortedShops = computed(() => {
let shops = [...nearbyShops.value];

// Filter by status if needed
if (activeFilter.value === 'open-now') {
shops = shops.filter(shop => shop.status === 'open');
}

// Sort
if (sortBy.value === 'distance') {
shops.sort((a, b) => a.distance - b.distance);
} else if (sortBy.value === 'rating') {
shops.sort((a, b) => b.rating - a.rating);
} else if (sortBy.value === 'delivery') {
shops.sort((a, b) => {
const aTime = parseInt(a.deliveryTime.split('-')[0]);
const bTime = parseInt(b.deliveryTime.split('-')[0]);
return aTime - bTime;
});
}

return shops;
});

const goBack = () => {
router.back();
};

const toggleView = () => {
viewMode.value = viewMode.value === 'map' ? 'list' : 'map';
selectedShopId.value = null;
};

const changeLocation = () => {
alert('Change location feature coming soon!');
};

const selectShop = (shopId) => {
selectedShopId.value = selectedShopId.value === shopId ? null : shopId;
};

const viewShopMenu = (shopId) => {
console.log('View menu for shop:', shopId);
alert(`Opening menu for shop ${shopId}...`);
};

const quickOrder = (shopId) => {
console.log('Quick order from shop:', shopId);
alert(`Quick order from shop ${shopId} coming soon!`);
};

const toggleFavorite = (shopId) => {
const shop = nearbyShops.value.find(s => s.id === shopId);
if (shop) {
shop.favorite = !shop.favorite;
}
};

const showFilterModal = () => {
alert('Filters coming soon!');
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
}

.header-title {
font-size: 18px;
font-weight: 700;
color: var(--coffee-dark);
}

/* ===== LOCATION BAR ===== */
.location-bar {
display: flex;
align-items: center;
justify-content: space-between;
gap: 12px;
padding: 16px;
background: white;
}

.location-info {
display: flex;
align-items: center;
gap: 14px;
flex: 1;
}

.location-info > ion-icon {
font-size: 28px;
color: var(--red);
flex-shrink: 0;
animation: pulse-location 2s ease-in-out infinite;
}

@keyframes pulse-location {
0%, 100% { transform: scale(1); }
50% { transform: scale(1.1); }
}

.location-text {
display: flex;
flex-direction: column;
gap: 4px;
flex: 1;
min-width: 0;
}

.location-label {
font-size: 11px;
font-weight: 800;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 1px;
}

.location-name {
font-size: 16px;
font-weight: 900;
color: var(--coffee-dark);
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}

.change-location-btn {
padding: 10px 20px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.06));
border: none;
border-radius: 12px;
font-size: 14px;
font-weight: 900;
color: var(--coffee-dark);
cursor: pointer;
flex-shrink: 0;
transition: all 0.3s ease;
}

.change-location-btn:active {
transform: scale(0.95);
background: rgba(107, 66, 38, 0.12);
}

/* ===== FILTERS BAR ===== */
.filters-bar {
padding: 0 16px 16px;
background: white;
overflow-x: auto;
-webkit-overflow-scrolling: touch;
}

.filters-bar::-webkit-scrollbar {
display: none;
}

.filter-chips {
display: flex;
gap: 10px;
}

.filter-chip {
display: flex;
align-items: center;
gap: 8px;
padding: 12px 18px;
background: rgba(107, 66, 38, 0.06);
border: none;
border-radius: 16px;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
white-space: nowrap;
flex-shrink: 0;
}

.filter-chip:active {
transform: scale(0.95);
}

.filter-chip.active {
background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
}

.filter-icon {
font-size: 20px;
transition: transform 0.3s ease;
}

.filter-chip.active .filter-icon {
transform: scale(1.1);
}

.filter-label {
font-size: 14px;
font-weight: 900;
color: var(--coffee-dark);
letter-spacing: 0.3px;
}

.filter-chip.active .filter-label {
color: white;
}

/* ===== CONTENT ===== */
.page-content {
--background: #f5f5f5;
}

.content-container {
height: 100%;
}

/* ===== MAP VIEW ===== */
.map-view {
height: 100%;
position: relative;
}

.map-placeholder {
width: 100%;
height: 100%;
background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
position: relative;
}

.map-background {
width: 100%;
height: 100%;
background: 
linear-gradient(0deg, rgba(255,255,255,0.2) 1px, transparent 1px),
linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px);
background-size: 60px 60px;
position: relative;
}

.map-marker {
position: absolute;
transform: translate(-50%, -50%);
cursor: pointer;
z-index: 10;
animation: markerAppear 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes markerAppear {
from {
transform: translate(-50%, -50%) scale(0);
opacity: 0;
}
to {
transform: translate(-50%, -50%) scale(1);
opacity: 1;
}
}

.marker-pin {
width: 48px;
height: 48px;
background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
border: 4px solid white;
border-radius: 50% 50% 50% 0;
transform: rotate(-45deg);
display: flex;
align-items: center;
justify-content: center;
font-size: 24px;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.map-marker:hover .marker-pin,
.map-marker:active .marker-pin {
transform: rotate(-45deg) scale(1.2);
}

.marker-pin::before {
content: '';
transform: rotate(45deg);
}

.marker-popup {
position: absolute;
bottom: 60px;
left: 50%;
transform: translateX(-50%);
display: flex;
flex-direction: column;
gap: 4px;
padding: 12px 16px;
background: white;
border: none;
border-radius: 14px;
white-space: nowrap;
animation: popupAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes popupAppear {
from {
transform: translateX(-50%) translateY(10px);
opacity: 0;
}
to {
transform: translateX(-50%) translateY(0);
opacity: 1;
}
}

.marker-popup::after {
content: '';
position: absolute;
bottom: -8px;
left: 50%;
transform: translateX(-50%) rotate(45deg);
width: 14px;
height: 14px;
background: white;
}

.popup-name {
font-size: 15px;
font-weight: 900;
color: var(--coffee-dark);
}

.popup-distance {
font-size: 13px;
font-weight: 700;
color: var(--text-light);
}

.user-marker {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 11;
animation: userMarkerPulse 2s ease-in-out infinite;
}

@keyframes userMarkerPulse {
0%, 100% { transform: translate(-50%, -50%) scale(1); }
50% { transform: translate(-50%, -50%) scale(1.15); }
}

.user-pin {
width: 38px;
height: 38px;
background: linear-gradient(135deg, #ef4444, #dc2626);
border: 5px solid white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 20px;
}

.user-pin::before {
content: '';
position: absolute;
width: 100%;
height: 100%;
border-radius: 50%;
background: rgba(239, 68, 68, 0.3);
animation: ripple 2s ease-in-out infinite;
}

@keyframes ripple {
0% {
transform: scale(1);
opacity: 1;
}
100% {
transform: scale(2);
opacity: 0;
}
}

/* ===== MAP OVERLAY CARD ===== */
.map-overlay-card {
position: absolute;
bottom: 0;
left: 0;
right: 0;
padding: 16px;
z-index: 20;
animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
from {
transform: translateY(100%);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}

.overlay-shop-card {
position: relative;
background: white;
border-radius: 28px;
overflow: hidden;
display: flex;
gap: 18px;
}

.close-overlay-btn {
position: absolute;
top: 14px;
right: 14px;
width: 40px;
height: 40px;
display: flex;
align-items: center;
justify-content: center;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
border: none;
border-radius: 50%;
cursor: pointer;
z-index: 2;
transition: all 0.3s ease;
}

.close-overlay-btn:active {
transform: scale(0.85);
}

.close-overlay-btn ion-icon {
font-size: 24px;
color: var(--coffee-dark);
}

.overlay-image-wrapper {
width: 140px;
height: 140px;
flex-shrink: 0;
background: linear-gradient(135deg, #f0f0f0, #e8e8e8);
overflow: hidden;
}

.overlay-image-wrapper img {
width: 100%;
height: 100%;
object-fit: cover;
}

.overlay-content {
flex: 1;
padding: 18px 18px 18px 0;
display: flex;
flex-direction: column;
gap: 12px;
}

.overlay-header {
display: flex;
align-items: flex-start;
justify-content: space-between;
gap: 12px;
}

.overlay-header h3 {
font-size: 18px;
font-weight: 900;
color: var(--coffee-dark);
margin: 0;
line-height: 1.3;
flex: 1;
}

.overlay-rating {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: linear-gradient(135deg, rgba(255, 152, 0, 0.12), rgba(255, 152, 0, 0.08));
border: none;
border-radius: 12px;
flex-shrink: 0;
}

.overlay-rating ion-icon {
font-size: 18px;
color: var(--orange);
}

.overlay-rating span {
font-size: 15px;
font-weight: 900;
color: var(--orange);
}

.overlay-meta {
display: flex;
align-items: center;
gap: 16px;
}

.overlay-distance,
.overlay-time {
display: flex;
align-items: center;
gap: 6px;
font-size: 14px;
font-weight: 900;
color: var(--text-light);
}

.overlay-distance ion-icon {
font-size: 18px;
}

.overlay-order-btn {
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
padding: 16px;
background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
border: none;
border-radius: 14px;
color: white;
font-size: 16px;
font-weight: 900;
cursor: pointer;
margin-top: auto;
transition: all 0.3s ease;
}

.overlay-order-btn:active {
transform: scale(0.95);
}

.overlay-order-btn ion-icon {
font-size: 22px;
}

/* ===== LIST VIEW ===== */
.list-view {
padding: 12px;
}

/* ===== QUICK FILTERS ===== */
.quick-filters {
display: flex;
gap: 12px;
margin-bottom: 20px;
}

.quick-filter-btn {
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;
padding: 18px 12px;
background: white;
border: none;
border-radius: 20px;
font-size: 13px;
font-weight: 900;
color: var(--coffee-dark);
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.quick-filter-btn ion-icon {
font-size: 28px;
transition: transform 0.3s ease;
}

.quick-filter-btn:active {
transform: scale(0.95);
}

.quick-filter-btn.active {
background: linear-gradient(135deg, rgba(107, 66, 38, 0.10), rgba(107, 66, 38, 0.08));
}

.quick-filter-btn.active ion-icon {
color: var(--coffee-medium);
transform: scale(1.15);
}

/* ===== SHOPS LIST ===== */
.shops-list {
display: flex;
flex-direction: column;
gap: 20px;
}

.shop-card {
background: white;
border-radius: 28px;
overflow: hidden;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.shop-card:active {
transform: scale(0.98);
}

.shop-image-wrapper {
position: relative;
width: 100%;
height: 240px;
background: linear-gradient(135deg, #f0f0f0, #e8e8e8);
overflow: hidden;
}

.shop-image {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.shop-card:active .shop-image {
transform: scale(1.08);
}

.offer-badge {
position: absolute;
top: 16px;
left: 16px;
display: flex;
align-items: center;
gap: 6px;
padding: 10px 16px;
background: linear-gradient(135deg, #ef4444, #dc2626);
border: none;
border-radius: 14px;
color: white;
font-size: 13px;
font-weight: 900;
letter-spacing: 0.5px;
}

.offer-badge ion-icon {
font-size: 18px;
}

.favorite-btn {
position: absolute;
top: 16px;
right: 16px;
width: 48px;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
border: none;
border-radius: 50%;
cursor: pointer;
z-index: 2;
transition: all 0.3s ease;
}

.favorite-btn:active {
transform: scale(0.85);
}

.favorite-btn ion-icon {
font-size: 26px;
color: var(--text-light);
transition: color 0.3s ease;
}

.favorite-btn.active ion-icon {
color: var(--red);
animation: heartBeat 0.5s ease;
}

@keyframes heartBeat {
0%, 100% { transform: scale(1); }
25% { transform: scale(1.3); }
50% { transform: scale(1.1); }
75% { transform: scale(1.2); }
}

.shop-content {
padding: 24px;
}

.shop-header {
display: flex;
align-items: flex-start;
justify-content: space-between;
gap: 14px;
margin-bottom: 12px;
}

.shop-name {
font-size: 22px;
font-weight: 900;
color: var(--coffee-dark);
margin: 0;
line-height: 1.3;
flex: 1;
}

.shop-status {
display: flex;
align-items: center;
gap: 7px;
padding: 8px 14px;
background: linear-gradient(135deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.02));
border: none;
border-radius: 12px;
flex-shrink: 0;
}

.status-dot {
width: 9px;
height: 9px;
border-radius: 50%;
background: #d0d0d0;
}

.shop-status.open .status-dot {
background: var(--green);
animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
0%, 100% { opacity: 1; }
50% { opacity: 0.6; }
}

.status-text {
font-size: 13px;
font-weight: 900;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.shop-status.open .status-text {
color: var(--green);
}

.shop-description {
font-size: 15px;
line-height: 1.6;
color: var(--text-light);
margin: 0 0 16px 0;
font-weight: 600;
}

.shop-tags {
display: flex;
flex-wrap: wrap;
gap: 10px;
margin-bottom: 16px;
}

.tag {
padding: 8px 14px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.06));
border: none;
border-radius: 12px;
font-size: 12px;
font-weight: 900;
color: var(--coffee-dark);
letter-spacing: 0.3px;
}

.shop-info {
display: flex;
align-items: center;
gap: 16px;
padding: 16px;
background: linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.02));
border: none;
border-radius: 16px;
margin-bottom: 16px;
}

.info-item {
display: flex;
align-items: center;
gap: 6px;
font-size: 14px;
font-weight: 900;
color: var(--coffee-dark);
}

.info-item ion-icon {
font-size: 20px;
}

.info-item ion-icon:first-child {
color: var(--orange);
}

.info-subtext {
font-size: 12px;
color: var(--text-light);
font-weight: 700;
}

.info-divider {
width: 2px;
height: 20px;
background: rgba(0, 0, 0, 0.08);
border-radius: 2px;
}

.shop-footer {
display: flex;
align-items: center;
justify-content: space-between;
gap: 14px;
padding-top: 16px;
}

.popular-items {
flex: 1;
display: flex;
align-items: center;
gap: 6px;
font-size: 14px;
color: var(--text-light);
font-weight: 600;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}

.popular-label {
font-weight: 900;
color: var(--coffee-dark);
}

.quick-order-btn {
display: flex;
align-items: center;
gap: 8px;
padding: 14px 22px;
background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
border: none;
border-radius: 14px;
color: white;
font-size: 15px;
font-weight: 900;
cursor: pointer;
flex-shrink: 0;
transition: all 0.3s ease;
}

.quick-order-btn:active {
transform: scale(0.95);
}

.quick-order-btn ion-icon {
font-size: 20px;
}

/* ===== FAB FILTER BUTTON ===== */
.fab-filter-btn {
position: fixed;
bottom: 24px;
right: 24px;
width: 56px;
height: 56px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, var(--coffee-medium), var(--coffee-dark));
border: none;
border-radius: 50%;
color: white;
cursor: pointer;
box-shadow: 0 4px 12px rgba(74, 44, 42, 0.4);
z-index: 100;
}

.fab-filter-btn ion-icon {
font-size: 28px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
.overlay-shop-card {
flex-direction: column;
}

.overlay-image-wrapper {
width: 100%;
height: 140px;
}

.overlay-content {
padding: 14px;
}
}
</style>
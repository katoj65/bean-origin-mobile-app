<template>
<ion-page>
<!-- HEADER -->
<ion-header class="ion-no-border">
<ion-toolbar class="shop-toolbar">
<ion-buttons slot="start">
<ion-button class="header-btn" @click="goBack">
<ion-icon :icon="arrowBackOutline"></ion-icon>
</ion-button>
</ion-buttons>

<ion-title class="shop-title">{{ shop.name }}</ion-title>

<ion-buttons slot="end">
<ion-button class="header-btn" @click="openMap">
<ion-icon :icon="mapOutline"></ion-icon>
</ion-button>
<ion-button class="header-btn" @click="shareShop">
<ion-icon :icon="shareOutline"></ion-icon>
</ion-button>
</ion-buttons>
</ion-toolbar>
</ion-header>

<!-- CONTENT -->
<ion-content class="shop-content">
<div v-if="shop" class="content-wrapper">

<!-- COFFEE SHOP BANNER -->
<div class="banner-section">
<div class="banner-image-wrapper">
<img :src="shop.heroImage" :alt="shop.name" class="banner-image" />
<div class="banner-overlay"></div>
<div class="shop-badge-floating" :class="shop.badgeType">
<ion-icon :icon="shop.badgeType === 'verified' ? checkmarkCircleSharp : starSharp"></ion-icon>
<span>{{ shop.badge }}</span>
</div>
</div>

<!-- OVERLAPPING INFO CARD -->
<div class="hero-info-overlay">
<div class="hero-info-content">
<div class="hero-name-row">
<h1 class="hero-shop-name">{{ shop.name }}</h1>
<button class="hero-favorite-btn" :class="{ active: isFavorite }" @click="toggleFavorite">
<ion-icon :icon="isFavorite ? heartSharp : heartOutline"></ion-icon>
</button>
</div>

<div class="hero-meta-row">
<div class="hero-rating-compact">
<ion-icon :icon="starSharp" class="star-compact"></ion-icon>
<!-- <span class="rating-compact">{{ shop.rating.toFixed(1) }}</span>
<span class="reviews-compact">({{ shop.reviews }})</span> -->
</div>

<div class="hero-status-compact" :class="shop.isOpen ? 'open' : 'closed'">
<span class="status-dot-compact"></span>
<span>{{ shop.isOpen ? 'Open' : 'Closed' }}</span>
</div>

<div class="hero-distance-compact">
<ion-icon :icon="locationSharp"></ion-icon>
<span>0.5 km</span>
</div>
</div>

<div class="hero-category-tag">{{ shop.category }}</div>
</div>
</div>
</div>

<!-- QUICK ACTIONS -->
<div class="quick-actions-grid">
<button class="quick-action-item" @click="callShop">
<div class="quick-action-icon call">
<ion-icon :icon="callSharp"></ion-icon>
</div>
<span class="quick-action-label">Call</span>
</button>

<button class="quick-action-item" @click="getDirections">
<div class="quick-action-icon directions">
<ion-icon :icon="navigateSharp"></ion-icon>
</div>
<span class="quick-action-label">Directions</span>
</button>

<button class="quick-action-item" @click="bookTable">
<div class="quick-action-icon book">
<ion-icon :icon="calendarSharp"></ion-icon>
</div>
<span class="quick-action-label">Book</span>
</button>

<button class="quick-action-item" @click="shareShop">
<div class="quick-action-icon share">
<ion-icon :icon="shareOutline"></ion-icon>
</div>
<span class="quick-action-label">Share</span>
</button>
</div>

<!-- ADDRESS INFO -->
<div class="address-info-card">
<div class="address-icon-wrapper">
<ion-icon :icon="locationSharp"></ion-icon>
</div>
<div class="address-content">
<span class="address-label">Address</span>
<span class="address-text-main">{{ shop.address }}</span>
</div>
<button class="address-action-btn" @click="openMap">
<ion-icon :icon="chevronForwardOutline"></ion-icon>
</button>
</div>

<!-- DESCRIPTION -->
<div class="description-card">
<div class="description-header">
<h2 class="section-title">About This Shop</h2>
<div class="description-rating">
<div class="rating-stars-large">
<ion-icon 
v-for="i in 5" 
:key="i"
:icon="i <= Math.floor(shop.rating) ? starSharp : starOutline"
class="star-large"
></ion-icon>
</div>
<div class="rating-info">
<span class="rating-value-large">{{ shop.rating.toFixed(1) }}</span>
<span class="rating-count-small">{{ shop.reviews }} reviews</span>
</div>
</div>
</div>

<p class="description-text">{{ shop.description }}</p>

<div class="highlights-section">
<h3 class="subsection-title">Specialty Highlights</h3>
<div class="highlights-grid">
<div v-for="highlight in shop.highlights" :key="highlight" class="highlight-item">
<span class="highlight-bullet">☕</span>
<span class="highlight-text">{{ highlight }}</span>
</div>
</div>
</div>

<div class="features-section">
<h3 class="subsection-title">Features</h3>
<div class="features-grid">
<div v-for="feature in shop.features" :key="feature.name" class="feature-item">
<span class="feature-emoji">{{ feature.emoji }}</span>
<span class="feature-name">{{ feature.name }}</span>
</div>
</div>
</div>
</div>

<!-- OPERATIONAL DETAILS -->
<div class="operational-card">
<h2 class="section-title">Hours & Contact</h2>

<!-- Opening Hours -->
<div class="hours-section">
<div class="hours-header">
<span class="hours-label">Opening Hours</span>
<button class="expand-btn" @click="toggleHours">
<span>{{ showAllHours ? 'Show Less' : 'View All' }}</span>
<ion-icon :icon="showAllHours ? chevronUpOutline : chevronDownOutline"></ion-icon>
</button>
</div>

<div class="hours-today">
<span class="day-name">Today</span>
<span class="day-hours">{{ shop.hours[getTodayIndex()].hours }}</span>
</div>

<transition name="expand">
<div v-if="showAllHours" class="hours-list">
<div 
v-for="(day, index) in shop.hours" 
:key="day.day"
class="hour-row"
:class="{ today: index === getTodayIndex() }"
>
<span class="day-name">{{ day.day }}</span>
<span class="day-hours">{{ day.hours }}</span>
</div>
</div>
</transition>
</div>

<!-- Contact Info -->
<div class="contact-section">
<div class="contact-item" @click="callShop">
<ion-icon :icon="callOutline" class="contact-icon"></ion-icon>
<div class="contact-content">
<span class="contact-label">Phone</span>
<span class="contact-value">{{ shop.phone }}</span>
</div>
<ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
</div>

<div class="contact-item" @click="openWhatsApp">
<ion-icon :icon="logoWhatsapp" class="contact-icon whatsapp"></ion-icon>
<div class="contact-content">
<span class="contact-label">WhatsApp</span>
<span class="contact-value">{{ shop.whatsapp }}</span>
</div>
<ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
</div>

<div class="contact-item" @click="openInstagram">
<ion-icon :icon="logoInstagram" class="contact-icon instagram"></ion-icon>
<div class="contact-content">
<span class="contact-label">Instagram</span>
<span class="contact-value">{{ shop.instagram }}</span>
</div>
<ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
</div>

<div class="contact-item" @click="openMap">
<ion-icon :icon="navigateOutline" class="contact-icon"></ion-icon>
<div class="contact-content">
<span class="contact-label">Location</span>
<span class="contact-value">Get Directions</span>
</div>
<ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
</div>
</div>
</div>

<!-- GALLERY -->
<div class="gallery-section">
<h2 class="section-title">Gallery</h2>
<div class="gallery-carousel">
<div 
v-for="(image, index) in shop.gallery" 
:key="index"
class="gallery-item"
@click="viewImage(index)"
>
<img :src="image" :alt="`Gallery ${index + 1}`" class="gallery-image" />
</div>
</div>
</div>

<!-- COFFEE MENU PREVIEW -->
<div class="menu-section">
<div class="menu-header">
<h2 class="section-title">Coffee Menu</h2>
<button class="view-menu-link" @click="viewFullMenu">
<span>Full Menu</span>
<ion-icon :icon="chevronForwardOutline"></ion-icon>
</button>
</div>

<div class="menu-grid">
<div 
v-for="item in shop.menuPreview" 
:key="item.id"
class="menu-item-card"
>
<div class="menu-item-content">
<div class="menu-item-header">
<h4 class="menu-item-name">{{ item.name }}</h4>
<span class="menu-item-price">${{ item.price.toFixed(2) }}</span>
</div>
<p class="menu-item-description">{{ item.description }}</p>
<span class="menu-item-category">{{ item.category }}</span>
</div>
</div>
</div>

<button class="view-full-menu-btn" @click="viewFullMenu">
<span>View Full Menu</span>
<ion-icon :icon="arrowForwardOutline"></ion-icon>
</button>
</div>

<!-- REVIEWS -->
<div class="reviews-section">
<div class="reviews-header">
<h2 class="section-title">Customer Reviews</h2>
<button class="write-review-link" @click="writeReview">
<ion-icon :icon="createOutline"></ion-icon>
<span>Write Review</span>
</button>
</div>

<div class="reviews-list">
<div 
v-for="review in shop.reviews" 
:key="review.id"
class="review-card"
>
<div class="review-header">
<div class="reviewer-info">
<div class="reviewer-avatar">{{ review.avatar }}</div>
<div class="reviewer-details">
<h4 class="reviewer-name">{{ review.name }}</h4>
<span class="review-date">{{ review.date }}</span>
</div>
</div>
<div class="review-rating">
<ion-icon :icon="starSharp"></ion-icon>
<span>{{ review.rating.toFixed(1) }}</span>
</div>
</div>
<p class="review-text">{{ review.text }}</p>
</div>
</div>

<button class="write-review-btn" @click="writeReview">
<ion-icon :icon="createOutline"></ion-icon>
<span>Write a Review</span>
</button>
</div>

<!-- CONTACT & BOOKING -->
<div class="actions-section">
<div class="action-buttons">
<button class="action-btn primary" @click="callShop">
<ion-icon :icon="callSharp"></ion-icon>
<span>Call Shop</span>
</button>
<button class="action-btn secondary" @click="bookTable">
<ion-icon :icon="calendarOutline"></ion-icon>
<span>Book Table</span>
</button>
<button class="action-btn secondary" @click="orderBeans">
<ion-icon :icon="bagHandleOutline"></ion-icon>
<span>Order Beans</span>
</button>
</div>
</div>

<!-- RECOMMENDED SHOPS -->
<div class="recommended-section">
<div class="recommended-header">
<h2 class="section-title">Similar Shops</h2>
<button class="view-all-link" @click="viewAllShops">
<span>View All</span>
<ion-icon :icon="chevronForwardOutline"></ion-icon>
</button>
</div>

<div class="recommended-carousel">
<div 
v-for="item in recommendedShops" 
:key="item.id"
class="recommended-card"
@click="viewShop(item.id)"
>
<div class="recommended-image-wrapper">
<img :src="item.image" :alt="item.name" class="recommended-image" />
</div>
<div class="recommended-info">
<h4 class="recommended-name">{{ item.name }}</h4>
<div class="recommended-meta">
<div class="recommended-rating">
<ion-icon :icon="starSharp"></ion-icon>
<span>{{ item.rating.toFixed(1) }}</span>
</div>
<span class="recommended-distance">{{ item.distance.toFixed(1) }} km</span>
</div>
<span class="recommended-category">{{ item.category }}</span>
</div>
</div>
</div>
</div>

</div>
</ion-content>
</ion-page>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {
IonPage,
IonHeader,
IonToolbar,
IonButtons,
IonButton,
IonTitle,
IonContent,
IonIcon,
} from "@ionic/vue";
import {
arrowBackOutline,
mapOutline,
shareOutline,
starSharp,
starOutline,
checkmarkCircleSharp,
locationOutline,
locationSharp,
chevronDownOutline,
chevronUpOutline,
chevronForwardOutline,
callOutline,
callSharp,
logoWhatsapp,
logoInstagram,
navigateOutline,
navigateSharp,
arrowForwardOutline,
createOutline,
calendarOutline,
calendarSharp,
bagHandleOutline,
heartOutline,
heartSharp,
} from "ionicons/icons";

const router = useRouter();
const showAllHours = ref(false);
const isFavorite = ref(false);

const toggleFavorite = () => {
isFavorite.value = !isFavorite.value;
};

const getDirections = () => {
console.log('Get directions');
};

const shop = reactive({
id: 1,
name: 'Brew & Beans Coffee House',
heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
badge: 'Top Rated',
badgeType: 'top-rated',
rating: 4.8,
reviews: 342,
category: 'Specialty Coffee & Roastery',
isOpen: true,
address: '123 Coffee Street, Downtown, Kampala',
description: 'Welcome to Brew & Beans, where passion meets precision. We\'re a specialty coffee house and roastery dedicated to bringing you the finest single-origin coffees from around the world. Our expert baristas craft each cup with care, using state-of-the-art equipment and time-honored techniques.',
highlights: [
'House-roasted single-origin beans',
'Award-winning barista team',
'Pour-over & cold brew specialists',
'Sustainable & ethically sourced'
],
features: [
{ name: 'Free WiFi', emoji: '📶' },
{ name: 'Outdoor Seating', emoji: '🪑' },
{ name: 'Roasts On Site', emoji: '☕' },
{ name: 'Takeaway', emoji: '🥤' }
],
hours: [
{ day: 'Monday', hours: '7:00 AM - 8:00 PM' },
{ day: 'Tuesday', hours: '7:00 AM - 8:00 PM' },
{ day: 'Wednesday', hours: '7:00 AM - 8:00 PM' },
{ day: 'Thursday', hours: '7:00 AM - 8:00 PM' },
{ day: 'Friday', hours: '7:00 AM - 9:00 PM' },
{ day: 'Saturday', hours: '8:00 AM - 9:00 PM' },
{ day: 'Sunday', hours: '8:00 AM - 7:00 PM' }
],
phone: '+256 700 123 456',
whatsapp: '+256 700 123 456',
instagram: '@brewandbeans',
gallery: [
'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400',
'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'
],
menuPreview: [
{
id: 1,
name: 'Signature Espresso',
description: 'Rich, bold espresso shot',
price: 3.50,
category: 'Espresso Drinks'
},
{
id: 2,
name: 'Ethiopian Pour-Over',
description: 'Bright, floral notes with citrus',
price: 5.00,
category: 'Filter Coffees'
},
{
id: 3,
name: 'House Blend Latte',
description: 'Smooth espresso with steamed milk',
price: 4.50,
category: 'Signature Blends'
},
{
id: 4,
name: 'Cold Brew',
description: 'Smooth, refreshing cold-steeped',
price: 4.00,
category: 'Cold Coffees'
}
],
reviews: [
{
id: 1,
name: 'Sarah Johnson',
avatar: 'SJ',
rating: 5.0,
date: '2 days ago',
text: 'Amazing coffee and atmosphere! The Ethiopian pour-over is absolutely incredible. The baristas are knowledgeable and passionate about their craft.'
},
{
id: 2,
name: 'Michael Chen',
avatar: 'MC',
rating: 4.5,
date: '1 week ago',
text: 'Great place to work remotely. Fast WiFi, comfortable seating, and excellent coffee. The house blend is my go-to!'
},
{
id: 3,
name: 'Emma Rodriguez',
avatar: 'ER',
rating: 5.0,
date: '2 weeks ago',
text: 'Best coffee shop in the city! Love that they roast their own beans. The staff is always friendly and welcoming.'
}
]
});

const recommendedShops = ref([
{
id: 2,
name: 'The Coffee Lab',
image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400',
rating: 4.7,
distance: 1.2,
category: 'Specialty Coffee'
},
{
id: 3,
name: 'Roast House Café',
image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400',
rating: 4.6,
distance: 0.8,
category: 'Coffee Roastery'
},
{
id: 4,
name: 'Urban Grind',
image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
rating: 4.9,
distance: 2.1,
category: 'Artisan Café'
},
{
id: 5,
name: 'Bean Bar',
image: 'https://images.unsplash.com/photo-1559496417-e7f25c0c4d05?w=400',
rating: 4.5,
distance: 1.5,
category: 'Coffee Bar'
}
]);

const getTodayIndex = () => {
return 2; // Wednesday for demo
};

const toggleHours = () => {
showAllHours.value = !showAllHours.value;
};

const goBack = () => {
router.back();
};

const openMap = () => {
console.log('Open map');
};

const shareShop = () => {
console.log('Share shop');
};

const callShop = () => {
console.log('Call shop');
};

const openWhatsApp = () => {
console.log('Open WhatsApp');
};

const openInstagram = () => {
console.log('Open Instagram');
};

const viewImage = (index) => {
console.log('View image:', index);
};

const viewFullMenu = () => {
console.log('View full menu');
};

const writeReview = () => {
console.log('Write review');
};

const bookTable = () => {
console.log('Book table');
};

const orderBeans = () => {
console.log('Order beans');
};

const viewAllShops = () => {
console.log('View all shops');
};

const viewShop = (id) => {
console.log('View shop:', id);
};
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
--bean-primary: #6b4226;
--bean-secondary: #3d2317;
--bean-accent: #d4a574;
--bean-light: #f5f1ed;
--bean-cream: #faf8f5;
--text-dark: #2d1810;
--text-medium: #5d4e46;
--text-light: #8b7c74;
--orange: #ff9800;
--green: #27ae60;
--blue: #3b82f6;
--purple: #8b5cf6;
--whatsapp: #25D366;
--instagram: #E4405F;
}

/* ===== HEADER ===== */
.shop-toolbar {
--background: var(--bean-cream);
--border-width: 0;
padding: 8px 4px;
box-shadow: 0 2px 8px rgba(107, 66, 38, 0.06);
}

.shop-title {
font-size: 18px;
font-weight: 800;
color: var(--text-dark);
letter-spacing: -0.2px;
}

.header-btn {
--background: rgba(107, 66, 38, 0.08);
--color: var(--text-dark);
width: 44px;
height: 44px;
margin: 4px;
border-radius: 50%;
transition: all 0.3s ease;
}

.header-btn:active {
transform: scale(0.92);
}

/* ===== CONTENT ===== */
.shop-content {
--background: var(--bean-cream);
}

.content-wrapper {
padding: 0 0 100px;
}

/* ===== BANNER SECTION - MODERN DESIGN ===== */
.banner-section {
padding: 0 0 20px;
position: relative;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeSlideUp {
from {
opacity: 0;
transform: translateY(20px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

.banner-image-wrapper {
position: relative;
width: 100%;
height: 320px;
overflow: hidden;
}

.banner-image {
width: 100%;
height: 100%;
object-fit: cover;
}

.banner-overlay {
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: 50%;
background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
pointer-events: none;
}

.shop-badge-floating {
position: absolute;
top: 16px;
right: 16px;
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(12px);
border-radius: 20px;
font-size: 12px;
font-weight: 900;
text-transform: uppercase;
letter-spacing: 0.5px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.shop-badge-floating ion-icon {
font-size: 16px;
}

.shop-badge-floating.top-rated {
color: var(--orange);
}

.shop-badge-floating.top-rated ion-icon {
color: var(--orange);
}

.shop-badge-floating.verified {
color: var(--blue);
}

.shop-badge-floating.verified ion-icon {
color: var(--blue);
}

/* ===== HERO INFO OVERLAY ===== */
.hero-info-overlay {
position: relative;
margin: -40px 20px 0;
z-index: 10;
}

.hero-info-content {
background: white;
border-radius: 24px;
padding: 20px;
box-shadow: 0 8px 24px rgba(107, 66, 38, 0.15);
}

.hero-name-row {
display: flex;
align-items: flex-start;
justify-content: space-between;
gap: 12px;
margin-bottom: 12px;
}

.hero-shop-name {
font-size: 26px;
font-weight: 900;
color: var(--text-dark);
margin: 0;
line-height: 1.2;
letter-spacing: -0.5px;
flex: 1;
}

.hero-favorite-btn {
width: 44px;
height: 44px;
display: flex;
align-items: center;
justify-content: center;
background: rgba(107, 66, 38, 0.08);
border: none;
border-radius: 50%;
color: var(--text-dark);
cursor: pointer;
flex-shrink: 0;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-favorite-btn:active {
transform: scale(0.9);
}

.hero-favorite-btn.active {
background: rgba(239, 68, 68, 0.12);
color: var(--red);
}

.hero-favorite-btn ion-icon {
font-size: 24px;
}

.hero-meta-row {
display: flex;
align-items: center;
gap: 12px;
flex-wrap: wrap;
margin-bottom: 14px;
}

.hero-rating-compact {
display: flex;
align-items: center;
gap: 5px;
padding: 6px 12px;
background: linear-gradient(135deg, rgba(255, 152, 0, 0.12), rgba(255, 152, 0, 0.08));
border-radius: 12px;
}

.star-compact {
font-size: 16px;
color: var(--orange);
}

.rating-compact {
font-size: 15px;
font-weight: 900;
color: var(--text-dark);
}

.reviews-compact {
font-size: 13px;
font-weight: 700;
color: var(--text-light);
}

.hero-status-compact {
display: flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
border-radius: 12px;
font-size: 13px;
font-weight: 800;
}

.hero-status-compact.open {
background: linear-gradient(135deg, rgba(39, 174, 96, 0.12), rgba(39, 174, 96, 0.08));
color: var(--green);
}

.hero-status-compact.closed {
background: linear-gradient(135deg, rgba(158, 158, 158, 0.12), rgba(158, 158, 158, 0.08));
color: #9e9e9e;
}

.status-dot-compact {
width: 8px;
height: 8px;
border-radius: 50%;
background: currentColor;
}

.hero-status-compact.open .status-dot-compact {
animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
0%, 100% { 
opacity: 1;
transform: scale(1);
}
50% { 
opacity: 0.7;
transform: scale(1.2);
}
}

.hero-distance-compact {
display: flex;
align-items: center;
gap: 5px;
padding: 6px 12px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
border-radius: 12px;
font-size: 13px;
font-weight: 800;
color: var(--text-dark);
}

.hero-distance-compact ion-icon {
font-size: 16px;
color: var(--bean-primary);
}

.hero-category-tag {
display: inline-block;
padding: 8px 14px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
border-radius: 12px;
font-size: 12px;
font-weight: 800;
color: var(--bean-primary);
letter-spacing: 0.3px;
}

/* ===== QUICK ACTIONS GRID ===== */
.quick-actions-grid {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 12px;
margin: 0 20px 20px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards;
}

.quick-action-item {
display: flex;
flex-direction: column;
align-items: center;
gap: 8px;
padding: 16px 8px;
background: white;
border: none;
border-radius: 20px;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
box-shadow: 0 2px 8px rgba(107, 66, 38, 0.08);
}

.quick-action-item:active {
transform: scale(0.95);
}

.quick-action-icon {
width: 48px;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
transition: all 0.3s ease;
}

.quick-action-icon ion-icon {
font-size: 24px;
color: white;
}

.quick-action-icon.call {
background: linear-gradient(135deg, #27ae60, #229954);
}

.quick-action-icon.directions {
background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.quick-action-icon.book {
background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.quick-action-icon.share {
background: linear-gradient(135deg, #ff9800, #f57c00);
}

.quick-action-label {
font-size: 12px;
font-weight: 800;
color: var(--text-dark);
letter-spacing: 0.2px;
}

/* ===== ADDRESS INFO CARD ===== */
.address-info-card {
display: flex;
align-items: center;
gap: 14px;
margin: 0 20px 20px;
padding: 16px;
background: white;
border-radius: 20px;
box-shadow: 0 2px 8px rgba(107, 66, 38, 0.08);
cursor: pointer;
transition: all 0.3s ease;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s backwards;
}

.address-info-card:active {
transform: scale(0.98);
}

.address-icon-wrapper {
width: 48px;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.08));
border-radius: 50%;
flex-shrink: 0;
}

.address-icon-wrapper ion-icon {
font-size: 24px;
color: var(--bean-primary);
}

.address-content {
display: flex;
flex-direction: column;
gap: 4px;
flex: 1;
min-width: 0;
}

.address-label {
font-size: 11px;
font-weight: 800;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.address-text-main {
font-size: 14px;
font-weight: 700;
color: var(--text-dark);
line-height: 1.4;
}

.address-action-btn {
width: 36px;
height: 36px;
display: flex;
align-items: center;
justify-content: center;
background: rgba(107, 66, 38, 0.08);
border: none;
border-radius: 50%;
flex-shrink: 0;
cursor: pointer;
transition: all 0.3s ease;
}

.address-action-btn:active {
transform: scale(0.9);
}

.address-action-btn ion-icon {
font-size: 20px;
color: var(--bean-primary);
}

/* ===== DESCRIPTION CARD ===== */
.description-card {
margin: 0 20px 16px;
padding: 24px;
background: white;
border-radius: 28px;
box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
}

.description-header {
display: flex;
align-items: flex-start;
justify-content: space-between;
gap: 16px;
margin-bottom: 18px;
flex-wrap: wrap;
}

.section-title {
font-size: 22px;
font-weight: 900;
color: var(--text-dark);
margin: 0;
letter-spacing: -0.3px;
flex: 1;
min-width: 150px;
}

.description-rating {
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 6px;
flex-shrink: 0;
}

.rating-stars-large {
display: flex;
gap: 4px;
}

.star-large {
font-size: 20px;
color: var(--orange);
}

.rating-info {
display: flex;
align-items: baseline;
gap: 6px;
}

.rating-value-large {
font-size: 28px;
font-weight: 900;
color: var(--text-dark);
line-height: 1;
letter-spacing: -0.5px;
}

.rating-count-small {
font-size: 12px;
font-weight: 700;
color: var(--text-light);
letter-spacing: 0.2px;
}

.description-text {
font-size: 15px;
line-height: 1.7;
color: var(--text-medium);
margin: 0 0 24px 0;
font-weight: 500;
}

.highlights-section {
margin-bottom: 24px;
}

.subsection-title {
font-size: 17px;
font-weight: 800;
color: var(--text-dark);
margin: 0 0 14px 0;
letter-spacing: -0.2px;
}

.highlights-grid {
display: flex;
flex-direction: column;
gap: 12px;
}

.highlight-item {
display: flex;
align-items: center;
gap: 12px;
padding: 14px 16px;
background: linear-gradient(135deg, rgba(245, 241, 237, 0.6), rgba(235, 228, 220, 0.4));
border-radius: 16px;
}

.highlight-bullet {
font-size: 20px;
flex-shrink: 0;
}

.highlight-text {
font-size: 15px;
font-weight: 700;
color: var(--text-dark);
line-height: 1.4;
}

.features-section {
padding-top: 24px;
border-top: 1px solid rgba(107, 66, 38, 0.08);
}

.features-grid {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 12px;
}

.feature-item {
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
padding: 18px;
background: linear-gradient(135deg, rgba(245, 241, 237, 0.6), rgba(235, 228, 220, 0.4));
border-radius: 18px;
text-align: center;
}

.feature-emoji {
font-size: 32px;
}

.feature-name {
font-size: 13px;
font-weight: 800;
color: var(--text-dark);
letter-spacing: 0.2px;
}

/* ===== OPERATIONAL CARD ===== */
.operational-card {
margin: 0 20px 16px;
padding: 24px;
background: white;
border-radius: 28px;
box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards;
}

.hours-section {
margin-bottom: 24px;
}

.hours-header {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 14px;
}

.hours-label {
font-size: 17px;
font-weight: 800;
color: var(--text-dark);
letter-spacing: -0.2px;
}

.expand-btn {
display: flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
border: none;
border-radius: 10px;
font-size: 13px;
font-weight: 800;
color: var(--bean-primary);
cursor: pointer;
transition: all 0.3s ease;
}

.expand-btn:active {
transform: scale(0.95);
}

.expand-btn ion-icon {
font-size: 16px;
}

.hours-today {
display: flex;
align-items: center;
justify-content: space-between;
padding: 16px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.12), rgba(107, 66, 38, 0.08));
border-radius: 14px;
margin-bottom: 12px;
}

.hours-today .day-name {
font-size: 15px;
font-weight: 900;
color: var(--text-dark);
}

.hours-today .day-hours {
font-size: 15px;
font-weight: 800;
color: var(--bean-primary);
}

.hours-list {
display: flex;
flex-direction: column;
gap: 8px;
}

.hour-row {
display: flex;
align-items: center;
justify-content: space-between;
padding: 12px 16px;
border-radius: 12px;
background: rgba(245, 241, 237, 0.4);
}

.hour-row.today {
background: linear-gradient(135deg, rgba(107, 66, 38, 0.10), rgba(107, 66, 38, 0.06));
}

.day-name {
font-size: 14px;
font-weight: 700;
color: var(--text-dark);
}

.day-hours {
font-size: 14px;
font-weight: 600;
color: var(--text-medium);
}

.expand-enter-active,
.expand-leave-active {
transition: all 0.3s ease;
overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
opacity: 0;
max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
opacity: 1;
max-height: 400px;
}

.contact-section {
display: flex;
flex-direction: column;
gap: 10px;
padding-top: 24px;
border-top: 1px solid rgba(107, 66, 38, 0.08);
}

.contact-item {
display: flex;
align-items: center;
gap: 14px;
padding: 14px 16px;
background: linear-gradient(135deg, rgba(245, 241, 237, 0.6), rgba(235, 228, 220, 0.4));
border-radius: 16px;
cursor: pointer;
transition: all 0.3s ease;
}

.contact-item:active {
transform: scale(0.98);
background: linear-gradient(135deg, rgba(245, 241, 237, 0.8), rgba(235, 228, 220, 0.6));
}

.contact-icon {
font-size: 24px;
color: var(--bean-primary);
flex-shrink: 0;
}

.contact-icon.whatsapp {
color: var(--whatsapp);
}

.contact-icon.instagram {
color: var(--instagram);
}

.contact-content {
display: flex;
flex-direction: column;
gap: 4px;
flex: 1;
}

.contact-label {
font-size: 12px;
font-weight: 800;
color: var(--text-light);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.contact-value {
font-size: 15px;
font-weight: 800;
color: var(--text-dark);
}

.arrow-icon {
font-size: 20px;
color: var(--text-light);
flex-shrink: 0;
}

/* ===== GALLERY SECTION ===== */
.gallery-section {
margin: 0 0 16px 20px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards;
}

.gallery-carousel {
display: flex;
gap: 14px;
overflow-x: auto;
-webkit-overflow-scrolling: touch;
padding: 0 20px 4px 0;
}

.gallery-carousel::-webkit-scrollbar {
display: none;
}

.gallery-item {
flex-shrink: 0;
width: 240px;
height: 180px;
border-radius: 24px;
overflow: hidden;
background: linear-gradient(135deg, #f5f1ed, #ebe4dc);
box-shadow: 0 4px 12px rgba(107, 66, 38, 0.08);
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-item:active {
transform: scale(0.97);
}

.gallery-image {
width: 100%;
height: 100%;
object-fit: cover;
}

/* ===== MENU SECTION ===== */
.menu-section {
margin: 0 20px 16px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s backwards;
}

.menu-header {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 16px;
}

.view-menu-link {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
border: none;
border-radius: 12px;
font-size: 14px;
font-weight: 900;
color: var(--bean-primary);
cursor: pointer;
transition: all 0.3s ease;
}

.view-menu-link:active {
transform: scale(0.95);
}

.view-menu-link ion-icon {
font-size: 18px;
}

.menu-grid {
display: grid;
grid-template-columns: 1fr;
gap: 12px;
margin-bottom: 16px;
}

.menu-item-card {
background: white;
border-radius: 20px;
padding: 18px;
box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
}

.menu-item-header {
display: flex;
align-items: flex-start;
justify-content: space-between;
gap: 12px;
margin-bottom: 8px;
}

.menu-item-name {
font-size: 17px;
font-weight: 900;
color: var(--text-dark);
margin: 0;
letter-spacing: -0.2px;
flex: 1;
}

.menu-item-price {
font-size: 18px;
font-weight: 900;
color: var(--bean-primary);
flex-shrink: 0;
}

.menu-item-description {
font-size: 14px;
line-height: 1.5;
color: var(--text-medium);
margin: 0 0 10px 0;
font-weight: 500;
}

.menu-item-category {
display: inline-block;
padding: 6px 12px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.10), rgba(107, 66, 38, 0.06));
border-radius: 10px;
font-size: 11px;
font-weight: 800;
color: var(--bean-primary);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.view-full-menu-btn {
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
padding: 16px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.10), rgba(107, 66, 38, 0.06));
border: none;
border-radius: 18px;
font-size: 15px;
font-weight: 900;
color: var(--bean-primary);
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.view-full-menu-btn:active {
transform: scale(0.97);
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.10));
}

.view-full-menu-btn ion-icon {
font-size: 20px;
}

/* ===== REVIEWS SECTION ===== */
.reviews-section {
margin: 0 20px 16px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s backwards;
}

.reviews-header {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 16px;
}

.write-review-link {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
border: none;
border-radius: 12px;
font-size: 14px;
font-weight: 900;
color: var(--bean-primary);
cursor: pointer;
transition: all 0.3s ease;
}

.write-review-link:active {
transform: scale(0.95);
}

.write-review-link ion-icon {
font-size: 18px;
}

.reviews-list {
display: flex;
flex-direction: column;
gap: 12px;
margin-bottom: 16px;
}

.review-card {
background: white;
border-radius: 20px;
padding: 18px;
box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
}

.review-header {
display: flex;
align-items: center;
justify-content: space-between;
gap: 12px;
margin-bottom: 12px;
}

.reviewer-info {
display: flex;
align-items: center;
gap: 12px;
flex: 1;
}

.reviewer-avatar {
width: 48px;
height: 48px;
border-radius: 50%;
background: linear-gradient(135deg, var(--bean-primary), var(--bean-secondary));
display: flex;
align-items: center;
justify-content: center;
color: white;
font-size: 16px;
font-weight: 900;
flex-shrink: 0;
}

.reviewer-details {
display: flex;
flex-direction: column;
gap: 2px;
}

.reviewer-name {
font-size: 16px;
font-weight: 900;
color: var(--text-dark);
margin: 0;
letter-spacing: -0.2px;
}

.review-date {
font-size: 12px;
font-weight: 700;
color: var(--text-light);
}

.review-rating {
display: flex;
align-items: center;
gap: 4px;
padding: 6px 12px;
background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.10));
border-radius: 10px;
font-size: 14px;
font-weight: 900;
color: var(--orange);
flex-shrink: 0;
}

.review-rating ion-icon {
font-size: 16px;
}

.review-text {
font-size: 14px;
line-height: 1.6;
color: var(--text-medium);
margin: 0;
font-weight: 500;
}

.write-review-btn {
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
padding: 16px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.10), rgba(107, 66, 38, 0.06));
border: none;
border-radius: 18px;
font-size: 15px;
font-weight: 900;
color: var(--bean-primary);
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.write-review-btn:active {
transform: scale(0.97);
background: linear-gradient(135deg, rgba(107, 66, 38, 0.15), rgba(107, 66, 38, 0.10));
}

.write-review-btn ion-icon {
font-size: 20px;
}

/* ===== ACTIONS SECTION ===== */
.actions-section {
margin: 0 20px 24px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s backwards;
}

.action-buttons {
display: grid;
grid-template-columns: 1fr;
gap: 10px;
}

.action-btn {
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
padding: 18px;
border: none;
border-radius: 20px;
font-size: 16px;
font-weight: 900;
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
letter-spacing: 0.3px;
}

.action-btn:active {
transform: scale(0.97);
}

.action-btn ion-icon {
font-size: 24px;
}

.action-btn.primary {
background: linear-gradient(135deg, #6b4226, #3d2317);
color: white;
box-shadow: 0 6px 16px rgba(107, 66, 38, 0.25);
}

.action-btn.secondary {
background: white;
color: var(--text-dark);
box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
}

.action-btn.secondary ion-icon {
color: var(--bean-primary);
}

/* ===== RECOMMENDED SECTION ===== */
.recommended-section {
margin: 0 0 0 20px;
animation: fadeSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s backwards;
}

.recommended-header {
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 20px 16px 0;
}

.view-all-link {
display: flex;
align-items: center;
gap: 6px;
padding: 8px 14px;
background: linear-gradient(135deg, rgba(107, 66, 38, 0.08), rgba(107, 66, 38, 0.05));
border: none;
border-radius: 12px;
font-size: 14px;
font-weight: 900;
color: var(--bean-primary);
cursor: pointer;
transition: all 0.3s ease;
}

.view-all-link:active {
transform: scale(0.95);
}

.view-all-link ion-icon {
font-size: 18px;
}

.recommended-carousel {
display: flex;
gap: 14px;
overflow-x: auto;
-webkit-overflow-scrolling: touch;
padding: 0 20px 4px 0;
}

.recommended-carousel::-webkit-scrollbar {
display: none;
}

.recommended-card {
flex-shrink: 0;
width: 200px;
background: white;
border-radius: 24px;
overflow: hidden;
box-shadow: 0 4px 16px rgba(107, 66, 38, 0.08);
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.recommended-card:active {
transform: scale(0.97);
}

.recommended-image-wrapper {
width: 100%;
height: 150px;
background: linear-gradient(135deg, #f5f1ed, #ebe4dc);
overflow: hidden;
}

.recommended-image {
width: 100%;
height: 100%;
object-fit: cover;
}

.recommended-info {
padding: 16px;
}

.recommended-name {
font-size: 16px;
font-weight: 900;
color: var(--text-dark);
margin: 0 0 10px 0;
line-height: 1.3;
letter-spacing: -0.2px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}

.recommended-meta {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 8px;
}

.recommended-rating {
display: flex;
align-items: center;
gap: 4px;
font-size: 14px;
font-weight: 800;
color: var(--text-dark);
}

.recommended-rating ion-icon {
font-size: 15px;
color: var(--orange);
}

.recommended-distance {
font-size: 13px;
font-weight: 700;
color: var(--text-light);
}

.recommended-category {
font-size: 12px;
font-weight: 700;
color: var(--text-light);
}

/* ===== RESPONSIVE ===== */
@media (min-width: 480px) {
.features-grid {
grid-template-columns: repeat(4, 1fr);
}

.action-buttons {
grid-template-columns: repeat(3, 1fr);
}
}

@media (min-width: 768px) {
.content-wrapper {
max-width: 700px;
margin: 0 auto;
}
}
</style>
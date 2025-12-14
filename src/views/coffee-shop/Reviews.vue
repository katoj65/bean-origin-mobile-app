<template>
<div class="reviews-container">

<!-- HERO RATING CARD -->
<review-header/>
<!-- POPULAR PRODUCTS -->
<div class="popular-products" v-if="popularProducts.length > 0">
<div class="highlights-header">
<h3 class="highlights-title">Popular Products</h3>
<button class="view-all-link" @click="viewAllProducts">
<span>View Menu</span>
<ion-icon :icon="arrowForwardOutline"></ion-icon>
</button>
</div>

<div class="products-grid">
<div 
v-for="product in popularProducts" 
:key="product.id"
class="product-card"
@click="viewProduct(product.id)">
<img :src="product.image" :alt="product.name" />
<div class="product-info">
<span class="product-name">{{ product.name }}</span>
</div>
</div>
</div>
</div>

<!-- REVIEWS FEED -->
<div class="reviews-feed">
<h3 class="reviews-feed-title">User Reviews</h3>
<div 
v-for="review in reviews" 
:key="review.id"
class="modern-review-card">

<!-- Card Header -->
<div class="card-header">
<div class="user-badge">
<div class="user-avatar">
<img v-if="review.avatar" :src="review.avatar" alt="Avatar" />
<span v-else class="avatar-text">{{ review.initials }}</span>
</div>
<div class="user-info">
<h4 class="user-name">{{ review.name }}</h4>
<div class="user-meta">
<span class="meta-item">
<ion-icon :icon="timeOutline" class="meta-icon"></ion-icon>
{{ review.date }}
</span>
</div>
</div>
</div>

<div class="rating-display">
<span class="rating-number">{{ review.rating }}.0</span>
<div class="rating-stars-small">
<ion-icon 
v-for="i in review.rating" 
:key="i"
:icon="star"
class="star-filled">
</ion-icon>
</div>
</div>
</div>

<!-- Review Content -->
<div class="card-content">
<p class="review-message">{{ review.text }}</p>
</div>

<!-- Review Images -->
<div class="card-images" v-if="review.photos && review.photos.length > 0">
<div 
v-for="(photo, index) in review.photos" 
:key="index"
class="image-thumb"
@click="viewPhoto(index)">
<img :src="photo" alt="Review image" />
</div>
</div>

<!-- Card Actions -->
<div class="card-actions">
<button 
class="action-btn"
:class="{ liked: review.userHelpful }"
@click="toggleHelpful(review)">
<ion-icon :icon="review.userHelpful ? thumbsUp : thumbsUpOutline"></ion-icon>
<span>Helpful</span>
<span class="action-count">{{ review.helpful }}</span>
</button>

<button class="action-btn" @click="replyToReview(review)">
<ion-icon :icon="chatbubbleEllipsesOutline"></ion-icon>
<span>Reply</span>
</button>
</div>

<!-- Owner Reply -->
<div class="owner-reply" v-if="review.ownerResponse">
<div class="reply-header">
<div class="reply-badge">
<ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
<span>Owner</span>
</div>
<span class="reply-time">{{ review.responseDate }}</span>
</div>
<p class="reply-message">{{ review.ownerResponse }}</p>
</div>
</div>
</div>

<!-- LOAD MORE -->
<div class="load-section" v-if="hasMoreReviews">
<ion-button expand="block" fill="clear" class="load-more-modern" @click="loadMore">
<ion-icon slot="start" :icon="refreshOutline"></ion-icon>
Load More Reviews
</ion-button>
</div>

<!-- BOTTOM SPACER -->
<div class="bottom-spacer"></div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ReviewHeader from './ReviewHeader.vue';
import {
IonButton,
IonIcon,
} from '@ionic/vue';
import {
star,
arrowForwardOutline,
expandOutline,
timeOutline,
locationOutline,
thumbsUp,
thumbsUpOutline,
chatbubbleEllipsesOutline,
shieldCheckmarkOutline,
refreshOutline,
} from 'ionicons/icons';

// Popular Products
const popularProducts = ref([
{ id: 1, name: 'Ethiopian Blend', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format' },
{ id: 2, name: 'Iced Latte', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format' },
{ id: 3, name: 'Cold Brew', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format' },
{ id: 4, name: 'Almond Croissant', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format' },
]);

// Reviews
const reviews = ref([
{
id: 1,
name: 'Sarah Johnson',
initials: 'SJ',
avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format',
rating: 5,
date: '2 days ago',
text: 'Absolutely love this place! The Ethiopian blend is phenomenal - floral notes with just the right amount of brightness. The baristas really know their craft and the atmosphere is perfect for working or catching up with friends. Highly recommend!',
photos: [
'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format',
'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format',
],
helpful: 24,
userHelpful: false,
ownerResponse: 'Thank you so much, Sarah! We\'re thrilled you enjoyed the Ethiopian blend. Can\'t wait to see you again soon! ☕',
responseDate: '1 day ago',
},
{
id: 2,
name: 'Michael Chen',
initials: 'MC',
avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&auto=format',
rating: 5,
date: '1 week ago',
text: 'Best coffee spot in the city! Great WiFi, comfortable seating, and the cappuccino is perfection. I come here almost every day to work remotely. The staff is always friendly and welcoming.',
photos: null,
helpful: 18,
userHelpful: true,
ownerResponse: null,
},
{
id: 3,
name: 'Emma Rodriguez',
initials: 'ER',
avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format',
rating: 4,
date: '2 weeks ago',
text: 'Really good coffee and I appreciate their commitment to sustainability. The outdoor seating is lovely on nice days. Only minor complaint is it can get quite busy on weekends, but that\'s a testament to how good it is!',
photos: ['https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&auto=format'],
helpful: 12,
userHelpful: false,
ownerResponse: null,
},
{
id: 4,
name: 'James Wilson',
initials: 'JW',
avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
rating: 5,
date: '3 weeks ago',
text: 'I\'ve been coming here for months and it never disappoints. The consistency in quality is impressive. Their cold brew is smooth and not too acidic. Great pastries too!',
photos: null,
helpful: 9,
userHelpful: false,
ownerResponse: 'Thanks for being such a loyal customer, James! We appreciate you! 🙏',
responseDate: '3 weeks ago',
},
]);

const hasMoreReviews = ref(true);

// Methods
const viewAllProducts = () => console.log('View all products/menu');
const viewProduct = (id) => console.log('View product:', id);

const toggleHelpful = (review) => {
review.userHelpful = !review.userHelpful;
review.helpful += review.userHelpful ? 1 : -1;
};

const replyToReview = (review) => console.log('Reply:', review.id);
const viewPhoto = (index) => console.log('View review photo:', index);
const loadMore = () => hasMoreReviews.value = false;
</script>

<style scoped>
/* ===== VARIABLES ===== */
:root {
--coffee-900: #3d2419;
--coffee-800: #4a2c2a;
--coffee-700: #5d3a2f;
--coffee-600: #6b4226;
--coffee-500: #8b5a3c;

--cream-50: #ffffff;
--cream-100: #fdfcfa;
--cream-200: #faf8f5;
--cream-300: #f5f1e8;

--text-900: #1a0f0a;
--text-800: #2c1810;
--text-600: #6b5444;
--text-500: #8b7355;

--gold: #fbbf24;
--amber: #f59e0b;
--green: #10b981;
--blue: #3b82f6;
}

/* ===== CONTENT ===== */
ion-content {
--background: var(--cream-200);
}

.reviews-container {
max-width: 900px;
margin: 0 auto;
padding: 0;
position: relative; /* Contain the FAB */
z-index: 1; /* Ensure content is above other page elements if needed */
}

/* ===== POPULAR PRODUCTS ===== */
.popular-products {
margin-bottom: 32px;
padding: 0 20px;
}

.highlights-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 18px;
}

.highlights-title {
font-size: 22px;
font-weight: 900;
color: var(--coffee-800);
margin: 0;
letter-spacing: -0.5px;
}

.view-all-link {
display: flex;
align-items: center;
gap: 6px;
background: none;
border: none;
color: var(--coffee-600);
font-size: 15px;
font-weight: 800;
cursor: pointer;
padding: 8px 12px;
border-radius: 12px;
transition: all 0.3s ease;
}

.view-all-link:active {
background: rgba(107, 66, 38, 0.06);
}

.view-all-link ion-icon {
font-size: 18px;
}

.products-grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
gap: 12px;
}

.product-card {
position: relative;
border-radius: 20px;
overflow: hidden;
cursor: pointer;
aspect-ratio: 1;
transition: transform 0.3s ease;
}

.product-card:active {
transform: scale(0.97);
}

.product-card img {
width: 100%;
height: 100%;
object-fit: cover;
}

.product-info {
position: absolute;
inset: 0;
background: linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%);
display: flex;
align-items: flex-end;
padding: 12px;
}

.product-name {
font-size: 14px;
font-weight: 800;
color: white;
line-height: 1.3;
text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.reviews-feed-title {
font-size: 22px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 18px 0;
letter-spacing: -0.5px;
}

/* ===== REVIEWS FEED ===== */
.reviews-feed {
display: flex;
flex-direction: column;
gap: 0; /* Title has margin-bottom */
padding: 0 20px;
margin-bottom: 24px;
}

.modern-review-card {
background: white;
border-radius: 24px;
padding: 24px;
margin-bottom: 20px;
transition: all 0.3s ease;
}

.modern-review-card:hover {
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.card-header {
display: flex;
justify-content: space-between;
align-items: flex-start;
margin-bottom: 18px;
}

.user-badge {
display: flex;
gap: 14px;
flex: 1;
}

.user-avatar {
width: 56px;
height: 56px;
border-radius: 50%;
background: linear-gradient(135deg, var(--coffee-700), var(--coffee-800));
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
overflow: hidden;
}

.user-avatar img {
width: 100%;
height: 100%;
object-fit: cover;
}

.avatar-text {
font-size: 20px;
font-weight: 900;
color: white;
}

.user-info {
flex: 1;
}

.user-name {
font-size: 18px;
font-weight: 900;
color: var(--coffee-800);
margin: 0 0 6px 0;
letter-spacing: -0.3px;
}

.user-meta {
display: flex;
align-items: center;
gap: 10px;
font-size: 13px;
font-weight: 700;
color: var(--text-500);
}

.meta-item {
display: flex;
align-items: center;
gap: 5px;
}

.meta-icon {
font-size: 14px;
}

.meta-dot {
color: var(--text-500);
}

.rating-display {
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 6px;
}

.rating-number {
font-size: 24px;
font-weight: 900;
color: var(--coffee-800);
letter-spacing: -1px;
}

.rating-stars-small {
display: flex;
gap: 3px;
}

.star-filled {
font-size: 14px;
color: var(--gold);
}

.card-content {
margin-bottom: 20px;
}

.review-message {
font-size: 15px;
font-weight: 400;
color: var(--text-800);
line-height: 1.7;
margin: 0;
}

.card-images {
display: flex;
gap: 10px;
margin-bottom: 20px;
overflow-x: auto;
}

.card-images::-webkit-scrollbar {
display: none;
}

.image-thumb {
width: 160px;
height: 160px;
border-radius: 16px;
overflow: hidden;
flex-shrink: 0;
cursor: pointer;
}

.image-thumb img {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.3s ease;
}

.image-thumb:active img {
transform: scale(1.1);
}

.card-actions {
display: flex;
gap: 8px;
padding-top: 20px;
border-top: 1px solid var(--cream-300);
}

.action-btn {
display: flex;
align-items: center;
gap: 8px;
padding: 10px 16px;
background: var(--cream-200);
border: none;
border-radius: 14px;
font-size: 14px;
font-weight: 800;
color: var(--text-800);
cursor: pointer;
transition: all 0.3s ease;
}

.action-btn:active {
transform: scale(0.96);
}

.action-btn.liked {
background: rgba(59, 130, 246, 0.1);
color: var(--blue);
}

.action-btn ion-icon {
font-size: 20px;
}

.action-count {
padding: 3px 8px;
background: white;
border-radius: 8px;
font-size: 12px;
font-weight: 900;
}

.owner-reply {
margin-top: 20px;
padding: 20px;
background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
border-radius: 18px;
border-left: 4px solid var(--green);
}

.reply-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
}

.reply-badge {
display: flex;
align-items: center;
gap: 6px;
}

.reply-badge ion-icon {
font-size: 18px;
color: var(--green);
}

.reply-badge span {
font-size: 13px;
font-weight: 900;
color: var(--green);
text-transform: uppercase;
letter-spacing: 0.5px;
}

.reply-time {
font-size: 12px;
font-weight: 700;
color: var(--text-500);
}

.reply-message {
font-size: 14px;
font-weight: 600;
color: var(--text-800);
line-height: 1.6;
margin: 0;
}

/* ===== LOAD MORE ===== */
.load-section {
margin-bottom: 40px;
padding: 0 20px;
}

.load-more-modern {
--color: var(--coffee-700);
height: 54px;
font-size: 15px;
font-weight: 800;
text-transform: none;
letter-spacing: 0;
}

.load-more-modern ion-icon {
font-size: 22px;
}

.bottom-spacer {
height: 40px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
.reviews-container {
padding: 0;
}

.popular-products {
padding: 0 16px;
}

.reviews-feed, .load-section {
padding: 0 16px;
}

.modern-review-card {
padding: 20px;
}

.card-actions {
flex-wrap: wrap;
}

.action-btn {
flex: 1;
min-width: calc(50% - 4px);
justify-content: center;
}
}
</style>
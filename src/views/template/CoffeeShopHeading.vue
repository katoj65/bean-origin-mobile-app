<template>
<div class="shop-heading-section" style="border-radius:0; margin-top:-10px;padding-top:25px;">

<!-- Logo -->
<!-- <div class="shop-logo-wrapper">
<img :src="shopLogo" :alt="shopName" class="shop-logo" />
</div> -->

<!-- Shop Info -->
<div class="shop-info-wrapper">
<h2 class="shop-name" style="font-size:25px;">{{props.header.name}}</h2>
<div class="shop-meta">
<span class="shop-rating">
<ion-icon :icon="star"></ion-icon>
{{ props.header.rating }}
</span>
<span class="meta-dot">•</span>
<span class="shop-distance">{{ props.header.distance }} km away</span>
</div>
</div>

<!-- Call Button -->
<button class="call-button">
<ion-icon :icon="call"></ion-icon>
</button>

</div>
</template>

<script setup>
import { ref,onMounted, defineProps } from 'vue';
import { IonIcon } from '@ionic/vue';
import {
call,
star,
} from 'ionicons/icons';

// Props
const props = defineProps({
header: Object
});

// Emits
const emit = defineEmits(['call']);
// Methods







</script>

<style scoped>
/* ===== SHOP HEADING SECTION ===== */
.shop-heading-section {
display: flex;
align-items: center;
gap: 16px;
padding: 20px;
background: white;
border-radius: 20px;

}

/* ===== LOGO ===== */
.shop-logo-wrapper {
width: 64px;
height: 64px;
flex-shrink: 0;
border-radius: 16px;
overflow: hidden;

}

.shop-logo {
width: 100%;
height: 100%;
object-fit: cover;
}

/* ===== SHOP INFO ===== */
.shop-info-wrapper {
flex: 1;
display: flex;
flex-direction: column;
gap: 6px;
min-width: 0;
}

.shop-name {
font-size: 20px;
font-weight: 900;
color: #1a1a1a;
margin: 0;
letter-spacing: -0.4px;
line-height: 1.2;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

.shop-meta {
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
font-weight: 600;
}

.shop-rating {
display: flex;
align-items: center;
gap: 4px;
color: #1a1a1a;
}

.shop-rating ion-icon {
font-size: 16px;
color: #f59e0b;
}

.meta-dot {
color: #d0d0d0;
font-weight: 400;
}

.shop-distance {
color: #8a8a8a;
}

/* ===== CALL BUTTON ===== */
.call-button {
width: 48px;
height: 48px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(135deg, #6b4423, #4a2f18);
border: none;
border-radius: 50%;
cursor: pointer;
flex-shrink: 0;
transition: all 0.3s ease;

}

.call-button:hover {
transform: scale(1.05);

}

.call-button:active {
transform: scale(0.92);
}

.call-button ion-icon {
font-size: 24px;
color: white;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
.shop-logo-wrapper {
width: 72px;
height: 72px;
border-radius: 18px;
}

.shop-name {
font-size: 22px;
}

.call-button {
width: 52px;
height: 52px;
}

.call-button ion-icon {
font-size: 26px;
}
}
</style>
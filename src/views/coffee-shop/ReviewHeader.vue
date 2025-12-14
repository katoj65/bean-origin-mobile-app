<template>
<!-- REVIEWS -->
<div class="section">

<div class="reviews-summary">
<div class="rating-big">
<span class="rating-number">{{ shopData.rating }}</span>
<div class="rating-stars">
<ion-icon v-for="i in 5" :key="i" :icon="starSharp"></ion-icon>
</div>
<span class="rating-text">Based on {{ shopData.reviewCount }} reviews</span>
</div>

<div class="rating-breakdown">
<div v-for="rating in ratingBreakdown" :key="rating.stars" class="rating-bar-row">
<span class="rating-label">{{ rating.stars }}★</span>
<div class="rating-bar-bg">
<div class="rating-bar-fill" :style="{ width: rating.percentage + '%' }"></div>
</div>
<span class="rating-percentage">{{ rating.percentage }}%</span>
</div>
</div>






</div>


</div>
</template>

<script setup>
import { ref } from 'vue';
import {
IonIcon,
} from "@ionic/vue";
import {
starSharp,
} from "ionicons/icons";

const shopData = ref({
rating: 4.8,
reviewCount: 234,
});

const ratingBreakdown = ref([
{ stars: 5, percentage: 75 },
{ stars: 4, percentage: 15 },
{ stars: 3, percentage: 6 },
{ stars: 2, percentage: 3 },
{ stars: 1, percentage: 1 }
]);

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

@keyframes cardSlideUp {
from {
transform: translateY(30px);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}

/* ===== SECTIONS - TRENDY COFFEE STYLE ===== */
.section {
margin: 0 0 16px;
animation: cardSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) backwards;
}

/* ===== REVIEWS ===== */
.reviews-summary {
display: grid;
grid-template-columns: 1fr 1.5fr;
gap: 28px;
padding: 28px;
background: white;
  border-radius: 0;
  margin-bottom: 0;
}

.rating-big {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;
text-align: center;
}

.rating-number {
font-size: 54px;
font-weight: 900;
color: var(--coffee-dark);
line-height: 1;
letter-spacing: -1px;
}

.rating-stars {
display: flex;
gap: 5px;
}

.rating-stars ion-icon {
font-size: 20px;
color: var(--orange);
}

.rating-text {
font-size: 13px;
font-weight: 800;
color: var(--text-light);
}

.rating-breakdown {
display: flex;
flex-direction: column;
gap: 12px;
}

.rating-bar-row {
display: flex;
align-items: center;
gap: 12px;
}

.rating-label {
font-size: 14px;
font-weight: 900;
color: var(--coffee-dark);
width: 32px;
flex-shrink: 0;
}

.rating-bar-bg {
flex: 1;
height: 10px;
background: rgba(0, 0, 0, 0.06);
border-radius: 10px;
overflow: hidden;
}

.rating-bar-fill {
height: 100%;
background: linear-gradient(90deg, var(--orange), #ffb84d);
border-radius: 10px;
transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.rating-percentage {
font-size: 13px;
font-weight: 900;
color: var(--text-light);
width: 42px;
text-align: right;
flex-shrink: 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
.reviews-summary {
grid-template-columns: 1fr;
}
}

.actions-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 16px 28px;
  background: white;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  padding: 16px;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button:active {
  transform: scale(0.97);
}

.action-button ion-icon {
  font-size: 20px;
}

.action-button.primary {
  background: var(--coffee-dark);
  color: white;
}

.action-button.primary:active {
  background: var(--coffee-medium);
}

.action-button.secondary {
  background: rgba(107, 66, 38, 0.08);
  color: var(--coffee-dark);
}

.action-button.secondary:active {
  background: rgba(107, 66, 38, 0.12);
}

</style>
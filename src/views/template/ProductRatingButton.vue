<template>
  <div class="rating-component">
    <button class="rate-product-btn" @click="openRatingModal">
      <ion-icon :icon="starOutline"></ion-icon>
      <span>Rate this Product</span>
    </button>

    <!-- Rating Modal -->
    <ion-modal 
      :is-open="isRatingModalOpen" 
      @did-dismiss="closeRatingModal"
      :initial-breakpoint="0.65"
      :breakpoints="[0, 0.65, 1]"
    >
      <div class="rating-modal-wrapper">
        <div class="rating-modal-card">
          <div class="modal-handle"></div>
          
          <div class="modal-header">
            <h3>Rate This Product</h3>
            <button @click="closeRatingModal" class="close-btn">
              <ion-icon :icon="closeIcon"></ion-icon>
            </button>
          </div>
          
          <div class="rating-modal-content">
            <p class="rating-subtitle">How would you rate your experience?</p>
            
            <!-- Star Rating -->
            <div class="star-rating-wrapper">
              <div class="star-rating">
                <ion-icon
                  v-for="star in 5"
                  :key="star"
                  :icon="star <= selectedRating ? starIcon : starOutline"
                  :class="['star', { 'selected': star <= selectedRating }]"
                  @click="setRating(star)"
                ></ion-icon>
              </div>
              
              <div v-if="selectedRating > 0" class="rating-feedback">
                <p class="rating-text">{{ getRatingText(selectedRating) }}</p>
              </div>
            </div>
            
            <!-- Submit Button -->
            <ion-button
              expand="block"
              :disabled="selectedRating === 0"
              @click="submitRating"
              class="submit-button"
            >
              Submit Rating
            </ion-button>
          </div>
        </div>
      </div>
    </ion-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonButton,
  IonModal,
  IonIcon,
  IonItem,
  IonLabel,
  IonTextarea,
  IonContent,
  alertController,
} from '@ionic/vue';
import { star, starOutline, close as closeIcon } from 'ionicons/icons';

const isRatingModalOpen = ref(false);
const selectedRating = ref(0);
const starIcon = star;

const openRatingModal = () => {
  isRatingModalOpen.value = true;
};

const closeRatingModal = () => {
  isRatingModalOpen.value = false;
};

const setRating = (rating) => {
  selectedRating.value = rating;
};

const getRatingText = (rating) => {
  const ratingTexts = [
    '',
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
  ];
  return ratingTexts[rating] || '';
};

const submitRating = async () => {
  // Here you would typically send the rating to your backend service
  console.log('Rating:', selectedRating.value);
  
  const alert = await alertController.create({
    header: 'Thank You!',
    message: 'Your rating has been submitted successfully.',
    buttons: ['OK'],
  });
  
  await alert.present();
  
  // Reset form and close modal
  selectedRating.value = 0;
  closeRatingModal();
};
</script>

<style scoped>
/* Bean Origin Theme Variables */
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
}

.rating-component {
  width: 100%;
}

.rate-product-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  margin-top: 12px;
  background: white;
  border: 2px solid var(--coffee-600);
  border-radius: 16px;
  font-size: 15px;
  font-weight: 800;
  color: var(--coffee-600);
  cursor: pointer;
  transition: all 0.3s ease;
}

.rate-product-btn:active {
  transform: scale(0.98);
  background: var(--cream-200);
}

.rate-product-btn ion-icon {
  font-size: 20px;
}

.rating-modal-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--cream-100);
}

.rating-modal-card {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.modal-handle {
  width: 48px;
  height: 5px;
  background: var(--coffee-600);
  border-radius: 3px;
  margin: 0 auto 24px;
  opacity: 0.3;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.modal-header h3 {
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  color: var(--text-900);
  letter-spacing: -0.5px;
}

.close-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cream-200);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.close-btn:active {
  transform: scale(0.95);
  background: var(--cream-300);
}

.close-btn ion-icon {
  font-size: 24px;
  color: var(--coffee-700);
}

.rating-modal-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.rating-subtitle {
  margin: 0 0 24px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-600);
  text-align: center;
  line-height: 1.5;
}

.star-rating-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.star-rating {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.star {
  font-size: 48px;
  cursor: pointer;
  color: var(--cream-300);
  transition: all 0.25s ease;
}

.star.selected {
  color: var(--coffee-600);
  transform: scale(1.1);
}

.star:active {
  transform: scale(0.95);
}

.rating-feedback {
  padding: 16px 32px;
  background: var(--cream-200);
  border-radius: 16px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rating-text {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--coffee-700);
  letter-spacing: 0.3px;
}

.submit-button {
  width: 100%;
  margin: 0;
  --background: #6b4226;
  --background-activated: #5d3a2f;
  --background-hover: #5d3a2f;
  --border-radius: 16px;
  height: 56px;
  font-size: 16px;
  font-weight: 900;
  text-transform: none;
  letter-spacing: 0.3px;
  transition: transform 0.2s ease;
}

.submit-button:not([disabled]):active {
  transform: scale(0.98);
}

.submit-button[disabled] {
  --background: var(--cream-300);
  --color: var(--text-600);
  opacity: 0.5;
}
</style>

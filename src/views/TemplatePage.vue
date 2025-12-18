<template>
  <div class="rating-component">
    <ion-button expand="block" @click="openRatingModal">
      <ion-icon slot="start" :icon="starOutline"></ion-icon>
      Leave a Rating
    </ion-button>

    <!-- Rating Modal -->
    <ion-modal 
      :is-open="isRatingModalOpen" 
      @did-dismiss="closeRatingModal"
      :initial-breakpoint="0.75"
      :breakpoints="[0, 0.5, 0.75, 1]"
      class="rating-modal"
    >
      <ion-content class="ion-padding">
        <div class="rating-modal-card">
          <div class="modal-handle"></div>
          
          <div class="modal-header">
            <h3>Rate Us</h3>
            <ion-button fill="clear" @click="closeRatingModal">
              <ion-icon slot="icon-only" :icon="closeIcon"></ion-icon>
            </ion-button>
          </div>
          
          <div class="rating-modal-content">
          <h3>How would you rate your experience?</h3>
          
          <!-- Star Rating -->
          <div class="star-rating">
            <ion-icon
              v-for="star in 5"
              :key="star"
              :icon="star <= selectedRating ? starIcon : starOutline"
              :class="['star', { 'selected': star <= selectedRating }]"
              @click="setRating(star)"
            ></ion-icon>
          </div>
          
          <p v-if="selectedRating > 0" class="rating-text">
            {{ getRatingText(selectedRating) }}
          </p>
          
          <!-- Feedback Text Area -->
          <ion-item class="feedback-item">
            <ion-label position="stacked">Additional Feedback (Optional)</ion-label>
            <ion-textarea
              v-model="feedback"
              placeholder="Tell us more about your experience..."
              :rows="4"
              :maxlength="500"
            ></ion-textarea>
          </ion-item>
          
          <div class="character-count">
            {{ feedback.length }}/500
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
      </ion-content>
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonButton,
  IonButtons,
  IonModal,
  IonIcon,
  IonItem,
  IonLabel,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  alertController,
} from '@ionic/vue';
import { star, starOutline } from 'ionicons/icons';
import { close as closeIcon } from 'ionicons/icons';

const isRatingModalOpen = ref(false);
const selectedRating = ref(0);
const feedback = ref('');
const starIcon = star;

const openRatingModal = () => {
  isRatingModalOpen.value = true;
};

const closeRatingModal = () => {
  isRatingModalOpen.value = false;
};

const setRating = (rating: number) => {
  selectedRating.value = rating;
};

const getRatingText = (rating: number): string => {
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
  console.log('Feedback:', feedback.value);
  
  const alert = await alertController.create({
    header: 'Thank You!',
    message: 'Your rating has been submitted successfully.',
    buttons: ['OK'],
  });
  
  await alert.present();
  
  // Reset form and close modal
  selectedRating.value = 0;
  feedback.value = '';
  closeRatingModal();
};
</script>

<style scoped>
.rating-component {
  width: 100%;
}

.rating-modal::part(content) {
  --height: auto;
  --border-radius: 20px 20px 0 0;
  --box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
}

.rating-modal-card {
  background: var(--ion-background-color, #fff);
  border-radius: 20px 20px 0 0;
  padding: 20px;
  position: relative;
}

.modal-handle {
  width: 40px;
  height: 4px;
  background: var(--ion-color-medium);
  border-radius: 2px;
  margin: 0 auto 16px;
  opacity: 0.3;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.modal-header ion-button {
  margin: 0;
  --padding-start: 8px;
  --padding-end: 8px;
}

.rating-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.rating-modal-content h3 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  display: none;
}

.star-rating {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.star {
  font-size: 48px;
  cursor: pointer;
  color: var(--ion-color-medium);
  transition: all 0.2s ease;
}

.star.selected {
  color: #ffc409;
}

.star:hover {
  transform: scale(1.1);
}

.rating-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--ion-color-primary);
  margin-bottom: 24px;
}

.feedback-item {
  width: 100%;
  margin-bottom: 8px;
}

.character-count {
  width: 100%;
  text-align: right;
  font-size: 12px;
  color: var(--ion-color-medium);
  margin-bottom: 16px;
  padding-right: 16px;
}

.submit-button {
  width: 100%;
  margin-top: 16px;
}
</style>

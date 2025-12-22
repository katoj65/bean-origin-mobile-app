<template>
  <div class="ratings-container">
    <!-- Header Section -->
    <div class="ratings-header">
      <div class="header-content">
        <h1 class="page-title">Product Ratings</h1>
        <p class="page-subtitle">See what others are saying about this coffee</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-number">{{ ratings.length }}</span>
          <span class="stat-label">Reviews</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-stars">
            <ion-icon :icon="starIcon" class="stat-star"></ion-icon>
            <span class="stat-number">{{ averageRating }}</span>
          </div>
          <span class="stat-label">Average</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <ion-spinner name="crescent"></ion-spinner>
      <p>Loading ratings...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="ratings.length === 0" class="empty-state">
      <ion-icon :icon="chatbubblesOutline" class="empty-icon"></ion-icon>
      <h2>No Ratings Yet</h2>
      <p>Be the first to rate this product!</p>
    </div>

    <!-- Users List -->
    <ion-list v-else class="users-list">
      <ion-item 
        v-for="(rating, index) in ratings" 
        :key="rating.id"
        class="user-item"
        lines="full"
      >
        <div class="item-number">{{ index + 1 }}</div>
        
        <div class="user-avatar" slot="start">
          <img 
            v-if="rating.users?.profile_image" 
            :src="rating.users.profile_image" 
            :alt="rating.users?.name || 'User'"
          />
          <div v-else class="avatar-placeholder">
            {{ getInitials(rating.users?.name || 'Anonymous') }}
          </div>
        </div>
        
        <ion-label>
          <h2 class="user-name">{{ rating.users?.name || 'Anonymous User' }}</h2>
          <div class="rating-info">
            <div class="stars">
              <ion-icon
                v-for="star in 5"
                :key="star"
                :icon="star <= rating.rating ? starIcon : starOutline"
                :class="['star-icon', { 'filled': star <= rating.rating }]"
              ></ion-icon>
            </div>
            <span class="rating-score">{{ rating.rating }}/5</span>
            <span class="bullet">•</span>
            <span class="rating-date">{{ formatDate(rating.created_at) }}</span>
          </div>
        </ion-label>
        
        <div class="rating-badge" slot="end">
          <span class="badge-rating">{{ rating.rating }}</span>
        </div>
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  IonIcon,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import { star, starOutline, chatbubblesOutline } from 'ionicons/icons';
import RatingService from '../service/RatingService';

const starIcon = star;
const isLoading = ref(true);
const ratings = ref([]);
const productId = ref('sample-product-id'); // Replace with actual product ID

// Computed average rating
const averageRating = computed(() => {
  if (ratings.value.length === 0) return '0.0';
  const sum = ratings.value.reduce((acc, rating) => acc + rating.rating, 0);
  return (sum / ratings.value.length).toFixed(1);
});

// Dummy data for testing
const dummyRatings = [
  {
    id: 1,
    rating: 5,
    product_id: 'sample-product-id',
    user_id: 'user1',
    created_at: new Date().toISOString(),
    users: {
      id: 'user1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      profile_image: 'https://i.pravatar.cc/150?img=1'
    }
  },
  {
    id: 2,
    rating: 4,
    product_id: 'sample-product-id',
    user_id: 'user2',
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    users: {
      id: 'user2',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      profile_image: 'https://i.pravatar.cc/150?img=12'
    }
  },
  {
    id: 3,
    rating: 5,
    product_id: 'sample-product-id',
    user_id: 'user3',
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    users: {
      id: 'user3',
      name: 'Emma Williams',
      email: 'emma.w@example.com',
      profile_image: 'https://i.pravatar.cc/150?img=5'
    }
  },
  {
    id: 4,
    rating: 3,
    product_id: 'sample-product-id',
    user_id: 'user4',
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    users: {
      id: 'user4',
      name: 'James Brown',
      email: 'james.b@example.com',
      profile_image: 'https://i.pravatar.cc/150?img=15'
    }
  },
  {
    id: 5,
    rating: 5,
    product_id: 'sample-product-id',
    user_id: 'user5',
    created_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    users: {
      id: 'user5',
      name: 'Olivia Martinez',
      email: 'olivia.m@example.com',
      profile_image: 'https://i.pravatar.cc/150?img=9'
    }
  },
  {
    id: 6,
    rating: 4,
    product_id: 'sample-product-id',
    user_id: 'user6',
    created_at: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
    users: {
      id: 'user6',
      name: 'David Lee',
      email: 'david.l@example.com',
      profile_image: 'https://i.pravatar.cc/150?img=33'
    }
  },
  {
    id: 7,
    rating: 5,
    product_id: 'sample-product-id',
    user_id: 'user7',
    created_at: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
    users: {
      id: 'user7',
      name: 'Sophia Anderson',
      email: 'sophia.a@example.com',
      profile_image: 'https://i.pravatar.cc/150?img=10'
    }
  },
  {
    id: 8,
    rating: 4,
    product_id: 'sample-product-id',
    user_id: 'user8',
    created_at: new Date(Date.now() - 2592000000).toISOString(), // 1 month ago
    users: {
      id: 'user8',
      name: 'Daniel Taylor',
      email: 'daniel.t@example.com',
      profile_image: 'https://i.pravatar.cc/150?img=13'
    }
  }
];

// Methods
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// Fetch ratings on mount
onMounted(async () => {
  try {
    isLoading.value = true;
    
    // Use dummy data for testing
    // Comment this out and uncomment the service call when ready to use real data
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
    ratings.value = dummyRatings;
    
    /* Uncomment to use real data from service
    const service = new RatingService();
    const response = await service.getProductRatings(productId.value);
    
    if (response.data) {
      ratings.value = response.data;
    }
    */
  } catch (error) {
    console.error('Error fetching ratings:', error);
  } finally {
    isLoading.value = false;
  }
});
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
  
  --gold: #ffd700;
}

.ratings-container {
  width: 100%;
  padding: 16px;
  background: var(--cream-200);
  min-height: 100vh;
}

/* Header Section */
.ratings-header {
  margin-bottom: 28px;
  background: var(--cream-50);
  border-radius: 16px;
  padding: 24px;
  border: 2px solid var(--coffee-600);
}

.header-content {
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 2px solid var(--cream-300);
}

.page-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 900;
  color: var(--coffee-900);
  letter-spacing: -0.5px;
}

.page-subtitle {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-600);
}

.header-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.stat-stars {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-star {
  font-size: 20px;
  color: var(--coffee-600);
}

.stat-number {
  font-size: 26px;
  font-weight: 900;
  color: var(--coffee-900);
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 2px;
  height: 35px;
  background: var(--cream-300);
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 20px;
  text-align: center;
}

.loading-state ion-spinner {
  margin-bottom: 16px;
  --color: var(--coffee-600);
}

.loading-state p {
  color: var(--text-600);
  font-size: 15px;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 64px 20px;
}

.empty-icon {
  font-size: 80px;
  color: var(--coffee-500);
  opacity: 0.3;
  margin-bottom: 16px;
}

.empty-state h2 {
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 800;
  color: var(--text-800);
}

.empty-state p {
  margin: 0;
  font-size: 15px;
  color: var(--text-600);
}

/* Users List */
.users-list {
  background: transparent;
  padding: 0;
}

.user-item {
  --background: var(--cream-50);
  --padding-start: 20px;
  --padding-end: 20px;
  --inner-padding-end: 0;
  --min-height: 95px;
  margin-bottom: 14px;
  border-radius: 18px;
  border: 2px solid var(--coffee-600);
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}

.user-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--coffee-600), var(--coffee-500));
}

.user-item:active {
  transform: translateY(2px);
  background: var(--cream-200);
  border-color: var(--coffee-700);
}

.item-number {
  display: none;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 16px;
  border: 3px solid var(--coffee-500);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--coffee-600), var(--coffee-500));
  color: white;
  font-size: 22px;
  font-weight: 700;
}

ion-label {
  margin: 18px 0;
}

.user-name {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 900;
  color: var(--text-900);
  letter-spacing: -0.3px;
  line-height: 1.2;
}

.rating-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.stars {
  display: flex;
  gap: 4px;
}

.star-icon {
  font-size: 19px;
  color: var(--cream-300);
  transition: all 0.2s ease;
}

.star-icon.filled {
  color: var(--coffee-600);
}

.rating-score {
  font-size: 15px;
  font-weight: 800;
  color: var(--cream-50);
  background: var(--coffee-600);
  padding: 4px 10px;
  border-radius: 8px;
}

.bullet {
  font-size: 12px;
  color: var(--text-600);
  opacity: 0.6;
}

.rating-date {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-600);
}

.rating-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--coffee-600), var(--coffee-700));
  color: white;
  min-width: 54px;
  height: 54px;
  border-radius: 16px;
  flex-shrink: 0;
}

.badge-rating {
  font-size: 22px;
  font-weight: 900;
  color: white;
}
</style>

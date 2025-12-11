<template>
  <div>
    
    

    <!-- Category Tabs -->
    <div class="category-tabs">
      <button class="category-tab active">
        <ion-icon :icon="cafeOutline" class="tab-icon"></ion-icon>
        <span>All</span>
      </button>
      <button class="category-tab">
        <ion-icon :icon="cafeOutline" class="tab-icon"></ion-icon>
        <span>Coffee</span>
      </button>
      <button class="category-tab">
        <ion-icon :icon="leafOutline" class="tab-icon"></ion-icon>
        <span>Beans</span>
      </button>
      <button class="category-tab">
        <ion-icon :icon="fastFoodOutline" class="tab-icon"></ion-icon>
        <span>Snacks</span>
      </button>
    </div>

    <!-- Menu Grid -->
    <div class="menu-grid">
      
      <!-- Menu Item 1 -->
      <div class="menu-item" v-for="(x,key) in 6" :key="key">
        <div class="item-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80" 
            alt="Cappuccino" 
            class="item-image"
          />
          <!-- <button class="favorite-btn">
            <ion-icon :icon="heartOutline"></ion-icon>
          </button> -->
          <!-- <span class="item-badge popular">Popular</span> -->
        </div>
        <div class="item-content">
          <h3 class="item-name">Cappuccino</h3>
          <p class="item-description">Rich espresso with steamed milk</p>
          <div class="item-footer">
            <span class="item-price">Shs. 15,000</span>
            <!-- <button class="add-btn">
              <ion-icon :icon="addOutline"></ion-icon>
            </button> -->
          </div>
        </div>
      </div>

    

    </div>

    <!-- View All Button -->
    <button class="view-all-btn">
      View Full Menu
      <ion-icon :icon="arrowForwardOutline" class="btn-icon"></ion-icon>
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { IonIcon } from '@ionic/vue';
import {
  searchOutline,
  cafeOutline,
  leafOutline,
  fastFoodOutline,
  heartOutline,
  heart,
  addOutline,
  arrowForwardOutline,
} from 'ionicons/icons';

const menuItems = ref([
  { id: 1, name: 'Cappuccino' },
  { id: 2, name: 'Cold Brew' },
  { id: 3, name: 'Latte' },
  { id: 4, name: 'Ethiopian Beans' },
  { id: 5, name: 'Croissant' },
  { id: 6, name: 'Espresso' },
]);
</script>

<style scoped>
/* ===== MENU SECTION ===== */
.menu-section {
  padding: 24px 20px;
  background: #faf8f5;
}

/* ===== SECTION HEADER ===== */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.5px;
}

.item-count {
  font-size: 14px;
  font-weight: 600;
  color: #8a8a8a;
}


.search-icon {
  font-size: 22px;
  color: #8a8a8a;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
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

/* ===== CATEGORY TABS ===== */
.category-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 2px solid transparent;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  color: #5a5a5a;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;

}

.category-tab:active {
  transform: scale(0.95);
}

.category-tab.active {
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  border-color: #6b4423;
  color: white;

}

.tab-icon {
  font-size: 18px;
}

/* ===== MENU GRID ===== */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

/* ===== MENU ITEM ===== */
.menu-item {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.menu-item:active {
  transform: translateY(-4px);
  
}

/* ===== ITEM IMAGE ===== */
.item-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: #f5f3f0;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.menu-item:active .item-image {
  transform: scale(1.1);
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  cursor: pointer;
 
  transition: all 0.3s ease;
}

.favorite-btn:active {
  transform: scale(0.9);
}

.favorite-btn ion-icon {
  font-size: 18px;
  color: #8a8a8a;
}

.favorite-btn.active ion-icon {
  color: #ef4444;
}

.item-badge {
  position: absolute;
  bottom: 8px;
  left: 8px;
  padding: 4px 10px;
  background: rgba(107, 68, 35, 0.9);
  color: white;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item-badge.popular {
  background: linear-gradient(135deg, #ff9800, #ff5722);
}

.item-badge.new {
  background: linear-gradient(135deg, #10b981, #059669);
}

/* ===== ITEM CONTENT ===== */
.item-content {
  padding: 12px;
}

.item-name {
  font-size: 15px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  letter-spacing: -0.2px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item-description {
  font-size: 12px;
  font-weight: 500;
  color: #8a8a8a;
  margin: 0 0 12px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== ITEM FOOTER ===== */
.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 17px;
  font-weight: 900;
  color: #6b4423;
  letter-spacing: -0.3px;
}

.add-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

}

.add-btn:active {
  transform: scale(0.9);
}

.add-btn ion-icon {
  font-size: 20px;
  color: white;
}

/* ===== VIEW ALL BUTTON ===== */
.view-all-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: white;
  border: 2px solid #6b4423;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 800;
  color: #6b4423;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-btn:active {
  transform: scale(0.98);
  background: #6b4423;
  color: white;
}

.btn-icon {
  font-size: 18px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 480px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .menu-section {
    max-width: 800px;
    margin: 0 auto;
  }

  .menu-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
</style>
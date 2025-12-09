<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-title>Bean Origin - Product Card Collection</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Hero Section -->
      <div class="hero-section">
        <h1>7 Unique Coffee Card Designs</h1>
        <p>Modern, universally appealing product cards for Bean Origin</p>
      </div>

      <!-- Card 1 -->
      <div class="showcase-section">
        <div class="section-header">
          <span class="card-number">01</span>
          <div>
            <h2>Classic Vertical Card</h2>
            <p>Perfect for product grids and featured items</p>
          </div>
        </div>
        <div class="card-container vertical">
          <ClassicVerticalCard />
        </div>
        <div class="features-list">
          <span class="feature">✓ Heart favorite button</span>
          <span class="feature">✓ Rating display</span>
          <span class="feature">✓ Roast level & origin tags</span>
          <span class="feature">✓ "New" badge support</span>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="showcase-section">
        <div class="section-header">
          <span class="card-number">02</span>
          <div>
            <h2>Modern Horizontal Card</h2>
            <p>Ideal for scrollable lists and menu browsing</p>
          </div>
        </div>
        <div class="card-container">
          <ModernHorizontalCard />
        </div>
        <div class="features-list">
          <span class="feature">✓ Edge-to-edge image</span>
          <span class="feature">✓ Icon-based tags</span>
          <span class="feature">✓ "Popular" badge</span>
          <span class="feature">✓ Compact 120px height</span>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="showcase-section">
        <div class="section-header">
          <span class="card-number">03</span>
          <div>
            <h2>Minimal Tile Card</h2>
            <p>Great for grid layouts and quick browsing</p>
          </div>
        </div>
        <div class="card-container grid">
          <MinimalTileCard />
          <MinimalTileCard />
        </div>
        <div class="features-list">
          <span class="feature">✓ Hover overlay effect</span>
          <span class="feature">✓ Quick view button</span>
          <span class="feature">✓ Minimal content</span>
          <span class="feature">✓ Space efficient</span>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="showcase-section">
        <div class="section-header">
          <span class="card-number">04</span>
          <div>
            <h2>Image-Focused Card</h2>
            <p>Eye-catching design for hero sections</p>
          </div>
        </div>
        <div class="card-container centered">
          <ImageFocusedCard />
        </div>
        <div class="features-list">
          <span class="feature">✓ Full-bleed image</span>
          <span class="feature">✓ Gradient overlay</span>
          <span class="feature">✓ Floating content</span>
          <span class="feature">✓ Premium aesthetic</span>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="showcase-section">
        <div class="section-header">
          <span class="card-number">05</span>
          <div>
            <h2>Premium/Featured Card</h2>
            <p>Showcase luxury and specialty products</p>
          </div>
        </div>
        <div class="card-container centered">
          <PremiumCard />
        </div>
        <div class="features-list">
          <span class="feature">✓ Premium ribbon banner</span>
          <span class="feature">✓ Award certification badge</span>
          <span class="feature">✓ Feature grid icons</span>
          <span class="feature">✓ Detailed product info</span>
        </div>
      </div>

      <!-- Card 6 -->
      <div class="showcase-section">
        <div class="section-header">
          <span class="card-number">06</span>
          <div>
            <h2>Compact List-Style Card</h2>
            <p>Perfect for dense menus and quick ordering</p>
          </div>
        </div>
        <div class="card-container list">
          <CompactListCard />
          <CompactListCard />
        </div>
        <div class="features-list">
          <span class="feature">✓ Only 100px height</span>
          <span class="feature">✓ Size options display</span>
          <span class="feature">✓ Temperature badge</span>
          <span class="feature">✓ Efficient layout</span>
        </div>
      </div>

      <!-- Card 7 -->
      <div class="showcase-section">
        <div class="section-header">
          <span class="card-number">07</span>
          <div>
            <h2>Rounded Pill-Style Card</h2>
            <p>Modern, friendly design for all ages</p>
          </div>
        </div>
        <div class="card-container list">
          <PillStyleCard />
          <PillStyleCard />
        </div>
        <div class="features-list">
          <span class="feature">✓ Fully rounded design</span>
          <span class="feature">✓ Circular product image</span>
          <span class="feature">✓ Availability indicator</span>
          <span class="feature">✓ Trendy aesthetic</span>
        </div>
      </div>

      <!-- Design System -->
      <div class="design-system">
        <h2>Design System</h2>
        <div class="system-grid">
          <div class="system-item">
            <ion-icon :icon="colorPaletteOutline"></ion-icon>
            <h3>Coffee Colors</h3>
            <p>Warm browns, creams, and neutral tones inspired by coffee beans and roasting</p>
          </div>
          <div class="system-item">
            <ion-icon :icon="resizeOutline"></ion-icon>
            <h3>Flexible Layouts</h3>
            <p>Vertical, horizontal, tile, and pill styles for different use cases</p>
          </div>
          <div class="system-item">
            <ion-icon :icon="phonePortraitOutline"></ion-icon>
            <h3>Mobile First</h3>
            <p>Touch-friendly buttons, proper spacing, and responsive designs</p>
          </div>
          <div class="system-item">
            <ion-icon :icon="sparklesOutline"></ion-icon>
            <h3>Modern Details</h3>
            <p>Smooth shadows, rounded corners, subtle animations, and badges</p>
          </div>
        </div>
      </div>

      <!-- Usage Guide -->
      <div class="usage-guide">
        <h2>Usage Recommendations</h2>
        <div class="usage-table">
          <div class="usage-row header">
            <span>Card Type</span>
            <span>Best For</span>
            <span>Height</span>
          </div>
          <div class="usage-row">
            <span class="card-name">Classic Vertical</span>
            <span>Product grids, featured items</span>
            <span class="dimension">~360px</span>
          </div>
          <div class="usage-row">
            <span class="card-name">Modern Horizontal</span>
            <span>Menu lists, scrollable feeds</span>
            <span class="dimension">120px</span>
          </div>
          <div class="usage-row">
            <span class="card-name">Minimal Tile</span>
            <span>Category browsing, galleries</span>
            <span class="dimension">~280px</span>
          </div>
          <div class="usage-row">
            <span class="card-name">Image-Focused</span>
            <span>Hero sections, promotions</span>
            <span class="dimension">420px</span>
          </div>
          <div class="usage-row">
            <span class="card-name">Premium</span>
            <span>Luxury items, gift sets</span>
            <span class="dimension">~540px</span>
          </div>
          <div class="usage-row">
            <span class="card-name">Compact List</span>
            <span>Quick menus, dense lists</span>
            <span class="dimension">100px</span>
          </div>
          <div class="usage-row">
            <span class="card-name">Pill-Style</span>
            <span>Friendly UI, quick add items</span>
            <span class="dimension">~95px</span>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonIcon,
  IonButton
} from '@ionic/vue';
import {
  colorPaletteOutline,
  resizeOutline,
  phonePortraitOutline,
  sparklesOutline,
  star,
  addOutline,
  heartOutline,
  addCircleOutline,
  leafOutline,
  waterOutline,
  eyeOutline,
  sparklesOutline as sparkles,
  locationOutline,
  flameOutline,
  arrowForwardOutline,
  starOutline,
  ribbonOutline,
  checkmarkCircleOutline,
  airplaneOutline,
  bagHandleOutline,
  snowOutline,
  chevronForwardOutline,
  cafeOutline
} from 'ionicons/icons';

// Card 1: Classic Vertical Card
const ClassicVerticalCard = defineComponent({
  name: 'ClassicVerticalCard',
  setup() {
    return () => h('div', { class: 'classic-vertical-card' }, [
      h('div', { class: 'image-container' }, [
        h('img', { 
          src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop',
          alt: 'Caramel Macchiato',
          class: 'product-image'
        }),
        h('span', { class: 'badge new' }, 'New'),
        h('div', { class: 'quick-add' }, [
          h(IonIcon, { icon: heartOutline, class: 'favorite-icon' })
        ])
      ]),
      h('div', { class: 'card-content' }, [
        h('div', { class: 'header' }, [
          h('h3', { class: 'product-name' }, 'Caramel Macchiato'),
          h('div', { class: 'rating' }, [
            h(IonIcon, { icon: star }),
            h('span', '4.8')
          ])
        ]),
        h('p', { class: 'description' }, 'Espresso with steamed milk, vanilla and rich caramel'),
        h('div', { class: 'details' }, [
          h('span', { class: 'roast-tag' }, 'Medium Roast'),
          h('span', { class: 'origin' }, 'Colombia')
        ]),
        h('div', { class: 'footer' }, [
          h('div', { class: 'price-section' }, [
            h('span', { class: 'price' }, '$4.50'),
            h('span', { class: 'size' }, '12oz')
          ]),
          h(IonButton, { class: 'add-button', fill: 'solid' }, () => [
            h(IonIcon, { slot: 'start', icon: addOutline }),
            'Add'
          ])
        ])
      ])
    ]);
  }
});

// Card 2: Modern Horizontal Card
const ModernHorizontalCard = defineComponent({
  name: 'ModernHorizontalCard',
  setup() {
    return () => h('div', { class: 'modern-horizontal-card' }, [
      h('div', { class: 'image-section' }, [
        h('img', { 
          src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop',
          alt: 'Cold Brew',
          class: 'product-image'
        }),
        h('span', { class: 'badge popular' }, 'Popular')
      ]),
      h('div', { class: 'content-section' }, [
        h('div', { class: 'main-content' }, [
          h('div', { class: 'title-row' }, [
            h('h3', { class: 'product-name' }, 'Cold Brew Special'),
            h('span', { class: 'price' }, '$5.25')
          ]),
          h('p', { class: 'description' }, 'Smooth, bold coffee steeped for 20 hours'),
          h('div', { class: 'tags' }, [
            h('span', { class: 'tag' }, [
              h(IonIcon, { icon: leafOutline }),
              'Organic'
            ]),
            h('span', { class: 'tag' }, [
              h(IonIcon, { icon: waterOutline }),
              'Iced'
            ])
          ])
        ]),
        h(IonButton, { class: 'add-button', fill: 'solid', size: 'small' }, () => [
          h(IonIcon, { slot: 'icon-only', icon: addCircleOutline })
        ])
      ])
    ]);
  }
});

// Card 3: Minimal Tile Card
const MinimalTileCard = defineComponent({
  name: 'MinimalTileCard',
  setup() {
    return () => h('div', { class: 'minimal-tile-card' }, [
      h('div', { class: 'image-wrapper' }, [
        h('img', { 
          src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop',
          alt: 'House Blend',
          class: 'product-image'
        }),
        h('div', { class: 'hover-overlay' }, [
          h(IonButton, { class: 'quick-view', fill: 'solid', size: 'small' }, () => [
            h(IonIcon, { slot: 'icon-only', icon: eyeOutline })
          ])
        ])
      ]),
      h('div', { class: 'tile-content' }, [
        h('div', { class: 'info' }, [
          h('h3', { class: 'product-name' }, 'House Blend'),
          h('p', { class: 'roast' }, 'Medium Roast')
        ]),
        h('div', { class: 'price-action' }, [
          h('span', { class: 'price' }, '$12.99'),
          h(IonButton, { class: 'add-icon', fill: 'clear', size: 'small' }, () => [
            h(IonIcon, { slot: 'icon-only', icon: addOutline })
          ])
        ])
      ])
    ]);
  }
});

// Card 4: Image-Focused Card
const ImageFocusedCard = defineComponent({
  name: 'ImageFocusedCard',
  setup() {
    return () => h('div', { class: 'image-focused-card' }, [
      h('div', { class: 'background-image' }, [
        h('img', { 
          src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop',
          alt: 'Single Origin Ethiopia',
          class: 'hero-image'
        }),
        h('div', { class: 'gradient-overlay' })
      ]),
      h('div', { class: 'floating-content' }, [
        h('div', { class: 'top-section' }, [
          h('span', { class: 'specialty-badge' }, [
            h(IonIcon, { icon: sparkles }),
            'Specialty'
          ]),
          h(IonButton, { class: 'favorite-btn', fill: 'clear' }, () => [
            h(IonIcon, { slot: 'icon-only', icon: heartOutline })
          ])
        ]),
        h('div', { class: 'bottom-section' }, [
          h('div', { class: 'product-info' }, [
            h('h2', { class: 'product-name' }, 'Single Origin Ethiopia'),
            h('p', { class: 'flavor-notes' }, 'Bright citrus & jasmine notes'),
            h('div', { class: 'meta-info' }, [
              h('div', { class: 'meta-item' }, [
                h(IonIcon, { icon: locationOutline }),
                h('span', 'Yirgacheffe')
              ]),
              h('div', { class: 'meta-item' }, [
                h(IonIcon, { icon: flameOutline }),
                h('span', 'Light Roast')
              ])
            ])
          ]),
          h('div', { class: 'action-section' }, [
            h('div', { class: 'price-block' }, [
              h('span', { class: 'from' }, 'from'),
              h('span', { class: 'price' }, '$16.99')
            ]),
            h(IonButton, { class: 'explore-btn', expand: 'block', fill: 'solid' }, () => [
              'Explore',
              h(IonIcon, { slot: 'end', icon: arrowForwardOutline })
            ])
          ])
        ])
      ])
    ]);
  }
});

// Card 5: Premium Card
const PremiumCard = defineComponent({
  name: 'PremiumCard',
  setup() {
    return () => h('div', { class: 'premium-card' }, [
      h('div', { class: 'premium-ribbon' }, [
        h(IonIcon, { icon: starOutline }),
        h('span', 'Premium')
      ]),
      h('div', { class: 'premium-image' }, [
        h('img', { 
          src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop',
          alt: 'Jamaican Blue Mountain',
          class: 'product-image'
        }),
        h('div', { class: 'certification-badge' }, [
          h(IonIcon, { icon: ribbonOutline }),
          h('span', 'Award Winner')
        ])
      ]),
      h('div', { class: 'premium-content' }, [
        h('div', { class: 'content-header' }, [
          h('h2', { class: 'product-name' }, 'Jamaican Blue Mountain'),
          h('div', { class: 'rating-box' }, [
            h(IonIcon, { icon: star }),
            h('span', { class: 'rating' }, '5.0'),
            h('span', { class: 'reviews' }, '(128)')
          ])
        ]),
        h('p', { class: 'premium-description' }, 'The world\'s most sought-after coffee. Silky smooth with delicate flavor, grown in the mist-covered Blue Mountains of Jamaica.'),
        h('div', { class: 'features-grid' }, [
          h('div', { class: 'feature-tag' }, [
            h(IonIcon, { icon: checkmarkCircleOutline }),
            h('span', '100% Certified')
          ]),
          h('div', { class: 'feature-tag' }, [
            h(IonIcon, { icon: leafOutline }),
            h('span', 'Organic')
          ]),
          h('div', { class: 'feature-tag' }, [
            h(IonIcon, { icon: flameOutline }),
            h('span', 'Medium Roast')
          ]),
          h('div', { class: 'feature-tag' }, [
            h(IonIcon, { icon: airplaneOutline }),
            h('span', 'Direct Trade')
          ])
        ]),
        h('div', { class: 'divider' }),
        h('div', { class: 'premium-footer' }, [
          h('div', { class: 'price-info' }, [
            h('span', { class: 'starting' }, 'Starting at'),
            h('span', { class: 'price' }, '$42.99'),
            h('span', { class: 'unit' }, '/ 8oz')
          ]),
          h(IonButton, { class: 'premium-button', expand: 'block', fill: 'solid' }, () => [
            h(IonIcon, { slot: 'start', icon: bagHandleOutline }),
            'Order Premium'
          ])
        ])
      ])
    ]);
  }
});

// Card 6: Compact List Card
const CompactListCard = defineComponent({
  name: 'CompactListCard',
  setup() {
    return () => h('div', { class: 'compact-list-card' }, [
      h('div', { class: 'compact-image' }, [
        h('img', { 
          src: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300&auto=format&fit=crop',
          alt: 'Iced Latte',
          class: 'product-image'
        })
      ]),
      h('div', { class: 'compact-content' }, [
        h('div', { class: 'text-content' }, [
          h('h3', { class: 'product-name' }, 'Iced Vanilla Latte'),
          h('p', { class: 'description' }, 'Smooth espresso with vanilla and cold milk'),
          h('div', { class: 'badges' }, [
            h('span', { class: 'size-badge' }, '12oz / 16oz'),
            h('span', { class: 'temp-badge' }, [
              h(IonIcon, { icon: snowOutline }),
              'Iced'
            ])
          ])
        ]),
        h('div', { class: 'action-side' }, [
          h('span', { class: 'price' }, '$4.75'),
          h(IonButton, { class: 'add-button', fill: 'clear', size: 'small' }, () => [
            h(IonIcon, { slot: 'icon-only', icon: addCircleOutline })
          ])
        ])
      ])
    ]);
  }
});

// Card 7: Pill Style Card
const PillStyleCard = defineComponent({
  name: 'PillStyleCard',
  setup() {
    return () => h('div', { class: 'pill-card' }, [
      h('div', { class: 'pill-image' }, [
        h('img', { 
          src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&auto=format&fit=crop',
          alt: 'Cappuccino',
          class: 'product-image'
        }),
        h('div', { class: 'availability-dot' })
      ]),
      h('div', { class: 'pill-content' }, [
        h('div', { class: 'info-section' }, [
          h('h3', { class: 'product-name' }, 'Classic Cappuccino'),
          h('div', { class: 'meta-row' }, [
            h('span', { class: 'category' }, [
              h(IonIcon, { icon: cafeOutline }),
              'Espresso'
            ]),
            h('span', { class: 'separator' }, '•'),
            h('span', { class: 'size' }, '8oz / 12oz')
          ])
        ]),
        h('div', { class: 'action-section' }, [
          h('span', { class: 'price' }, '$4.25'),
          h(IonButton, { class: 'pill-button', fill: 'solid', size: 'small' }, () => [
            'Add',
            h(IonIcon, { slot: 'end', icon: chevronForwardOutline })
          ])
        ])
      ])
    ]);
  }
});
</script>

<style scoped>
ion-content {
  --background: #FAFAFA;
}

/* Hero */
.hero-section {
  background: linear-gradient(135deg, #8B6F47 0%, #6B563D 100%);
  padding: 48px 24px;
  text-align: center;
  color: #FFFFFF;
}

.hero-section h1 {
  font-size: 32px;
  font-weight: 900;
  margin: 0 0 12px 0;
  letter-spacing: -0.8px;
}

.hero-section p {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  opacity: 0.9;
}

/* Showcase Sections */
.showcase-section {
  background: #FFFFFF;
  padding: 32px 24px;
  margin: 16px 0;
}

.section-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.card-number {
  font-size: 40px;
  font-weight: 900;
  color: #F5E6D3;
  line-height: 1;
  letter-spacing: -1px;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 800;
  color: #2C2416;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.section-header p {
  font-size: 14px;
  font-weight: 500;
  color: #8B7355;
  margin: 0;
}

/* Card Containers */
.card-container {
  display: flex;
  justify-content: center;
  padding: 24px;
  background: #F8F8F8;
  border-radius: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.card-container.vertical {
  justify-content: center;
}

.card-container.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 200px));
  justify-content: center;
}

.card-container.centered {
  justify-content: center;
}

.card-container.list {
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Features List */
.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.feature {
  font-size: 13px;
  font-weight: 600;
  color: #8B6F47;
  background: #FFFBF7;
  border: 1px solid #F5E6D3;
  padding: 8px 14px;
  border-radius: 12px;
}

/* Design System */
.design-system {
  background: linear-gradient(135deg, #FFFBF7 0%, #FFF8F0 100%);
  border: 2px solid #F5E6D3;
  border-radius: 24px;
  padding: 32px 24px;
  margin: 24px 16px;
}

.design-system h2 {
  font-size: 26px;
  font-weight: 900;
  color: #2C2416;
  margin: 0 0 28px 0;
  letter-spacing: -0.6px;
  text-align: center;
}

.system-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.system-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.system-item ion-icon {
  font-size: 40px;
  color: #8B6F47;
}

.system-item h3 {
  font-size: 17px;
  font-weight: 800;
  color: #2C2416;
  margin: 0;
  letter-spacing: -0.3px;
}

.system-item p {
  font-size: 13px;
  font-weight: 500;
  color: #6B563D;
  margin: 0;
  line-height: 1.5;
}

/* Usage Guide */
.usage-guide {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px 24px;
  margin: 24px 16px 24px;
}

.usage-guide h2 {
  font-size: 26px;
  font-weight: 900;
  color: #2C2416;
  margin: 0 0 24px 0;
  letter-spacing: -0.6px;
  text-align: center;
}

.usage-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.usage-row {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1fr;
  gap: 16px;
  padding: 14px 16px;
  background: #F8F8F8;
  border-radius: 10px;
  font-size: 13px;
  align-items: center;
}

.usage-row.header {
  background: #8B6F47;
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 11px;
}

.card-name {
  font-weight: 700;
  color: #2C2416;
}

.dimension {
  font-weight: 700;
  color: #8B6F47;
}

/* ===== CARD 1: CLASSIC VERTICAL ===== */
.classic-vertical-card {
  background: #FFFFFF;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(107, 86, 61, 0.08);
  border: 1px solid #F5E6D3;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
}

.classic-vertical-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(107, 86, 61, 0.12);
}

.image-container {
  position: relative;
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, #F5E6D3 0%, #E5D5C3 100%);
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.classic-vertical-card:hover .product-image {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.new {
  top: 12px;
  left: 12px;
  background: #66BB6A;
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(102, 187, 106, 0.3);
}

.badge.popular {
  background: rgba(255, 107, 53, 0.95);
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
}

.quick-add {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quick-add:active {
  transform: scale(0.9);
}

.favorite-icon {
  font-size: 20px;
  color: #8B6F47;
}

.card-content {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.product-name {
  font-size: 18px;
  font-weight: 800;
  color: #2C2416;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.4px;
  flex: 1;
}

.rating {
  display: flex;
  align-items: center;
  gap: 3px;
  background: #FFF8F0;
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid #F5E6D3;
}

.rating ion-icon {
  font-size: 14px;
  color: #FFA726;
}

.rating span {
  font-size: 13px;
  font-weight: 700;
  color: #8B6F47;
}

.description {
  font-size: 13px;
  font-weight: 500;
  color: #6B563D;
  margin: 0;
  line-height: 1.5;
}

.details {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.roast-tag,
.origin {
  font-size: 11px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 12px;
  background: #FFFBF7;
  border: 1px solid #F5E6D3;
  color: #8B6F47;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  gap: 12px;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price {
  font-size: 22px;
  font-weight: 900;
  color: #8B6F47;
  letter-spacing: -0.5px;
  line-height: 1;
}

.size {
  font-size: 11px;
  font-weight: 600;
  color: #B8946A;
}

.add-button {
  --background: #8B6F47;
  --background-activated: #6B563D;
  --border-radius: 12px;
  --padding-start: 18px;
  --padding-end: 18px;
  height: 40px;
  font-weight: 700;
  font-size: 14px;
  text-transform: none;
  letter-spacing: -0.1px;
  box-shadow: 0 4px 12px rgba(139, 111, 71, 0.25);
}

.add-button ion-icon {
  font-size: 18px;
}

/* ===== CARD 2: MODERN HORIZONTAL ===== */
.modern-horizontal-card {
  background: #FFFFFF;
  border-radius: 18px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(107, 86, 61, 0.06);
  border: 1px solid #F0F0F0;
  transition: all 0.2s ease;
  height: 120px;
}

.modern-horizontal-card:active {
  transform: scale(0.98);
  box-shadow: 0 4px 16px rgba(107, 86, 61, 0.1);
}

.image-section {
  position: relative;
  width: 120px;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #F5E6D3 0%, #E5D5C3 100%);
}

.badge.popular {
  position: absolute;
  bottom: 8px;
  left: 8px;
}

.content-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  min-width: 0;
  gap: 12px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  color: #8B6F47;
  background: #FFFBF7;
  border: 1px solid #F5E6D3;
  padding: 4px 8px;
  border-radius: 8px;
}

.tag ion-icon {
  font-size: 12px;
}

/* ===== CARD 3: MINIMAL TILE ===== */
.minimal-tile-card {
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #F5F5F5;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
}

.minimal-tile-card:hover {
  box-shadow: 0 6px 20px rgba(107, 86, 61, 0.12);
  transform: translateY(-4px);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  background: #F8F8F8;
  overflow: hidden;
}

.minimal-tile-card:hover .product-image {
  transform: scale(1.08);
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(44, 36, 22, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
}

.minimal-tile-card:hover .hover-overlay {
  opacity: 1;
}

.quick-view {
  --background: rgba(255, 255, 255, 0.95);
  --color: #8B6F47;
  --border-radius: 12px;
  --padding-start: 0;
  --padding-end: 0;
  width: 44px;
  height: 44px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.quick-view ion-icon {
  font-size: 22px;
}

.tile-content {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.roast {
  font-size: 11px;
  font-weight: 600;
  color: #B8946A;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-icon {
  --color: #8B6F47;
  --padding-start: 0;
  --padding-end: 0;
  width: 32px;
  height: 32px;
  margin: 0;
}

.add-icon ion-icon {
  font-size: 22px;
}

/* ===== CARD 4: IMAGE-FOCUSED ===== */
.image-focused-card {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 420px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(107, 86, 61, 0.15);
}

.background-image {
  position: absolute;
  inset: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(44, 36, 22, 0.85) 100%
  );
}

.floating-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  z-index: 1;
}

.top-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.specialty-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #8B6F47;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.specialty-badge ion-icon {
  font-size: 16px;
}

.favorite-btn {
  --color: #FFFFFF;
  --background: rgba(0, 0, 0, 0.3);
  --border-radius: 50%;
  --padding-start: 0;
  --padding-end: 0;
  width: 40px;
  height: 40px;
  backdrop-filter: blur(8px);
}

.favorite-btn ion-icon {
  font-size: 24px;
}

.bottom-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.flavor-notes {
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
}

.meta-info {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

.meta-item ion-icon {
  font-size: 14px;
}

.action-section {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.from {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.explore-btn {
  --background: rgba(255, 255, 255, 0.95);
  --color: #8B6F47;
  --border-radius: 14px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 24px;
  --padding-end: 24px;
  font-weight: 700;
  font-size: 15px;
  text-transform: none;
  letter-spacing: -0.1px;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.explore-btn ion-icon {
  font-size: 18px;
  margin-left: 4px;
}

/* ===== CARD 5: PREMIUM ===== */
.premium-card {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFCF7 100%);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(139, 111, 71, 0.18);
  border: 2px solid #E8D5BF;
  width: 100%;
  max-width: 360px;
  position: relative;
}

.premium-ribbon {
  position: absolute;
  top: 20px;
  right: -35px;
  background: linear-gradient(135deg, #D4A574 0%, #B8946A 100%);
  color: #FFFFFF;
  padding: 8px 45px;
  transform: rotate(45deg);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 4px;
}

.premium-ribbon ion-icon {
  font-size: 14px;
}

.premium-image {
  position: relative;
  width: 100%;
  height: 260px;
  background: linear-gradient(135deg, #F5E6D3 0%, #E5D5C3 100%);
}

.certification-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  padding: 10px 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(212, 165, 116, 0.3);
}

.certification-badge ion-icon {
  font-size: 18px;
  color: #D4A574;
}

.certification-badge span {
  font-size: 12px;
  font-weight: 700;
  color: #8B6F47;
}

.premium-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.rating-box {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #FFF8F0;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1.5px solid #F5E6D3;
  flex-shrink: 0;
}

.rating-box ion-icon {
  font-size: 16px;
  color: #FFB800;
}

.rating-box .rating {
  font-size: 14px;
  font-weight: 800;
  color: #8B6F47;
}

.reviews {
  font-size: 11px;
  font-weight: 600;
  color: #B8946A;
}

.premium-description {
  font-size: 14px;
  font-weight: 500;
  color: #6B563D;
  margin: 0;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #FFFBF7;
  border: 1.5px solid #F5E6D3;
  padding: 10px 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.feature-tag:active {
  background: #FFF8F0;
  transform: scale(0.97);
}

.feature-tag ion-icon {
  font-size: 16px;
  color: #8B6F47;
  flex-shrink: 0;
}

.feature-tag span {
  font-size: 12px;
  font-weight: 600;
  color: #6B563D;
}

.divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    #E8D5BF 50%,
    transparent 100%
  );
  margin: 4px 0;
}

.premium-footer {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.starting {
  font-size: 11px;
  font-weight: 600;
  color: #B8946A;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.unit {
  font-size: 13px;
  font-weight: 600;
  color: #B8946A;
}

.premium-button {
  --background: linear-gradient(135deg, #8B6F47 0%, #6B563D 100%);
  --background-activated: #6B563D;
  --border-radius: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  --box-shadow: 0 6px 20px rgba(107, 86, 61, 0.3);
  font-weight: 800;
  font-size: 16px;
  text-transform: none;
  letter-spacing: -0.2px;
}

.premium-button ion-icon {
  font-size: 20px;
}

/* ===== CARD 6: COMPACT LIST ===== */
.compact-list-card {
  background: #FFFFFF;
  border-radius: 16px;
  display: flex;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid #F5F5F5;
  transition: all 0.2s ease;
  height: 100px;
}

.compact-list-card:active {
  background: #FAFAFA;
  transform: scale(0.99);
  box-shadow: 0 2px 10px rgba(107, 86, 61, 0.08);
}

.compact-image {
  width: 100px;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #F5E6D3 0%, #E5D5C3 100%);
}

.compact-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  min-width: 0;
  gap: 12px;
}

.text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.badges {
  display: flex;
  gap: 6px;
  margin-top: 2px;
}

.size-badge,
.temp-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.size-badge {
  background: #FFFBF7;
  color: #B8946A;
  border: 1px solid #F5E6D3;
}

.temp-badge {
  background: #E3F2FD;
  color: #1976D2;
  border: 1px solid #BBDEFB;
}

.temp-badge ion-icon {
  font-size: 11px;
}

.action-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
}

/* ===== CARD 7: PILL STYLE ===== */
.pill-card {
  background: #FFFFFF;
  border-radius: 60px;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 14px;
  box-shadow: 0 4px 16px rgba(107, 86, 61, 0.08);
  border: 1.5px solid #F0F0F0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pill-card:active {
  transform: scale(0.97);
  box-shadow: 0 6px 24px rgba(107, 86, 61, 0.12);
}

.pill-image {
  position: relative;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #F5E6D3 0%, #E5D5C3 100%);
  border: 3px solid #FFFBF7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.availability-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  background: #66BB6A;
  border: 3px solid #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.pill-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-width: 0;
  padding-right: 8px;
}

.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
}

.category {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #8B6F47;
}

.category ion-icon {
  font-size: 13px;
}

.separator {
  color: #DDD;
}

.pill-button {
  --background: #8B6F47;
  --background-activated: #6B563D;
  --border-radius: 50px;
  --padding-start: 18px;
  --padding-end: 16px;
  height: 38px;
  font-weight: 700;
  font-size: 14px;
  text-transform: none;
  letter-spacing: -0.1px;
  box-shadow: 0 4px 12px rgba(139, 111, 71, 0.25);
}

.pill-button ion-icon {
  font-size: 16px;
  margin-left: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .usage-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  
  .usage-row.header {
    display: none;
  }
}

@media (max-width: 400px) {
  .pill-card {
    padding: 8px;
    gap: 10px;
  }

  .pill-image {
    width: 65px;
    height: 65px;
  }

  .action-section {
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
  }

  .pill-button {
    height: 34px;
    font-size: 13px;
    --padding-start: 14px;
    --padding-end: 12px;
  }
}
</style>
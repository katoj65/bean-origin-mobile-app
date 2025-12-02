<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header class="ion-no-border" translucent>
      <ion-toolbar class="custom-toolbar transparent">
        <ion-buttons slot="start">
          <ion-button @click="goBack" class="back-btn-circle">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="shareCoffee" class="share-btn-circle">
            <ion-icon :icon="shareOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen class="content-bg">
      <!-- HERO IMAGE -->
      <div class="hero-image-section">
        <img :src="coffeeStory.heroImage" :alt="coffeeStory.name" class="hero-img" />
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="origin-badge">
            <ion-icon :icon="locationOutline" class="badge-icon"></ion-icon>
            <span>{{ coffeeStory.region }}, {{ coffeeStory.country }}</span>
          </div>
          <h1 class="hero-title">{{ coffeeStory.name }}</h1>
          <p class="hero-subtitle">{{ coffeeStory.tagline }}</p>
        </div>
      </div>

      <!-- QUICK INFO CARDS -->
      <div class="quick-info-section">
        <div class="info-card-small altitude">
          <div class="info-icon">
            <ion-icon :icon="trendingUpOutline"></ion-icon>
          </div>
          <span class="info-label">Altitude</span>
          <span class="info-value">{{ coffeeStory.altitude }}</span>
        </div>

        <div class="info-card-small variety">
          <div class="info-icon">
            <ion-icon :icon="leafOutline"></ion-icon>
          </div>
          <span class="info-label">Variety</span>
          <span class="info-value">{{ coffeeStory.variety }}</span>
        </div>

        <div class="info-card-small process">
          <div class="info-icon">
            <ion-icon :icon="waterOutline"></ion-icon>
          </div>
          <span class="info-label">Process</span>
          <span class="info-value">{{ coffeeStory.process }}</span>
        </div>
      </div>

      <!-- STORY INTRODUCTION -->
      <div class="story-section">
        <div class="section-header-icon">☕</div>
        <h2 class="section-title">The Story Behind the Bean</h2>
        <p class="story-text">{{ coffeeStory.introduction }}</p>
      </div>

      <!-- FARMER PROFILE -->
      <div class="farmer-section">
        <div class="farmer-card">
          <div class="farmer-header">
            <img :src="coffeeStory.farmer.photo" :alt="coffeeStory.farmer.name" class="farmer-photo" />
            <div class="farmer-info">
              <h3 class="farmer-name">{{ coffeeStory.farmer.name }}</h3>
              <p class="farmer-role">{{ coffeeStory.farmer.role }}</p>
              <div class="farmer-meta">
                <span class="meta-item">
                  <ion-icon :icon="homeOutline" class="meta-icon"></ion-icon>
                  {{ coffeeStory.farmer.farmSize }}
                </span>
                <span class="meta-item">
                  <ion-icon :icon="calendarOutline" class="meta-icon"></ion-icon>
                  {{ coffeeStory.farmer.experience }}
                </span>
              </div>
            </div>
          </div>

          <div class="farmer-quote">
            <div class="quote-icon">"</div>
            <p class="quote-text">{{ coffeeStory.farmer.quote }}</p>
            <div class="quote-author">— {{ coffeeStory.farmer.name }}</div>
          </div>

          <p class="farmer-story">{{ coffeeStory.farmer.story }}</p>
        </div>
      </div>

      <!-- JOURNEY TIMELINE -->
      <div class="journey-section">
        <h2 class="section-title centered">From Farm to Cup</h2>
        <p class="section-subtitle">Follow the journey of this exceptional coffee</p>

        <div class="timeline">
          <div 
            v-for="(step, index) in coffeeStory.journey" 
            :key="index"
            class="timeline-item">
            <div class="timeline-marker">
              <div class="marker-circle">
                <span class="marker-emoji">{{ step.emoji }}</span>
              </div>
              <div v-if="index < coffeeStory.journey.length - 1" class="timeline-line"></div>
            </div>
            <div class="timeline-content">
              <h4 class="timeline-title">{{ step.title }}</h4>
              <p class="timeline-desc">{{ step.description }}</p>
              <span class="timeline-date">{{ step.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- TASTING NOTES -->
      <div class="tasting-section">
        <h2 class="section-title centered">Flavor Profile</h2>
        <p class="section-subtitle">Experience the unique taste characteristics</p>

        <div class="flavor-wheel">
          <div 
            v-for="(note, index) in coffeeStory.tastingNotes" 
            :key="index"
            class="flavor-item"
            :style="{ animationDelay: (index * 0.1) + 's' }">
            <div class="flavor-circle">
              <span class="flavor-emoji">{{ note.emoji }}</span>
            </div>
            <span class="flavor-name">{{ note.name }}</span>
          </div>
        </div>

        <div class="roast-profile">
          <div class="roast-bar">
            <div class="roast-indicator" :style="{ left: coffeeStory.roastLevel + '%' }">
              <div class="roast-dot"></div>
              <span class="roast-label">{{ getRoastLabel() }}</span>
            </div>
          </div>
          <div class="roast-labels">
            <span>Light</span>
            <span>Medium</span>
            <span>Dark</span>
          </div>
        </div>
      </div>

      <!-- SUSTAINABILITY -->
      <div class="sustainability-section">
        <div class="section-header-icon">🌱</div>
        <h2 class="section-title">Sustainable Practices</h2>
        <p class="section-subtitle">Our commitment to the environment and community</p>

        <div class="sustainability-grid">
          <div 
            v-for="practice in coffeeStory.sustainability" 
            :key="practice.title"
            class="practice-card">
            <div class="practice-icon-wrapper">
              <span class="practice-emoji">{{ practice.emoji }}</span>
            </div>
            <h4 class="practice-title">{{ practice.title }}</h4>
            <p class="practice-desc">{{ practice.description }}</p>
          </div>
        </div>
      </div>

      <!-- CERTIFICATIONS -->
      <div class="certifications-section">
        <h3 class="cert-title">Certifications & Awards</h3>
        <div class="cert-badges">
          <div 
            v-for="cert in coffeeStory.certifications" 
            :key="cert.name"
            class="cert-badge">
            <div class="cert-icon">{{ cert.icon }}</div>
            <span class="cert-name">{{ cert.name }}</span>
          </div>
        </div>
      </div>

      <!-- BREWING RECOMMENDATIONS -->
      <div class="brewing-section">
        <h2 class="section-title centered">Brewing Recommendations</h2>
        <p class="section-subtitle">Get the best from this coffee</p>

        <div class="brew-methods">
          <div 
            v-for="method in coffeeStory.brewingMethods" 
            :key="method.name"
            class="brew-method-card">
            <div class="method-icon-circle">
              <span class="method-emoji">{{ method.emoji }}</span>
            </div>
            <h4 class="method-name">{{ method.name }}</h4>
            <div class="method-specs">
              <div class="spec-item">
                <span class="spec-label">Ratio</span>
                <span class="spec-value">{{ method.ratio }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Temp</span>
                <span class="spec-value">{{ method.temp }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Time</span>
                <span class="spec-value">{{ method.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- IMPACT METRICS -->
      <div class="impact-section">
        <h2 class="section-title centered">Community Impact</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon families">👨‍👩‍👧‍👦</div>
            <span class="metric-value">{{ coffeeStory.impact.families }}</span>
            <span class="metric-label">Families Supported</span>
          </div>
          <div class="metric-card">
            <div class="metric-icon trees">🌳</div>
            <span class="metric-value">{{ coffeeStory.impact.trees }}</span>
            <span class="metric-label">Trees Planted</span>
          </div>
          <div class="metric-card">
            <div class="metric-icon schools">🏫</div>
            <span class="metric-value">{{ coffeeStory.impact.schools }}</span>
            <span class="metric-label">Schools Built</span>
          </div>
          <div class="metric-card">
            <div class="metric-icon water">💧</div>
            <span class="metric-value">{{ coffeeStory.impact.waterSaved }}</span>
            <span class="metric-label">Liters Saved</span>
          </div>
        </div>
      </div>

      <!-- PURCHASE CTA -->
      <div class="purchase-section">
        <div class="purchase-card">
          <div class="purchase-info">
            <h3 class="purchase-title">Experience This Coffee</h3>
            <p class="purchase-desc">Available now in 250g and 500g bags</p>
            <div class="price-display">
              <span class="price-label">Starting from</span>
              <span class="price-amount">${{ coffeeStory.price }}</span>
            </div>
          </div>
          <div class="purchase-actions">
            <button class="purchase-btn primary" @click="buyNow">
              <ion-icon :icon="cartOutline"></ion-icon>
              <span>Buy Now</span>
            </button>
            <button class="purchase-btn secondary" @click="addToFavorites">
              <ion-icon :icon="heartOutline"></ion-icon>
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      <!-- SPACER -->
      <div class="bottom-spacer"></div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
} from "@ionic/vue";
import {
  arrowBackOutline,
  shareOutline,
  locationOutline,
  trendingUpOutline,
  leafOutline,
  waterOutline,
  homeOutline,
  calendarOutline,
  cartOutline,
  heartOutline,
} from "ionicons/icons";

const router = useRouter();

const coffeeStory = ref({
  name: "Ethiopian Yirgacheffe",
  tagline: "A legacy of exceptional coffee, cultivated with passion",
  region: "Yirgacheffe",
  country: "Ethiopia",
  heroImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
  altitude: "1,800-2,200m",
  variety: "Heirloom",
  process: "Washed",
  price: 18.99,
  roastLevel: 40, // 0-100 scale
  
  introduction: "Nestled in the highlands of southern Ethiopia, Yirgacheffe is renowned for producing some of the world's most distinctive coffees. This exceptional lot comes from smallholder farmers who have been cultivating coffee for generations, using traditional methods passed down through their families. The unique terroir, combined with meticulous processing, creates a cup that's celebrated worldwide for its bright acidity and floral complexity.",
  
  farmer: {
    name: "Alemayehu Tadesse",
    role: "Coffee Farmer & Cooperative Leader",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    farmSize: "2.5 hectares",
    experience: "25 years",
    quote: "Every coffee cherry we harvest carries the story of our land, our tradition, and our dreams for the future. We don't just grow coffee—we nurture a legacy.",
    story: "Alemayehu represents a collective of 47 smallholder farmers in the Gedeo Zone. His family has been growing coffee for three generations, and he's passionate about sustainable farming practices. Through the cooperative, they've built a washing station that serves the entire community, ensuring consistent quality and fair prices for all members."
  },

  journey: [
    {
      emoji: "🌱",
      title: "Planting & Growing",
      description: "Heirloom coffee varieties are carefully planted at high altitudes, where cool temperatures slow the cherry maturation process, developing complex flavors.",
      date: "Year-round"
    },
    {
      emoji: "👐",
      title: "Selective Harvesting",
      description: "Only ripe red cherries are hand-picked by experienced farmers who understand the perfect moment for harvest. Multiple passes ensure peak ripeness.",
      date: "October - December"
    },
    {
      emoji: "💧",
      title: "Washed Processing",
      description: "Cherries are pulped within hours of harvest, then fermented for 36-48 hours. The beans are washed in clean mountain water and dried on raised beds.",
      date: "Within 24 hours"
    },
    {
      emoji: "☀️",
      title: "Sun Drying",
      description: "Parchment coffee is spread on African raised beds and carefully turned throughout the day, drying slowly over 10-14 days to preserve delicate flavors.",
      date: "2 weeks"
    },
    {
      emoji: "🔍",
      title: "Quality Grading",
      description: "Beans are meticulously sorted by size, density, and appearance. Only Grade 1 beans—the highest quality—make it into this lot.",
      date: "January"
    },
    {
      emoji: "📦",
      title: "Export & Roasting",
      description: "Green coffee is exported in GrainPro bags to preserve freshness. Upon arrival, it's roasted to highlight the coffee's natural floral and citrus notes.",
      date: "February - March"
    },
    {
      emoji: "☕",
      title: "In Your Cup",
      description: "The journey ends in your cup, where you can taste the bright acidity, floral aroma, and complex flavor notes that make Yirgacheffe legendary.",
      date: "Today"
    }
  ],

  tastingNotes: [
    { emoji: "🍋", name: "Lemon" },
    { emoji: "🌸", name: "Jasmine" },
    { emoji: "🫖", name: "Bergamot" },
    { emoji: "🍑", name: "Peach" },
    { emoji: "🍯", name: "Honey" },
    { emoji: "☕", name: "Black Tea" }
  ],

  sustainability: [
    {
      emoji: "♻️",
      title: "Water Conservation",
      description: "Our washing station recycles 95% of water used in processing, protecting local water sources."
    },
    {
      emoji: "🌳",
      title: "Shade Grown",
      description: "Coffee is grown under native shade trees, preserving biodiversity and preventing soil erosion."
    },
    {
      emoji: "🚫",
      title: "Pesticide-Free",
      description: "We use natural pest control methods and organic fertilizers to protect the environment."
    },
    {
      emoji: "👨‍👩‍👧",
      title: "Fair Wages",
      description: "Farmers receive 30% above Fair Trade minimum, ensuring economic sustainability."
    }
  ],

  certifications: [
    { icon: "🌿", name: "Organic" },
    { icon: "🤝", name: "Fair Trade" },
    { icon: "🏆", name: "Cup of Excellence" },
    { icon: "☕", name: "Specialty Grade" }
  ],

  brewingMethods: [
    {
      emoji: "☕",
      name: "Pour Over",
      ratio: "1:16",
      temp: "93°C",
      time: "3-4 min"
    },
    {
      emoji: "🫖",
      name: "French Press",
      ratio: "1:15",
      temp: "95°C",
      time: "4 min"
    },
    {
      emoji: "⚙️",
      name: "Espresso",
      ratio: "1:2",
      temp: "90°C",
      time: "25-30s"
    }
  ],

  impact: {
    families: "47",
    trees: "2,500+",
    schools: "2",
    waterSaved: "50,000"
  }
});

const goBack = () => {
  router.back();
};

const shareCoffee = () => {
  console.log('Share coffee story');
};

const getRoastLabel = () => {
  const level = coffeeStory.value.roastLevel;
  if (level < 33) return 'Light';
  if (level < 66) return 'Medium';
  return 'Dark';
};

const buyNow = () => {
  console.log('Buy coffee');
  router.push('/buy-coffee');
};

const addToFavorites = () => {
  console.log('Add to favorites');
};
</script>

<style scoped>
/* ===== CSS VARIABLES ===== */
:root {
  --coffee-dark: #4a2c2a;
  --coffee-medium: #6b4226;
  --coffee-light: #a87b54;
  --text-dark: #2c1810;
  --text-light: #8b7355;
  --green: #27ae60;
  --blue: #2196f3;
  --orange: #ff9800;
}

/* ===== HEADER ===== */
.custom-toolbar {
  --background: transparent;
  --border-width: 0;
  padding: 8px 4px;
  position: absolute;
  top: 0;
  z-index: 10;
}

.back-btn-circle,
.share-btn-circle {
  --background: rgba(255, 255, 255, 0.95);
  --color: var(--coffee-dark);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 4px;
}

/* ===== CONTENT ===== */
.content-bg {
  --background: #f2f2f2;
}

/* ===== HERO IMAGE ===== */
.hero-image-section {
  position: relative;
  height: 400px;
  margin-bottom: -40px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%);
}

.hero-content {
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 20px;
  color: white;
}

.origin-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
}

.badge-icon {
  font-size: 16px;
}

.hero-title {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 16px;
  margin: 0;
  opacity: 0.95;
  line-height: 1.4;
}

/* ===== QUICK INFO CARDS ===== */
.quick-info-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0 16px 24px;
}

.info-card-small {
  background: white;
  padding: 18px 14px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.info-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-card-small.altitude .info-icon {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 152, 0, 0.25));
}

.info-card-small.variety .info-icon {
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.15), rgba(39, 174, 96, 0.25));
}

.info-card-small.process .info-icon {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(33, 150, 243, 0.25));
}

.info-icon ion-icon {
  font-size: 22px;
}

.info-card-small.altitude .info-icon ion-icon {
  color: var(--orange);
}

.info-card-small.variety .info-icon ion-icon {
  color: var(--green);
}

.info-card-small.process .info-icon ion-icon {
  color: var(--blue);
}

.info-label {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  color: var(--coffee-dark);
  font-weight: 700;
}

/* ===== STORY SECTION ===== */
.story-section {
  background: white;
  padding: 32px 24px;
  margin: 0 16px 16px;
  border-radius: 20px;
  text-align: center;
}

.section-header-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 16px 0;
}

.section-title.centered {
  text-align: center;
}

.section-subtitle {
  font-size: 15px;
  color: var(--text-light);
  margin: 0 0 24px 0;
  text-align: center;
}

.story-text {
  font-size: 16px;
  color: var(--text-dark);
  line-height: 1.8;
  margin: 0;
  text-align: left;
}

/* ===== FARMER SECTION ===== */
.farmer-section {
  padding: 0 16px 24px;
}

.farmer-card {
  background: white;
  padding: 24px;
  border-radius: 20px;
}

.farmer-header {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 2px solid #f0f0f0;
}

.farmer-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.farmer-info {
  flex: 1;
}

.farmer-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 4px 0;
}

.farmer-role {
  font-size: 14px;
  color: var(--text-light);
  margin: 0 0 10px 0;
  font-weight: 600;
}

.farmer-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--coffee-medium);
  font-weight: 600;
}

.meta-icon {
  font-size: 16px;
}

.farmer-quote {
  position: relative;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.05), rgba(107, 66, 38, 0.1));
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.quote-icon {
  font-size: 48px;
  color: var(--coffee-light);
  opacity: 0.3;
  position: absolute;
  top: 10px;
  left: 20px;
  line-height: 1;
}

.quote-text {
  font-size: 16px;
  color: var(--coffee-dark);
  font-style: italic;
  line-height: 1.6;
  margin: 0 0 12px 0;
  padding-left: 30px;
}

.quote-author {
  font-size: 14px;
  color: var(--text-light);
  font-weight: 700;
  text-align: right;
}

.farmer-story {
  font-size: 15px;
  color: var(--text-dark);
  line-height: 1.7;
  margin: 0;
}

/* ===== JOURNEY TIMELINE ===== */
.journey-section {
  background: white;
  padding: 32px 24px;
  margin: 0 16px 16px;
  border-radius: 20px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 28px;
}

.timeline-item {
  display: flex;
  gap: 20px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-circle {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.1), rgba(107, 66, 38, 0.15));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.marker-emoji {
  font-size: 28px;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(180deg, rgba(107, 66, 38, 0.2), rgba(107, 66, 38, 0.05));
  margin: 8px 0;
}

.timeline-content {
  flex: 1;
  padding-bottom: 8px;
}

.timeline-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
}

.timeline-desc {
  font-size: 14px;
  color: var(--text-dark);
  line-height: 1.6;
  margin: 0 0 8px 0;
}

.timeline-date {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== TASTING SECTION ===== */
.tasting-section {
  background: white;
  padding: 32px 24px;
  margin: 0 16px 16px;
  border-radius: 20px;
}

.flavor-wheel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.flavor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: fadeInUp 0.5s ease-out backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.flavor-circle {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, rgba(107, 66, 38, 0.1), rgba(107, 66, 38, 0.15));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flavor-emoji {
  font-size: 32px;
}

.flavor-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--coffee-dark);
}

.roast-profile {
  padding: 24px;
  background: #f8f8f8;
  border-radius: 16px;
}

.roast-bar {
  position: relative;
  height: 8px;
  background: linear-gradient(90deg, #d4a574 0%, #8b6332 50%, #4a2c2a 100%);
  border-radius: 4px;
  margin-bottom: 12px;
}

.roast-indicator {
  position: absolute;
  top: -8px;
  transform: translateX(-50%);
}

.roast-dot {
  width: 24px;
  height: 24px;
  background: white;
  border: 3px solid var(--coffee-dark);
  border-radius: 50%;
  margin: 0 auto 4px;
}

.roast-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--coffee-dark);
  text-align: center;
  white-space: nowrap;
}

.roast-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

/* ===== SUSTAINABILITY ===== */
.sustainability-section {
  background: white;
  padding: 32px 24px;
  margin: 0 16px 16px;
  border-radius: 20px;
  text-align: center;
}

.sustainability-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;
}

.practice-card {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
}

.practice-icon-wrapper {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.practice-emoji {
  font-size: 32px;
}

.practice-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 8px 0;
}

.practice-desc {
  font-size: 13px;
  color: var(--text-dark);
  line-height: 1.5;
  margin: 0;
}

/* ===== CERTIFICATIONS ===== */
.certifications-section {
  padding: 0 16px 24px;
}

.cert-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 16px 0;
  text-align: center;
}

.cert-badges {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.cert-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 16px;
  border-radius: 14px;
  min-width: 80px;
}

.cert-icon {
  font-size: 32px;
}

.cert-name {
  font-size: 11px;
  font-weight: 700;
  color: var(--coffee-dark);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== BREWING ===== */
.brewing-section {
  background: white;
  padding: 32px 24px;
  margin: 0 16px 16px;
  border-radius: 20px;
}

.brew-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 24px;
}

.brew-method-card {
  background: #f8f8f8;
  padding: 18px 14px;
  border-radius: 16px;
  text-align: center;
}

.method-icon-circle {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.method-emoji {
  font-size: 28px;
}

.method-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--coffee-dark);
  margin: 0 0 12px 0;
}

.method-specs {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.spec-label {
  font-size: 11px;
  color: var(--text-light);
  font-weight: 600;
}

.spec-value {
  font-size: 12px;
  color: var(--coffee-dark);
  font-weight: 700;
}

/* ===== IMPACT ===== */
.impact-section {
  background: white;
  padding: 32px 24px;
  margin: 0 16px 16px;
  border-radius: 20px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.metric-card {
  background: #f8f8f8;
  padding: 24px 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.metric-icon {
  font-size: 40px;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--coffee-dark);
  line-height: 1;
}

.metric-label {
  font-size: 12px;
  color: var(--text-light);
  font-weight: 600;
}

/* ===== PURCHASE ===== */
.purchase-section {
  padding: 0 16px 24px;
}

.purchase-card {
  background: linear-gradient(135deg, var(--coffee-dark) 0%, var(--coffee-medium) 100%);
  padding: 28px 24px;
  border-radius: 20px;
  color: white;
}

.purchase-info {
  margin-bottom: 24px;
  text-align: center;
}

.purchase-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.purchase-desc {
  font-size: 15px;
  margin: 0 0 20px 0;
  opacity: 0.95;
}

.price-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.price-label {
  font-size: 13px;
  opacity: 0.9;
}

.price-amount {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
}

.purchase-actions {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
}

.purchase-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.purchase-btn:active {
  transform: scale(0.98);
}

.purchase-btn.primary {
  background: white;
  color: var(--coffee-dark);
}

.purchase-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.purchase-btn ion-icon {
  font-size: 22px;
}

/* ===== SPACER ===== */
.bottom-spacer {
  height: 30px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 400px) {
  .brew-methods {
    grid-template-columns: 1fr;
  }

  .flavor-wheel {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
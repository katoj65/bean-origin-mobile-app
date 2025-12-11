<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>20 Card Designs</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="cards-showcase">
        <h2 class="showcase-title">Bean Origin Card Collection</h2>
        <p class="showcase-subtitle">20 Unique Card Designs</p>

        <!-- Card 1: Classic Vertical Card -->
        <div class="card-section">
          <h3 class="card-label">1. Classic Vertical Card</h3>
          <div class="card-1">
            <div class="card-1-image">
              <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" alt="Cappuccino" />
              <span class="card-1-badge">Popular</span>
            </div>
            <div class="card-1-content">
              <h3 class="card-1-name">Cappuccino</h3>
              <p class="card-1-desc">Rich espresso with steamed milk</p>
              <div class="card-1-footer">
                <span class="card-1-price">Shs. 15,000</span>
                <button class="card-1-btn">Add</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Wide Horizontal Card -->
        <div class="card-section">
          <h3 class="card-label">2. Wide Horizontal Card</h3>
          <div class="card-2">
            <img src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400" alt="Cold Brew" class="card-2-image" />
            <div class="card-2-content">
              <span class="card-2-badge">New</span>
              <h3 class="card-2-name">Cold Brew</h3>
              <p class="card-2-desc">Smooth cold-steeped coffee</p>
              <div class="card-2-footer">
                <span class="card-2-price">Shs. 16,000</span>
                <button class="card-2-btn">Order</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3: Minimal Tile Card -->
        <div class="card-section">
          <h3 class="card-label">3. Minimal Tile Card</h3>
          <div class="card-3">
            <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" alt="Latte" class="card-3-image" />
            <div class="card-3-info">
              <div class="card-3-text">
                <h3 class="card-3-name">Latte</h3>
                <p class="card-3-price">Shs. 18,000</p>
              </div>
              <button class="card-3-btn">+</button>
            </div>
          </div>
        </div>

        <!-- Card 4: Image-Dominant Card -->
        <div class="card-section">
          <h3 class="card-label">4. Image-Dominant Card</h3>
          <div class="card-4">
            <div class="card-4-image-wrapper">
              <img src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400" alt="Espresso" class="card-4-image" />
              <div class="card-4-overlay">
                <span class="card-4-badge">Specialty</span>
              </div>
            </div>
            <div class="card-4-content">
              <h3 class="card-4-name">Double Espresso</h3>
              <p class="card-4-desc">Bold & intense</p>
              <div class="card-4-footer">
                <span class="card-4-price">Shs. 12,500</span>
                <button class="card-4-btn">View</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 5: Floating Glass-Effect Card -->
        <div class="card-section">
          <h3 class="card-label">5. Floating Glass-Effect Card</h3>
          <div class="card-5">
            <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400" alt="Ethiopian Beans" class="card-5-image" />
            <div class="card-5-glass">
              <h3 class="card-5-name">Ethiopian Yirgacheffe</h3>
              <p class="card-5-desc">Floral & bright acidity</p>
              <div class="card-5-footer">
                <span class="card-5-price">Shs. 65,000</span>
                <button class="card-5-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 6: Premium Gold-Accent Card -->
        <div class="card-section">
          <h3 class="card-label">6. Premium Gold-Accent Card</h3>
          <div class="card-6">
            <div class="card-6-gold-bar"></div>
            <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" alt="Colombian Beans" class="card-6-image" />
            <div class="card-6-content">
              <span class="card-6-badge">Premium</span>
              <h3 class="card-6-name">Colombian Supremo</h3>
              <p class="card-6-desc">Balanced caramel notes</p>
              <div class="card-6-footer">
                <span class="card-6-price">Shs. 55,000</span>
                <button class="card-6-btn">Order</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 7: Soft Shadow Rounded Card -->
        <div class="card-section">
          <h3 class="card-label">7. Soft Shadow Rounded Card</h3>
          <div class="card-7">
            <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400" alt="Croissant" class="card-7-image" />
            <div class="card-7-content">
              <h3 class="card-7-name">Butter Croissant</h3>
              <p class="card-7-desc">Flaky & buttery layers</p>
              <div class="card-7-meta">
                <span class="card-7-badge">Fresh Daily</span>
                <span class="card-7-price">Shs. 12,500</span>
              </div>
              <button class="card-7-btn">Add to Order</button>
            </div>
          </div>
        </div>

        <!-- Card 8: Border-Only Minimal Card -->
        <div class="card-section">
          <h3 class="card-label">8. Border-Only Minimal Card</h3>
          <div class="card-8">
            <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400" alt="Americano" class="card-8-image" />
            <div class="card-8-info">
              <h3 class="card-8-name">Americano</h3>
              <p class="card-8-desc">Espresso with hot water</p>
            </div>
            <div class="card-8-footer">
              <span class="card-8-price">Shs. 14,000</span>
              <button class="card-8-btn">+</button>
            </div>
          </div>
        </div>

        <!-- Card 9: Gradient Background Card -->
        <div class="card-section">
          <h3 class="card-label">9. Gradient Background Card</h3>
          <div class="card-9">
            <div class="card-9-content">
              <span class="card-9-badge">Seasonal</span>
              <img src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400" alt="Pumpkin Spice" class="card-9-image" />
              <h3 class="card-9-name">Pumpkin Spice Latte</h3>
              <p class="card-9-desc">Warm spices, perfectly cozy</p>
              <div class="card-9-footer">
                <span class="card-9-price">Shs. 20,000</span>
                <button class="card-9-btn">Order Now</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 10: Split-Image Layout Card -->
        <div class="card-section">
          <h3 class="card-label">10. Split-Image Layout Card</h3>
          <div class="card-10">
            <div class="card-10-left">
              <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400" alt="Flat White" class="card-10-image" />
            </div>
            <div class="card-10-right">
              <h3 class="card-10-name">Flat White</h3>
              <p class="card-10-desc">Velvety microfoam perfection</p>
              <span class="card-10-badge">Barista Choice</span>
              <div class="card-10-footer">
                <span class="card-10-price">Shs. 16,500</span>
                <button class="card-10-btn">Add</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 11: Pill-Shaped Modern Card -->
        <div class="card-section">
          <h3 class="card-label">11. Pill-Shaped Modern Card</h3>
          <div class="card-11">
            <img src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400" alt="Iced Latte" class="card-11-image" />
            <div class="card-11-content">
              <h3 class="card-11-name">Iced Latte</h3>
              <p class="card-11-desc">Chilled espresso with cold milk</p>
              <div class="card-11-footer">
                <span class="card-11-badge">Summer Special</span>
                <span class="card-11-price">Shs. 17,000</span>
                <button class="card-11-btn">Add</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 12: Compact List-Style Card -->
        <div class="card-section">
          <h3 class="card-label">12. Compact List-Style Card</h3>
          <div class="card-12">
            <img src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400" alt="Mug" class="card-12-image" />
            <div class="card-12-info">
              <h3 class="card-12-name">Ceramic Coffee Mug</h3>
              <p class="card-12-desc">Hand-crafted, 12oz</p>
              <span class="card-12-price">Shs. 35,000</span>
            </div>
            <button class="card-12-btn">Buy</button>
          </div>
        </div>

        <!-- Card 13: Stacked Layered Card -->
        <div class="card-section">
          <h3 class="card-label">13. Stacked Layered Card</h3>
          <div class="card-13">
            <div class="card-13-layer-1"></div>
            <div class="card-13-layer-2"></div>
            <div class="card-13-main">
              <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" alt="Mocha" class="card-13-image" />
              <div class="card-13-content">
                <h3 class="card-13-name">Mocha</h3>
                <p class="card-13-desc">Chocolate & espresso blend</p>
                <div class="card-13-footer">
                  <span class="card-13-price">Shs. 19,000</span>
                  <button class="card-13-btn">Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 14: Side-Highlight Color Bar Card -->
        <div class="card-section">
          <h3 class="card-label">14. Side-Highlight Color Bar Card</h3>
          <div class="card-14">
            <div class="card-14-bar"></div>
            <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" alt="Macchiato" class="card-14-image" />
            <div class="card-14-content">
              <span class="card-14-badge">Hot</span>
              <h3 class="card-14-name">Caramel Macchiato</h3>
              <p class="card-14-desc">Espresso marked with foam & caramel</p>
              <div class="card-14-footer">
                <span class="card-14-price">Shs. 18,500</span>
                <button class="card-14-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 15: Elegant Minimal Typography Card -->
        <div class="card-section">
          <h3 class="card-label">15. Elegant Minimal Typography Card</h3>
          <div class="card-15">
            <div class="card-15-number">01</div>
            <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400" alt="Kenya AA" class="card-15-image" />
            <div class="card-15-content">
              <h3 class="card-15-name">Kenya AA</h3>
              <p class="card-15-desc">Wine-like, fruity complexity</p>
              <span class="card-15-roast">Dark Roast</span>
              <div class="card-15-footer">
                <span class="card-15-price">70,000</span>
                <button class="card-15-btn">→</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 16: Dark Mode Premium Card -->
        <div class="card-section">
          <h3 class="card-label">16. Dark Mode Premium Card</h3>
          <div class="card-16">
            <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400" alt="Brazilian Dark" class="card-16-image" />
            <div class="card-16-content">
              <span class="card-16-badge">Signature Blend</span>
              <h3 class="card-16-name">Brazilian Dark Roast</h3>
              <p class="card-16-desc">Bold chocolatey richness</p>
              <div class="card-16-footer">
                <span class="card-16-price">Shs. 50,000</span>
                <button class="card-16-btn">Order</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 17: Animated Hover/Tap Effect Card -->
        <div class="card-section">
          <h3 class="card-label">17. Animated Hover/Tap Effect Card</h3>
          <div class="card-17">
            <div class="card-17-shine"></div>
            <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400" alt="Cortado" class="card-17-image" />
            <div class="card-17-content">
              <h3 class="card-17-name">Cortado</h3>
              <p class="card-17-desc">Equal parts espresso & steamed milk</p>
              <div class="card-17-footer">
                <span class="card-17-badge">Trending</span>
                <span class="card-17-price">Shs. 15,500</span>
              </div>
            </div>
            <button class="card-17-btn">Add to Cart</button>
          </div>
        </div>

        <!-- Card 18: Curved-Edge Artistic Card -->
        <div class="card-section">
          <h3 class="card-label">18. Curved-Edge Artistic Card</h3>
          <div class="card-18">
            <div class="card-18-curve"></div>
            <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400" alt="Affogato" class="card-18-image" />
            <div class="card-18-content">
              <h3 class="card-18-name">Affogato</h3>
              <p class="card-18-desc">Espresso over vanilla ice cream</p>
              <span class="card-18-badge">Dessert</span>
              <div class="card-18-footer">
                <span class="card-18-price">Shs. 22,000</span>
                <button class="card-18-btn">Order</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 19: Icon-Enhanced Functional Card -->
        <div class="card-section">
          <h3 class="card-label">19. Icon-Enhanced Functional Card</h3>
          <div class="card-19">
            <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" alt="Costa Rican" class="card-19-image" />
            <div class="card-19-content">
              <div class="card-19-header">
                <h3 class="card-19-name">Costa Rican Tarrazu</h3>
                <span class="card-19-icon">☕</span>
              </div>
              <p class="card-19-desc">Bright citrus & honey notes</p>
              <div class="card-19-features">
                <span class="card-19-feature">🌿 Organic</span>
                <span class="card-19-feature">🔥 Medium</span>
              </div>
              <div class="card-19-footer">
                <span class="card-19-price">Shs. 60,000</span>
                <button class="card-19-btn">Buy Now</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 20: Badge-Focused Promotional Card -->
        <div class="card-section">
          <h3 class="card-label">20. Badge-Focused Promotional Card</h3>
          <div class="card-20">
            <div class="card-20-badges">
              <span class="card-20-badge new">NEW</span>
              <span class="card-20-badge discount">20% OFF</span>
            </div>
            <img src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400" alt="Holiday Blend" class="card-20-image" />
            <div class="card-20-content">
              <h3 class="card-20-name">Holiday Blend 2024</h3>
              <p class="card-20-desc">Limited edition festive roast</p>
              <div class="card-20-pricing">
                <span class="card-20-old-price">Shs. 75,000</span>
                <span class="card-20-new-price">Shs. 60,000</span>
              </div>
              <button class="card-20-btn">Grab Deal</button>
            </div>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>

<style scoped>
/* ===== BASE ===== */
.cards-showcase {
  padding: 20px;
  background: #faf8f5;
  min-height: 100vh;
}

.showcase-title {
  font-size: 28px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  text-align: center;
}

.showcase-subtitle {
  font-size: 15px;
  font-weight: 600;
  color: #8a8a8a;
  margin: 0 0 32px 0;
  text-align: center;
}

.card-section {
  margin-bottom: 40px;
}

.card-label {
  font-size: 14px;
  font-weight: 800;
  color: #6b4423;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== CARD 1: CLASSIC VERTICAL ===== */
.card-1 {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.card-1-image {
  position: relative;
  width: 100%;
  height: 200px;
}

.card-1-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-1-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #ff9800, #ff5722);
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
}

.card-1-content {
  padding: 16px;
}

.card-1-name {
  font-size: 18px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-1-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 14px 0;
}

.card-1-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-1-price {
  font-size: 18px;
  font-weight: 900;
  color: #6b4423;
}

.card-1-btn {
  padding: 10px 20px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 2: WIDE HORIZONTAL ===== */
.card-2 {
  display: flex;
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.card-2-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  flex-shrink: 0;
}

.card-2-content {
  flex: 1;
  padding: 14px;
  display: flex;
  flex-direction: column;
}

.card-2-badge {
  align-self: flex-start;
  padding: 4px 10px;
  background: #10b981;
  color: white;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
  margin-bottom: 8px;
}

.card-2-name {
  font-size: 16px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.card-2-desc {
  font-size: 12px;
  color: #8a8a8a;
  margin: 0 0 auto 0;
}

.card-2-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.card-2-price {
  font-size: 15px;
  font-weight: 900;
  color: #6b4423;
}

.card-2-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
}

/* ===== CARD 3: MINIMAL TILE ===== */
.card-3 {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.card-3-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.card-3-info {
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
}

.card-3-text {
  flex: 1;
}

.card-3-name {
  font-size: 15px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.card-3-price {
  font-size: 14px;
  font-weight: 700;
  color: #6b4423;
  margin: 0;
}

.card-3-btn {
  width: 36px;
  height: 36px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== CARD 4: IMAGE-DOMINANT ===== */
.card-4 {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.card-4-image-wrapper {
  position: relative;
  height: 250px;
}

.card-4-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-4-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3));
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 12px;
}

.card-4-badge {
  padding: 6px 12px;
  background: rgba(255,255,255,0.95);
  color: #6b4423;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
}

.card-4-content {
  padding: 16px;
}

.card-4-name {
  font-size: 17px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-4-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 12px 0;
}

.card-4-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-4-price {
  font-size: 18px;
  font-weight: 900;
  color: #6b4423;
}

.card-4-btn {
  padding: 10px 18px;
  background: transparent;
  color: #6b4423;
  border: 2px solid #6b4423;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 5: FLOATING GLASS-EFFECT ===== */
.card-5 {
  position: relative;
  height: 280px;
  border-radius: 24px;
  overflow: hidden;
}

.card-5-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-5-glass {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px 24px 0 0;
}

.card-5-name {
  font-size: 17px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-5-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 12px 0;
}

.card-5-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-5-price {
  font-size: 18px;
  font-weight: 900;
  color: #6b4423;
}

.card-5-btn {
  padding: 10px 18px;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 6: PREMIUM GOLD-ACCENT ===== */
.card-6 {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0,0,0,0.12);
}

.card-6-gold-bar {
  height: 4px;
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.card-6-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-6-content {
  padding: 16px;
}

.card-6-badge {
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 10px;
}

.card-6-name {
  font-size: 17px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-6-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 12px 0;
}

.card-6-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-6-price {
  font-size: 18px;
  font-weight: 900;
  color: #6b4423;
}

.card-6-btn {
  padding: 10px 18px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 7: SOFT SHADOW ROUNDED ===== */
.card-7 {
  background: white;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(107,68,35,0.15);
}

.card-7-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-7-content {
  padding: 18px;
}

.card-7-name {
  font-size: 17px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-7-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 12px 0;
}

.card-7-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-7-badge {
  padding: 4px 10px;
  background: #fef3c7;
  color: #92400e;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 800;
}

.card-7-price {
  font-size: 17px;
  font-weight: 900;
  color: #6b4423;
}

.card-7-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 15px;
}

/* ===== CARD 8: BORDER-ONLY MINIMAL ===== */
.card-8 {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: transparent;
  border: 2px solid #e8e4df;
  border-radius: 16px;
}

.card-8-image {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  object-fit: cover;
}

.card-8-info {
  flex: 1;
}

.card-8-name {
  font-size: 15px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.card-8-desc {
  font-size: 12px;
  color: #8a8a8a;
  margin: 0;
}

.card-8-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.card-8-price {
  font-size: 14px;
  font-weight: 900;
  color: #6b4423;
}

.card-8-btn {
  width: 32px;
  height: 32px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
}

/* ===== CARD 9: GRADIENT BACKGROUND ===== */
.card-9 {
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(251,146,60,0.3);
}

.card-9-content {
  padding: 20px;
}

.card-9-badge {
  display: inline-block;
  padding: 6px 12px;
  background: white;
  color: #ea580c;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 12px;
}

.card-9-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 14px;
}

.card-9-name {
  font-size: 18px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-9-desc {
  font-size: 13px;
  color: #78350f;
  margin: 0 0 14px 0;
}

.card-9-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-9-price {
  font-size: 18px;
  font-weight: 900;
  color: #92400e;
}

.card-9-btn {
  padding: 10px 18px;
  background: white;
  color: #ea580c;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 10: SPLIT-IMAGE LAYOUT ===== */
.card-10 {
  display: flex;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  height: 180px;
}

.card-10-left {
  width: 40%;
}

.card-10-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-10-right {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.card-10-name {
  font-size: 16px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-10-desc {
  font-size: 12px;
  color: #8a8a8a;
  margin: 0 0 10px 0;
}

.card-10-badge {
  display: inline-block;
  padding: 4px 10px;
  background: #ede9fe;
  color: #6b21a8;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
  margin-bottom: auto;
}

.card-10-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-10-price {
  font-size: 16px;
  font-weight: 900;
  color: #6b4423;
}

.card-10-btn {
  padding: 8px 16px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
}

/* ===== CARD 11: PILL-SHAPED MODERN ===== */
.card-11 {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.card-11-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.card-11-content {
  flex: 1;
}

.card-11-name {
  font-size: 15px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.card-11-desc {
  font-size: 12px;
  color: #8a8a8a;
  margin: 0 0 8px 0;
}

.card-11-footer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-11-badge {
  padding: 3px 8px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 6px;
  font-size: 9px;
  font-weight: 800;
}

.card-11-price {
  font-size: 14px;
  font-weight: 900;
  color: #6b4423;
}

.card-11-btn {
  padding: 8px 16px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
}

/* ===== CARD 12: COMPACT LIST-STYLE ===== */
.card-12 {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.card-12-image {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
}

.card-12-info {
  flex: 1;
}

.card-12-name {
  font-size: 14px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.card-12-desc {
  font-size: 11px;
  color: #8a8a8a;
  margin: 0 0 4px 0;
}

.card-12-price {
  font-size: 13px;
  font-weight: 900;
  color: #6b4423;
}

.card-12-btn {
  padding: 8px 14px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 12px;
}

/* ===== CARD 13: STACKED LAYERED ===== */
.card-13 {
  position: relative;
  margin-top: 12px;
}

.card-13-layer-1,
.card-13-layer-2 {
  position: absolute;
  left: 8px;
  right: 8px;
  height: 8px;
  background: #f5f3f0;
  border-radius: 20px 20px 0 0;
}

.card-13-layer-1 {
  top: -8px;
}

.card-13-layer-2 {
  top: -4px;
  background: #ede9e5;
}

.card-13-main {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.card-13-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-13-content {
  padding: 16px;
}

.card-13-name {
  font-size: 17px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-13-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 12px 0;
}

.card-13-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-13-price {
  font-size: 18px;
  font-weight: 900;
  color: #6b4423;
}

.card-13-btn {
  padding: 10px 18px;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 14: SIDE-HIGHLIGHT COLOR BAR ===== */
.card-14 {
  position: relative;
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  padding-left: 8px;
}

.card-14-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: linear-gradient(180deg, #ef4444, #dc2626);
}

.card-14-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-bottom: 14px;
}

.card-14-content {
  padding: 0 16px 16px 8px;
}

.card-14-badge {
  display: inline-block;
  padding: 4px 10px;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
  margin-bottom: 8px;
}

.card-14-name {
  font-size: 16px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-14-desc {
  font-size: 12px;
  color: #8a8a8a;
  margin: 0 0 12px 0;
}

.card-14-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-14-price {
  font-size: 16px;
  font-weight: 900;
  color: #6b4423;
}

.card-14-btn {
  padding: 8px 16px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
}

/* ===== CARD 15: ELEGANT MINIMAL TYPOGRAPHY ===== */
.card-15 {
  position: relative;
  background: #f9fafb;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.card-15-number {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 48px;
  font-weight: 900;
  color: rgba(107,68,35,0.1);
  line-height: 1;
}

.card-15-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 14px;
}

.card-15-name {
  font-size: 20px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
}

.card-15-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 8px 0;
}

.card-15-roast {
  display: inline-block;
  padding: 4px 10px;
  background: white;
  color: #6b4423;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 14px;
}

.card-15-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-15-price {
  font-size: 24px;
  font-weight: 900;
  color: #6b4423;
  letter-spacing: -0.5px;
}

.card-15-price::before {
  content: 'Shs. ';
  font-size: 14px;
  font-weight: 700;
}

.card-15-btn {
  width: 44px;
  height: 44px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 300;
}

/* ===== CARD 16: DARK MODE PREMIUM ===== */
.card-16 {
  background: linear-gradient(135deg, #1f2937, #111827);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.card-16-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  opacity: 0.9;
}

.card-16-content {
  padding: 18px;
}

.card-16-badge {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(251,191,36,0.2);
  color: #fbbf24;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 10px;
}

.card-16-name {
  font-size: 17px;
  font-weight: 900;
  color: white;
  margin: 0 0 6px 0;
}

.card-16-desc {
  font-size: 13px;
  color: #d1d5db;
  margin: 0 0 14px 0;
}

.card-16-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-16-price {
  font-size: 18px;
  font-weight: 900;
  color: #fbbf24;
}

.card-16-btn {
  padding: 10px 18px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1f2937;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 17: ANIMATED HOVER/TAP EFFECT ===== */
.card-17 {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.card-17:active {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.15);
}

.card-17-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
  pointer-events: none;
}

.card-17:active .card-17-shine {
  left: 100%;
}

.card-17-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-17-content {
  padding: 16px;
}

.card-17-name {
  font-size: 17px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-17-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 12px 0;
}

.card-17-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-17-badge {
  padding: 4px 10px;
  background: #fef3c7;
  color: #92400e;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
}

.card-17-price {
  font-size: 17px;
  font-weight: 900;
  color: #6b4423;
}

.card-17-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 18: CURVED-EDGE ARTISTIC ===== */
.card-18 {
  position: relative;
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding-bottom: 20px;
}

.card-18-curve {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: white;
  border-radius: 0 0 50% 50%;
  z-index: 2;
}

.card-18-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-18-content {
  padding: 0 20px;
  margin-top: -30px;
  position: relative;
  z-index: 3;
}

.card-18-name {
  font-size: 18px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-18-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 10px 0;
}

.card-18-badge {
  display: inline-block;
  padding: 6px 12px;
  background: #fce7f3;
  color: #be185d;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 12px;
}

.card-18-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-18-price {
  font-size: 18px;
  font-weight: 900;
  color: #6b4423;
}

.card-18-btn {
  padding: 10px 20px;
  background: #6b4423;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 19: ICON-ENHANCED FUNCTIONAL ===== */
.card-19 {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.card-19-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.card-19-content {
  padding: 16px;
}

.card-19-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-19-name {
  font-size: 16px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0;
}

.card-19-icon {
  font-size: 20px;
}

.card-19-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 10px 0;
}

.card-19-features {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.card-19-feature {
  padding: 4px 10px;
  background: #f5f3f0;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #6b4423;
}

.card-19-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-19-price {
  font-size: 18px;
  font-weight: 900;
  color: #6b4423;
}

.card-19-btn {
  padding: 10px 18px;
  background: linear-gradient(135deg, #6b4423, #4a2f18);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
}

/* ===== CARD 20: BADGE-FOCUSED PROMOTIONAL ===== */
.card-20 {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0,0,0,0.12);
}

.card-20-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 10;
}

.card-20-badge {
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-20-badge.new {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.card-20-badge.discount {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.card-20-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-20-content {
  padding: 18px;
}

.card-20-name {
  font-size: 18px;
  font-weight: 900;
  color: #1a1a1a;
  margin: 0 0 6px 0;
}

.card-20-desc {
  font-size: 13px;
  color: #8a8a8a;
  margin: 0 0 12px 0;
}

.card-20-pricing {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.card-20-old-price {
  font-size: 15px;
  font-weight: 700;
  color: #d1d5db;
  text-decoration: line-through;
}

.card-20-new-price {
  font-size: 20px;
  font-weight: 900;
  color: #ef4444;
}

.card-20-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 900;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
  .cards-showcase {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
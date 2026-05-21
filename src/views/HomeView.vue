<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import HeroCanvas from '../components/HeroCanvas.vue'

const { t } = useI18n()
const router = useRouter()
const mounted = ref(false)

onMounted(() => {
  requestAnimationFrame(() => { mounted.value = true })
})
</script>

<template>
  <section class="hero">
    <HeroCanvas />

    <!-- floating stat badges -->
    <div class="hero-badges" :class="{ visible: mounted }">
      <div class="badge">
        <span class="badge-icon">🏆</span>
        <span class="badge-text">国赛二等奖</span>
      </div>
      <div class="badge">
        <span class="badge-icon">🎓</span>
        <span class="badge-text">海南师范大学</span>
      </div>
      <div class="badge">
        <span class="badge-icon">⚡</span>
        <span class="badge-text">全栈开发</span>
      </div>
    </div>

    <div class="hero-content container" :class="{ visible: mounted }">
      <p class="hero-greeting">{{ t('home.greeting') }}</p>
      <div class="hero-name-wrapper">
        <h1 class="hero-name">{{ t('home.name') }}</h1>
        <div class="hero-glow"></div>
      </div>
      <p class="hero-tagline">{{ t('home.tagline') }}</p>
      <p class="hero-desc">{{ t('home.description') }}</p>
      <div class="hero-cta">
        <button class="btn btn-primary" @click="router.push('/services')">
          {{ t('home.cta_view_work') }}
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="btn btn-secondary" @click="router.push('/contact')">
          {{ t('home.cta_contact') }}
        </button>
      </div>
    </div>

    <div class="hero-scroll">
      <span class="scroll-text">Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ---- badges ---- */
.hero-badges {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}
.hero-badges .badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  padding: 10px 20px;
  box-shadow: 0 4px 20px var(--color-card-shadow);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-badges.visible .badge {
  opacity: 1;
  transform: translateY(0);
}
.hero-badges .badge:nth-child(1) { top: 22%; left: 6%;  transition-delay: 0.3s; }
.hero-badges .badge:nth-child(2) { top: 18%; right: 7%; transition-delay: 0.5s; }
.hero-badges .badge:nth-child(3) { bottom: 22%; left: 12%; transition-delay: 0.7s; }

.badge-icon { font-size: 1.2rem; }
.badge-text {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
}

/* ---- content ---- */
.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  padding: var(--space-3xl) 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
}
.hero-content.visible { opacity: 1; transform: translateY(0); }

.hero-greeting {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
  font-weight: 400;
}

.hero-name-wrapper {
  position: relative;
  display: inline-block;
}
.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(ellipse, var(--color-accent-light) 0%, transparent 70%);
  pointer-events: none;
  border-radius: 50%;
  filter: blur(40px);
  z-index: -1;
}

.hero-name {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: var(--space-md);
  background: linear-gradient(135deg, var(--color-accent) 20%, #f0a050 50%, #e06828 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  font-size: var(--font-size-2xl);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
}

.hero-desc {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 540px;
  margin: 0 auto var(--space-xl);
  line-height: 1.7;
}

.hero-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: var(--font-size-base);
  font-weight: 600;
  border-radius: 50px;
  transition: all var(--transition-fast);
}

.btn-primary {
  background: var(--color-accent);
  color: #fff;
}
.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(224, 104, 40, 0.35);
}
.btn-primary:hover .btn-arrow { transform: translateX(4px); }
.btn-arrow {
  width: 16px; height: 16px;
  transition: transform var(--transition-fast);
}

.btn-secondary {
  color: var(--color-text);
  border: 1.5px solid var(--color-border);
  background: transparent;
}
.btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(224, 104, 40, 0.12);
}

/* ---- scroll indicator ---- */
.hero-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
}
.scroll-text {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--color-text-secondary), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
}

@media (max-width: 768px) {
  .hero-badges { display: none; }
  .hero-tagline { font-size: var(--font-size-xl); }
  .btn { padding: 12px 24px; }
}
</style>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ScrollReveal from '../components/ScrollReveal.vue'
import zhCN from '../i18n/zh-CN.json'
import en from '../i18n/en.json'

const { t, locale } = useI18n()

const locales = { 'zh-CN': zhCN, 'zh': zhCN, 'en': en }

const serviceItems = computed(() => {
  const msg = locales[locale.value] || zhCN
  return msg.services?.items || []
})

const iconPaths = [
  'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
  'M13 10V3L4 14h7v7l9-11h-7z',
  'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
]

const accentColors = [
  'var(--color-accent)',
  '#f0a050',
  '#d97706',
  '#ea580c',
  '#f09050',
  '#c2410c'
]
</script>

<template>
  <div class="services-page">
    <section class="section">
      <div class="container">
        <p class="section-label">{{ t('services.label') }}</p>
        <h2 class="section-title">{{ t('services.title') }}</h2>
        <p class="section-description">{{ t('services.description') }}</p>

        <div class="services-grid">
          <ScrollReveal
            v-for="(item, idx) in serviceItems"
            :key="idx"
            :delay="idx * 0.08"
          >
            <div class="service-card" :style="{ '--card-accent': accentColors[idx] }">
              <div class="card-top-bar"></div>
              <div class="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="iconPaths[idx]" />
                </svg>
              </div>
              <h3 class="service-title">{{ item.title }}</h3>
              <p class="service-desc">{{ item.description }}</p>
              <div class="card-hover-bg"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-page { padding-top: var(--nav-height); }

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-top: var(--space-2xl);
}

.service-card {
  position: relative;
  padding: var(--space-xl);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  isolation: isolate;
}
.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 100% 0%, var(--card-accent) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.35s ease;
  z-index: -1;
  pointer-events: none;
}
.service-card:hover::before { opacity: 0.03; }

.card-top-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--card-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 0 0 3px 0;
}
.service-card:hover .card-top-bar { transform: scaleX(1); }

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px var(--color-card-shadow);
  border-color: var(--card-accent);
}

.service-icon {
  width: 52px; height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent-light);
  border-radius: var(--radius-md);
  color: var(--card-accent);
  margin-bottom: var(--space-lg);
  transition: all 0.35s ease;
}
.service-card:hover .service-icon {
  transform: scale(1.1);
  background: var(--card-accent);
  color: #fff;
}

.service-icon svg { width: 24px; height: 24px; }

.service-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--space-sm);
  transition: color var(--transition-fast);
}
.service-card:hover .service-title { color: var(--card-accent); }

.service-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .services-grid { grid-template-columns: 1fr; }
  .service-card { padding: var(--space-lg); }
}
</style>

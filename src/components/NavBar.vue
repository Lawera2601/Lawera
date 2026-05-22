<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ThemeToggle from './ThemeToggle.vue'
import LangSwitch from './LangSwitch.vue'
import { useScroll } from '../composables/useScroll.js'

const NAV_ITEMS = [
  { path: '/', key: 'nav.home' },
  { path: '/about', key: 'nav.about' },
  { path: '/services', key: 'nav.services' },
  { path: '/contact', key: 'nav.contact' }
]

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const { scrollY } = useScroll()

const scrolled = computed(() => scrollY.value > 50)
const mobileOpen = ref(false)

function navigate(path) {
  mobileOpen.value = false
  router.push(path)
}

function isActive(path) {
  return route.path === path
}
</script>

<template>
  <nav class="navbar" :class="{ scrolled }">
    <div class="nav-inner container">
      <router-link to="/" class="nav-logo" @click="mobileOpen = false">
        <span class="logo-text">Lawera</span>
      </router-link>

      <div class="nav-links" :class="{ open: mobileOpen }">
        <button
          v-for="item in NAV_ITEMS"
          :key="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
          @click="navigate(item.path)"
        >
          {{ t(item.key) }}
          <span v-if="isActive(item.path)" class="nav-indicator"></span>
        </button>
      </div>

      <div class="nav-actions">
        <LangSwitch />
        <ThemeToggle />
        <button
          class="menu-btn"
          :class="{ open: mobileOpen }"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--nav-height);
  transition: all var(--transition-base);
}
.navbar.scrolled {
  background: var(--color-nav-bg);
  box-shadow: 0 1px 0 var(--color-border);
  height: 60px;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav-logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
  transition: color var(--transition-fast);
  z-index: 10;
}
.nav-logo:hover { color: var(--color-accent); }

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-link {
  position: relative;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  cursor: pointer;
}
.nav-link:hover {
  color: var(--color-text);
  background: var(--color-accent-light);
}
.nav-link.active {
  color: var(--color-accent);
  background: var(--color-accent-light);
  font-weight: 600;
}
.nav-indicator {
  position: absolute;
  bottom: -2px; left: 50%;
  transform: translateX(-50%);
  width: 16px; height: 2px;
  background: var(--color-accent);
  border-radius: 2px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

/* hamburger */
.menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px; height: 40px;
  padding: 8px;
  border-radius: var(--radius-sm);
  z-index: 10;
}
.menu-btn span {
  display: block;
  width: 100%; height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all var(--transition-fast);
}
.menu-btn.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.menu-btn.open span:nth-child(2) { opacity: 0; }
.menu-btn.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-md);
    background: var(--color-nav-bg);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-base);
  }
  .nav-links.open { opacity: 1; pointer-events: auto; }
  .nav-link { font-size: var(--font-size-2xl); padding: var(--space-md) var(--space-xl); }
  .menu-btn { display: flex; }
}
</style>

<script setup>
import { computed } from 'vue'
import { useScroll } from '../composables/useScroll.js'

const { scrollY } = useScroll()

const visible = computed(() => scrollY.value > 350)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <transition name="btt">
    <button
      v-if="visible"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  </transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 90;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  box-shadow: 0 4px 20px rgba(224, 104, 40, 0.3);
  transition: all var(--transition-fast);
  cursor: pointer;
}
.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(224, 104, 40, 0.4);
  background: var(--color-accent-hover);
}
.back-to-top svg { width: 22px; height: 22px; }

.btt-enter-active { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.btt-leave-active { transition: all 0.25s ease-in; }
.btt-enter-from { opacity: 0; transform: translateY(16px) scale(0.8); }
.btt-leave-to { opacity: 0; transform: translateY(8px) scale(0.8); }
</style>

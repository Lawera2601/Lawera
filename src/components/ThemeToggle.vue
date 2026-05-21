<script setup>
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
    :title="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <svg
      v-if="theme === 'light'"
      class="toggle-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
    <svg
      v-else
      class="toggle-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color var(--transition-fast);
}

.theme-toggle:hover {
  background: var(--color-accent-light);
}

.toggle-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text);
  transition: transform var(--transition-base);
}

.theme-toggle:hover .toggle-icon {
  transform: rotate(15deg);
}
</style>

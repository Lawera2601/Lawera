<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <span class="footer-logo">Lawera</span>
        <p class="footer-tagline">{{ t('footer.designed_by') }}</p>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-footer-bg);
  border-top: 1px solid var(--color-border);
  padding: var(--space-xl) 0 var(--space-lg);
  transition: background-color var(--transition-slow);
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.footer-logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text);
}
.footer-tagline {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.footer-bottom {
  display: flex;
  justify-content: center;
}
.footer-copy {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>

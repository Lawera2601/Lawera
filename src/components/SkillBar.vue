<script setup>
defineProps({
  name: { type: String, required: true },
  level: { type: Number, required: true }
})
</script>

<template>
  <div class="skill-bar">
    <div class="skill-header">
      <span class="skill-name">{{ name }}</span>
      <span class="skill-level">{{ level }}%</span>
    </div>
    <div class="skill-track">
      <div class="skill-fill" :style="{ width: level + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.skill-bar {
  margin-bottom: var(--space-lg);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}

.skill-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
}

.skill-level {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.skill-track {
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), #f0a050);
  border-radius: 3px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

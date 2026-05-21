<script setup>
import { useI18n } from 'vue-i18n'
import SkillBar from '../components/SkillBar.vue'
import ScrollReveal from '../components/ScrollReveal.vue'

const { t } = useI18n()

const skills = [
  { name: 'HTML / CSS / JavaScript', level: 90 },
  { name: 'Java', level: 85 },
  { name: 'Spring Boot / MyBatis', level: 80 },
  { name: 'React / Vue', level: 78 },
  { name: 'MySQL', level: 82 },
  { name: 'Python', level: 75 },
  { name: 'Node.js / Express', level: 78 },
  { name: 'Git / Dev Tools', level: 85 }
]

const stats = [
  { value: '2024', label: '入学年份', icon: '🎓' },
  { value: '国二', label: '计算机设计大赛', icon: '🏆' },
  { value: 'v1.3', label: '全栈项目迭代', icon: '🚀' }
]
</script>

<template>
  <div class="about-page">
    <!-- Bio -->
    <section class="section">
      <div class="container">
        <p class="section-label">{{ t('about.label') }}</p>
        <h2 class="section-title">{{ t('about.title') }}</h2>
        <ScrollReveal>
          <div class="bio-grid">
            <div class="bio-text">
              <p>{{ t('about.bio_1') }}</p>
              <p>{{ t('about.bio_2') }}</p>
              <p>{{ t('about.bio_3') }}</p>
            </div>
            <div class="bio-visual">
              <div class="stats-row">
                <div class="stat-card" v-for="(s, i) in stats" :key="i" :style="{ transitionDelay: i * 0.1 + 's' }">
                  <span class="stat-icon">{{ s.icon }}</span>
                  <span class="stat-value">{{ s.value }}</span>
                  <span class="stat-label">{{ s.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Skills -->
    <section class="section skills-section">
      <div class="container">
        <ScrollReveal>
          <p class="section-label">Skills</p>
          <h2 class="section-title" style="font-size: var(--font-size-3xl);">{{ t('about.skills_title') }}</h2>
          <div class="skills-grid">
            <div class="skills-col" v-for="chunk in [skills.slice(0, 3), skills.slice(3)]" :key="chunk[0].name">
              <SkillBar v-for="skill in chunk" :key="skill.name" :name="skill.name" :level="skill.level" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page { padding-top: var(--nav-height); }

/* ---- Bio ---- */
.bio-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: var(--space-2xl);
  align-items: center;
  margin-top: var(--space-xl);
}
.bio-text p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: 1.85;
  margin-bottom: var(--space-lg);
}
.bio-text p:last-child { margin-bottom: 0; }

.bio-visual { display: flex; justify-content: center; }
.stats-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: 100%;
  max-width: 280px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.stat-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 8px 24px var(--color-card-shadow);
  transform: translateX(8px);
}
.stat-icon { font-size: 1.5rem; flex-shrink: 0; }
.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}
.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* ---- Skills ---- */
.skills-section {
  background: var(--color-bg-secondary);
  transition: background-color var(--transition-slow);
}
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl) var(--space-2xl);
  margin-top: var(--space-xl);
}

@media (max-width: 768px) {
  .bio-grid { grid-template-columns: 1fr; gap: var(--space-xl); }
  .stats-row { max-width: 100%; flex-direction: row; flex-wrap: wrap; }
  .stat-card { flex: 1; min-width: 140px; }
  .skills-grid { grid-template-columns: 1fr; gap: var(--space-md); }
  .bio-text p { font-size: var(--font-size-base); }
}
</style>

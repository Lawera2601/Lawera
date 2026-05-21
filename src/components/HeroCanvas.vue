<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const { theme } = useTheme()
const canvasRef = ref(null)
let animId = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let particles = []
  const maxParticles = 80

  function resize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
  }

  function createParticle() {
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.2
    }
  }

  function initParticles() {
    particles = []
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle())
    }
  }

  function draw() {
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)

    const isDark = theme.value === 'dark'
    const lineColor = isDark ? 'rgba(240, 144, 80, 0.12)' : 'rgba(224, 104, 40, 0.08)'
    const dotColor = isDark ? 'rgba(240, 144, 80, 0.5)' : 'rgba(224, 104, 40, 0.4)'

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = lineColor
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = dotColor
      ctx.fill()

      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = w
      if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h
      if (p.y > h) p.y = 0
    }

    animId = requestAnimationFrame(draw)
  }

  resize()
  initParticles()
  draw()

  window.addEventListener('resize', resize)
  onUnmounted(() => {
    window.removeEventListener('resize', resize)
    if (animId) cancelAnimationFrame(animId)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="hero-canvas"></canvas>
</template>

<style scoped>
.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>

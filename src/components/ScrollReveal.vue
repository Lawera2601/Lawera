<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  direction: { type: String, default: 'up' },
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 0.8 }
})

const el = ref(null)
let st = null

onMounted(() => {
  if (!el.value) return

  const yFrom = props.direction === 'up' ? 40 : props.direction === 'down' ? -40 : 0
  const xFrom = props.direction === 'left' ? 40 : props.direction === 'right' ? -40 : 0

  gsap.set(el.value, { opacity: 0, y: yFrom, x: xFrom })

  st = ScrollTrigger.create({
    trigger: el.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(el.value, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: props.duration,
        delay: props.delay,
        ease: 'power2.out'
      })
    },
    once: true
  })
})

onUnmounted(() => {
  if (st) st.kill()
})
</script>

<template>
  <div ref="el">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const slides = ['/image/2.png', '/image/3.png', '/image/1.png']
const slideIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function startSlideshow() {
  stopSlideshow()
  timer = setInterval(() => {
    slideIndex.value = (slideIndex.value + 1) % slides.length
  }, 2500)
}

function stopSlideshow() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) emit('close')
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      slideIndex.value = 0
      startSlideshow()
      document.body.style.overflow = 'hidden'
    } else {
      stopSlideshow()
      document.body.style.overflow = ''
    }
  },
)

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  stopSlideshow()
  document.body.style.overflow = ''
})

function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profileModalLabel"
      @click="onBackdrop"
    >
      <div class="w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
        <div class="flex items-center justify-between border-b border-line px-5 py-4">
          <h1 id="profileModalLabel" class="font-display text-xl font-semibold text-ink">Profile</h1>
          <button
            type="button"
            class="rounded-md px-2 py-1 text-ink-soft transition hover:bg-mist hover:text-ink"
            aria-label="Close"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>
        <div class="p-5">
          <div class="relative overflow-hidden rounded-xl bg-mist">
            <template v-for="(src, i) in slides" :key="src">
              <img
                v-show="i === slideIndex"
                :src="src"
                alt="Profile slide"
                class="animate-fade-in w-full object-cover"
              />
            </template>
            <span class="absolute left-3 top-3 rounded-md bg-ink/70 px-2 py-1 text-xs text-white">
              {{ slideIndex + 1 }} / {{ slides.length }}
            </span>
          </div>
          <div class="mt-4 flex justify-center gap-2">
            <button
              v-for="(_, i) in slides"
              :key="i"
              type="button"
              class="h-2.5 w-2.5 rounded-full transition"
              :class="i === slideIndex ? 'bg-teal' : 'bg-line'"
              :aria-label="`Go to slide ${i + 1}`"
              @click="slideIndex = i"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

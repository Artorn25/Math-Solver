<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  open: boolean
  src: string
  alt?: string
}>()

const emit = defineEmits<{
  close: []
}>()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) emit('close')
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Formula reference"
      @click="onBackdrop"
    >
      <div class="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
        <div class="flex items-center justify-between border-b border-line px-4 py-3">
          <p class="text-sm font-semibold text-ink">Formula reference</p>
          <button
            type="button"
            class="rounded-md px-2 py-1 text-ink-soft transition hover:bg-mist hover:text-ink"
            aria-label="Close"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center overflow-auto bg-paper/80 p-4 sm:p-6">
          <img
            :src="src"
            :alt="alt ?? 'Formula reference'"
            class="max-h-[75vh] w-auto max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

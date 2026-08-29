<script setup lang="ts">
import { onMounted, ref } from 'vue'

const show = ref(true)
const fading = ref(false)

onMounted(() => {
  setTimeout(() => {
    fading.value = true
    setTimeout(() => {
      show.value = false
    }, 450)
  }, 700)
})
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[70] flex items-center justify-center bg-paper transition-opacity duration-500"
    :class="fading ? 'opacity-0' : 'opacity-100'"
  >
    <div class="flex flex-col items-center gap-4">
      <div
        class="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-teal"
        aria-hidden="true"
      ></div>
      <p class="font-display text-lg font-semibold text-ink">Math Solver</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import type { ToastStatus } from '../composables/useMathSolver'

const props = defineProps<{
  status: ToastStatus
  message: string
}>()

const emit = defineEmits<{
  clear: []
}>()

let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.status,
  (status) => {
    if (timer) clearTimeout(timer)
    if (!status) return
    timer = setTimeout(() => emit('clear'), 3200)
  },
)

onMounted(() => {
  if (props.status) {
    timer = setTimeout(() => emit('clear'), 3200)
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed left-4 top-4 z-[60] w-[min(100%-2rem,22rem)]">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="status"
          class="pointer-events-auto rounded-xl border px-4 py-3 shadow-lg"
          :class="
            status === 'success'
              ? 'border-ok/30 bg-ok text-white'
              : 'border-err/30 bg-err text-white'
          "
          role="status"
        >
          <div class="text-sm" v-html="message"></div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

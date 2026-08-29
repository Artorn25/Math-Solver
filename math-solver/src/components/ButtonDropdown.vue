<script setup lang="ts" generic="T extends string">
import { computed, onMounted, onUnmounted, ref } from 'vue'

export interface DropdownOption<T extends string = string> {
  value: T
  title: string
  desc?: string
}

const props = defineProps<{
  modelValue: T
  options: DropdownOption<T>[]
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: T]
}>()

const open = ref(false)

const selected = computed(
  () => props.options.find((o) => o.value === props.modelValue) ?? props.options[0],
)

function toggle() {
  open.value = !open.value
}

function choose(value: T) {
  emit('update:modelValue', value)
  open.value = false
}

function onDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (!target?.closest('[data-button-dropdown]')) open.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div data-button-dropdown class="relative w-full">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-left shadow-sm transition hover:border-teal/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click.stop="toggle"
    >
      <span class="min-w-0">
        <span class="block text-sm font-semibold text-ink">{{ selected?.title }}</span>
        <span v-if="selected?.desc" class="mt-0.5 block truncate font-mono text-xs text-ink-soft">
          {{ selected.desc }}
        </span>
      </span>
      <svg
        class="h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200"
        :class="open ? 'rotate-180' : ''"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-if="open"
      class="absolute left-0 right-0 z-30 mt-2 max-h-56 overflow-y-auto overscroll-contain rounded-xl border border-line bg-surface shadow-lg shadow-ink/10 animate-fade-in"
      role="listbox"
      :aria-label="label"
    >
      <button
        v-for="opt in options"
        :key="opt.value"
        type="button"
        role="option"
        class="flex w-full items-start justify-between gap-3 border-b border-line/70 px-4 py-3 text-left transition last:border-b-0"
        :class="
          opt.value === modelValue
            ? 'bg-mist text-ink'
            : 'text-ink hover:bg-paper'
        "
        :aria-selected="opt.value === modelValue"
        @click.stop="choose(opt.value)"
      >
        <span class="min-w-0">
          <span class="block text-sm font-semibold">{{ opt.title }}</span>
          <span v-if="opt.desc" class="mt-0.5 block font-mono text-xs text-ink-soft">
            {{ opt.desc }}
          </span>
        </span>
        <span
          v-if="opt.value === modelValue"
          class="mt-0.5 text-xs font-semibold text-teal"
        >
          Selected
        </span>
      </button>
    </div>
  </div>
</template>

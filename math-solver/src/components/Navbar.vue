<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  openProfile: []
}>()

const mobileOpen = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md animate-fade-in"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <a href="/" class="group flex items-center gap-2 text-ink no-underline">
        <img
          src="/image/logo_cutback.png"
          alt=""
          class="h-9 w-auto transition-transform duration-300 group-hover:-rotate-6"
        />
        <span class="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          Math Solver
        </span>
      </a>

      <nav class="hidden items-center gap-1 sm:flex">
        <a
          href="/"
          class="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-mist hover:text-ink"
        >
          Home
        </a>
        <button
          type="button"
          class="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-mist hover:text-ink"
          @click="emit('openProfile')"
        >
          About us
        </button>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=artorn.damn@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md bg-teal px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-deep"
        >
          Contact
        </a>
      </nav>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-ink sm:hidden"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="sr-only">Menu</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path v-if="!mobileOpen" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <div v-if="mobileOpen" class="border-t border-line bg-surface px-4 py-3 sm:hidden">
      <div class="flex flex-col gap-1">
        <a href="/" class="rounded-md px-3 py-2 text-sm font-medium text-ink">Home</a>
        <button
          type="button"
          class="rounded-md px-3 py-2 text-left text-sm font-medium text-ink"
          @click="emit('openProfile'); mobileOpen = false"
        >
          About us
        </button>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=artorn.damn@gmail.com"
          class="rounded-md px-3 py-2 text-sm font-medium text-teal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </a>
      </div>
    </div>
  </header>
</template>

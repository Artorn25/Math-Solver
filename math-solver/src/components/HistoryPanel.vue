<script setup lang="ts">
import type { HistoryEntry } from '../composables/useSolverHistory'

defineProps<{
  entries: HistoryEntry[]
}>()

const emit = defineEmits<{
  restore: [entry: HistoryEntry]
  remove: [id: string]
  clear: []
}>()

function formatTime(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
    <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="font-display text-2xl font-bold text-ink">History</h2>
        <p class="mt-1 text-sm text-ink-soft">Recent solves saved on this device.</p>
      </div>
      <button
        v-if="entries.length"
        type="button"
        class="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:border-err hover:text-err"
        @click="emit('clear')"
      >
        Clear all
      </button>
    </div>

    <div v-if="entries.length === 0" class="rounded-xl border border-dashed border-line bg-mist/40 px-4 py-8 text-center text-ink-soft">
      No history yet. Solve a problem to see it here.
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="entry in entries"
        :key="entry.id"
        class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface/90 px-4 py-3"
      >
        <div class="min-w-0">
          <p class="font-semibold text-ink">{{ entry.summary }}</p>
          <p class="mt-0.5 truncate font-mono text-sm text-ink-soft">{{ entry.result.answer }}</p>
          <p class="mt-1 text-xs text-ink-soft">{{ formatTime(entry.createdAt) }}</p>
        </div>
        <div class="flex shrink-0 gap-2">
          <button
            type="button"
            class="rounded-lg bg-teal px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-teal-deep"
            @click="emit('restore', entry)"
          >
            Open
          </button>
          <button
            type="button"
            class="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:border-err hover:text-err"
            @click="emit('remove', entry.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

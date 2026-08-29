import { onMounted, ref } from 'vue'
import type {
  LogaType,
  PolyFind,
  PolyType,
  PythaFind,
  SolutionResult,
  SolverMode,
} from './useMathSolver'

export interface HistoryEntry {
  id: string
  createdAt: number
  mode: Exclude<SolverMode, 'home'>
  summary: string
  values: Record<string, string>
  polyType: PolyType
  polyFind: PolyFind
  pythaFind: PythaFind
  logaType: LogaType
  result: SolutionResult
}

const STORAGE_KEY = 'math-solver-history'
const MAX_ITEMS = 20

export function useSolverHistory() {
  const entries = ref<HistoryEntry[]>([])

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      entries.value = raw ? (JSON.parse(raw) as HistoryEntry[]) : []
    } catch {
      entries.value = []
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.value))
  }

  function add(entry: Omit<HistoryEntry, 'id' | 'createdAt'>) {
    const item: HistoryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
    }
    entries.value = [item, ...entries.value].slice(0, MAX_ITEMS)
    save()
  }

  function remove(id: string) {
    entries.value = entries.value.filter((e) => e.id !== id)
    save()
  }

  function clear() {
    entries.value = []
    save()
  }

  onMounted(load)

  return {
    entries,
    add,
    remove,
    clear,
    load,
  }
}

export function formatSolutionText(result: SolutionResult): string {
  const strip = (html: string) =>
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&emsp;/g, ' ')

  const lines = [
    result.title,
    '',
    'Given:',
    ...result.given.map((g) => `  ${g}`),
    '',
    'Steps:',
    ...result.steps.map((s) => `  ${s.label}: ${strip(s.detail)}`),
    '',
    `Answer: ${result.answer}`,
  ]
  if (result.note) lines.push(`Note: ${result.note}`)
  return lines.join('\n')
}

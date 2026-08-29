<script setup lang="ts">
import { computed, inject, ref } from "vue";
import ButtonDropdown from "./ButtonDropdown.vue";
import HistoryPanel from "./HistoryPanel.vue";
import ImageLightbox from "./ImageLightbox.vue";
import type { useMathSolver, LogaType, PolyFind, PolyType, PythaFind } from "../composables/useMathSolver";
import type { useSolverHistory, HistoryEntry } from "../composables/useSolverHistory";

const solver = inject<ReturnType<typeof useMathSolver>>("mathSolver");
if (!solver) throw new Error("mathSolver not provided");

const historyApi = inject<ReturnType<typeof useSolverHistory>>("solverHistory");
if (!historyApi) throw new Error("solverHistory not provided");
const { entries: historyEntries, add: addHistory, remove: removeHistory, clear: clearHistory } = historyApi;

const {
  mode,
  functionLabel,
  listName,
  polyType,
  polyFind,
  pythaFind,
  logaType,
  values,
  fields,
  formulaPreview,
  solvingFor,
  result,
  showResult,
  copied,
  showList,
  showListPoly,
  showListLoga,
  showSelectName,
  showSelectPoly,
  showSelectPytha,
  showSubmit,
  activePicture,
  setField,
  selectPolynomial,
  selectPythagorean,
  selectLogarithm,
  resetHome,
  submit,
  loadExample,
  copyAnswer,
  restoreEntry,
  buildHistoryPayload,
} = solver;

function onSolve() {
  const ok = submit();
  if (!ok) return;
  const payload = buildHistoryPayload();
  if (payload) addHistory(payload);
}

function onTryExample() {
  loadExample();
}

function onRestore(entry: HistoryEntry) {
  restoreEntry(entry);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const pictures = [
  { id: "poly-a", src: "/image/Linear.png" },
  { id: "poly-x", src: "/image/Linear.png" },
  { id: "poly-b", src: "/image/Linear.png" },
  { id: "poly-y", src: "/image/Linear.png" },
  { id: "poly-qua", src: "/image/Quadratic.png" },
  { id: "pytha-a", src: "/image/Pythagorean.png" },
  { id: "pytha-b", src: "/image/Pythagorean.png" },
  { id: "pytha-c", src: "/image/Pythagorean.png" },
  { id: "loga-gene", src: "/image/Logarithm.png" },
  { id: "loga-pro", src: "/image/Logarithm_Product.png" },
  { id: "loga-divi", src: "/image/Logarithm_Division.png" },
  { id: "loga-power", src: "/image/Logarithm_Power.png" },
  { id: "loga-squ", src: "/image/Logarithm_Square.png" },
  { id: "loga-natural", src: "/image/Logarithm_Natural.png" },
  { id: "loga-base10", src: "/image/Logarithm_Base10.png" },
] as const;

const previewOpen = ref(false);

const activePictureSrc = computed(() => pictures.find((pic) => pic.id === activePicture.value)?.src ?? "");
const polyTypeOptions: { value: PolyType; title: string; desc: string }[] = [
  { value: "Linear", title: "Linear formula", desc: "y = ax + b" },
  { value: "Quadratic", title: "Quadratic formula", desc: "ax² + bx + c = 0" },
];

const logaOptions: { value: LogaType; title: string; desc: string }[] = [
  { value: "General Logarithm", title: "General Logarithm", desc: "log_b(x)" },
  { value: "Logarithm of Product", title: "Logarithm of Product", desc: "log₁₀(m·n)" },
  { value: "Logarithm of Division", title: "Logarithm of Division", desc: "log₁₀(m/n)" },
  { value: "Logarithm of Power", title: "Logarithm of Power", desc: "log₁₀(xⁿ)" },
  { value: "Logarithm of Square Root", title: "Logarithm of Square Root", desc: "log₁₀(√x)" },
  { value: "Natural Logarithm", title: "Natural Logarithm", desc: "ln(x)" },
  { value: "Base 10 Logarithm", title: "Base 10 Logarithm", desc: "log₁₀(x)" },
];

const polyFinds: PolyFind[] = ["a", "x", "b", "y"];
const pythaFinds: PythaFind[] = ["a", "b", "c"];

const modes = [
  {
    id: "polynomial" as const,
    title: "Polynomial",
    desc: "Linear & quadratic equations",
    action: selectPolynomial,
  },
  {
    id: "pythagorean" as const,
    title: "Pythagorean",
    desc: "Find a, b, or c",
    action: selectPythagorean,
  },
  {
    id: "logarithm" as const,
    title: "Logarithm",
    desc: "Common log identities",
    action: selectLogarithm,
  },
];

const choiceOn = "border-teal bg-teal text-white shadow-sm shadow-teal/20";
const choiceOff = "border-line bg-paper text-ink hover:border-teal/40 hover:bg-mist";
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
    <div class="animate-rise text-center">
      <p class="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal">Education tool</p>
      <h1 class="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">Math Solver</h1>
      <p class="mx-auto mt-3 max-w-xl text-base text-ink-soft sm:text-lg">Choose a topic, fill only the known numbers, and get a clear result.</p>
    </div>

    <div class="animate-rise-delay mt-8 grid gap-3 sm:grid-cols-3">
      <button
        v-for="item in modes"
        :key="item.id"
        type="button"
        class="group rounded-xl border px-4 py-4 text-left transition duration-300"
        :class="mode === item.id ? 'border-teal bg-teal text-white shadow-md shadow-teal/20' : 'border-line bg-surface/90 text-ink hover:-translate-y-0.5 hover:border-teal/40 hover:bg-mist'"
        @click="item.action">
        <span class="font-display block text-lg font-semibold">{{ item.title }}</span>
        <span class="mt-1 block text-sm" :class="mode === item.id ? 'text-white/85' : 'text-ink-soft'">
          {{ item.desc }}
        </span>
      </button>
    </div>

    <div v-if="mode !== 'home'" class="animate-fade-in mt-8 overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-[0_12px_40px_-24px_rgba(20,54,75,0.35)]">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-mist/60 px-5 py-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-teal">Workspace</p>
          <h2 class="font-display text-xl font-semibold text-ink">{{ functionLabel }}</h2>
        </div>
        <button type="button" class="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:border-teal hover:text-teal" @click="resetHome">
          Reset
        </button>
      </div>

      <div class="grid gap-8 p-5 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
        <div class="space-y-5">
          <div v-if="showList" class="space-y-2">
            <p class="text-sm font-semibold text-ink">{{ listName }}</p>

            <ButtonDropdown v-if="showListPoly" v-model="polyType" :options="polyTypeOptions" label="Equation type" />

            <ButtonDropdown v-if="showListLoga" v-model="logaType" :options="logaOptions" label="Log type" />
          </div>

          <div v-if="showSelectName || showSelectPoly || showSelectPytha" class="space-y-2">
            <p v-if="showSelectName" class="text-sm font-semibold text-ink">Find this unknown</p>
            <div v-if="showSelectPoly" class="flex flex-wrap gap-2">
              <button
                v-for="opt in polyFinds"
                :key="opt"
                type="button"
                class="inline-flex min-w-14 items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition"
                :class="polyFind === opt ? choiceOn : choiceOff"
                @click="polyFind = opt">
                {{ opt }}
              </button>
            </div>
            <div v-if="showSelectPytha" class="flex flex-wrap gap-2">
              <button
                v-for="opt in pythaFinds"
                :key="opt"
                type="button"
                class="inline-flex min-w-14 items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition"
                :class="pythaFind === opt ? choiceOn : choiceOff"
                @click="pythaFind = opt">
                {{ opt }}
              </button>
            </div>
          </div>

          <div class="rounded-xl border border-teal/25 bg-mist/70 px-4 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-teal">Equation</p>
            <p class="mt-2 font-display text-xl font-semibold text-ink" v-html="formulaPreview"></p>
            <p class="mt-2 text-sm text-ink-soft">
              Solving for <span class="font-semibold text-teal">{{ solvingFor }}</span>
              — enter only the known numbers on the right.
            </p>
          </div>

          <div v-if="activePicture" class="relative flex min-h-40 items-center justify-center rounded-xl border border-dashed border-line bg-paper/80 p-4">
            <button
              type="button"
              class="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-ink-soft shadow-sm transition hover:border-teal hover:text-teal"
              aria-label="Expand image"
              title="Expand"
              @click="previewOpen = true">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
            <template v-for="pic in pictures" :key="pic.id">
              <img v-if="activePicture === pic.id" :src="pic.src" alt="Formula reference" class="max-h-48 w-auto object-contain" />
            </template>
          </div>
        </div>

        <form class="space-y-4" @submit.prevent="onSolve">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="text-sm font-semibold text-ink">Known values</p>
            <button type="button" class="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-teal transition hover:border-teal hover:bg-mist" @click="onTryExample">Try example</button>
          </div>

          <div v-for="field in fields" :key="field.key" class="space-y-1.5">
            <label class="text-sm font-semibold text-ink" :for="`field-${field.key}`">
              {{ field.label }}
            </label>
            <div class="flex overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20">
              <span class="flex shrink-0 items-center border-r border-line bg-mist/60 px-3 font-mono text-sm text-ink-soft"> {{ field.label }} = </span>
              <input
                :id="`field-${field.key}`"
                type="number"
                step="any"
                :placeholder="field.hint"
                :value="values[field.key] ?? ''"
                class="min-w-0 flex-1 border-0 bg-transparent py-2.5 pl-4 pr-3.5 text-ink outline-none"
                @input="setField(field.key, ($event.target as HTMLInputElement).value)" />
            </div>
          </div>

          <div v-if="showSubmit" class="pt-2">
            <audio id="audio" src="/Audio/Click.mp3"></audio>
            <button
              type="submit"
              class="inline-flex w-full items-center justify-center rounded-lg bg-mark px-4 py-3 text-sm font-bold text-ink transition hover:brightness-95 active:translate-y-px sm:w-auto sm:min-w-40">
              Solve for {{ solvingFor }}
            </button>
          </div>
        </form>
      </div>

      <div v-if="showResult && result" class="animate-result border-t border-line bg-mist/40 px-5 py-6 lg:px-8">
        <div class="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-teal">Step-by-step</p>
            <h3 class="font-display text-xl font-semibold text-ink">{{ result.title }}</h3>
          </div>
          <button type="button" class="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink transition hover:border-teal hover:text-teal" @click="copyAnswer">
            {{ copied ? "Copied" : "Copy answer" }}
          </button>
        </div>

        <div class="mb-4 flex flex-wrap gap-2">
          <span v-for="item in result.given" :key="item" class="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-sm text-ink">
            {{ item }}
          </span>
        </div>

        <ol class="space-y-3">
          <li v-for="(step, index) in result.steps" :key="index" class="rounded-xl border border-line bg-surface px-4 py-3">
            <p class="text-xs font-semibold uppercase tracking-wide text-teal">{{ step.label }}</p>
            <p class="mt-1 font-mono text-base text-ink" v-html="step.detail"></p>
          </li>
        </ol>

        <div class="mt-4 rounded-xl border border-teal/30 bg-teal px-4 py-4 text-white">
          <p class="text-xs font-semibold uppercase tracking-wider text-white/75">Answer</p>
          <p class="mt-1 font-display text-2xl font-bold sm:text-3xl">{{ result.answer }}</p>
          <p v-if="result.note" class="mt-2 text-sm text-white/80">{{ result.note }}</p>
        </div>
      </div>
    </div>

    <HistoryPanel class="mt-10" :entries="historyEntries" @restore="onRestore" @remove="removeHistory" @clear="clearHistory" />

    <ImageLightbox :open="previewOpen" :src="activePictureSrc" @close="previewOpen = false" />
  </section>
</template>

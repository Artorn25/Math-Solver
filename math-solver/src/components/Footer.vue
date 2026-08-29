<script setup lang="ts">
import Github from './icons/Github.vue'
</script>

<template>
  <footer class="mt-10 border-t border-line bg-ink text-mist">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div class="max-w-sm">
          <a href="/" class="inline-flex items-center gap-2.5 no-underline">
            <img
              src="/image/logo.png"
              alt="Math Solver"
              class="h-9 w-9 rounded-md bg-white/10 p-0.5"
            />
            <span class="font-display text-lg font-semibold text-white">Math Solver</span>
          </a>
          <p class="mt-3 text-sm leading-relaxed text-mist/70">
            A focused workspace for polynomials, triangles, and logarithms.
          </p>
        </div>

        <nav
          class="grid grid-cols-3 gap-6 text-sm sm:gap-10"
          aria-label="Footer"
        >
          <div>
            <h5 class="mb-2.5 text-xs font-semibold uppercase tracking-wider text-mark">
              Guides
            </h5>
            <ul class="space-y-2 text-mist/80">
              <li><a href="#" class="transition hover:text-white">Getting started</a></li>
              <li><a href="#" class="transition hover:text-white">Functions</a></li>
              <li><a href="#" class="transition hover:text-white">Reference</a></li>
            </ul>
          </div>
          <div>
            <h5 class="mb-2.5 text-xs font-semibold uppercase tracking-wider text-mark">
              Links
            </h5>
            <ul class="space-y-2 text-mist/80">
              <li><a href="/" class="transition hover:text-white">Home</a></li>
              <li><a href="#" class="transition hover:text-white">Docs</a></li>
              <li><a href="#" class="transition hover:text-white">Class diagram</a></li>
            </ul>
          </div>
          <div>
            <h5 class="mb-2.5 text-xs font-semibold uppercase tracking-wider text-mark">
              Help
            </h5>
            <ul class="space-y-2 text-mist/80">
              <li><a href="#" class="transition hover:text-white">FAQs</a></li>
              <li><a href="#" class="transition hover:text-white">About</a></li>
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=artorn.damn@gmail.com"
                  class="transition hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div
        class="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5"
      >
        <p class="text-xs text-mist/50">© 2024 Math Solver. All rights reserved.</p>
        <a
          href="https://github.com/Artorn25"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-mist/60 transition hover:text-white"
          aria-label="GitHub profile"
        >
          <Github class="h-4 w-4 shrink-0" />
          <span class="text-xs">GitHub</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineEmits<{
  openProfile: []
}>()

const items = [
  {
    title: 'Profile',
    desc: 'Meet the people behind Math Solver.',
    img: '/image/people.png',
    action: 'profile' as const,
  },
  {
    title: 'What is this project?',
    desc: 'An education-focused math helper for class and self-study.',
    img: '/image/project.png',
    href: '/Document/Project Proposal CE321.pdf',
  },
  {
    title: 'Contact',
    desc: 'Email the developer if you need help.',
    img: '/image/Text.png',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=artorn.damn@gmail.com',
  },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
    <div class="mb-6 max-w-2xl">
      <h2 class="font-display text-3xl font-bold text-ink">Explore</h2>
      <p class="mt-2 text-ink-soft">Learn more about the project and the team.</p>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <article
        v-for="item in items"
        :key="item.title"
        class="group border-b border-line pb-5 transition duration-300 hover:-translate-y-1"
      >
        <a
          v-if="item.href"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          class="block no-underline"
        >
          <img
            :src="item.img"
            :alt="item.title"
            class="mb-4 h-24 w-24 object-contain transition duration-300 group-hover:opacity-80"
          />
          <h3 class="font-display text-xl font-semibold text-ink">{{ item.title }}</h3>
          <p class="mt-1 text-sm text-ink-soft">{{ item.desc }}</p>
        </a>
        <button
          v-else
          type="button"
          class="block w-full text-left"
          @click="$emit('openProfile')"
        >
          <img
            :src="item.img"
            :alt="item.title"
            class="mb-4 h-24 w-24 object-contain transition duration-300 group-hover:opacity-80"
          />
          <h3 class="font-display text-xl font-semibold text-ink">{{ item.title }}</h3>
          <p class="mt-1 text-sm text-ink-soft">{{ item.desc }}</p>
        </button>
      </article>
    </div>
  </section>
</template>

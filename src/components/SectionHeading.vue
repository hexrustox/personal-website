<script setup lang="ts">
let props = defineProps<{
  eyebrow: string;
  title: string;
}>();
</script>

<template>
  <section class="section-heading">
    <header class="section-heading__head">
      <p class="section-heading__eyebrow">{{ eyebrow }}</p>
    </header>

    <h2 class="section-heading__title">{{ title }}</h2>

    <slot />
  </section>
</template>

<style scoped>
.section-heading {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-heading__head {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.section-heading__eyebrow {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.75rem;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.section-heading__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6.5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text);
}
</style>

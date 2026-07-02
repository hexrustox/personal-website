<script setup lang="ts">
import SectionHeading from "./SectionHeading.vue";
import { metaItems } from "../lib/about";
</script>

<template>
  <SectionHeading eyebrow="01 — ABOUT" title="A bit about myself.">
    <h3>Designing and building considered interfaces for the web.</h3>

    <p>
      Currently working as a frontend engineer, mostly with TypeScript, Vue, and
      a little Rust on the side. I'm drawn to work that sits at the intersection
      of design and engineering — places where the two disciplines sharpen each
      other rather than get in the way.
    </p>

    <p>
      Outside of code I keep notebooks full of half-finished ideas, read more
      than I should, and take long walks when a bug won't budge.
    </p>

    <dl class="about__meta">
      <div v-for="item in metaItems" :key="item.label" class="about__meta-item">
        <dt class="about__meta-label">{{ item.label }}</dt>
        <dd class="about__meta-value">{{ item.value }}</dd>
      </div>
    </dl>
  </SectionHeading>
</template>

<style scoped>
.about__meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 1.5rem;
  margin: 1.5rem 0 0;
  padding: 1.5rem 0 0;
  border-top: 1px solid color-mix(in srgb, var(--muted) 30%, transparent);
}

@media (min-width: 600px) {
  .about__meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .about__meta {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.about__meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0;
}

.about__meta-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.about__meta-value {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.3;
  color: var(--text);
  text-decoration: underline 1px var(--accent);
  text-underline-offset: 4px;
}
</style>

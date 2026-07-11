<script setup lang="ts">
import { about, metaItems } from "../data/about";
import { REVEAL_DEFAULT_STEP } from "../lib/motion";
import { useMediaQuery } from "../lib/useMediaQuery";

const { matches: isDesktop, ready: isReady } = useMediaQuery(
  "(min-width: 1200px)",
);
</script>

<template>
  <SectionHeading eyebrow="01 — ABOUT" title="A bit about myself.">
    <Reveal>
      <h3>{{ about.heading }}</h3>
    </Reveal>

    <Reveal v-for="(paragraph, i) in about.paragraphs" :key="i">
      <p>{{ paragraph }}</p>
    </Reveal>

    <Reveal>
      <RevealGroup v-if="isReady" :step="isDesktop ? REVEAL_DEFAULT_STEP : 0">
        <dl class="about__meta">
          <Reveal
            cascade
            v-for="item in metaItems"
            :key="item.label"
            class="about__meta-item"
          >
            <dt class="type-eyebrow">{{ item.label }}</dt>
            <dd class="about__meta-value">{{ item.value }}</dd>
          </Reveal>
        </dl>
      </RevealGroup>
    </Reveal>
  </SectionHeading>
</template>

<style scoped>
.about__meta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem 1.5rem;
  margin: 1.5rem 0 0;
  padding: 1.5rem 0 0;
  border-top: 1px solid var(--border);
}

@media (min-width: 600px) {
  .about__meta {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .about__meta {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.about__meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>

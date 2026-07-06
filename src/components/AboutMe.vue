<script setup lang="ts">
import { metaItems } from "@lib/about";
import { REVEAL_DEFAULT_STEP } from "@lib/motion";
import { useMediaQuery } from "@lib/useMediaQuery";

const isDesktop = useMediaQuery("(min-width: 1200px)");
</script>

<template>
  <SectionHeading eyebrow="01 — ABOUT" title="A bit about myself.">
    <Reveal>
      <h3>Designing and building considered interfaces for the web.</h3>
    </Reveal>

    <Reveal>
      <p>
        Currently working as a frontend engineer, mostly with TypeScript, Vue,
        and a little Rust on the side. I'm drawn to work that sits at the
        intersection of design and engineering — places where the two
        disciplines sharpen each other rather than get in the way.
      </p>
    </Reveal>

    <Reveal>
      <p>
        Outside of code I keep notebooks full of half-finished ideas, read more
        than I should, and take long walks when a bug won't budge.
      </p>
    </Reveal>

    <Reveal>
      <dl class="about__meta">
        <RevealGroup :step="REVEAL_DEFAULT_STEP">
          <div
            v-for="item in metaItems"
            :key="item.label"
            class="about__meta-item"
          >
            <Reveal cascade :disable="!isDesktop">
              <dt class="type-eyebrow">{{ item.label }}</dt>
              <dd class="about__meta-value">{{ item.value }}</dd>
            </Reveal>
          </div>
        </RevealGroup>
      </dl>
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

@media (min-width: 960px) {
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

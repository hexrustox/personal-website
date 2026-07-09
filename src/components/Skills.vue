<script setup lang="ts">
import { REVEAL_DEFAULT_STEP } from "../lib/motion";
import { skillCategories } from "../lib/skills";
import { useMediaQuery } from "../lib/useMediaQuery";

const isDesktop = useMediaQuery("(min-width: 720px)");
</script>

<template>
  <SectionHeading eyebrow="02 — SKILLS" title="What I work with.">
    <RevealGroup :step="REVEAL_DEFAULT_STEP">
      <div class="skills__groups">
        <section
          v-for="category in skillCategories"
          :key="category.title"
          class="skills__group"
          :aria-label="category.title"
        >
          <Reveal :cascade="!isDesktop">
            <span class="type-eyebrow skills__group-title">{{
              category.title
            }}</span>
            <ul class="skills__list">
              <li
                v-for="skill in category.items"
                :key="skill"
                class="skills__chip"
              >
                {{ skill }}
              </li>
            </ul>
          </Reveal>
        </section>
      </div>
    </RevealGroup>
  </SectionHeading>
</template>

<style scoped>
.skills__groups {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 720px) {
  .skills__groups {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3rem;
  }
}

.skills__group-title {
  margin: 0 0 1rem;
}

.skills__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
}
</style>

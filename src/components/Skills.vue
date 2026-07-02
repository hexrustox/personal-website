<script setup lang="ts">
import SectionHeading from "./SectionHeading.vue";
import { skillCategories } from "../lib/skills";
</script>

<template>
  <SectionHeading eyebrow="02 — SKILLS" title="What I work with.">
    <div class="skills__groups">
      <section
        v-for="category in skillCategories"
        :key="category.title"
        class="skills__group"
      >
        <p class="skills__group-title">{{ category.title }}</p>
        <ul class="skills__list">
          <li v-for="skill in category.items" :key="skill" class="skills__chip">
            {{ skill }}
          </li>
        </ul>
      </section>
    </div>
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
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}

.skills__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.skills__chip {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1;
  color: var(--text);
}
</style>

<script setup lang="ts">
import { Skills } from "../lib/skills";

const skillValues = Object.values(Skills);
</script>

<template>
  <section class="skills">
    <span class="section-rule" aria-hidden="true"></span>
    <h1 class="section-title">Skills</h1>
    <ul class="skills__list">
      <li v-for="skill in skillValues" :key="skill" class="skills__chip">
        {{ skill }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.skills {
  width: 100%;
}

.skills__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.skills__chip {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--accent);
  border-radius: 9999px;
  background: transparent;
  color: var(--accent);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  transition: filter 150ms ease;
}

.skills__chip:hover {
  filter: brightness(1.1);
}
</style>

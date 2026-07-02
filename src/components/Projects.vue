<script setup lang="ts">
import { ref, computed } from "vue";
import SectionHeading from "./SectionHeading.vue";
import { projects, type Project } from "../lib/projects";

const activeIndex = ref(0);
const active = computed<Project>(() => projects[activeIndex.value]!);

function goTo(i: number) {
  activeIndex.value = i;
}
</script>

<template>
  <SectionHeading eyebrow="03 — PROJECTS" title="What I've built.">
    <div class="projects__layout">
      <ol class="projects__list">
        <li v-for="(p, i) in projects" :key="p.name">
          <button
            type="button"
            class="projects__item"
            :class="{ 'projects__item--active': i === activeIndex }"
            :aria-pressed="i === activeIndex"
            @click="goTo(i)"
          >
            <span class="projects__index">{{
              String(i + 1).padStart(2, "0")
            }}</span>
            <h3>{{ p.name }}</h3>
          </button>
        </li>
      </ol>
      <article class="projects__detail" :key="active.name" aria-live="polite">
        <h3>{{ active.name }}</h3>
        <p class="projects__detail-description">{{ active.description }}</p>
        <ul class="projects__detail-skills">
          <li
            v-for="skill in active.skills"
            :key="skill"
            class="projects__detail-skill"
          >
            {{ skill }}
          </li>
        </ul>
        <ul class="projects__detail-links">
          <li v-for="link in active.links" :key="link.url">
            <a
              class="projects__detail-link"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.name }} &rarr;
            </a>
          </li>
        </ul>
      </article>
    </div>
  </SectionHeading>
</template>

<style scoped>
.projects__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 720px) {
  .projects__layout {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
    gap: 3rem;
    align-items: start;
  }
}

.projects__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

@media (min-width: 720px) {
  .projects__list {
    position: sticky;
    top: 2rem;
  }
}

.projects__item {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 0;
  border-left: 2px solid transparent;
  margin-left: -1rem;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-body);
  color: var(--muted);
}

.projects__item:hover,
.projects__item:hover .projects__index {
  color: var(--text);
}

.projects__item--active {
  color: var(--text);
}

.projects__index {
  font-family: var(--font-display);
  font-size: 0.8rem;
  line-height: 1;
  letter-spacing: 0.05em;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.projects__item--active .projects__index {
  color: var(--accent);
}

.projects__name {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.75rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.projects__detail {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.projects__detail-description {
  margin: 0;
  max-width: 60ch;
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--text);
}

.projects__detail-skills {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--muted);
}

.projects__detail-skill:not(:last-child)::after {
  content: " · ";
  margin-left: 0.5rem;
  color: var(--muted);
}

.projects__detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.projects__detail-link {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--text);
  text-decoration: underline 1px var(--accent);
  text-underline-offset: 4px;
}

.projects__detail-link:hover {
  color: var(--accent);
}
</style>

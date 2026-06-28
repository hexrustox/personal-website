<script setup lang="ts">
import { ref, computed } from "vue";
import { projects, type Project } from "../lib/projects";

const activeIndex = ref(0);
const total = projects.length;
const active = computed<Project>(() => projects[activeIndex.value]!);

function prev() {
  activeIndex.value = (activeIndex.value - 1 + total) % total;
}
function next() {
  activeIndex.value = (activeIndex.value + 1) % total;
}
function goTo(i: number) {
  activeIndex.value = i;
}

function onKey(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    prev();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    next();
  }
}
</script>

<template>
  <section
    class="projects"
    tabindex="0"
    aria-roledescription="carousel"
    aria-label="Projects"
    @keydown="onKey"
  >
    <span class="section-rule" aria-hidden="true"></span>
    <div class="projects__head">
      <h1 class="section-title projects__title">Projects</h1>
      <span class="projects__count" aria-live="polite">
        {{ activeIndex + 1 }} / {{ total }}
      </span>
    </div>

    <div class="projects__viewport">
      <article class="project" :key="active.name">
        <h2 class="project__name">{{ active.name }}</h2>
        <p class="project__description">{{ active.description }}</p>
        <ul class="project__skills">
          <li
            v-for="skill in active.skills"
            :key="skill"
            class="project__skill"
          >
            {{ skill }}
          </li>
        </ul>
        <ul class="project__links">
          <li v-for="link in active.links" :key="link.url">
            <a
              class="project__link"
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

    <div class="projects__controls">
      <button
        type="button"
        class="projects__nav"
        aria-label="Previous project"
        @click="prev"
      >
        &larr;
      </button>
      <div class="projects__dots" role="tablist">
        <button
          v-for="(p, i) in projects"
          :key="p.name"
          type="button"
          class="projects__dot"
          :class="{ 'projects__dot--active': i === activeIndex }"
          :aria-label="`Go to project ${i + 1}`"
          :aria-selected="i === activeIndex"
          role="tab"
          @click="goTo(i)"
        ></button>
      </div>
      <button
        type="button"
        class="projects__nav"
        aria-label="Next project"
        @click="next"
      >
        &rarr;
      </button>
    </div>
  </section>
</template>

<style scoped>
.projects {
  width: 100%;
  outline: none;
}
.projects:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 4px;
}

.projects__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.projects__title {
  margin: 0;
}

.projects__count {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.projects__viewport {
  min-height: 12rem;
  margin-bottom: 1.5rem;
}

.project__name {
  margin: 0 0 0.5rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--text);
}

.project__description {
  margin: 0 0 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
  max-width: 65ch;
}

.project__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
}

.project__skill {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--accent);
  border-radius: 9999px;
  background: transparent;
  color: var(--accent);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

.project__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.project__link {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--text);
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  transition: color 150ms ease;
}
.project__link:hover {
  color: var(--accent);
}

.projects__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.projects__nav {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--muted);
  border-radius: 9999px;
  background: transparent;
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  transition:
    color 150ms ease,
    border-color 150ms ease;
}
.projects__nav:hover,
.projects__nav:focus-visible {
  color: var(--accent);
  border-color: var(--accent);
}
.projects__nav:focus-visible {
  outline: none;
}

.projects__dots {
  display: flex;
  gap: 0.5rem;
}

.projects__dot {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border: 0;
  border-radius: 9999px;
  background: var(--muted);
  opacity: 0.4;
  cursor: pointer;
  transition:
    background 150ms ease,
    opacity 150ms ease;
}
.projects__dot--active {
  background: var(--accent);
  opacity: 1;
}
.projects__dot:hover {
  opacity: 0.8;
}
</style>

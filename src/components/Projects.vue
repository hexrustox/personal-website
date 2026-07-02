<script setup lang="ts">
import { ref, computed, useTemplateRef, nextTick } from "vue";
import SectionHeading from "./SectionHeading.vue";
import Link from "./Link.vue";
import { projects, type Project } from "../lib/projects";

const activeIndex = ref(0);
const active = computed<Project>(() => projects[activeIndex.value]!);
const tabRefs = useTemplateRef<HTMLButtonElement[]>("tabs");

async function goTo(i: number) {
  const next = (i + projects.length) % projects.length;
  activeIndex.value = next;
  await nextTick();
  tabRefs.value?.[next]?.focus();
}

function onTabKey(e: KeyboardEvent, i: number) {
  switch (e.key) {
    case "ArrowDown":
    case "ArrowRight":
      e.preventDefault();
      goTo(i + 1);
      break;
    case "ArrowUp":
    case "ArrowLeft":
      e.preventDefault();
      goTo(i - 1);
      break;
    case "Home":
      e.preventDefault();
      goTo(0);
      break;
    case "End":
      e.preventDefault();
      goTo(projects.length - 1);
      break;
  }
}
</script>

<template>
  <SectionHeading eyebrow="03 — PROJECTS" title="What I've built.">
    <div class="projects__layout">
      <div
        class="projects__list"
        role="tablist"
        aria-label="Projects"
        aria-orientation="vertical"
      >
        <button
          v-for="(p, i) in projects"
          :key="p.name"
          ref="tabs"
          :id="`project-tab-${i}`"
          :class="{
            projects__item: true,
            'projects__item--active': i === activeIndex,
          }"
          role="tab"
          type="button"
          :aria-selected="i === activeIndex"
          :aria-controls="`project-panel-${i}`"
          :tabindex="i === activeIndex ? 0 : -1"
          @click="goTo(i)"
          @keydown="(e) => onTabKey(e, i)"
        >
          <span class="type-label projects__index">{{
            String(i + 1).padStart(2, "0")
          }}</span>
          <span class="project__name">{{ p.name }}</span>
        </button>
      </div>
      <section
        :key="active.name"
        :id="`project-panel-${activeIndex}`"
        class="projects__detail"
        role="tabpanel"
        :aria-labelledby="`project-tab-${activeIndex}`"
        aria-live="polite"
      >
        <h3>{{ active.name }}</h3>
        <p class="projects__detail-description">{{ active.description }}</p>
        <ul class="type-meta projects__detail-skills">
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
            <Link :href="link.url" target="_blank" rel="noopener noreferrer">{{
              link.name
            }}</Link>
          </li>
        </ul>
      </section>
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
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 3rem;
    align-items: start;
  }
}

.projects__list {
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
  margin-left: -1rem;
  cursor: pointer;
}

.project__name {
  position: relative;
}

.project__name::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 2px;
  background: var(--accent);
  left: 0;
  bottom: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: 200ms;
}

.projects__item:hover .project__name::after,
.projects__item:focus-visible .project__name::after {
  transform: scaleX(1);
}

.projects__index {
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.projects__item--active .projects__index {
  color: var(--accent);
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
}

.projects__detail-skills {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.projects__detail-skill:not(:last-child)::after {
  content: " · ";
  margin-left: 0.5rem;
}

.projects__detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

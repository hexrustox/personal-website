<script setup lang="ts">
import {
  slideFadeVariants,
  useReducedTransition,
  REVEAL_DEFAULT_STEP,
  type Direction,
} from "../lib/motion";
import { projects, type Project } from "../lib/projects";
import { ref, computed, useTemplateRef, nextTick } from "vue";

const currentIndex = ref(0);
const currentProject = computed<Project>(() => projects[currentIndex.value]!);
const tabRefs = useTemplateRef<HTMLButtonElement[]>("tabs");
const direction = ref<Direction>(1);

async function goTo(i: number) {
  if (i === currentIndex.value) return;
  const next = (i + projects.length) % projects.length;
  direction.value = next > currentIndex.value ? 1 : -1;
  currentIndex.value = next;
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

const inactiveIndexVariants = {
  inactive: { opacity: 1, y: 0 },
  current: { opacity: 0, y: "100%" },
};
const currentIndexVariants = {
  inactive: { opacity: 0, y: "-100%" },
  current: { opacity: 1, y: 0 },
};

const detailVariants = slideFadeVariants();

const isDesktop = ref(window.matchMedia("(min-width: 720px)").matches);
</script>

<template>
  <SectionHeading eyebrow="03 — PROJECTS" title="What I've built.">
    <RevealGroup :step="isDesktop ? REVEAL_DEFAULT_STEP : 0">
      <div class="projects__layout">
        <Reveal cascade>
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
              class="projects__item"
              role="tab"
              type="button"
              :aria-selected="i === currentIndex"
              :aria-controls="`project-panel-${i}`"
              :tabindex="i === currentIndex ? 0 : -1"
              @click="goTo(i)"
              @keydown="(e) => onTabKey(e, i)"
            >
              <div class="projects__index">
                <Motion
                  as="span"
                  class="type-label projects__index--inactive"
                  :variants="inactiveIndexVariants"
                  :animate="i === currentIndex ? 'current' : 'inactive'"
                  :transition="useReducedTransition()"
                  >{{ String(i + 1).padStart(2, "0") }}</Motion
                >
                <Motion
                  as="span"
                  class="type-label projects__index--current"
                  :variants="currentIndexVariants"
                  :animate="i === currentIndex ? 'current' : 'inactive'"
                  :transition="useReducedTransition()"
                  >{{ String(i + 1).padStart(2, "0") }}</Motion
                >
              </div>
              <h3 class="projects__item-name">{{ p.name }}</h3>
            </button>
          </div>
        </Reveal>
        <Reveal cascade>
          <AnimatePresence mode="wait">
            <Motion
              as="section"
              :key="currentProject.name"
              :custom="direction"
              :variants="detailVariants"
              initial="enter"
              animate="center"
              exit="exit"
              :transition="useReducedTransition()"
              :id="`project-panel-${currentIndex}`"
              class="projects__detail"
              role="tabpanel"
              :aria-labelledby="`project-tab-${currentIndex}`"
              aria-live="polite"
            >
              <h3>{{ currentProject.name }}</h3>
              <p class="projects__detail-description">
                {{ currentProject.description }}
              </p>
              <ul class="type-meta projects__detail-skills">
                <li
                  v-for="skill in currentProject.skills"
                  :key="skill"
                  class="projects__detail-skill"
                >
                  {{ skill }}
                </li>
              </ul>
              <ul class="projects__detail-links">
                <li v-for="link in currentProject.links" :key="link.url">
                  <Link
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ link.name }}</Link
                  >
                </li>
              </ul>
            </Motion>
          </AnimatePresence>
        </Reveal>
      </div>
    </RevealGroup>
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

.projects__item {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  width: 100%;
  padding: 0.75rem 1rem;
  margin-left: -1rem;
  cursor: pointer;
}

.projects__index {
  position: relative;
  top: 2px;
  display: flex;
  align-items: baseline;
}

.projects__index--inactive,
.projects__index--current {
  font-variant-numeric: tabular-nums;
}

.projects__index--inactive {
  position: relative;
  color: var(--muted);
}

.projects__index--current {
  position: absolute;
  left: 0;
  color: var(--accent);
}

.projects__item-name {
  position: relative;
}

.projects__item-name::after {
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

.projects__item:hover .projects__item-name::after,
.projects__item:focus-visible .projects__item-name::after {
  transform: scaleX(1);
}

.projects__detail {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.projects__detail-skills {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.projects__detail-skill:not(:last-child)::after {
  content: " • ";
  margin-left: 0.5rem;
}

.projects__detail-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  list-style: none;
  padding: 0;
}
</style>

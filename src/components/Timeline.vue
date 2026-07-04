<script setup lang="ts">
import SectionHeader from "../components/SectionHeading.vue";
import YearLabel from "../components/YearLabel.vue";
import { useReducedTransition } from "../lib/motion";
import { round } from "../lib/round";
import { events, groupEvents, endOf, type Event } from "../lib/timeline";
import FadeOnKey from "./FadeOnKey.vue";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion-v";
import { computed, ref, useTemplateRef } from "vue";

const containerRef = useTemplateRef("container");
const { scrollYProgress } = useScroll({
  target: containerRef,
});

const MS_IN_MONTH = 1000 * 60 * 60 * 24 * 30;
const VH_PER_MONTH = 4;
const containerHeight = 80;
const containerVh = computed(() => `${containerHeight}vh`);

const sortedEvents = events
  .slice()
  .sort((a, b) => a.from.getTime() - b.from.getTime());
const groups = groupEvents(sortedEvents);

const timelineStartMs = groups[0][0]?.from.getTime() ?? 0;
const totalSpanMs = new Date().getTime() - timelineStartMs;

const y = useTransform(
  scrollYProgress,
  [0, 1],
  [`0vh`, `${containerHeight}vh`],
);

const cursorTime = ref(timelineStartMs);
useMotionValueEvent(scrollYProgress, "change", (progress) => {
  cursorTime.value = timelineStartMs + Math.round(totalSpanMs * progress);
});

const cursorYear = computed(() => new Date(cursorTime.value).getFullYear());

type EventIndex = {
  group: number;
  event: number;
};
const eventIndex = computed(() => {
  let closestDistance = Infinity;
  let closest: EventIndex = { group: 0, event: 0 };
  for (const [g, group] of groups.entries()) {
    for (const [i, event] of group.entries()) {
      if (
        event.from.getTime() <= cursorTime.value &&
        endOf(event).getTime() >= cursorTime.value
      ) {
        const diff = Math.abs(event.from.getTime() - cursorTime.value);
        if (diff < closestDistance) {
          closestDistance = diff;
          closest = { group: g, event: i };
        }
      }
    }
  }
  return closest;
});

const selectedEvent = computed<Event>(() => {
  const { group, event } = eventIndex.value;
  return groups[group][event];
});

const eventPosition = computed(() => {
  const start =
    ((selectedEvent.value.from.getTime() - timelineStartMs) / totalSpanMs) *
    containerHeight;
  const end =
    ((endOf(selectedEvent.value).getTime() - timelineStartMs) / totalSpanMs) *
    containerHeight;
  return {
    start: `${start}vh`,
    end: `${end}vh`,
    height: `${end - start}vh`,
  };
});

const eventYears = computed(() => [
  {
    y: eventPosition.value.start,
    key: selectedEvent.value.from.getFullYear(),
    display: selectedEvent.value.from.getFullYear(),
  },
  {
    y: eventPosition.value.end,
    key: selectedEvent.value.to?.getFullYear() ?? "now",
    display: selectedEvent.value.to?.getFullYear() ?? "Now",
  },
]);

function jumpTo(event: Event) {
  const targetTop =
    window.scrollY + containerRef.value!.getBoundingClientRect().top;
  const targetProgress = (event.from.getTime() - timelineStartMs) / totalSpanMs;
  const targetScroll =
    targetTop + containerRef.value!.offsetHeight * targetProgress;
  window.scrollTo({ top: targetScroll, behavior: "smooth" });
}

function eventYearLabel(event: Event) {
  const fromYear = event.from.getFullYear();
  const toYear = event.to?.getFullYear();
  return toYear ? `${fromYear}–${toYear}` : `${fromYear}–present`;
}
</script>

<template>
  <SectionHeader eyebrow="04 — TIMELINE" title="Where I've been.">
    <ol class="visually-hidden" aria-label="Timeline events">
      <li v-for="(event, i) in sortedEvents" :key="i">
        <button type="button" @click="jumpTo(event)">
          {{ event.title }} ({{ eventYearLabel(event) }})
        </button>
      </li>
    </ol>

    <p class="visually-hidden" aria-live="polite" aria-atomic="true">
      {{ selectedEvent.title }}, {{ eventYearLabel(selectedEvent) }}.
      {{ selectedEvent.description }}
    </p>

    <div
      ref="container"
      :style="{
        height: `${round((totalSpanMs / MS_IN_MONTH) * VH_PER_MONTH, 2)}vh`,
      }"
      class="timeline"
    >
      <div class="timeline__inner" aria-hidden="true">
        <div class="timeline__year">
          <motion.div :style="{ y }">
            <div class="type-label timeline__year-label">
              <YearLabel :key-label="cursorYear" :display="cursorYear" />
              <div class="timeline__year-mark"></div>
            </div>
          </motion.div>
        </div>
        <div class="timeline__rail">
          <div class="timeline__rail-track"></div>
          <div class="timeline__rail-cap"></div>
          <div class="timeline__rail-cap"></div>
          <motion.div
            :animate="{ y: eventPosition.start, height: eventPosition.height }"
            :transition="useReducedTransition({ type: 'tween' })"
            class="timeline__rail-mark"
          ></motion.div>
        </div>
        <div class="timeline__event-years">
          <motion.div
            v-for="(entry, i) in eventYears"
            :key="i"
            :animate="{ y: entry.y }"
            :transition="useReducedTransition({ type: 'tween' })"
          >
            <div
              class="type-label timeline__event-year"
              :class="{ first: i === 1 }"
            >
              <YearLabel :key-label="entry.key" :display="entry.display" />
            </div>
          </motion.div>
        </div>
        <div class="timeline__event-detail">
          <motion.div
            :animate="{ y: eventPosition.start }"
            :transition="useReducedTransition({ type: 'tween' })"
            class="timeline__event-body"
          >
            <div class="timeline__event-spacer">
              <div class="timeline__event-tick"></div>
            </div>
            <div>
              <FadeOnKey :key-label="selectedEvent.title" mode="wait">
                <h3>{{ selectedEvent.title }}</h3>
                <p>{{ selectedEvent.description }}</p>
              </FadeOnKey>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </SectionHeader>
</template>

<style scoped>
.type-label {
  font-variant-numeric: tabular-nums;
}

.timeline,
.timeline__inner {
  --height: v-bind(containerVh);
}

.timeline {
  margin-top: 2rem;
  padding-inline: 1rem;
  min-height: var(--height);
}

.timeline__inner {
  position: sticky;
  top: calc((100vh - v-bind(containerVh)) / 2);
  display: flex;
  width: 100%;
  height: var(--height);
  gap: 0.5rem;
}

.timeline__year-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transform: translateY(-50%);
}

.timeline__year-mark {
  width: 12px;
  height: 2px;
  background: var(--text);
}

.timeline__rail {
  position: relative;
  width: 12px;
  height: 100%;
}

.timeline__rail-track {
  position: absolute;
  right: 0;
  width: 6px;
  height: 100%;
  background-image: repeating-linear-gradient(
    to bottom,
    var(--border) 0 1px,
    transparent 1px 9px
  );
  border-right: 1px solid var(--border);
}

.timeline__rail-cap {
  position: absolute;
  right: 0px;
  width: 10px;
  height: 1px;
  background: var(--border);
}

.timeline__rail-cap:nth-child(2) {
  top: 100%;
}

.timeline__rail-mark {
  position: absolute;
  width: 100%;
  background: color-mix(in srgb, var(--accent) 20%, transparent);
  border-block: 1px solid var(--accent);
}

.timeline__event-year {
  position: absolute;
  color: var(--accent);
  transform: translateY(-50%);
}

.timeline__event-detail {
  width: 100%;
}

.timeline__event-body {
  display: flex;
  gap: 0.5rem;
}

.timeline__event-spacer {
  width: 6rem;
}

.timeline__event-tick {
  position: relative;
  display: flex;
  margin-top: 1rem;
  width: 100%;
  align-items: center;
}

.timeline__event-tick::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, var(--accent) 80%, transparent);
}

.timeline__event-tick::after {
  --size: 0.5rem;
  content: "";
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: var(--accent);
  border-radius: 50%;
}
</style>

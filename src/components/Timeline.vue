<script setup lang="ts">
import { useScroll, useMotionValueEvent } from "motion-v";
import { computed, ref, useTemplateRef } from "vue";
import SectionHeader from "../components/SectionHeading.vue";
import { events, groupEvents, endOf, type Event } from "../lib/timeline";
import { round } from "../lib/round";

const containerRef = useTemplateRef("container");
const { scrollYProgress } = useScroll({
  target: containerRef,
});

const sortedEvents = events
  .slice()
  .sort((a, b) => a.from.getTime() - b.from.getTime());
const groups = groupEvents(sortedEvents);

const timelineStartMs = groups[0][0]?.from.getTime() ?? 0;
const totalSpanMs = new Date().getTime() - timelineStartMs;
const cursorTime = ref(timelineStartMs);
const scrollPercent = ref(0);
useMotionValueEvent(scrollYProgress, "change", (progress) => {
  cursorTime.value = timelineStartMs + Math.round(totalSpanMs * progress);
  scrollPercent.value = round(progress * 100, 2);
});

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
const eventStartPercent = computed(() => {
  return round(
    ((selectedEvent.value.from.getTime() - timelineStartMs) / totalSpanMs) *
      100,
    2,
  );
});
const eventEndPercent = computed(() => {
  return round(
    ((endOf(selectedEvent.value).getTime() - timelineStartMs) / totalSpanMs) *
      100,
    2,
  );
});

const MS_IN_MONTH = 1000 * 60 * 60 * 24 * 30;
const VH_PER_MONTH = 4;

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
      :style="[
        { height: `${round((totalSpanMs / MS_IN_MONTH) * VH_PER_MONTH, 2)}vh` },
      ]"
      class="timeline"
    >
      <div class="timeline__inner" aria-hidden="true">
        <div class="timeline__year">
          <div
            :style="{ top: `${scrollPercent}%` }"
            class="type-label timeline__year-label"
          >
            <div>
              {{ new Date(cursorTime).getFullYear() }}
            </div>
            <div class="timeline__year-mark"></div>
          </div>
        </div>
        <div class="timeline__rail">
          <div class="timeline__rail-track"></div>
          <div class="timeline__rail-cap"></div>
          <div class="timeline__rail-cap bottom"></div>
          <div
            :style="{ top: `${eventStartPercent}%` }"
            class="timeline__rail-mark"
          ></div>
          <div
            :style="{ top: `${eventEndPercent}%` }"
            class="timeline__rail-mark"
          ></div>
        </div>
        <div class="timeline__event-years">
          <div
            :style="{ top: `${eventStartPercent}%` }"
            class="type-label timeline__event-year"
          >
            {{ selectedEvent.from.getFullYear() }}
          </div>
          <div
            :style="{ top: `${eventEndPercent}%` }"
            class="type-label timeline__event-year"
          >
            {{ selectedEvent.to?.getFullYear() ?? "Now" }}
          </div>
        </div>
        <div class="timeline__event-detail">
          <div
            :style="{ top: `${eventStartPercent}%` }"
            class="timeline__event-body"
          >
            <h3>{{ selectedEvent.title }}</h3>
            <p>{{ selectedEvent.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </SectionHeader>
</template>

<style scoped>
.timeline,
.timeline__inner {
  --height: 80vh;
}

.timeline {
  margin-top: 2rem;
  padding-inline: 1rem;
  min-height: var(--height);
}

.timeline__inner {
  position: sticky;
  top: 10vh;
  display: flex;
  width: 100%;
  height: var(--height);
}

.timeline__year {
  width: 4rem;
  height: 100%;
}

.timeline__year-label {
  position: absolute;
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

.timeline__event-years {
  margin-left: 1ch;
}

.timeline__rail-cap {
  position: absolute;
  right: 0px;
  width: 10px;
  height: 1px;
  background: var(--border);
}

.timeline__rail-cap.bottom {
  top: 100%;
}

.timeline__rail-mark {
  position: absolute;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: translateY(-50%);
}

.timeline__event-year {
  position: absolute;
  color: var(--accent);
  transform: translateY(-50%);
}

.timeline__event-detail {
  margin-left: 6rem;
}

.timeline__event-body {
  position: absolute;
  max-width: 72ch;
}
</style>

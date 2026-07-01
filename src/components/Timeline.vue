<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import {
  buildLayout,
  events,
  type Event,
  type TimelineGroup,
} from "../lib/timeline";

const rowRef = useTemplateRef<HTMLElement>("row");
const tooltipRef = useTemplateRef<HTMLElement>("tooltip");
const cursorYPx = ref(0);
const tooltipYPx = ref(0);
const cursorT = ref(0);

function syncRowCursor(rowRect: DOMRect, clientY: number) {
  const height = rowRect.height;
  if (height <= 0) return;
  const clamped = Math.min(Math.max(clientY - rowRect.top, 0), height);
  cursorYPx.value = clamped;
  cursorT.value = clamped / height;
}

function syncTooltip(rowRect: DOMRect, tooltipRect: DOMRect, clientY: number) {
  const height = rowRect.height;
  if (height <= 0) return;
  const max = Math.max(0, height - tooltipRect.height);
  tooltipYPx.value = Math.min(
    Math.max(clientY - rowRect.top - tooltipRect.height / 2, 0),
    max,
  );
}

function onRowMove(e: PointerEvent) {
  const row = rowRef.value;
  const tooltip = tooltipRef.value;
  if (!row || !tooltip) return;
  const rowRect = row.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  syncRowCursor(rowRect, e.clientY);
  syncTooltip(rowRect, tooltipRect, e.clientY);
}

const layout: TimelineGroup[] = buildLayout(events);

const clicked = ref<[number, number] | null>(null);

function onLaneClick(groupIndex: number, eventIndex: number) {
  clicked.value = [groupIndex, eventIndex];
}

function isSelected(groupIndex: number, eventIndex: number): boolean {
  return (
    clicked.value !== null &&
    clicked.value[0] === groupIndex &&
    clicked.value[1] === eventIndex
  );
}

const selected = computed(() => clicked.value !== null);
const selectedEvent = computed<Event | null>(() =>
  clicked.value === null
    ? null
    : (layout[clicked.value[0]]?.events[clicked.value[1]]?.ev ?? null),
);

const hoveredYear = computed(() => {
  if (layout.length == 0) {
    return 0;
  }
  const min = layout[0]!.min.getFullYear();
  const diff = layout[layout.length - 1]!.max.getFullYear() - min + 1;
  return min + Math.floor(diff * cursorT.value);
});

function isHovered(groupIndex: number, eventIndex: number): boolean {
  const group = layout[groupIndex];
  if (!group) return false;
  const item = group.events[eventIndex];
  if (!item) return false;
  const fromYear = item.ev.from.getFullYear();
  return fromYear <= hoveredYear.value && hoveredYear.value <= item.toYear;
}

const hoveredEvents = computed<[number, number][]>(() => {
  const out: [number, number][] = [];
  layout.forEach((group, groupIndex) => {
    group.events.forEach((_, eventIndex) => {
      if (isHovered(groupIndex, eventIndex)) {
        out.push([groupIndex, eventIndex]);
      }
    });
  });
  return out;
});
</script>

<template>
  <section class="timeline">
    <span class="section-rule" aria-hidden="true"></span>
    <h1 class="section-title">Timeline</h1>

    <div class="timeline__row" ref="row">
      <div>
        <div
          class="timeline-cursor"
          :style="[
            { transform: `translateY(${cursorYPx}px)` },
            selected ? { opacity: 0 } : {},
          ]"
        >
          <div class="timeline-cursor__row">
            <span class="timeline-cursor__year">{{ hoveredYear }}</span>
            <div class="timeline-cursor__tick"></div>
          </div>
        </div>
      </div>
      <div @pointermove="onRowMove">
        <div
          v-for="(group, groupIndex) in layout"
          :key="groupIndex"
          class="timeline__group"
          :style="{ height: `${group.heightRem}rem` }"
        >
          <div v-for="(item, eventIndex) in group.events" :key="eventIndex">
            <div
              class="timeline-lane"
              :style="{
                marginTop: `${item.topRem}rem`,
                height: `${item.heightRem}rem`,
              }"
            >
              <div
                class="timeline__line"
                :style="[
                  clicked === null && isHovered(groupIndex, eventIndex)
                    ? { background: 'var(--accent)' }
                    : null,
                  isSelected(groupIndex, eventIndex)
                    ? { background: 'var(--muted)' }
                    : { cursor: 'pointer' },
                ]"
                @click="onLaneClick(groupIndex, eventIndex)"
              ></div>
              <div
                class="timeline-lane__dates"
                :style="
                  isSelected(groupIndex, eventIndex)
                    ? { marginInline: '0.5rem' }
                    : { width: 0 }
                "
              >
                <div class="timeline-lane__from">
                  <span>-</span>
                  {{ item.ev.from.getFullYear() }}
                </div>
                <div class="timeline-lane__to">
                  <span>-</span>
                  {{ item.ev.to?.getFullYear() ?? "Present" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="timeline__tooltip-cell">
        <div v-if="selected">
          <h2 class="timeline__tooltip-title">
            {{ selectedEvent?.title }}
          </h2>
          <p>
            {{ selectedEvent?.description }}
          </p>
          <button @click="clicked = null">Back</button>
        </div>
        <div
          v-else
          ref="tooltip"
          class="timeline__tooltip"
          :style="{
            transform: `translateY(${tooltipYPx}px)`,
          }"
          title=""
        >
          <div
            v-for="[g, i] in hoveredEvents"
            :key="`${g}-${i}`"
            class="timeline__tooltip__entry"
            @click="onLaneClick(g, i)"
          >
            {{ layout[g]?.events[i]?.ev?.title }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline__row {
  display: flex;
}

.timeline-cursor {
  height: 0;
}

.timeline-cursor__row {
  display: flex;
  align-items: center;
  transform: translateY(-50%);
}

.timeline-cursor__year {
  font-family: monospace;
}

.timeline-cursor__tick {
  width: 0.5rem;
  height: 2px;
  background: var(--text);
  margin-inline: 0.5rem;
}

.timeline__group {
  display: flex;
  gap: 4px;
}

.timeline-lane {
  display: flex;
}

.timeline-lane__dates {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: monospace;
  overflow-x: clip;
}

.timeline-lane__from,
.timeline-lane__to {
  display: flex;
  gap: 0.5rem;
}

.timeline-lane__from {
  transform: TranslateY(-50%);
}
.timeline-lane__to {
  transform: TranslateY(50%);
}

.timeline__line {
  --width: 10px;
  width: var(--width);
  height: 100%;
  background: color-mix(in srgb, var(--text) 10%, transparent);
  border-radius: calc(var(--width) / 2);
  min-height: 0.5rem;
  transition: 200ms;
}

.timeline__line:hover {
  background: var(--accent);
}

.timeline__tooltip-title {
  font-family: var(--font-display);
  font-weight: 700;
}

.timeline__tooltip-cell {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 2rem;
}

.timeline__tooltip {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timeline__tooltip__entry {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--text);
  line-height: 1.3;
  border: 1px solid var(--muted);
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  background: var(--bg);
  cursor: pointer;
  transition: 200ms;
}

.timeline__tooltip__entry:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, var(--bg));
  transform: translateY(-2px);
}
</style>

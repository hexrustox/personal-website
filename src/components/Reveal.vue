<script setup lang="ts">
import { Motion, useReducedMotion } from "motion-v";
import { computed } from "vue";
import { useRevealCascade } from "../lib/cascade";

const props = withDefaults(
  defineProps<{
    offset?: number;
    duration?: number;
    delay?: number;
    cascade?: boolean;
  }>(),
  {
    offset: 24,
    duration: 0.6,
    delay: 0,
    cascade: false,
  },
);

const reduced = useReducedMotion();
const cascadeCtx = useRevealCascade();
const cascadeDelay = (props.cascade ? cascadeCtx.next() : 0) + props.delay;

const initial = computed(() => ({ opacity: 0, y: props.offset }));
const inView = computed(() =>
  reduced.value
    ? { opacity: 1, y: 0, transition: { duration: 0 } }
    : {
        opacity: 1,
        y: 0,
        transition: {
          duration: props.duration,
          delay: cascadeDelay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
);
</script>

<template>
  <Motion
    as="div"
    class="reveal"
    :initial="initial"
    :while-in-view="inView"
    :in-view-options="{ once: true, amount: 1 }"
  >
    <slot />
  </Motion>
</template>

<style scoped>
.reveal {
  will-change: transform, opacity;
}
</style>

<script setup lang="ts">
import { Motion } from "motion-v";
import { computed } from "vue";
import { useRevealCascade } from "../lib/cascade";
import {
  MOTION_EASE,
  INVIEW_ONCE_FULL,
  useReducedTransition,
} from "../lib/motion";

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

const cascadeCtx = useRevealCascade();
const cascadeDelay = (props.cascade ? cascadeCtx.next() : 0) + props.delay;

const initial = computed(() => ({ opacity: 0, y: props.offset }));
const inView = computed(() => ({ opacity: 1, y: 0 }));
</script>

<template>
  <Motion
    class="reveal"
    :initial="initial"
    :while-in-view="inView"
    :in-view-options="INVIEW_ONCE_FULL"
    :transition="
      useReducedTransition({
        duration: props.duration,
        delay: cascadeDelay,
        ease: MOTION_EASE,
      })
    "
  >
    <slot />
  </Motion>
</template>

<style scoped>
.reveal {
  will-change: transform, opacity;
}
</style>

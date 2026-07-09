<script setup lang="ts">
import { useRevealCascade } from "../lib/cascade";
import { MOTION_EASE, useReducedTransition } from "../lib/motion";
import type { VariantType, Easing } from "motion-v";

const props = withDefaults(
  defineProps<{
    initial?: VariantType;
    animate?: VariantType;
    duration?: number;
    delay?: number;
    ease?: Easing | Easing[];
    cascade?: boolean;
    disable?: boolean;
  }>(),
  {
    duration: 0.6,
    delay: 0.3,
    cascade: false,
    disable: false,
  },
);

const cascadeCtx = useRevealCascade();
const cascadeDelay = (props.cascade ? cascadeCtx.next() : 0) + props.delay;
</script>

<template>
  <Motion
    class="reveal"
    :initial="initial ?? { opacity: 0, y: 12 }"
    :while-in-view="animate ?? { opacity: 1, y: 0 }"
    :in-view-options="{ once: true }"
    :transition="
      useReducedTransition({
        duration: props.duration,
        delay: cascadeDelay,
        ease: props.ease ?? MOTION_EASE,
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

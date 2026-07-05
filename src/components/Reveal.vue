<script setup lang="ts">
import { useRevealCascade } from "@lib/cascade";
import { MOTION_EASE, useReducedTransition } from "@lib/motion";
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
    delay: 0,
    cascade: false,
    disable: false,
  },
);

const cascadeCtx = useRevealCascade();
const cascadeDelay = (props.cascade ? cascadeCtx.next() : 0) + props.delay;
</script>

<template>
  <Motion
    v-if="!disable"
    class="reveal"
    :initial="initial ?? { opacity: 0, y: 12 }"
    :while-in-view="animate ?? { opacity: 1, y: 0 }"
    :in-view-options="{ once: true, amount: 1 }"
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
  <div v-else>
    <slot />
  </div>
</template>

<style scoped>
.reveal {
  will-change: transform, opacity;
}
</style>

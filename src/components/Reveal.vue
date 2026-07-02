<script setup lang="ts">
import { Motion, useReducedMotion } from "motion-v";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    offset?: number;
    duration?: number;
    delay?: number;
  }>(),
  {
    offset: 24,
    duration: 0.6,
    delay: 0,
  },
);

const reduced = useReducedMotion();

const initial = computed(() => ({ opacity: 0, y: props.offset }));
const inView = computed(() =>
  reduced.value
    ? { opacity: 1, y: 0 }
    : {
        opacity: 1,
        y: 0,
        transition: {
          duration: props.duration,
          delay: props.delay,
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

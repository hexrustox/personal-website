<script setup lang="ts">
import {
  REVEAL_CASCADE_KEY,
  useRevealCascade,
  type CascadeContext,
} from "../lib/cascade";
import { REVEAL_DEFAULT_START, REVEAL_DEFAULT_STEP } from "../lib/motion";
import { provide, ref } from "vue";

const props = withDefaults(
  defineProps<{
    start?: number;
    step?: number;
  }>(),
  {
    start: REVEAL_DEFAULT_START,
    step: REVEAL_DEFAULT_STEP,
  },
);

const parent = useRevealCascade();
const i = ref(0);
const startRef = ref(props.start);
const stepRef = ref(props.step);

const ctx: CascadeContext = {
  next: () => {
    if (i.value === 0) {
      startRef.value += parent.next();
    }
    const v = startRef.value + i.value * stepRef.value;
    i.value += 1;
    return v;
  },
};

provide(REVEAL_CASCADE_KEY, ctx);
</script>

<template>
  <slot />
</template>

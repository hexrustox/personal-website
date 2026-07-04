<script setup lang="ts">
import { useReducedTransition } from "../lib/motion";
import { motion, AnimatePresence } from "motion-v";
import type { Transition } from "motion-v";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    keyLabel: string | number;
    mode?: "wait" | "popLayout" | "sync";
    transition?: Transition;
  }>(),
  {
    mode: "sync",
    transition: undefined,
  },
);
</script>

<template>
  <AnimatePresence :mode="mode">
    <motion.div
      :key="keyLabel"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      :transition="useReducedTransition(props.transition)"
    >
      <slot />
    </motion.div>
  </AnimatePresence>
</template>

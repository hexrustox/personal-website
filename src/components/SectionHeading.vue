<script setup lang="ts">
import { useReducedTransition } from "../lib/motion";
import TextSplit from "./TextSplit.vue";
import { motion } from "motion-v";

let props = defineProps<{
  eyebrow: string;
  title: string;
}>();
</script>

<template>
  <section class="section-heading">
    <motion.span
      class="type-eyebrow"
      :initial="{ opacity: 0 }"
      :while-in-view="{ opacity: 1 }"
      :in-view-options="{ once: true, amount: 1 }"
      :transition="useReducedTransition({ duration: 0.3, delay: 0.2 })"
    >
      {{ eyebrow }}
    </motion.span>
    <TextSplit :text="title" tag="h2" class="section-heading__title" />
    <slot />
  </section>
</template>

<style scoped>
.section-heading {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>

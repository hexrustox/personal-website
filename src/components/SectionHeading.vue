<script setup lang="ts">
import { useReducedTransition } from "@lib/motion";

let props = defineProps<{
  eyebrow: string;
  title: string;
}>();
</script>

<template>
  <section class="section-heading">
    <Motion
      as="span"
      class="type-eyebrow"
      :initial="{ opacity: 0 }"
      :while-in-view="{ opacity: 1 }"
      :in-view-options="{ once: true, amount: 1 }"
      :transition="useReducedTransition({ duration: 0.3, delay: 0.2 })"
    >
      {{ eyebrow }}
    </Motion>
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

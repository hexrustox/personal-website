<script setup lang="ts">
import { useId } from "vue";

let props = defineProps<{
  eyebrow: string;
  title: string;
}>();

const headingId = useId();
</script>

<template>
  <section class="section-heading" :aria-labelledby="headingId">
    <header>
      <span class="type-eyebrow">{{ eyebrow }}</span>
    </header>
    <h2 :id="headingId">{{ title }}</h2>

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

<script setup lang="ts">
let props = defineProps<{
  eyebrow: string;
  title: string;
}>();
</script>

<template>
  <section class="section-heading">
    <header class="section-heading__head">
      <p class="type-eyebrow">{{ eyebrow }}</p>
    </header>

    <h2>{{ title }}</h2>

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

.section-heading__head {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>

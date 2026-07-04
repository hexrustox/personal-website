<script setup lang="ts">
import FadeOnKey from "./FadeOnKey.vue";

defineProps<{
  keyLabel: string | number;
  display: string | number;
}>();
</script>

<template>
  <FadeOnKey :key-label="keyLabel" mode="popLayout">{{ display }}</FadeOnKey>
</template>

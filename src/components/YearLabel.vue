<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";

defineProps<{
  keyLabel: string | number;
  display: string | number;
}>();
</script>

<template>
  <AnimatePresence mode="popLayout">
    <motion.span
      :key="keyLabel"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
    >
      {{ display }}
    </motion.span>
  </AnimatePresence>
</template>

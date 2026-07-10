<script setup lang="ts">
import { MOTION_EASE, useReducedTransition } from "../lib/motion";
import { useInView, useAnimate } from "motion-v";
import { computed, ref, useTemplateRef, watch } from "vue";

const props = defineProps<{
  text: string;
  tag: string;
}>();

const lines = computed(() => props.text.split("\n"));
const hasAnimated = ref(false);

const [scope, animate] = useAnimate();
const div = useTemplateRef("view");
const inView = useInView(div, { once: true, amount: 1 });

watch(inView, async (visible) => {
  if (!visible || hasAnimated.value) return;
  hasAnimated.value = true;
  await animate(
    ".text-split__char-inner",
    { opacity: [0, 1], y: ["100%", "0%"] },
    useReducedTransition({
      duration: 0.6,
      ease: MOTION_EASE,
      delay: (i) => i * 0.02,
    }),
  );
});
</script>

<template>
  <div ref="view">
    <component :is="tag" ref="scope" class="text-split">
      <span v-for="(line, li) in lines" :key="li" class="text-split__line">
        <span
          v-for="(c, ci) in Array.from(line)"
          :key="li + ':' + ci"
          class="text-split__char"
        >
          <span class="text-split__char-inner">{{
            c === " " ? "\u00A0" : c
          }}</span>
        </span>
      </span>
    </component>
  </div>
</template>

<style scoped>
.text-split {
  margin: 0;
  white-space: pre;
}

.text-split__line {
  display: block;
}

.text-split__char {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  line-height: inherit;
}

.text-split__char-inner {
  display: inline-block;
  will-change: transform, opacity;
}
</style>

<script setup lang="ts">
import { MOTION_EASE, useReducedTransition } from "../lib/motion";
import { useInView, useAnimate } from "motion-v";
import { computed, useTemplateRef, ref, watch, useId } from "vue";

let props = defineProps<{
  eyebrow: string;
  title: string;
}>();

const headingId = useId();
const viewRef = useTemplateRef<HTMLHeadingElement>("view");

const chars = computed(() => Array.from(props.title));
const hasAnimated = ref(false);

const inView = useInView(viewRef, { once: true, amount: 1 });
const [scope, animate] = useAnimate();

watch(inView, async (visible) => {
  if (!visible || hasAnimated.value) return;
  hasAnimated.value = true;
  await animate(
    "header",
    { opacity: 1 },
    useReducedTransition({ duration: 0.3, delay: 0.2 }),
  );
  await animate(
    ".section-heading__char-inner",
    { opacity: [0, 1], y: ["100%", "0%"] },
    useReducedTransition({
      duration: 0.6,
      ease: MOTION_EASE,
      delay: (i) => {
        return i * 0.02;
      },
    }),
  );
});
</script>

<template>
  <section class="section-heading" :aria-labelledby="headingId" ref="scope">
    <header>
      <span class="type-eyebrow">{{ eyebrow }}</span>
    </header>
    <h2 :id="headingId" :aria-label="title" class="section-heading__title">
      <span
        v-for="(c, i) in chars"
        :key="i"
        class="section-heading__char"
        aria-hidden="true"
      >
        <span class="section-heading__char-inner">{{
          c === " " ? "\u00A0" : c
        }}</span>
      </span>
      <div ref="view" class="view"></div>
    </h2>

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

header {
  opacity: 0;
}

.section-heading__title {
  position: relative;
}
.section-heading__char {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  line-height: inherit;
}

.section-heading__char-inner {
  display: inline-block;
  will-change: transform, opacity;
  transform: translateY(100%);
  opacity: 0;
}

.view {
  position: absolute;
  width: 100%;
  height: 300%;
}
</style>

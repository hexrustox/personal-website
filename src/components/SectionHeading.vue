<script setup lang="ts">
import { computed, useTemplateRef, ref, watch, useId } from "vue";
import { useInView, useAnimate, useReducedMotion } from "motion-v";

let props = defineProps<{
  eyebrow: string;
  title: string;
}>();

const headingId = useId();
const sectionRef = useTemplateRef<HTMLHeadingElement>("section");

const chars = computed(() => Array.from(props.title));
const hasAnimated = ref(false);

const inView = useInView(sectionRef, { once: true, amount: 0.8 });
const reduced = useReducedMotion();
const [scope, animate] = useAnimate();

watch(inView, async (visible) => {
  if (!visible || hasAnimated.value) return;
  hasAnimated.value = true;
  if (reduced.value) {
    await animate(
      ".section-heading__char-inner",
      { opacity: 1, y: "0%" },
      { duration: 0 },
    );
    return;
  }
  await animate(
    ".section-heading__char-inner",
    { opacity: [0, 1], y: ["100%", "0%"] },
    {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: (i) => {
        return i * 0.02;
      },
    },
  );
});
</script>

<template>
  <section ref="section" class="section-heading" :aria-labelledby="headingId">
    <header>
      <span class="type-eyebrow">{{ eyebrow }}</span>
    </header>
    <h2
      ref="scope"
      :id="headingId"
      :aria-label="title"
      class="section-heading__title"
    >
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

.section-heading__title {
  display: block;
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
</style>

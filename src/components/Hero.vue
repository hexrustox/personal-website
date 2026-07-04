<script setup lang="ts">
import { tagline, title } from "../lib/hero";
import { useReducedTransition } from "../lib/motion";
import Reveal from "./Reveal.vue";
import RevealGroup from "./RevealGroup.vue";
import TextSplit from "./TextSplit.vue";
import { motion, AnimatePresence, useReducedMotion } from "motion-v";
import { computed, onMounted, onUnmounted, ref } from "vue";

const reduced = useReducedMotion();
const scrolled = ref(false);
let raf = 0;

console.log(reduced.value);
function onScroll() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    scrolled.value = window.scrollY > 0;
  });
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  if (raf) cancelAnimationFrame(raf);
});

const ctaAnimate = computed(() =>
  reduced.value ? {} : { opacity: [1, 0.6, 1], y: [-8, 0, -8] },
);
</script>

<template>
  <section aria-label="Introduction">
    <RevealGroup :start="1" :step="0.5">
      <div class="hero">
        <div class="hero__stage">
          <TextSplit :text="title" tag="h1" class="hero__title" />
          <Reveal cascade>
            <h3 class="hero__tagline">{{ tagline }}</h3>
          </Reveal>
        </div>
        <div class="hero__cta">
          <Reveal cascade>
            <AnimatePresence>
              <motion.div
                v-if="!scrolled"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :exit="{ opacity: 0 }"
              >
                <motion.div
                  :animate="ctaAnimate"
                  :transition="
                    useReducedTransition({
                      duration: 2,
                      delay: 4,
                      repeat: Infinity,
                    })
                  "
                >
                  Scroll Down
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </RevealGroup>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  align-items: center;
}

.hero__stage {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 3vh, 2.5rem);
  text-align: center;
}

.hero__tagline {
  max-width: 48ch;
  opacity: 0.8;
}

.hero__cta {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 2rem;
}
</style>

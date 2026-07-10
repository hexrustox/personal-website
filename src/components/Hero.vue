<script setup lang="ts">
import { tagline, title } from "../data/hero";
import { useReducedTransition } from "../lib/motion";
import { Icon } from "@iconify/vue";
import { useReducedMotion } from "motion-v";
import { computed, onMounted, onUnmounted, ref } from "vue";

const reduced = useReducedMotion();
const scrolled = ref(false);
let raf = 0;

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
  <section>
    <RevealGroup :start="1" :step="0.5">
      <div class="hero">
        <div class="hero__stage">
          <TextSplit :text="title" tag="h1" class="hero__title" />
          <Reveal cascade>
            <p class="hero__tagline">{{ tagline }}</p>
          </Reveal>
        </div>
        <div class="hero__cta">
          <Reveal cascade>
            <AnimatePresence>
              <Motion
                as="div"
                v-if="!scrolled"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :exit="{ opacity: 0 }"
              >
                <Motion
                  as="div"
                  :animate="ctaAnimate"
                  :transition="
                    useReducedTransition({
                      duration: 2,
                      delay: 4,
                      repeat: Infinity,
                    })
                  "
                >
                  <div class="hero__cta-label">
                    <div>Scroll Down</div>
                    <div class="hero__cta-icon">
                      <Icon icon="basil:caret-down-solid" />
                    </div>
                  </div>
                </Motion>
              </Motion>
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
  max-width: clamp(20rem, 60vw, 48ch);
  font-size: clamp(1rem, 1.6vw, 1.25rem);
  line-height: 1.6;
  color: var(--muted);
}

.hero__cta {
  position: absolute;
  inset-inline: 0;
  width: auto;
  display: flex;
  justify-content: center;
  bottom: 3rem;
}

@media (max-width: 360px) {
  .hero {
    padding-inline: 0.5rem;
  }
  .hero__stage {
    gap: clamp(1rem, 2vh, 1.5rem);
  }
  .hero__cta {
    bottom: 1rem;
  }
}

.hero__cta-label {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__cta-icon {
  display: flex;
  font-size: 1.75rem;
}
</style>

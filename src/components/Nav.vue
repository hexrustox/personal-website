<script setup lang="ts">
import { navItems, useActiveSection } from "@lib/nav";
import { useAnimate, useReducedMotion } from "motion-v";
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";

const activeId = useActiveSection(navItems.map((i) => i.id));

const listEl = useTemplateRef<HTMLOListElement>("listEl");
const itemRefs = useTemplateRef<HTMLLIElement[]>("itemRefs");
const [indicatorEl, animate] = useAnimate<HTMLSpanElement>();
const reduceMotion = useReducedMotion();

function updateIndicator() {
  const list = listEl.value;
  const items = itemRefs.value;
  if (!list || !items || !activeId.value) return;

  const index = navItems.findIndex((i) => i.id === activeId.value);
  if (index < 0) return;

  const item = items[index];
  if (!item) return;

  const link = item.querySelector(".nav__link");
  if (!(link instanceof HTMLElement)) return;

  const listRect = list.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  const x = linkRect.left - listRect.left;
  const width = linkRect.width;

  if (reduceMotion.value) {
    animate(
      indicatorEl.value,
      { x: `${x}px`, width: `${width}px` },
      { duration: 0 },
    );
  } else {
    animate(indicatorEl.value, { x: `${x}px`, width: `${width}px` });
  }
}

onMounted(() => {
  updateIndicator();
  window.addEventListener("resize", updateIndicator);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIndicator);
});

watch(activeId, updateIndicator);
</script>

<template>
  <nav class="nav">
    <Reveal :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :delay="2">
      <ol class="nav__list" ref="listEl">
        <li
          v-for="item in navItems"
          :key="item.id"
          class="nav__item"
          ref="itemRefs"
        >
          <a :href="item.href" class="nav__link">
            {{ item.label }}
          </a>
        </li>
        <span ref="indicatorEl" class="nav__indicator" aria-hidden="true" />
      </ol>
    </Reveal>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  padding-block: 0.5rem;
  backdrop-filter: blur(4px);
  z-index: 1;
}

.nav__list {
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: clamp(0.5rem, 2vw, 2rem);
  list-style: none;
}

.nav__link {
  color: inherit;
  text-decoration: none;
  padding-inline: 0.5rem;
}

.nav__indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: var(--accent);
  pointer-events: none;
}
</style>

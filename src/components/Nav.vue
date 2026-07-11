<script setup lang="ts">
import { useReducedTransition } from "../lib/motion";
import { navItems, useActiveSection } from "../lib/nav";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useAnimate } from "motion-v";
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from "vue";

const { matches: isMobile } = useMediaQuery("(max-width: 640px)");
const open = ref(false);
const originalOverflow = ref<string | null>(null);

const activeId = useActiveSection(navItems.map((i) => i.id));

const listEl = useTemplateRef<HTMLOListElement>("listEl");
const itemRefs = useTemplateRef<HTMLLIElement[]>("itemRefs");
const [indicatorEl, animate] = useAnimate<HTMLSpanElement>();

const toggleEl = useTemplateRef<HTMLButtonElement>("toggleEl");
const mobileLinks = useTemplateRef<HTMLAnchorElement[]>("mobileLinks");

function updateIndicator(transition = true) {
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

  animate(
    indicatorEl.value,
    { x: `${x}px`, width: `${width}px` },
    transition ? undefined : { duration: 0 },
  );
}

function close() {
  open.value = false;
}

function onTrapKey(e: KeyboardEvent) {
  if (e.key === "Escape") {
    e.preventDefault();
    close();
    return;
  }
  if (e.key !== "Tab") return;

  const focusables = [toggleEl.value, ...(mobileLinks.value ?? [])].filter(
    (el): el is HTMLButtonElement | HTMLAnchorElement =>
      el !== null && el !== undefined,
  );
  if (focusables.length === 0) return;

  const first = focusables[0]!;
  const last = focusables[focusables.length - 1]!;
  const active = document.activeElement;

  if (e.shiftKey) {
    if (
      active === first ||
      !(focusables as HTMLElement[]).includes(active as HTMLElement)
    ) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (
      active === last ||
      !(focusables as HTMLElement[]).includes(active as HTMLElement)
    ) {
      e.preventDefault();
      first.focus();
    }
  }
}

watch(open, async (v) => {
  if (typeof window === "undefined") return;
  if (v) {
    window.addEventListener("keydown", onTrapKey);
    originalOverflow.value = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    await nextTick();
    mobileLinks.value?.[0]?.focus();
  } else {
    window.removeEventListener("keydown", onTrapKey);
    document.body.style.overflow = originalOverflow.value ?? "";
    await nextTick();
    toggleEl.value?.focus();
  }
});

watch(isMobile, (v) => {
  if (!v) close();
});

onMounted(() => {
  updateIndicator();
  window.addEventListener("resize", () => {
    updateIndicator(false);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {
    updateIndicator(false);
  });
  window.removeEventListener("keydown", onTrapKey);
});

watch(activeId, () => {
  updateIndicator();
});
</script>

<template>
  <nav class="nav" aria-label="Main">
    <template v-if="!isMobile">
      <Reveal :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :delay="2">
        <ol class="nav__list" ref="listEl">
          <li
            v-for="item in navItems"
            :key="item.id"
            class="nav__item"
            ref="itemRefs"
          >
            <a
              :href="item.href"
              class="nav__link"
              :aria-current="item.id === activeId ? 'location' : undefined"
            >
              {{ item.label }}
            </a>
          </li>
          <span ref="indicatorEl" class="nav__indicator" aria-hidden="true" />
        </ol>
      </Reveal>
    </template>

    <template v-else>
      <button
        ref="toggleEl"
        class="nav__toggle"
        type="button"
        :aria-label="open ? 'Close navigation menu' : 'Open navigation menu'"
        :aria-expanded="open"
        aria-controls="nav-mobile"
        @click="open = !open"
      >
        <Motion
          v-if="!open"
          key="menu"
          class="nav__toggle-icon"
          :initial="{ opacity: 0, x: -16 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="useReducedTransition()"
        >
          <Icon name="menu" />
        </Motion>
        <Motion
          v-if="open"
          key="close"
          class="nav__toggle-icon nav__toggle-icon--absolute"
          :initial="{ opacity: 0, x: 16 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="useReducedTransition()"
        >
          <Icon name="close" />
        </Motion>
      </button>

      <AnimatePresence>
        <Motion
          v-if="open"
          id="nav-mobile"
          class="nav__overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          tabindex="-1"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="useReducedTransition()"
          @click.self="close"
        >
          <ol class="nav__list--mobile">
            <li
              v-for="(item, i) in navItems"
              :key="item.id"
              :class="['nav__item--mobile', { active: item.id === activeId }]"
            >
              <Motion
                :initial="{ opacity: 0, x: -16 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="
                  useReducedTransition({
                    delay: 0.05 + i * 0.04,
                  })
                "
              >
                <a
                  :href="item.href"
                  ref="mobileLinks"
                  class="nav__link--mobile"
                  :aria-current="item.id === activeId ? 'location' : undefined"
                  @click="close"
                >
                  {{ item.label }}
                </a>
              </Motion>
            </li>
          </ol>
        </Motion>
      </AnimatePresence>
    </template>
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

@media (max-width: 640px) {
  .nav {
    backdrop-filter: none;
  }
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

.nav__toggle {
  position: fixed;
  top: calc(0.5rem + env(safe-area-inset-top));
  right: calc(0.5rem + env(safe-area-inset-right));
  z-index: 1;
  cursor: pointer;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}

.nav__toggle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.75rem;
}

.nav__toggle-icon--absolute {
  position: absolute;
  inset: 0;
}

.nav__overlay {
  position: fixed;
  inset: 0;
  height: 100dvh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: clamp(4.5rem, 14vh, 6.5rem) clamp(1rem, 6vw, 2rem)
    clamp(1rem, 6vw, 2rem);
}

.nav__list--mobile {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav__item--mobile {
  padding-block: 0.1rem;
  padding-left: 1rem;
}

.nav__item--mobile.active {
  border-left: 2px solid var(--accent);
}

.nav__link--mobile {
  display: inline-block;
  color: inherit;
  text-decoration: none;
  font-family: var(--font-display);
  font-size: clamp(2rem, 8vw, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
}
</style>

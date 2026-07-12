<script setup lang="ts">
import { useReducedTransition } from "../lib/motion";
import { navItems, useActiveSection } from "../lib/nav";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useAnimate } from "motion-v";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from "vue";

const { matches: isMobile } = useMediaQuery("(max-width: 640px)");

const activeId = useActiveSection(navItems.map((i) => i.id));

const listEl = useTemplateRef<HTMLOListElement>("listEl");
const itemRefs = useTemplateRef<HTMLLIElement[]>("itemRefs");
const [indicatorEl, animate] = useAnimate<HTMLSpanElement>();

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
    useReducedTransition(transition ? undefined : { duration: 0 }),
  );
}

function onResize() {
  updateIndicator(false);
}

onMounted(() => {
  updateIndicator();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

watch(activeId, () => {
  updateIndicator();
});

const dialogEl = useTemplateRef<HTMLDialogElement>("dialogEl");
const toggleEl = useTemplateRef<HTMLButtonElement>("toggleEl");
const dialogOpen = ref(false);
const dialogDelay = ref(0.2);
const dialogDelayMs = computed(() => `${dialogDelay.value * 1000}ms`);

watch(isMobile, (is) => {
  if (!is) dialogEl.value?.close();
});
</script>

<template>
  <Reveal :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :delay="2">
    <nav v-if="!isMobile" class="nav" aria-label="Main">
      <div class="nav__inner">
        <div class="nav__span">
          <img src="/logo.svg" aria-hidden="true" class="nav__logo" />
        </div>
        <ol class="nav__list" ref="listEl">
          <li v-for="item in navItems" ref="itemRefs">
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
        <div class="nav__span" />
      </div>
    </nav>
    <template v-else>
      <button
        ref="toggleEl"
        class="nav-dialog__toggle"
        aria-label="Open menu"
        command="show-modal"
        commandfor="nav-dialog"
        @click="
          () => {
            dialogOpen = true;
          }
        "
      >
        <Icon name="menu" />
      </button>
      <dialog
        ref="dialogEl"
        id="nav-dialog"
        class="nav-dialog"
        aria-label="Main navigation"
        @close="
          () => {
            toggleEl?.focus();
            dialogOpen = false;
          }
        "
      >
        <div class="nav-dialog__inner">
          <div class="a">
            <img src="/logo.svg" aria-hidden="true" class="nav__logo" />
          </div>
          <ol class="nav-dialog__list">
            <Motion
              as="li"
              v-for="(item, i) in navItems"
              :variants="{
                open: { x: 0, opacity: 1 },
                close: { x: 24, opacity: 0 },
              }"
              :animate="dialogOpen ? 'open' : 'close'"
              :transition="
                useReducedTransition({ delay: i * 0.05 + dialogDelay })
              "
            >
              <a
                :href="item.href"
                :class="[
                  'nav-dialog__link',
                  { 'nav-dialog__link--active': item.id === activeId },
                ]"
                :aria-current="item.id === activeId ? 'location' : undefined"
                @click="dialogEl?.close()"
              >
                {{ item.label }}
              </a>
            </Motion>
          </ol>
        </div>
        <button
          class="nav-dialog__close"
          aria-label="Close menu"
          command="close"
          commandfor="nav-dialog"
        >
          <Icon name="close" />
        </button>
      </dialog>
    </template>
  </Reveal>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  backdrop-filter: blur(4px);
  z-index: 1;
}

@media (max-width: 640px) {
  .nav {
    backdrop-filter: none;
  }
}

.nav__inner {
  padding-block: 0.5rem;
  display: flex;
  align-items: center;
  padding-inline: clamp(0.5rem, 2vw, 1rem);
}

.nav__span {
  width: 100%;
}

.nav__logo {
  display: block;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
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
  padding: 0 0.5rem;
  font-size: 1.1rem;
  color: inherit;
  text-decoration: none;
}

.nav__indicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  height: 2px;
  width: 0;
  background: var(--accent);
  pointer-events: none;
}

.nav-dialog__toggle {
  position: fixed;
  z-index: 1;
}

.nav-dialog__toggle,
.nav-dialog__close,
.a {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-dialog__toggle,
.nav-dialog__close {
  top: max(0.5rem, env(safe-area-inset-top));
  right: max(0.5rem, env(safe-area-inset-right));
  font-size: 1.75rem;
  line-height: 0;
}

.nav-dialog {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-inline-size: none;
  max-block-size: none;
  min-inline-size: 0;
  min-block-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: var(--bg);
  z-index: 1;

  transition:
    display v-bind(dialogDelayMs) allow-discrete,
    overlay v-bind(dialogDelayMs) allow-discrete,
    opacity v-bind(dialogDelayMs);
  opacity: 0;

  &[open] {
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }
}

.nav-dialog::backdrop {
  display: none;
}

.nav-dialog__close {
  position: absolute;
}

.nav-dialog__inner {
  position: relative;
  top: max(0.5rem, env(safe-area-inset-top));
  padding-inline: max(0.5rem, env(safe-area-inset-left))
    max(0.5rem, env(safe-area-inset-right));
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.nav-dialog__list {
  padding: 0;
  padding-inline: 1rem;
  list-style: none;
}

.nav-dialog__link {
  padding: 0 1rem;
  font-size: 2rem;
  color: inherit;
  text-decoration: none;
}

.nav-dialog__link--active {
  border-left: 2px solid var(--accent);
}
</style>

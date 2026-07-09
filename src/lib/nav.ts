import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

export type NavItem = {
  id: string;
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { id: "about", href: "#about", label: "About" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "timeline", href: "#timeline", label: "Timeline" },
  { id: "contact", href: "#contact", label: "Contact" },
];

export function useActiveSection(ids: string[]): Ref<string | undefined> {
  const activeId = ref<string | undefined>(ids[0]);
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<Element, number>();

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target, entry.intersectionRatio);
          } else {
            visible.delete(entry.target);
          }
        }

        if (visible.size === 0) return;

        let bestEl: Element | undefined;
        let bestRatio = -1;
        for (const [el, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestEl = el;
          }
        }

        if (bestEl && bestEl instanceof HTMLElement && bestEl.id) {
          activeId.value = bestEl.id;
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return activeId;
}

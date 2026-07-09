import { onMounted, onUnmounted, ref } from "vue";

export function useMediaQuery(query: string) {
  const matches = ref(false);
  let mql: MediaQueryList | undefined;
  const onChange = (e: MediaQueryListEvent) => {
    matches.value = e.matches;
  };
  onMounted(() => {
    mql = window.matchMedia(query);
    matches.value = mql.matches;
    mql.addEventListener("change", onChange);
  });
  onUnmounted(() => {
    mql?.removeEventListener("change", onChange);
  });
  return matches;
}

import { inject, type InjectionKey } from "vue";

export type CascadeContext = {
  next: () => number;
};

export const REVEAL_CASCADE_KEY: InjectionKey<CascadeContext> = Symbol(
  "reveal-cascade",
) as InjectionKey<CascadeContext>;

export const noopCascade: CascadeContext = { next: () => 0 };

export function useRevealCascade(): CascadeContext {
  return inject(REVEAL_CASCADE_KEY, noopCascade);
}

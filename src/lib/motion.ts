import { useReducedMotion } from "motion-v";
import type { AnimationOptions, Transition, VariantType } from "motion-v";

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const NO_MOTION_TRANSITION: Transition = { duration: 0 };

export const REVEAL_DEFAULT_STEP = 0.25;

export type Direction = 1 | -1;

export function useReducedTransition(
  t?: AnimationOptions,
): AnimationOptions | undefined {
  const reduced = useReducedMotion();
  return reduced.value ? NO_MOTION_TRANSITION : t;
}

export function slideFadeVariants(offsetPx = 12): {
  [key: string]: VariantType | ((custom: any) => VariantType);
} {
  return {
    enter: (dir: Direction) => ({
      opacity: 0,
      y: dir === 1 ? offsetPx : -offsetPx,
    }),
    center: { opacity: 1, y: 0 },
    exit: (dir: Direction) => ({
      opacity: 0,
      y: dir === 1 ? -offsetPx : offsetPx,
    }),
  };
}

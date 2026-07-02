<script setup lang="ts"></script>

<template>
  <a>
    <div class="link">
      <slot />
      <span class="link__arrow" aria-hidden="true">↗</span>
    </div>
  </a>
</template>

<style scoped>
a {
  color: inherit;
}

.link {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 0.5ch;
  text-decoration: none;
}

.link::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 2px;
  background: var(--accent);
  left: 0;
  bottom: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: 200ms;
}

a:hover .link::after {
  transform: scaleX(1);
}

.link__arrow {
  display: inline-block;
}
</style>

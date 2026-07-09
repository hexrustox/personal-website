<script setup lang="ts"></script>

<template>
  <a>
    <div class="link">
      <slot />
      <span class="link__arrow">↗</span>
    </div>
  </a>
</template>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
  min-height: 44px;
  padding-block: 0.75rem;
}

.link {
  position: relative;
  display: inline-flex;
  gap: 0.5ch;
}

.link::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 2px;
  bottom: 0;
  background: var(--accent);
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

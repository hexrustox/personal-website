<script setup lang="ts">
import { contactMethods } from "../lib/contact";
</script>

<template>
  <section class="contact">
    <span class="section-rule" aria-hidden="true"></span>
    <h1 class="section-title">Contact</h1>
    <ul class="contact__list">
      <li
        v-for="method in contactMethods"
        :key="method.name"
        class="contact__item"
      >
        <a
          class="contact__link"
          :href="method.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="contact__name">{{ method.name }}</span>
          <span class="contact__handle">{{ method.handle }} &rarr;</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.contact {
  width: 100%;
}

.contact__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 32rem;
}

.contact__item {
  border: 1px solid var(--muted);
  border-radius: 4px;
  background: transparent;
  transition:
    border-color 150ms ease,
    background 150ms ease;
}

.contact__item:hover {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, var(--bg));
}

.contact__link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--text);
}

.contact__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: 0.02em;
  color: var(--text);
}

.contact__handle {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--muted);
  transition: color 150ms ease;
}

.contact__item:hover .contact__handle {
  color: var(--accent);
}
</style>

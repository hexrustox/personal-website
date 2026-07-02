<script setup lang="ts">
import SectionHeader from "../components/SectionHeading.vue";
import { contactMethods, contact } from "../lib/contact";
</script>

<template>
  <SectionHeader eyebrow="05 — CONTACT" title="Get in touch.">
    <a class="contact__email" :href="`mailto:${contact.email}`">
      <span class="contact__email-text">{{ contact.email }}</span>
      <span class="contact__email-arrow" aria-hidden="true">→</span>
    </a>

    <ul class="contact__list" aria-label="Other ways to reach me">
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
          <span class="contact__handle-group">
            <span class="contact__handle">{{ method.handle }}</span>
            <span class="contact__arrow" aria-hidden="true">→</span>
          </span>
        </a>
      </li>
    </ul>

    <p class="contact__meta">
      {{ contact.meta.location }} · {{ contact.meta.availability }} ·
      {{ contact.meta.responseTime }}
    </p>
  </SectionHeader>
</template>

<style scoped>
.contact__email {
  align-self: flex-start;
  display: inline-flex;
  align-items: baseline;
  gap: 0.5ch;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--text);
  text-decoration: none;
  padding-bottom: 0.15em;
}

.contact__email-arrow {
  display: inline-block;
}

.contact__email-text {
  display: inline;
}

.contact__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.contact__item {
  border-top: 1px solid var(--border, var(--muted));
}

.contact__item:last-child {
  border-bottom: 1px solid var(--border, var(--muted));
}

.contact__link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  text-decoration: none;
  color: var(--text);
  border-radius: 2px;
}

.contact__name {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.005em;
  color: var(--text);
}

.contact__handle-group {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5ch;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--muted);
}

.contact__handle {
  color: var(--muted);
}

.contact__arrow {
  display: inline-block;
}

.contact__meta {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  line-height: 1.6;
  letter-spacing: 0.04em;
  color: var(--muted);
}
</style>

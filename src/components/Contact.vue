<script setup lang="ts">
import SectionHeader from "../components/SectionHeading.vue";
import Link from "./Link.vue";
import { contactMethods, contactMeta } from "../lib/contact";
</script>

<template>
  <SectionHeader eyebrow="05 — CONTACT" title="Get in touch.">
    <ul class="contact__list" aria-label="Other ways to reach me">
      <li
        v-for="method in contactMethods"
        :key="method.name"
        class="contact__item"
      >
        <div class="contact__link">
          <span class="contact__name">{{ method.name }}</span>
          <span class="contact__handle-group">
            <Link
              class="contact__handle"
              :href="method.url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ method.handle }}</Link
            >
          </span>
        </div>
      </li>
    </ul>

    <p class="type-meta">
      {{ contactMeta.location }} · {{ contactMeta.availability }} ·
      {{ contactMeta.responseTime }}
    </p>
  </SectionHeader>
</template>

<style scoped>
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
  border-radius: 2px;
}

.contact__handle-group {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5ch;
}
</style>

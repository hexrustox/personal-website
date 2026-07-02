<script setup lang="ts">
import SectionHeader from "../components/SectionHeading.vue";
import Link from "./Link.vue";
import { contactMethods, contactMeta } from "../lib/contact";
</script>

<template>
  <SectionHeader eyebrow="05 — CONTACT" title="Get in touch.">
    <dl class="contact__list" aria-label="Other ways to reach me">
      <div
        v-for="method in contactMethods"
        :key="method.name"
        class="contact__item"
      >
        <dt class="contact__name">{{ method.name }}</dt>
        <dd class="contact__handle-group">
          <Link
            class="contact__handle"
            :href="method.url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ method.handle }}</Link
          >
        </dd>
      </div>
    </dl>

    <span class="type-meta">
      {{ contactMeta.location }} · {{ contactMeta.availability }} ·
      {{ contactMeta.responseTime }}
    </span>
  </SectionHeader>
</template>

<style scoped>
.contact__list {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.contact__item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border);
}

.contact__item:last-child {
  border-bottom: 1px solid var(--border);
}

.contact__handle-group {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5ch;
}
</style>

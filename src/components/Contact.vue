<script setup lang="ts">
import { contactMethods, contactMeta } from "../lib/contact";
import Link from "./Link.vue";
import Reveal from "./Reveal.vue";
import SectionHeader from "./SectionHeading.vue";
</script>

<template>
  <SectionHeader eyebrow="05 — CONTACT" title="Get in touch.">
    <dl class="contact__list">
      <div v-for="method in contactMethods" :key="method.name">
        <Reveal cascade>
          <div class="contact__item">
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
        </Reveal>
        <Reveal
          cascade
          :initial="{ scaleX: 0 }"
          :animate="{ scaleX: 1 }"
          :duration="0.3"
          ease="linear"
          class="contact__border"
        >
        </Reveal>
      </div>
    </dl>

    <Reveal>
      <span class="type-meta">
        {{ contactMeta.location }} · {{ contactMeta.availability }} ·
        {{ contactMeta.responseTime }}
      </span>
    </Reveal>
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
}

.contact__handle-group {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5ch;
}

.contact__border {
  width: 100%;
  height: 1px;
  background: var(--border);
  transform-origin: left;
}
</style>

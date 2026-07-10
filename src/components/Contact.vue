<script setup lang="ts">
import { contactMethods, contactMeta } from "../data/contact";
import { Icon } from "@iconify/vue";
</script>

<template>
  <SectionHeading eyebrow="05 — CONTACT" title="Get in touch.">
    <dl class="contact__list">
      <div v-for="method in contactMethods" :key="method.name">
        <Reveal>
          <div class="contact__item">
            <dt class="contact__name">
              {{ method.name }}
              <div class="contact__name-icon">
                <Icon :icon="method.icon" />
              </div>
            </dt>
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
  </SectionHeading>
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
  padding: 0 0.5rem;
}

.contact__name {
  display: flex;
  align-items: center;
  gap: 0.5ch;
}

.contact__name-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
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

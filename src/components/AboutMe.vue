<script setup lang="ts"></script>

<template>
  <article class="about">
    <span class="about__rule" aria-hidden="true"></span>
    <h1 class="about__title">About Me</h1>
    <p class="about__body">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae
      aliquam est, id aliquet ipsum. Morbi blandit dui sit amet eleifend
      bibendum. Nam sem eros, congue ut sapien in, dictum faucibus sem. Ut eu
      tincidunt tellus. Nam tristique mauris eget risus dictum venenatis.
      Vestibulum feugiat aliquet auctor. Phasellus bibendum nisl eget fringilla
      ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et
      ultrices posuere cubilia curae; Phasellus varius at est a aliquam.
      Phasellus eu lorem turpis.
    </p>
  </article>
</template>

<style scoped>
.about {
  width: 100%;
}

.about__rule {
  display: block;
  width: 3rem;
  height: 2px;
  background: var(--accent);
  margin-bottom: 1.5rem;
  border-radius: 1px;
}

.about__title {
  margin: 0 0 1rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--accent);
}

.about__body {
  margin: 0;
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
  max-width: 65ch;
}
</style>

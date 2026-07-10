export type MetaItem = { label: string; value: string };

export type AboutContent = { heading: string; paragraphs: string[] };

export const about: AboutContent = {
  heading:
    "I don't choose my stack. The problem does.",
  paragraphs: [
    "I don't learn skills for their own sake. I run into a problem, try every existing solution, find none of them fit, and build my own. By the end I've picked up whatever the problem demanded: a language, a framework, a paradigm. That's how my stack grew. Not by choosing. By necessity.",
    "I can't leave a pain point alone. If something in the workflow is slow, broken, or missing and no tool exists to fix it, I fix it myself. That instinct is behind almost everything I've built.",
  ],
};

export const metaItems: MetaItem[] = [
  { label: "Location", value: "Birmingham, UK" },
  { label: "Role", value: "Software Engineer" },
  { label: "Focus", value: "Breadth-first engineering" },
  { label: "Currently", value: "Open to work" },
];

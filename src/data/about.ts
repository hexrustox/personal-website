export type MetaItem = { label: string; value: string };

export type AboutContent = { heading: string; paragraphs: string[] };

export const about: AboutContent = {
  heading: "Designing and building considered interfaces for the web.",
  paragraphs: [
    "Currently working as a frontend engineer, mostly with TypeScript, Vue, and a little Rust on the side. I'm drawn to work that sits at the intersection of design and engineering — places where the two disciplines sharpen each other rather than get in the way.",
    "Outside of code I keep notebooks full of half-finished ideas, read more than I should, and take long walks when a bug won't budge.",
  ],
};

export const metaItems: MetaItem[] = [
  { label: "Location", value: "Berlin, DE" },
  { label: "Role", value: "Frontend Engineer" },
  { label: "Focus", value: "Interfaces & motion" },
  { label: "Currently", value: "Open to interesting work" },
];

export enum Skills {
  HTML = "HTML",
  CSS = "CSS",
  TypeScript = "TypeScript",
  Rust = "Rust",
  Vue = "Vue",
  Astro = "Astro",
  Node = "Node",
  PostgreSQL = "PostgreSQL",
  Docker = "Docker",
  Figma = "Figma",
}

export type SkillCategory = {
  title: string;
  items: readonly Skills[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    items: [Skills.TypeScript, Skills.HTML, Skills.CSS, Skills.Rust],
  },
  {
    title: "Frameworks",
    items: [Skills.Vue, Skills.Astro, Skills.Node],
  },
  {
    title: "Tooling",
    items: [Skills.PostgreSQL, Skills.Docker, Skills.Figma],
  },
];

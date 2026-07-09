import { Skills } from "./skills";

export interface Project {
  name: string;
  description: string;
  skills: Skills[];
  links: { name: string; url: string }[];
}

export const projects: Project[] = [
  {
    name: "Codenix",
    description:
      "Static site generator for technical blogs with MDX support and incremental builds.",
    skills: [Skills.TypeScript, Skills.Astro],
    links: [
      { name: "GitHub", url: "https://github.com/example/codenix" },
      { name: "Docs", url: "https://codenix.dev" },
    ],
  },
  {
    name: "Tachyon UI",
    description:
      "Headless component library for Vue 3, focused on accessibility and tree-shaking.",
    skills: [Skills.Vue, Skills.TypeScript],
    links: [
      { name: "GitHub", url: "https://github.com/example/tachyon" },
      { name: "Storybook", url: "https://tachyon.example.com" },
    ],
  },
  {
    name: "pgwire-proxy",
    description:
      "Lightweight Postgres protocol proxy written in Rust for connection pooling and read replicas.",
    skills: [Skills.Rust, Skills.PostgreSQL, Skills.Docker],
    links: [
      { name: "GitHub", url: "https://github.com/example/pgwire-proxy" },
      { name: "Crates.io", url: "https://crates.io/crates/pgwire-proxy" },
    ],
  },
];

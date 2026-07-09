export enum Skills {
  AI = "AI",
  Angular = "Angular",
  Astro = "Astro",
  CICD = "CI/CD",
  CSS = "CSS",
  Docker = "Docker/Podman",
  Git = "Git",
  HTML = "HTML",
  Java = "Java",
  JavaScript = "JavaScript",
  LinuxShell = "Linux/Shell",
  Networking = "Networking",
  Nix = "Nix",
  NodeJS = "Node.js",
  Nuxt = "Nuxt",
  Python = "Python",
  Rust = "Rust",
  TypeScript = "TypeScript",
  Vue = "Vue",
}

export type SkillCategory = {
  title: string;
  items: readonly Skills[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Web",
    items: [
      Skills.HTML,
      Skills.CSS,
      Skills.Vue,
      Skills.Angular,
      Skills.Astro,
      Skills.Nuxt,
    ],
  },
  {
    title: "Languages",
    items: [
      Skills.JavaScript,
      Skills.TypeScript,
      Skills.Python,
      Skills.Java,
      Skills.Rust,
      Skills.Nix,
    ],
  },
  {
    title: "Infrastructure & Tooling",
    items: [
      Skills.NodeJS,
      Skills.Docker,
      Skills.CICD,
      Skills.Git,
      Skills.LinuxShell,
      Skills.Networking,
      Skills.AI,
    ],
  },
];

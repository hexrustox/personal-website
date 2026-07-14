export enum Skills {
  AI = "AI",
  Astro = "Astro",
  CICD = "CI/CD",
  CSS = "CSS",
  Docker = "Docker/Podman",
  HTML = "HTML",
  LinuxShell = "Linux/Shell",
  Networking = "Networking",
  Nix = "Nix",
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
    items: [Skills.HTML, Skills.CSS, Skills.Vue, Skills.Astro],
  },
  {
    title: "Languages",
    items: [Skills.TypeScript, Skills.Python, Skills.Rust, Skills.Nix],
  },
  {
    title: "Infrastructure & Tooling",
    items: [Skills.Docker, Skills.LinuxShell, Skills.Networking, Skills.AI],
  },
];

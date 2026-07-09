import { Skills } from "./skills";

export interface Project {
  name: string;
  description: string;
  skills: Skills[];
  links: { name: string; url: string }[];
}

export const projects: Project[] = [
  {
    name: "Prisoner's Dilemma",
    description:
      "Built a tournament platform where AI-driven strategies face off in the classic game-theory dilemma, learning and adapting with each round — exploring how machine learning can uncover optimal strategies in competitive settings.",
    skills: [Skills.Python, Skills.AI],
    links: [
      {
        name: "GitLab",
        url: "https://gitlab.com/codnixus/prisoners-dilemma",
      },
    ],
  },
  {
    name: "Dotrift",
    description:
      "Built a command-line tool that keeps your configuration files organised and in sync across machines, with automatic conflict resolution — cutting setup time on new machines from hours to minutes.",
    skills: [Skills.Rust],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/dotrift" }],
  },
  {
    name: "Nix Capsule",
    description:
      "Built a tool for running isolated development environments inside containers — no setup, no conflicts, just a shell that works the same everywhere, so teams can onboard in seconds.",
    skills: [Skills.Rust, Skills.Nix, Skills.LinuxShell, Skills.Docker],
    links: [
      {
        name: "GitLab",
        url: "https://gitlab.com/codnixus/nix-capsule",
      },
    ],
  },
  {
    name: "LoomWM",
    description:
      "Built a window manager that watches how you arrange windows and learns to organise them for you automatically — cutting out repetitive manual layout adjustments.",
    skills: [Skills.Rust, Skills.AI],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/loomwm" }],
  },
  {
    name: "Findr",
    description:
      "Built a fast terminal search-and-replace tool — like VS Code's find-and-replace, without leaving the command line, for refactoring across large codebases.",
    skills: [Skills.Rust],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/findr" }],
  },
  {
    name: "Waygamma",
    description:
      "Built a tool that automatically warms your screen at night and cools it during the day — like Night Light, but for Linux.",
    skills: [Skills.Rust],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/waygamma" }],
  },
  {
    name: "Dotfiles",
    description:
      "My entire development environment, codified as code — OS config, editor settings, and tooling, reproducible on any machine in under 30 minutes.",
    skills: [Skills.Nix, Skills.LinuxShell],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/dotfiles" }],
  },
  {
    name: "Self-Hosted Infrastructure",
    description:
      "Self-hosted a mail server and password manager on bare-metal Linux — handling DNS, security hardening, and uptime monitoring to keep critical services running reliably.",
    skills: [Skills.LinuxShell, Skills.Docker, Skills.Networking],
    links: [],
  },
  {
    name: "This Website",
    description:
      "Lightweight portfolio built from scratch with Astro 6, Vue 3, and TypeScript — designed for fast loads, smooth motion, and a clean reading experience.",
    skills: [
      Skills.Astro,
      Skills.Vue,
      Skills.TypeScript,
      Skills.HTML,
      Skills.CSS,
    ],
    links: [
      {
        name: "GitLab",
        url: "https://gitlab.com/codnixus/personal-website",
      },
    ],
  },
];

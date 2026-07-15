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
      "A from-scratch iterated Prisoner's Dilemma platform: a strategy protocol and round-robin tournament engine paired with ML predictors (logistic regression and GRU) that learn opponent behavior over hundreds of games.",
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
      "A declarative dotfile manager that maps files from source to target via a single TOML config, with a custom templating engine, profile system, SQLite-backed state tracking, and an interactive TUI pager for conflict resolution.",
    skills: [Skills.Rust],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/dotrift" }],
  },
  {
    name: "Nix Capsule",
    description:
      "Containerized dev shells with transparent I/O: stdin, stdout, exit codes, and CWD pass through unmodified, so LSP servers and CLI tools feel native across the container boundary.",
    skills: [
      Skills.Rust,
      Skills.Nix,
      Skills.LinuxShell,
      Skills.Docker,
      Skills.CICD,
    ],
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
      "A Wayland compositor built on Smithay with dynamic tiling, multi-workspace support, and an on-device transformer model that learns window arrangement habits to suggest optimal layouts.",
    skills: [Skills.Rust, Skills.AI],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/loomwm" }],
  },
  {
    name: "Findr",
    description:
      "An interactive terminal find-and-replace TUI with live preview, regex capture groups, and Vim-style keybindings — search and refactor across codebases without leaving the command line.",
    skills: [Skills.Rust],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/findr" }],
  },
  {
    name: "Waygamma",
    description:
      "A Wayland-native gamma, color-temperature, and brightness daemon that warms and dims your screen on a solar schedule with smooth animated transitions, like Redshift for wlroots compositors.",
    skills: [Skills.Rust],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/waygamma" }],
  },
  {
    name: "Dotfiles",
    description:
      "My NixOS configuration and dotfiles, managed with Nix flakes and dotrift — a fully reproducible development environment codified as code.",
    skills: [Skills.Nix, Skills.LinuxShell],
    links: [{ name: "GitLab", url: "https://gitlab.com/codnixus/dotfiles" }],
  },
  {
    name: "Self-Hosted Infrastructure",
    description:
      "Self-hosted a mail server and password manager on bare-metal Linux, handling DNS, security hardening, and uptime monitoring to keep critical services running reliably.",
    skills: [Skills.LinuxShell, Skills.Docker, Skills.Networking],
    links: [],
  },
  {
    name: "This Website",
    description:
      "A static portfolio built with Astro 7, Vue 3 (motion-v), and TypeScript, served by Caddy with HSTS and cache-optimized headers."",
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

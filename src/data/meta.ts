import { Skills } from "./skills";

export type Meta = {
  title: string;
  description: string;
  url: string;
  siteName: string;
  locale: string;
  themeColor: string;
  author: string;
  jobTitle: string;
  sameAs: readonly string[];
  knowsAbout: readonly string[];
};

export const meta: Meta = {
  title: "C.H. Yu — Software Engineer",
  description:
    "Generalist software engineer in Birmingham, UK — web to systems with TypeScript, Rust, Python, and Nix.",
  url: "https://ckhgy.com",
  siteName: "C.H. Yu",
  locale: "en_GB",
  themeColor: "#f5a524",
  author: "C.H. Yu",
  jobTitle: "Software Engineer",
  sameAs: ["https://gitlab.com/codnixus"],
  knowsAbout: Object.values(Skills),
};

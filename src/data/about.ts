export type MetaItem = { label: string; value: string };

export type AboutContent = { heading: string; paragraphs: string[] };

export const about: AboutContent = {
  heading:
    "A generalist engineer — broad across the stack, pragmatic by nature.",
  paragraphs: [
    "I'm a software engineer who thrives on connecting the dots across the stack — equally comfortable in the browser, on the server, and at the command line. I work with TypeScript, Vue, Angular, and Node.js for the web, and Python, Rust, and Nix for systems and tooling. CI/CD pipelines, containers, and shell scripting are all part of the workflow too — I reach for whatever fits the problem rather than doubling down on one stack.",
    "I'm motivated by understanding how things work end-to-end — there's something satisfying about tracing a click from the UI all the way down to the kernel. I learn best by building, and I do my best work when a project pushes beyond familiar territory.",
  ],
};

export const metaItems: MetaItem[] = [
  { label: "Location", value: "Birmingham, UK" },
  { label: "Role", value: "Software Engineer" },
  { label: "Focus", value: "Breadth-first engineering" },
  { label: "Currently", value: "Open to work" },
];

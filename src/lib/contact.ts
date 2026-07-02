export interface ContactMethod {
  name: string;
  handle: string;
  url: string;
}

export interface ContactMeta {
  location: string;
  availability: string;
  responseTime: string;
}

export const contactMethods: ContactMethod[] = [
  {
    name: "Email",
    handle: "you@example.com",
    url: "mailto:you@example.com",
  },
  {
    name: "GitHub",
    handle: "@your-handle",
    url: "https://github.com/your-handle",
  },
  {
    name: "LinkedIn",
    handle: "in/your-handle",
    url: "https://www.linkedin.com/in/your-handle",
  },
];

export const contactMeta: ContactMeta = {
  location: "Based in Berlin",
  availability: "Open to work",
  responseTime: "Replies within 48h",
};

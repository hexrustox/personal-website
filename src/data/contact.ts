import { location, availability } from "./meta";

export interface ContactMethod {
  name: string;
  handle: string;
  url: string;
  icon: string;
}

export interface ContactMeta {
  location: string;
  availability: string;
  responseTime: string;
}

export const contactMethods: ContactMethod[] = [
  {
    name: "Email",
    handle: "career.chy982@outlook.com",
    url: "mailto:career.chy982@outlook.com",
    icon: "email",
  },
  {
    name: "GitLab",
    handle: "@codnixus",
    url: "https://gitlab.com/codnixus",
    icon: "gitlab",
  },
];

export const contactMeta: ContactMeta = {
  location: `Based in ${location}`,
  availability,
  responseTime: "Replies within 48h",
};

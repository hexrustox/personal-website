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
    handle: "career.kw2ddw@ckhgy.com",
    url: "mailto:career.kw2ddw@ckhgy.com",
  },
  {
    name: "GitLab",
    handle: "@codnixus",
    url: "https://gitlab.com/codnixus",
  },
];

export const contactMeta: ContactMeta = {
  location: "Based in Birmingham, UK",
  availability: "Open to work",
  responseTime: "Replies within 48h",
};

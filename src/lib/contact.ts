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

export interface ContactInfo {
  email: string;
  meta: ContactMeta;
}

export const contactMethods: ContactMethod[] = [
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

export const contact: ContactInfo = {
  // TODO: replace with your real email address
  email: "you@example.com",
  meta: {
    // TODO: replace with your actual location
    location: "Based in Berlin",
    // TODO: set your current availability
    availability: "Open to work",
    // TODO: set your typical response time
    responseTime: "Replies within 48h",
  },
};

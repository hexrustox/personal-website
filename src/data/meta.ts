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

const locale = "en-GB" as const;

const address = {
  "@type": "PostalAddress",
  addressLocality: "Birmingham",
  addressCountry: "GB",
} as const;

const withContext = <T extends object>(
  o: T,
): T & { "@context": "https://schema.org" } => ({
  "@context": "https://schema.org",
  ...o,
});

export const personJsonLd = withContext({
  "@type": "Person",
  name: meta.author,
  jobTitle: meta.jobTitle,
  url: meta.url,
  sameAs: meta.sameAs,
  knowsAbout: meta.knowsAbout,
  address,
});

export const siteJsonLd = withContext({
  "@type": "WebSite",
  name: meta.siteName,
  url: meta.url,
  inLanguage: locale,
});

export const pageJsonLd = withContext({
  "@type": "WebPage",
  name: meta.title,
  description: meta.description,
  url: meta.url,
  inLanguage: locale,
  isPartOf: { "@id": meta.url },
});

export const contactPageJsonLd = withContext({
  "@type": "ContactPage",
  name: `Contact ${meta.author}`,
  description: `Get in touch with ${meta.author} — ${meta.jobTitle.toLowerCase()} in Birmingham, UK.`,
  url: `${meta.url}#contact`,
  inLanguage: locale,
  isPartOf: { "@id": meta.url },
  about: { "@type": "Person", name: meta.author },
});

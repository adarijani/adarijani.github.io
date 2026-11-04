import type {
  FooterConfig,
  LinkConfig,
  ProfileConfig,
  PublicationConfig,
  SiteConfig,
} from "@/types"

export const SITE: SiteConfig = {
  title: "Ali Darijani",
  description: "Computational Mathematics, Applied Mathematics",
  href: "https://adarijani.github.io",
  author: "Ali Darijani",
  dir: "ltr",
  defaultPageImage: "/img/social-preview.png",
  defaultPostImage: "/img/social-preview.png",

  locale: {
    lang: "en-US",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    },
  },

  // Table of contents depth shared by blog posts and project detail pages.
  tocMaxDepth: 3,

  blog: {
    featuredPostCount: 3,
    postsPerPage: 8,
    shareActions: ["x"],
  },

  home: {
    careerHighlightCount: 4,
    updateCount: 3,
    publicationCount: 3,
  },

  favicon: "/favicon.ico",
  prerender: true,
  npmCDN: "https://cdn.jsdelivr.net/npm",

  license: {
    label: "CC-BY-4.0",
    href: "https://creativecommons.org/licenses/by/4.0/",
  },
}

export const PROFILE: ProfileConfig = {
  name: SITE.title,
  tagline: "Computational Mathematics, Applied Mathematics",
  emails: [
    "ali.darijani@iosb.fraunhofer.de",
    "ali.darijani@kit.edu",
    "ali.darijani@rwth-aachen.de",
    "ali.darijani@alum.sharif.edu",
  ],
  location: "Germany",
  pronouns: "",
  links: {
    github: "https://github.com/adarijani",
    website: "https://adarijani.github.io/",
  },
  highlightLinks: ["github"],
  linksPlacement: {
    header: ["email", "github", "website"],
    about: true,
    footer: false,
  },
}

export const NAV_LINKS: LinkConfig[] = [
  { href: "/working-papers", label: "Working Papers" },
  { href: "/publications", label: "Publications" },
  { href: "/supervision", label: "Opportunities" },
  // { href: "/projects", label: "Projects" },
  // { href: "/teaching", label: "Teaching" },
  // { href: "/blog", label: "Blog" },
]

export const NAVIGATION: LinkConfig[] = NAV_LINKS.map(({ href, label }) => ({
  href,
  label,
}))

export const PUB_CONFIG: PublicationConfig = {
  maxFirstAuthors: 6,
  maxLastAuthors: 1,
  highlightAuthor: {
    firstName: "Ali",
    lastName: "Darijani",
    aliases: ["A. Darijani"],
  },
  equalSymbols: {
    first: "*",
    second: "†",
    third: "‡",
    last: "§",
  },
}

export const FOOTER: FooterConfig = {
  credits: true,
  sourceCode: "https://github.com/adarijani",
  // sourceContent:
  // "https://github.com/adarijani/",
  footerLinks: [],
}

if (import.meta.env.DEV && typeof window === "undefined") {
  const {
    FooterConfigSchema,
    ProfileConfigSchema,
    PublicationConfigSchema,
    SiteConfigSchema,
  } = await import("@/schemas")
  SiteConfigSchema.parse(SITE)
  ProfileConfigSchema.parse(PROFILE)
  FooterConfigSchema.parse(FOOTER)
  PublicationConfigSchema.parse(PUB_CONFIG)
}

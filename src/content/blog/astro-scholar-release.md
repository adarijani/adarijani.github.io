---
title: My Scholar 2.2.6 is ready
description: A practical tour of the My Scholar Astro theme and its Markdown-first writing system.
createdAt: 2026-08-23T12:00:00
image: ./assets/astro-scholar-release.png
tags:
  - astro
  - release
  - theme
  - markdown
authors:
  - mychiffon
stage: evergreen
audience: Researchers, students, and technical writers building an academic site with Astro.
---

My Scholar 2.2.6 is a reusable Astro theme for academic profiles, projects,
publications, teaching pages, and research blogs. It keeps the source in
portable Markdown and the output static by default, while still giving long
technical posts a place for equations, code, citations, and notes.[^portable]

![A light and dark research workspace with profile, publication, project, code, and writing cards.](./assets/astro-scholar-release.png)

:::note[Start from the theme]
Create a site from the `astro-scholar` template with
`pnpm create astro@latest --template mychiffonn/astro-scholar`, then follow the
[customization guide](https://github.com/mychiffonn/astro-scholar/blob/main/docs/CUSTOMIZATION.md).
:::

## What 2.2.6 includes

The release brings the main surfaces of an academic site into one consistent
system:

| Area | Included behavior |
| --- | --- |
| Profile | A responsive profile header, contact details, pronunciation help, and configurable header links |
| Projects | Borderless project rows, project detail pages, date ranges, skills, resource links, and GitHub activity |
| Publications | BibTeX-backed records, relevance and year sorting, keyword filters, abstracts, author details, and resource links |
| Teaching | A simple Markdown page for courses, workshops, and other teaching experience |
| Research blog | Posts, subposts, tags, RSS, social images, share actions, and post navigation |
| Writing tools | Callouts, heading anchors, a shared table of contents, footnotes, sidenotes, math, wikilinks, and syntax-highlighted code |
| Delivery | Static output, a sitemap, a robots file, and a generated `llms.txt` route |

The site uses native HTML and CSS for most interactions. Content collections
validate frontmatter before a page is built, so an invalid date or missing
required field produces a useful error near the source file.

The release also includes the small details that are easy to miss in a theme:

- [x] Light and dark color modes with an explicit theme toggle
- [x] Responsive navigation and mobile menus
- [x] Shared table-of-contents behavior for blog posts and project pages
- [x] Accessible focus states and reduced-motion fallbacks
- [x] Formatting, linting, Markdown tests, type checks, and production builds
- [ ] Replace the demonstration profile and content with your own work

## Configure the site

The main configuration lives in `src/site.config.ts`. A small excerpt looks
like this:

```ts
export const SITE = {
  title: "My Scholar",
  tocMaxDepth: 3,
  home: {
    careerHighlightCount: 4,
    updateCount: 3,
    publicationCount: 3,
  },
}

export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/teaching", label: "Teaching" },
  { href: "/blog", label: "Blog" },
]
```

Use `src/content/` for the parts that belong to the site owner. Keep reusable
layout and component changes in `src/` outside the content collections. The
repository's [installation guide](https://github.com/mychiffonn/astro-scholar/blob/main/docs/INSTALL.md)
and [customization guide](https://github.com/mychiffonn/astro-scholar/blob/main/docs/CUSTOMIZATION.md)
describe the available configuration surfaces.

## Write posts in Markdown

The writing pipeline keeps ordinary Markdown at the center. You can combine
short prose with emphasis, inline code, [descriptive links](https://docs.astro.build/en/guides/markdown-content/),
and ~~an idea that changed during revision~~ without switching to a custom
authoring format.

### Add code examples

Fenced code blocks use the language identifier that readers expect from a
technical document:

```ts
type Study = {
  title: string
  methods: string[]
  reproducible: boolean
}

const study: Study = {
  title: "Documenting a small research corpus",
  methods: ["sampling", "annotation", "review"],
  reproducible: true,
}
```

Inline code works in the same paragraph, so names such as `tocMaxDepth`,
`pnpm astro check`, and `src/site.config.ts` remain distinct from prose.

### Render equations

Inline math keeps a claim compact: the posterior is
$p(\theta \mid D) \propto p(D \mid \theta)p(\theta)$.

Display math gives a longer expression room to breathe:

$$
\operatorname{Pr}(H \mid D) =
\frac{\operatorname{Pr}(D \mid H)\operatorname{Pr}(H)}
     {\operatorname{Pr}(D)}
$$

The Sätteri pipeline passes both forms to Temml and renders semantic MathML.
That keeps equations readable in the browser and available to assistive
technology.

### Use callouts for context

Directive callouts create expandable notices with a label:

:::tip[Keep the source portable]
Use Markdown for research notes, then add a component only when the content
needs interaction that Markdown cannot express.
:::

You can also use the Obsidian callout form when you want to move an existing
note into the theme:

> [!warning]- Before you upgrade
> Compare your local configuration with the release, then run the validation
> commands before publishing the site.

The `{closed}` directive attribute starts a callout in its collapsed state:

:::important{closed}
Keep implementation details available without placing them in the main reading path.
:::

### Link related pages

Wikilinks connect a post to the site's other collections:
[[/projects|project pages]], [[/publications|publications]],
[[/teaching|teaching notes]], and [[/blog|other research posts]]. Regular
Markdown links remain available for external documentation and sources.

### Keep evidence close to the claim

Footnotes become sidenotes on wide screens and compact disclosures on narrow
screens.[^sidenotes] This keeps a qualification near the sentence it supports
without making the reading order depend on a visual layout.

> A useful research note makes its evidence easy to inspect. The page structure
> should help the reader move from a question to a method, a result, and a
> limitation.

## Model a small research note

Blog frontmatter describes the post, and the body stays in Markdown:

```yaml
---
title: A field note about annotation quality
createdAt: 2026-08-23T12:00:00
tags:
  - methods
  - reproducibility
stage: seedling
---
```

The collections also support project records, people, experience, updates,
and BibTeX publications. Use the matching source file for each kind of record:

| Record | Source |
| --- | --- |
| Blog post | `src/content/blog/*.md` |
| Project | `src/content/projects/*.md` |
| Update | `src/content/updates/*.md` |
| Publication | `src/content/publications/main.bib` |
| Person | `src/content/people.toml` |

This separation keeps a publication's citation data independent from the prose
that explains it. It also lets the same project or author appear in several
views without duplicating the record.

## Upgrade to 2.2.6

If you have an earlier My Scholar site, follow this sequence:

1. Copy your local content and configuration changes before updating the theme.
2. Update the template and dependencies from the `v2.2.6` release.
3. Review `src/site.config.ts`, `src/schemas.ts`, and the Markdown pipeline for
   configuration changes.
4. Run the project checks:

   ```bash
   pnpm format
   pnpm lint
   pnpm lint:styles
   pnpm test:markdown
   pnpm astro check
   pnpm build
   ```

5. Inspect the home, projects, publications, teaching, and blog routes in both
   color modes before publishing.

:::warning[Keep generated files out of commits]
Do not commit `dist/`, `.astro/`, `.playwright-cli/`, or `output/`. The build
regenerates these directories from the source.
:::

Version 2.2.6 gives you a clear starting point for a personal research site:
keep the sample content as a reference, replace it with your own records, and
write the parts of the project that deserve a durable explanation.

[^portable]: Markdown remains searchable, reviewable in Git, and reusable in other publishing systems.

[^sidenotes]: Sidenotes keep citations and qualifications near the claim they support while preserving an accessible reading order.

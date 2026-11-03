import { PUBLICATION_LINK_TYPES } from "@icon-config"

import venuePatternGroups from "./venue-patterns.json"

interface VenuePatternDefinition {
  pattern: string
  venue: string
  flags?: string
}

interface VenuePatternGroups {
  booktitle: VenuePatternDefinition[]
  url: VenuePatternDefinition[]
  doi: VenuePatternDefinition[]
}

/**
 * Non-standard BibTeX fields copied onto a publication for display. Standard
 * fields (title, author, year, doi, url, journal, ...) are read directly in
 * `parseBibTeX` and do not belong here.
 */
const METADATA_FIELDS = [
  "abstract",
  "award",
  "draft",
  "eprint",
  "selected",
  "status",
  "equalfirst",
  "equalsecond",
  "equalthird",
  "equallast",
  "venue",
  "image",
  "imagealt",
] as const

/**
 * Fields rendered as link buttons, in the order they appear on a card.
 *
 * A deliberate subset of PUBLICATION_LINK_TYPES: that map also carries entries
 * for `abstract`, `award`, `selected` and `venue`, which are displayed some
 * other way and must not become buttons. `satisfies` keeps a typo or a removed
 * icon entry from silently dropping a link at build time.
 */
const LINK_FIELDS = [
  "arxiv",
  "code",
  "data",
  "demo",
  "doi",
  "draft",
  "github",
  "gitlab",
  "latex",
  "models",
  "pdf",
  "post",
  "poster",
  "proposal",
  "resources",
  "slides",
  "talk",
  "thread",
  "url",
  "video",
  "website",
] as const satisfies readonly (keyof typeof PUBLICATION_LINK_TYPES)[]

export const LINK_FIELD_NAMES: readonly string[] = LINK_FIELDS

export const CUSTOM_FIELD_NAMES: readonly string[] = [
  ...METADATA_FIELDS,
  ...LINK_FIELDS,
]

function buildVenuePatterns(
  definitions: VenuePatternDefinition[],
): [RegExp, string][] {
  return definitions.map(({ pattern, venue, flags = "i" }) => [
    new RegExp(pattern, flags),
    venue,
  ])
}

const typedVenuePatternGroups = venuePatternGroups as VenuePatternGroups

export const VENUE_BOOKTITLE_PATTERNS = buildVenuePatterns(
  typedVenuePatternGroups.booktitle,
)
export const VENUE_URL_PATTERNS = buildVenuePatterns(
  typedVenuePatternGroups.url,
)
export const VENUE_DOI_PATTERNS = buildVenuePatterns(
  typedVenuePatternGroups.doi,
)

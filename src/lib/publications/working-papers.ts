import { PUB_CONFIG } from "@site-config"
import {
  expandHierarchicalKeywords,
  getPublicationData,
  parseBibTeX,
  parsePublicationKeywords,
  sortPublications,
  sortPublicationsByRelevance,
} from "./utils"

const bibModules = import.meta.glob("/src/content/working-papers/*.bib", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

const bibContent = Object.keys(bibModules)
  .sort()
  .map((path) => bibModules[path])
  .join("\n")

export async function loadAllWorkingPapers() {
  try {
    const papers = parseBibTeX(bibContent)
    const sorted = sortPublications(papers, PUB_CONFIG)
    const papersByYear: Record<
      string,
      ReturnType<typeof getPublicationData>[]
    > = {}
    const keywordCounts = new Map<string, number>()

    for (const paper of sorted) {
      const year = paper.year || 0
      ;(papersByYear[year] ??= []).push(getPublicationData(paper, PUB_CONFIG))
      for (const keyword of expandHierarchicalKeywords(
        parsePublicationKeywords(paper.keywords),
      )) {
        keywordCounts.set(keyword, (keywordCounts.get(keyword) || 0) + 1)
      }
    }

    const years = Object.keys(papersByYear)
      .map(Number)
      .sort((a, b) => b - a)
    const allPapersFlat = sortPublicationsByRelevance(papers, PUB_CONFIG).map(
      (paper) => getPublicationData(paper, PUB_CONFIG),
    )
    const allKeywords = [...keywordCounts.entries()]
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count || a.keyword.localeCompare(b.keyword))

    return { papersByYear, years, allPapersFlat, allKeywords }
  } catch (error) {
    console.error("Error loading working papers:", error)
    return { papersByYear: {}, years: [], allPapersFlat: [], allKeywords: [] }
  }
}

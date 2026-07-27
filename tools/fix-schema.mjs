#!/usr/bin/env node
/**
 * Repairs the hand-built pages without touching their copy.
 *
 * 1. Schema: the hand-built pages nest a FAQPage inside `mainEntityOfPage`, which
 *    is not valid usage — `mainEntityOfPage` expects a WebPage reference. The FAQ
 *    questions are preserved and re-emitted as a top-level FAQPage node in an
 *    @graph, alongside LocalBusiness and BreadcrumbList.
 * 2. Nav: adds the Areas and Guides links so the hand-built pages match generated ones.
 *
 * Dry-run by default. APPLY=1 to write.
 *
 *   node tools/fix-schema.mjs
 *   APPLY=1 node tools/fix-schema.mjs
 */

import { readFileSync, writeFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

import { SITE, localBusinessNode, breadcrumbNode } from "./templates/base.mjs"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const apply = process.env.APPLY === "1"

const TARGETS = [
  { file: "index.html", path: "/", name: "Home", trail: [{ name: "Home", path: "/" }] },
  {
    file: "standard-cleaning/index.html",
    path: "/standard-cleaning",
    name: "Standard Cleaning",
    trail: [
      { name: "Home", path: "/" },
      { name: "Standard Cleaning", path: "/standard-cleaning" },
    ],
  },
  {
    file: "deep-cleaning/index.html",
    path: "/deep-cleaning",
    name: "Deep Cleaning",
    trail: [
      { name: "Home", path: "/" },
      { name: "Deep Cleaning", path: "/deep-cleaning" },
    ],
  },
  {
    file: "move-out-cleaning/index.html",
    path: "/move-out-cleaning",
    name: "Move-Out Cleaning",
    trail: [
      { name: "Home", path: "/" },
      { name: "Move-Out Cleaning", path: "/move-out-cleaning" },
    ],
  },
  { file: "book/index.html", path: "/book", name: "Book", trail: null },
  { file: "privacy/index.html", path: "/privacy", name: "Privacy", trail: null },
  { file: "terms/index.html", path: "/terms", name: "Terms", trail: null },
]

const NAV_INSERT = `<li><a href="/areas">Areas We Serve</a></li>
    <li><a href="/guides">Guides</a></li>
    `

/** Pull every Question/Answer pair out of an arbitrarily shaped schema object. */
function collectFaqs(node, found = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectFaqs(item, found)
    return found
  }
  if (!node || typeof node !== "object") return found
  if (node["@type"] === "Question" && node.name) {
    const answer = node.acceptedAnswer?.text
    if (answer) found.push({ name: node.name, text: answer })
  }
  for (const value of Object.values(node)) collectFaqs(value, found)
  return found
}

/** Everything from the original schema that is not the misplaced FAQ wrapper. */
function stripFaqWrapper(node) {
  if (Array.isArray(node)) return node.map(stripFaqWrapper)
  if (!node || typeof node !== "object") return node
  const out = {}
  for (const [key, value] of Object.entries(node)) {
    if (key === "mainEntityOfPage") continue
    if (key === "@context") continue
    out[key] = stripFaqWrapper(value)
  }
  return out
}

let changed = 0

for (const target of TARGETS) {
  const full = join(ROOT, target.file)
  let html
  try {
    html = readFileSync(full, "utf8")
  } catch {
    console.log(`  skip (missing): ${target.file}`)
    continue
  }

  const before = html
  const notes = []

  // --- nav ---
  // The CTA href differs per page (/book on service pages, / on privacy and terms),
  // so match any href rather than assuming one.
  const navCta = /(\s*)(<li><a href="[^"]*" class="nav-cta"[^>]*>)/
  if (!html.includes('href="/areas"') && navCta.test(html)) {
    html = html.replace(navCta, `$1${NAV_INSERT}$2`)
    if (html !== before) notes.push("nav +Areas +Guides")
  }

  // --- schema ---
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (match) {
    let parsed
    try {
      parsed = JSON.parse(match[1])
    } catch (error) {
      console.log(`  ! ${target.file}: existing JSON-LD does not parse (${error.message}) — left untouched`)
      parsed = null
    }

    if (parsed) {
      const url = `${SITE.origin}${target.path}`
      const faqs = collectFaqs(parsed)
      const primary = stripFaqWrapper(parsed)

      const graph = [localBusinessNode()]
      if (target.trail) graph.push(breadcrumbNode(target.trail))

      // Keep the original primary node (Service / LocalBusiness / whatever it was),
      // but re-point its provider at the shared business node.
      if (primary && primary["@type"] && primary["@type"] !== "LocalBusiness") {
        if (primary.provider) primary.provider = { "@id": `${SITE.origin}/#business` }
        primary["@id"] = `${url}#primary`
        graph.push(primary)
      }

      if (faqs.length) {
        graph.push({
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.name,
            acceptedAnswer: { "@type": "Answer", text: faq.text },
          })),
        })
        notes.push(`FAQPage lifted to top level (${faqs.length} Q)`)
      }
      if (target.trail) notes.push("BreadcrumbList added")

      const rebuilt = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)
      html = html.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script type="application/ld+json">\n${rebuilt}\n</script>`,
      )
    }
  }

  if (html !== before) {
    changed += 1
    console.log(`  ${target.file}: ${notes.join("; ")}`)
    if (apply) writeFileSync(full, html, "utf8")
  } else {
    console.log(`  ${target.file}: no change needed`)
  }
}

console.log(`\n${changed} file(s) ${apply ? "updated" : "would change"}.`)
if (!apply) console.log("Dry-run — set APPLY=1 to write.")

#!/usr/bin/env node
/**
 * Generates location, service × location, area hub and guide pages, then rewrites
 * sitemap.xml. Run from the repo root:  node tools/build.mjs
 *
 * Hand-built pages (index.html, the three service hubs, book, privacy, terms) are
 * NOT generated here — they are only listed in the sitemap. Their schema is patched
 * separately by tools/fix-schema.mjs so their hand-written copy is preserved.
 */

import { mkdirSync, writeFileSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

import { CITIES, cityPath, cityLabel } from "./data/cities.mjs"
import { SERVICES, serviceCityPath } from "./data/services.mjs"
import { GUIDES } from "./data/guides.mjs"
import {
  SITE,
  page,
  renderFaqs,
  localBusinessNode,
  breadcrumbNode,
  faqNode,
  escapeHtml,
  TEL_LINK,
} from "./templates/base.mjs"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10)

/** Pages that exist in the repo and are maintained by hand. */
const HAND_BUILT = [
  { path: "/", priority: "1.0" },
  { path: "/standard-cleaning", priority: "0.9" },
  { path: "/deep-cleaning", priority: "0.9" },
  { path: "/move-out-cleaning", priority: "0.9" },
  { path: "/book", priority: "0.9" },
]

const generated = []

function emit(path, html, priority) {
  const dir = path === "/" ? ROOT : join(ROOT, path.replace(/^\//, ""))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, "index.html"), html, "utf8")
  generated.push({ path, priority })
}

function list(items) {
  return items.map((i) => escapeHtml(i)).join(", ")
}

function oxford(items) {
  if (items.length <= 1) return escapeHtml(items[0] ?? "")
  const head = items.slice(0, -1).map((i) => escapeHtml(i)).join(", ")
  return `${head} and ${escapeHtml(items[items.length - 1])}`
}

// ---------------------------------------------------------------- city pages

function cityFaqs(city) {
  const label = cityLabel(city)
  return [
    {
      q: `Do you clean homes in ${label}, Indiana?`,
      a: `Yes. Novo's Cleaning services homes across ${escapeHtml(label)} in ${escapeHtml(
        city.county,
      )}, including ${oxford(city.neighborhoods.slice(0, 3))}. Call ${TEL_LINK} or book online.`,
    },
    {
      q: `How much does house cleaning cost in ${label}?`,
      a: `Flat-rate, based on the size of your home rather than an hourly clock. ${escapeHtml(
        city.housing.split(". ").slice(-1)[0],
      )} You get the price before anyone arrives — book online for an instant quote or call ${TEL_LINK}.`,
    },
    {
      q: `What makes cleaning a ${label} home different?`,
      a: escapeHtml(city.localNote),
    },
    {
      q: `Which ZIP codes do you cover in ${label}?`,
      a: `We serve ${escapeHtml(city.zips.join(", "))} and the surrounding ${escapeHtml(
        city.county,
      )} area. If you are just outside those, call ${TEL_LINK} — we can usually still help.`,
    },
    {
      q: `Are you insured to clean homes in ${label}?`,
      a: `Yes. Novo's Cleaning is fully insured and every team member is background-checked. Arrivals are GPS-verified and timestamped, so you always know exactly when we were there.`,
    },
  ]
}

function renderCity(city) {
  const label = cityLabel(city)
  const path = cityPath(city)
  const url = `${SITE.origin}${path}`
  const faqs = cityFaqs(city)

  const serviceCards = SERVICES.map(
    (service) => `    <div class="svc-card">
      <p class="type">${escapeHtml(service.kicker)}</p>
      <p class="name">${escapeHtml(service.shortName.toUpperCase())}</p>
      <p class="desc">${escapeHtml(service.summary)}</p>
      <a href="${serviceCityPath(service, city)}">${escapeHtml(service.shortName)} in ${escapeHtml(
      label,
    )} →</a>
    </div>`,
  ).join("\n")

  const nearbyPills = city.nearby
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter(Boolean)
    .map(
      (n) =>
        `    <span class="area-pill"><a href="${cityPath(n)}">${escapeHtml(cityLabel(n))}, IN</a></span>`,
    )
    .join("\n")

  const body = `<div class="hero">
  <p class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/areas">Areas</a><span>›</span>${escapeHtml(
    label,
  )}</p>
  <h1>HOUSE CLEANING<br /><span class="lime">${escapeHtml(label.toUpperCase())}, IN.</span></h1>
  <p class="hero-sub">Novo's Cleaning serves homes throughout ${escapeHtml(label)} and ${escapeHtml(
    city.county,
  )}. Flat-rate pricing, fully insured, GPS-verified arrivals. Standard, deep and move-out cleaning available.</p>
  <a href="/book" class="btn-primary">Book in ${escapeHtml(label)}</a>
</div>

<div class="section">
  <p class="section-label">Services in ${escapeHtml(label)}</p>
  <h2>WHAT WE OFFER.</h2>
  <div class="services-grid">
${serviceCards}
  </div>
</div>

<div class="section" style="padding-top:0;">
  <p class="section-label">Local Detail</p>
  <h2>CLEANING ${escapeHtml(label.toUpperCase())} HOMES.</h2>
  <div class="prose">
    <p>${escapeHtml(city.housing)}</p>
    <p>${escapeHtml(city.intent)}</p>
  </div>
  <div class="local-panel">
    <p class="label">What's different here</p>
    <p>${escapeHtml(city.localNote)}</p>
  </div>
  <div class="meta-row">
    <div class="meta-item"><p class="k">County</p><p class="v">${escapeHtml(city.county)}</p></div>
    <div class="meta-item"><p class="k">ZIP Codes</p><p class="v">${escapeHtml(city.zips.join(", "))}</p></div>
    <div class="meta-item"><p class="k">Areas</p><p class="v">${list(city.neighborhoods)}</p></div>
  </div>
</div>

<div class="section" style="padding-top:0;">
  <p class="section-label">Questions</p>
  <h2>GOOD TO KNOW.</h2>
  ${renderFaqs(faqs)}
</div>

<div class="section" style="padding-top:0;">
  <p class="section-label">Nearby Areas</p>
  <h2>WE COVER THE AREA.</h2>
  <p class="prose">Near ${escapeHtml(oxford(city.landmarks))}? We are there regularly. We also serve these neighbouring communities:</p>
  <div class="area-list">
${nearbyPills}
    <span class="area-pill"><a href="/areas">All areas →</a></span>
  </div>
</div>

<div class="cta-band">
  <h2>READY FOR A CLEAN HOME IN ${escapeHtml(label.toUpperCase())}?</h2>
  <p>Flat-rate pricing. Fully insured. Book in 60 seconds.</p>
  <a href="/book" class="btn-dark">Book Now</a>
</div>`

  const schema = [
    localBusinessNode(),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Areas We Serve", path: "/areas" },
      { name: `${label} House Cleaning`, path },
    ]),
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: `House Cleaning ${label} IN`,
      serviceType: "House Cleaning",
      provider: { "@id": `${SITE.origin}/#business` },
      areaServed: {
        "@type": "City",
        name: label,
        containedInPlace: { "@type": "State", name: "Indiana" },
      },
      description: `Professional home cleaning in ${label}, ${city.county}, Indiana. Standard, deep and move-out cleaning at flat-rate pricing.`,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Cleaning services in ${label}`,
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: `${service.name} in ${label}` },
          url: `${SITE.origin}${serviceCityPath(service, city)}`,
        })),
      },
    },
    faqNode(faqs, url),
  ]

  return page({
    title: `House Cleaning ${label} IN | Novo's Cleaning`,
    description: `House cleaning in ${label}, Indiana. Standard, deep and move-out cleaning at flat-rate prices. Fully insured, GPS-verified. Serving ${city.zips.join(
      ", ",
    )}. Book online.`,
    path,
    schema,
    body,
  })
}

// -------------------------------------------------- service × city pages

function serviceCityFaqs(service, city) {
  const label = cityLabel(city)
  return [
    {
      q: `What does a ${service.name.toLowerCase()} include in ${label}?`,
      a: `${escapeHtml(service.summary)} The full checklist is above — every item is included in the flat-rate price, with no per-item add-ons.`,
    },
    {
      q: `How much does ${service.name.toLowerCase()} cost in ${label}, IN?`,
      a: `Flat-rate by home size, quoted before we arrive. Book online for an instant quote or call ${TEL_LINK}. ${escapeHtml(
        service.duration,
      )}`,
    },
    {
      q: `Why does this matter in ${label}?`,
      a: escapeHtml(city.localNote),
    },
    {
      q: `Do you serve my part of ${label}?`,
      a: `We cover ${escapeHtml(city.zips.join(", "))} across ${escapeHtml(
        city.county,
      )}, including ${oxford(city.neighborhoods)}.`,
    },
  ]
}

function renderServiceCity(service, city) {
  const label = cityLabel(city)
  const path = serviceCityPath(service, city)
  const url = `${SITE.origin}${path}`
  const faqs = serviceCityFaqs(service, city)
  const title = service.cityTitle(label)

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug)
    .map(
      (s) =>
        `    <a href="${serviceCityPath(s, city)}">${escapeHtml(s.name)} in ${escapeHtml(label)}</a>`,
    )
    .join("\n")

  const sameServiceNearby = city.nearby
    .map((slug) => CITIES.find((c) => c.slug === slug))
    .filter(Boolean)
    .slice(0, 4)
    .map(
      (n) =>
        `    <a href="${serviceCityPath(service, n)}">${escapeHtml(service.shortName)} in ${escapeHtml(
          cityLabel(n),
        )}</a>`,
    )
    .join("\n")

  const body = `<div class="hero">
  <p class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/${service.slug}">${escapeHtml(
    service.name,
  )}</a><span>›</span>${escapeHtml(label)}</p>
  <h1>${escapeHtml(service.name.toUpperCase())}<br /><span class="lime">${escapeHtml(
    label.toUpperCase(),
  )}, IN.</span></h1>
  <p class="hero-sub">${escapeHtml(service.summary)} Flat-rate pricing across ${escapeHtml(
    label,
  )} and ${escapeHtml(city.county)}.</p>
  <a href="/book" class="btn-primary">Get an Instant Quote</a>
</div>

<div class="section">
  <p class="section-label">Scope</p>
  <h2>WHAT'S INCLUDED.</h2>
  <ul class="check-list">
${service.checklist.map((item) => `    <li>${escapeHtml(item)}</li>`).join("\n")}
  </ul>
  <div class="meta-row">
    <div class="meta-item"><p class="k">Typical Duration</p><p class="v">${escapeHtml(
      service.duration,
    )}</p></div>
    <div class="meta-item"><p class="k">Best For</p><p class="v">${escapeHtml(service.bestFor)}</p></div>
  </div>
  <p class="section-label" style="margin-top:40px;">Not included</p>
  <ul class="excl-list">
${service.notIncluded.map((item) => `    <li>${escapeHtml(item)}</li>`).join("\n")}
  </ul>
</div>

<div class="section" style="padding-top:0;">
  <p class="section-label">${escapeHtml(label)} Specifics</p>
  <h2>WHY IT MATTERS HERE.</h2>
  <div class="prose">
    <p>${escapeHtml(city.housing)}</p>
    <p>${escapeHtml(city.intent)}</p>
  </div>
  <div class="local-panel">
    <p class="label">Local factor</p>
    <p>${escapeHtml(city.localNote)}</p>
  </div>
</div>

<div class="section" style="padding-top:0;">
  <p class="section-label">Questions</p>
  <h2>GOOD TO KNOW.</h2>
  ${renderFaqs(faqs)}
</div>

<div class="section" style="padding-top:0;">
  <p class="section-label">Also in ${escapeHtml(label)}</p>
  <h2>OTHER SERVICES.</h2>
  <div class="link-grid">
${otherServices}
    <a href="${cityPath(city)}">All cleaning in ${escapeHtml(label)}</a>
  </div>
  <p class="section-label" style="margin-top:40px;">${escapeHtml(service.shortName)} nearby</p>
  <div class="link-grid">
${sameServiceNearby}
  </div>
</div>

<div class="cta-band">
  <h2>BOOK ${escapeHtml(service.shortName.toUpperCase())} IN ${escapeHtml(label.toUpperCase())}</h2>
  <p>Flat-rate. Fully insured. Price before we arrive.</p>
  <a href="/book" class="btn-dark">Get My Quote</a>
</div>`

  const schema = [
    localBusinessNode(),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: service.name, path: `/${service.slug}` },
      { name: `${service.name} ${label}`, path },
    ]),
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: `${service.name} in ${label}, IN`,
      serviceType: service.name,
      provider: { "@id": `${SITE.origin}/#business` },
      areaServed: {
        "@type": "City",
        name: label,
        containedInPlace: { "@type": "State", name: "Indiana" },
      },
      description: service.summary,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.name} checklist`,
        itemListElement: service.checklist.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item },
        })),
      },
    },
    faqNode(faqs, url),
  ]

  return page({
    title: `${title} | Novo's Cleaning`,
    description: `${service.name} in ${label}, Indiana. ${service.summary} Flat-rate pricing, fully insured. Serving ${city.zips.join(
      ", ",
    )}. Book online or call ${SITE.phone}.`,
    path,
    schema,
    body,
  })
}

// ------------------------------------------------------------- areas hub

function renderAreasHub() {
  const path = "/areas"
  const url = `${SITE.origin}${path}`

  const byCounty = new Map()
  for (const city of CITIES) {
    const key = city.county
    if (!byCounty.has(key)) byCounty.set(key, [])
    byCounty.get(key).push(city)
  }

  const groups = [...byCounty.entries()]
    .map(
      ([county, cities]) => `  <p class="section-label" style="margin-top:40px;">${escapeHtml(
        county,
      )}</p>
  <div class="link-grid">
${cities
  .map((c) => `    <a href="${cityPath(c)}">${escapeHtml(cityLabel(c))}, IN</a>`)
  .join("\n")}
  </div>`,
    )
    .join("\n")

  const faqs = [
    {
      q: "What areas does Novo's Cleaning serve?",
      a: `We serve the Indianapolis metro including ${oxford(
        CITIES.slice(0, 6).map((c) => cityLabel(c)),
      )} and more, across Hamilton, Boone, Hendricks, Hancock and Johnson counties.`,
    },
    {
      q: "Do you charge a travel fee?",
      a: `No. Travel within our normal service area is included in the flat rate. If you are outside the areas listed, call ${TEL_LINK} and we will tell you honestly whether we can reach you.`,
    },
    {
      q: "My town isn't listed — can you still clean my home?",
      a: `Often yes. The list covers where we work most regularly, not a hard boundary. Call ${TEL_LINK} and we will let you know.`,
    },
  ]

  const body = `<div class="hero">
  <p class="breadcrumb"><a href="/">Home</a><span>›</span>Areas We Serve</p>
  <h1>AREAS<br /><span class="lime">WE SERVE.</span></h1>
  <p class="hero-sub">Novo's Cleaning covers the Indianapolis metro across five counties. Flat-rate pricing everywhere we go, with no travel surcharge inside the service area.</p>
  <a href="/book" class="btn-primary">Book Your Clean</a>
</div>

<div class="section">
  <p class="section-label">Coverage</p>
  <h2>${CITIES.length} COMMUNITIES.</h2>
  <div class="prose"><p>Every location below has its own page with local detail, ZIP coverage and service options. If your town is not listed, call ${TEL_LINK} — the list reflects where we work most often, not a hard limit.</p></div>
${groups}
</div>

<div class="section" style="padding-top:0;">
  <p class="section-label">Questions</p>
  <h2>GOOD TO KNOW.</h2>
  ${renderFaqs(faqs)}
</div>

<div class="cta-band">
  <h2>FIND YOUR AREA. BOOK YOUR CLEAN.</h2>
  <p>Flat-rate pricing. Fully insured. Same trusted team.</p>
  <a href="/book" class="btn-dark">Book Now</a>
</div>`

  const schema = [
    localBusinessNode(),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Areas We Serve", path },
    ]),
    {
      "@type": "ItemList",
      "@id": `${url}#areas`,
      name: "Areas served by Novo's Cleaning",
      itemListElement: CITIES.map((city, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${cityLabel(city)}, IN`,
        url: `${SITE.origin}${cityPath(city)}`,
      })),
    },
    faqNode(faqs, url),
  ]

  return page({
    title: "Areas We Serve | Indianapolis House Cleaning | Novo's Cleaning",
    description: `Novo's Cleaning serves ${CITIES.length} communities across the Indianapolis metro — Hamilton, Boone, Hendricks, Hancock and Johnson counties. Flat-rate pricing, no travel fees.`,
    path,
    schema,
    body,
  })
}

// ---------------------------------------------------------------- guides

function renderGuide(guide) {
  const path = `/guides/${guide.slug}`
  const url = `${SITE.origin}${path}`

  const sections = guide.sections
    .map(
      (section) => `<div class="section" style="padding-top:0;">
  <h3>${escapeHtml(section.h2)}</h3>
  <div class="prose">
${section.paragraphs.map((p) => `    <p>${escapeHtml(p)}</p>`).join("\n")}
  </div>
</div>`,
    )
    .join("\n\n")

  const faqs = guide.faqs.map((faq) => ({ q: faq.q, a: escapeHtml(faq.a) }))

  const body = `<div class="hero">
  <p class="breadcrumb"><a href="/">Home</a><span>›</span><a href="/guides">Guides</a><span>›</span>${escapeHtml(
    guide.title,
  )}</p>
  <h1>${escapeHtml(guide.title.toUpperCase())}</h1>
  <p class="hero-sub">${escapeHtml(guide.summary)}</p>
  <a href="/book" class="btn-primary">Get an Instant Quote</a>
</div>

${sections}

<div class="section" style="padding-top:0;">
  <p class="section-label">Questions</p>
  <h2>QUICK ANSWERS.</h2>
  ${renderFaqs(faqs)}
</div>

<div class="section" style="padding-top:0;">
  <p class="section-label">Keep Reading</p>
  <div class="link-grid">
${GUIDES.filter((g) => g.slug !== guide.slug)
  .map((g) => `    <a href="/guides/${g.slug}">${escapeHtml(g.title)}</a>`)
  .join("\n")}
    <a href="/areas">Areas we serve</a>
  </div>
</div>

<div class="cta-band">
  <h2>WANT IT DONE FOR YOU?</h2>
  <p>Flat-rate pricing. Fully insured. Price before we arrive.</p>
  <a href="/book" class="btn-dark">Book Now</a>
</div>`

  const schema = [
    localBusinessNode(),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path },
    ]),
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.title,
      description: guide.description,
      datePublished: guide.published,
      dateModified: BUILD_DATE,
      author: { "@id": `${SITE.origin}/#business` },
      publisher: { "@id": `${SITE.origin}/#business` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    faqNode(faqs, url),
  ]

  return page({
    title: `${guide.title} | Novo's Cleaning`,
    description: guide.description,
    path,
    schema,
    body,
  })
}

function renderGuidesHub() {
  const path = "/guides"
  const url = `${SITE.origin}${path}`

  const cards = GUIDES.map(
    (guide) => `    <div class="svc-card">
      <p class="type">Guide</p>
      <p class="name">${escapeHtml(guide.title.toUpperCase())}</p>
      <p class="desc">${escapeHtml(guide.summary)}</p>
      <a href="/guides/${guide.slug}">Read the guide →</a>
    </div>`,
  ).join("\n")

  const body = `<div class="hero">
  <p class="breadcrumb"><a href="/">Home</a><span>›</span>Guides</p>
  <h1>CLEANING<br /><span class="lime">GUIDES.</span></h1>
  <p class="hero-sub">Straight answers on pricing, scope and scheduling for Indianapolis homes. No fluff, no upsell — just what we would tell you on the phone.</p>
  <a href="/book" class="btn-primary">Get an Instant Quote</a>
</div>

<div class="section">
  <p class="section-label">All Guides</p>
  <h2>WORTH READING.</h2>
  <div class="services-grid">
${cards}
  </div>
</div>

<div class="cta-band">
  <h2>READY WHEN YOU ARE.</h2>
  <p>Flat-rate pricing. Fully insured. Book in 60 seconds.</p>
  <a href="/book" class="btn-dark">Book Now</a>
</div>`

  const schema = [
    localBusinessNode(),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Guides", path },
    ]),
    {
      "@type": "ItemList",
      "@id": `${url}#guides`,
      itemListElement: GUIDES.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: `${SITE.origin}/guides/${guide.slug}`,
      })),
    },
  ]

  return page({
    title: "House Cleaning Guides | Novo's Cleaning Indianapolis",
    description:
      "Practical guides on house cleaning costs, deep vs standard cleaning, move-out checklists and scheduling for Indianapolis-area homes.",
    path,
    schema,
    body,
  })
}

// ----------------------------------------------------------------- sitemap

function renderSitemap(entries) {
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${SITE.origin}${entry.path === "/" ? "/" : entry.path}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

// -------------------------------------------------------------------- run

for (const city of CITIES) {
  emit(`${cityPath(city)}`, renderCity(city), "0.8")
}

for (const service of SERVICES) {
  for (const city of CITIES) {
    emit(serviceCityPath(service, city), renderServiceCity(service, city), "0.7")
  }
}

emit("/areas", renderAreasHub(), "0.9")
emit("/guides", renderGuidesHub(), "0.8")
for (const guide of GUIDES) {
  emit(`/guides/${guide.slug}`, renderGuide(guide), "0.7")
}

const sitemapEntries = [...HAND_BUILT, ...generated].sort(
  (a, b) => Number(b.priority) - Number(a.priority) || a.path.localeCompare(b.path),
)
writeFileSync(join(ROOT, "sitemap.xml"), renderSitemap(sitemapEntries), "utf8")

console.log(`Generated ${generated.length} pages:`)
console.log(`  ${CITIES.length} city pages`)
console.log(`  ${SERVICES.length * CITIES.length} service x city pages`)
console.log(`  1 areas hub, 1 guides hub, ${GUIDES.length} guides`)
console.log(`Sitemap: ${sitemapEntries.length} URLs (lastmod ${BUILD_DATE})`)

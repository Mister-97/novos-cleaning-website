/**
 * Per-city source data for Novo's Cleaning location pages.
 *
 * Every field here exists to make each page genuinely different from the others.
 * Google filters near-duplicate location pages ("doorway pages"), so a page that
 * is just the template with the city name swapped is worse than no page at all.
 * If you add a city, fill in real, specific detail — do not copy another city's.
 */

export const CITIES = [
  {
    slug: "carmel",
    name: "Carmel",
    county: "Hamilton County",
    zips: ["46032", "46033", "46074", "46082"],
    neighborhoods: ["Village of WestClay", "Brookshire", "Cool Creek North", "Old Town Carmel", "Jackson's Grant"],
    landmarks: ["the Arts & Design District", "Clay Terrace", "the Monon Trail", "Carter Green"],
    housing:
      "Carmel's housing runs from the mid-century ranches around Old Town to large newer builds in Village of WestClay and Jackson's Grant. The bigger Carmel homes routinely run 3,500 sq ft and up with finished basements and multiple full baths, which is why flat-rate pricing by home size matters more here than an hourly quote.",
    localNote:
      "Carmel homes tend to have a lot of hard-surface flooring — engineered hardwood and luxury vinyl plank through the main level — so the time goes into edges, baseboards and streak-free mopping rather than carpet work. Homes backing onto the Monon Trail also track in noticeably more grit through spring and fall.",
    intent:
      "Most Carmel requests we take are recurring biweekly cleans for working households, plus a spike in deep cleans before the holidays and around the Christkindlmarkt season.",
    nearby: ["westfield", "zionsville", "noblesville", "fishers", "whitestown"],
  },
  {
    slug: "fishers",
    name: "Fishers",
    county: "Hamilton County",
    zips: ["46037", "46038", "46085"],
    neighborhoods: ["Sunblest", "Avalon of Fishers", "Brooks Chase", "Geist Overlook", "Harrison Green"],
    landmarks: ["the Nickel Plate District", "Conner Prairie", "Fishers District", "Geist Reservoir"],
    housing:
      "Fishers is dominated by 1990s-through-2010s subdivision builds — three and four bedroom two-storeys with attached garages and open main floors. Square footage is fairly consistent, which makes quoting predictable, and most homes have a mix of carpet upstairs and hard floor down.",
    localNote:
      "Homes on the Geist side of Fishers deal with lake humidity, so bathroom and basement work here leans harder on mildew-prone grout, window tracks and vent covers than it does elsewhere in Hamilton County.",
    intent:
      "Fishers skews toward recurring biweekly and monthly cleans for dual-income families, with move-out cleans clustering near the end of school-year relocations.",
    nearby: ["noblesville", "carmel", "mccordsville", "geist", "westfield"],
  },
  {
    slug: "noblesville",
    name: "Noblesville",
    county: "Hamilton County",
    zips: ["46060", "46061", "46062"],
    neighborhoods: ["Harbour Trees", "Stony Creek", "Potters Bridge area", "Wellington", "Christian Estates"],
    landmarks: ["the Historic Courthouse Square", "Morse Reservoir", "Ruoff Music Center", "Federal Hill Commons"],
    housing:
      "Noblesville splits between genuinely old housing stock near the Courthouse Square — original woodwork, older tile, radiators in places — and large newer subdivisions pushing north and east. Those are two different cleaning jobs, and the older homes usually need a deep clean first before a recurring schedule makes sense.",
    localNote:
      "The Morse Reservoir properties bring in the same waterfront issues as Geist: more window and track work, more humidity in lower levels, and a heavier seasonal swing between summer and winter use.",
    intent:
      "Noblesville generates a high share of first-time deep cleans, largely because of the older housing near downtown, followed by recurring service once the baseline is set.",
    nearby: ["fishers", "westfield", "carmel", "fortville", "geist"],
  },
  {
    slug: "westfield",
    name: "Westfield",
    county: "Hamilton County",
    zips: ["46074"],
    neighborhoods: ["Chatham Hills", "Viking Meadows", "Maple Knoll", "Oak Manor", "Bridgewater"],
    landmarks: ["Grand Park Sports Campus", "downtown Westfield", "the Monon Trail extension"],
    housing:
      "Westfield is one of the fastest-growing communities in Indiana and it shows in the housing — a large share of the stock is under twenty years old, with newer luxury inventory around Chatham Hills and Bridgewater. New construction means less deferred grime but more square footage per home.",
    localNote:
      "Grand Park drives a genuinely unusual pattern here: tournament weekends fill homes with visiting family, and we see a clear rhythm of pre-arrival and post-departure cleans through the spring and summer sports calendar that other suburbs don't have.",
    intent:
      "Westfield requests skew larger-home recurring service, plus short-notice turnover cleans tied to the Grand Park schedule.",
    nearby: ["carmel", "noblesville", "zionsville", "whitestown", "fishers"],
  },
  {
    slug: "zionsville",
    name: "Zionsville",
    county: "Boone County",
    zips: ["46077"],
    neighborhoods: ["Holliday Farms", "Austin Oaks", "Stonegate", "the Village", "Royal Run"],
    landmarks: ["the brick-paved Main Street", "Starkey Park", "Zionsville Golf Course"],
    housing:
      "Zionsville pairs a genuinely historic core around the brick street Village with large-acreage and luxury builds further out. The Village homes are older, often with original hardwood and detailed trim that needs a lighter touch and more hand-detail work than a modern build.",
    localNote:
      "Acreage properties in Zionsville track in far more outdoor debris than a typical subdivision lot — entry work, mudrooms and hard-floor edges take a disproportionate share of the visit, especially in wet months.",
    intent:
      "Zionsville leans toward larger recurring cleans and detail-sensitive work in the older Village homes where finish quality matters as much as coverage.",
    nearby: ["whitestown", "carmel", "westfield", "brownsburg", "avon"],
  },
  {
    slug: "whitestown",
    name: "Whitestown",
    county: "Boone County",
    zips: ["46075"],
    neighborhoods: ["Anson", "Walker Farms", "Harvest Ridge", "Maple Grove"],
    landmarks: ["the Anson development", "Whitestown Municipal Complex", "the I-65 corridor"],
    housing:
      "Whitestown is among the fastest-growing towns in the state and the housing is overwhelmingly new — Anson and Walker Farms in particular are dominated by builds from the last fifteen years. Newer homes mean less accumulated buildup but a lot of light-coloured LVP and tile that shows every streak.",
    localNote:
      "The I-65 logistics corridor means a large share of Whitestown households work shift schedules, so access and scheduling flexibility matter more here than almost anywhere else we serve — lockbox and app-based entry is the norm rather than the exception.",
    intent:
      "Whitestown is mostly recurring service for newer homes, with a steady flow of move-in cleans as new construction closes.",
    nearby: ["zionsville", "brownsburg", "westfield", "carmel", "avon"],
  },
  {
    slug: "brownsburg",
    name: "Brownsburg",
    county: "Hendricks County",
    zips: ["46112"],
    neighborhoods: ["Arbuckle Acres area", "Cardinal Estates", "Hunters Ridge", "Timber Trails"],
    landmarks: ["Arbuckle Acres Park", "the B&O Trail", "downtown Brownsburg"],
    housing:
      "Brownsburg's stock is a mix of established 1970s–1990s family homes and newer subdivision growth on the edges. The established homes frequently still have original bathroom tile and grout, which is the single most common reason a first visit here gets booked as a deep clean.",
    localNote:
      "Brownsburg has a strong motorsports industry presence, and shop and garage work follows people home — garage-entry mudrooms, laundry rooms and utility sinks get noticeably harder use than in neighbouring towns.",
    intent:
      "Brownsburg households book a high proportion of first-time deep cleans followed by monthly recurring service.",
    nearby: ["avon", "whitestown", "zionsville", "plainfield"],
  },
  {
    slug: "avon",
    name: "Avon",
    county: "Hendricks County",
    zips: ["46123"],
    neighborhoods: ["Avon Village", "Hampton Green", "Prestwick", "Sugar Grove", "Winding Ridge"],
    landmarks: ["Washington Township Park", "Avon Gardens", "White Lick Creek"],
    housing:
      "Avon grew fast through the 2000s, so a large share of homes are two-storey family builds of similar vintage and layout. Prestwick adds a pocket of older, larger golf-course properties that need a different scope than the standard subdivision home.",
    localNote:
      "Properties along White Lick Creek and the older tree-lined streets deal with far more pollen and organic debris in spring — window sills, tracks and entry areas need attention that a newer, more exposed lot simply doesn't.",
    intent:
      "Avon is predominantly recurring biweekly family-home service, with deep cleans concentrated in spring.",
    nearby: ["plainfield", "brownsburg", "whitestown", "zionsville"],
  },
  {
    slug: "plainfield",
    name: "Plainfield",
    county: "Hendricks County",
    zips: ["46168"],
    neighborhoods: ["Saratoga", "Whittier Place", "Meadows at Cambridge", "Vandalia Farms"],
    landmarks: ["Hummel Park", "Splash Island", "the Shops at Perry Crossing", "the Vandalia Trail"],
    housing:
      "Plainfield combines older homes near the original town centre with substantial newer subdivision development. Home sizes vary more here than in most of Hendricks County, so quoting by bedroom and bathroom count rather than a flat hourly rate matters.",
    localNote:
      "Plainfield sits in the middle of one of the largest logistics and distribution corridors in the Midwest. Shift work is extremely common, and a meaningful share of our Plainfield cleans are scheduled around non-standard hours with keyless entry.",
    intent:
      "Plainfield sees a strong mix of recurring service and move-out cleans, the latter driven by rental turnover near the distribution corridor.",
    nearby: ["avon", "brownsburg", "bargersville"],
  },
  {
    slug: "greenfield",
    name: "Greenfield",
    county: "Hancock County",
    zips: ["46140"],
    neighborhoods: ["Riley Park area", "Brandywine", "Meridian Parke", "Blue Road"],
    landmarks: ["the James Whitcomb Riley birthplace", "Riley Park", "the Pennsy Trail", "the Hancock County Courthouse"],
    housing:
      "As the Hancock County seat, Greenfield has genuinely old housing near the courthouse square — late-1800s and early-1900s homes with original floors, tall baseboards and detailed millwork — alongside newer development on the north and west sides.",
    localNote:
      "The older Greenfield homes are the most detail-intensive properties we clean anywhere in the metro. Original trim, transoms and radiator surrounds take hand-work, and pricing a home like that off square footage alone consistently understates the job.",
    intent:
      "Greenfield generates a high share of first-time deep cleans on historic homes, plus standard recurring service in the newer subdivisions.",
    nearby: ["new-palestine", "fortville", "mccordsville"],
  },
  {
    slug: "fortville",
    name: "Fortville",
    county: "Hancock County",
    zips: ["46040"],
    neighborhoods: ["downtown Fortville", "Fox Hollow", "Wheeler Landing", "Cross Creek"],
    landmarks: ["Main Street Fortville", "Landmark Park", "the Vernon Township area"],
    housing:
      "Fortville is a small historic town with a walkable Main Street and a tight core of older homes, ringed by newer subdivision growth spilling over from the Geist and McCordsville side. The older core homes often have basements that need separate scoping.",
    localNote:
      "Fortville's older downtown homes frequently have unfinished or partially finished basements used as laundry and storage, which is the most common add-on request we get here and the thing most often left out of a competitor's quote.",
    intent:
      "Fortville books a balanced mix of recurring standard cleans and one-off deep cleans on the older Main Street housing.",
    nearby: ["mccordsville", "greenfield", "noblesville", "geist"],
  },
  {
    slug: "mccordsville",
    name: "McCordsville",
    county: "Hancock County",
    zips: ["46055"],
    neighborhoods: ["Emerald Springs", "Bay Creek", "Gateway Crossing", "Villages at Brookside"],
    landmarks: ["the Geist Reservoir shoreline", "Mt. Vernon schools area", "Broadway corridor"],
    housing:
      "McCordsville has grown very quickly and the housing reflects it — the large majority of homes are recent subdivision builds, many under fifteen years old, with open main floors and second-floor laundry.",
    localNote:
      "McCordsville sits on the Hancock County side of the Geist basin, so a portion of the housing shares the reservoir's humidity profile: more attention to lower-level air quality, bathroom grout and window tracks than a comparable inland build needs.",
    intent:
      "McCordsville is heavily recurring service for newer family homes, plus move-in cleans tied to continuing construction.",
    nearby: ["geist", "fortville", "fishers", "greenfield"],
  },
  {
    slug: "new-palestine",
    name: "New Palestine",
    county: "Hancock County",
    zips: ["46163"],
    neighborhoods: ["Sugar Creek Township", "Bridlewood", "Bell Ridge", "Heritage Cove"],
    landmarks: ["downtown New Palestine", "Sugar Creek", "the Southeastern schools area"],
    housing:
      "New Palestine is a smaller community with a notable share of homes on larger lots, plus steady newer subdivision development. Properties on acreage here behave more like rural homes than suburban ones from a cleaning standpoint.",
    localNote:
      "Larger lots and gravel or long driveways mean significantly more dust and grit reaching the interior. Entryways, mudrooms and hard-floor edges are the priority in New Palestine homes, and they're the first thing to look worse if a schedule is stretched too far.",
    intent:
      "New Palestine leans toward monthly recurring service on larger properties, with periodic deep cleans rather than tight biweekly cycles.",
    nearby: ["greenfield", "mccordsville", "fortville"],
  },
  {
    slug: "bargersville",
    name: "Bargersville",
    county: "Johnson County",
    zips: ["46106"],
    neighborhoods: ["Center Grove area", "Heritage Woods", "Sawmill", "Cobblestone"],
    landmarks: ["downtown Bargersville", "the Center Grove corridor", "Johnson County farmland edge"],
    housing:
      "Bargersville has expanded sharply along the Center Grove corridor, adding large newer family homes to what was a small-town core. Newer builds here tend to be generously sized, with bonus rooms and finished basements common.",
    localNote:
      "Bargersville sits where suburban development meets working farmland, and that boundary shows up indoors — seasonal field dust during planting and harvest is a genuine factor, and homes on the southern and western edges need more frequent hard-surface attention in those windows.",
    intent:
      "Bargersville books mostly recurring service for larger family homes, with deep cleans clustering after harvest season.",
    nearby: ["trafalgar", "plainfield"],
  },
  {
    slug: "trafalgar",
    name: "Trafalgar",
    county: "Johnson County",
    zips: ["46181"],
    neighborhoods: ["Hensley Township", "Prince's Lakes area", "Sweetwater"],
    landmarks: ["the Brown County State Park approach", "Hensley Township", "Johnson County backroads"],
    housing:
      "Trafalgar is genuinely rural. Homes sit on acreage, many with detached outbuildings, wood heat, and long unpaved approaches. Square footage varies enormously and a standard suburban quote rarely fits.",
    localNote:
      "Wood stoves and unpaved drives are the two defining factors in Trafalgar homes. Fine ash settles on every horizontal surface and requires a different approach than ordinary household dust, and drive grit means entry and hard-floor work dominates the visit.",
    intent:
      "Trafalgar is mostly monthly or six-week recurring service, plus seasonal deep cleans at the end of heating season.",
    nearby: ["bargersville"],
  },
  {
    slug: "geist",
    name: "Geist",
    displayName: "Geist Reservoir",
    county: "the Marion, Hamilton and Hancock county line",
    zips: ["46055", "46236", "46256"],
    neighborhoods: ["Sunblest Farms", "Admirals Bay", "Bridgewater Club area", "Geist Overlook", "Fall Creek"],
    landmarks: ["Geist Reservoir", "Geist Marina", "the Fall Creek corridor"],
    housing:
      "The Geist area is defined by the reservoir. Waterfront and near-waterfront homes are typically large, with extensive glazing, walkout lower levels, decks and boat access — a materially different property type from anywhere else in the metro.",
    localNote:
      "Waterfront homes are the most window-intensive properties we clean. Lake-facing glass, tracks and screens carry a constant film, walkout lower levels run humid, and seasonal use means many Geist homes need a heavy open-up clean in spring and a close-down clean in autumn.",
    intent:
      "Geist splits between year-round recurring service for primary residences and seasonal open-up and close-down deep cleans for part-time waterfront use.",
    nearby: ["fishers", "mccordsville", "fortville", "noblesville"],
  },
]

export const CITY_BY_SLUG = Object.fromEntries(CITIES.map((c) => [c.slug, c]))

/** Path segment used by the existing site: /carmel-house-cleaning */
export function cityPath(city) {
  return `/${city.slug}-house-cleaning`
}

export function cityLabel(city) {
  return city.displayName ?? city.name
}

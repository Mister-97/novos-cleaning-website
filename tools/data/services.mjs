/**
 * Service definitions shared by the service hub pages and the service × city pages.
 * `checklist` drives on-page content and the ItemList schema, so keep it accurate —
 * it is a public statement of what is included in the price.
 */

export const SERVICES = [
  {
    slug: "standard-cleaning",
    name: "Standard Cleaning",
    shortName: "Standard Clean",
    // Used in <title> / H1 for service × city pages
    cityTitle: (city) => `House Cleaning in ${city} IN`,
    kicker: "Most Popular",
    summary:
      "Recurring upkeep for a home that is already in reasonable shape. Kitchens, bathrooms, floors, dusting and trash throughout.",
    checklist: [
      "Kitchen counters, exterior of appliances, sink and cooktop",
      "All bathrooms: toilets, tubs, showers, sinks, mirrors",
      "Vacuuming of all carpeted areas and rugs",
      "Mopping of all hard-surface flooring",
      "Dusting of reachable surfaces, sills and fixtures",
      "Trash and recycling removed to the bin",
      "Beds made and visible clutter tidied",
    ],
    bestFor:
      "Households on a biweekly or monthly rhythm who want the home held at a consistent standard rather than reset from scratch.",
    notIncluded: ["Inside the oven", "Inside the refrigerator", "Interior windows", "Walls and cabinet interiors"],
    duration: "Typically 2–4 hours depending on home size.",
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    shortName: "Deep Clean",
    cityTitle: (city) => `Deep Cleaning in ${city} IN`,
    kicker: "Top to Bottom",
    summary:
      "A full reset. Everything in a standard clean plus the built-up areas that routine cleaning never reaches.",
    checklist: [
      "Everything included in a standard clean",
      "Inside the oven, degreased",
      "Inside the refrigerator, shelves wiped",
      "Baseboards hand-wiped throughout",
      "Cabinet fronts and interiors where accessible",
      "Vent covers, window sills and tracks",
      "Door frames, switch plates and high-touch points",
      "Grout and tile detail in kitchens and bathrooms",
    ],
    bestFor:
      "First-time visits, homes that have gone a while between cleans, seasonal resets, and any property with older tile or original trim.",
    notIncluded: ["Exterior windows", "Carpet shampooing", "Post-construction debris"],
    duration: "Typically 4–8 hours depending on home size and condition.",
  },
  {
    slug: "move-out-cleaning",
    name: "Move-Out Cleaning",
    shortName: "Move-Out Clean",
    cityTitle: (city) => `Move-Out Cleaning in ${city} IN`,
    kicker: "Moving?",
    summary:
      "A complete clean of an empty property, scoped to pass a landlord, buyer or property-manager walkthrough.",
    checklist: [
      "Every room cleaned top to bottom with the property empty",
      "All cabinets and drawers cleaned inside and out",
      "Inside oven, refrigerator, dishwasher and microwave",
      "All appliances moved where safely possible",
      "Baseboards, door frames and switch plates",
      "Wall spot-cleaning for marks and scuffs",
      "Closets, shelving and storage areas",
      "Final floor pass throughout",
    ],
    bestFor:
      "Tenants trying to recover a deposit, sellers preparing for closing, and landlords turning a unit between renters.",
    notIncluded: ["Trash or furniture hauling", "Exterior or garage pressure washing", "Carpet replacement"],
    duration: "Typically 4–8 hours; empty properties clean faster per square foot.",
  },
]

export const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]))

/** /deep-cleaning-carmel — service × city landing path. */
export function serviceCityPath(service, city) {
  return `/${service.slug}-${city.slug}`
}

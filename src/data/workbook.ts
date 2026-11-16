/**
 * Fake data copied from the Kyoto Weekend Content Workbook
 * (kyoto_weekend_content.xlsx, compiled 2025-03-07).
 *
 * One row per sheet, typed exactly as the sheet's columns.
 * Prices are USD for 2 guests, against a $600 reference budget.
 * The workbook has no photo URLs (image rights not cleared), so cards
 * use grey image placeholders.
 *
 * Why these rows:
 * - Stays S1: the Gion townhouse, central to the picks below.
 * - Experiences E1: open spots, in Gion. E3 is sold out, so it is skipped.
 * - Food F1: Gion, an 8-minute walk from the stay, and keeps the
 *   weekend under budget ($366 + $116 + $34 = $516 of $600).
 */

export type StayRow = {
  optionId: string;
  listingTitle: string;
  propertyType: string;
  neighbourhood: string;
  nights: number;
  pricePerNightUsd: number;
  totalFor2NightsUsd: number;
  guestRating: number;
  reviewCount: number;
  hostFirstName: string;
  highlight: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
};

export type ExperienceRow = {
  optionId: string;
  experienceTitle: string;
  category: string;
  hostFirstName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationHours: number;
  pricePerGuestUsd: number;
  totalFor2GuestsUsd: number;
  rating: number;
  meetingPoint: string;
  availability: string;
};

export type FoodRow = {
  optionId: string;
  placeName: string;
  cuisine: string;
  neighbourhood: string;
  meal: string;
  priceLevel: string;
  estCostFor2Usd: number;
  walkFromStayMin: number;
  bookingNote: string;
};

/** Sheet "Stays", row S1 */
export const stayRow: StayRow = {
  optionId: "S1",
  listingTitle: "Restored machiya townhouse near Gion",
  propertyType: "Entire townhouse",
  neighbourhood: "Gion",
  nights: 2,
  pricePerNightUsd: 168,
  totalFor2NightsUsd: 366,
  guestRating: 4.92,
  reviewCount: 214,
  hostFirstName: "Kenji",
  highlight: "Private garden and cedar soaking tub",
  checkInDate: "2025-04-11",
  checkOutDate: "2025-04-13",
};

/** Sheet "Experiences", row E1 */
export const experienceRow: ExperienceRow = {
  optionId: "E1",
  experienceTitle: "Tea ceremony in a 100-year-old machiya",
  category: "Culture",
  hostFirstName: "Mei",
  date: "2025-04-12",
  startTime: "10:30",
  durationHours: 2,
  pricePerGuestUsd: 58,
  totalFor2GuestsUsd: 116,
  rating: 4.96,
  meetingPoint: "Outside Gion-Shijo Station, exit 6",
  availability: "Spots open",
};

/** Sheet "Food", row F1 */
export const foodRow: FoodRow = {
  optionId: "F1",
  placeName: "Menya Inoichi",
  cuisine: "Ramen",
  neighbourhood: "Gion",
  meal: "Dinner",
  priceLevel: "$",
  estCostFor2Usd: 34,
  walkFromStayMin: 8,
  bookingNote: "No reservations - arrive before 18:00",
};

export const REFERENCE_BUDGET_USD = 600;

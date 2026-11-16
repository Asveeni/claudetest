/**
 * The mock response: fake data that stands in for the assistant's real
 * answer. Shape follows the card spec ("cardType" + "details"), and the
 * items always come in this order: stay, experience, food.
 */
import {
  experienceRow,
  foodRow,
  REFERENCE_BUDGET_USD,
  stayRow,
} from "./workbook";

export type StayDetails = {
  sourceRow: string;
  destination: string;
  listingTitle: string;
  propertyType: string;
  neighbourhood: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  nightlyPriceUsd: number;
  totalPriceUsd: number;
  rating: number;
  reviewCount: number;
  hostFirstName: string;
  description: string;
};

export type ExperienceDetails = {
  sourceRow: string;
  activityName: string;
  category: string;
  hostFirstName: string;
  duration: string;
  dayPlan: { day: string; plan: string }[];
  meetingPoint: string;
  pricePerGuestUsd: number;
  totalPriceUsd: number;
  rating: number;
  availability: string;
};

export type FoodDetails = {
  sourceRow: string;
  restaurantName: string;
  cuisine: string;
  neighbourhood: string;
  mealType: string;
  priceRange: string;
  estCostUsd: number;
  walkFromStayMin: number;
  description: string;
};

export type MockCard =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };

export type MockResponse = {
  intro: string;
  cards: MockCard[];
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-04-12" -> "Sat 12 Apr". Parsed as UTC so the day never shifts by time zone. */
export function shortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** "No reservations - arrive before 18:00" -> "No reservations. Arrive before 18:00." */
function sentences(note: string): string {
  return note
    .split(" - ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(". ")
    .concat(".");
}

function hours(n: number): string {
  return n === 1 ? "1 hour" : `${n} hours`;
}

const stay: MockCard = {
  cardType: "stay",
  details: {
    sourceRow: `Stays ${stayRow.optionId}`,
    destination: "Kyoto, Japan",
    listingTitle: stayRow.listingTitle,
    propertyType: stayRow.propertyType,
    neighbourhood: stayRow.neighbourhood,
    checkIn: stayRow.checkInDate,
    checkOut: stayRow.checkOutDate,
    nights: stayRow.nights,
    nightlyPriceUsd: stayRow.pricePerNightUsd,
    totalPriceUsd: stayRow.totalFor2NightsUsd,
    rating: stayRow.guestRating,
    reviewCount: stayRow.reviewCount,
    hostFirstName: stayRow.hostFirstName,
    description: stayRow.highlight,
  },
};

const experience: MockCard = {
  cardType: "experience",
  details: {
    sourceRow: `Experiences ${experienceRow.optionId}`,
    activityName: experienceRow.experienceTitle,
    category: experienceRow.category,
    hostFirstName: experienceRow.hostFirstName,
    duration: hours(experienceRow.durationHours),
    dayPlan: [
      {
        day: shortDate(experienceRow.date),
        plan: `${experienceRow.startTime} start`,
      },
    ],
    meetingPoint: experienceRow.meetingPoint,
    pricePerGuestUsd: experienceRow.pricePerGuestUsd,
    totalPriceUsd: experienceRow.totalFor2GuestsUsd,
    rating: experienceRow.rating,
    availability: experienceRow.availability,
  },
};

const food: MockCard = {
  cardType: "food",
  details: {
    sourceRow: `Food ${foodRow.optionId}`,
    restaurantName: foodRow.placeName,
    cuisine: foodRow.cuisine,
    neighbourhood: foodRow.neighbourhood,
    mealType: foodRow.meal,
    priceRange: foodRow.priceLevel,
    estCostUsd: foodRow.estCostFor2Usd,
    walkFromStayMin: foodRow.walkFromStayMin,
    description: sentences(foodRow.bookingNote),
  },
};

const weekendTotal =
  stayRow.totalFor2NightsUsd + experienceRow.totalFor2GuestsUsd + foodRow.estCostFor2Usd;

export const mockResponse: MockResponse = {
  intro: `Here's a Kyoto weekend for two, ${shortDate(stayRow.checkInDate)} to ${shortDate(
    stayRow.checkOutDate,
  )}. Everything is in or near Gion, and it comes to about $${weekendTotal} of your $${REFERENCE_BUDGET_USD} budget.`,
  cards: [stay, experience, food],
};

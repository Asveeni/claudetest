import type { StayDetails } from "@/data/mockResponse";
import { shortDate } from "@/data/mockResponse";
import { CARD_SHELL, ImagePlaceholder, Rating } from "./shared";

/**
 * Stay card — wide banner image on top, travel dates as the biggest text,
 * coral top border as the accent.
 */
export function StayCard({ d }: { d: StayDetails }) {
  return (
    <article
      aria-label={`Stay: ${d.listingTitle}`}
      className={`${CARD_SHELL} border-t-4 border-t-coral-500`}
    >
      <ImagePlaceholder className="h-28 w-full" label="Photo of the stay" />

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-coral-600">Stay</p>
        <p className="text-xl font-bold leading-tight text-stone-900">
          {shortDate(d.checkIn)} – {shortDate(d.checkOut)}
        </p>
        <h3 className="text-[15px] font-semibold leading-snug text-stone-800">{d.listingTitle}</h3>
        <p className="text-sm text-stone-600">
          {d.nights} nights · {d.propertyType} · {d.neighbourhood}, {d.destination}
        </p>
        <p className="text-sm text-stone-600">{d.description}</p>

        <div className="mt-auto flex items-end justify-between pt-2">
          <p className="text-sm text-stone-800">
            <span className="text-base font-bold">${d.nightlyPriceUsd}</span> / night
            <span className="block text-xs text-stone-500">${d.totalPriceUsd} total for 2 nights</span>
          </p>
          <Rating value={d.rating} count={d.reviewCount} />
        </div>
      </div>
    </article>
  );
}

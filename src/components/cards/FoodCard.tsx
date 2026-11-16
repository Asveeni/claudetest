import type { FoodDetails } from "@/data/mockResponse";
import { CARD_SHELL, ImagePlaceholder } from "./shared";

/**
 * Food card — no banner; a small round thumbnail top right, restaurant
 * name as the biggest text, amber meal-type and price label as the accent.
 */
export function FoodCard({ d }: { d: FoodDetails }) {
  return (
    <article aria-label={`Food: ${d.restaurantName}`} className={CARD_SHELL}>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Food · {d.cuisine}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-stone-900">{d.restaurantName}</h3>
          </div>
          <ImagePlaceholder className="h-16 w-16 shrink-0 rounded-full" label="Photo of the dish" round />
        </div>

        <p>
          <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-sm font-bold text-amber-800">
            {d.mealType} · {d.priceRange}
          </span>
        </p>
        <p className="text-sm text-stone-600">{d.neighbourhood}, Kyoto</p>

        <p className="flex items-center gap-2 text-sm text-stone-700">
          <span className="h-2 w-2 rounded-full bg-coral-500" aria-hidden />
          Your stay
          <span className="h-px flex-1 border-t-2 border-dashed border-amber-400" aria-hidden />
          {d.walkFromStayMin} min walk
        </p>

        <p className="rounded-lg bg-stone-100 px-3 py-2 text-sm text-stone-700">{d.description}</p>

        <p className="mt-auto pt-2 text-sm text-stone-800">
          About <span className="text-base font-bold">${d.estCostUsd}</span> for 2
        </p>
      </div>
    </article>
  );
}

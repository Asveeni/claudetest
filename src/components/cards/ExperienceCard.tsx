import type { ExperienceDetails } from "@/data/mockResponse";
import { CARD_SHELL, ImagePlaceholder, Rating } from "./shared";

/**
 * Experience card — tall image strip down the left, activity name as the
 * biggest text, purple day labels as the accent.
 */
export function ExperienceCard({ d }: { d: ExperienceDetails }) {
  return (
    <article aria-label={`Experience: ${d.activityName}`} className={`${CARD_SHELL} flex-row`}>
      <ImagePlaceholder className="h-full w-24 shrink-0" label="Photo of the experience" vertical />

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-plum-600">
          Experience · {d.category}
        </p>
        <h3 className="text-xl font-bold leading-tight text-stone-900">{d.activityName}</h3>
        <p className="text-sm text-stone-600">
          {d.duration} · Hosted by {d.hostFirstName}
        </p>

        <ul className="mt-1 flex flex-col gap-1.5">
          {d.dayPlan.map((p) => (
            <li key={p.day} className="flex items-start gap-2 text-sm text-stone-700">
              <span className="shrink-0 rounded-md bg-plum-100 px-1.5 py-0.5 text-xs font-bold uppercase text-plum-700">
                {p.day}
              </span>
              <span className="leading-snug">{p.plan}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-snug text-stone-500">Meet: {d.meetingPoint}</p>

        <div className="mt-auto flex items-end justify-between pt-2">
          <p className="text-sm text-stone-800">
            <span className="text-base font-bold">${d.pricePerGuestUsd}</span> / guest
            <span className="block text-xs text-stone-500">
              ${d.totalPriceUsd} for 2 · <span className="text-emerald-700">{d.availability}</span>
            </span>
          </p>
          <Rating value={d.rating} />
        </div>
      </div>
    </article>
  );
}

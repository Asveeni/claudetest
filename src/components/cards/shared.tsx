/** Every card uses this shell, so all three are the same width and height. */
export const CARD_SHELL =
  "flex h-[360px] w-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm";

/**
 * Grey box standing in for a photo. The workbook has no photo URLs
 * because image rights for the prototype are not cleared.
 */
export function ImagePlaceholder({
  className = "",
  label,
  round = false,
  vertical = false,
}: {
  className?: string;
  label: string;
  round?: boolean;
  vertical?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} (placeholder)`}
      className={`flex items-center justify-center bg-stone-200 text-stone-400 ${className}`}
    >
      {!round && (
        <span className={`text-[11px] font-medium ${vertical ? "[writing-mode:vertical-rl]" : ""}`}>
          Photo
        </span>
      )}
    </div>
  );
}

export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <p className="shrink-0 whitespace-nowrap text-sm text-stone-700" aria-label={`Rated ${value} out of 5`}>
      <span aria-hidden className="text-stone-900">★</span> {value.toFixed(2)}
      {count !== undefined && <span className="text-stone-500"> ({count})</span>}
    </p>
  );
}

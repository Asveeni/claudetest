/**
 * The assistant's reply bubble while the (mock) answer is prepared:
 * three dots pulse in turn, before any cards appear.
 * With reduced motion turned on, the dots stay still and the text carries the state.
 */
export function ThinkingBubble() {
  return (
    <div className="flex items-start gap-2" data-testid="thinking-bubble">
      <Avatar />
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-stone-200"
      >
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-stone-500" />
          <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-stone-500 [animation-delay:0.2s]" />
          <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-stone-500 [animation-delay:0.4s]" />
        </span>
        <span className="text-sm text-stone-600">Planning your Kyoto weekend…</span>
      </div>
    </div>
  );
}

export function Avatar() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-white"
    >
      KT
    </span>
  );
}

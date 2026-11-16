/** Assistant "thinking" state shown while the (mock) answer is prepared. */
export function ThinkingBubble() {
  return (
    <div className="flex items-start gap-2" role="status" aria-live="polite">
      <Avatar />
      <div className="flex items-center gap-3 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-stone-200">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-stone-400 motion-safe:animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-stone-400 motion-safe:animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-stone-400 motion-safe:animate-bounce" />
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

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { mockResponse, type MockCard } from "@/data/mockResponse";
import { StayCard } from "./cards/StayCard";
import { ExperienceCard } from "./cards/ExperienceCard";
import { FoodCard } from "./cards/FoodCard";
import { Avatar, ThinkingBubble } from "./ThinkingBubble";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; text: string; cards?: MockCard[] };

/** How long the thinking animation plays before the mock answer appears. */
const THINKING_MS = 1600;

const SUGGESTION = "Plan a weekend in Kyoto for two";

function Card({ card }: { card: MockCard }) {
  switch (card.cardType) {
    case "stay":
      return <StayCard d={card.details} />;
    case "experience":
      return <ExperienceCard d={card.details} />;
    case "food":
      return <FoodCard d={card.details} />;
  }
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi! Tell me what you'd like from a weekend in Kyoto, and I'll plan where to stay, what to do and where to eat.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    setMessages((m) => [...m, { id: nextId.current++, role: "user", text: trimmed }]);
    setDraft("");
    setThinking(true);

    // Happy path: any message gets the same mock response, cards in the
    // order stay, experience, food.
    timer.current = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", text: mockResponse.intro, cards: mockResponse.cards },
      ]);
      setThinking(false);
    }, THINKING_MS);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(draft);
  }

  const showSuggestion = messages.length === 1 && !thinking;

  return (
    <div className="flex h-dvh flex-col bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Avatar />
          <div>
            <h1 className="text-base font-semibold text-stone-900">Kyoto Trip Planner</h1>
            <p className="text-xs text-stone-500">Stays, experiences and food in one plan</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6" aria-live="polite">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-tr-sm bg-stone-900 px-4 py-2.5 text-sm text-white">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={m.id} className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <Avatar />
                  <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm ring-1 ring-stone-200">
                    {m.text}
                  </p>
                </div>
                {m.cards && (
                  <ul className="grid gap-4 sm:pl-10 md:grid-cols-3" aria-label="Your Kyoto weekend">
                    {m.cards.map((c) => (
                      <li key={c.cardType} className="motion-safe:animate-[card-in_0.35s_ease-out_both]">
                        <Card card={c} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ),
          )}

          {thinking && <ThinkingBubble />}

          {showSuggestion && (
            <div className="sm:pl-10">
              <button
                type="button"
                onClick={() => send(SUGGESTION)}
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-800 hover:border-stone-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
              >
                {SUGGESTION}
              </button>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <form onSubmit={onSubmit} className="mx-auto flex max-w-5xl gap-2 px-4 py-3">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <input
            id="message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about your Kyoto weekend…"
            autoComplete="off"
            className="flex-1 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!draft.trim() || thinking}
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}

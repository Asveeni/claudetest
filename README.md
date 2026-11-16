# Kyoto Trip Planner Chat — happy path

Guests quit the search filter panel before they see a listing. This prototype replaces the filters with a chat: send any message and the assistant plans a Kyoto weekend as three cards, always in the order **stay, experience, food**.

This is the happy path only: everything works. Error handling (the error bubble and the `?fail=once` trigger) comes next.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000, type anything (or tap the suggestion) and press Send. A thinking animation plays for about 1.6 seconds, then the three cards appear.

## How it works

| File | What it does |
| --- | --- |
| `src/data/workbook.ts` | Fake data: one row from each sheet of the Kyoto Weekend Content Workbook (Stays S1, Experiences E1, Food F1), typed like the sheet columns |
| `src/data/mockResponse.ts` | Turns those rows into the mock response (`cardType` + `details`), in the order stay, experience, food |
| `src/components/Chat.tsx` | The chat page: messages, suggestion chip, composer, thinking state |
| `src/components/ThinkingBubble.tsx` | The thinking animation (bouncing dots; still for people who turn off motion) |
| `src/components/cards/*` | The three cards |

### Why these rows

- **S1, the Gion townhouse:** central to the other two picks.
- **E1, the tea ceremony:** has open spots and is in Gion. E3 is skipped because it is sold out.
- **F1, Menya Inoichi:** in Gion, an 8-minute walk from the stay.
- Together they total **$516 of the $600** reference budget.

### How the cards differ (from the card spec)

| | Stay | Experience | Food |
| --- | --- | --- | --- |
| Image | Wide banner, top | Tall strip, left | Round thumbnail, top right |
| Biggest text | Travel dates | Activity name | Restaurant name |
| Accent | Coral top border | Purple day label | Amber meal and price label |

All three cards share one width and height, so no card outranks another. Images are grey placeholders because the workbook has no photo URLs: image rights for the prototype are not cleared.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS. No backend: the mock response lives in the code.

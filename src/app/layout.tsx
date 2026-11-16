import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyoto Trip Planner",
  description: "Plan a Kyoto weekend in a chat: where to stay, what to do and where to eat.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayfind — Your trip, planned in 30 seconds.",
  description: "Tell Wayfind where you want to go and how long. Get a real itinerary with real places, real prices, real links. From a weekend to two weeks — built for people who want to do, not plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body data-theme="dark" data-accent="orange">{children}</body>
    </html>
  );
}

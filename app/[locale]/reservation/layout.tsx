import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Reserve a table at Muang Thai Restaurant in Einsiedeln. Book online for dine-in and we will confirm your reservation by phone.",
  openGraph: {
    title: "Reserve a Table | Muang Thai Restaurant",
    description:
      "Book a table online and we will call you back to confirm your reservation.",
  },
};

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
  return children;
}

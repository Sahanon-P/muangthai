import { AnimatedSection } from "./AnimatedSection";
import { UtensilsCrossed, Clock } from "lucide-react";

const OPENING_HOURS = [
  { day: "Mo.", hours: "Geschlossen", closed: true },
  { day: "Di. – Fr.", hours: "11:00 – 14:00 & 17:30 – 22:30 Uhr", closed: false },
  { day: "Sa.", hours: "17:30 – 22:30 Uhr", closed: false },
  { day: "So.", hours: "11:30 – 21:30 Uhr", closed: false },
];

export function BuffetSection() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Opening hours */}
        <AnimatedSection direction="left">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
              Visit Us
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1C] font-light mb-10 flex items-center gap-4">
            <Clock size={28} className="text-[#C9A96E] shrink-0" />
            Opening Hours
          </h2>

          <div className="divide-y divide-[#F0E8E0]">
            {OPENING_HOURS.map(({ day, hours, closed }) => (
              <div key={day} className="flex items-baseline justify-between py-4">
                <span className="font-body text-sm font-medium text-[#1C1C1C] w-24 shrink-0">
                  {day}
                </span>
                <span
                  className={`font-body text-sm text-right ${
                    closed
                      ? "text-[#C9A96E] tracking-[0.2em] uppercase text-xs"
                      : "text-[#5C5C5C]"
                  }`}
                >
                  {hours}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Buffet offer */}
        <AnimatedSection direction="right">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
              Daily Special
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1C] font-light mb-10 flex items-center gap-4">
            <UtensilsCrossed size={28} className="text-[#C9A96E] shrink-0" />
            Mittags-Buffet
          </h2>

          {/* Dark card */}
          <div className="bg-[#1C1C1C] p-8 md:p-10 relative overflow-hidden">
            {/* Gold corner accents */}
            <div className="absolute top-5 right-5 w-10 h-10 border-t border-r border-[#C9A96E]/50 pointer-events-none" />
            <div className="absolute bottom-5 left-5 w-10 h-10 border-b border-l border-[#C9A96E]/50 pointer-events-none" />

            <h3 className="font-display text-2xl text-white font-light mb-2">
              Mittags-Buffet à discretion
            </h3>
            <p className="font-body text-sm text-[#C9A96E] tracking-widest mb-8">
              Di. – Fr.: 11:30 – 13:30 Uhr
            </p>

            <div className="h-px bg-[#C9A96E]/20 mb-8" />

            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="font-body text-sm text-[#9C9490]">Erwachsene</span>
                <span className="font-display text-3xl text-[#C9A96E] font-light">
                  21,90 <span className="text-lg">CHF</span>
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-body text-sm text-[#7C7470]">
                  Kinder 4–7 Jahre
                </span>
                <span className="font-display text-2xl text-[#C9A96E]/70 font-light">
                  11,90 <span className="text-base">CHF</span>
                </span>
              </div>
            </div>

            <p className="font-body text-xs text-[#5C5858] mt-8 leading-relaxed">
              Für nur {" "}
              <span className="text-[#C9A96E]">21,90 CHF</span>
              {" "}genießen Sie unser Mittags-Buffet mit einer Auswahl an authentischen
              Thai-Gerichten.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

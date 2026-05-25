import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "./AnimatedSection";

interface LunchClubSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export function LunchClubSection({
  title = "Join the Lunch Club",
  description = "Reserve your table and experience the finest authentic Thai cuisine in a warm, welcoming atmosphere. Lunch and dinner, every day.",
  buttonText = "Reserve a Table",
}: LunchClubSectionProps) {
  return (
    <section className="py-28 px-6 bg-[#1C1C1C] relative overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <AnimatedSection className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-5 mb-10">
          <div className="h-px w-12 bg-[#C9A96E]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
          <div className="h-px w-12 bg-[#C9A96E]" />
        </div>

        <h2 className="font-display text-5xl md:text-6xl text-white font-light mb-8 leading-tight">
          {title}
        </h2>

        <p className="font-body text-[#B0A090] leading-relaxed text-base mb-12 max-w-md mx-auto">
          {description}
        </p>

        <Link href="/reservation">
          <button className="font-body text-xs tracking-[0.3em] uppercase text-[#C9A96E] border border-[#C9A96E] px-10 py-4 hover:bg-[#C9A96E] hover:text-white transition-all duration-300">
            {buttonText}
          </button>
        </Link>

        {/* Decorative bottom line */}
        <div className="flex items-center justify-center gap-5 mt-12">
          <div className="h-px w-12 bg-[#C9A96E]/40" />
          <div className="w-1 h-1 rounded-full bg-[#C9A96E]/40" />
          <div className="h-px w-12 bg-[#C9A96E]/40" />
        </div>
      </AnimatedSection>
    </section>
  );
}

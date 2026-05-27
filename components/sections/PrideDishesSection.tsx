import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "./AnimatedSection";

interface Dish {
  title: string;
  url: string;
}

interface PrideDishesSectionProps {
  dishes: Dish[];
  viewMoreText?: string;
  ourSelection?: string;
  sectionTitle?: string;
  dishLabels?: string[];
  fallbackLabel?: string;
}

export function PrideDishesSection({
  dishes,
  viewMoreText = "View All Dishes",
  ourSelection = "Our Selection",
  sectionTitle = "Pride Dishes",
  dishLabels = ["Signature Starter", "Pride of the House", "Chef's Special"],
  fallbackLabel = "Signature Dish",
}: PrideDishesSectionProps) {
  const topDishes = dishes.slice(0, 3);

  if (topDishes.length === 0) return null;

  return (
    <section className="py-28 px-6 md:px-16 bg-[#FAFAF8]">
      {/* Section header */}
      <AnimatedSection className="text-center mb-20">
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
            {ourSelection}
          </span>
          <div className="h-px w-10 bg-[#C9A96E]" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl text-[#1C1C1C] font-light">
          {sectionTitle}
        </h2>
      </AnimatedSection>

      {/* Dish grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {topDishes.map((dish, i) => (
          <AnimatedSection key={`${dish.url}-${i}`} delay={i * 0.12}>
            <Link href="/menu" className="group block">
              {/* Image container with aspect ratio */}
              <div className="overflow-hidden aspect-[4/5] mb-5 bg-[#F0EBE4]">
                <Image
                  src={dish.url}
                  alt={dishLabels[i] ?? dish.title}
                  width={480}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Label */}
              <div className="text-center px-2">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] mb-2">
                  {dishLabels[i] ?? fallbackLabel}
                </p>
                <h3 className="font-display text-xl text-[#1C1C1C] font-medium relative inline-block">
                  {dishLabels[i] ?? dish.title}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-400 ease-out" />
                </h3>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {/* View more */}
      <AnimatedSection className="text-center mt-16" delay={0.3}>
        <Link
          href="/menu"
          className="inline-flex items-center gap-3 font-body text-xs tracking-[0.25em] uppercase text-[#1C1C1C] hover:text-[#C9A96E] transition-colors duration-200 group"
        >
          <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
          {viewMoreText}
          <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
        </Link>
      </AnimatedSection>
    </section>
  );
}

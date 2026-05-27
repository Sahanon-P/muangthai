"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "./AnimatedSection";

interface Review {
  name: string;
  image: string;
  content: string;
}

interface TestimonialsSectionProps {
  reviews: Review[];
  sectionLabel?: string;
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-6">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#C9A96E] text-lg">
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsSection({
  reviews,
  sectionLabel = "Testimonials",
}: TestimonialsSectionProps) {
  const t = useTranslations("home");
  const [current, setCurrent] = useState(0);
  const hasReviews = reviews.length > 0;

  function prev() {
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  }
  function next() {
    setCurrent((c) => (c + 1) % reviews.length);
  }

  return (
    <section className="py-28 px-6 bg-white">
      <AnimatedSection className="text-center mb-16">
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
            {t("whatOurGuestsSay")}
          </span>
          <div className="h-px w-10 bg-[#C9A96E]" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl text-[#1C1C1C] font-light">
          {sectionLabel}
        </h2>
      </AnimatedSection>

      {hasReviews ? (
        <div className="max-w-2xl mx-auto">
          {/* Carousel */}
          <div className="relative min-h-[260px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center text-center px-4"
              >
                <StarRating />

                <p className="font-display text-xl md:text-2xl text-[#3C3C3C] italic font-light leading-relaxed mb-8 max-w-lg">
                  &ldquo;{reviews[current].content}&rdquo;
                </p>

                {/* Avatar + name */}
                <div className="flex flex-col items-center gap-3">
                  {reviews[current].image ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#C9A96E]/30">
                      <Image
                        src={reviews[current].image}
                        alt={reviews[current].name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#F0EBE4] flex items-center justify-center ring-2 ring-[#C9A96E]/30">
                      <span className="font-display text-[#C9A96E] text-xl font-medium">
                        {reviews[current].name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-[#1C1C1C] font-medium">
                      {reviews[current].name}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {reviews.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 border border-[#E0D8D0] flex items-center justify-center text-[#3C3C3C] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-200"
                aria-label="Previous review"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === current
                        ? "w-6 h-1.5 bg-[#C9A96E]"
                        : "w-1.5 h-1.5 bg-[#D0C8C0]"
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 border border-[#E0D8D0] flex items-center justify-center text-[#3C3C3C] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-200"
                aria-label="Next review"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center font-body text-[#9C9490] text-sm mt-8">
          {t("beTheFirst")}
        </p>
      )}
    </section>
  );
}

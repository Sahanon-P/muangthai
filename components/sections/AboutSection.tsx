import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "./AnimatedSection";
import type { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface AboutSectionProps {
  imageUrl: string;
  aboutText: Document;
  readMoreText?: string;
}

export function AboutSection({
  imageUrl,
  aboutText,
  readMoreText = "Read Our Story",
}: AboutSectionProps) {
  const renderedContent = documentToReactComponents(aboutText);

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        {/* Left — large photo */}
        <AnimatedSection direction="left" className="relative">
          <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden max-w-lg lg:max-w-none">
            <Image
              src={imageUrl}
              alt="Behind the curtains at Muang Thai"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gold accent corner */}
            <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#C9A96E]" />
          </div>
        </AnimatedSection>

        {/* Right — text block */}
        <AnimatedSection direction="right" className="lg:pl-20 pt-12 lg:pt-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
              Our Story
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1C] font-light leading-tight mb-8">
            Behind the Curtains
          </h2>

          <div className="font-body text-[#5C5C5C] leading-relaxed space-y-4 text-base">
            {renderedContent}
          </div>

          <div className="mt-10">
            <Link
              href="/story"
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.25em] uppercase text-[#C9A96E] hover:text-[#1C1C1C] transition-colors duration-200 group border-b border-[#C9A96E] hover:border-[#1C1C1C] pb-1"
            >
              {readMoreText}
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

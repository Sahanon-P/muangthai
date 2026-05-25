import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import type { Asset } from "contentful";
import { getImageUrl } from "@/lib/contentful-types";

interface ChefFields {
  chefName?: unknown;
  subHeadline?: unknown;
  chefStory?: unknown;
  chefQuote?: unknown;
  image?: unknown;
}

interface ChefSectionProps {
  chefData: ChefFields | null;
  sectionLabel?: string;
}

const FALLBACK_CHEF = {
  name: "Our Chef",
  headline: "Crafting Authentic Thai Flavours",
  story:
    "With decades of experience and a deep love for Thai culinary traditions, our chef brings the true taste of Thailand to every plate. Each dish is prepared with the finest ingredients and time-honoured techniques passed down through generations.",
  imageUrl: "/branding.jpg",
};

export function ChefSection({ chefData, sectionLabel = "The Team" }: ChefSectionProps) {
  const chefName = (chefData?.chefName as string) || FALLBACK_CHEF.name;
  const subHeadline = (chefData?.subHeadline as string) || FALLBACK_CHEF.headline;
  const imageUrl = chefData?.image
    ? getImageUrl(chefData.image as unknown as Asset)
    : FALLBACK_CHEF.imageUrl;
  const storyContent = chefData?.chefStory
    ? documentToReactComponents(chefData.chefStory as Document)
    : FALLBACK_CHEF.story;

  return (
    <section className="py-28 bg-[#FAFAF8] overflow-hidden">
      <AnimatedSection className="text-center mb-20 px-6">
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
            {sectionLabel}
          </span>
          <div className="h-px w-10 bg-[#C9A96E]" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl text-[#1C1C1C] font-light">
          Meet Our Chef
        </h2>
      </AnimatedSection>

      {/* Chef block — image right, text left */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
        {/* Text */}
        <AnimatedSection direction="left" className="order-2 lg:order-1">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-4">
            Our Chef
          </p>
          <h3 className="font-display text-4xl text-[#1C1C1C] font-medium mb-3">{chefName}</h3>
          <p className="font-display text-xl text-[#8C7A5C] italic mb-8">{subHeadline}</p>
          <div className="font-body text-[#5C5C5C] leading-relaxed space-y-4 text-base">
            {typeof storyContent === "string" ? (
              <p>{storyContent}</p>
            ) : (
              storyContent
            )}
          </div>
        </AnimatedSection>

        {/* Image */}
        <AnimatedSection direction="right" className="order-1 lg:order-2">
          <div className="relative aspect-[3/4] overflow-hidden max-w-md ml-auto">
            <Image
              src={imageUrl || "/branding.jpg"}
              alt={chefName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Gold accent corner */}
            <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#C9A96E]" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

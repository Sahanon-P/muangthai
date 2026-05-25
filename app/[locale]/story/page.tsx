import type { Metadata } from "next";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getStory, getChefStory } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { getImageUrl } from "@/lib/contentful-types";
import type { Asset } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import { PageHeader } from "@/components/PageHeader";
import { AnimatedSection } from "@/components/sections/AnimatedSection";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover the story behind Muang Thai Restaurant - authentic Thai flavors brought from Thailand to Einsiedeln with passion and tradition.",
  openGraph: {
    title: "Our Story | Muang Thai Restaurant",
    description:
      "Discover the story behind Muang Thai Restaurant - authentic Thai flavors brought from Thailand to Einsiedeln with passion and tradition.",
  },
};

export const revalidate = 60;

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [story, chef, t] = await Promise.all([
    getStory(locale),
    getChefStory(locale),
    getTranslations("story"),
  ]);

  const storyImageUrl = story?.image ? getImageUrl(story.image as unknown as Asset) : null;
  const chefImageUrl = chef?.image ? getImageUrl(chef.image as unknown as Asset) : null;

  return (
    <div className="bg-[#FAFAF8]">
      {/* Page header — uses story image as background if available */}
      <PageHeader
        eyebrow="Muang Thai"
        title={t("title")}
        backgroundImageUrl={storyImageUrl}
      />

      {/* Story content */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            {/* Section eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
                {t("fallbackTitle")}
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl text-[#1C1C1C] font-light mb-10">
              {(story?.title as string) ?? t("fallbackTitle")}
            </h2>
          </AnimatedSection>

          {/* First paragraph */}
          {story?.firstParagraph && (
            <AnimatedSection delay={0.1}>
              <div className="font-body text-[#5C5C5C] leading-relaxed text-base space-y-4 mb-12">
                {documentToReactComponents(story.firstParagraph as unknown as Document)}
              </div>
            </AnimatedSection>
          )}

          {/* First quote */}
          {story?.firstQuote && (
            <AnimatedSection delay={0.15}>
              <blockquote className="border-l-2 border-[#C9A96E] pl-8 py-2 my-10">
                <p className="font-display text-2xl md:text-3xl text-[#1C1C1C] font-light italic leading-relaxed whitespace-pre-line">
                  &ldquo;{story.firstQuote as string}&rdquo;
                </p>
              </blockquote>
            </AnimatedSection>
          )}

          {/* Second quote */}
          {story?.secondQuote && (
            <AnimatedSection delay={0.2}>
              <blockquote className="border-l-2 border-[#E8C88A] pl-8 py-2 my-10">
                <p className="font-display text-2xl md:text-3xl text-[#3C3C3C] font-light italic leading-relaxed whitespace-pre-line">
                  &ldquo;{story.secondQuote as string}&rdquo;
                </p>
              </blockquote>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Chef section */}
      {chef && (
        <section className="py-24 px-6 md:px-16 bg-[#FAFAF8]">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="mb-16 text-center">
              <div className="flex items-center justify-center gap-5 mb-5">
                <div className="h-px w-10 bg-[#C9A96E]" />
                <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
                  {t("aboutOurChef")}
                </span>
                <div className="h-px w-10 bg-[#C9A96E]" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-[#1C1C1C] font-light">
                {chef.chefName as string}
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Chef image */}
              {chefImageUrl && (
                <AnimatedSection direction="left">
                  <div className="relative aspect-[3/4] overflow-hidden max-w-md mx-auto lg:mx-0">
                    <Image
                      src={chefImageUrl}
                      alt={chef.chefName as string}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute top-6 left-6 w-14 h-14 border-t-2 border-l-2 border-[#C9A96E]" />
                    <div className="absolute bottom-6 right-6 w-14 h-14 border-b-2 border-r-2 border-[#C9A96E]" />
                  </div>
                </AnimatedSection>
              )}

              {/* Chef text */}
              <AnimatedSection direction="right" className="space-y-8">
                <div>
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] mb-2">
                    Head Chef
                  </p>
                  <h3 className="font-display text-2xl text-[#1C1C1C] mb-2">
                    {chef.chefName as string}
                  </h3>
                  <p className="font-display text-lg text-[#8C7A5C] italic">
                    {chef.subHeadline as string}
                  </p>
                </div>

                {/* Chef quote */}
                {chef.chefQuote && (
                  <blockquote className="border-l-2 border-[#C9A96E] pl-6 py-1">
                    <div className="font-display text-xl text-[#3C3C3C] italic font-light leading-relaxed">
                      {documentToReactComponents(chef.chefQuote as unknown as Document)}
                    </div>
                  </blockquote>
                )}

                {/* Chef story */}
                {chef.chefStory && (
                  <div className="font-body text-[#5C5C5C] leading-relaxed text-base space-y-4">
                    {documentToReactComponents(chef.chefStory as unknown as Document)}
                  </div>
                )}
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

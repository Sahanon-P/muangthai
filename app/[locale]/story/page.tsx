import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getStory, getChefStory } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { getImageUrl } from "@/lib/contentful-types";
import { Asset } from "contentful";

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

  const storyImageUrl = story?.image
    ? getImageUrl(story.image as unknown as Asset)
    : "";
  const chefImageUrl = chef?.image
    ? getImageUrl(chef.image as unknown as Asset)
    : "";

  return (
    <div>
      <main className="flex flex-col space-y-10 px-4 md:px-20">
        {/* Header */}
        <section className="py-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#DAE129] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            {t("title")}
          </h1>
        </section>

        {/* Hero Image */}
        {storyImageUrl && (
          <section className="px-6 md:px-16 py-8 ">
            <div className="border-4 border-[#DAE129] rounded-lg overflow-hidden max-w-4xl mx-auto">
              <div className="relative w-full h-[250px] md:h-[400px]">
                <Image
                  src={storyImageUrl}
                  alt={t("title")}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Story Content */}
        <section className="px-6 md:px-16 py-10 bg-[#242424] text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#DAE129]">
              {(story?.title as string) ?? t("fallbackTitle")}
            </h2>

            {/* First Paragraph */}
            {story?.firstParagraph && (
              <div className="font-light leading-relaxed text-gray-200 prose prose-invert max-w-none">
                {documentToReactComponents(
                  story.firstParagraph as unknown as import("@contentful/rich-text-types").Document,
                )}
              </div>
            )}

            {/* First Quote */}
            {story?.firstQuote && (
              <div className="border-l-4 border-[#DAE129] pl-6 py-2">
                <p className="font-semibold text-white whitespace-pre-line">
                  {story.firstQuote as string}
                </p>
              </div>
            )}

            {/* Second Quote */}
            {story?.secondQuote && (
              <div className="border-l-4 border-red-500 pl-6 py-2">
                <p className="font-semibold text-white whitespace-pre-line">
                  {story.secondQuote as string}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Chef Section */}
        {chef && (
          <section className="px-6 md:px-16 py-10 bg-[#242424] text-white">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Chef Header */}
              <div>
                <p className="text-sm text-gray-400 italic">
                  {t("aboutOurChef")}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#DAE129]">
                  {chef.chefName as string}
                </h2>
              </div>

              {/* Chef Content */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Chef Image */}
                {chefImageUrl && (
                  <div className="w-full md:w-[280px] flex-shrink-0">
                    <div className="relative w-full h-[350px] md:h-[450px] rounded-lg overflow-hidden">
                      <Image
                        src={chefImageUrl}
                        alt={chef.chefName as string}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Chef Text */}
                <div className="flex-1 space-y-6">
                  {/* Sub-headline */}
                  <h3 className="text-lg font-bold text-white">
                    {chef.subHeadline as string}
                  </h3>

                  {/* Chef Quote */}
                  {chef.chefQuote && (
                    <div className="border-l-4 border-[#DAE129] pl-6 py-2">
                      <div className="text-gray-300 font-light italic prose prose-invert max-w-none">
                        {documentToReactComponents(
                          chef.chefQuote as unknown as import("@contentful/rich-text-types").Document,
                        )}
                      </div>
                    </div>
                  )}

                  {/* Chef Story */}
                  {chef.chefStory && (
                    <div className="text-gray-200 font-light leading-relaxed prose prose-invert max-w-none">
                      {documentToReactComponents(
                        chef.chefStory as unknown as import("@contentful/rich-text-types").Document,
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

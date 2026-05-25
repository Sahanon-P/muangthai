import type { Metadata } from "next";
import Image from "next/image";
import { getGallery } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import ImageViewer from "@/components/image-viewer";
import { PageHeader } from "@/components/PageHeader";
import { AnimatedSection } from "@/components/sections/AnimatedSection";

export const metadata: Metadata = {
  title: "Chef Gallery",
  description:
    "Browse the Muang Thai Restaurant chef gallery - a showcase of our culinary artistry and the passion behind every dish.",
  openGraph: {
    title: "Chef Gallery | Muang Thai Restaurant",
    description: "A showcase of our culinary artistry and the passion behind every dish.",
  },
};

export const revalidate = 60;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [galleries, t] = await Promise.all([getGallery(locale), getTranslations("gallery")]);

  const allImages = galleries.flatMap((cat) =>
    cat.imageUrls.map((url) => ({ url, category: cat.title })),
  );

  return (
    <div className="bg-[#FAFAF8]">
      <PageHeader eyebrow="Behind the Scenes" title={t("title")} />

      {galleries.length > 0 ? (
        <>
          {/* Mobile: full masonry grid */}
          <div className="md:hidden px-4 pb-20 pt-6 columns-2 gap-3 space-y-3">
            {allImages.map((img, i) => (
              <ImageViewer
                key={i}
                src={img.url}
                alt={`${img.category} ${i + 1}`}
                className="cursor-pointer break-inside-avoid block"
              >
                <div className="overflow-hidden group">
                  <Image
                    src={img.url}
                    alt={`${img.category} ${i + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </ImageViewer>
            ))}
          </div>

          {/* Desktop: categorized sections */}
          <div className="hidden md:block px-6 md:px-16 pb-28 pt-8">
            <div className="max-w-6xl mx-auto space-y-20">
              {galleries.map((category, catIndex) => (
                <AnimatedSection key={catIndex} delay={catIndex * 0.08}>
                  {/* Category header */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className="h-px w-10 bg-[#C9A96E]" />
                    <h2 className="font-display text-2xl md:text-3xl text-[#1C1C1C] font-light">
                      {category.title}
                    </h2>
                    <div className="h-px flex-1 bg-[#E8E0D5]" />
                  </div>

                  {/* Image grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {category.imageUrls.map((url, imgIndex) => (
                      <ImageViewer
                        key={imgIndex}
                        src={url}
                        alt={`${category.title} ${imgIndex + 1}`}
                        className="cursor-pointer"
                      >
                        <div
                          className={`relative overflow-hidden group bg-[#F0EBE4] ${
                            imgIndex === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                          }`}
                        >
                          <Image
                            src={url}
                            alt={`${category.title} ${imgIndex + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          {/* Gold overlay on hover */}
                          <div className="absolute inset-0 bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/10 transition-colors duration-500" />
                        </div>
                      </ImageViewer>
                    ))}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </>
      ) : (
        <AnimatedSection className="text-center py-28 px-6">
          <p className="font-display text-2xl text-[#9C9490] font-light">{t("noGallery")}</p>
        </AnimatedSection>
      )}
    </div>
  );
}

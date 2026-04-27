import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Chef Gallery",
  description:
    "Browse the Muang Thai Restaurant chef gallery - a showcase of our culinary artistry and the passion behind every dish.",
  openGraph: {
    title: "Chef Gallery | Muang Thai Restaurant",
    description:
      "A showcase of our culinary artistry and the passion behind every dish.",
  },
};
import { getGallery } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import ImageViewer from "@/components/image-viewer";

export const revalidate = 60;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [galleries, t] = await Promise.all([
    getGallery(locale),
    getTranslations("gallery"),
  ]);

  return (
    <div>
      <main className="flex flex-col space-y-10 px-4 md:px-20">
        {/* Header */}
        <section className="py-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#DAE129] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            {t("title")}
          </h1>
        </section>

        {/* Mobile: Masonry layout (all images combined) */}
        <div className="md:hidden columns-3 gap-3 space-y-3">
          {galleries.flatMap((category) =>
            category.imageUrls.map((url, imgIndex) => (
              <ImageViewer
                key={`${category.title}-${imgIndex}`}
                src={url}
                alt={`${category.title} ${imgIndex + 1}`}
                className="cursor-pointer break-inside-avoid"
              >
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src={url}
                    alt={`${category.title} ${imgIndex + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </ImageViewer>
            )),
          )}
        </div>

        {/* Desktop: Categorized card layout */}
        <div className="hidden md:flex flex-col space-y-10">
          {galleries.length > 0 ? (
            galleries.map((category, index) => (
              <section
                key={index}
                className="bg-[#3a3a3a] rounded-lg p-6 max-w-5xl mx-auto w-full"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#DAE129] mb-4">
                  {category.title}
                </h2>
                <div className="grid grid-cols-4 gap-3">
                  {category.imageUrls.map((url, imgIndex) => (
                    <ImageViewer
                      key={imgIndex}
                      src={url}
                      alt={`${category.title} ${imgIndex + 1}`}
                      className="cursor-pointer"
                    >
                      <div className="relative w-full h-[140px] rounded overflow-hidden">
                        <Image
                          src={url}
                          alt={`${category.title} ${imgIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </ImageViewer>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <p className="text-center text-gray-400">{t("noGallery")}</p>
          )}
        </div>
      </main>
    </div>
  );
}

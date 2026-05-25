import type { Metadata } from "next";
import { getMenu } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import PdfViewer from "@/components/pdf-viewer-wrapper";
import { PageHeader } from "@/components/PageHeader";
import { AnimatedSection } from "@/components/sections/AnimatedSection";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the Muang Thai Restaurant menu - take-away and dine-in options featuring authentic Thai dishes made with fresh ingredients.",
  openGraph: {
    title: "Menu | Muang Thai Restaurant",
    description:
      "Explore our take-away and dine-in menus featuring authentic Thai dishes made with fresh ingredients.",
  },
};

export const revalidate = 60;

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [menuItems, t] = await Promise.all([getMenu(locale), getTranslations("menu")]);

  return (
    <div className="bg-[#FAFAF8]">
      <PageHeader eyebrow="Muang Thai" title={t("title")} />

      <section className="py-8 pb-28 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Gold divider */}
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-[#E8E0D5]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            <div className="h-px flex-1 bg-[#E8E0D5]" />
          </div>

          {menuItems.length > 0 ? (
            <div className="space-y-20">
              {menuItems.map((item, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="space-y-6">
                    {/* Menu item header */}
                    <div className="flex items-center gap-4">
                      <div className="h-px w-8 bg-[#C9A96E]" />
                      <h2 className="font-display text-2xl md:text-3xl text-[#1C1C1C] font-light">
                        {item.title}
                      </h2>
                    </div>

                    {/* PDF viewer */}
                    {item.fileUrl && (
                      <div className="border border-[#E8E0D5] overflow-hidden bg-white">
                        <PdfViewer src={item.fileUrl} title={item.title} />
                      </div>
                    )}
                  </div>

                  {/* Separator (not after last item) */}
                  {index < menuItems.length - 1 && (
                    <div className="flex items-center gap-4 mt-20">
                      <div className="h-px flex-1 bg-[#E8E0D5]" />
                      <div className="w-1 h-1 rounded-full bg-[#C9A96E]/60" />
                      <div className="h-px flex-1 bg-[#E8E0D5]" />
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection className="text-center py-20">
              <p className="font-display text-2xl text-[#9C9490] font-light">{t("noMenu")}</p>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}

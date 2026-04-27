import { getMenu } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import PdfViewer from "@/components/pdf-viewer";

export const revalidate = 60;

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [menuItems, t] = await Promise.all([
    getMenu(locale),
    getTranslations("menu"),
  ]);

  return (
    <div>
      <main className="flex flex-col space-y-10 px-4 md:px-20">
        {/* Header */}
        <section className="py-10  text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#DAE129] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            {t("title")}
          </h1>
        </section>

        <Separator className="bg-gradient-to-r from-red-400 to-yellow-300 h-1 rounded-full" />

        {/* Menu Items */}
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <section
              key={index}
              className="flex flex-col items-center justify-center gap-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#DAE129]">
                {item.title}
              </h2>

              {item.fileUrl && (
                <PdfViewer src={item.fileUrl} title={item.title} />
              )}

              <Separator className="bg-gray-600 h-[1px] w-full max-w-4xl" />
            </section>
          ))
        ) : (
          <p className="text-center text-gray-400">{t("noMenu")}</p>
        )}
      </main>
    </div>
  );
}

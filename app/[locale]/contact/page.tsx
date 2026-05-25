import type { Metadata } from "next";
import { getContactInfo } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AnimatedSection } from "@/components/sections/AnimatedSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Muang Thai Restaurant in Einsiedeln. Find us at Heidenbühl 2, 8840 Einsiedeln. Call us at 055 / 5 35 73 30 or send us an email.",
  openGraph: {
    title: "Contact | Muang Thai Restaurant",
    description:
      "Find us at Heidenbühl 2, 8840 Einsiedeln. Call 055 / 5 35 73 30 or send us an email.",
  },
};

export const revalidate = 60;

const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6057.850642295834!2d8.741264576514135!3d47.13102692069695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479ab35b1d5e679b%3A0xdc6b2416c66147c7!2sMuang%20Thai!5e1!3m2!1sen!2snz!4v1779697468000!5m2!1sen!2snz";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [contactInfo, t] = await Promise.all([
    getContactInfo(locale),
    getTranslations("contact"),
  ]);

  return (
    <div className="bg-[#FAFAF8]">
      <PageHeader eyebrow="Reach Us" title={t("title")} />

      <section className="py-16 px-6 md:px-16 pb-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact info cards */}
          <AnimatedSection direction="left" className="space-y-6">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-8">
              {t("getInTouch")}
            </p>

            {/* Phone */}
            <div className="bg-white border border-[#E8E0D5] p-6 flex items-start gap-5 hover:border-[#C9A96E] transition-colors duration-300 group">
              <div className="w-10 h-10 flex items-center justify-center border border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors shrink-0 mt-0.5">
                <Phone size={16} className="text-[#C9A96E]" />
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] mb-2">
                  {t("phone")}
                </p>
                <a
                  href={`tel:${contactInfo.phone.replace(/[\s/]/g, "")}`}
                  className="font-display text-xl text-[#1C1C1C] hover:text-[#C9A96E] transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-[#E8E0D5] p-6 flex items-start gap-5 hover:border-[#C9A96E] transition-colors duration-300 group">
              <div className="w-10 h-10 flex items-center justify-center border border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors shrink-0 mt-0.5">
                <Mail size={16} className="text-[#C9A96E]" />
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] mb-2">
                  {t("email")}
                </p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-display text-xl text-[#1C1C1C] hover:text-[#C9A96E] transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-[#E8E0D5] p-6 flex items-start gap-5 hover:border-[#C9A96E] transition-colors duration-300 group">
              <div className="w-10 h-10 flex items-center justify-center border border-[#C9A96E]/40 group-hover:border-[#C9A96E] transition-colors shrink-0 mt-0.5">
                <MapPin size={16} className="text-[#C9A96E]" />
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] mb-2">
                  {t("address")}
                </p>
                <p className="font-display text-xl text-[#1C1C1C]">
                  {contactInfo.address}
                </p>
              </div>
            </div>

            {/* Maps link */}
            <a
              href={"https://maps.app.goo.gl/geJGabxGiYzC8YTA9"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-xs tracking-[0.25em] uppercase text-[#C9A96E] border border-[#C9A96E] px-6 py-3 hover:bg-[#C9A96E] hover:text-white transition-all duration-300 mt-4"
            >
              <ExternalLink size={14} />
              {t("viewOnMaps")}
            </a>
          </AnimatedSection>

          {/* Map */}
          <AnimatedSection direction="right">
            <div className="relative">
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#C9A96E] z-10 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#C9A96E] z-10 pointer-events-none" />
              <div className="overflow-hidden aspect-square md:aspect-[4/3] border border-[#E8E0D5]">
                <iframe
                  src={GOOGLE_MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  title={t("findUs")}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

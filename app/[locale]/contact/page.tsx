import type { Metadata } from "next";

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

import { getContactInfo } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

export const revalidate = 60;

async function getPlaceMapData() {
  const placeId = process.env.PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "location,googleMapsLinks",
      },
      next: { revalidate: 86400 },
    });
    const data = await res.json();
    return {
      lat: data.location?.latitude as number,
      lng: data.location?.longitude as number,
      mapsUrl: data.googleMapsLinks?.placeUri as string,
    };
  } catch {
    return null;
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [contactInfo, mapData, t] = await Promise.all([
    getContactInfo(locale),
    getPlaceMapData(),
    getTranslations("contact"),
  ]);

  const osmEmbedUrl = mapData
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${mapData.lng - 0.01},${mapData.lat - 0.007},${mapData.lng + 0.01},${mapData.lat + 0.007}&layer=mapnik&marker=${mapData.lat},${mapData.lng}`
    : null;

  return (
    <div>
      <main className="flex flex-col space-y-10 px-4 md:px-20">
        {/* Header */}
        <section className="py-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#DAE129] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            {t("title")}
          </h1>
        </section>

        {/* Contact + Map */}
        <section className="flex flex-col md:flex-row gap-10 pb-20">
          {/* Contact Info */}
          <div className="flex-1 flex flex-col gap-8 md:bg-[#1a1a1a] md:border md:border-[#DAE129]/30 md:p-8">
            <h2 className="text-2xl font-bold text-[#DAE129]">
              {t("getInTouch")}
            </h2>

            <div className="flex items-start gap-4 text-white">
              <Phone className="text-[#DAE129] mt-1 shrink-0" size={20} />
              <div>
                <p className="text-sm text-gray-400 mb-1">{t("phone")}</p>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="text-lg hover:text-[#DAE129] transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white">
              <Mail className="text-[#DAE129] mt-1 shrink-0" size={20} />
              <div>
                <p className="text-sm text-gray-400 mb-1">{t("email")}</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-lg hover:text-[#DAE129] transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 text-white">
              <MapPin className="text-[#DAE129] mt-1 shrink-0" size={20} />
              <div>
                <p className="text-sm text-gray-400 mb-1">{t("address")}</p>
                <p className="text-lg">{contactInfo.address}</p>
              </div>
            </div>

            {mapData?.mapsUrl && (
              <a
                href={mapData.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#DAE129] text-[#DAE129] px-5 py-2.5 text-sm font-semibold hover:bg-[#DAE129]/10 transition-colors self-start"
              >
                <ExternalLink size={16} />
                {t("viewOnMaps")}
              </a>
            )}
          </div>

          {/* Map */}
          <div className="flex-1 min-h-[350px] md:min-h-[450px] border-4 border-[#DAE129] overflow-hidden">
            {osmEmbedUrl ? (
              <iframe
                src={osmEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                title={t("findUs")}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm" style={{ minHeight: "350px" }}>
                {t("mapUnavailable")}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

import { MetadataRoute } from "next";

const SITE_URL = "https://muangthairestaurant.com";
const locales = ["en", "de"];
const routes = ["/", "/story", "/menu", "/gallery", "/contact", "/reservation"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route === "/" ? "" : route}`,
      lastModified: new Date(),
      changeFrequency: route === "/" ? ("daily" as const) : ("weekly" as const),
      priority: route === "/" ? 1.0 : 0.8,
    }))
  );
}

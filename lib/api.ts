import client from "./contentful";
import type {
  ShowcaseSkeleton,
  ReviewSkeleton,
  AnnouncementSkeleton,
  AtmosphereImageSkeleton,
  AboutSectionSkeleton,
  ContactInfoSkeleton,
  AtmosphereTextSkeleton,
  StorySkeleton,
  ChefStorySkeleton,
  MenuSkeleton,
} from "./contentful-types";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";
import { GalleryImageSkeleton, getImageUrl } from "./contentful-types";
import { Asset } from "contentful";

// ── Locale mapping (next-intl → Contentful) ────────────────────────

const contentfulLocaleMap: Record<string, string> = {
  en: "en-US",
  de: "gsw-CH",
};

function toContentfulLocale(locale?: string): string | undefined {
  if (!locale) return undefined;
  return contentfulLocaleMap[locale] ?? locale;
}

// ── Default fallback data ──────────────────────────────────────────

const defaultShowcases = [
  { title: "showcase1", url: "/showcase1.jpg" },
  { title: "showcase2", url: "/showcase2.jpg" },
  { title: "showcase3", url: "/showcase3.jpg" },
  { title: "showcase4", url: "/showcase4.jpg" },
  { title: "showcase5", url: "/showcase5.jpg" },
];

const defaultReviews = [
  {
    name: "John Doe",
    image: "",
    content: "Amazing food and great atmosphere!",
  },
  {
    name: "Jane Doe",
    image: "",
    content: "Amazing food and great atmosphere!",
  },
];

const defaultAnnouncements = [
  {
    title: "Grand Opening!",
    description:
      "We are excited to announce the grand opening of Muang Thai Restaurant in Einsiedeln! Join us for an authentic Thai dining experience.",
  },
];

const defaultAtmosphere = [
  { title: "atmosphere1", url: "/showcase1.jpg" },
  { title: "atmosphere2", url: "/showcase2.jpg" },
  { title: "atmosphere3", url: "/showcase3.jpg" },
  { title: "atmosphere4", url: "/showcase4.jpg" },
];

const defaultAboutSection: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "Muang Thai Restaurant is a family-owned Thai dining place nestled in the heart of Einsiedeln.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "Our story began with a simple wish \u2014 to bring the flavors of home from Thailand to Switzerland. Every dish we serve is made with care, using fresh ingredients and traditional recipes passed down through generations.",
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value:
            "Here, we cook not only with skill, but with heart. Whether you\u2019re joining us for a quick lunch, a relaxed dinner, or takeaway, you\u2019ll always find a warm smile and the true taste of Thailand waiting for you.",
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

export const defaultContactInfo = {
  phone: "055 / 5 35 73 30",
  address: "Heidenb\u00fchl 2, 8840 Einsiedeln",
  email: "info@muangthai.com",
  tagline:
    "Authentic Thai cuisine made with love and tradition.\nFresh ingredients, warm smiles, unforgettable flavors.",
};

export const defaultQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/story" },
  { label: "Our menu", href: "/menu" },
  { label: "Reservation", href: "/reservation" },
  { label: "Chef Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact" },
];

// ── Fetchers with error handling ───────────────────────────────────

export async function getShowcases(locale?: string) {
  try {
    const res = await client.getEntries<ShowcaseSkeleton>({
      content_type: "showcase",
      locale: toContentfulLocale(locale),
    });
    const result = res.items.map((item) =>
      (item.fields.image as Asset[]).map((image, index) => {
        return {
          title: "showcase" + index,
          url: getImageUrl(image),
        };
      }),
    );
    return result.flat();
  } catch (error) {
    console.error("Failed to fetch showcases:", error);
    return defaultShowcases;
  }
}

export async function getReviews(locale?: string) {
  try {
    const res = await client.getEntries<ReviewSkeleton>({
      content_type: "reviews",
      locale: toContentfulLocale(locale),
    });

    const result = res.items.map((item) => ({
      name: item.fields.reviewer as string,
      image: getImageUrl(item.fields.reviewerImage as unknown as Asset),
      content: item.fields.review as Document,
    }));
    return result;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return defaultReviews;
  }
}

export async function getAnnouncements(locale?: string) {
  try {
    const res = await client.getEntries<AnnouncementSkeleton>({
      content_type: "announcement",
      locale: toContentfulLocale(locale),
    });
    const result = res.items.map((item) => ({
      title: item.fields.title as string,
      description: item.fields.description as Document,
    }));
    return result;
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
    return defaultAnnouncements;
  }
}

export async function getAtmosphereImages(locale?: string) {
  try {
    const res = await client.getEntries<AtmosphereImageSkeleton>({
      content_type: "atmosphere",
      locale: toContentfulLocale(locale),
    });
    const result = res.items.map((item) =>
      (item.fields.images as Asset[]).map((image, index) => {
        return {
          title: "showcase" + index,
          url: getImageUrl(image),
        };
      }),
    );
    return result.flat();
  } catch (error) {
    console.error("Failed to fetch atmosphere images:", error);
    return defaultAtmosphere;
  }
}

export async function getAtmosphereText(locale?: string) {
  try {
    const res = await client.getEntries<AtmosphereTextSkeleton>({
      content_type: "atmosphereText",
      limit: 1,
      locale: toContentfulLocale(locale),
    });
    if (res.items.length === 0)
      return "Experience the vibrant and welcoming atmosphere of Muang Thai Restaurant, where every visit feels like a warm embrace from Thailand. Our cozy interior, adorned with traditional decor and soft lighting, creates the perfect setting for enjoying authentic Thai cuisine with friends and family.";
    return res.items[0].fields.description as string;
  } catch (error) {
    console.error("Failed to fetch atmosphere text:", error);
    return "Experience the vibrant and welcoming atmosphere of Muang Thai Restaurant, where every visit feels like a warm embrace from Thailand. Our cozy interior, adorned with traditional decor and soft lighting, creates the perfect setting for enjoying authentic Thai cuisine with friends and family.";
  }
}

export async function getAboutSection(locale?: string): Promise<Document> {
  try {
    const res = await client.getEntries<AboutSectionSkeleton>({
      content_type: "aboutSection",
      limit: 1,
      locale: toContentfulLocale(locale),
    });
    if (res.items.length === 0) return defaultAboutSection;

    return res.items[0].fields.about as Document;
  } catch (error) {
    console.error("Failed to fetch about section:", error);
    return defaultAboutSection;
  }
}

export async function getContactInfo(locale?: string) {
  try {
    const res = await client.getEntries<ContactInfoSkeleton>({
      content_type: "contactInfo",
      limit: 1,
      locale: toContentfulLocale(locale),
    });
    if (res.items.length === 0) return defaultContactInfo;
    const fields = res.items[0].fields;
    return {
      phone: fields.phone as string,
      address: fields.address as string,
      email: fields.email as string,
      tagline: fields.tagline as string,
    };
  } catch (error) {
    console.error("Failed to fetch contact info:", error);
    return defaultContactInfo;
  }
}

export async function getStory(locale?: string) {
  try {
    const res = await client.getEntries<StorySkeleton>({
      content_type: "story",
      limit: 1,
      locale: toContentfulLocale(locale),
    });
    if (res.items.length === 0) return null;
    console.log("Fetched story:", res.items[0].fields);
    return res.items[0].fields;
  } catch (error) {
    console.error("Failed to fetch story:", error);
    return null;
  }
}

export async function getChefStory(locale?: string) {
  try {
    const res = await client.getEntries<ChefStorySkeleton>({
      content_type: "aboutChef",
      limit: 1,
      locale: toContentfulLocale(locale),
    });
    if (res.items.length === 0) return null;
    console.log("Fetched chef story:", res.items[0].fields);
    return res.items[0].fields;
  } catch (error) {
    console.error("Failed to fetch chef story:", error);
    return null;
  }
}

export async function getMenu(locale?: string) {
  try {
    const res = await client.getEntries<MenuSkeleton>({
      content_type: "menu",
      locale: toContentfulLocale(locale),
    });
    if (res.items.length === 0) return [];
    return res.items.map((item) => ({
      title: item.fields.title as string,
      fileUrl: getImageUrl(item.fields.image as unknown as Asset),
    }));
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return [];
  }
}

export async function getGoogleReviews(): Promise<
  { name: string; image: string; content: string }[]
> {
  const placeId = process.env.PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) return [];

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews",
        },
        next: { revalidate: 86400 },
      }
    );
    const data = await res.json();

    return (data.reviews ?? [])
      .filter((r: { rating: number }) => r.rating === 5)
      .slice(0, 5)
      .map(
        (r: {
          authorAttribution: { displayName: string; photoUri: string };
          text: { text: string };
        }) => ({
          name: r.authorAttribution.displayName,
          image: r.authorAttribution.photoUri,
          content: r.text.text,
        })
      );
  } catch (error) {
    console.error("Failed to fetch Google reviews:", error);
    return [];
  }
}

export async function getGallery(locale: string) {
  try {
    const res = await client.getEntries<GalleryImageSkeleton>({
      content_type: "gallery",
      locale: toContentfulLocale(locale),
    });
    if (res.items.length === 0) return [];
    return res.items.map((item) => ({
      title: item.fields.title as string,
      imageUrls: (item.fields.images as unknown as Asset[]).map(getImageUrl),
    }));
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return [];
  }
}

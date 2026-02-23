import type { EntryFieldTypes, Asset } from "contentful";
import type { Document } from "@contentful/rich-text-types";

// Content type: showcase
export interface ShowcaseSkeleton {
  contentTypeId: "showcase";
  fields: {
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
}

// Content type: review
export interface ReviewSkeleton {
  contentTypeId: "reviews";
  fields: {
    reviewer: EntryFieldTypes.Symbol;
    reviewerImage: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    review: EntryFieldTypes.RichText;
  };
}

// Content type: announcement
export interface AnnouncementSkeleton {
  contentTypeId: "announcement";
  fields: {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.RichText;
  };
}

// Content type: atmosphereImage
export interface AtmosphereImageSkeleton {
  contentTypeId: "atmosphere";
  fields: {
    title: EntryFieldTypes.Symbol;
    images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  };
}
export interface AtmosphereTextSkeleton {
  contentTypeId: "atmosphereText";
  fields: {
    title: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
  }
}
// Content type: aboutSection (who are we text — RichText field)
export interface AboutSectionSkeleton {
  contentTypeId: "aboutSection";
  fields: {
    about: EntryFieldTypes.RichText;
  };
}

// Content type: contactInfo (for footer)
export interface ContactInfoSkeleton {
  contentTypeId: "contactInfo";
  fields: {
    phone: EntryFieldTypes.Symbol;
    address: EntryFieldTypes.Symbol;
    email: EntryFieldTypes.Symbol;
    tagline: EntryFieldTypes.Text;
  };
}

// Content type: quickLink (for footer)
export interface QuickLinkSkeleton {
  contentTypeId: "quickLink";
  fields: {
    label: EntryFieldTypes.Symbol;
    href: EntryFieldTypes.Symbol;
    order: EntryFieldTypes.Integer;
  };
}

export interface StorySkeleton {
  contentTypeId: "story";
  fields: {
    title: EntryFieldTypes.Symbol;
    firstParagraph: EntryFieldTypes.RichText;
    firstQuote: EntryFieldTypes.Text;
    secondQuote: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
  }
}

export interface ChefStorySkeleton {
  contentTypeId: "aboutChef";
  fields: {
    title: EntryFieldTypes.Symbol;
    chefName: EntryFieldTypes.Symbol;
    subHeadline: EntryFieldTypes.Symbol;
    chefQuote: EntryFieldTypes.RichText;
    chefStory: EntryFieldTypes.RichText;
    image: EntryFieldTypes.AssetLink;
  }
}

export interface MenuSkeleton {
  contentTypeId: "menu";
  fields: {
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
  }
}

export interface GalleryImageSkeleton {
  contentTypeId: "gallery";
  fields: {
    title: EntryFieldTypes.Symbol;
    images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  }
}

// Helper to extract image URL from a Contentful Asset
export function getImageUrl(asset: Asset): string {
  const url = asset.fields?.file?.url;
  if (!url) return "";
  if (typeof url !== "string") return "";
  return url.startsWith("//") ? `https:${url}` : url;
}


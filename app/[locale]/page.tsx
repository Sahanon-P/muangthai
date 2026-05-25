import {
  getShowcases,
  getAtmosphereImages,
  getAtmosphereText,
  getAboutSection,
  getChefStory,
  getAnnouncements,
} from "@/lib/api";

const TESTIMONIALS = [
  {
    name: "K. D.",
    image: "",
    content:
      "We celebrated our son's 6th birthday at Muang Thai. The team was very friendly; he felt like royalty and was even sung a birthday song. The food was delicious, the portions were generous, and the little warming pots were a great touch. We'll definitely come back when we're in the area again.",
  },
  {
    name: "Moratz Tan",
    image: "",
    content:
      "Great food and great service 🥰. We came late Lunch and it’s full of people but they gave us seats and accommodate us with a warm smile and gestures so soooperrr recommended ⭐️",
  },
  {
    name: "Eduard Poposki",
    image: "",
    content:
      "Exquisite, authentic Thai cuisine. The hosts are incredibly kind and welcoming. I always enjoy coming back whenever I'm in Einsiedeln.",
  },
];
import { AnnouncementDialog } from "@/components/AnnouncementDialog";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { PrideDishesSection } from "@/components/sections/PrideDishesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ChefSection } from "@/components/sections/ChefSection";
import { LunchClubSection } from "@/components/sections/LunchClubSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BuffetSection } from "@/components/sections/BuffetSection";
import { AtmosphereSection } from "@/components/sections/AtmosphereSection";

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [showcases, atmosphere, atmosphereText, aboutText, chefData, announcements, t] =
    await Promise.all([
      getShowcases(locale),
      getAtmosphereImages(locale),
      getAtmosphereText(locale),
      getAboutSection(locale),
      getChefStory(locale),
      getAnnouncements(locale),
      getTranslations("home"),
    ]);

  // Pick the best hero image: prefer atmosphere (restaurant interior) over food showcases
  const heroImageUrl =
    '/hero.png'

  // Pick the about-section photo (prefer a different atmosphere image than hero)
  const aboutImageUrl = '/team.JPG'

  return (
    <div>
      <AnnouncementDialog announcements={announcements} />

      <HeroSection
        heroImageUrl={heroImageUrl}
        welcomeText={t("welcomeTo")}
        reserveText={t("reserve")}
        tagline="The most satisfying Thai food experience anyone can have in a chic environment"
      />

      <PrideDishesSection dishes={showcases} viewMoreText="View All Dishes" />

      <AboutSection
        imageUrl={aboutImageUrl}
        aboutText={aboutText}
        readMoreText="Read Our Story"
      />

      <ChefSection chefData={chefData} sectionLabel="The Team" />

      <BuffetSection />

      <LunchClubSection
        title="Join the Lunch Club"
        description="Reserve your table and experience the finest authentic Thai cuisine. Lunch and dinner, every day in Einsiedeln."
        buttonText={t("reserve")}
      />

      <TestimonialsSection reviews={TESTIMONIALS} sectionLabel={t("testimonials")} />

      <AtmosphereSection images={atmosphere} atmosphereText={atmosphereText} />
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { CalendarCheck, Phone } from "lucide-react";

import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  getShowcases,
  getGoogleReviews,
  getAnnouncements,
  getAtmosphereImages,
  getAtmosphereText,
  getAboutSection,
} from "@/lib/api";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [
    showcaseList,
    reviews,
    announcements,
    atmosphere,
    atmosphereText,
    textSections,
    t,
  ] = await Promise.all([
    getShowcases(locale),
    getGoogleReviews(),
    getAnnouncements(locale),
    getAtmosphereImages(locale),
    getAtmosphereText(locale),
    getAboutSection(locale),
    getTranslations("home"),
  ]);
  return (
    <div>
      <main className="flex flex-col space-y-10">
        <div className="space-y-5 pt-6 md:pt-0">
          <h2 className="text-white text-center font-light">
            {t("welcomeTo")}
          </h2>
          <h1 className="text-center font-bold text-4xl lg:text-6xl text-[#DAE129] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {t("restaurantName")}
          </h1>
        </div>
        {/* Mobile: 1 large + 3 small layout */}
        <div
          className="relative flex flex-col items-center md:hidden"
          style={{ height: "380px" }}
        >
          {showcaseList.length > 0 && (
            <div className="rounded-full border-4 border-[#DAE129] overflow-hidden w-[200px] h-[200px] z-10">
              <Image
                src={showcaseList[0].url}
                className="object-cover w-full h-full"
                alt={showcaseList[0].title}
                width={200}
                height={200}
              />
            </div>
          )}
          {/* Left image */}
          {showcaseList.length > 1 && (
            <div className="absolute left-[10%] top-[45%] rounded-full border-4 border-[#DAE129] overflow-hidden w-[110px] h-[110px] mt-5">
              <Image
                src={showcaseList[1].url}
                className="object-cover w-full h-full"
                alt={showcaseList[1].title}
                width={110}
                height={110}
              />
            </div>
          )}
          {/* Center image */}
          {showcaseList.length > 2 && (
            <div className="absolute left-1/2 -translate-x-1/2 top-[55%] rounded-full border-4 border-[#DAE129] overflow-hidden w-[120px] h-[120px] mt-5">
              <Image
                src={showcaseList[2].url}
                className="object-cover w-full h-full"
                alt={showcaseList[2].title}
                width={120}
                height={120}
              />
            </div>
          )}
          {/* Right image */}
          {showcaseList.length > 3 && (
            <div className="absolute right-[10%] top-[40%] rounded-full border-4 border-[#DAE129] overflow-hidden w-[110px] h-[110px] mt-5">
              <Image
                src={showcaseList[3].url}
                className="object-cover w-full h-full"
                alt={showcaseList[3].title}
                width={110}
                height={110}
              />
            </div>
          )}
        </div>
        {/* Desktop: 3 top + 2 bottom layout */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="flex space-x-5 justify-evenly items-center">
            {showcaseList.slice(0, 3).map((showcase) => (
              <div key={showcase.title}>
                <Image
                  src={showcase.url}
                  className="rounded-full w-[280px] h-[280px] object-cover"
                  alt={showcase.title}
                  width={280}
                  height={280}
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-5 justify-evenly items-center">
            {showcaseList.slice(3, 5).map((showcase) => (
              <div key={showcase.title}>
                <Image
                  src={showcase.url}
                  className="rounded-full w-[280px] h-[280px] object-cover"
                  alt={showcase.title}
                  width={280}
                  height={280}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center justify-evenly w-full px-4">
          <Link href="/reservation">
            <Button className="flex items-center gap-3 border-2 border-[#DAE129] text-[#DAE129] rounded-full px-6 py-3 text-sm md:text-base font-semibold hover:bg-[#DAE129]/10 transition-colors">
              <CalendarCheck className="w-5 h-5" />
              {t("reserveTheTable")}
            </Button>
          </Link>
          <a href="tel:0555357330">
            <Button className="flex items-center gap-3 bg-gradient-to-r from-red-400 to-yellow-300 text-black rounded-full px-6 py-3 text-sm md:text-base font-semibold hover:opacity-90 transition-opacity">
              <Phone className="w-5 h-5" />
              055 / 5 35 73 30
            </Button>
          </a>
        </div>
        {/* Mobile: Who Are We */}
        <section className="md:hidden py-10 px-6">
          <div className="flex flex-col items-center text-center text-white space-y-5">
            <h2 className="text-2xl font-bold">{t("whoAreWe")}</h2>
            <div className="font-light">
              {documentToReactComponents(textSections)}
            </div>
            <div className="flex items-center justify-around w-full pt-4">
              <div className="flex flex-col items-center gap-3">
                <Link href="/reservation">
                  <Button className="w-20 h-20 p-0 rounded-full border-2 border-[#DAE129] text-[#DAE129] bg-transparent hover:bg-[#DAE129]/10 transition-colors">
                    <CalendarCheck size={40} />
                  </Button>
                </Link>
                <p className="text-[#DAE129] text-base font-light">
                  {t("reserve")}
                </p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <a href="tel:0555357330">
                  <Button className="w-20 h-20 p-0 rounded-full border-2 border-[#DAE129] text-[#DAE129] bg-transparent hover:bg-[#DAE129]/10 transition-colors">
                    <Phone size={40} />
                  </Button>
                </a>
                <p className="text-[#DAE129] text-base font-light">
                  {t("phoneCall")}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Desktop: Who Are We */}
        <section className="hidden md:block bg-white">
          <div className="flex justify-between items-center p-10 text-black w-full">
            <div className="flex flex-col space-y-5 w-full items-center text-center">
              <p className="text-xl">{t("whoAreWeUpper")}</p>
              <Image
                src={"/branding.jpg"}
                className="rounded-full mb-8"
                alt="branding"
                width={120}
                height={120}
              />
            </div>
            <div>{documentToReactComponents(textSections)}</div>
          </div>
        </section>
        <section className="p-20">
          <h1 className="lg:text-6xl text-[#DAE129]">{t("announcement")}</h1>
          <div className="flex mt-10 space-x-10">
            <Separator
              orientation="vertical"
              className="h-auto mx-5 w-1 bg-[#DAE129]"
            />
            {announcements.map((announcement, index) => (
              <div key={index} className="space-y-5 text-white">
                <h2 className="text-3xl  font-bold">{announcement.title}</h2>
                {typeof announcement.description === "string" ? (
                  <p className="text-white text-3xl font-light">
                    {announcement.description}
                  </p>
                ) : (
                  documentToReactComponents(announcement.description)
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="px-6 py-12 md:p-20 text-center w-auto bg-white">
          <h2 className="font-light">{t("whatOurCustomersSay")}</h2>
          <div className="flex flex-col justify-center items-center">
            <div className="inline-block space-y-3">
              <h1 className="text-4xl md:text-6xl">{t("testimonials")}</h1>
              <Separator className="bg-gradient-to-r from-red-400 to-yellow-300 h-3 w-full rounded-full" />
            </div>
            {reviews.length > 0 ? (
              <Carousel className="w-full max-w-lg">
                <CarouselContent>
                  {reviews.map((review, index) => (
                    <CarouselItem
                      key={index}
                      className="space-y-5 mt-10 flex flex-col items-center px-4"
                    >
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={review.image} alt={review.name} />
                        <AvatarFallback>
                          {review.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xl font-bold">{review.name}</p>
                      <div className="text-2xl font-light italic">
                        <p>{review.content}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <div className="mt-10 text-gray-500">
                <p className="text-xl font-light">{t("noReviews")}</p>
              </div>
            )}
          </div>
        </section>
        <section className="p-20 text-center w-auto text-white">
          <h2 className="font-light">{t("whatOurCustomersFeel")}</h2>
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="inline-block space-y-3">
              <h1 className="text-6xl">{t("atmosphere")}</h1>
              <Separator className="bg-gradient-to-r from-red-400 to-yellow-300 h-3 w-full rounded-full" />
            </div>
            <p className="text-center font-light">{atmosphereText}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-10 w-full">
            {atmosphere.map((item) => (
              <div key={item.title} className="relative w-full h-48 md:h-64">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

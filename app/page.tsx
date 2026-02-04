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
import Image from "next/image";

export default function Home() {
  const atmosphere = [
    
  ]
  const reviews = [
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
  const textSections = [
    "Muang Thai Restaurant is a family-owned Thai dining place nestled in the heart of Einsiedeln.",
    "Our story began with a simple wish — to bring the flavors of home from Thailand to Switzerland. Every dish we serve is made with care, using fresh ingredients and traditional recipes passed down through generations.",
    "Here, we cook not only with skill, but with heart. Whether you’re joining us for a quick lunch, a relaxed dinner, or takeaway, you’ll always find a warm smile and the true taste of Thailand waiting for you.",
  ];
  const announcements = [
    {
      title: "Grand Opening!",
      content:
        "We are excited to announce the grand opening of Muang Thai Restaurant in Einsiedeln! Join us for an authentic Thai dining experience.",
    },
  ];
  const showcaseList = [
    {
      title: "showcase1",
      url: "/showcase1.jpg",
    },
    {
      title: "showcase2",
      url: "/showcase2.jpg",
    },
    {
      title: "showcase3",
      url: "/showcase3.jpg",
    },
    {
      title: "showcase4",
      url: "/showcase4.jpg",
    },
    {
      title: "showcase5",
      url: "/showcase5.jpg",
    },
  ];
  return (
    <div>
      <main className="flex flex-col space-y-10">
        <div className="space-y-5">
          <h2 className="text-white text-center font-light">Welcome to</h2>
          <h1 className="text-center font-bold text-4xl lg:text-6xl text-[#DAE129] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Muang Thai Restaurant
          </h1>
        </div>
        <div className="flex flex-col justify-center">
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
        <div className="flex items-center justify-evenly w-full ">
          <Button>Order Now</Button>
          <Button>Order Now</Button>
        </div>
        <section className="bg-white">
          <div className="flex justify-between items-center p-10  text-black w-full">
            <div className="flex flex-col space-y-5 w-full items-center text-center">
              <p className="text-xl">WHO ARE WE?</p>
              <Image
                src={"/branding.jpg"}
                className="rounded-full mb-8"
                alt="branding"
                width={120}
                height={120}
              />
            </div>
            <div>
              {textSections.map((section, index) => (
                <p key={index} className="mb-4">
                  {section}
                </p>
              ))}
            </div>
          </div>
        </section>
        <section className="p-20">
          <h1 className="lg:text-6xl text-[#DAE129]">Announcement</h1>
          <div className="flex mt-10 space-x-10">
            <Separator
              orientation="vertical"
              className="h-auto mx-5 w-1 bg-[#DAE129]"
            />
            {announcements.map((announcement, index) => (
              <div key={index} className="space-y-5">
                <h2 className="text-3xl text-white font-bold">
                  {announcement.title}
                </h2>
                <p className="text-white text-3xl font-light">
                  {announcement.content}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="p-20 text-center w-auto bg-white">
          <h2 className="font-light">WHAT OUR CUSTOMERS SAY</h2>
          <div className="flex flex-col justify-center items-center">
            <div className="inline-block space-y-3">
              <h1 className="text-6xl">TESTIMONIALS</h1>
              <Separator className="bg-gradient-to-r from-red-400 to-yellow-300 h-3 w-full rounded-full" />
            </div>
            <Carousel>
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className="space-y-5 mt-10 flex flex-col items-center"
                  >
                    <Avatar className="w-32 h-32">
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <p className="text-xl font-bold">{review.name}</p>
                    <p className="text-2xl font-light italic">
                      "{review.content}"
                    </p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        <section className="p-20 text-center w-auto text-white">
          <h2 className="font-light">WHAT OUR CUSTOMERS SAY</h2>
          <div className="flex flex-col justify-center items-center">
            <div className="inline-block space-y-3">
              <h1 className="text-6xl">ATMOSPHERE</h1>
              <Separator className="bg-gradient-to-r from-red-400 to-yellow-300 h-3 w-full rounded-full" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

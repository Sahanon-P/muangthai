import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="space-y-5">
        <div className="flex flex-col lg:flex-row justify-between px-10 text-white bg-img-cover items-center pt-10 lg:pt-0">
          <div className="flex flex-col space-y-2">
            <p className="lg:text-[100px] text-[30px]">
              Original thailändische Spezialitäten
            </p>
            <p className="font-light lg:text-[30px] text-[20px]">
              Restaurant - Mittags-Buffet - Take Away
            </p>
            <div>
              <Button variant={'ghost'}>Book Table</Button>
            </div>
          </div>

          <Image src="/food.png" alt="food" width={1000} height={500} />
        </div>

        <div className="p-5">
          <h2 className=" font-bold text-2xl lg:text-4xl">
            Essen wie in Asien:
          </h2>
          <p className="font-light">
            Restaurant mit thailändischer Küche und authentischem Ambiente
          </p>
          <div className="flex items-center space-x-5 p-5">
            <p className="font-light text-sm lg:text-lg">
              ie sind auf der Suche nach einem Restaurant mit{" "}
              <span className="font-bold">besonderer Atmosphäre? </span> Sie
              wollen nicht das Übliche essen, sondern ein{" "}
              <span className="font-bold">kulinarisches Highlight?</span> Oder
              möchten Sie einfach{" "}
              <span className="font-bold">
                leckeres Essen auch zu Hause genießen?{" "}
              </span>{" "}
              Probieren Sie es einmal mit der thailändischer Küche und besuchen
              Sie uns! Seit 2011 werden in dem familiengeführten Restaurant
              Muang Thai in Einsiedeln frische, leckere und abwechslungsreiche
              Spezialitäten aus der thailändischen Küche zubereitet. Dabei wird
              nach traditioneller thailändischer Art für die Gäste gekocht – wie
              im Thailandurlaub!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

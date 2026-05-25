import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";

interface AtmosphereImage {
  title: string;
  url: string;
}

interface AtmosphereSectionProps {
  images: AtmosphereImage[];
  atmosphereText?: string;
}

export function AtmosphereSection({ images, atmosphereText }: AtmosphereSectionProps) {
  const visibleImages = images.slice(0, 8);
  if (visibleImages.length === 0) return null;

  return (
    <section className="py-28 bg-[#FAFAF8]">
      <AnimatedSection className="text-center mb-16 px-6">
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
            Experience
          </span>
          <div className="h-px w-10 bg-[#C9A96E]" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl text-[#1C1C1C] font-light mb-6">
          Atmosphere
        </h2>
        {atmosphereText && (
          <p className="font-body text-[#6C6460] max-w-xl mx-auto leading-relaxed text-base">
            {atmosphereText}
          </p>
        )}
      </AnimatedSection>

      {/* Masonry-style grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E8E0D5]">
        {visibleImages.map((img, i) => (
          <div
            key={`${img.url}-${i}`}
            className={`relative overflow-hidden bg-[#F0EBE4] group ${
              i % 5 === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
            }`}
          >
            <Image
              src={img.url}
              alt={img.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

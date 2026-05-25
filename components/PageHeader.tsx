import Image from "next/image";
import { AnimatedSection } from "@/components/sections/AnimatedSection";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  backgroundImageUrl?: string | null;
}

export function PageHeader({ eyebrow, title, backgroundImageUrl }: PageHeaderProps) {
  if (backgroundImageUrl) {
    return (
      <div className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#1C1C1C]">
          <Image
            src={backgroundImageUrl}
            alt={title}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 pb-16 px-6 md:px-16 w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-[#C9A96E]" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-tight">
            {title}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-6 bg-[#FAFAF8]">
      <AnimatedSection className="text-center">
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
            {eyebrow}
          </span>
          <div className="h-px w-10 bg-[#C9A96E]" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl text-[#1C1C1C] font-light">{title}</h1>
      </AnimatedSection>
    </div>
  );
}

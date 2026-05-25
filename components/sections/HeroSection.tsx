"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CalendarCheck, Phone } from "lucide-react";

interface HeroSectionProps {
  heroImageUrl: string | null;
  welcomeText: string;
  reserveText: string;
  tagline?: string;
}

export function HeroSection({
  heroImageUrl,
  welcomeText,
  reserveText,
  tagline,
}: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1C1C1C]">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt="Muang Thai Restaurant"
            fill
            priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
        )}
        {/* Gradient overlay — darkens bottom so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-xs tracking-[0.35em] uppercase text-[#C9A96E] mb-5"
        >
          {welcomeText}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-7xl md:text-9xl font-light leading-none mb-6"
        >
          Authentic Thai
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-16 h-px bg-[#C9A96E] mb-6 origin-left"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-body text-base font-light text-white/75 max-w-sm mb-10 leading-relaxed"
        >
          {tagline ||
            "The most satisfying Thai food experience anyone can have in a chic environment"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/reservation">
            <button className="flex items-center justify-center gap-2 border border-[#C9A96E] text-[#C9A96E] px-8 py-3 font-body text-xs tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-white transition-all duration-300 min-w-[180px]">
              <CalendarCheck className="w-4 h-4" />
              {reserveText}
            </button>
          </Link>
          <a href="tel:0555357330">
            <button className="flex items-center justify-center gap-2 bg-[#C9A96E] text-white px-8 py-3 font-body text-xs tracking-[0.2em] uppercase hover:bg-[#B8975A] transition-all duration-300 min-w-[180px]">
              <Phone className="w-4 h-4" />
              055 / 5 35 73 30
            </button>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-white/40"
        />
      </motion.div>
    </section>
  );
}

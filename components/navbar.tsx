"use client";
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isEnglish = locale === "en";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLanguageSwitch(newLocale: "en" | "de") {
    router.replace(pathname, { locale: newLocale });
  }

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/story", label: t("ourStory") },
    { href: "/menu", label: t("menu") },
    { href: "/reservation", label: t("reservation") },
    { href: "/gallery", label: t("chefGallery") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <Fragment>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-[#E8E0D5] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/branding.jpg"
              alt="Muang Thai Restaurant"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
            <span
              className={`hidden sm:block font-display text-sm tracking-widest uppercase transition-colors duration-300 ${
                scrolled ? "text-[#1C1C1C]" : "text-white"
              }`}
            >
              Muang Thai
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-xs tracking-[0.18em] uppercase transition-colors duration-200 relative group ${
                  scrolled ? "text-[#3C3C3C]" : "text-white/90"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Language Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div
              className={`hidden sm:flex items-center gap-1 font-body text-xs tracking-widest uppercase ${
                scrolled ? "text-[#3C3C3C]" : "text-white/80"
              }`}
            >
              <button
                onClick={() => handleLanguageSwitch("en")}
                className={`px-1 py-0.5 transition-colors duration-200 ${
                  isEnglish ? "text-[#C9A96E] border-b border-[#C9A96E]" : "hover:text-[#C9A96E]"
                }`}
              >
                EN
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => handleLanguageSwitch("de")}
                className={`px-1 py-0.5 transition-colors duration-200 ${
                  !isEnglish ? "text-[#C9A96E] border-b border-[#C9A96E]" : "hover:text-[#C9A96E]"
                }`}
              >
                DE
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu
                size={26}
                className={scrolled ? "text-[#1C1C1C]" : "text-white"}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#FAFAF8] z-[60] flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-[#E8E0D5]">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <Image
                src="/branding.jpg"
                alt="Muang Thai Restaurant"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-display text-sm tracking-widest uppercase text-[#1C1C1C]">
                Muang Thai
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={26} className="text-[#1C1C1C]" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-light text-[#1C1C1C] hover:text-[#C9A96E] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language toggle (mobile) */}
          <div className="flex items-center justify-center gap-4 pb-12 font-body text-sm tracking-widest uppercase text-[#3C3C3C]">
            <button
              onClick={() => { handleLanguageSwitch("en"); setMobileOpen(false); }}
              className={`px-2 py-1 transition-colors ${isEnglish ? "text-[#C9A96E] border-b border-[#C9A96E]" : ""}`}
            >
              EN
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => { handleLanguageSwitch("de"); setMobileOpen(false); }}
              className={`px-2 py-1 transition-colors ${!isEnglish ? "text-[#C9A96E] border-b border-[#C9A96E]" : ""}`}
            >
              DE
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

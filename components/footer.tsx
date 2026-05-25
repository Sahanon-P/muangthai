import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface ContactInfo {
  phone: string;
  address: string;
  email: string;
  tagline: string;
}

interface QuickLinkItem {
  label: string;
  href: string;
}

interface FooterProps {
  contactInfo: ContactInfo | null;
  quickLinks: QuickLinkItem[];
}

const defaultContact: ContactInfo = {
  phone: "055 / 5 35 73 30",
  address: "Heidenbühl 2, 8840 Einsiedeln",
  email: "info@muangthairestaurant.com",
  tagline:
    "Authentic Thai cuisine made with love and tradition.\nFresh ingredients, warm smiles, unforgettable flavors.",
};

export default async function Footer({ contactInfo, quickLinks }: FooterProps) {
  const t = await getTranslations("footer");
  const contact = contactInfo ?? defaultContact;

  return (
    <footer className="bg-[#1C1C1C] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/branding.jpg"
              alt="Muang Thai Restaurant"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <span className="font-display text-lg tracking-widest uppercase text-white">
              Muang Thai
            </span>
          </Link>

          <div className="h-px w-10 bg-[#C9A96E]" />

          <p className="font-body text-sm font-light text-[#9C9490] leading-relaxed whitespace-pre-line max-w-[240px]">
            {contact.tagline}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/people/Restaurant-Muang-Thai-Einsiedeln/61556342024938/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#6C6460] hover:text-[#C9A96E] transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.tripadvisor.ch/Restaurant_Review-g1079207-d4149826-Reviews-Muang_Thai-Einsiedeln.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TripAdvisor"
              className="text-[#6C6460] hover:text-[#C9A96E] transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-4.5 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm9 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM7.5 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-7.94 4c.638 1.166 1.87 2 3.44 2s2.802-.834 3.44-2H8.56z" />
              </svg>
            </a>
          </div>

          <span className="inline-block font-body text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] border border-[#C9A96E]/40 px-3 py-1.5 w-fit">
            {t("tagline")}
          </span>
        </div>

        {/* Contact column */}
        <div className="flex flex-col gap-6">
          <h3 className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
            {t("contactUs")}
          </h3>
          <div className="h-px w-10 bg-[#C9A96E]" />

          <div className="flex flex-col gap-4 font-body text-sm text-[#9C9490]">
            <a
              href={`tel:${contact.phone.replace(/[\s/]/g, "")}`}
              className="flex items-center gap-3 hover:text-[#C9A96E] transition-colors duration-200 group"
            >
              <Phone size={15} className="text-[#C9A96E] shrink-0" />
              {contact.phone}
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={15} className="text-[#C9A96E] shrink-0 mt-0.5" />
              <span>{contact.address}</span>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 hover:text-[#C9A96E] transition-colors duration-200"
            >
              <Mail size={15} className="text-[#C9A96E] shrink-0" />
              {contact.email}
            </a>
          </div>
        </div>

        {/* Opening hours column */}
        <div className="flex flex-col gap-6">
          <h3 className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] flex items-center gap-2">
            <Clock size={12} />
            Opening Hours
          </h3>
          <div className="h-px w-10 bg-[#C9A96E]" />

          <div className="flex flex-col divide-y divide-white/5 font-body text-sm">
            {[
              { day: "Mo.", hours: "Geschlossen", closed: true },
              { day: "Di. – Fr.", hours: "11:00 – 14:00\n17:30 – 22:30 Uhr", closed: false },
              { day: "Sa.", hours: "17:30 – 22:30 Uhr", closed: false },
              { day: "So.", hours: "11:30 – 21:30 Uhr", closed: false },
            ].map(({ day, hours, closed }) => (
              <div key={day} className="flex justify-between gap-4 py-2.5">
                <span className="text-[#6C6460] shrink-0">{day}</span>
                <span className={`text-right whitespace-pre-line ${closed ? "text-[#C9A96E] text-xs tracking-widest uppercase" : "text-[#9C9490]"}`}>
                  {hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links column */}
        <div className="flex flex-col gap-6">
          <h3 className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
            {t("quickLink")}
          </h3>
          <div className="h-px w-10 bg-[#C9A96E]" />

          <nav className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-sm text-[#9C9490] hover:text-white transition-colors duration-200 relative group w-fit"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-[#5C5858] tracking-widest">
            © {new Date().getFullYear()} Muang Thai Restaurant · Einsiedeln, Switzerland
          </p>
          <p className="font-body text-[11px] text-[#5C5858] tracking-widest">
            Crafted with care
          </p>
        </div>
      </div>
    </footer>
  );
}

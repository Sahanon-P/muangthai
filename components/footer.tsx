import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Phone, MapPin, Mail } from "lucide-react";
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
  address: "Heidenb\u00fchl 2, 8840 Einsiedeln",
  email: "info@muangthai.com",
  tagline:
    "Authentic Thai cuisine made with love and tradition.\nFresh ingredients, warm smiles, unforgettable flavors.",
};

const defaultLinks: QuickLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About us", href: "#" },
  { label: "Our menu", href: "#" },
  { label: "Dine-in", href: "#" },
  { label: "Take away", href: "#" },
  { label: "Contact us", href: "#" },
];

export default async function Footer({ contactInfo, quickLinks }: FooterProps) {
  const t = await getTranslations("footer");
  const contact = contactInfo ?? defaultContact;
  const links = quickLinks.length > 0 ? quickLinks : defaultLinks;

  return (
    <footer className="bg-[#1a1a1a] text-white py-16 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Image
            src="/branding.jpg"
            alt="Muang Thai Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
          <span className="bg-red-600 text-white text-sm px-4 py-1 rounded border border-red-400 font-light">
            {t("tagline")}
          </span>
          <p className="text-sm font-light text-gray-300 text-center md:text-left mt-4 whitespace-pre-line">
            {contact.tagline}
          </p>
        </div>

        {/* Contact Us Column */}
        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-lg font-bold tracking-wide">{t("contactUs")}</h3>
          <div className="flex flex-col space-y-4 text-sm font-light text-gray-300">
            <div className="flex items-center space-x-3">
              <Phone size={18} className="text-gray-400" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={18} className="text-gray-400" />
              <span>{contact.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-gray-400" />
              <span>{contact.email}</span>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col items-center md:items-end space-y-6">
          <h3 className="text-lg font-bold tracking-wide">{t("quickLink")}</h3>
          <nav className="flex flex-col items-center md:items-end space-y-3 text-sm font-light text-gray-300">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[#DAE129] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

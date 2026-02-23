"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const isEnglish = locale === "en";

  function handleLanguageSwitch() {
    const newLocale = isEnglish ? "de" : "en";
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <Fragment>
      {/* Mobile Menu Icon */}
      <div className="lg:hidden grid grid-cols-3 items-center w-full p-6 gap-36">
        <Menu
          onClick={() => setOpen(true)}
          size={50}
          className="text-[#DAE129] cursor-pointer"
        />
        <Image
          src={"/branding.jpg"}
          className="rounded-full justify-self-center"
          alt="branding"
          width={50}
          height={50}
        />
        <div className="flex items-center space-x-2 justify-self-end">
          <Label htmlFor="en" className="text-white">
            EN
          </Label>
          <Switch
            id="languages"
            className="bg-[#DAE129]"
            checked={!isEnglish}
            onCheckedChange={handleLanguageSwitch}
          />
          <Label htmlFor="de" className="text-white">
            DE
          </Label>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-[#242424] z-50 flex flex-col items-center justify-center">
          <X
            onClick={() => setOpen(false)}
            size={32}
            className="text-[#DAE129] cursor-pointer absolute top-5 right-5"
          />
          <div className="flex flex-col space-y-6 items-center">
            <Image
              src={"/branding.jpg"}
              className="rounded-full mb-8"
              alt="branding"
              width={80}
              height={80}
            />
            <Link
              href="/"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/story"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              {t("ourStory")}
            </Link>
            <Link
              href="/menu"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              {t("menu")}
            </Link>
            <Link
              href="/reservation"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              {t("reservation")}
            </Link>
            <Link
              href="/gallery"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              {t("chefGallery")}
            </Link>
            <Link
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              {t("contact")}
            </Link>
            <Link
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              {t("location")}
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <nav className="hidden lg:flex lg:justify-center">
        <div className="w-[1000px] h-[92px] opacity-30 hover:opacity-100 border border-[#DAE129] rounded-[28px] pt-4 px-6 pb-4 gap-7 bg-[#1a1a1a]  flex justify-between items-center">
          <Image
            src={"/branding.jpg"}
            className="rounded-full"
            alt="branding"
            width={60}
            height={60}
          />
          <Link href="/" className="hover:underline hover:bg-red-500 hover:p-2 hover:rounded font-light text-[#DAE129]">
            {t("home")}
          </Link>
          <Link href="/story" className="hover:underline hover:bg-red-500 hover:p-2 hover:rounded font-light text-[#DAE129]">
            {t("ourStory")}
          </Link>
          <Link href="/menu" className="hover:underline hover:bg-red-500 hover:p-2 hover:rounded font-light text-[#DAE129]">
            {t("menu")}
          </Link>
          <Link
            href="/reservation"
            className="hover:underline hover:bg-red-500 hover:p-2 hover:rounded font-light text-[#DAE129]"
          >
            {t("reservation")}
          </Link>
          <Link href="/gallery" className="hover:underline hover:bg-red-500 hover:p-2 hover:rounded font-light text-[#DAE129]">
            {t("chefGallery")}
          </Link>
          <Link href="#" className="hover:underline hover:bg-red-500 hover:p-2 hover:rounded font-light text-[#DAE129]">
            {t("contact")}
          </Link>
          <Link href="#" className="hover:underline hover:bg-red-500 hover:p-2 hover:rounded font-light text-[#DAE129]">
            {t("location")}
          </Link>
        </div>
      </nav>
    </Fragment>
  );
}

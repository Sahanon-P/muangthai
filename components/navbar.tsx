"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
          <Switch id="languages" className="bg-[#DAE129]" />
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
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              OUR STORY
            </Link>
            <Link
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              MENU
            </Link>
            <Link
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              RESERVATION
            </Link>
            <Link
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              CHEF GALLERY
            </Link>
            <Link
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              CONTACT
            </Link>
            <Link
              href="#"
              className="text-xl font-light text-[#DAE129]"
              onClick={() => setOpen(false)}
            >
              LOCATION
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      <nav className="hidden lg:flex lg:justify-center">
        <div className="w-[1000px] h-[92px] opacity-30 border border-[#DAE129] rounded-[28px] pt-4 px-6 pb-4 gap-7 bg-[#242424] flex justify-between items-center">
          <Image
            src={"/branding.jpg"}
            className="rounded-full"
            alt="branding"
            width={60}
            height={60}
          />
          <Link href="#" className="hover:underline font-light text-[#DAE129]">
            {"Home".toUpperCase()}
          </Link>
          <Link href="#" className="hover:underline font-light text-[#DAE129]">
            {"Our Story".toUpperCase()}
          </Link>
          <Link href="#" className="hover:underline font-light text-[#DAE129]">
            {"Menu".toUpperCase()}
          </Link>
          <Link href="#" className="hover:underline font-light text-[#DAE129]">
            {"Reservation".toUpperCase()}
          </Link>
          <Link href="#" className="hover:underline font-light text-[#DAE129]">
            {"CHEF GALLERY".toUpperCase()}
          </Link>
          <Link href="#" className="hover:underline font-light text-[#DAE129]">
            {"Contact".toUpperCase()}
          </Link>
          <Link href="#" className="hover:underline font-light text-[#DAE129]">
            {"Location".toUpperCase()}
          </Link>
        </div>
      </nav>
    </Fragment>
  );
}

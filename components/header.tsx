"use client";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import React from "react";
export default function Header() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);
  return (
    <header className="bg-img-cover-small p-5 text-white flex justify-between md:items-center sticky top-0 z-50 w-full">
      <div className="flex flex-col space-y-2">
        <Image src={"/branding.jpg"} alt="branding" width={50} height={50} />
      </div>
      <div className="md:hidden hover:bg-primary/90 p-2 rounded-md">
        <Menu
          onClick={() => {
            setOpen(true);
          }}
          size={20}
          className="ml-auto"
        />
      </div>
      <div className="hidden md:flex space-x-5 justify-between">
        <a href="#" className="hover:underline font-light">
          Galerie
        </a>
        <a href="#" className="hover:underline font-light">
          Anfahrt
        </a>
        <a href="#" className="hover:underline font-light">
          Speisekarte
        </a>
        <a href="#" className="hover:underline font-light">
          Reservation
        </a>
      </div>
      {open && (
        <div className="md:hidden min-h-screen">
          <div className="absolute top-0 left-0 w-full bg-primary p-7 h-full">
            <X
              onClick={() => {
                setOpen(false);
              }}
              size={20}
              className="ml-auto"
            />
            <div className="flex flex-col space-y-5 items-center mt-6 justify-center">
              <a href="#" className="text-lg">
                Galerie
              </a>
              <a href="#" className="text-lg">
                Anfahrt
              </a>
              <a href="#" className="text-lg">
                Speisekarte
              </a>
              <a href="#" className="text-lg">
                Reservation
              </a>
            </div>
          </div>
          </div>
      )}
    </header>
  );
}

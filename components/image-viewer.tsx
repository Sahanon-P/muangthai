"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}

function isLineBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Line\//i.test(navigator.userAgent);
}

export default function ImageViewer({
  src,
  alt,
  children,
  className,
}: ImageViewerProps) {
  const [open, setOpen] = useState(false);
  const [isLine, setIsLine] = useState(false);

  useEffect(() => {
    setIsLine(isLineBrowser());
  }, []);

  function handleClick() {
    if (isLine) {
      window.open(src, "_blank");
    } else {
      setOpen(true);
    }
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={className ?? "cursor-pointer w-full max-w-4xl mx-auto"}
      >
        {children}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
          >
            <X size={32} />
          </button>
          <div
            className="relative w-[90vw] h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}

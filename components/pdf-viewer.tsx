"use client";

import { useState } from "react";
import { X, Maximize2 } from "lucide-react";

interface PdfViewerProps {
  src: string;
  title: string;
  className?: string;
}

export default function PdfViewer({ src, title, className }: PdfViewerProps) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      {/* Inline embedded viewer */}
      <div
        className={
          className ??
          "relative w-full max-w-4xl mx-auto border-4 border-[#DAE129] rounded-lg overflow-hidden"
        }
      >
        <div className="relative w-full h-[400px] md:h-[600px]">
          <iframe
            src={src}
            title={title}
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>

        <button
          onClick={() => setFullscreen(true)}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
          aria-label="View fullscreen"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setFullscreen(false)}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            aria-label="Close fullscreen"
          >
            <X size={32} />
          </button>
          <div
            className="w-[90vw] h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={src}
              title={title}
              className="w-full h-full rounded-lg"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

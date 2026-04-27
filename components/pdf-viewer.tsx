"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfViewerProps {
  src: string;
  title: string;
  className?: string;
}

function PdfDocument({
  src,
  width,
  pageNumber,
  onLoadSuccess,
}: {
  src: string;
  width: number | undefined;
  pageNumber: number;
  onLoadSuccess: (numPages: number) => void;
}) {
  return (
    <Document
      file={src}
      onLoadSuccess={({ numPages }) => onLoadSuccess(numPages)}
      loading={
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
          Loading...
        </div>
      }
      error={
        <div className="flex items-center justify-center h-64 text-red-400 text-sm">
          Failed to load PDF.
        </div>
      }
    >
      <Page
        pageNumber={pageNumber}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </Document>
  );
}

export default function PdfViewer({ src, className }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>();

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) setContainerWidth(node.clientWidth);
  }, []);

  function prev() {
    setPageNumber((p) => Math.max(1, p - 1));
  }

  function next() {
    setPageNumber((p) => Math.min(numPages, p + 1));
  }

  const controls = (
    <div className="flex items-center justify-between gap-4 px-4 py-2 bg-black/80 text-white text-sm">
      <button
        onClick={prev}
        disabled={pageNumber <= 1}
        className="disabled:opacity-30 hover:text-[#DAE129] transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>
      <span>
        {pageNumber} / {numPages || "-"}
      </span>
      <button
        onClick={next}
        disabled={pageNumber >= numPages}
        className="disabled:opacity-30 hover:text-[#DAE129] transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
      <button
        onClick={() => setFullscreen((f) => !f)}
        className="ml-auto hover:text-[#DAE129] transition-colors"
        aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
      >
        {fullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </button>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-black">
        {controls}
        <div className="flex-1 overflow-auto flex justify-center items-start py-4">
          <PdfDocument
            src={src}
            width={Math.min(window.innerWidth - 32, 900)}
            pageNumber={pageNumber}
            onLoadSuccess={setNumPages}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        className ??
        "w-full max-w-4xl mx-auto border-4 border-[#DAE129] rounded-lg overflow-hidden"
      }
    >
      <div ref={containerRef} className="bg-white">
        <PdfDocument
          src={src}
          width={containerWidth}
          pageNumber={pageNumber}
          onLoadSuccess={setNumPages}
        />
      </div>
      {controls}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto border-4 border-[#DAE129] rounded-lg h-64 flex items-center justify-center text-gray-400 text-sm">
      Loading...
    </div>
  ),
});

export default PdfViewer;

"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

export interface Announcement {
  title: string;
  description: Document;
  endDate: string | null;
}

interface AnnouncementDialogProps {
  announcements: Announcement[];
}

// Key is derived from titles so new/changed announcements always show again.
function sessionKey(announcements: Announcement[]) {
  return `mt_ann_${announcements.map((a) => a.title).join(",")}`;
}

export function AnnouncementDialog({ announcements }: AnnouncementDialogProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (announcements.length === 0) return;
    if (!sessionStorage.getItem(sessionKey(announcements))) {
      setOpen(true);
    }
  }, [announcements]);

  function handleClose() {
    sessionStorage.setItem(sessionKey(announcements), "1");
    setOpen(false);
  }

  if (!mounted || announcements.length === 0) return null;

  const item = announcements[current];
  const total = announcements.length;
  const hasMultiple = total > 1;

  const dialog = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Card */}
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="announcement-title"
              className="bg-white w-full max-w-lg max-h-[80vh] flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold accent bar */}
              <div className="h-1 bg-[#C9A96E] shrink-0" />

              {/* Scrollable body */}
              <div className="overflow-y-auto p-8 md:p-10 flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px w-8 bg-[#C9A96E] shrink-0" />
                      <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
                        {hasMultiple ? `Announcement ${current + 1} / ${total}` : "Announcement"}
                      </span>
                    </div>
                    <h2
                      id="announcement-title"
                      className="font-display text-3xl text-[#1C1C1C] font-light leading-tight"
                    >
                      {item.title}
                    </h2>
                  </div>
                  <button
                    onClick={handleClose}
                    aria-label="Close"
                    className="p-1.5 text-[#9C9490] hover:text-[#1C1C1C] transition-colors shrink-0 mt-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="h-px bg-[#E8E0D5] mb-8" />

                {/* Body — rich text */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                    className="font-body text-sm text-[#5C5C5C] leading-relaxed space-y-3"
                  >
                    {documentToReactComponents(item.description)}
                  </motion.div>
                </AnimatePresence>
                
              </div>

              {/* Footer */}
              <div className="px-8 md:px-10 py-5 border-t border-[#F0E8E0] flex items-center justify-between shrink-0">
                {/* Pagination (only when multiple) */}
                {hasMultiple ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                      disabled={current === 0}
                      aria-label="Previous announcement"
                      className="w-8 h-8 border border-[#E0D8D0] flex items-center justify-center text-[#3C3C3C] hover:border-[#C9A96E] hover:text-[#C9A96E] disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <div className="flex gap-1.5 items-center">
                      {announcements.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          aria-label={`Go to announcement ${i + 1}`}
                          className={`rounded-full transition-all duration-300 ${
                            i === current
                              ? "w-5 h-1.5 bg-[#C9A96E]"
                              : "w-1.5 h-1.5 bg-[#D0C8C0] hover:bg-[#C9A96E]/60"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
                      disabled={current === total - 1}
                      aria-label="Next announcement"
                      className="w-8 h-8 border border-[#E0D8D0] flex items-center justify-center text-[#3C3C3C] hover:border-[#C9A96E] hover:text-[#C9A96E] disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleClose}
                  className="font-body text-xs tracking-[0.2em] uppercase bg-[#1C1C1C] text-white px-6 py-3 hover:bg-[#C9A96E] transition-colors duration-300"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(dialog, document.body);
}

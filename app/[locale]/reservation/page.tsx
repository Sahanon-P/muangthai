"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { submitReservation } from "./actions";
import { useTranslations } from "next-intl";
import { CalendarCheck, CheckCircle, XCircle } from "lucide-react";

function useReservationSchema() {
  const t = useTranslations("reservation.validation");
  return z.object({
    name: z.string().min(1, t("nameRequired")),
    bookingTime: z.string().min(1, t("bookingTimeRequired")),
    email: z.string().email({ message: t("invalidEmail") }),
    phone: z.string().min(1, t("phoneRequired")),
    seats: z.string().min(1, t("seatsRequired")),
    message: z.string().max(100, t("messageMaxLength")).optional(),
    agreed: z.literal(true, { message: t("agreeRequired") }),
  });
}

type ReservationFormValues = {
  name: string;
  bookingTime: string;
  email: string;
  phone: string;
  seats: string;
  message?: string;
  agreed: true;
};

/* Shared input class for light editorial theme */
const INPUT_CLS =
  "bg-white border-0 border-b border-[#D8D0C8] rounded-none h-12 px-0 text-[#1C1C1C] placeholder:text-[#B0A898] font-body text-sm focus-visible:ring-0 focus-visible:border-[#C9A96E] focus:border-[#C9A96E] transition-colors duration-200";

export default function ReservationPage() {
  const t = useTranslations("reservation");
  const reservationSchema = useReservationSchema();

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      bookingTime: "",
      email: "",
      phone: "",
      seats: "",
      message: "",
      agreed: undefined,
    },
  });

  async function onSubmit(data: ReservationFormValues) {
    setIsSubmitting(true);
    setSubmitStatus(null);
    const { agreed, ...formData } = data;
    void agreed;
    const result = await submitReservation(formData);
    if (result.success) {
      setSubmitStatus({ type: "success", message: t("successMessage") });
      form.reset();
    } else {
      setSubmitStatus({ type: "error", message: result.error ?? t("errorMessage") });
    }
    setIsSubmitting(false);
  }

  const messageValue = form.watch("message") ?? "";

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Page header */}
      <div className="pt-24 pb-16 px-6 text-center">
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
            Muang Thai
          </span>
          <div className="h-px w-10 bg-[#C9A96E]" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl text-[#1C1C1C] font-light">
          {t("title")}
        </h1>
      </div>

      {/* Form card */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-4xl mx-auto bg-white border border-[#E8E0D5] p-8 md:p-14">
          {/* Card eyebrow */}
          <div className="flex items-center gap-4 mb-10">
            <CalendarCheck size={18} className="text-[#C9A96E]" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C9A96E]">
              Book a Table
            </span>
            <div className="h-px flex-1 bg-[#E8E0D5]" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                {/* Left column */}
                <div className="flex flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] block mb-2">
                          {t("namePlaceholder")}
                        </label>
                        <FormControl>
                          <Input
                            placeholder="Jane Smith"
                            {...field}
                            className={INPUT_CLS}
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bookingTime"
                    render={({ field }) => (
                      <FormItem>
                        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] block mb-2">
                          Date &amp; Time
                        </label>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            className={`${INPUT_CLS} [color-scheme:light]`}
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] block mb-2">
                          {t("emailPlaceholder")}
                        </label>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="jane@example.com"
                            {...field}
                            className={INPUT_CLS}
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] block mb-2">
                          {t("phonePlaceholder")}
                        </label>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+41 55 000 00 00"
                            {...field}
                            className={INPUT_CLS}
                          />
                        </FormControl>
                        <FormMessage className="font-body text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                      <FormItem>
                        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] block mb-2">
                          {t("seatPlaceholder")}
                        </label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className="bg-white border-0 border-b border-[#D8D0C8] rounded-none h-12 px-0 text-[#1C1C1C] font-body text-sm focus:ring-0 focus:border-[#C9A96E] data-[placeholder]:text-[#B0A898] transition-colors"
                            >
                              <SelectValue placeholder="1 – 10 guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border border-[#E8E0D5] shadow-lg rounded-none">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem
                                key={num}
                                value={num.toString()}
                                className="font-body text-sm text-[#1C1C1C] focus:bg-[#F5EFE6] focus:text-[#C9A96E]"
                              >
                                {num} {num === 1 ? "guest" : "guests"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="font-body text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <label className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9C9490] block mb-2">
                          {t("messageLabel")}
                        </label>
                        <div className="relative flex-1">
                          <FormControl>
                            <Textarea
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.slice(0, 100))}
                              placeholder="Any special requests or dietary requirements?"
                              className="bg-white border border-[#E8E0D5] rounded-none min-h-[200px] h-full px-4 py-3 resize-none font-body text-sm text-[#1C1C1C] placeholder:text-[#B0A898] focus-visible:ring-0 focus-visible:border-[#C9A96E] transition-colors"
                            />
                          </FormControl>
                          <span className="absolute bottom-3 right-3 font-body text-[11px] text-[#C9A96E]">
                            {messageValue.length}/100
                          </span>
                        </div>
                        <FormMessage className="font-body text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreed"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value === true}
                              onCheckedChange={field.onChange}
                              className="border-[#C9A96E] data-[state=checked]:bg-[#C9A96E] data-[state=checked]:border-[#C9A96E] rounded-none mt-0.5"
                            />
                          </FormControl>
                          <label className="font-body text-sm text-[#5C5C5C] leading-relaxed cursor-pointer">
                            {t("checkInfo")}
                          </label>
                        </div>
                        <FormMessage className="font-body text-xs text-red-400" />
                      </FormItem>
                    )}
                  />

                  {submitStatus && (
                    <div
                      className={`flex items-center gap-3 p-4 border font-body text-sm ${
                        submitStatus.type === "success"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-red-200 bg-red-50 text-red-600"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle size={16} className="shrink-0" />
                      ) : (
                        <XCircle size={16} className="shrink-0" />
                      )}
                      {submitStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#1C1C1C] text-white font-body text-xs tracking-[0.25em] uppercase hover:bg-[#C9A96E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 mt-auto"
                  >
                    {isSubmitting ? t("submitting") : t("submit")}
                  </button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}

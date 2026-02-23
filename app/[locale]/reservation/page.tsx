"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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

function useReservationSchema() {
  const t = useTranslations("reservation.validation");
  return z.object({
    name: z.string().min(1, t("nameRequired")),
    bookingTime: z.string().min(1, t("bookingTimeRequired")),
    email: z.string().email(t("invalidEmail")),
    phone: z.string().min(1, t("phoneRequired")),
    seats: z.string().min(1, t("seatsRequired")),
    message: z.string().max(100, t("messageMaxLength")).optional(),
    agreed: z.literal(true, {
      message: t("agreeRequired"),
    }),
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
    const result = await submitReservation(formData);

    if (result.success) {
      setSubmitStatus({
        type: "success",
        message: t("successMessage"),
      });
      form.reset();
    } else {
      setSubmitStatus({
        type: "error",
        message: result.error ?? t("errorMessage"),
      });
    }

    setIsSubmitting(false);
  }

  const messageValue = form.watch("message") ?? "";

  return (
    <div>
      <main className="flex flex-col space-y-10 px-4 md:px-20">
        <h1 className="text-center font-bold text-4xl lg:text-6xl text-[#DAE129] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {t("title")}
        </h1>

        <div className="border-2 border-[#DAE129] rounded-lg p-6 md:p-10 bg-[#2a2a2a]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Form Fields */}
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={t("namePlaceholder")}
                            {...field}
                            className="bg-[#1a1a1a] border-2 border-[#DAE129]/60 text-[#DAE129] placeholder:text-[#DAE129] rounded-md h-12 px-4 focus:border-[#DAE129]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bookingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            className="bg-[#1a1a1a] border-2 border-[#DAE129]/60 text-[#DAE129] placeholder:text-[#DAE129] rounded-md h-12 px-4 focus:border-[#DAE129] [color-scheme:dark]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            {...field}
                            className="bg-[#1a1a1a] border-2 border-[#DAE129]/60 text-[#DAE129] placeholder:text-[#DAE129] rounded-md h-12 px-4 focus:border-[#DAE129]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder={t("phonePlaceholder")}
                            {...field}
                            className="bg-[#1a1a1a] border-2 border-[#DAE129]/60 text-[#DAE129] placeholder:text-[#DAE129] rounded-md h-12 px-4 focus:border-[#DAE129]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#1a1a1a] border-2 border-[#DAE129]/60 text-[#DAE129] rounded-md h-12 px-4 focus:border-[#DAE129]">
                              <SelectValue placeholder={t("seatPlaceholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1a1a1a] border-[#DAE129]/60 text-[#DAE129]">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem
                                key={num}
                                value={num.toString()}
                                className="text-[#DAE129] focus:bg-[#DAE129]/20 focus:text-[#DAE129]"
                              >
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column - Message & Submit */}
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <label className="text-[#DAE129]/70 text-sm">
                          {t("messageLabel")}
                        </label>
                        <div className="relative flex-1">
                          <FormControl>
                            <Textarea
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.value.slice(0, 100))
                              }
                              className="bg-[#1a1a1a] border-2 border-[#DAE129]/60 text-white placeholder:text-[#DAE129]/50 rounded-md min-h-[200px] h-full px-4 py-3 resize-none focus:border-[#DAE129]"
                            />
                          </FormControl>
                          <span className="absolute bottom-2 right-3 text-[#DAE129]/50 text-xs">
                            {messageValue.length}/100
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreed"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value === true}
                              onCheckedChange={field.onChange}
                              className="border-[#DAE129] data-[state=checked]:bg-[#DAE129] data-[state=checked]:text-black"
                            />
                          </FormControl>
                          <label className="text-white text-sm">
                            {t("checkInfo")}
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitStatus && (
                    <p
                      className={`text-sm ${
                        submitStatus.type === "success"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-gray-400 to-gray-300 text-black font-semibold rounded-md hover:from-gray-300 hover:to-gray-200 disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? t("submitting") : t("submit")}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}

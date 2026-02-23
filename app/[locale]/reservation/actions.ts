"use server";

import { Resend } from "resend";
import { z } from "zod";
import { ConfirmationEmail } from "@/lib/emails/confirmation";
import { NotificationEmail } from "@/lib/emails/notification";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const RESTAURANT_EMAIL = process.env.RESTAURANT_EMAIL ?? "info@muangthai.com";
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "Muang Thai <noreply@muangthai.com>";

const reservationSchema = z.object({
  name: z.string().min(1),
  bookingTime: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  seats: z.string().min(1),
  message: z.string().max(100).optional(),
});

export type ReservationActionResult = {
  success: boolean;
  error?: string;
};

export async function submitReservation(
  formData: z.infer<typeof reservationSchema>,
): Promise<ReservationActionResult> {
  const t = await getTranslations("actions");
  const tConfirm = await getTranslations("emails.confirmation");
  const tNotify = await getTranslations("emails.notification");
  const parsed = reservationSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: t("invalidFormData") };
  }

  const { name, bookingTime, email, phone, seats, message } = parsed.data;

  try {
    // Send confirmation email to the customer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: tConfirm("subject"),
      react: ConfirmationEmail({
        name,
        bookingTime,
        seats,
        translations: {
          restaurantName: tConfirm("restaurantName"),
          authenticCuisine: tConfirm("authenticCuisine"),
          confirmed: tConfirm("confirmed"),
          greeting: tConfirm("greeting", { name }),
          thankYou: tConfirm("thankYou"),
          dateTime: tConfirm("dateTime"),
          seats: tConfirm("seats"),
          cancelNotice: tConfirm("cancelNotice"),
          orEmail: tConfirm("orEmail"),
          address: tConfirm("address"),
          copyright: tConfirm("copyright"),
        },
      }),
    });

    // Send notification email to the restaurant owner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RESTAURANT_EMAIL,
      subject: tNotify("subject", {
        name,
        date: new Date(bookingTime).toLocaleDateString("de-CH"),
      }),
      react: NotificationEmail({
        name,
        email,
        phone,
        bookingTime,
        seats,
        message,
        translations: {
          title: tNotify("title"),
          subtitle: tNotify("subtitle"),
          customerDetails: tNotify("customerDetails"),
          name: tNotify("name"),
          email: tNotify("email"),
          phone: tNotify("phone"),
          dateTime: tNotify("dateTime"),
          seats: tNotify("seats"),
          message: tNotify("message"),
          automatedNotice: tNotify("automatedNotice"),
        },
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send reservation emails:", error);
    return {
      success: false,
      error: t("emailFailed"),
    };
  }
}

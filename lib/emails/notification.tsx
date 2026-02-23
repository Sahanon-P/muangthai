import React from "react";

interface NotificationEmailTranslations {
  title: string;
  subtitle: string;
  customerDetails: string;
  name: string;
  email: string;
  phone: string;
  dateTime: string;
  seats: string;
  message: string;
  automatedNotice: string;
}

interface NotificationEmailProps {
  name: string;
  email: string;
  phone: string;
  bookingTime: string;
  seats: string;
  message?: string;
  translations: NotificationEmailTranslations;
}

export function NotificationEmail({
  name,
  email,
  phone,
  bookingTime,
  seats,
  message,
  translations: t,
}: NotificationEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#242424",
        color: "#ffffff",
        padding: "40px",
        borderRadius: "8px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#DAE129", fontSize: "28px", margin: 0 }}>
          {t.title}
        </h1>
        <p style={{ color: "#ffffff99", fontSize: "14px" }}>{t.subtitle}</p>
      </div>

      <div
        style={{
          backgroundColor: "#2a2a2a",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid #DAE12960",
        }}
      >
        <h2 style={{ color: "#DAE129", marginTop: 0 }}>{t.customerDetails}</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  color: "#DAE129",
                  fontWeight: "bold",
                  width: "140px",
                }}
              >
                {t.name}
              </td>
              <td style={{ padding: "10px 0" }}>{name}</td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  color: "#DAE129",
                  fontWeight: "bold",
                }}
              >
                {t.email}
              </td>
              <td style={{ padding: "10px 0" }}>
                <a href={`mailto:${email}`} style={{ color: "#DAE129" }}>
                  {email}
                </a>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  color: "#DAE129",
                  fontWeight: "bold",
                }}
              >
                {t.phone}
              </td>
              <td style={{ padding: "10px 0" }}>
                <a href={`tel:${phone}`} style={{ color: "#DAE129" }}>
                  {phone}
                </a>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  color: "#DAE129",
                  fontWeight: "bold",
                }}
              >
                {t.dateTime}
              </td>
              <td style={{ padding: "10px 0" }}>
                {new Date(bookingTime).toLocaleString("de-CH", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "10px 0",
                  color: "#DAE129",
                  fontWeight: "bold",
                }}
              >
                {t.seats}
              </td>
              <td style={{ padding: "10px 0" }}>{seats}</td>
            </tr>
            {message && (
              <tr>
                <td
                  style={{
                    padding: "10px 0",
                    color: "#DAE129",
                    fontWeight: "bold",
                    verticalAlign: "top",
                  }}
                >
                  {t.message}
                </td>
                <td
                  style={{
                    padding: "10px 0",
                    fontStyle: "italic",
                    color: "#ffffffcc",
                  }}
                >
                  &ldquo;{message}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#ffffff66",
          fontSize: "12px",
        }}
      >
        <p>{t.automatedNotice}</p>
      </div>
    </div>
  );
}

import React from "react";

interface ConfirmationEmailTranslations {
  restaurantName: string;
  authenticCuisine: string;
  confirmed: string;
  greeting: string;
  thankYou: string;
  dateTime: string;
  seats: string;
  cancelNotice: string;
  orEmail: string;
  address: string;
  copyright: string;
}

interface ConfirmationEmailProps {
  name: string;
  bookingTime: string;
  seats: string;
  translations: ConfirmationEmailTranslations;
}

export function ConfirmationEmail({
  name,
  bookingTime,
  seats,
  translations: t,
}: ConfirmationEmailProps) {
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
          {t.restaurantName}
        </h1>
        <p style={{ color: "#ffffff99", fontSize: "14px" }}>
          {t.authenticCuisine}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#2a2a2a",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid #DAE12960",
        }}
      >
        <h2 style={{ color: "#DAE129", marginTop: 0 }}>{t.confirmed}</h2>
        <p>{t.greeting}</p>
        <p>{t.thankYou}</p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <tbody>
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
          </tbody>
        </table>

        <p style={{ marginTop: "20px", color: "#ffffff99", fontSize: "14px" }}>
          {t.cancelNotice}{" "}
          <a href="tel:0555357330" style={{ color: "#DAE129" }}>
            055 / 5 35 73 30
          </a>{" "}
          {t.orEmail}{" "}
          <a href="mailto:info@muangthai.com" style={{ color: "#DAE129" }}>
            info@muangthai.com
          </a>
          .
        </p>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#ffffff66",
          fontSize: "12px",
        }}
      >
        <p>{t.address}</p>
        <p>{t.copyright}</p>
      </div>
    </div>
  );
}

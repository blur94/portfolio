import { ImageResponse } from "next/og";

export const alt = "Gilead Odo, Senior Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
    >
      <div
        style={{ width: 96, height: 8, marginBottom: 48, backgroundColor: "#f2fb7a" }}
      />
      <div style={{ fontSize: 96, letterSpacing: "-0.04em" }}>Gilead Odo</div>
      <div style={{ marginTop: 24, fontSize: 40, color: "#b4b4b4" }}>
        Senior Frontend Engineer
      </div>
      <div style={{ marginTop: 16, fontSize: 32, color: "#929292" }}>
        React, Next.js, TypeScript. SaaS and fintech.
      </div>
    </div>,
    size,
  );
}

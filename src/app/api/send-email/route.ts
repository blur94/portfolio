import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactFormNotification from "@/components/ContactFormNotification";

type ContactPayload = {
  email?: unknown;
  name?: unknown;
  subject?: unknown;
  message?: unknown;
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(req: Request) {
  const payload = (await req.json()) as ContactPayload;
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const subject =
    typeof payload.subject === "string" && payload.subject.trim()
      ? payload.subject.trim()
      : `New portfolio message from ${name || "a visitor"}`;

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { message: "Name, valid email, and message are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Email service is not configured." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      to: "hello@gileadodo.com",
      from: "Gilead Odo <info@mail.gileadodo.com>",
      replyTo: email,
      subject: subject,
      react: ContactFormNotification({ name, email, subject, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.log("Email sent:", data);
    return NextResponse.json(
      { entity: "Email", message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}

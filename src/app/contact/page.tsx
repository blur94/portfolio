import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { AvailabilityCard } from "@/components/AvailabilityCard";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Gilead Odo about remote frontend contracts and senior frontend roles.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section
        className="mx-auto px-6 py-24 md:px-12"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <div className="grid items-center gap-12 md:grid-cols-[60fr_40fr] md:gap-24">
          <div>
            <p
              className="mb-4.5 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.08em] before:inline-block before:h-px before:w-4.5 before:bg-current before:content-['']"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-muted)",
              }}
            >
              Get in touch
            </p>
            <h1
              className="mb-8 leading-[0.98] tracking-[-0.06em]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(56px, 7vw, 96px)",
                color: "var(--text-primary)",
              }}
            >
              <span style={{ color: "var(--text-display-dim)" }}>
                Let&rsquo;s{" "}
              </span>
              Talk.
            </h1>
            <p
              className="mb-10 max-w-[60ch] text-[22px] leading-[1.4] tracking-[-0.03em]"
              style={{ color: "var(--text-muted)" }}
            >
              Hiring for a senior frontend role, or need help on a React or
              Next.js build? Tell me what you&rsquo;re working on and I&rsquo;ll
              write back by email.
            </p>
            <a
              href="#contact-form"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-colors hover:bg-(--accent-primary) hover:text-(--text-on-accent)"
              style={{
                backgroundColor: "var(--text-primary)",
                color: "var(--bg-page)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Send a message
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>

          <AvailabilityCard />
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-30 md:px-10">
        <div id="contact-form" className="scroll-mt-28">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

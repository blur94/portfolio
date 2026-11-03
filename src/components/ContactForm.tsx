"use client";

import { useActionState, startTransition, useState } from "react";
import { useForm, schemaResolver } from "@mantine/form";
import { z } from "zod";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "./ui/button";
import {
  sendContactEmail,
  type ContactActionState,
} from "@/app/contact/actions";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email address"),
  message: z.string().min(10, "Write at least 10 characters"),
});

type Values = z.infer<typeof schema>;

export function ContactForm() {
  const [serverState, dispatch, isPending] = useActionState<
    ContactActionState,
    Values
  >(sendContactEmail, { status: "idle" });

  const [didReset, setDidReset] = useState(false);

  const form = useForm<Values>({
    mode: "controlled",
    initialValues: { name: "", email: "", message: "" },
    validate: schemaResolver(schema, { sync: true }),
    validateInputOnBlur: true,
  });

  const handleSubmit = form.onSubmit((values) => {
    setDidReset(false);
    startTransition(() => dispatch(values));
  });

  if (serverState.status === "success" && !didReset) {
    return (
      <div
        role="status"
        className="rounded-2xl border p-10"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-faint)",
        }}
      >
        <p
          className="mb-4 text-[40px] leading-none tracking-[-0.06em]"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          Sent.
        </p>
        <p
          className="text-[22px] leading-[1.4] tracking-[-0.03em]"
          style={{ color: "var(--text-secondary)" }}
        >
          I&apos;ll reply by email.
        </p>
        <button
          type="button"
          className="mt-8 inline-flex h-10 items-center gap-2 rounded-full border px-5 text-sm font-medium"
          style={{
            borderColor: "var(--border-subtle)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-heading)",
          }}
          onClick={() => {
            form.reset();
            setDidReset(true);
          }}
        >
          Send another
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2
        className="mb-2 text-2xl font-semibold leading-[1.2] tracking-[-0.06em]"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--text-primary)",
        }}
      >
        Tell me about your project
      </h2>

      <Field label="Name" htmlFor="cf-name" error={form.errors.name}>
        <Input
          id="cf-name"
          {...form.getInputProps("name")}
          className="w-full rounded-xl border px-4 py-3.5 text-lg leading-[1.4] tracking-[-0.02em] outline-none transition-colors focus:border-(--text-primary)"
          style={{
            backgroundColor: "var(--bg-page)",
            borderColor: "var(--border-faint)",
            color: "var(--text-primary)",
          }}
          placeholder="Your full name"
        />
      </Field>

      <Field label="Email" htmlFor="cf-email" error={form.errors.email}>
        <Input
          id="cf-email"
          type="email"
          {...form.getInputProps("email")}
          className="w-full rounded-xl border px-4 py-3.5 text-lg leading-[1.4] tracking-[-0.02em] outline-none transition-colors focus:border-(--text-primary)"
          style={{
            backgroundColor: "var(--bg-page)",
            borderColor: "var(--border-faint)",
            color: "var(--text-primary)",
          }}
          placeholder="you@company.com"
        />
      </Field>

      <Field label="Message" htmlFor="cf-message" error={form.errors.message}>
        <Textarea
          id="cf-message"
          rows={6}
          {...form.getInputProps("message")}
          className="min-h-42 w-full resize-y rounded-xl border px-4 py-3.5 text-lg leading-[1.4] tracking-[-0.02em] outline-none transition-colors focus:border-(--text-primary)"
          style={{
            backgroundColor: "var(--bg-page)",
            borderColor: "var(--border-faint)",
            color: "var(--text-primary)",
          }}
          placeholder="What are you building, what's the timeline, and what would success look like?"
        />
      </Field>

      <Button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-colors hover:bg-(--accent-primary) hover:text-(--text-on-accent) disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:self-start"
        style={{
          backgroundColor: "var(--text-primary)",
          color: "var(--bg-page)",
          fontFamily: "var(--font-heading)",
        }}
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Message"}
        {!isPending && <ArrowUpRight size={18} aria-hidden="true" />}
      </Button>

      {serverState.status === "error" && (
        <p
          role="alert"
          className="rounded-xl border px-4 py-3.5 text-sm font-medium leading-normal tracking-[-0.02em]"
          style={{
            backgroundColor: "var(--bg-surface-alt)",
            borderColor: "var(--border-default)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-heading)",
          }}
        >
          {serverState.message} Try again, or email me directly at{" "}
          <a
            href="mailto:hello@gileadodo.xyz"
            className="underline underline-offset-4"
          >
            hello@gileadodo.xyz
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-[0.06em]"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--text-tertiary)",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          className="text-sm text-destructive"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

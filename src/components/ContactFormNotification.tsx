import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";
import { siteUrl } from "@/lib/site";

interface ContactFormNotificationProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactFormNotification = ({
  name,
  email,
  subject,
  message,
}: ContactFormNotificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: {
                  bg: "#0D0F13",
                  fg: "#E8E4DC",
                  primary: "#E6A817",
                  muted: "#948D7E",
                  card: "#1A1D23",
                  border: "#2A2D33",
                },
              },
            },
          },
        }}
      >
        <Head />
        <Preview>New contact form submission from {name}</Preview>
        <Body className="bg-gray-100 py-10 font-sans">
          <Container className="mx-auto my-10 max-w-116.25 rounded-lg border border-solid border-brand-border bg-brand-bg px-5 py-5">
            {/* Header */}
            <Section className="mt-8">
              <Text className="text-brand-primary text-[18px] font-semibold leading-6 m-0">
                Gilead Odo
              </Text>
            </Section>

            {/* Main heading */}
            <Heading className="text-brand-fg text-[24px] font-normal leading-8 mx-0 my-7.5 p-0">
              New message from {name}
            </Heading>

            {/* Contact details card */}
            <Section className="bg-brand-card border border-solid border-brand-border rounded-lg px-5 py-4 mb-8">
              <Text className="text-brand-fg text-[14px] leading-6 m-0 mb-2">
                <span className="text-brand-muted">From:</span> {name}
              </Text>
              <Text className="text-[14px] leading-6 m-0 mb-2">
                <Link
                  href={`mailto:${email}`}
                  className="text-brand-primary no-underline"
                >
                  {email}
                </Link>
              </Text>
              <Text className="text-brand-fg text-[14px] leading-6 m-0 mb-2">
                <span className="text-brand-muted">Subject:</span> {subject}
              </Text>
            </Section>

            {/* Message content */}
            <Section className="mb-8">
              <Text className="text-brand-muted text-[14px] leading-5 m-0 mb-2 font-medium">
                Message:
              </Text>
              <Text className="text-brand-fg text-[14px] leading-6 m-0 whitespace-pre-wrap">
                {message}
              </Text>
            </Section>

            <Hr className="border border-solid border-brand-border my-6.5 mx-0 w-full" />

            {/* Footer */}
            <Section>
              <Text className="text-brand-muted text-[12px] leading-6 m-0 mb-2">
                Gilead Odo · Software Developer · +2348183406181
              </Text>
              <Text className="text-[12px] leading-6 m-0">
                <Link
                  href={siteUrl}
                  className="text-brand-muted no-underline mr-3"
                >
                  Website
                </Link>
                <Link
                  href="https://blog.gileadodo.com/"
                  className="text-brand-muted no-underline mr-3"
                >
                  Blog
                </Link>
                <Link
                  href="https://github.com/blur94/"
                  className="text-brand-muted no-underline mr-3"
                >
                  GitHub
                </Link>
                <Link
                  href="https://instagram.com/balmofcodes/"
                  className="text-brand-muted no-underline mr-3"
                >
                  Instagram
                </Link>
                <Link
                  href="https://linkedin.com/in/gilead-odo/"
                  className="text-brand-muted no-underline mr-3"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://x.com/balmofcodes/"
                  className="text-brand-muted no-underline"
                >
                  X/Twitter
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ContactFormNotification.PreviewProps = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  subject: "Collaboration Opportunity",
  message:
    "Hi Gilead,\n\nI came across your portfolio and I'm really impressed with your work at the intersection of design and code. I'd love to discuss a potential collaboration on a music visualization project.\n\nLooking forward to hearing from you!\n\nBest regards,\nSarah",
};

export default ContactFormNotification;

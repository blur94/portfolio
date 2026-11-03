import { sharedOpenGraph } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Gilead Odo about remote frontend contracts and senior frontend roles.",
  openGraph: {
    title: "Contact | Gilead Odo",
    description:
      "Get in touch with Gilead Odo about remote frontend contracts and senior frontend roles.",
    ...sharedOpenGraph,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Gilead Odo",
    description:
      "Get in touch with Gilead Odo about remote frontend contracts and senior frontend roles.",
    creator: "@balmofcodes",
  },
};
export default function ContactLayout(props: LayoutProps<"/contact">) {
  return props.children;
}

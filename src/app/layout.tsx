import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ClarityInit } from "@/components/ClarityInit";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cuckoo | Landing Pages, MVPs, Web Apps & AI Integration",
  description:
    "We build landing pages, MVPs, web apps and AI integrations for founders. From first sketch to production, with a timeline agreed before we start.",
  alternates: {
    canonical: "https://cuckoo.agency/",
  },
  openGraph: {
    type: "website",
    siteName: "cuckoo",
    url: "https://cuckoo.agency/",
    title: "cuckoo | Landing Pages, MVPs, Web Apps & AI Integration",
    description:
      "We build landing pages, MVPs, web apps and AI integrations for founders. From first sketch to production, with a timeline agreed before we start.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="font-sans">
        <ClarityInit />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

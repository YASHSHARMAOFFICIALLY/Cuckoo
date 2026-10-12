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
  title: "cuckoo | Design, build and launch for founders",
  description:
    "Cuckoo designs, builds and launches websites and MVPs for startups and founders. 2–4 week delivery, and you own 100% of the code and design.",
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

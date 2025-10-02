import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Be_Vietnam_Pro, Russo_One } from "next/font/google";
import "./globals.css";

const mono = Russo_One({
  weight: "400",
  variable: "--mono",
  subsets: ["latin"],
});

const sans = Be_Vietnam_Pro({
  weight: "400",
  variable: "--sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chronotune",
  description: "Guess the release date of random songs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} ${sans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

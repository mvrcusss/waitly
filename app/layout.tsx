import React from "react";
import type { Metadata } from "next";
import { Cal_Sans as FontHeading, Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans"
});

const fontHeading = FontHeading({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: "400"
});

export const metadata: Metadata = {
  title: "Meal Planner",
  description:
    "A simple and useful meal planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
          className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}
      >
        <div className="bg-pattern"></div>
        {children}
      </body>
    </html>
  );
}

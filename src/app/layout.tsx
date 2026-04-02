import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "NexaStore | Buy. Deploy. Use. No Code Needed.",
  description: "Premium digital product marketplace for AI Models, SaaS Tools, and Ready-made Apps.",
};

import AuthProvider from "@/components/providers/AuthProvider";
import ConsoleErrorSuppressor from "@/components/providers/ConsoleErrorSuppressor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ConsoleErrorSuppressor>
          <AuthProvider>{children}</AuthProvider>
        </ConsoleErrorSuppressor>
      </body>
    </html>
  );
}

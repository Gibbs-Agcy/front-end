import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dijital Ajans - Modern Web & Mobil Çözümler",
  description: "Web development, mobile app development, UI/UX design ve dijital pazarlama hizmetleri sunan modern dijital ajans",
  keywords: "web development, mobile app, UI/UX design, dijital pazarlama, brand identity",
  authors: [{ name: "Dijital Ajans" }],
  openGraph: {
    title: "Dijital Ajans - Modern Web & Mobil Çözümler",
    description: "Web development, mobile app development, UI/UX design ve dijital pazarlama hizmetleri",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title:
    "A concept home page for a Portland facial plastic surgery practice with refined visuals, procedure-focused messaging, and a premium aesthetic.",
  description:
    "A concept website for a Portland facial plastic surgery practice featuring elegant branding, surgical service highlights, and consultation-focused messaging.",
  openGraph: {
    images: [
      {
        url: "https://plastic-surgery.digitalelevation.us/showcase.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://plastic-surgery.digitalelevation.us/showcase.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

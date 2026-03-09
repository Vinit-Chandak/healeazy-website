import type { Metadata, Viewport } from "next";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#43baee",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kyuro — Expert Physiotherapy at Your Doorstep",
  description:
    "Connect with verified physiotherapists who come to you. Personalized treatment packages, flexible scheduling, and professional care — all in the comfort of your home. Launching in Hyderabad.",
  keywords: [
    "physiotherapy",
    "home visits",
    "physiotherapist",
    "Hyderabad",
    "rehabilitation",
    "Kyuro",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kyuro",
  },
  openGraph: {
    title: "Kyuro — Expert Physiotherapy at Your Doorstep",
    description:
      "Connect with verified physiotherapists who come to you. Launching in Hyderabad.",
    type: "website",
    locale: "en_IN",
    siteName: "Kyuro",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
      </head>
      <body className="antialiased">
        <ServiceWorkerRegistrar />
        {children}
      </body>
    </html>
  );
}

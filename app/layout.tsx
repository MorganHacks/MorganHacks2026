import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { PortalTransition } from "@/components/portal-transition"
import { SiteFooter } from "@/components/site-footer"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://morganhacks.com"),
  title: {
    default: "MorganHacks 2026",
    template: "%s • MorganHacks 2026",
  },
  description: "Join us April 14-15, 2026 for MorganHacks.",
  keywords: ["MorganHacks", "hackathon", "Morgan State University", "2026"],
  authors: [{ name: "MorganHacks Team", url: "https://morganhacks.com" }],
  creator: "MorganHacks Team",
  publisher: "MorganHacks",
  openGraph: {
    title: "MorganHacks 2026",
    description: "Join us April 14-15, 2026 for MorganHacks.",
    url: "https://morganhacks.com",
    siteName: "MorganHacks",
    locale: "en_US",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MorganHacks 2026",
    description: "Join us April 14-15, 2026 for MorganHacks.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.jpeg", type: "image/jpeg" },
    ],
    apple: "/icon.jpeg",
  },
  manifest: "/site.webmanifest",
  themeColor: "#0b1430",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased`}>
        <PortalTransition />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
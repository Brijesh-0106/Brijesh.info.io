import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans, Montserrat, Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const montserrat_alternates = Montserrat_Alternates({
  variable: "--font-montserrat_alternates",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://brijesh-info-io.vercel.app");

export const metadata: Metadata = {
  title: {
    default: "Shah Brijesh | Software Engineer",
    template: "%s | Shah Brijesh",
  },
  description:
    "Full-stack Software Engineer specializing in building scalable web apps, AI-powered tools, and developer infrastructure. Currently at TCS.",
  keywords: ["Software Engineer", "Full-stack Developer", "AI Engineer", "Next.js", "React", "Spring Boot", "TCS"],
  authors: [{ name: "Shah Brijesh" }],
  creator: "Shah Brijesh",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shah Brijesh | Software Engineer",
    description:
      "Full-stack Software Engineer building scalable web apps, AI tools, and developer infrastructure.",
    siteName: "Shah Brijesh Portfolio",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Shah Brijesh — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shah Brijesh | Software Engineer",
    description:
      "Full-stack Software Engineer building scalable web apps, AI tools, and developer infrastructure.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@shahbrijesh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/brijesh.png" },
      { url: "/brijesh.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/brijesh.png",
    apple: "/brijesh.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable} ${plusJakarta.variable} ${montserrat.variable} ${montserrat_alternates.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <div className="bg-mesh" />
        {children}
      </body>
    </html>
  );
}

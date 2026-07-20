import type { Metadata } from "next";
import { Inter, DotGothic16 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dotGothic = DotGothic16({
  weight: "400",
  variable: "--font-dot-gothic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David Oloniyo — UI/UX Designer & AI Product Designer",
  description: "Portfolio of David Oloniyo, showcasing digital products, brands, and experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dotGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground dot-pattern">
        {children}
      </body>
    </html>
  );
}

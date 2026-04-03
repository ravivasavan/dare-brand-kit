import type { Metadata } from "next";
import { Instrument_Sans, Anton } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { Agentation } from "./agentation";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const fkScreamer = localFont({
  src: "../fonts/FKScreamer.woff2",
  variable: "--font-fk-screamer",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Dare Brand Kit",
  description: "Interactive brand styleguide for Dare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={`${instrumentSans.variable} ${fkScreamer.variable} ${anton.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-instrument-sans), sans-serif" }}
      >
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}

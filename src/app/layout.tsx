import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "./providers";
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
    <html lang="en" className="dark">
      <body
        className={`${instrumentSans.variable} ${fkScreamer.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-instrument-sans), sans-serif" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

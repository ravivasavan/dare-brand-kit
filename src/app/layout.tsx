import type { Metadata } from "next";
import { Instrument_Sans, Anton } from "next/font/google";
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

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Dare Brand Kit",
  description: "Interactive brand styleguide for Dare",
};

// randomised footer colour — same palette + contrast pairs as the main site's
// Base.astro; runs before the footer paints so there's no flash
const footerColorScript = `(function () {
  var P = [
    ['#9eebba', '#201b1c'], ['#e7c0a2', '#201b1c'], ['#9cafed', '#201b1c'],
    ['#8ca474', '#201b1c'], ['#dddc8f', '#201b1c'], ['#cdc2e3', '#201b1c'],
    ['#201b1c', '#f4f2f8'],
  ];
  var c = P[Math.floor(Math.random() * P.length)];
  var r = document.documentElement;
  r.style.setProperty('--footer-bg', c[0]);
  r.style.setProperty('--footer-text', c[1]);
})()`;

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
        <script dangerouslySetInnerHTML={{ __html: footerColorScript }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

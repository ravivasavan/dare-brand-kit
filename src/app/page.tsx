"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Input,
  TextArea,
  Switch,
  TabsRoot,
  TabList,
  Tab,
  TabPanel,
  Separator,
} from "@heroui/react";

const colors = [
  {
    name: "White",
    hex: "#F4F2F8",
    rgb: "244, 242, 248",
    oklch: "96.4% 0.008 301.4",
    bg: "#F4F2F8",
    textDark: true,
  },
  {
    name: "Black",
    hex: "#201B1C",
    rgb: "32, 27, 28",
    oklch: "22.8% 0.008 4.1",
    bg: "#201B1C",
    textDark: false,
  },
  {
    name: "Celadon",
    hex: "#9EEBBA",
    rgb: "158, 235, 186",
    oklch: "87.7% 0.102 155.7",
    bg: "#9EEBBA",
    textDark: true,
  },
  {
    name: "Peach",
    hex: "#E7C0A2",
    rgb: "231, 192, 162",
    oklch: "83.4% 0.060 59.4",
    bg: "#E7C0A2",
    textDark: true,
  },
  {
    name: "Cornflower",
    hex: "#9CAFED",
    rgb: "156, 175, 237",
    oklch: "76.2% 0.092 271.0",
    bg: "#9CAFED",
    textDark: true,
  },
  {
    name: "Olive",
    hex: "#8CA474",
    rgb: "140, 164, 116",
    oklch: "68.8% 0.073 129.7",
    bg: "#8CA474",
    textDark: true,
  },
  {
    name: "Pistachio",
    hex: "#DDDC8F",
    rgb: "221, 220, 143",
    oklch: "87.8% 0.098 107.6",
    bg: "#DDDC8F",
    textDark: true,
  },
  {
    name: "Mauve",
    hex: "#CDC2E3",
    rgb: "205, 194, 227",
    oklch: "83.3% 0.047 300.6",
    bg: "#CDC2E3",
    textDark: true,
  },
];

const typographyScale = [
  { name: "Heading / H1", font: "FK Screamer", size: "164px", lineHeight: "100%", sampleSize: "clamp(3rem, 8vw, 10.25rem)" },
  { name: "Heading / H2", font: "FK Screamer", size: "124px", lineHeight: "100%", sampleSize: "clamp(2.5rem, 6vw, 7.75rem)" },
  { name: "Heading / H3", font: "FK Screamer", size: "80px", lineHeight: "100%", sampleSize: "clamp(2rem, 4vw, 5rem)" },
  { name: "Heading / H4", font: "FK Screamer", size: "48px", lineHeight: "100%", sampleSize: "clamp(1.5rem, 3vw, 3rem)" },
  { name: "Heading / H5", font: "FK Screamer", size: "32px", lineHeight: "100%", sampleSize: "clamp(1.25rem, 2vw, 2rem)" },
  { name: "Body Large", font: "Instrument Sans", size: "48px", lineHeight: "120%", sampleSize: "clamp(1.5rem, 3vw, 3rem)" },
  { name: "Body Regular", font: "Instrument Sans", size: "32px", lineHeight: "120%", sampleSize: "clamp(1.25rem, 2vw, 2rem)" },
  { name: "Body Small", font: "Instrument Sans", size: "24px", lineHeight: "120%", sampleSize: "clamp(1rem, 1.5vw, 1.5rem)" },
  { name: "Caption", font: "Instrument Sans", size: "16px", lineHeight: "120%", sampleSize: "1rem" },
  { name: "Detail", font: "Instrument Sans", size: "12px", lineHeight: "100%", sampleSize: "0.75rem" },
];

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      title={copied ? "Copied!" : `Copy ${label}`}
      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
    >
      <span className="text-[10px] font-bold uppercase tracking-wide opacity-60">
        {label}
      </span>
      <br />
      <span className="text-xs font-medium">
        {copied ? "Copied!" : value}
      </span>
    </button>
  );
}

function ColorSwatch({
  color,
}: {
  color: (typeof colors)[0];
}) {
  const textColor = color.textDark ? "#201B1C" : "#F4F2F8";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold" style={{ color: "#293E14" }}>
        {color.name}
      </span>
      <div
        className="rounded-md p-3 flex flex-col gap-3 min-h-[140px]"
        style={{
          backgroundColor: color.bg,
          color: textColor,
          border:
            color.name === "White" ? "1px solid #201B1C20" : "none",
        }}
      >
        <CopyButton value={color.oklch} label="OKLCH" />
        <CopyButton value={color.hex} label="HEX" />
        <CopyButton value={color.rgb} label="RGB" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F4F2F8", color: "#201B1C" }}
    >
      {/* Header */}
      <header className="px-8 pt-12 pb-8">
        <h1
          className="text-6xl tracking-tight"
          style={{ fontFamily: "var(--font-fk-screamer)" }}
        >
          Dare
        </h1>
        <p className="mt-2 text-lg opacity-60">Brand Kit</p>
      </header>

      <main className="px-8 pb-16 space-y-16">
        {/* Colours */}
        <section>
          <h2
            className="text-3xl mb-6"
            style={{ fontFamily: "var(--font-fk-screamer)" }}
          >
            Colours
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {colors.map((c) => (
              <ColorSwatch key={c.name} color={c} />
            ))}
          </div>
        </section>

        <Separator style={{ backgroundColor: "#201B1C20" }} />

        {/* Typography */}
        <section>
          <h2
            className="text-3xl mb-6"
            style={{ fontFamily: "var(--font-fk-screamer)" }}
          >
            Typography
          </h2>
          <div className="space-y-8">
            {typographyScale.map((t) => (
              <div
                key={t.name}
                className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 items-baseline"
              >
                <div className="space-y-1">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs opacity-60">{t.font}</p>
                  <p className="text-xs opacity-60">
                    {t.size} / {t.lineHeight}
                  </p>
                </div>
                <p
                  className="leading-none"
                  style={{
                    fontFamily: t.font === "FK Screamer"
                      ? "var(--font-fk-screamer)"
                      : "var(--font-instrument-sans)",
                    fontSize: t.sampleSize,
                    lineHeight: t.lineHeight,
                    textTransform: t.name === "Detail" ? "uppercase" : "none",
                  }}
                >
                  {t.font === "FK Screamer"
                    ? "Heading over two lines."
                    : t.name === "Detail"
                      ? "Detail over two lines"
                      : `${t.name.replace("Body ", "").charAt(0).toUpperCase() + t.name.replace("Body ", "").slice(1)} over two lines.`}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator style={{ backgroundColor: "#201B1C20" }} />

        {/* Components */}
        <section>
          <h2
            className="text-3xl mb-6"
            style={{ fontFamily: "var(--font-fk-screamer)" }}
          >
            Components
          </h2>

          <TabsRoot defaultSelectedKey="buttons" aria-label="Component examples">
            <TabList className="border-b border-[#201B1C20] mb-6">
              <Tab id="buttons">Buttons</Tab>
              <Tab id="chips">Chips</Tab>
              <Tab id="cards">Cards</Tab>
              <Tab id="inputs">Inputs</Tab>
            </TabList>

            <TabPanel id="buttons">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {colors.filter((c) => c.name !== "White").map((c) => (
                    <Button
                      key={c.name}
                      className="font-semibold"
                      style={{
                        backgroundColor: c.bg,
                        color: c.textDark ? "#201B1C" : "#F4F2F8",
                      }}
                    >
                      {c.name}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.filter((c) => c.name !== "White").map((c) => (
                    <Button
                      key={c.name}
                      variant="outline"
                      className="font-semibold"
                      style={{
                        borderColor: c.bg,
                        color: c.name === "Black" ? "#201B1C" : c.bg,
                      }}
                    >
                      {c.name}
                    </Button>
                  ))}
                </div>
              </div>
            </TabPanel>

            <TabPanel id="chips">
              <div className="flex flex-wrap gap-3">
                {colors.filter((c) => c.name !== "White").map((c) => (
                  <Chip
                    key={c.name}
                    style={{
                      backgroundColor: c.bg,
                      color: c.textDark ? "#201B1C" : "#F4F2F8",
                    }}
                  >
                    {c.name}
                  </Chip>
                ))}
              </div>
            </TabPanel>

            <TabPanel id="cards">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {colors
                  .filter((c) => !["White", "Black"].includes(c.name))
                  .map((c) => (
                    <Card
                      key={c.name}
                      className="border-none"
                      style={{ backgroundColor: c.bg }}
                    >
                      <CardHeader>
                        <h3
                          className="text-xl"
                          style={{
                            fontFamily: "var(--font-fk-screamer)",
                            color: "#201B1C",
                          }}
                        >
                          {c.name}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm" style={{ color: "#201B1C" }}>
                          A card component using the {c.name.toLowerCase()} colour
                          token as its background. HEX {c.hex}.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabPanel>

            <TabPanel id="inputs">
              <div className="max-w-md space-y-4">
                <Input placeholder="Enter your name" aria-label="Name" />
                <TextArea placeholder="Write a message" aria-label="Message" />
                <div className="flex items-center gap-3">
                  <Switch />
                  <span className="text-sm">Toggle option</span>
                </div>
              </div>
            </TabPanel>
          </TabsRoot>
        </section>
      </main>
    </div>
  );
}

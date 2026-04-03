"use client";

import { useState } from "react";
import { Copy, Check, ArrowRight } from "@phosphor-icons/react";

const colors = [
  { name: "White", hex: "#F4F2F8", rgb: "244, 242, 248", oklch: "96.4% 0.008 301.4", textDark: true },
  { name: "Black", hex: "#201B1C", rgb: "32, 27, 28", oklch: "22.8% 0.008 4.1", textDark: false },
  { name: "Celadon", hex: "#9EEBBA", rgb: "158, 235, 186", oklch: "87.7% 0.102 155.7", textDark: true },
  { name: "Peach", hex: "#E7C0A2", rgb: "231, 192, 162", oklch: "83.4% 0.060 59.4", textDark: true },
  { name: "Cornflower", hex: "#9CAFED", rgb: "156, 175, 237", oklch: "76.2% 0.092 271.0", textDark: true },
  { name: "Olive", hex: "#8CA474", rgb: "140, 164, 116", oklch: "68.8% 0.073 129.7", textDark: true },
  { name: "Pistachio", hex: "#DDDC8F", rgb: "221, 220, 143", oklch: "87.8% 0.098 107.6", textDark: true },
  { name: "Mauve", hex: "#CDC2E3", rgb: "205, 194, 227", oklch: "83.3% 0.047 300.6", textDark: true },
];

const typographyScale = [
  { name: "Heading / H1", font: "FK Screamer", size: "164px", lineHeight: "100%", sampleSize: "clamp(3rem, 8vw, 10.25rem)", fallback: true },
  { name: "Heading / H2", font: "FK Screamer", size: "124px", lineHeight: "100%", sampleSize: "clamp(2.5rem, 6vw, 7.75rem)", fallback: true },
  { name: "Heading / H3", font: "FK Screamer", size: "80px", lineHeight: "100%", sampleSize: "clamp(2rem, 4vw, 5rem)", fallback: true },
  { name: "Heading / H4", font: "FK Screamer", size: "48px", lineHeight: "100%", sampleSize: "clamp(1.5rem, 3vw, 3rem)", fallback: true },
  { name: "Heading / H5", font: "FK Screamer", size: "32px", lineHeight: "100%", sampleSize: "clamp(1.25rem, 2vw, 2rem)", fallback: true },
  { name: "Body Large", font: "Instrument Sans", size: "48px", lineHeight: "120%", sampleSize: "clamp(1.5rem, 3vw, 3rem)", fallback: false },
  { name: "Body Regular", font: "Instrument Sans", size: "32px", lineHeight: "120%", sampleSize: "clamp(1.25rem, 2vw, 2rem)", fallback: false },
  { name: "Body Small", font: "Instrument Sans", size: "24px", lineHeight: "120%", sampleSize: "clamp(1rem, 1.5vw, 1.5rem)", fallback: false },
  { name: "Caption", font: "Instrument Sans", size: "16px", lineHeight: "120%", sampleSize: "1rem", fallback: false },
  { name: "Detail", font: "Instrument Sans", size: "12px", lineHeight: "100%", sampleSize: "0.75rem", fallback: false },
];

const componentTabs = ["Buttons", "Chips", "Cards", "Inputs"] as const;

function CopyButton({ value, label, textColor }: { value: string; label: string; textColor: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="text-left hover:opacity-70 transition-opacity cursor-pointer"
      style={{ color: textColor }}
    >
      <span className="text-[10px] font-bold uppercase tracking-wide opacity-60 block">
        {label}
      </span>
      <span className="text-xs font-medium inline-flex items-center gap-1">
        {copied ? (
          <>Copied! <Check size={12} weight="bold" /></>
        ) : (
          <>{value} <Copy size={12} /></>
        )}
      </span>
    </button>
  );
}

function ColorSwatch({ color }: { color: (typeof colors)[0] }) {
  const textColor = color.textDark ? "#201B1C" : "#F4F2F8";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-bold" style={{ color: "#293E14" }}>
        {color.name}
      </span>
      <div
        className="rounded-md p-3 flex flex-col gap-3"
        style={{
          backgroundColor: color.hex,
          color: textColor,
          border: color.name === "White" ? "1px solid #201B1C20" : "none",
          minHeight: 140,
        }}
      >
        <CopyButton value={color.oklch} label="OKLCH" textColor={textColor} />
        <CopyButton value={color.hex} label="HEX" textColor={textColor} />
        <CopyButton value={color.rgb} label="RGB" textColor={textColor} />
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<(typeof componentTabs)[number]>("Buttons");
  const [showAnton, setShowAnton] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F4F2F8", color: "#201B1C" }}
    >
      {/* Floating navbar */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-1.5 rounded-full shadow-lg backdrop-blur-md"
        style={{ backgroundColor: "rgba(32, 27, 28, 0.9)" }}
      >
        <span
          className="text-lg uppercase font-bold px-3"
          style={{ fontFamily: "var(--font-fk-screamer)", color: "#F4F2F8" }}
        >
          Dare
        </span>
        <span className="text-[#F4F2F880] text-xs">|</span>
        {[
          { label: "Colours", id: "colours" },
          { label: "Typography", id: "typography" },
          { label: "Components", id: "components" },
          { label: "Templates", id: "templates" },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="px-3 py-1 text-xs font-medium rounded-full transition-colors hover:bg-white/10"
            style={{ color: "#F4F2F8" }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main className="px-8 pt-20 pb-16 space-y-16">
        {/* Colours */}
        <section id="colours">
          <h4
            className="text-3xl mb-6 uppercase font-bold"
            style={{ fontFamily: "var(--font-fk-screamer)" }}
          >
            Colours
          </h4>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((c) => (
              <ColorSwatch key={c.name} color={c} />
            ))}
          </div>
        </section>

        <hr style={{ borderColor: "#201B1C20" }} />

        {/* Typography */}
        <section id="typography">
          <h4
            className="text-3xl mb-6 uppercase font-bold"
            style={{ fontFamily: "var(--font-fk-screamer)" }}
          >
            Typography
          </h4>
          <div
            className="inline-flex items-start gap-3 p-4 rounded-lg mb-8 text-sm"
            style={{ backgroundColor: "#201B1C08", border: "1px solid rgba(32, 27, 28, 0.1)" }}
          >
            <div className="flex-1">
              <p>If creating documents or slides in Google Workspace, please use Anton in place of FK Screamer.</p>
              <p className="mt-1 opacity-60 text-xs">Toggle to show Anton instead of FK Screamer</p>
            </div>
            <button
              onClick={() => setShowAnton(!showAnton)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors"
              style={{ backgroundColor: showAnton ? "#293E14" : "#201B1C20" }}
            >
              <span
                className="inline-block h-5 w-5 rounded-full bg-white shadow transition-transform"
                style={{
                  transform: showAnton ? "translate(21px, 2px)" : "translate(2px, 2px)",
                }}
              />
            </button>
          </div>
          <div>
            {typographyScale.map((t) => (
              <div
                key={t.name}
                className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 items-start py-8 min-h-[120px]"
                style={{ borderTop: "1px solid rgba(32, 27, 28, 0.2)" }}
              >
                <div className="space-y-1">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs opacity-60">
                    {t.fallback && showAnton ? "Anton" : t.font}
                  </p>
                  <p className="text-xs opacity-60">
                    {t.size} / {t.lineHeight}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily:
                      t.font === "FK Screamer"
                        ? showAnton
                          ? "var(--font-anton)"
                          : "var(--font-fk-screamer)"
                        : "var(--font-instrument-sans)",
                    fontSize: t.sampleSize,
                    lineHeight: t.font === "FK Screamer" ? "0.85" : t.lineHeight,
                    textTransform: t.font === "FK Screamer" || t.name === "Detail" ? "uppercase" : "none",
                    fontWeight: t.font === "FK Screamer" ? (showAnton ? 400 : 700) : undefined,
                    paddingTop: 0,
                    marginTop: 0,
                  }}
                >
                  {t.font === "FK Screamer"
                    ? "Heading over two lines."
                    : t.name === "Detail"
                      ? "Detail over two lines"
                      : t.name === "Caption"
                        ? "Caption over two lines."
                        : `${t.name.replace("Body ", "")} over two lines.`}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: "#201B1C20" }} />

        {/* Components */}
        <section id="components">
          <h4
            className="text-3xl mb-6 uppercase font-bold"
            style={{ fontFamily: "var(--font-fk-screamer)" }}
          >
            Components
          </h4>

          {/* Tab bar */}
          <div
            className="flex gap-1 mb-8 border-b"
            style={{ borderColor: "#201B1C20" }}
          >
            {componentTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
                style={{
                  color: activeTab === tab ? "#293E14" : "#201B1C80",
                  borderBottom: activeTab === tab ? "2px solid #293E14" : "2px solid transparent",
                  fontWeight: activeTab === tab ? 700 : 500,
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Buttons */}
          {activeTab === "Buttons" && (
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-wide opacity-60 mb-3">Solid</p>
              <div className="flex flex-wrap gap-3">
                {colors.filter((c) => c.name !== "White").map((c) => (
                  <button
                    key={c.name}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: c.hex,
                      color: c.textDark ? "#201B1C" : "#F4F2F8",
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-wide opacity-60 mb-3">Outline</p>
              <div className="flex flex-wrap gap-3">
                {colors.filter((c) => c.name !== "White").map((c) => (
                  <button
                    key={c.name}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-opacity hover:opacity-80 bg-transparent"
                    style={{
                      borderColor: c.hex,
                      color: c.name === "Black" ? "#201B1C" : c.hex,
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chips */}
          {activeTab === "Chips" && (
            <div className="flex flex-wrap gap-3">
              {colors.filter((c) => c.name !== "White").map((c) => (
                <span
                  key={c.name}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: c.hex,
                    color: c.textDark ? "#201B1C" : "#F4F2F8",
                  }}
                >
                  {c.name}
                </span>
              ))}
            </div>
          )}

          {/* Cards */}
          {activeTab === "Cards" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colors
                .filter((c) => !["White", "Black"].includes(c.name))
                .map((c) => (
                  <div
                    key={c.name}
                    className="rounded-xl p-6"
                    style={{ backgroundColor: c.hex }}
                  >
                    <h3
                      className="mb-2 uppercase font-bold"
                      style={{
                        fontFamily: "var(--font-fk-screamer)",
                        fontSize: "32px",
                        lineHeight: "0.85",
                        color: "#201B1C",
                      }}
                    >
                      {c.name}
                    </h3>
                    <p className="text-sm" style={{ color: "#201B1C" }}>
                      A card using the {c.name.toLowerCase()} colour token as
                      its background. HEX {c.hex}.
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Inputs */}
          {activeTab === "Inputs" && (
            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide opacity-60 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors"
                  style={{
                    borderColor: "#201B1C30",
                    backgroundColor: "transparent",
                    color: "#201B1C",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#293E14")}
                  onBlur={(e) => (e.target.style.borderColor = "#201B1C30")}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide opacity-60 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Write a message"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors resize-none"
                  style={{
                    borderColor: "#201B1C30",
                    backgroundColor: "transparent",
                    color: "#201B1C",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#293E14")}
                  onBlur={(e) => (e.target.style.borderColor = "#201B1C30")}
                />
              </div>
            </div>
          )}
        </section>

        <hr style={{ borderColor: "#201B1C20" }} />

        {/* Templates */}
        <section id="templates">
          <h4
            className="text-3xl mb-6 uppercase font-bold"
            style={{ fontFamily: "var(--font-fk-screamer)" }}
          >
            Templates
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://docs.google.com/document/d/1UxHglmxxWhBQggPvAas5ooGCgDCh_eAgWK-9GxtV1Bs/edit?tab=t.0#heading=h.e2b3mork447t"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 rounded-xl border transition-colors hover:border-[#293E14]"
              style={{ borderColor: "#201B1C20" }}
            >
              <div>
                <span className="text-sm font-semibold block">Google Docs</span>
                <span className="text-xs opacity-60">Starter document template</span>
              </div>
              <ArrowRight
                size={20}
                className="opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-1"
              />
            </a>
            <div
              className="flex items-center justify-between p-6 rounded-xl border opacity-50"
              style={{ borderColor: "#201B1C20" }}
            >
              <div>
                <span className="text-sm font-semibold block">Google Slides</span>
                <span className="text-xs opacity-60">Coming soon</span>
              </div>
              <ArrowRight size={20} className="opacity-20" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

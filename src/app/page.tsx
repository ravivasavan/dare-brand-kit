"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, ArrowRight } from "@phosphor-icons/react";

const navItems = [
  { label: "Colours", id: "colours" },
  { label: "Typography", id: "typography" },
  { label: "Components", id: "components" },
  { label: "Templates", id: "templates" },
];

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

function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const [navShown, setNavShown] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      // low threshold: every anchor landing sits past it, so nav clicks always
      // settle in the condensed state instead of straddling the boundary
      setCondensed(window.scrollY > 24);
      // scrollspy: the last section whose top has passed the sticky header
      let current: string | null = null;
      for (const n of navItems) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 96) current = n.id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openNav = () => {
    setNavShown(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setNavOpen(true)));
    document.documentElement.style.overflow = "hidden";
  };
  const closeNav = () => {
    setNavOpen(false);
    document.documentElement.style.overflow = "";
    setTimeout(() => setNavShown(false), 320);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNav();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="header-slot">
        <header className={`site-header${condensed ? " is-condensed" : ""}`}>
          <div className="wrap">
          <div className="header-grid g12 items-center gap-y-3">
            <a
              href="/"
              className="col-span-6 md:col-span-3 fk nav-link header-brand"
            >
              Dare
            </a>
            <nav className="header-nav hidden md:col-span-9 md:flex flex-wrap items-center gap-x-[clamp(1.5rem,3vw,3.75rem)] gap-y-1 md:justify-end fk">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className={`nav-link${activeSection === n.id ? " is-active" : ""}`}
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="nav-toggle col-span-6 md:hidden justify-self-end self-center"
              aria-label={navOpen ? "Close menu" : "Open menu"}
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              onClick={() => (navOpen ? closeNav() : openNav())}
            >
              <span className="bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
          </div>
        </header>
      </div>

      <div
        id="mobile-nav"
        className={`mobile-nav${navOpen ? " is-open" : ""}`}
        aria-hidden={!navOpen}
        hidden={!navShown}
      >
        <nav className="mobile-nav-list">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={closeNav}
              className={activeSection === n.id ? "is-active" : ""}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mobile-nav-secondary">
          <a href="https://deafartsresidency.com" rel="noopener">
            deafartsresidency.com
          </a>
          <a href="https://www.instagram.com/deafartsresidency/" rel="noopener">
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}

const ackParas = [
  "We began and continue on the unceded lands of the Wurundjeri Woi Wurrung and Boonwurrung peoples of the Kulin Nation. We pay our respects to Elders past and present, and to young people and emerging leaders. This always was, and always will be, Aboriginal land.",
  "We also honour deaf pioneers, young people and leaders who are helping shape the future. Their work for sign language, access, and equal rights continues to guide us.",
];

function SiteFooter() {
  // email is split across data attributes so the address never appears in the
  // built output (same scheme as the main site's Base.astro); assembled from
  // the DOM at runtime, out of reach of both scrapers and the JS minifier
  const emailRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const a = emailRef.current;
    if (!a) return;
    const e = a.getAttribute("data-eu") + "@" + a.getAttribute("data-ed");
    a.setAttribute("href", "mailto:" + e);
    a.textContent = e;
  }, []);

  return (
    <footer
      style={{
        background: "var(--footer-bg, #201b1c)",
        color: "var(--footer-text, #f4f2f8)",
      }}
    >
      <div className="wrap pt-[clamp(4rem,10vh,6rem)]">
        <div
          className="g12 rows"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(1rem,1.4vw,1.25rem)",
            lineHeight: 1.5,
          }}
        >
          <p className="col-span-12 md:col-span-4">
            Deaf Arts Residency Incorporated
            <br />
            Association No. A0126812O
            <br />
            ABN 95 379 383 840
            <br />
            <a ref={emailRef} data-eu="hello" data-ed="deafartsresidency.com">
              hello [at] deafartsresidency [dot] com
            </a>
          </p>
          <div
            className="col-span-12 md:col-span-8 flex flex-col gap-3 max-w-[60ch]"
            style={{ textWrap: "pretty" }}
          >
            {ackParas.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
        {/* giant DARE wordmark: same inlined Figma export as the main site,
            fill follows footer text colour for contrast */}
        <svg
          viewBox="0 0 1431 796.356"
          fill="currentColor"
          role="img"
          aria-label="DARE"
          className="mt-[clamp(2rem,6vh,4rem)] block w-full"
        >
          <path d="M1145.08 0H1431V119.933H1300.51V333.894H1412.77V453.827H1300.51V676.423H1431V796.356H1145.08V0Z" />
          <path d="M758.578 0H910.174C1034.9 0 1119.34 76.7572 1119.34 206.285V223.555C1119.34 314.704 1084.8 375.151 1021.47 412.57V422.165C1080.96 454.786 1096.31 497.962 1098.23 585.274L1100.15 662.031C1101.11 731.112 1105.9 761.815 1119.34 786.761V796.356H974.458C962.944 767.572 958.147 727.274 957.187 674.504L953.349 538.26C952.39 498.922 942.795 474.935 911.133 474.935V796.356H758.578V0ZM911.133 99.7843V375.151H920.728C946.633 375.151 962.944 355.002 962.944 301.272V172.704C962.944 119.933 946.633 99.7843 920.728 99.7843H911.133Z" />
          <path d="M434.725 0H661.159L733.119 786.761V796.356H583.443L570.969 600.625H509.564L497.091 796.356H362.766V786.761L434.725 0ZM517.239 479.732H563.294L545.064 196.69H535.469L517.239 479.732Z" />
          <path d="M0 0H145.839C281.123 0 361.718 91.1491 361.718 311.826V484.53C361.718 705.207 281.123 796.356 145.839 796.356H0V0ZM152.555 99.7843V690.815H161.19C191.893 690.815 205.325 670.666 205.325 630.368V160.231C205.325 119.933 191.893 99.7843 161.19 99.7843H152.555Z" />
        </svg>
      </div>
    </footer>
  );
}

function ColorSwatch({ color }: { color: (typeof colors)[0] }) {
  const textColor = color.textDark ? "#201B1C" : "#F4F2F8";

  return (
    <div className="flex flex-col gap-2 col-span-6 md:col-span-3">
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
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />

      <main
        id="main"
        className="wrap pt-[clamp(1.5rem,3vw,3rem)] pb-[clamp(4rem,8vw,6rem)] space-y-16"
      >
        {/* Colours */}
        <section id="colours">
          <h4
            className="text-3xl mb-6 uppercase font-bold"
            style={{ fontFamily: "var(--font-fk-screamer)" }}
          >
            Colours
          </h4>
          <div className="g12">
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
                className="g12 items-start py-8 min-h-[120px]"
                style={{ borderTop: "1px solid rgba(32, 27, 28, 0.2)" }}
              >
                <div className="space-y-1 col-span-12 md:col-span-3">
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs opacity-60">
                    {t.fallback && showAnton ? "Anton" : t.font}
                  </p>
                  <p className="text-xs opacity-60">
                    {t.size} / {t.lineHeight}
                  </p>
                </div>
                <p
                  className="col-span-12 md:col-span-9"
                  style={{
                    fontFamily:
                      t.font === "FK Screamer"
                        ? showAnton
                          ? "var(--font-anton)"
                          : "var(--font-fk-screamer)"
                        : "var(--font-instrument-sans)",
                    fontSize: t.sampleSize,
                    lineHeight:
                      t.font === "FK Screamer"
                        ? showAnton
                          ? "1"
                          : "0.85"
                        : t.lineHeight,
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
            <div className="g12">
              {colors
                .filter((c) => !["White", "Black"].includes(c.name))
                .map((c) => (
                  <div
                    key={c.name}
                    className="rounded-xl p-6 col-span-12 sm:col-span-6 lg:col-span-4"
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
          <div className="g12">
            <a
              href="https://docs.google.com/document/d/1UxHglmxxWhBQggPvAas5ooGCgDCh_eAgWK-9GxtV1Bs/edit?tab=t.0#heading=h.e2b3mork447t"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 rounded-xl border transition-colors hover:border-[#293E14] col-span-12 sm:col-span-6"
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
              className="flex items-center justify-between p-6 rounded-xl border opacity-50 col-span-12 sm:col-span-6"
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

      <SiteFooter />
    </div>
  );
}

"""Generate Instagram carousel slides for the Gallery Art Opening social script.

Produces 1080x1350 PNGs in /home/user/dare-brand-kit/carousel.
"""

from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "carousel"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1350
PAD = 80

COLORS = {
    "white": "#F4F2F8",
    "black": "#201B1C",
    "celadon": "#9EEBBA",
    "peach": "#E7C0A2",
    "cornflower": "#9CAFED",
    "olive": "#8CA474",
    "pistachio": "#DDDC8F",
    "mauve": "#CDC2E3",
}

FK = str(ROOT / "src/fonts/FKScreamer.woff2")
SANS_REG = "/tmp/fonts/InstrumentSans-Regular.ttf"
SANS_BOLD = "/tmp/fonts/InstrumentSans-Bold.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for w in words:
        trial = (current + " " + w).strip()
        bbox = draw.textbbox((0, 0), trial, font=f)
        if bbox[2] - bbox[0] <= max_w:
            current = trial
        else:
            if current:
                lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines


def fit_heading(
    draw: ImageDraw.ImageDraw,
    text: str,
    path: str,
    max_w: int,
    max_h: int,
    start: int = 130,
    min_size: int = 60,
) -> tuple[ImageFont.FreeTypeFont, list[str], int]:
    size = start
    while size >= min_size:
        f = font(path, size)
        lines = wrap(draw, text, f, max_w)
        # measure
        ascent, descent = f.getmetrics()
        line_h = int((ascent + descent) * 1.0)
        total_h = line_h * len(lines)
        widest = max((draw.textbbox((0, 0), ln, font=f)[2] for ln in lines), default=0)
        if total_h <= max_h and widest <= max_w:
            return f, lines, line_h
        size -= 4
    f = font(path, min_size)
    lines = wrap(draw, text, f, max_w)
    ascent, descent = f.getmetrics()
    line_h = int((ascent + descent) * 1.0)
    return f, lines, line_h


def heavy_fk(size: int) -> ImageFont.FreeTypeFont:
    f = font(FK, size)
    try:
        f.set_variation_by_name("Black")
    except Exception:
        try:
            f.set_variation_by_axes([900])
        except Exception:
            pass
    return f


def fit_heading_heavy(
    draw: ImageDraw.ImageDraw,
    text: str,
    max_w: int,
    max_h: int,
    start: int = 170,
    min_size: int = 70,
) -> tuple[ImageFont.FreeTypeFont, list[str], int]:
    size = start
    while size >= min_size:
        f = heavy_fk(size)
        lines = wrap(draw, text, f, max_w)
        ascent, descent = f.getmetrics()
        line_h = int((ascent + descent) * 1.0)
        total_h = line_h * len(lines)
        widest = max((draw.textbbox((0, 0), ln, font=f)[2] for ln in lines), default=0)
        if total_h <= max_h and widest <= max_w:
            return f, lines, line_h
        size -= 4
    f = heavy_fk(min_size)
    lines = wrap(draw, text, f, max_w)
    ascent, descent = f.getmetrics()
    line_h = int((ascent + descent) * 1.0)
    return f, lines, line_h


def draw_slide(
    index: int,
    total: int,
    heading: str,
    bullets: list[str],
    bg: str,
    fg: str,
) -> Image.Image:
    img = Image.new("RGB", (W, H), bg)
    d = ImageDraw.Draw(img)

    # Top label row
    label_font = font(SANS_BOLD, 24)
    label = "DARE  •  GALLERY OPENING — SOCIAL SCRIPT"
    d.text((PAD, PAD), label, font=label_font, fill=fg)

    # slide counter (right)
    counter = f"{index:02d} / {total:02d}"
    bbox = d.textbbox((0, 0), counter, font=label_font)
    d.text((W - PAD - (bbox[2] - bbox[0]), PAD), counter, font=label_font, fill=fg)

    # Divider line
    line_y = PAD + 54
    d.line([(PAD, line_y), (W - PAD, line_y)], fill=fg, width=2)

    # Heading
    heading_top = line_y + 80
    max_h_heading = 440
    hf, hlines, line_h = fit_heading_heavy(
        d, heading.upper(), max_w=W - PAD * 2, max_h=max_h_heading
    )
    y = heading_top
    for ln in hlines:
        d.text((PAD, y), ln, font=hf, fill=fg)
        y += int(line_h * 0.95)

    # Bullets
    body_font = font(SANS_REG, 40)
    bullet_x = PAD
    text_x = PAD + 44
    max_text_w = W - PAD - text_x
    y += 60
    for b in bullets:
        lines = wrap(d, b, body_font, max_text_w)
        dot_r = 8
        first_line_y = y + 18
        d.ellipse(
            [bullet_x, first_line_y, bullet_x + dot_r * 2, first_line_y + dot_r * 2],
            fill=fg,
        )
        for ln in lines:
            d.text((text_x, y), ln, font=body_font, fill=fg)
            y += int(body_font.size * 1.25)
        y += 18

    # Footer / swipe hint
    footer_font = font(SANS_BOLD, 24)
    if index < total:
        footer_text = "SWIPE  →"
    else:
        footer_text = "END  •  THANK YOU"
    fb = d.textbbox((0, 0), footer_text, font=footer_font)
    d.text(
        (W - PAD - (fb[2] - fb[0]), H - PAD - (fb[3] - fb[1])),
        footer_text,
        font=footer_font,
        fill=fg,
    )

    return img


SLIDES = [
    {
        "heading": "Getting Ready",
        "bullets": [
            "I will go to a gallery opening.",
            "The event starts at 6pm but I can arrive later.",
            "The event is at 3 Tates Place in South Melbourne.",
            "This is an event where people come to see new artworks for the first time.",
            "I can wear clothes that make me feel comfortable.",
            "I can eat dinner before I arrive.",
        ],
        "bg": COLORS["cornflower"],
        "fg": COLORS["black"],
        "accent": COLORS["peach"],
        "shape": "circle",
    },
    {
        "heading": "Arriving at the Gallery",
        "bullets": [
            "When I arrive, I may see a sign or banner for the event.",
            "Maybe I will see someone I know and say hi. There might be an artist at the door to welcome people.",
            "This event will have many Deaf people. There will be Auslan interpreters there if I do not know how to sign.",
        ],
        "bg": COLORS["peach"],
        "fg": COLORS["black"],
        "accent": COLORS["olive"],
        "shape": "pill",
    },
    {
        "heading": "Inside the Gallery",
        "bullets": [
            "There will be artworks on the walls, hanging or in display cases.",
            "I can walk around and look at the art.",
            "I should not touch or pick up the artworks unless there is a sign saying it's okay.",
            "There will be around 100 people at this event.",
            "There is one toilet in the building.",
            "I will stay downstairs.",
        ],
        "bg": COLORS["celadon"],
        "fg": COLORS["black"],
        "accent": COLORS["mauve"],
        "shape": "square",
    },
    {
        "heading": "People and Sounds",
        "bullets": [
            "There may be many people signing.",
            "If it feels too overwhelming, I can step outside or find a quiet space.",
            "The building has overhead lights. I can use sunglasses if I need.",
        ],
        "bg": COLORS["mauve"],
        "fg": COLORS["black"],
        "accent": COLORS["cornflower"],
        "shape": "triangle",
    },
    {
        "heading": "Food and Drinks",
        "bullets": [
            "There will not be much food. I can bring my own or leave and eat dinner.",
            "There might be some drinks.",
            "I can choose to have drinks or not.",
        ],
        "bg": COLORS["pistachio"],
        "fg": COLORS["black"],
        "accent": COLORS["peach"],
        "shape": "circle",
    },
    {
        "heading": "Speeches or Announcements",
        "bullets": [
            "The art group has 7 Deaf artists. They will give a short speech.",
            "People usually stop signing and watch during the speech.",
            "After the speech, people clap and hand wave.",
        ],
        "bg": COLORS["olive"],
        "fg": COLORS["white"],
        "accent": COLORS["pistachio"],
        "shape": "pill",
    },
    {
        "heading": "Talking to People",
        "bullets": [
            "I can say “hello” to people I know.",
            "I can talk about the art or just listen.",
            "It’s okay if I don’t want to talk much.",
        ],
        "bg": COLORS["white"],
        "fg": COLORS["black"],
        "accent": COLORS["cornflower"],
        "shape": "square",
    },
    {
        "heading": "Leaving the Gallery",
        "bullets": [
            "When I’m ready to go, I can say goodbye to people.",
            "I can leave through the same door I came in.",
            "I might take a program booklet home if I want to remember the event.",
            "I can join the group to go to a bar afterwards.",
        ],
        "bg": COLORS["black"],
        "fg": COLORS["white"],
        "accent": COLORS["celadon"],
        "shape": "circle",
    },
]


def main() -> None:
    # Carousel is 10 slides total:
    #   01 — Auslan still (designed by hand)
    #   02 — Auslan video (designed by hand)
    #   03..10 — English script slides generated below
    total = len(SLIDES) + 2
    for i, s in enumerate(SLIDES, start=3):
        img = draw_slide(
            index=i,
            total=total,
            heading=s["heading"],
            bullets=s["bullets"],
            bg=s["bg"],
            fg=s["fg"],
        )
        slug = s["heading"].lower().replace(" ", "-").replace("'", "")
        path = OUT / f"{i:02d}-{slug}.png"
        img.save(path, "PNG", optimize=True)
        print(f"wrote {path}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Pick an accent color from a logo, for the workItems `accentColor` field
in components/hero-section.tsx.

Usage:
    python3 scripts/extract-accent-color.py public/images/some-logo.webp

Requires Pillow: pip3 install pillow
"""

import sys
from collections import Counter
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Missing dependency. Run: pip3 install pillow")


def dominant_colors(path: str, n: int = 5) -> list[tuple[tuple[int, int, int], int]]:
    im = Image.open(path).convert("RGBA")
    im = im.resize((100, 100))
    counter: Counter[tuple[int, int, int]] = Counter()
    for r, g, b, a in im.getdata():
        if a < 200:
            continue
        # skip near-white / near-black / near-gray pixels — not useful as an accent
        if max(r, g, b) - min(r, g, b) < 20:
            continue
        counter[(r, g, b)] += 1
    return counter.most_common(n)


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(f"Usage: python3 {Path(__file__).name} <path-to-logo>")

    path = sys.argv[1]
    colors = dominant_colors(path)

    if not colors:
        sys.exit("No saturated colors found — logo may be monochrome or fully transparent.")

    print(f"Top colors in {path}:\n")
    for (r, g, b), count in colors:
        print(f"  #{r:02X}{g:02X}{b:02X}   rgb({r}, {g}, {b})   pixel count: {count}")


if __name__ == "__main__":
    main()

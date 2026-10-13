#!/usr/bin/env python3
"""Copy Zolfar's original WordPress media into src/content/media, web-ready.

Usage: python3 -I scripts/import-media.py <wp-export/media dir>

For each image listed in MAP it applies the EXIF orientation, strips all
metadata (some phone photos carry GPS), caps the long edge, and writes either
an optimised JPEG (photos) or PNG (graphics, transparency). next/image does
the per-device AVIF/WebP conversion at request time, so these are masters.
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "content" / "media"
MAX_EDGE = 2400

# slug -> [(wordpress media id, output name, format)]
MAP: dict[str, list[tuple[int, str, str]]] = {
    "next-door": [(621, "01-bar", "jpg"), (619, "02-counter", "jpg"), (620, "03-lounge", "jpg"), (622, "04-booth", "jpg")],
    "salam-vegan": [(870, "01-logo", "png"), (869, "02-business-card", "jpg"), (868, "03-card-and-catering", "jpg"), (867, "04-catering", "jpg")],
    "bubbles": [(624, "01-bubbles", "jpg")],
    "event-posters": [(627, "01-hidden-music-treasures", "png"), (628, "02-deejay-stan", "png"), (629, "03-kabul-nights", "png")],
    "political-impact-art": [(625, "01-flyer", "jpg"), (463, "02-collage", "jpg"), (465, "03-collage", "jpg"), (466, "04-collage", "jpg"), (467, "05-collage", "jpg"), (464, "06-collage", "jpg"), (462, "07-table", "jpg")],
    "you-dont-look-afghani": [(632, "01-coin", "jpg")],
    "business-logos": [(637, "01-rawline-card", "jpg"), (638, "02-workwear", "jpg"), (639, "03-entrance", "jpg")],
    "invisible-line": [(679, "01-board", "jpg"), (678, "02-board", "jpg")],
    "bread-work-freedom": [(697, "01-logo", "png"), (695, "02-backdrop", "jpg"), (696, "03-conference", "jpg")],
    "diaspora-dreams": [(705, "01-painting", "jpg")],
    "bamyan-valley": [(683, "01-board", "jpg"), (723, "02-board", "jpg"), (724, "03-board", "jpg"), (725, "04-board", "jpg")],
    "brand": [(283, "self-portrait", "webp"), (663, "logo", "png")],
}


def find_source(src: Path, media_id: int) -> Path:
    matches = sorted(src.glob(f"{media_id}__*"))
    if not matches:
        raise SystemExit(f"missing source for media id {media_id}")
    return matches[0]


def export(src_file: Path, dest: Path, fmt: str) -> None:
    im = ImageOps.exif_transpose(Image.open(src_file))
    im.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    if fmt == "jpg":
        # Saving without exif/icc drops every metadata block, GPS included.
        im.convert("RGB").save(dest, "JPEG", quality=86, optimize=True, progressive=True)
    elif fmt == "webp":
        # transparent artwork: WebP keeps the alpha at a fraction of PNG's size
        im.convert("RGBA").save(dest, "WEBP", quality=90, method=6)
    else:
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA")
        im.save(dest, "PNG", optimize=True)


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    src = Path(sys.argv[1]).expanduser().resolve()
    for slug, items in MAP.items():
        for media_id, name, fmt in items:
            dest = OUT / slug / f"{name}.{fmt}"
            export(find_source(src, media_id), dest, fmt)
            with Image.open(dest) as check:
                assert not check.getexif(), f"metadata left in {dest}"
                print(f"{dest.relative_to(ROOT)}  {check.size[0]}x{check.size[1]}  {dest.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()

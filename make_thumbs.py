#!/usr/bin/env python3
"""
Design District Hyd - image optimiser.
Run from the repo root (the folder that contains "Season 1", "Season 2", "Season 3", "Main images"):

    pip install pillow
    python make_thumbs.py

Creates, next to your originals (originals are never touched):
    thumbs/<folder>/<same file name>   ~480px wide  -> gallery thumbnails
    web/<folder>/<same file name>      ~1600px wide -> hero slider + expanded viewer
Upload the new "thumbs" and "web" folders to GitHub. Re-run any time you add photos
(already-made files are skipped).
"""
import os, sys
from PIL import Image, ImageOps

FOLDERS = ["Season 1", "Season 2", "Season 3"]
SIZES = {"thumbs": (480, 68), "web": (1600, 78)}   # (max width, webp quality)

def make(src, dst, width, q):
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return False
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        im.save(dst, "WEBP", quality=q, method=6)
    return True

n = 0
for folder in FOLDERS:
    if not os.path.isdir(folder):
        continue
    for f in sorted(os.listdir(folder)):
        if not f.lower().endswith((".webp", ".jpg", ".jpeg", ".png")):
            continue
        for kind, (w, q) in SIZES.items():
            dst = os.path.join(kind, folder, os.path.splitext(f)[0] + ".webp")
            if make(os.path.join(folder, f), dst, w, q):
                n += 1
                print("made", dst)
# founder photo (very large original) -> web/founder.webp
if os.path.exists("Aishwarya-Agarwal-DDH-001x1.jpg"):
    if make("Aishwarya-Agarwal-DDH-001x1.jpg", "web/Aishwarya-Agarwal-DDH-001x1.webp", 1000, 80):
        n += 1; print("made web/Aishwarya-Agarwal-DDH-001x1.webp")
print("done,", n, "files created")

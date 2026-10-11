#!/usr/bin/env python3
"""Blur every detected face except Rishi Pai (founder / workshop host)."""

from pathlib import Path
import shutil

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / "site" / "assets" / "images"
BACKUP = IMG_DIR / "originals"
MODELS = Path(__file__).resolve().parent / "models"
YUNET = str(MODELS / "face_detection_yunet_2023mar.onnx")
SFACE = str(MODELS / "face_recognition_sface_2021dec.onnx")

TARGETS = [
    "img-4568.jpg",
    "img-4570.jpg",
    "img-4571.jpg",
    "india-workshop.jpeg",
    "workshop-2.jpg",
    "workshop-5.jpg",
    "workshop-6.jpg",
    "atlanta-1.jpg",
    "atlanta-2.jpg",
]

# Faces whose center falls in these normalized boxes are treated as Rishi.
KEEP_ZONES = {
    "atlanta-1.jpg": [(0.45, 0.435, 0.08, 0.045)],  # standing host only
}

# Extra manual boxes as fractions (x, y, w, h) for missed profiles.
MANUAL = {
    "workshop-5.jpg": [
        (0.68, 0.33, 0.04, 0.08),  # student in blue, back/side
        (0.83, 0.32, 0.04, 0.08),  # student in white on the right
        (0.57, 0.48, 0.05, 0.10),  # student in foreground, back of head
    ],
    "workshop-6.jpg": [
        (0.20, 0.58, 0.035, 0.07),  # second student from left
    ],
    "atlanta-1.jpg": [
        (0.15, 0.47, 0.04, 0.04),  # student facing camera
    ],
}


def detect(img, score=0.32):
    h, w = img.shape[:2]
    det = cv2.FaceDetectorYN.create(YUNET, "", (w, h), score, 0.3, 5000)
    det.setInputSize((w, h))
    _, faces = det.detect(img)
    return [] if faces is None else list(faces)


def feature(recognizer, img, face):
    aligned = recognizer.alignCrop(img, face)
    return recognizer.feature(aligned)


def reference_features(recognizer):
    refs = []
    # Solo / clear portraits of Rishi only — never crowd photos.
    for name in ("founder.png", "img-4580.jpg"):
        img = cv2.imread(str(IMG_DIR / name))
        faces = detect(img, 0.5)
        if not faces:
            continue
        faces = sorted(faces, key=lambda f: f[-1], reverse=True)
        refs.append(feature(recognizer, img, faces[0]))
    return refs


def best_match(recognizer, feat, refs):
    return max(recognizer.match(feat, ref, 0) for ref in refs)


def expand(box, w, h, pad=0.45):
    x, y, fw, fh = box
    x -= fw * pad
    y -= fh * pad
    fw *= 1 + pad * 2
    fh *= 1 + pad * 2
    x = max(0, int(x))
    y = max(0, int(y))
    fw = min(w - x, int(fw))
    fh = min(h - y, int(fh))
    return x, y, fw, fh


def blur_region(img, x, y, fw, fh):
    roi = img[y : y + fh, x : x + fw]
    if roi.size == 0:
        return
    k = max(21, (max(fw, fh) // 2) | 1)
    k = k if k % 2 else k + 1
    blurred = cv2.GaussianBlur(roi, (k, k), 0)
    blurred = cv2.GaussianBlur(blurred, (k, k), 0)
    yy, xx = np.ogrid[:fh, :fw]
    mask = ((xx - fw / 2) / max(fw / 2, 1)) ** 2 + ((yy - fh / 2) / max(fh / 2, 1)) ** 2
    alpha = np.clip(1.2 - mask, 0, 1)[:, :, None]
    img[y : y + fh, x : x + fw] = (blurred * alpha + roi * (1 - alpha)).astype(np.uint8)


def process(name, recognizer, refs):
    src = IMG_DIR / name
    original = BACKUP / name
    img = cv2.imread(str(original if original.exists() else src))
    h, w = img.shape[:2]
    keep = []
    blur = []
    for face in detect(img):
        x, y, fw, fh = [float(v) for v in face[:4]]
        cosine = best_match(recognizer, feature(recognizer, img, face), refs)
        item = (x, y, fw, fh, cosine)
        cx, cy = (x + fw / 2) / w, (y + fh / 2) / h
        in_zone = any(
            zx <= cx <= zx + zw and zy <= cy <= zy + zh
            for zx, zy, zw, zh in KEEP_ZONES.get(name, [])
        )
        if cosine >= 0.36 or in_zone:
            keep.append(item)
        else:
            blur.append(item)

    recognized = [item for item in keep if item[4] >= 0.36]
    zoned = [item for item in keep if item[4] < 0.36]
    if recognized:
        recognized.sort(key=lambda item: item[4], reverse=True)
        blur.extend(recognized[1:])
        keep = [recognized[0], *zoned]
    else:
        keep = zoned

    for x, y, fw, fh in [
        (mx * w, my * h, mw * w, mh * h) for mx, my, mw, mh in MANUAL.get(name, [])
    ]:
        blur.append((x, y, fw, fh, 0))

    for x, y, fw, fh, _ in blur:
        bx, by, bw, bh = expand((x, y, fw, fh), w, h)
        blur_region(img, bx, by, bw, bh)

    cv2.imwrite(str(src), img, [int(cv2.IMWRITE_JPEG_QUALITY), 86])
    print(f"{name}: kept {len(keep)} blurred {len(blur)}")
    for item in keep:
        print(f"  keep cosine={item[4]:.3f} at ({item[0]:.0f},{item[1]:.0f})")


def main():
    BACKUP.mkdir(exist_ok=True)
    recognizer = cv2.FaceRecognizerSF.create(SFACE, "")
    refs = reference_features(recognizer)
    for name in TARGETS:
        backup = BACKUP / name
        if not backup.exists():
            shutil.copy2(IMG_DIR / name, backup)
        process(name, recognizer, refs)


if __name__ == "__main__":
    main()

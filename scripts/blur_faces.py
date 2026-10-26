#!/usr/bin/env python3
"""Blur every student head except Rishi Pai (founder / workshop host)."""

from pathlib import Path
import shutil

import cv2
import numpy as np
from ultralytics import YOLO

ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / "site" / "assets" / "images"
BACKUP = IMG_DIR / "originals"
MODELS = Path(__file__).resolve().parent / "models"
YUNET = str(MODELS / "face_detection_yunet_2023mar.onnx")
SFACE = str(MODELS / "face_recognition_sface_2021dec.onnx")
YOLO_WEIGHTS = str(MODELS / "yolov8n.pt")

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
    "math-2026-1.jpeg",
    "math-2026-2.jpeg",
    "math-2026-3.jpeg",
]

# Normalized (x, y, w, h) regions that contain Rishi's head. Never blur these.
KEEP_ZONES = {
    "img-4568.jpg": [(0.12, 0.28, 0.16, 0.28)],
    "img-4570.jpg": [(0.24, 0.38, 0.10, 0.16)],
    "img-4571.jpg": [(0.33, 0.42, 0.07, 0.12)],
    "india-workshop.jpeg": [(0.46, 0.06, 0.16, 0.55)],
    "workshop-5.jpg": [(0.40, 0.18, 0.12, 0.18)],
    "workshop-6.jpg": [(0.58, 0.38, 0.12, 0.22)],
    "atlanta-1.jpg": [(0.45, 0.400, 0.08, 0.075)],
    "atlanta-2.jpg": [(0.40, 0.40, 0.10, 0.16)],
    "math-2026-1.jpeg": [(0.48, 0.00, 0.20, 0.30)],
    "math-2026-2.jpeg": [(0.32, 0.08, 0.36, 0.42)],
    "math-2026-3.jpeg": [(0.54, 0.00, 0.18, 0.22)],
}

IGNORE_ZONES = {
    "india-workshop.jpeg": [(0.00, 0.00, 0.28, 0.48)],
}

# Extra head boxes as fractions when detectors miss a person.
MANUAL = {
    "img-4568.jpg": [
        (0.00, 0.58, 0.16, 0.28),
        (0.18, 0.70, 0.16, 0.24),
        (0.32, 0.52, 0.12, 0.22),
        (0.42, 0.58, 0.14, 0.22),
        (0.58, 0.62, 0.12, 0.20),
        (0.70, 0.58, 0.12, 0.22),
        (0.82, 0.62, 0.16, 0.28),
        (0.00, 0.78, 0.18, 0.22),
        (0.26, 0.78, 0.18, 0.22),
        (0.30, 0.84, 0.16, 0.16),
        (0.22, 0.86, 0.18, 0.14),
    ],
    "img-4570.jpg": [
        (0.00, 0.52, 0.08, 0.16),
        (0.08, 0.58, 0.10, 0.16),
        (0.10, 0.72, 0.20, 0.26),
        (0.06, 0.80, 0.24, 0.20),
        (0.18, 0.82, 0.20, 0.18),
        (0.12, 0.40, 0.08, 0.14),
        (0.22, 0.70, 0.16, 0.24),
        (0.18, 0.52, 0.10, 0.16),
        (0.32, 0.54, 0.08, 0.14),
        (0.42, 0.56, 0.08, 0.14),
        (0.52, 0.54, 0.08, 0.14),
        (0.62, 0.52, 0.08, 0.14),
        (0.70, 0.50, 0.08, 0.14),
        (0.78, 0.52, 0.10, 0.16),
        (0.88, 0.58, 0.12, 0.22),
        (0.08, 0.38, 0.08, 0.14),
    ],
    "img-4571.jpg": [
        (0.02, 0.58, 0.14, 0.22),
        (0.18, 0.62, 0.12, 0.18),
        (0.32, 0.58, 0.10, 0.16),
        (0.42, 0.54, 0.10, 0.16),
        (0.52, 0.54, 0.10, 0.16),
        (0.62, 0.50, 0.12, 0.20),
        (0.72, 0.48, 0.18, 0.28),
        (0.22, 0.48, 0.08, 0.12),
        (0.28, 0.42, 0.06, 0.10),
        (0.30, 0.45, 0.06, 0.10),
        (0.20, 0.70, 0.20, 0.30),
        (0.66, 0.68, 0.30, 0.32),
    ],
    "workshop-5.jpg": [
        (0.05, 0.30, 0.10, 0.16),
        (0.26, 0.30, 0.08, 0.14),
        (0.32, 0.28, 0.07, 0.12),
        (0.55, 0.44, 0.08, 0.16),
        (0.66, 0.28, 0.07, 0.12),
        (0.80, 0.26, 0.07, 0.14),
        (0.90, 0.24, 0.08, 0.14),
    ],
    "workshop-6.jpg": [
        (0.00, 0.52, 0.10, 0.16),
        (0.18, 0.50, 0.08, 0.14),
        (0.26, 0.50, 0.07, 0.12),
        (0.37, 0.52, 0.06, 0.12),
        (0.42, 0.50, 0.07, 0.14),
    ],
    "atlanta-1.jpg": [
        (0.14, 0.44, 0.09, 0.10),
        (0.28, 0.46, 0.06, 0.08),
        (0.46, 0.46, 0.08, 0.09),
        (0.58, 0.48, 0.08, 0.10),
        (0.00, 0.58, 0.07, 0.09),
    ],
    "atlanta-2.jpg": [
        (0.00, 0.58, 0.10, 0.14),
        (0.10, 0.56, 0.10, 0.16),
        (0.18, 0.52, 0.08, 0.12),
        (0.26, 0.52, 0.08, 0.12),
        (0.42, 0.56, 0.08, 0.12),
        (0.90, 0.54, 0.10, 0.14),
        (0.16, 0.68, 0.16, 0.22),
    ],
    "workshop-2.jpg": [
        (0.04, 0.38, 0.16, 0.28),
        (0.18, 0.40, 0.12, 0.18),
        (0.32, 0.48, 0.14, 0.20),
        (0.38, 0.52, 0.16, 0.24),
        (0.62, 0.50, 0.14, 0.18),
        (0.48, 0.38, 0.08, 0.12),
        (0.56, 0.38, 0.08, 0.14),
        (0.62, 0.42, 0.08, 0.12),
        (0.72, 0.32, 0.08, 0.16),
        (0.78, 0.36, 0.12, 0.18),
        (0.92, 0.42, 0.08, 0.16),
    ],
}


def clip_box(x, y, bw, bh, w, h):
    x = max(0, int(round(x)))
    y = max(0, int(round(y)))
    bw = max(1, min(w - x, int(round(bw))))
    bh = max(1, min(h - y, int(round(bh))))
    return x, y, bw, bh


def iou(a, b):
    ax, ay, aw, ah = a
    bx, by, bw, bh = b
    ix1, iy1 = max(ax, bx), max(ay, by)
    ix2, iy2 = min(ax + aw, bx + bw), min(ay + ah, by + bh)
    inter = max(0, ix2 - ix1) * max(0, iy2 - iy1)
    union = aw * ah + bw * bh - inter
    return inter / union if union else 0


def center_in_zone(cx, cy, zones, w, h):
    nx, ny = cx / w, cy / h
    return any(zx <= nx <= zx + zw and zy <= ny <= zy + zh for zx, zy, zw, zh in zones)


def detect_yunet(img, score=0.25):
    h, w = img.shape[:2]
    det = cv2.FaceDetectorYN.create(YUNET, "", (w, h), score, 0.3, 5000)
    det.setInputSize((w, h))
    _, faces = det.detect(img)
    return [] if faces is None else list(faces)


def cap_head(x, y, bw, bh, w, h):
    max_w = int(0.17 * w)
    max_h = int(0.22 * h)
    if bw > max_w or bh > max_h:
        cx, cy = x + bw / 2, y + bh / 2
        bw = min(bw, max_w)
        bh = min(bh, max_h)
        x, y = cx - bw / 2, cy - bh / 2
    return clip_box(x, y, bw, bh, w, h)


def face_to_head(x, y, fw, fh, w, h):
    hx = x - fw * 0.40
    hy = y - fh * 0.80
    hw = fw * 1.85
    hh = fh * 2.20
    return cap_head(hx, hy, hw, hh, w, h)


def person_to_head(px, py, pw, ph, w, h):
    if pw * ph > 0.28 * w * h:
        return None
    aspect = ph / max(pw, 1)
    if aspect > 2.0:
        hh, hw = ph * 0.18, min(pw * 1.05, ph * 0.22)
    else:
        hh, hw = ph * 0.34, pw * 0.72
    hx = px + pw / 2 - hw / 2
    hy = py - hh * 0.05
    return cap_head(hx, hy, hw, hh, w, h)


def detect_person_heads(yolo, img):
    h, w = img.shape[:2]
    result = yolo.predict(img, classes=[0], conf=0.22, verbose=False)[0]
    heads = []
    if result.boxes is None:
        return heads
    for box in result.boxes.xyxy.cpu().numpy():
        x1, y1, x2, y2 = box[:4]
        head = person_to_head(x1, y1, x2 - x1, y2 - y1, w, h)
        if head:
            heads.append(head)
    return heads


def feature(recognizer, img, face):
    aligned = recognizer.alignCrop(img, face)
    return recognizer.feature(aligned)


def reference_features(recognizer):
    refs = []
    for name in ("founder.png", "img-4580.jpg"):
        img = cv2.imread(str(IMG_DIR / name))
        faces = detect_yunet(img, 0.5)
        if not faces:
            continue
        faces = sorted(faces, key=lambda f: f[-1], reverse=True)
        refs.append(feature(recognizer, img, faces[0]))
    return refs


def best_match(recognizer, feat, refs):
    return max(recognizer.match(feat, ref, 0) for ref in refs)


def similar_area(a, b):
    aa, ba = max(a[2] * a[3], 1), max(b[2] * b[3], 1)
    ratio = aa / ba
    return 0.55 <= ratio <= 1.8


def merge_boxes(boxes, thresh=0.45):
    boxes = [tuple(map(int, b[:4])) for b in boxes]
    changed = True
    while changed:
        changed = False
        merged = []
        used = [False] * len(boxes)
        for i, a in enumerate(boxes):
            if used[i]:
                continue
            ax, ay, aw, ah = a
            for j, b in enumerate(boxes):
                if i == j or used[j]:
                    continue
                if iou(a, b) >= thresh and similar_area(a, b):
                    bx, by, bw, bh = b
                    x1, y1 = min(ax, bx), min(ay, by)
                    x2, y2 = max(ax + aw, bx + bw), max(ay + ah, by + bh)
                    ax, ay, aw, ah = x1, y1, x2 - x1, y2 - y1
                    a = (ax, ay, aw, ah)
                    used[j] = True
                    changed = True
            used[i] = True
            merged.append(a)
        boxes = merged
    return boxes


def keep_mask(shape, boxes):
    mask = np.zeros(shape[:2], np.uint8)
    for x, y, bw, bh in boxes:
        cv2.rectangle(mask, (x, y), (x + bw, y + bh), 255, -1)
    return mask


def blur_head(img, x, y, bw, bh, protect=None):
    roi = img[y : y + bh, x : x + bw]
    if roi.size == 0:
        return
    scale = max(6, min(bw, bh) // 8)
    tiny = cv2.resize(roi, (max(2, bw // scale), max(2, bh // scale)), interpolation=cv2.INTER_LINEAR)
    pix = cv2.resize(tiny, (bw, bh), interpolation=cv2.INTER_NEAREST)
    k = max(31, (max(bw, bh) // 2) | 1)
    pix = cv2.GaussianBlur(pix, (k, k), 0)
    pix = cv2.GaussianBlur(pix, (k, k), 0)
    mask = np.zeros((bh, bw), np.float32)
    cv2.ellipse(mask, (bw // 2, bh // 2), (max(1, bw // 2 - 1), max(1, bh // 2 - 1)), 0, 0, 360, 1, -1)
    feather = max(9, (min(bw, bh) // 8) | 1)
    mask = cv2.GaussianBlur(mask, (feather, feather), 0)
    mask = np.clip(mask * 1.8, 0, 1)
    if protect is not None:
        mask = mask * (protect[y : y + bh, x : x + bw] == 0)
    mask = mask[:, :, None]
    img[y : y + bh, x : x + bw] = (pix * mask + roi * (1 - mask)).astype(np.uint8)


def process(name, recognizer, refs, yolo):
    src = IMG_DIR / name
    original = BACKUP / name
    img = cv2.imread(str(original if original.exists() else src))
    h, w = img.shape[:2]
    zones = KEEP_ZONES.get(name, [])

    keep = []
    yunet_faces = detect_yunet(img, 0.22) + detect_yunet(img, 0.35)
    seen = []
    for face in yunet_faces:
        x, y, fw, fh = [float(v) for v in face[:4]]
        key = (round(x / 8), round(y / 8))
        if key in seen:
            continue
        seen.append(key)
        cosine = best_match(recognizer, feature(recognizer, img, face), refs)
        hx, hy, hw, hh = face_to_head(x, y, fw, fh, w, h)
        if cosine >= 0.40:
            keep.append((hx, hy, hw, hh, cosine))

    keep.sort(key=lambda item: item[4], reverse=True)
    if keep:
        keep = [keep[0]]

    protect_boxes = [item[:4] for item in keep]
    for zx, zy, zw, zh in zones:
        protect_boxes.append(clip_box(zx * w, zy * h, zw * w, zh * h, w, h))
    protect = keep_mask(img.shape, protect_boxes)

    heads = []
    for face in yunet_faces:
        x, y, fw, fh = [float(v) for v in face[:4]]
        heads.append(face_to_head(x, y, fw, fh, w, h))
    heads.extend(detect_person_heads(yolo, img))
    for mx, my, mw, mh in MANUAL.get(name, []):
        heads.append(clip_box(mx * w, my * h, mw * w, mh * h, w, h))

    ignore = IGNORE_ZONES.get(name, [])
    blur = []
    for box in merge_boxes(heads):
        cx, cy = box[0] + box[2] / 2, box[1] + box[3] / 2
        if center_in_zone(cx, cy, ignore, w, h):
            continue
        blur.append(box)
    for box in blur:
        blur_head(img, *box, protect=protect)

    original_img = cv2.imread(str(original if original.exists() else src))
    img[protect > 0] = original_img[protect > 0]

    ext = src.suffix.lower()
    if ext in {".jpg", ".jpeg"}:
        cv2.imwrite(str(src), img, [int(cv2.IMWRITE_JPEG_QUALITY), 90])
    else:
        cv2.imwrite(str(src), img)
    print(f"{name}: kept {len(keep)} blurred {len(blur)}")
    for item in keep:
        print(f"  keep cosine={item[4]:.3f} at ({item[0]},{item[1]})")


def main():
    BACKUP.mkdir(exist_ok=True)
    recognizer = cv2.FaceRecognizerSF.create(SFACE, "")
    refs = reference_features(recognizer)
    weights = YOLO_WEIGHTS if Path(YOLO_WEIGHTS).exists() else "yolov8n.pt"
    yolo = YOLO(weights)
    for name in TARGETS:
        backup = BACKUP / name
        if not backup.exists():
            shutil.copy2(IMG_DIR / name, backup)
        process(name, recognizer, refs, yolo)


if __name__ == "__main__":
    main()

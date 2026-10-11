const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const WEB_DIST = path.join(__dirname, "..", "site", "dist");

app.use(cors());
app.use(express.json({ limit: "32kb" }));

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, "[]");
  }
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, organization: "Future Innovators" });
});

app.post("/api/contact", (req, res) => {
  const firstName = String(req.body?.firstName || "").trim();
  const lastName = String(req.body?.lastName || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Please fill out every field." });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (message.length > 4000) {
    return res.status(400).json({ error: "Message is too long." });
  }

  ensureDataFile();
  const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
  const entry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    firstName,
    lastName,
    email,
    message,
    receivedAt: new Date().toISOString(),
  };
  existing.push(entry);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2));

  res.status(201).json({
    ok: true,
    notice: "Thanks for submitting! We will get back to you soon.",
  });
});

if (fs.existsSync(WEB_DIST)) {
  app.use(express.static(WEB_DIST));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(WEB_DIST, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Future Innovators server running on http://localhost:${PORT}`);
});

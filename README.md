<div align="center">

# 🧾 My Couch-Potato Dopamine Receipt

### *The personality audit you didn't ask for but absolutely needed.*

![Version](https://img.shields.io/badge/version-0.0.1-c9a96e?style=flat-square&labelColor=1a1a1a)
![Built With](https://img.shields.io/badge/built%20with-React%20%2B%20Vite-61dafb?style=flat-square&labelColor=1a1a1a)
![License](https://img.shields.io/badge/license-MIT-f4ecd8?style=flat-square&labelColor=1a1a1a)
![Brain-Rot](https://img.shields.io/badge/brain--rot%20certified-99%25-ff6b6b?style=flat-square&labelColor=1a1a1a)

---

**[✦ Try the Live Demo ✦](#)** &nbsp;|&nbsp; **[Report a Bug](#)** &nbsp;|&nbsp; **[Request a Feature](#)**

</div>

---

## 📜 What Is This?

> *Imagine your therapist, a receipt printer, and a TikTok algorithm had a baby. Then that baby never slept and doom-scrolled until 3AM. That baby is this app.*

**My Couch-Potato Dopamine Receipt** is a satirical, highly aesthetic, Gen-Z personality quiz web app that itemizes your most chaotic digital habits into a thermal paper receipt — complete with a fake barcode, a *Therapy Discount* row, and a final **Personality Type** verdict like `THE SLEEP-DEPRIVED ECHO-CHAMBER JESTER`.

Answer **12 brutally honest multiple-choice questions** about your screen time, ghosting tendencies, impulse purchases, and sleep deprivation. In return, you get a **shareable, pixel-art-adorned audit report** that belongs on your Instagram Stories immediately.

No login. No data collected. 100% vibes.

---

## ✨ Key Features

### 🎭 3-Screen Flow
| Screen | Description |
|---|---|
| **Splash** | Y2K-aesthetic landing page with a `Generate My Receipt` CTA |
| **Quiz** | 12 witty questions, one at a time, with a smooth progress bar and fade transitions |
| **Result** | The full dopamine receipt — your complete personality audit |

### 🧾 The Receipt — A Visual Masterpiece
- **Thermal paper aesthetic** with a zig-zag dashed top/bottom border and a parchment texture background
- **Custom pixel-art header** featuring a cracked ⏳ hourglass, a broken 🖥️ monitor, and a 💾 floppy disk
- **Top Identity Card**: Your `PERSONALITY TYPE` (e.g. `THE SOFT GREMLIN`) is the first thing you see — bold, dark, unmissable
- **12 itemized line items** with emoji icons, quantity, and a score/price column (e.g. `💤 Depraved Sleep-Sched. | 0 hrs | 98% CRIT`)
- **Therapy Gauge**: A dynamic text bar chart — `THERAPY NEEDED: [■■■■■■■■■□] 90%`
- **Audit Score** in points + a contextual `THERAPY DISCOUNT` that reads `-$0.00 (REASON: HOPELESS)` if you're truly far gone
- **Dynamic WARNING footer** based on your score tier (e.g. `※ WARNING: DO NOT DROP THIS USER IN REAL LIFE.`)
- **Fake barcode** with randomized bar widths + a `BRAIN-ROT-MART :: 2025` footer label
- **Monospaced font** throughout the receipt for maximum thermal-printer authenticity

### 📊 Audit Dashboard (Right Panel)
- **Serotonin Sink-hole**: A 3D pixel-art bar chart with labels like `MAXED OUT` for extreme scores
- **Apocalypse Readyness Gauge**: A large circular SVG gauge showing your certified end-of-world readiness %
- **Complete Audit Grid**: A 4×3 grid of 12 unique pixel-art icons (phone, ghost, wallet, skull...) each with a `✓ PASS` or `✕ FAIL` badge

### 📤 Share-Ready
- **Save as Image** — captures the full composition via `html2canvas` at 2x resolution
- **Copy Link to Share** — one-click clipboard copy
- Share call-to-action includes: *`(ADDITIONAL 5% FOR TIKTOK SHARE)`*

---

## 🔬 The 12 Quiz Categories

| # | Category | Example Question |
|---|---|---|
| 1 | 📱 Screen Time | How many hours of screen time do you average per day? |
| 2 | 💬 Text Reply Style | How do you handle unread texts? |
| 3 | 🛍️ Impulse Buying | Describe your last impulsive purchase. |
| 4 | 🛋️ Weekend Vibe | Pick your typical Saturday vibe. |
| 5 | 🎬 Content Consumption | How do you consume content? |
| 6 | 👾 Nostalgia Binge | How deep does your nostalgia binge go? |
| 7 | 🕳️ Doom-Scrolling | How often do you doom-scroll without meaning to? |
| 8 | 🔔 Notification Hoarding | Your unread notification count right now is... |
| 9 | 🛒 Spontaneous Cart Add-ons | Spontaneous cart add-ons: your style is... |
| 10 | 🎵 Lo-Fi Loop Consumption | What's your relationship with lo-fi music loops? |
| 11 | 💤 Depraved Sleep-Scheduling | Describe your sleep schedule. |
| 12 | 🧾 Self-Awareness Check | How do you feel reading this quiz right now? |

---

## 🧬 Personality Types

Your final type is determined by your cumulative audit score:

| Score Range | Personality Type | Status |
|---|---|---|
| ≤ 18 | 🌱 **THE BALANCED BEAN** | NET POSITIVE |
| 19–28 | 👾 **THE SOFT GREMLIN** | CHAOTIC NEUTRAL |
| 29–36 | 🛋️ **THE COUCH CRYPTID** | CHRONICALLY ONLINE |
| 37–48 | 💀 **THE SLEEP-DEPRIVED ECHO-CHAMBER JESTER** | MAXIMUM ROTTING |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| ⚛️ **React 19** | UI framework & component architecture |
| ⚡ **Vite 6** | Lightning-fast dev server & bundler |
| 🎨 **Tailwind CSS v4** | Utility-first styling |
| 🔤 **TypeScript** | Type safety throughout |
| 🖼️ **html2canvas** | Receipt → PNG export |
| 🔗 **React Router DOM v6** | Client-side routing |
| ✨ **Lucide React** | Icon set |
| 📐 **Custom SVG** | All pixel-art icons & gauges (zero external chart libs) |

> **No database. No auth. No backend.** Pure client-side React — all state lives in `useState` hooks. Results are computed deterministically from quiz answers.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 18.x`
- npm `>= 9.x` (or pnpm / yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/dopamine-receipt.git
cd dopamine-receipt

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open your browser at **`http://localhost:5173`** and start your audit. 🧾

### Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Type-check + build for production
npm run build

# Preview the production build locally
npm run preview

# Lint the codebase
npm run lint
```

### Build Output

The production build outputs to the `dist/` folder. It's a fully static site — drop it on **Vercel**, **Netlify**, **GitHub Pages**, or any static host.

```bash
npm run build
# → dist/index.html + assets ready to deploy
```

---

## 📁 Project Structure

```
dopamine-receipt/
├── public/
│   └── ...                      # Static assets
├── src/
│   ├── components/
│   │   ├── AuditDashboard.tsx   # Right-panel: bar chart, gauge, audit grid
│   │   └── PixelHeaderArt.tsx  # Custom pixel-art SVG header (hourglass, monitor, floppy)
│   ├── lib/
│   │   ├── quiz.ts              # All 12 questions + result computation logic
│   │   └── receipt.ts           # Receipt date/time helpers
│   ├── pages/
│   │   ├── SplashScreen.tsx     # Landing page
│   │   ├── QuizScreen.tsx       # Question-by-question quiz flow
│   │   └── ResultScreen.tsx     # The full dopamine receipt + dashboard
│   ├── types/
│   │   └── index.ts             # Shared TypeScript types
│   ├── App.tsx                  # Root component + screen state machine
│   ├── main.tsx                 # Vite entry point
│   └── index.css                # Global styles, custom fonts, receipt CSS
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Design Philosophy

This app is designed around a **"Y2K thermal receipt"** aesthetic:

- **Parchment background** (`#f5f2eb`) with subtle noise texture overlay
- **Monochrome ink palette**: near-black (`#1a1a1a`) on warm off-white
- **Gold accent** (`#c9a96e`) for highlights, badges, and pixel-art fills
- **Zero rounded corners** on receipt elements — everything is sharp, like real printer output
- **Pixel fonts** (`Press Start 2P` / `VT323`) for titles; **Space Mono** for receipt data
- **Zig-zag CSS clip-path** on receipt top/bottom edges
- All chart visuals (bars, gauges, icon grid) are **pure SVG** — no external chart libraries

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/add-new-personality-type`
3. Commit your changes: `git commit -m 'feat: add THE CHRONICALLY OFFLINE type'`
4. Push to the branch: `git push origin feat/add-new-personality-type`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

**Built with ☕, existential dread, and too many open browser tabs.**

*No serotonin was harmed in the making of this application.*
*(We cannot say the same for the developer's sleep schedule.)*

---

`※ WARNING: DO NOT DROP THIS REPO IN REAL LIFE.`

**⭐ Star this repo if it called you out ⭐**

</div>

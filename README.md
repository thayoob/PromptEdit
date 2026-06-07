<div align="center">

<img src="public/icon.png" alt="PromptEdit Logo" width="96" height="96" />

# PromptEdit

### All AI Tools in One Place. No Subscriptions.

Access the best AI video, image, audio and voice tools in one powerful platform.  
Pay only for what you use.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-promptedit.com-38bdf8?style=for-the-badge&logo=vercel&logoColor=white)](https://promptedit.com)
[![GitHub](https://img.shields.io/badge/GitHub-thayoob%2FPromptEdit-6366f1?style=for-the-badge&logo=github&logoColor=white)](https://github.com/thayoob/PromptEdit)
[![License](https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge)](LICENSE)

</div>

---

## Overview

**PromptEdit** is a premium AI creator platform that aggregates the world's best AI models under a single dashboard. Instead of paying multiple monthly subscriptions, users buy credits and use any tool — AI video generation, image creation, audio production, voice synthesis — all from one place.

The frontend is a high-performance, dark-themed React SPA featuring:
- Cinematic preloader with brand animation
- Fully responsive layout (mobile-first)
- Interactive product mockup with live generation simulation
- Premium UI/UX with smooth Framer Motion animations

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Font** | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — Google Fonts |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Language** | JavaScript (ESM) |
| **Package Manager** | npm |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** `v18+` — [Download](https://nodejs.org/)
- **npm** `v9+` (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/thayoob/PromptEdit.git

# 2. Navigate into the project
cd PromptEdit

# 3. Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server (hot reload enabled)
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The build output is in the `dist/` folder — ready to deploy.

### Linting

```bash
npm run lint
```

---

## 📁 Project Structure

```
PromptEdit/
├── public/
│   ├── favicon.png          # Browser tab icon
│   ├── icon.png             # Apple touch icon / OG image
│   ├── Logo.png             # Header logo
│   ├── logos/               # AI tool brand SVGs (Kling, Suno, HeyGen…)
│   ├── robots.txt           # Search engine crawling rules
│   ├── sitemap.xml          # XML sitemap for SEO
│   └── .htaccess            # Apache server config (cPanel hosting)
│
├── src/
│   ├── App.jsx              # Root component + Preloader gate
│   ├── main.jsx             # React DOM entry point
│   ├── index.css            # Global styles + Tailwind + brand tokens
│   │
│   ├── components/
│   │   ├── Preloader.jsx    # Animated loading screen
│   │   └── home/
│   │       ├── Hero.jsx          # Hero section (headline + mockup)
│   │       ├── ToolExplorer.jsx  # AI tools browsing grid
│   │       ├── ProblemSolution.jsx
│   │       ├── Pricing.jsx       # Pricing plans
│   │       ├── Testimonials.jsx  # Social proof
│   │       ├── FAQ.jsx
│   │       ├── FooterCTA.jsx
│   │       └── hero/
│   │           ├── HeroContent.jsx   # Left-side copy + CTAs
│   │           ├── HeroMockup.jsx    # Right-side interactive dashboard
│   │           ├── HeroLogostrip.jsx # AI brand logo strip
│   │           └── HeroMetrics.jsx   # Stats bar
│   │
│   ├── layout/
│   │   ├── Layout.jsx            # Page shell + scroll-to-top button
│   │   ├── header/
│   │   │   └── Header.jsx        # Transparent → glass navigation header
│   │   └── footer/
│   │       └── Footer.jsx
│   │
│   └── pages/
│       └── home/
│           └── HomePage.jsx      # Assembles all home sections
│
├── index.html               # Entry HTML + full SEO / OG meta tags
├── vercel.json              # Vercel deployment config + security headers
├── vite.config.js           # Vite build configuration
├── package.json
└── README.md
```

---

## 🎨 Design System

The app uses CSS custom properties for a consistent brand token system:

| Token | Value | Usage |
|---|---|---|
| `--color-brand-bg` | `#09090f` | Page background |
| `--color-brand-primary` | `#6366f1` | Indigo — primary CTA |
| `--color-brand-accent` | `#38bdf8` | Cyan — highlights, glows |
| `--color-brand-surface` | `#12141f` | Card / panel backgrounds |
| `--color-brand-tint` | `#b8c0d4` | Body text |
| `--color-brand-border` | `#1e2235` | Borders / dividers |

---

## 🌐 Deployment

### Vercel (Recommended)

The project includes a pre-configured [`vercel.json`](vercel.json):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect the GitHub repo in the [Vercel Dashboard](https://vercel.com/new) for automatic deploys on every push.

### Apache / cPanel Hosting

Upload the contents of `dist/` to your `public_html` folder. The included `public/.htaccess` handles:
- HTTPS redirect
- SPA fallback routing
- Gzip compression
- Cache headers

---

## 🤖 Integrated AI Tools

PromptEdit is designed to aggregate the following AI models:

| Category | Tools |
|---|---|
| 🎬 **AI Video** | Kling AI, Veo 3, Runway, Luma |
| 🖼 **AI Image** | Ideogram, Stable Diffusion |
| 🎵 **AI Audio** | Suno, Udio |
| 🎙 **AI Voice** | ElevenLabs, Voicemod |
| 🧠 **AI Writing** | ChatGPT, Grok |
| 👤 **AI Avatar** | HeyGen |
| 🎞 **Plugins** | Premiere Pro, DaVinci Resolve, Photoshop, After Effects |

---

## 📄 License

MIT © [PromptEdit](https://promptedit.com)

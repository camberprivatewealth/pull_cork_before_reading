# Pull Cork Before Reading (PCBR)

**Pull Cork Before Reading** is a digital conversation game built by [Camber Private Wealth](https://www.camberco.ca/) to spark meaningful dialogue around money, values, and personal finance.

This browser-based experience is designed to be clean, fast, and intuitive — powered by modern web technologies and minimal UI. It can be accessed on desktop and mobile and deployed as a static site via Cloudflare Pages.

---

## Project Overview

- 📦 **Purpose**: Encourage deeper conversations about financial beliefs through thought-provoking cards and questions.
- 🧠 **Audience**: Built for Camber’s clients and advisors as a low-barrier, values-focused conversation starter.
- 🖥️ **Platform**: Web-based React application deployed via Cloudflare Pages (previously on Netlify).

---

## Tech Stack

| Tech              | Use                                  |
|------------------|---------------------------------------|
| **React**         | UI framework                         |
| **Vite**          | Build tool + dev server              |
| **Tailwind CSS**  | Styling with utility classes         |
| **shadcn/ui**     | Accessible, themeable UI components  |
| **Framer Motion** | Page transitions and animations      |
| **Lucide Icons**  | Icon set                             |
| **Canvas Confetti** | Visual feedback for success moments |
| **Cloudflare Pages** | Deployment target for live site    |

---

## Getting Started (For Developers)

To run this project locally:

### 1. Clone the repository

```bash
git clone https://github.com/taikovv/pull_cork_before_reading.git
cd pull_cork_before_reading
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

> The app will be live at: `http://localhost:5173`

---

## File Structure (Simplified)

```
.
├── public/                # Static assets
│   └── _redirects         # Routing fallback for Cloudflare
├── src/                   # Source code
│   ├── assets/            # Logos, icons, visuals
│   ├── components/        # UI components
│   ├── data/              # Card content
│   ├── lib/               # Helper functions
│   ├── App.tsx            # Main app layout
│   ├── index.tsx          # Entry point (renders the app)
│   └── tailwind.css       # Styling and theme config
├── tailwind.config.js     # Tailwind theme customization
├── vite.config.ts         # Vite build settings and aliases
├── tsconfig.*.json        # TypeScript setup
└── package.json           # Project metadata and scripts
```

---

## Deploying to Cloudflare Pages

This app is deployed as a static site using [Cloudflare Pages](https://pages.cloudflare.com/).

### Build settings:

| Setting            | Value             |
|--------------------|-------------------|
| Framework preset   | `None` or `Vite`  |
| Build command      | `npm run build`   |
| Output directory   | `dist`            |

### Required configuration:

- `vite.config.ts` must include:
  ```ts
  base: "/"
  ```
- The `tailwind.css` file must be imported at the top of `index.tsx`:
  ```ts
  import "./tailwind.css";
  ```
- A `_redirects` file must exist in `public/` to support React Router:
  ```
  /*    /index.html   200
  ```

Once changes are pushed to the `main` branch, Cloudflare will rebuild and deploy automatically.

---

## Handoff Notes (For Managers)

- **Status**: ✅ Production-ready and deployed  
- **Live URL**: [https://pcbr.camberco.ca](https://pcbr.camberco.ca)  
- **Code ownership**: [Camber Private Wealth](https://www.camberco.ca/)  
- **Primary contact**: Vladimir Taikov

### Key Considerations

- No user accounts, tracking, or API calls — this is a lightweight front-end app.
- The game is static: all card data is embedded in the app.
- No backend or CMS — content updates require a redeploy.
- Can be cloned and extended for additional product versions or themes.

---

## License

This project is proprietary and owned by Camber Private Wealth.  
Distribution, reuse, or adaptation requires written permission.

---
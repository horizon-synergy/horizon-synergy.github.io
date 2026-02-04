# Horizon Synergy Website Guide

This guide is a beginner-friendly walkthrough of how the Horizon Synergy website is structured, how to make common updates, and how to get comfortable working on it.

## 1) Quick summary of the site

The site is a single-page, static website built with plain HTML, CSS, and JavaScript. It is hosted on GitHub Pages and loads the main content from `index.html`, styles from `styles.css`, and behavior from `main.js`.

**Key characteristics**
- **Single page with sections**: The main navigation switches between page sections (hero, about, mission, products, contact) without loading a new page.
- **Static assets**: Images and icons live in the repo root and are referenced directly in HTML.
- **Light/dark mode**: A toggle adds/removes the `light-mode` CSS class on the `<body>`.

## 2) Project structure (what each file does)

```
index.html         # Main page content and layout
styles.css         # All styling
main.js            # Navigation/section switching + theme toggle
privacy-policy.html# Privacy policy page
images (.png/.jpeg)# Site imagery (logo, app icons, etc.)
robots.txt/sitemap.xml/ads.txt/app-ads.txt # SEO/ads setup
```

## 3) How the page works (plain-English explanation)

- **Navigation is “section switching.”** Each navigation link calls `showSection(...)` to hide all sections and show one section at a time. The default section on load is `hero`.
- **Theme toggle** adds `light-mode` to the `<body>`, which changes colors in CSS.
- **Mobile menu** shows/hides the sidebar when the logo button is tapped.

## 4) How to make common updates (step-by-step)

### A) Change text (headline, mission, etc.)
1. Open `index.html`.
2. Find the section you want to edit (search for the section ID like `id="about"`, `id="mission"`, or `id="products"`).
3. Replace the text inside the `<p>`, `<h1>`, `<h2>`, or `<h3>` tags.
4. Save the file.

### B) Update social links
1. Open `index.html`.
2. Find the `<div class="social-links">`.
3. Replace the `href="..."` URLs with the new links.

### C) Add or update a product card
1. Open `index.html`.
2. Find the section with `id="products"`.
3. Copy one of the existing `<div class="app-showcase">` blocks.
4. Paste and edit:
   - App name inside `<strong>`
   - Subtitle inside `<span class="app-subtitle">`
   - Description inside `<p>`
   - Google Play link inside `<a href="...">`
   - App image file name inside `<img src="...">`
5. Add your new image file to the repo root (or keep a `images/` folder if you choose to organize it).

### D) Change colors or layout
1. Open `styles.css`.
2. Adjust the color variables at the top:
   ```css
   :root {
     --primary-color: #00c2ff;
     --accent-color: #00ff84;
   }
   ```
3. Save and refresh your browser.

### E) Update the privacy policy
1. Open `privacy-policy.html`.
2. Edit the text as needed.

## 5) Running the site locally (beginner-friendly)

You do **not** need any build tools. You can preview the site directly in a browser.

### Option 1 — Open the file
- Double-click `index.html` to open it in your browser.

### Option 2 — Run a simple local server (recommended)
From the project folder, run:

```bash
python3 -m http.server 8000
```
Then open: `http://localhost:8000`

This avoids issues with some browser features that work better when a local server is used.

## 6) How to learn the codebase as a beginner

If you’re new, focus on one file at a time:

1. **Start with `index.html`**
   - It’s the content and structure.
   - Learn how sections and headings are laid out.

2. **Move to `styles.css`**
   - Look at the top variables to see colors.
   - Search for class names from HTML and see how they’re styled.

3. **Finally, read `main.js`**
   - It’s short and contains the logic for section switching, theme toggling, and mobile menu behavior.

**Tip:** When you change a class name in `index.html`, make sure you update the matching CSS in `styles.css`.

## 7) Tips for safe edits (non-technical friendly)

- **Make small changes and refresh the page** to see results quickly.
- **Keep a backup** by copying the file before big edits.
- **If something breaks**, check for missing closing tags like `</div>` or `</section>`.

## 8) Deployment (GitHub Pages)

This repo is meant for GitHub Pages. When changes are pushed to the default branch, GitHub Pages will publish updates automatically.

## 9) Branching rules (important)

To keep the main branch stable, **never edit the `main` branch directly**. Every update should happen on a separate branch that describes the change (for example: `update-hero-text`, `add-new-product`, or `fix-mobile-menu`).

**Workflow (beginner-friendly):**
1. Create a new branch with a clear name.
2. Make your changes on that branch.
3. Push the branch and ask Cedric to review/merge.

Cedric will decide whether to merge the changes or request edits.

## 10) Common issues

- **Nothing changed after edit**: Make sure the file is saved and you refreshed the browser.
- **Broken layout**: Check that HTML tags are properly opened/closed.
- **Images not showing**: Confirm the file name and extension match exactly.

---

If you want more guidance for specific edits (like new sections or a new design), you can add a note in this document for future reference.

# Rohan Londhe — Personal Resume Website

A fluid, modern one-page portfolio site built with plain HTML/CSS/JS — ready to publish on GitHub Pages.

## Files

```
resume-website/
  index.html          <- main site (single page, hash navigation)
  css/style.css        <- design system, layout, animations, dark/light mode
  js/main.js            <- navigation, theme toggle, scroll reveals, counters, PDF trigger
  js/resume-data.js     <- structured resume content (single source of truth)
  js/resume-pdf.js      <- generates the ATS-friendly downloadable PDF using jsPDF (CDN)
```

## How to publish on GitHub Pages

1. Create a new GitHub repository (public). If you want it at `username.github.io`, name the repo exactly that; otherwise any repo name works and the site will be at `username.github.io/repo-name`.
2. Copy all files in this folder (`index.html`, `css/`, `js/`) into the root of that repository.
3. Commit and push to the `main` branch.
4. In the repo, go to **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/root`, then save.
6. Your site will publish at the default GitHub Pages URL within a minute or two.
7. To use your GoDaddy custom domain, enter it under **Custom domain** in the same Pages settings, then add the required DNS records at GoDaddy (4 A records for the apex domain pointing to GitHub's IPs, and a CNAME for `www` pointing to `username.github.io`). Enable **Enforce HTTPS** once available.

## Editing content

All resume content lives in `js/resume-data.js`. Update this file to change:
- name, title, contact info
- summary
- skills list
- experience entries and bullet points
- education
- certifications

The visible page (index.html) is written separately for design/layout — if you add or remove experience entries, mirror the change in both `index.html` (for the visible timeline) and `js/resume-data.js` (for the downloadable PDF) so both stay in sync.

## Download Resume PDF button

Clicking "Resume PDF" in the header calls `generateResumePDF()` (js/resume-pdf.js), which builds a clean, single-column, plain-text PDF using jsPDF — no tables, columns, images, or graphics, which keeps it ATS-parser friendly. The PDF is generated entirely in the browser; no server or file upload is required.

## Customization

- Colors, fonts, and spacing are defined as CSS variables at the top of `css/style.css` — edit the `:root` and `[data-theme="dark"]` blocks to change the palette.
- Fonts are loaded from Fontshare (Cabinet Grotesk + General Sans) via CDN link tags in `index.html`.
- Dark/light mode toggle is in the header; it defaults to the visitor's system preference.

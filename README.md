# The Timeless Pictures — Multi-page Website (Static)

## ✅ What’s included
- Multi-page site: Home, About, Services, Portfolio, Contact
- Cinematic & luxury theme (dark + warm gold accents)
- WhatsApp floating lead button on every page
- Portfolio category filters + preview modal (placeholders)
- Contact form that opens WhatsApp with full enquiry text (static hosting friendly)

## 🔧 Setup (Local)
Just open `index.html` in your browser.

## 🟢 Add your WhatsApp number
Edit:
`assets/js/main.js`

Find:
`const WHATSAPP_NUMBER = "919097766286";`

Replace with:
`"919097766286"` (no +, no spaces)

Example:
`"919876543210"`

## 🖼️ Replace the placeholders with real photos
Currently tiles are stylized placeholders.
To use real images:
1) Put images in `assets/img/`
2) In `assets/css/styles.css`, replace `.tile::before` background with `background-image: url(...)` for each tile,
   OR (best) convert tiles to actual <img> tags.

If you want, send 10–20 best photos and I’ll wire a real gallery.

## 🚀 Deploy (easy)
- GitHub Pages: upload files to a repo → Settings → Pages → Deploy from branch
- Netlify: drag & drop the folder into Netlify
- Vercel: static deployment works too


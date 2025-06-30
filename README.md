# GSA Website

GSA Website adalah platform digital modern untuk Gemerlang Sejahtera Abadi (GSA) sebagai Digital Strategic Partner. Website ini dibangun dengan Next.js, TypeScript, Tailwind CSS, dan terintegrasi dengan Contentful CMS serta AI Chat berbasis Google Gemini. Website ini mendukung multi-bahasa (EN/ID), menampilkan layanan, blog, portofolio, dan kontak profesional.

## ✨ Fitur Utama
- **Landing Page Interaktif**: Hero, Partners, Services, CTA, dan Demo Blog.
- **Blog Dinamis**: Konten blog terintegrasi Contentful, kategori, filtering, dan halaman detail.
- **AI Chat Assistant**: Tanya jawab seputar GSA dengan AI (Google Gemini, RAG, knowledge base).
- **Layanan GSA**: Showcase layanan IT outsourcing, software, creative, AI, AR/VR, IoT, dsb.
- **Portofolio & Partners**: Logo, statistik, dan studi kasus klien global.
- **Multi-bahasa**: Bahasa Indonesia & Inggris (i18n, toggle di navbar).
- **Form Kontak**: Formulir konsultasi & info kontak lengkap.
- **Desain Modern**: Tailwind CSS, animasi framer-motion, responsif, dan aksesibel.

## 🚀 Teknologi
- **Next.js 15** (App Router, SSR, API routes)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animasi)
- **Contentful CMS** (blog & konten dinamis)
- **Google Gemini AI** (AI chat assistant)
- **i18next, react-i18next** (multi-bahasa)
- **@heroicons/react** (ikon)

## 📁 Struktur Folder
```
├── app/                # Routing utama Next.js (pages, api, layout, globals.css)
│   ├── about/          # Halaman profil perusahaan
│   ├── blog/           # Halaman blog & detail
│   ├── contact/        # Halaman kontak & form
│   ├── services/       # Halaman layanan
│   └── api/gemini-chat # API AI Chat
├── src/
│   ├── app/            # (duplikat legacy, bisa dihapus jika tidak dipakai)
│   └── components/     # Komponen UI utama (Hero, Navbar, Footer, Blog, Services, dsb)
├── lib/                # Integrasi Contentful, i18n, knowledge base
├── public/             # Asset gambar, logo, svg, dsb
├── BLOG_SETUP.md       # Panduan setup blog & Contentful
├── CONTENTFUL_IMPORT_GUIDE.md # Panduan import model Contentful
├── tailwind.config.js  # Konfigurasi Tailwind
├── next.config.ts      # Konfigurasi Next.js
├── package.json        # Dependensi & script
└── README.md           # Dokumentasi ini
```

## ⚡️ Setup & Instalasi
1. **Clone repo & install dependencies**
   ```bash
   git clone <repo-url>
   cd gsa-website
   npm install
   # atau yarn/pnpm/bun
   ```
2. **Setup environment**
   - Copy `.env.local` dan isi dengan kredensial Contentful & Google AI:
     ```env
     CONTENTFUL_SPACE_ID=your_space_id
     CONTENTFUL_ACCESS_TOKEN=your_access_token
     GOOGLE_AI_API_KEY=your_google_gemini_api_key
     ```
3. **Setup Contentful**
   - Ikuti `CONTENTFUL_IMPORT_GUIDE.md` atau `BLOG_SETUP.md` untuk import model & sample konten.
   - Pastikan content type `blogPost` sudah ada dan publish beberapa post.
4. **Jalankan development**
   ```bash
   npm run dev
   # buka http://localhost:3000
   ```

## 📝 Fitur Blog (Contentful)
- Blog otomatis menampilkan post dari Contentful.
- Filtering kategori, halaman detail, featured post.
- Rich text, gambar, SEO meta, author, tanggal, dsb.
- Panduan setup lengkap di `BLOG_SETUP.md` & `CONTENTFUL_IMPORT_GUIDE.md`.

## 🤖 AI Chat Assistant
- Tanya apapun tentang GSA di landing page (Hero section).
- Menggunakan Google Gemini API + knowledge base GSA (lihat `lib/gsaKnowledgeBase.ts`).
- Endpoint API: `/api/gemini-chat`.
- Mendukung Retrieval Augmented Generation (RAG) untuk jawaban kontekstual.

## 🌐 Multi-bahasa (i18n)
- Toggle EN/ID di navbar.
- Implementasi: `lib/i18n.ts`, `src/components/I18nProvider.tsx`.
- Komponen & halaman mendukung translasi langsung.

## 🛠️ Layanan GSA
- Halaman layanan: IT Outsourcing, Software, Creative, AI, AR/VR, IoT, dsb.
- Showcase tim, skills, portofolio, dan studi kasus.
- Lihat `/services` untuk detail.

## 📬 Kontak & Konsultasi
- Form kontak di `/contact`.
- Info alamat, email, telepon, dan Instagram di footer.
- Email: info@gsa.co.id
- Instagram: [@gsa.group.id](https://instagram.com/gsa.group.id)

## 🏗️ Build & Deployment
- Build: `npm run build`
- Start: `npm start`
- Lint: `npm run lint`
- Deploy di Vercel, Netlify, atau server Next.js standar.
- Pastikan environment variable di-setup di platform hosting.

## 👥 Kontributor
- Boedi Moelya M. Fikih (Project Director)
- M Syahrul Hidayat (Digital Marketing & Branding)
- Kevie Hendrix (Project Manager USA)
- Oliver King-Smith (AI Strategy & Innovation)

## 📄 Lisensi
Lisensi proprietary GSA. Untuk penggunaan bisnis, silakan kontak info@gsa.co.id.

---

> Website ini dibangun dengan ❤️ oleh tim GSA. Untuk konsultasi, kerjasama, atau pertanyaan teknis, silakan hubungi kami!

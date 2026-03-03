Deskripsi Singkat

- Ini adalah website edukasi/interaktif tentang pengelolaan sampah dan dampaknya terhadap laut, tanah, udara, dan lingkungan.
- Fokusnya storytelling visual: hero dengan ilustrasi bumi, section “Dampak…” yang bisa diklik/tab untuk ganti gambar dan penjelasan, ranking kontribusi, dan peta bank sampah.
Teknologi Utama

- React: framework UI berbasis komponen untuk membangun halaman secara modular.
- Vite: dev server cepat dan bundler untuk build produksi.
- Tailwind CSS: utilitas styling siap pakai untuk desain modern, responsif, dan dark/light mode berbasis class.
- Framer Motion: animasi halus untuk transisi konten, fade/slide dan interaksi tab.
- Leaflet: peta interaktif untuk menampilkan lokasi bank sampah.
- three.js (via @react-three/fiber & @react-three/drei): fondasi kanvas/3D yang sebelumnya dipakai untuk efek visual; sekarang hero menggunakan gambar, tetapi dependensi masih tersedia bila ingin efek 3D lagi.
Struktur Fitur ke File

- Tampilan utama: App.jsx
- Hero (ilustrasi bumi besar, mode light/dark): Hero3D.jsx
- Dampak (tab Laut/Tanah/Udara/Lingkungan, gambar dan teks dinamis): ImpactSection.jsx
- Ranking kontribusi: RankingSection.jsx
- Peta bank sampah: MapSection.jsx
- Entry HTML & CSS global: index.html , index.css
- Konfigurasi Tailwind (dark mode berbasis class): tailwind.config.mjs
Kenapa Teknologi Ini

- React: cepat dikembangkan, komponen bisa dipakai ulang, cocok untuk UI interaktif.
- Vite: live-reload sangat cepat, build ringan untuk produksi.
- Tailwind: desain konsisten, mudah atur warna/spacing/responsif tanpa menulis CSS panjang.
- Framer Motion: memberi pengalaman halus dan modern tanpa kompleksitas berat.
- Leaflet: solusi peta ringan, mudah dipakai untuk marker dan pop-up.
- three.js/@react-three/fiber: siap jika ingin kembali menambahkan visual 3D/kanvas interaktif.

- 🚀 Project Setup Guide

Panduan cepat untuk menjalankan project ini di local environment kamu.

📥 1. Clone Repository
git clone https://github.com/l1payy/re-cycle
cd folder repo

📦 2. Install Dependencies

npm install

Pastikan kamu sudah menginstall Node.js terlebih dahulu.

▶️ 3. Jalankan Development Server

npm run dev

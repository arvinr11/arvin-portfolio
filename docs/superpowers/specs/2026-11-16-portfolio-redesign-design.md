# Desain: Portofolio pribadi Arvin Roeslim (versi baru)

Tanggal: 2026-11-16
Status: menunggu persetujuan akhir Arvin. Positioning dan jawaban di bagian 14 sudah dari Arvin.

## 1. Maksud dan alasan

Arvin adalah mahasiswa tingkat akhir jurusan Mobile Application and Technology di BINUS. Saat ini ia sedang magang dan mulai mencari kerja. Situs ini adalah bagian pertama dari tiga hal yang ia siapkan, yaitu situs, CV, lalu LinkedIn. Ketiganya harus menceritakan hal yang sama.

Situs yang sekarang (`web-portfolio` + `web-portfolio-sanity`, di arvinroeslim.vercel.app) dibuat waktu Arvin masih belajar. Masalahnya:
- Semua data diambil di browser dari Sanity. Akibatnya HTML awal kosong, dan halaman pernah tampil "No projects found" saat dibuka.
- Tampilannya generik: background Aurora gradient, blur, efek glow, dan komponen copy-paste dari reactbits.
- Kontennya masih versi semester 5 (2025). Copy-nya pakai kata klise ("deep passion", "seamless"), dan project terbarunya belum ada.

Situs baru dibuat dari nol di repo baru. Situs lama disimpan sebagai arsip.

## 2. Pembaca dan tujuan

Ada dua pembaca:
1. **Orang umum** yang ingin tahu siapa Arvin dan melihat hasil kerjanya.
2. **Recruiter** yang hanya punya sekitar 30 detik. Mereka harus bisa langsung paham siapa Arvin, apa yang bisa ia kerjakan, dan ke mana menghubunginya.

**Aksi utama di seluruh situs:** Download CV. Aksi kedua: menghubungi lewat email atau LinkedIn.

## 3. Positioning (sudah disetujui Arvin)

- **Label utama: Mobile Developer.** Sesuai jurusannya dan sesuai project-nya yang paling banyak dan paling dalam.
- **Pembeda:** ia mengerjakan dari ujung ke ujung, yaitu app-nya, desainnya, sampai server tempat app itu berjalan.
- **Homelab ditulis sebagai fakta**, bukan sebagai jabatan "DevOps". Contoh: "I run my own homelab; my projects deploy to it through GitHub Actions and Docker."
- **Semua project tim punya baris "My part"** yang jujur. Pekerjaan anggota tim lain tidak diklaim. Penggunaan AI tidak perlu ditulis sebagai pengakuan khusus, tapi klaim peran juga tidak boleh dilebihkan.

## 4. Konten

### Project (urutan tampil)

| # | Project | Tahun | Jenis | My part | Stack | Link |
|---|---|---|---|---|---|---|
| 1 | **Money Manager (evo+)** | 2026, in progress | Skripsi, tim | Konsep produk, desain UI, maskot Evo, slicing Figma ke Flutter dan menata alur front end (UI → controller → service → API client), serta infrastruktur server (Docker, Cloudflare Tunnel, Nginx Proxy Manager, CI/CD self-hosted runner). Kontribusi anggota tim lain tidak ditulis di situs. | Flutter, Go (tim), Postgres, MinIO, Docker | "Coming soon": hanya mockup atau Figma, tanpa link live |
| 2 | Waste2Cash | 2025 | Tim | Mobile developer, membangun admin dashboard untuk pengepul | Kotlin | github.com/BrandonLi03/Waste2Cash |
| 3 | LaundryHub | 2025 | Tim | Memimpin desain di Figma, UI dan pengembangan fitur | Kotlin, Figma | github.com/BrandonLi03/LaundryHub |
| 4 | DoJo Movie | 2025 | Tim (tugas kampus) | Halaman Home, integrasi Maps API, data film ke SQLite | Kotlin, Maps API, SQLite | github.com/arvinr11/DoJo-Movie |
| 5 | Video Tape Store | 2024 | Tim (tugas kampus) | UI toko dan admin dashboard | Flutter, Node.js | github.com/Calvin-77/Video-Tape-Store |
| 6 | Christian Wijaya | 2025 | Individu (tugas kampus) | Desain dan pengembangan seluruh situs | HTML, CSS, JS, Figma | github.com/arvinr11/christian-wijaya |

Sumber teks project lama: Sanity (project `z7pmw5ai`, dataset `production`, bisa dibaca publik) dan PDF `ArvinRoeslim_Portfolio_Academy2026.pdf`. Semua teks ditulis ulang tanpa kata klise.

### Pengalaman kerja
**PT Gading Murni, cabang Jakarta.** Perusahaan perlengkapan kantor sejak 1948, berkantor pusat di Surabaya, dengan lini usaha alat tulis, peralatan kantor, office automation, dan office technology (sumber: gadingmurni.co.id). Arvin magang di sana sejak 2026 sampai sekarang.
- Ditempatkan di divisi mobile app. Mengerjakan website company profile dan website e-commerce.
- Sekarang di divisi Project. Di project pengadaan untuk klien institusi (nama klien tidak disebut), Arvin memegang bagian TV Samsung serta kulkas, freezer, dan mini bar: memilih produk yang sesuai kebutuhan, mencari principal atau distributor, lalu meminta dan membandingkan penawaran harga.
- IT support kantor: Wi-Fi, printer, printer sharing.

### Pendidikan
BINUS University, Mobile Application and Technology, 2023 sampai sekarang.

### Lain-lain
- **Sertifikat:** 2 gambar dari Sanity. Judul dan penerbitnya perlu diisi.
- **Tech stack:** logo asli (Flutter, Dart, Kotlin, Figma, Firebase, Node.js, HTML, CSS, JS, GitHub, ditambah Docker dan Go bila relevan).
- **Kontak:** email roeslimarvin@gmail.com, LinkedIn linkedin.com/in/arvinroeslim, GitHub github.com/arvinr11.
- **CV:** `ArvinRoeslim_CV_Academy2026.pdf` dari Sanity untuk sementara. Akan diganti setelah CV baru selesai.

## 5. Arah visual: "Blue Pop"

Terinspirasi dari template humantaste "Kite Camp" (Primary Shapes) dan "Pomelo" (Pop Orange), tapi **tidak menyalin**. Font, palet, dan objek fokusnya berbeda.

- **North star:** "Toko mainan yang rapi: warna flat berani, tapi recruiter tetap bisa membaca semuanya dalam 30 detik."
- **Font:** Archivo (lebar expanded, weight 800–900) untuk judul, Plus Jakarta Sans untuk teks dan UI. Tidak memakai Inter, Roboto, font sistem, atau monospace.
- **Palet:**
  - kobalt `#2350F5` untuk dasar hero
  - sky `#A9D4FF`
  - tangerine `#FF7A2F` untuk tombol utama
  - sun `#FFD447` untuk stiker dan badge
  - mint `#BFEFD8`
  - paper `#FFF8EC` untuk latar halaman
  - ink `#121433` untuk teks
  Rasio kontras setiap pasangan teks dan latar harus dicek, dengan target AA.
- **Bentuk:** blok warna flat; stiker bintang atau badge bulat yang dirotasi ±12° (maksimal 2 per layar); jendela berbentuk lengkung untuk screenshot; tepi section bergerigi hanya di antara dua warna yang berbeda; hard shadow `6px 6px 0` ink saat hover; tombol utama berbentuk pill dengan shadow `0 4px 0` yang turun saat ditekan.
- **Objek fokus:** screenshot asli app di dalam bingkai HP. Maskot Evo hanya muncul di dalam kartu Money Manager sebagai bukti desain karakter, tidak sebagai dekorasi lepas. Kode tidak boleh menggambar ilustrasi rumit.
- **Larangan:** gradient, glassmorphism, blur, glow, soft shadow, dark mode bertema emas, emoji sebagai ikon, testimoni palsu, angka yang tidak nyata, dan kata "passionate", "seamless", "crafting", "pixel-perfect", "elevate", "unlock".
- **Gerak:** hanya `transform`, `opacity`, dan `clip-path`. Reveal naik 24px selama sekitar 600ms dengan jeda 70ms antar elemen, stiker muncul dengan efek pop, tombol mengecil sedikit saat ditekan. Wajib ada fallback `prefers-reduced-motion`. Tidak ada animasi yang menghalangi teks terbaca saat halaman dimuat.
- **Copy:** bahasa Inggris, sudut pandang orang pertama, kalimat pendek, spesifik, pakai angka nyata.

### Susunan halaman utama
1. **Hero (kobalt):** nav (Work, About, Contact, tombol CV). Nama besar "ARVIN ROESLIM", "Mobile developer", satu kalimat jangkauan (app, desain, server), tombol tangerine "Download CV", bingkai HP berisi screenshot asli, dan stiker sun "Open to work".
2. **Strip "Now":** Intern di PT Gading Murni, Jakarta, final year di BINUS, terbuka untuk full-time.
3. **Selected work:** kartu project dengan warna berbeda tiap kartu (sky, mint, sun, dan seterusnya). Isinya screenshot dalam jendela lengkung, judul, tahun dan stack, serta "My part". Money Manager tampil paling besar.
4. **Experience:** GM (tiga bagian di atas) dan pendidikan.
5. ~~How I ship~~: dihapus atas permintaan Arvin, karena terasa seperti membuka dapur sendiri. Homelab cukup muncul sebagai baris "Homelab" di Skills, ditambah satu kalimat singkat.
6. **Skills:** chip seperti stiker berisi logo asli.
7. **Certificates:** kartu dengan sedikit rotasi. Klik untuk memperbesar.
8. **Contact (tangerine):** email, LinkedIn, GitHub, dan Download CV.

**Halaman detail project** (`/work/<slug>`): galeri screenshot, latar masalah, My part, stack, tim, dan link GitHub. Setiap halaman punya metadata dan OG image sendiri.

## 6. Teknologi

- **Astro** (versi terbaru yang stabil, sama dengan evo-website: Astro 7) dengan output statis.
- **Tailwind CSS 4** lewat `@tailwindcss/vite`.
- **Konten di repo:** Astro content collections. Project berupa Markdown/MDX dengan frontmatter bertipe, gambar di `src/assets` supaya dioptimasi oleh `astro:assets`. Tidak memakai CMS. Update konten dilakukan dengan mengedit file, dibantu Claude.
- **Font self-host** lewat `@fontsource`. Tidak memuat Google Fonts dari CDN.
- **JavaScript minimal:** hanya untuk reveal-on-scroll, lightbox sertifikat, dan nav mobile. GSAP hanya dipakai bila benar-benar diperlukan.

## 7. SEO dan keterbacaan AI

Diambil dari bagian claude-seo yang relevan:
- `@astrojs/sitemap`, `robots.txt`, dan URL canonical.
- JSON-LD `Person` di beranda (nama, jabatan, alumniOf BINUS, sameAs LinkedIn/GitHub) dan `CreativeWork` atau `SoftwareApplication` per project.
- Title, description, dan OG image per halaman.
- `llms.txt` berisi ringkasan dan link penting.
- Target Lighthouse di atas 95 untuk semua kategori.
- Setelah live, satu kali audit dengan claude-seo.

## 8. Deploy (mengikuti pola backend evo+, yang sudah teruji)

Situs lama di Vercel sudah tidak dipakai. Domain sekarang **arvinroeslim.my.id**. Alurnya mengikuti `money-manager-app-backend`:
- **Branch:** perubahan dikerjakan di `feature/*` atau `fix/*`, memakai Conventional Commits, lalu masuk lewat pull request.
- **Satu environment (prod).** Untuk situs statis milik satu orang, environment dev tidak sepadan dengan runner, port, subdomain, dan proxy host tambahan. Pratinjau dilakukan di lokal (`astro dev` atau `astro preview`, bisa dibuka di browser pane) sebelum rilis.
- **Rilis:** kerjakan di branch `feature/*` atau `fix/*`, merge ke `main`, lalu push tag `v*` (misalnya `v1.0.0`). Tag itu memicu `deploy.yml` di self-hosted runner: build image dengan tag versi, lalu `docker compose -p arvin-portfolio up -d` di port 8082, untuk `arvinroeslim.my.id`. Merge ke `main` saja belum menayangkan apa pun.
- **Image:** `Dockerfile` multi-stage, `node:24-alpine` untuk build lalu `nginx:1.29-alpine` untuk menyajikan `dist`. Pakai `nginx.conf` sendiri dengan cache untuk aset ber-hash dan halaman 404. Ada `LABEL app=arvin-portfolio`, dan image lama di-prune.
- **NPM:** satu proxy host, `arvinroeslim.my.id` ke port 8082. **Cloudflare Tunnel** memakai yang sudah ada.
- **Dikerjakan Arvin sendiri:** membuat repo GitHub `arvin-portfolio`, mendaftarkan runner (butuh token GitHub), mengatur NPM dan DNS di Cloudflare.

## 8a. Alur kerja (permintaan Arvin)

- **Figma dulu, baru kode.** Desain dibuat di Figma sebelum front end dibangun. Isinya:
  - variabel warna dan teks sesuai token di bagian 5
  - komponen: tombol, stiker, chip skill, bingkai HP, bingkai browser, kartu project
  - frame desktop (1440) dan mobile (390) untuk beranda dan satu halaman detail project
  Urutannya: hero dan satu kartu project dulu, disetujui Arvin, baru section lain. Kode mengikuti Figma yang sudah disetujui. Nama token dan komponen di kode sama dengan di Figma.
- **Git rapi dengan Conventional Commits, satu commit per bagian.** Contoh: `chore: scaffold astro project`, `feat(tokens): add color and type tokens`, `feat(hero): ...`, `feat(work): ...`, `feat(seo): ...`, `ci: add self-hosted deploy workflow`.

## 9. Pendekatan yang dipertimbangkan

| Pendekatan | Kelebihan | Kekurangan | Keputusan |
|---|---|---|---|
| **Astro statis + konten di repo** | HTML statis, JS nyaris nol, SEO kuat, sama dengan stack evo-website, peringkat 1 kepuasan di State of JS 2025 | Konten diubah lewat file, bukan dashboard | **Dipilih** |
| Next.js + Sanity (dirapikan, Studio di-embed) | Data lama tetap dipakai, bisa update dari HP | Berat untuk situs statis, tetap ada CMS yang harus dirawat | Ditolak: Arvin tidak mau CMS |
| HTML murni | Paling sederhana | Repot saat project bertambah, tidak ada optimasi gambar | Ditolak |

Hosting: self-host di homelab Arvin dengan pola CI/CD backend evo+. Alasannya, alurnya sudah ia kuasai dan homelab adalah bagian dari ceritanya.

## 9a. Revisi setelah review mockup (2026-11-17)

- **Strip Now** jadi tiga kolom berlabel (Work, Study, Looking for), dengan badge "Now".
- **Mobile skill** ditambah **Swift (iOS)**. Kalimat hero: "I build mobile apps with Flutter, Kotlin and Swift, and design them in Figma first."
- **Kartu evo+:** deskripsi app dulu, lalu "My part" yang hanya berisi bagian Arvin.
- **Footer** di tengah: "Made with ♥ by Arvin · © 2026". Hatinya berupa ikon SVG, bukan emoji.
- **Nav:** Work, Experience, Skills, Contact.
- **Kartu project kecil:** satu kalimat tentang app-nya, lalu "My part". Waste2Cash dan LaundryHub juga ditulis sebagai project kampus.
- **Experience GM** dibuat ringkas jadi tiga poin: website compro dan e-commerce, IT support kantor, dan divisi Project yang menangani pengadaan untuk klien institusi. Produk, merek, dan detail project tidak disebut.

## 10. Bukan tujuan

- Blog, dark mode, multi-bahasa, form kontak dengan backend, analytics berbayar.
- Memindahkan Sanity Studio atau dataset. Sanity hanya dibaca sekali untuk mengekspor teks, gambar, dan file.
- Menulis CV dan LinkedIn. Itu tugas berikutnya, tapi memakai positioning yang sama.

## 11. Kegagalan walaupun secara teknis "jalan"

- Recruiter tidak bisa menemukan CV atau kontak dalam 10 detik.
- Situs terlihat seperti template AI pada umumnya: gradient gelap, glow, kartu kaca, dan copy klise.
- Ada klaim yang melebihi peran Arvin yang sebenarnya.
- Ada teks yang sulit dibaca karena warna (kontras gagal).
- Situs mati dan tidak ada yang sadar. Butuh minimal satu cara untuk memantaunya.

## 12. Diserahkan ke builder

- Struktur folder Astro, nama komponen, dan detail Tailwind.
- Ukuran tipografi persisnya (pakai `clamp`) dan spacing.
- Bentuk persis stiker dan tepi bergerigi.
- Isi `nginx.conf` dan detail workflow, mengikuti evo-website.
- Cara menulis skrip ekspor dari Sanity.

## 13. Keputusan Claude (bisa dikoreksi Arvin)

- **Visual dicek bertahap:** hero dan satu kartu project dibuat dan ditunjukkan ke Arvin dulu, baru section lain dikerjakan. Warna dan font disimpan sebagai token, supaya kalau diganti cukup di satu tempat.
- **Bingkai sesuai jenis project:** project mobile pakai bingkai HP, project web (Christian Wijaya, GM) pakai bingkai browser.
- **Halaman detail `/work/<slug>`** hanya dibuat untuk project yang punya minimal 3 screenshot dan cerita yang cukup. Project lain cukup tampil sebagai kartu yang link ke GitHub.
- **Nama anggota tim** tidak disebut tanpa izin. Cukup ditulis "team of N" dan peran anggota lain.
- **Pemantauan:** pakai cek eksternal gratis (misalnya UptimeRobot) yang mengirim notifikasi ke email atau Telegram Arvin. Tidak dipasang di homelab, karena kalau homelab mati, pemantaunya ikut mati. Setup dilakukan oleh Arvin.
- **Situs lama:** Vercel sudah tidak dipakai. Repo lama di-archive di GitHub.
- **Repo dan folder:** repo GitHub `arvin-portfolio` (nama dari Arvin), folder lokal `Portofolio/arvin-portfolio`. Nama image, label, dan compose project: `arvin-portfolio`.
- **Angka di copy:** hanya angka yang sudah pasti (tahun, jumlah project, jumlah anggota tim). Angka lain ditanyakan ke Arvin saat menulis copy, tidak dikarang. Judul sertifikat diambil dari gambar sertifikatnya sendiri.

## 14. Jawaban Arvin atas pertanyaan terbuka

- **Screenshot:** Arvin yang akan menyediakan per project. Selama belum ada, builder memakai gambar dari Sanity sebagai pengganti sementara, dan tata letaknya harus tetap rapi kalau gambarnya cuma 1.
- **Money Manager:** tampil sebagai **"Coming soon"**. Visualnya hanya mockup atau halaman Figma, tanpa screenshot app yang berjalan dan tanpa halaman detail dulu. Baris "My part" tetap ada.
- **PT Gading Murni:** klien tidak disebut namanya. Ditulis sebagai "a procurement project for an institutional client". Website compro dan e-commerce cukup disebut di teks Experience, tanpa screenshot, tanpa link, dan tanpa kartu project.
- **Maskot Evo:** tidak dipakai sebagai dekorasi lepas di situs. Boleh muncul **di dalam konteks Money Manager**, sebagai bukti kerja UI/UX dan desain karakter. Peran Arvin di project itu ditulis termasuk "UI/UX design and mascot design".

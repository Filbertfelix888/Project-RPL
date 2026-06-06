# Project RPL — Manajemen Proyek

Aplikasi manajemen proyek berbasis Kanban board. Kelola tugas tim dalam satu tampilan dengan drag-and-drop, deadline tracking, dan dashboard analitik.

---

## Fitur Utama

### Autentikasi
- Register & login dengan JWT
- Session tersimpan di `localStorage`, token otomatis dikirim di setiap request
- Route guard via React Router loader — halaman private redirect ke `/login` jika tidak ada sesi

### Board & Proyek
- Buat, edit, dan hapus proyek (board)
- Undang anggota tim ke proyek
- Lihat daftar semua proyek milik user

### Kanban Board
- Tambah, edit, dan hapus list (kolom)
- Tambah, edit, dan hapus task (kartu)
- **Drag-and-drop** list dan task antar kolom secara real-time
- Posisi tersimpan ke server setelah setiap drag

### Detail Task
- Edit judul, deskripsi, dan deadline task langsung dari modal
- Assign anggota tim ke task
- Hapus task dengan konfirmasi

### Dashboard Proyek
- **Metrik ringkasan** — total tugas, tugas overdue, tugas mendekati deadline (1–3 hari)
- **Hover tooltip** di setiap angka metrik — tampilkan nama task dan deadline
- **Grafik sebaran tugas** — persentase task per list (pie chart)
- **Grafik workload** — jumlah task per anggota (area chart)

### Tampilan
- Mode gelap / terang (toggle, tersimpan di `localStorage`)
- Responsive layout dengan sidebar navigasi

---

## Tech Stack

| Layer | Library |
|---|---|
| UI Framework | React 19, MUI v7 |
| Build Tool | Vite |
| Routing | react-router v7 |
| Form & Validasi | react-hook-form + yup |
| Drag and Drop | @dnd-kit/core, @dnd-kit/sortable |
| Chart | recharts |
| HTTP Client | axios |
| Tanggal | dayjs (timezone Asia/Jakarta) |

---

## Prasyarat

- **Node.js** v18+
- **Backend** berjalan di `http://localhost:3030/`

---

## Instalasi & Menjalankan

```bash
# Install dependensi
npm install

# Jalankan dev server
npm run dev
```

App akan berjalan di `http://localhost:5173` (atau port lain jika sudah terpakai).

### Perintah Lain

```bash
npm run build     # build produksi ke folder dist/
npm run preview   # preview hasil build produksi
npm run lint      # lint + auto-fix ESLint
npm run format    # format kode dengan Prettier
```

---

## Struktur Proyek

```
src/
├── components/
│   ├── layouts/          # SidebarLayout (halaman private), AuthLayout (login/register)
│   ├── pages/
│   │   ├── Auth/         # Login, SignUp
│   │   ├── Projects/     # Daftar proyek, detail proyek, modals
│   │   │   └── DetailProject/
│   │   │       ├── components/   # Kanban board, list, task, project info
│   │   │       ├── hooks/        # useDashboardData, useDetailProjectContext, dll
│   │   │       └── Dashboard/    # Metrik, charts workload & sebaran
│   │   └── Settings/
│   └── ui/               # Komponen reusable: Modal, Dialog, Snackbar, Form inputs
├── contexts/
│   └── ThemeContext.jsx   # Light/dark mode global
├── services/
│   └── api/              # boards, cards, lists, users, auth
├── utils/
│   ├── network.js         # Axios instance + interceptor token
│   ├── session.js         # Baca/tulis sesi dari localStorage
│   ├── datetime.js        # Helper tanggal (format, diff, timezone)
│   └── constants.js       # Konstanta global
└── main.jsx
```

---

## Alur Data

```
Login → simpan {access_token, user} ke localStorage
     ↓
Request → axios interceptor inject Bearer token otomatis
     ↓
401 response → clearSession() + redirect ke /login
```

```
Board → Lists → Cards
```

State board dikelola di `DetailProjectContext` — fetch list dan card paralel, handle semua drag-and-drop dan update posisi.

---

## Konfigurasi

Tidak ada file `.env` yang diperlukan. URL backend di-hardcode di `src/utils/network.js`:

```js
baseURL: 'http://localhost:3030/'
```

Ganti nilai tersebut jika backend berjalan di alamat berbeda.

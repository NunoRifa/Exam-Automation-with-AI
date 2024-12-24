
# Exam Automation with AI

Exam Automation with AI adalah website yang memungkinkan pengguna untuk mengunggah gambar soal ujian. Sistem ini secara otomatis mengekstrak teks dari gambar menggunakan teknologi OCR (Optical Character Recognition) dan kemudian mengirimkan teks tersebut ke AI (seperti Gemini atau ChatGPT) untuk mendapatkan jawaban. Setelah AI memberikan jawaban, hasilnya akan ditampilkan kembali kepada pengguna.


## Cara Kerja:

- Unggah Gambar: Pengguna mengunggah gambar soal ujian.
- Ekstrak Teks: Sistem akan mengonversi gambar menjadi teks menggunakan OCR.
- Proses oleh AI: Teks yang diekstrak dikirimkan ke AI untuk mendapatkan jawaban.
- Tampilkan Jawaban: Jawaban dari AI akan ditampilkan kembali kepada pengguna.


## Instalasi

Instal dependensi proyek saya menggunakan npm.

```bash
  npm init -y
  npm install express multer tesseract.js axios @google/generative-ai
```

Untuk memulai.

```bash
  node server.js
```

Ubah **YOUR_API_KEY** pada ```server.js``` dengan API yang anda punya.

- ChatGPT AI
```javascript
  headers: { Authorization: `Bearer YOUR_API_KEY` }
```

- Gemini AI
```javascript
  const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
```

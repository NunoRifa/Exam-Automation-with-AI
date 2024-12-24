const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const helmet = require('helmet');
const app = express();
const port = 3000;

// Konfigurasi multer untuk upload file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Menggunakan helmet untuk mengatur CSP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"], // Izinkan inline script
            styleSrc: ["'self'", "'unsafe-inline'"], // Izinkan inline style
            imgSrc: ["'self'", "data:"], // Izinkan gambar dari self dan data URI
        },
    },
}));

app.use(express.static('public'));

// Endpoint untuk upload gambar
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Ekstraksi teks dari gambar menggunakan Tesseract
        // const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng');
        const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng', {
            logger: info => console.log(info) // Log informasi proses
        });
        
        // console.log('text', text);
        // Mengirim teks ke AI
        // const answer = await getChatGPTResponse(text);
        const answer = await getGeminiAIResponse(text);
        
        res.json({ answer });
    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat memproses gambar.' });
    }
});

async function getChatGPTResponse(prompt) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            // model: 'gpt-3.5-turbo',
            model: 'gpt-4o-mini-2024-07-18',
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`,
            }
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling ChatGPT API:', error); // Tambahkan ini untuk log kesalahan
        throw error; // Lempar kembali kesalahan untuk ditangani di tempat lain
    }
}

async function getGeminiAIResponse(prompt) {
    try {
        // Konfigurasi Gemini AI
        const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // const prompt = "Explain how AI works";
        const result = await model.generateContent(prompt);
        console.log('result', result);
        return result.response.text();
    } catch (error) {
        console.error('Error calling Gemini AI API:', error); // Tambahkan ini untuk log kesalahan
        throw error; // Lempar kembali kesalahan untuk ditangani di tempat lain
    }
}

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
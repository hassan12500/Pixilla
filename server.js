const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory "Database" (Will reset if server restarts)
const urlDatabase = {};

// 1. Endpoint to shorten the URL
app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortId = nanoid(6); // Generates a random 6-char ID
    urlDatabase[shortId] = longUrl;
    
    res.json({ shortUrl: `http://localhost:${PORT}/${shortId}` });
});

// 2. Endpoint to redirect users
app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const longUrl = urlDatabase[shortId];

    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// server/index.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai'); // Use require for CommonJS in Node.js

const app = express();
const PORT = process.env.PORT || 3001; // Use port from .env or default to 3001

// Middleware
app.use(cors()); // Enable CORS for requests from your React app
app.use(express.json()); // Enable parsing of JSON request bodies

// Initialize Gemini AI on the backend
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in server/.env file!");
    process.exit(1); // Exit if API key is missing
}

const genAI = new GoogleGenAI(API_KEY);

// Define your API endpoint
app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body; // Get prompt from the frontend request body

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        const requestContents = [{
            parts: [{
                text: prompt
            }]
        }];

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash", // Or "gemini-2.0-flash", etc.
            contents: requestContents,
        });

        const textResponse = await result.text;
        res.json({ response: textResponse }); // Send the Gemini response back to the frontend

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        // Provide more descriptive error if possible from Gemini's response
        let errorMessage = 'Failed to get response from AI model.';
        if (error.response && error.response.status) {
            errorMessage += ` Status: ${error.response.status}.`;
        }
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage += ` Details: ${error.response.data.error.message}`;
        }
        res.status(500).json({ error: errorMessage });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
    console.log(`Open http://localhost:${PORT}`);
});
